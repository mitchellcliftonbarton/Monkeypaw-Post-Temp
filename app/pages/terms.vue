<template>
  <div class="flex flex-col items-center px-6 pt-10 pb-[200px] gap-16">
    <!-- Top logo -->
    <NuxtLink to="/">
      <img
        src="/images/monkeypaw-logo.svg"
        class="w-[120px]"
        alt="Monkeypaw Post"
        loading="lazy"
        width="120"
        height="51.96"
      />
    </NuxtLink>

    <h1 class="text-coral text-[7vw] lg:text-[4vw] font-black uppercase leading-[0.8] tracking-[-0.02em]">
      Terms and Conditions
    </h1>

    <div class="w-full lg:w-1/2 lg:max-w-[800px] flex flex-col items-start gap-4 font-light text-sm lg:text-base">
      <p>
        Monkeypaw Post LLC and its affiliates do not accept, review, or consider unsolicited submissions of any kind.
        Please do not submit or send to Monkeypaw, by any means whatsoever (including email, mail, social media,
        messaging platforms, website forms, or otherwise), any creative materials or ideas, including without limitation
        scripts, screenplays, treatments, pitches, concepts, formats, story ideas, artwork, videos, music, designs,
        characters, business ideas, or other materials (collectively, “Submissions”).Any Submissions received by
        Monkeypaw outside of an expressly authorized submission channel will not be reviewed or considered and will be
        automatically deleted, discarded, or destroyed without acknowledgment or notice. Monkeypaw does not accept
        Submissions in confidence. No confidential, fiduciary, or other special relationship is created by the
        submission of any unsolicited materials. Monkeypaw has no obligation to review, return, acknowledge, or
        compensate you for any Submissions.
      </p>

      <p>
        By submitting any materials to Monkeypaw, whether intentionally or inadvertently, you acknowledge and agree
        that: 1) you are submitting such materials voluntarily; 2) you have no expectation of compensation, credit, or
        attribution; and 3) no express or implied agreement, including any implied-in-fact contract, is created between
        you and Monkeypaw.
      </p>

      <p>
        Monkeypaw and its affiliates continuously develop, acquire, and produce creative content, including content that
        may be similar or identical to unsolicited materials received. Monkeypaw shall have the unrestricted right to
        independently develop, acquire, use, or exploit any ideas, concepts, or materials that are similar to or
        identical with any Submissions, without any obligation to you.
      </p>

      <p>
        To the fullest extent permitted under California law, you hereby waive any and all claims against Monkeypaw, its
        affiliates, and their respective employees, contractors, representatives, and partners arising out of or
        relating to any Submissions, including without limitation claims for copyright infringement, idea
        misappropriation, breach of confidence, unjust enrichment, or breach of implied contract.
      </p>
    </div>
  </div>
</template>

<script setup>
const lastUpdated = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
</script>
