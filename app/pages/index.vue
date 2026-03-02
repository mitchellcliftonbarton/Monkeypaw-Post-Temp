<template>
  <div class="flex flex-col items-center px-4 lg:px-6 py-10 gap-16">
    <!-- Top logo -->
    <NuxtLink to="/">
      <img
        src="/images/monkeypaw-logo.svg"
        class="w-[80px] lg:w-[120px]"
        alt="Monkeypaw Post"
        loading="lazy"
        width="120"
        height="51.96"
      />
    </NuxtLink>

    <div class="relative">
      <figure class="aspect-[6/4] relative w-[82vw] lg:w-[50vw] lg:max-w-[800px]">
        <img
          src="/images/hero-image.png"
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
      >
        Post production <span class="text-coral">{{ currentWord }}</span
        ><br />different with us
      </p>

      <p class="text-sm lg:text-base text-white font-light">Come see for yourself</p>
    </div>

    <!-- Form -->
    <form
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
          placeholder="Jane Smith"
          class="w-full bg-transparent border-b tracking-[-0.02em] border-grey-1 text-white placeholder:text-grey-1 py-1 focus:outline-none focus:border-white transition-colors duration-200"
          :class="{ 'border-coral': errors.name }"
        />
        <p
          v-if="errors.name"
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
          class="w-full bg-transparent border-b tracking-[-0.02em] border-grey-1 text-white placeholder:text-grey-1 py-1 focus:outline-none focus:border-white transition-colors duration-200"
          :class="{ 'border-coral': errors.email }"
        />
        <p
          v-if="errors.email"
          class="text-coral text-sm -mt-2"
        >
          {{ errors.email }}
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
            class="w-full bg-transparent border-b tracking-[-0.02em] border-grey-1 text-white placeholder:text-grey-1 py-1 focus:outline-none focus:border-white appearance-none cursor-pointer transition-colors duration-200"
            :class="{ 'border-coral': errors.referral }"
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
          <span class="absolute right-4 top-1/2 -translate-y-1/2 text-grey-1 pointer-events-none">▾</span>
        </div>
        <p
          v-if="errors.referral"
          class="text-coral text-sm -mt-2"
        >
          {{ errors.referral }}
        </p>

        <!-- Other — revealed when "other" is selected -->
        <div
          v-if="form.referral === 'other'"
          class="flex flex-col gap-4 w-full"
        >
          <input
            id="referral-other"
            v-model="form.referralOther"
            type="text"
            placeholder="Tell us more..."
            class="w-full bg-transparent border-b tracking-[-0.02em] border-grey-1 text-white placeholder:text-grey-1 py-1 focus:outline-none focus:border-white transition-colors duration-200"
            :class="{ 'border-coral': errors.referralOther }"
          />
          <p
            v-if="errors.referralOther"
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
              class="checkbox-custom mt-1 shrink-0 translate-y-[-0.2em]"
            />
            <span class="text-white text-sm lg:text-base font-light">
              I have read and agree to the
              <NuxtLink
                to="/terms"
                class="text-coral"
                >Terms and Conditions</NuxtLink
              >
              and understand that Monkeypaw does not accept unsolicited submissions or materials. I understand that
              anything sent outside authorized channels is not reviewed and immediately deleted. Further, I agree and
              confirm that I have reviewed and agreed to Monkeypaw's full Unsolicited Submissions Policy located here.
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
            class="checkbox-custom mt-1 shrink-0 translate-y-[-0.2em]"
          />
          <span class="text-white text-sm lg:text-base font-light">I agree to future marketing emails</span>
        </label>
      </div>

      <!-- Submit -->
      <button
        type="submit"
        class="text-coral text-sm cursor-pointer px-5 py-2 border border-coral rounded-lg font-light lg:hover:bg-coral lg:hover:text-black transition-colors duration-200"
      >
        Tell me more
      </button>
    </form>

    <!-- Footer logos -->
    <div class="fade-in flex items-center gap-6 mt-20 pb-12">
      <img
        src="/images/monkeypaw-logo.svg"
        class="w-[100px]"
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

// --- Word cycling ---
const words = ['looks', 'feels', 'sounds']
const currentWordIndex = ref(0)
const currentWord = computed(() => words[currentWordIndex.value])
let interval

onMounted(() => {
  interval = setInterval(() => {
    currentWordIndex.value = (currentWordIndex.value + 1) % words.length
  }, 1000)
})

onUnmounted(() => {
  clearInterval(interval)
})

// --- Form state ---
const form = reactive({
  name: '',
  email: '',
  referral: '',
  referralOther: '',
  agreeTerms: false,
  agreeMarketing: false,
})

const errors = reactive({
  name: '',
  email: '',
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
function handleSubmit() {
  if (!validate()) return

  console.log('Form submitted:', {
    name: form.name.trim(),
    email: form.email.trim(),
    referral: form.referral === 'other' ? form.referralOther.trim() : form.referral,
    agreeTerms: form.agreeTerms,
    agreeMarketing: form.agreeMarketing,
  })
}
</script>

<style>
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

  @media (min-width: 1024px) {
    width: 2rem;
    height: 2rem;
    border-radius: 0.5rem;
  }
}

.checkbox-custom:checked {
  background-color: var(--color-coral);
}
</style>
