<template>
  <div class="flex flex-col items-center px-4 lg:px-6 py-10 gap-16">
    <!-- Top logo -->
    <NuxtLink
      to="/"
      aria-label="Monkeypaw Post – go to homepage"
    >
      <!--
      <img
        src="/images/monkeypaw-logo.svg"
        class="w-[80px] lg:w-[120px]"
        alt=""
        loading="lazy"
        width="120"
        height="51.96"
      />
      -->
      <video
        src="/videos/logo-video.mp4"
        class="video-logo w-[140px] lg:w-[180px]"
        autoplay
        muted
        loop
        playsinline
        preload="metadata"
      ></video>
    </NuxtLink>

    <div class="relative">
      <figure class="aspect-[6/4] relative w-[82vw] lg:w-[50vw] lg:max-w-[800px]">
        <img
          src="/images/mp-post-home.jpg"
          class="w-full h-full object-center object-cover"
          alt=""
          loading="lazy"
          width="631.5"
          height="421"
        />

        <Hand
          class="fade-in animation-delay-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[calc(100%+50px)] w-auto mix-blend-difference"
        />
      </figure>

      <h1
        class="fade-in text-coral text-[13.7vw] lg:text-[11.8vw] font-black uppercase leading-[0.8] tracking-[-0.02em] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        Monkeypaw<br />Post
      </h1>
    </div>

    <!-- Tagline -->
    <div class="fade-in w-full lg:w-1/2 lg:max-w-[800px] flex flex-col items-center lg:items-start gap-6 lg:gap-4">
      <p
        class="text-[7vw] lg:text-[4vw] text-white text-center lg:text-left tracking-[-0.02em] leading-none font-black"
        aria-label="Post production done different with us"
      >
        Post production
        <span
          class="text-coral"
          aria-hidden="true"
          >{{ currentWord }}</span
        ><br />different with us.
      </p>

      <p class="text-sm lg:text-base text-white font-light">Curious?</p>
    </div>

    <!-- Form -->
    <div
      v-if="submitSuccess"
      role="status"
      class="fade-in w-full max-w-[600px] flex flex-col items-center gap-4 text-center"
    >
      <p class="text-md font-black text-white">We'll be in touch.</p>
      <p class="text-base text-grey-1 font-light">Thanks for reaching out, {{ form.name.split(' ')[0] }}.</p>
    </div>

    <form
      v-else
      class="fade-in w-full max-w-[600px] gap-12 flex flex-col items-center"
      @submit.prevent="handleSubmit"
    >
      <!-- Name -->
      <div class="flex flex-col gap-4 w-full">
        <label
          for="name"
          class="text-[.8rem] lg:text-[1vw] text-white uppercase font-light tracking-[.2em]"
          >Name</label
        >
        <input
          id="name"
          v-model="form.name"
          type="text"
          placeholder="Your Name"
          class="w-full bg-transparent border-b tracking-[-0.02em] border-grey-1 text-white placeholder:text-grey-1 py-1 focus:outline-none focus:border-white focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-4 focus-visible:ring-offset-black focus-visible:rounded-sm transition-colors duration-200"
          :class="{ 'border-coral': errors.name }"
          :aria-invalid="errors.name ? 'true' : undefined"
          :aria-describedby="errors.name ? 'name-error' : undefined"
        />
        <p
          v-if="errors.name"
          id="name-error"
          class="text-coral text-sm -mt-2"
        >
          {{ errors.name }}
        </p>
      </div>

      <!-- Email -->
      <div class="flex flex-col gap-4 w-full">
        <label
          for="email"
          class="text-[.8rem] lg:text-[1vw] text-white uppercase font-light tracking-[.2em]"
          >Email</label
        >
        <input
          id="email"
          v-model="form.email"
          type="email"
          placeholder="your@email.com"
          class="w-full bg-transparent border-b tracking-[-0.02em] border-grey-1 text-white placeholder:text-grey-1 py-1 focus:outline-none focus:border-white focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-4 focus-visible:ring-offset-black focus-visible:rounded-sm transition-colors duration-200"
          :class="{ 'border-coral': errors.email }"
          :aria-invalid="errors.email ? 'true' : undefined"
          :aria-describedby="errors.email ? 'email-error' : undefined"
        />
        <p
          v-if="errors.email"
          id="email-error"
          class="text-coral text-sm -mt-2"
        >
          {{ errors.email }}
        </p>
      </div>

      <!-- What are you looking for -->
      <div class="flex flex-col gap-4 w-full">
        <label
          for="looking-for"
          class="text-[.8rem] lg:text-[1vw] text-white uppercase font-light tracking-[.2em]"
          >What are you looking for?</label
        >
        <div class="relative">
          <select
            id="looking-for"
            v-model="form.lookingFor"
            class="w-full bg-transparent border-b tracking-[-0.02em] border-grey-1 text-white placeholder:text-grey-1 py-1 focus:outline-none focus:border-white focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-4 focus-visible:ring-offset-black focus-visible:rounded-sm appearance-none cursor-pointer transition-colors duration-200"
            :class="{ 'border-coral': errors.lookingFor }"
            :aria-invalid="errors.lookingFor ? 'true' : undefined"
            :aria-describedby="errors.lookingFor ? 'looking-for-error' : undefined"
          >
            <option
              value=""
              disabled
            >
              Select
            </option>
            <option value="sound-mix-design-edit">Sound Mix | Design | Edit</option>
            <option value="vfx-animation">VFX | Animation</option>
            <option value="motion-design-graphics-packages">Motion Design | Graphics Packages</option>
            <option value="offline-edit-podcast-edit">Offline Edit | Podcast Edit</option>
            <option value="color-grade">Color Grade</option>
            <option value="finishing-qc-delivery">Finishing | QC | Delivery</option>
            <option value="creator-partnerships">Creator Partnerships</option>
            <option value="other">Other</option>
          </select>
          <span class="absolute right-0 top-1/2 -translate-y-1/2 text-grey-1 pointer-events-none">▾</span>
        </div>
        <p
          v-if="errors.lookingFor"
          id="looking-for-error"
          class="text-coral text-sm -mt-2"
        >
          {{ errors.lookingFor }}
        </p>
      </div>

      <!-- How did you hear -->
      <div class="flex flex-col gap-4 w-full">
        <label
          for="referral"
          class="text-[.8rem] lg:text-[1vw] text-white uppercase font-light tracking-[.2em]"
          >How did you hear about us?</label
        >
        <div class="relative">
          <select
            id="referral"
            v-model="form.referral"
            class="w-full bg-transparent border-b tracking-[-0.02em] border-grey-1 text-white placeholder:text-grey-1 py-1 focus:outline-none focus:border-white focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-4 focus-visible:ring-offset-black focus-visible:rounded-sm appearance-none cursor-pointer transition-colors duration-200"
            :class="{ 'border-coral': errors.referral }"
            :aria-invalid="errors.referral ? 'true' : undefined"
            :aria-describedby="errors.referral ? 'referral-error' : undefined"
          >
            <option
              value=""
              disabled
            >
              Select
            </option>
            <option value="referral">Referral</option>
            <option value="industry-contact">Industry contact</option>
            <option value="online-search">Online Search</option>
            <option value="social-media">Social Media</option>
            <option value="press-media">Press / Media</option>
            <option value="event-panel">Event or Panel</option>
            <option value="partner">Partner</option>
            <option value="other">Other</option>
          </select>
          <span class="absolute right-0 top-1/2 -translate-y-1/2 text-grey-1 pointer-events-none">▾</span>
        </div>
        <p
          v-if="errors.referral"
          id="referral-error"
          class="text-coral text-sm -mt-2"
        >
          {{ errors.referral }}
        </p>

        <!-- Other — revealed when "other" is selected -->
        <div
          v-if="form.referral === 'other'"
          class="flex flex-col gap-4 w-full"
        >
          <label
            for="referral-other"
            class="sr-only"
            >Please tell us more about how you heard about us</label
          >
          <input
            id="referral-other"
            v-model="form.referralOther"
            type="text"
            placeholder="Tell us more..."
            class="w-full bg-transparent border-b tracking-[-0.02em] border-grey-1 text-white placeholder:text-grey-1 py-1 focus:outline-none focus:border-white focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-4 focus-visible:ring-offset-black focus-visible:rounded-sm transition-colors duration-200"
            :class="{ 'border-coral': errors.referralOther }"
            :aria-invalid="errors.referralOther ? 'true' : undefined"
            :aria-describedby="errors.referralOther ? 'referral-other-error' : undefined"
          />
          <p
            v-if="errors.referralOther"
            id="referral-other-error"
            class="text-coral text-sm -mt-2"
          >
            {{ errors.referralOther }}
          </p>
        </div>
      </div>

      <!-- Checkboxes -->
      <div class="space-y-4 w-full">
        <div>
          <label class="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              v-model="form.agreeTerms"
              class="checkbox-custom mt-1 shrink-0 translate-y-[-0.22em]"
            />
            <span class="text-white text-sm font-light text-justify">
              I have read and agree to the
              <NuxtLink
                to="/terms"
                class="text-coral"
                >Terms and Conditions</NuxtLink
              >
              and understand that Monkeypaw does not accept unsolicited submissions or materials. I understand that
              anything sent outside authorized channels is not reviewed and immediately deleted. Further, I agree and
              confirm that I have reviewed and agreed to Monkeypaw's full Unsolicited Submissions Policy located
              <NuxtLink
                to="/terms#unsolicited-submissions"
                class="text-coral"
                >here</NuxtLink
              >.
            </span>
          </label>
          <p
            v-if="errors.agreeTerms"
            class="text-coral text-sm mt-2 ml-[2.75rem]"
          >
            {{ errors.agreeTerms }}
          </p>
        </div>

        <label class="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            v-model="form.agreeMarketing"
            class="checkbox-custom mt-1 shrink-0 translate-y-[-0.22em]"
          />
          <span class="text-white text-sm font-light">I agree to future marketing emails.</span>
        </label>
      </div>

      <!-- Honeypot — hidden from real users, bots will fill it in -->
      <div
        class="honeypot"
        aria-hidden="true"
        tabindex="-1"
      >
        <label for="website">Website</label>
        <input
          id="website"
          v-model="honeypot"
          type="text"
          name="website"
          autocomplete="off"
          tabindex="-1"
        />
      </div>

      <!-- Submit -->
      <div class="flex flex-col items-center gap-3 w-full">
        <button
          type="submit"
          :disabled="isSubmitting"
          class="text-coral text-sm cursor-pointer px-5 py-2 border border-coral rounded-lg font-light lg:hover:bg-coral lg:hover:text-black transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          {{ isSubmitting ? 'Sending...' : 'Tell Me More' }}
        </button>
        <p
          v-if="submitError"
          class="text-coral text-sm"
        >
          {{ submitError }}
        </p>
      </div>
    </form>

    <!-- Footer logos -->
    <div class="fade-in flex items-center gap-6 mt-20 pb-12">
      <img
        src="/images/mp-logo-new.svg"
        class="logo-footer w-[100px]"
        alt="Monkeypaw Post"
        loading="lazy"
        width="100"
        height="41.96"
      />
      <p class="font-light pointer-events-none">×</p>
      <img
        src="/images/industry-kids-logo.png"
        class="w-[70px] ik-logo"
        alt="Industry Kids"
        loading="lazy"
        width="70"
        height="70"
      />
    </div>
  </div>
</template>

<script setup>
import Hand from '~/components/Hand.vue'

useHead({
  title: 'Monkeypaw Post',
  meta: [
    { property: 'og:title', content: 'Monkeypaw Post' },
    { property: 'og:image', content: '/images/mp-post-home.jpg' },
  ],
})

// --- Spam prevention ---
const honeypot = ref('')
const formLoadTime = ref(0)
const MIN_SUBMIT_MS = 3000 // humans take at least 3s to fill a form
const words = [
  'looks',
  'feels',
  'sounds',
  'fits',
  'smacks',
  'swerves',
  'cracks',
  'sizzles',
  'slides',
  'beeps',
  'bops',
  'chats',
  'echoes',
  'waves',
  'floats',
  'zings',
  'drips',
  'flexes',
  'rips',
  'hits',
  'cuts',
  'mixes',
  'sounds',
  'slices',
  'wraps',
]
const currentWordIndex = ref(0)
const currentWord = computed(() => words[currentWordIndex.value])
let interval

onMounted(() => {
  formLoadTime.value = Date.now()
  interval = setInterval(() => {
    currentWordIndex.value = (currentWordIndex.value + 1) % words.length
  }, 600)
})

onUnmounted(() => {
  clearInterval(interval)
})

// --- Form state ---
const form = reactive({
  name: '',
  email: '',
  lookingFor: '',
  referral: '',
  referralOther: '',
  agreeTerms: false,
  agreeMarketing: false,
})

const errors = reactive({
  name: '',
  email: '',
  lookingFor: '',
  referral: '',
  referralOther: '',
  agreeTerms: '',
})

// Clear the "other" text if the user switches away from "other"
watch(
  () => form.referral,
  (val) => {
    if (val !== 'other') {
      form.referralOther = ''
      errors.referralOther = ''
    }
  },
)

// --- Validation ---
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate() {
  errors.name = ''
  errors.email = ''
  errors.lookingFor = ''
  errors.referral = ''
  errors.referralOther = ''
  errors.agreeTerms = ''

  let valid = true

  if (!form.name.trim()) {
    errors.name = 'Name is required.'
    valid = false
  }

  if (!form.email.trim()) {
    errors.email = 'Email is required.'
    valid = false
  } else if (!emailRegex.test(form.email.trim())) {
    errors.email = 'Please enter a valid email address.'
    valid = false
  }

  if (!form.lookingFor) {
    errors.lookingFor = 'Please select an option.'
    valid = false
  }

  if (!form.referral) {
    errors.referral = 'Please select an option.'
    valid = false
  }

  if (form.referral === 'other' && !form.referralOther.trim()) {
    errors.referralOther = 'Please tell us how you heard about us.'
    valid = false
  }

  if (!form.agreeTerms) {
    errors.agreeTerms = 'You must agree to the Terms and Conditions to continue.'
    valid = false
  }

  return valid
}

// --- Submit ---
const isSubmitting = ref(false)
const submitSuccess = ref(false)
const submitError = ref('')

async function handleSubmit() {
  // Spam checks — fail silently so bots get no feedback
  if (honeypot.value) {
    console.warn('Honeypot triggered — submission blocked.')
    return
  }
  if (Date.now() - formLoadTime.value < MIN_SUBMIT_MS) {
    console.warn('Submitted too fast — submission blocked.')
    return
  }

  if (!validate()) return

  isSubmitting.value = true
  submitError.value = ''

  try {
    await $fetch('/api/submit', {
      method: 'POST',
      body: {
        name: form.name.trim(),
        email: form.email.trim(),
        lookingFor: form.lookingFor,
        referral: form.referral,
        referralOther: form.referralOther.trim(),
        agreeTerms: form.agreeTerms,
        agreeMarketing: form.agreeMarketing,
      },
    })
    submitSuccess.value = true
  } catch (err) {
    console.error('Submission error:', err)
    submitError.value = 'Something went wrong. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style>
/* Honeypot — moved off-screen rather than display:none so bots don't skip it */
.honeypot {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
  opacity: 0;
  pointer-events: none;
}

.ik-logo {
  /* filter: grayscale(100%); */
}

.checkbox-custom {
  appearance: none;
  width: 1.5rem;
  height: 1.5rem;
  border: 1px solid var(--color-coral);
  border-radius: 0.4rem;
  cursor: pointer;
  transition:
    background-color 0.2s,
    border-color 0.2s;

  /*@media (min-width: 1024px) {
    width: 2rem;
    height: 2rem;
    border-radius: 0.5rem;
  }*/
}

.checkbox-custom:checked {
  background-color: var(--color-coral);
}

.checkbox-custom:focus-visible {
  outline: 2px solid var(--color-coral);
  outline-offset: 3px;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

input {
  border-radius: 0px;
}

select {
  border-radius: 0px;
}

.video-logo {
  filter: invert(1) brightness(1.5);
  mix-blend-mode: hard-light;
}

.logo-footer {
  filter: invert(1) brightness(1.5);
}
</style>
