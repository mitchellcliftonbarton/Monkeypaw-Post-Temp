export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  const { name, email, lookingFor, referral, referralOther, agreeMarketing } = body

  // Server-side sanity check
  if (!name?.trim() || !email?.trim() || !lookingFor?.trim() || !referral?.trim()) {
    throw createError({ statusCode: 400, statusMessage: 'Missing required fields.' })
  }

  // --- ClickUp: create a task ---
  // const taskDescription = [
  //   `Email: ${email}`,
  //   `Referral: ${referral}`,
  //   `Marketing emails: ${agreeMarketing ? 'Yes' : 'No'}`,
  // ].join('\n')

  const lookingForLabels: Record<string, string> = {
    'audio-finishing': 'Audio Finishing',
    'vfx-animation': 'VFX | Animation',
    'motion-design-graphics-packages': 'Motion Design | Graphics Packages',
    'offline-edit-podcast-edit': 'Offline Edit | Podcast Edit',
    'color-grade': 'Color Grade',
    'finishing-qc-delivery': 'Finishing | QC | Delivery',
    'creator-partnerships': 'Creator Partnerships',
    other: 'Other',
  }
  const lookingForValue = lookingForLabels[lookingFor] ?? lookingFor

  const referralLabels: Record<string, string> = {
    referral: 'Referral',
    'industry-contact': 'Industry Contact',
    'online-search': 'Online Search',
    'social-media': 'Social Media',
    'press-media': 'Press / Media',
    'event-panel': 'Event or Panel',
    partner: 'Partner',
    other: 'Other',
  }
  const referralValue = referral === 'other' ? `Other: ${referralOther}` : (referralLabels[referral] ?? referral)

  console.log('list id', config.clickupListId)

  // Start of today in Pacific Time as a UTC ms timestamp (ClickUp displays dates in UTC)
  const ptOffsetStr = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles',
    timeZoneName: 'shortOffset',
  })
    .formatToParts(new Date())
    .find((p) => p.type === 'timeZoneName')!.value // e.g. "GMT-8"
  const ptOffsetHours = parseInt(ptOffsetStr.replace('GMT', ''))
  const ptDateParts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date())
  const submissionDate =
    Date.UTC(
      +ptDateParts.find((p) => p.type === 'year')!.value,
      +ptDateParts.find((p) => p.type === 'month')!.value - 1,
      +ptDateParts.find((p) => p.type === 'day')!.value,
    ) -
    ptOffsetHours * 3600000

  const clickupRes = await fetch(`https://api.clickup.com/api/v2/list/${config.clickupListId}/task`, {
    method: 'POST',
    headers: {
      Authorization: config.clickupToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: `New MP Post Inquiry — ${name}`,
      priority: 3,
      custom_fields: [
        {
          id: '7d6011ea-95db-4362-b045-33fe4d8f4330', // submitter email
          value: email,
        },
        {
          id: 'aa52197b-6166-4314-b72c-40acff3361f0', // what are you looking for
          value: lookingForValue,
        },
        {
          id: 'e9ce6594-4675-43a6-86c2-cd41a8b59ed4', // how did you hear about us
          value: referralValue,
        },
        {
          id: '51d62f09-8c56-4cf0-b1fc-44a59c67ad75', // submission date
          value: submissionDate,
        },
        {
          id: 'fb3b299b-e658-408f-b4e7-0fb0fb52c602', // agrees to marketing emails
          value: !!agreeMarketing,
        },
      ],
    }),
  })

  if (!clickupRes.ok) {
    const err = await clickupRes.text()
    console.error('[ClickUp] Error:', err)
    throw createError({ statusCode: 502, statusMessage: 'Failed to create ClickUp task.' })
  }

  const clickupData = await clickupRes.json()

  // log the response
  console.log('[ClickUp] Task created:', clickupData)

  let airtableData = null

  // --- Airtable: add to marketing list if opted in (best-effort) ---
  if (agreeMarketing) {
    try {
      const airtableBase = `https://api.airtable.com/v0/${config.airtableBaseId}/${encodeURIComponent(config.airtableTableName)}`
      const airtableHeaders = {
        Authorization: `Bearer ${config.airtableToken}`,
        'Content-Type': 'application/json',
      }

      // Check if email already exists
      const searchRes = await fetch(`${airtableBase}?filterByFormula=${encodeURIComponent(`{Email}="${email}"`)}`, {
        headers: airtableHeaders,
      })
      const searchData = await searchRes.json()
      const existing = searchData.records?.[0]

      if (existing) {
        if (existing.fields.Name !== name) {
          // Same email, different name — update name and ClickUp task ID
          const updateRes = await fetch(`${airtableBase}/${existing.id}`, {
            method: 'PATCH',
            headers: airtableHeaders,
            body: JSON.stringify({
              fields: { Name: name, 'ClickUp Task ID': clickupData.id, 'Sign-up Source': 'Post' },
            }),
          })
          airtableData = await updateRes.json()
          if (!updateRes.ok) console.error('[Airtable] Update error:', airtableData)
        }
        // else: exact match — ignore
      } else {
        // New contact — create record
        const createRes = await fetch(airtableBase, {
          method: 'POST',
          headers: airtableHeaders,
          body: JSON.stringify({
            fields: {
              Name: name,
              Email: email,
              'ClickUp Task ID': clickupData.id,
              'Sign-up Source': 'Post',
            },
          }),
        })
        airtableData = await createRes.json()
        if (!createRes.ok) console.error('[Airtable] Create error:', airtableData)
      }
    } catch (err) {
      // Don't fail the whole request if Airtable has an issue
      console.error('[Airtable] Request failed:', err)
    }
  }

  return { success: true, clickupData, airtableData }
})
