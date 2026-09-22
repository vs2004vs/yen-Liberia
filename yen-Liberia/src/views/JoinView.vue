<script setup>
import {
  computed,
  nextTick,
  ref,
} from "vue"


/*
|--------------------------------------------------------------------------
| STEP STATE
|--------------------------------------------------------------------------
*/

const currentStep = ref(1)
const stepHeading = ref(null)

const totalSteps = 3
const currentYear = new Date().getFullYear()


/*
|--------------------------------------------------------------------------
| APPLICATION DATA
|--------------------------------------------------------------------------
*/

const form = ref({
  // Step 1
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  county: "",
  city: "",

  // Step 2
  businessStatus: "",
  businessName: "",
  industry: "",
  yearStarted: "",
  businessLocation: "",
  description: "",

  // Step 3
  interest: [],
  motivation: "",
  consent: false,
})


const formError = ref("")
const formMessage = ref("")


/*
|--------------------------------------------------------------------------
| FORM OPTIONS
|--------------------------------------------------------------------------
*/

const counties = [
  "Bomi",
  "Bong",
  "Gbarpolu",
  "Grand Bassa",
  "Grand Cape Mount",
  "Grand Gedeh",
  "Grand Kru",
  "Lofa",
  "Margibi",
  "Maryland",
  "Montserrado",
  "Nimba",
  "River Cess",
  "River Gee",
  "Sinoe",
]


const industries = [
  "Agriculture",
  "Technology",
  "Fashion",
  "Food & Beverage",
  "Professional Services",
  "Creative Industry",
  "Retail",
  "Manufacturing",
  "Construction",
  "Transportation",
  "Hospitality & Tourism",
  "Education",
  "Health & Wellness",
  "Financial Services",
  "Other",
]


const interests = [
  "Business Training",
  "Mentorship",
  "Networking",
  "Funding Opportunities",
  "Market Access",
  "Digital Skills",
  "Business Formalization",
  "Events & Conferences",
  "Entrepreneur Directory",
]


/*
|--------------------------------------------------------------------------
| STEP LABELS
|--------------------------------------------------------------------------
*/

const stepTitle = computed(() => {
  if (currentStep.value === 1) {
    return "Personal Information"
  }

  if (currentStep.value === 2) {
    return "Business Information"
  }

  return "Interests & Motivation"
})


const progressWidth = computed(() => {
  return `${
    (currentStep.value / totalSteps) *
    100
  }%`
})


/*
|--------------------------------------------------------------------------
| FOCUS MANAGEMENT
|--------------------------------------------------------------------------
*/

const focusStepHeading = async () => {
  await nextTick()

  stepHeading.value?.focus()
}


/*
|--------------------------------------------------------------------------
| STEP 1 VALIDATION
|--------------------------------------------------------------------------
*/

const validateStepOne = () => {
  formError.value = ""

  const firstName =
    form.value.firstName.trim()

  const lastName =
    form.value.lastName.trim()

  const email =
    form.value.email.trim()

  const phone =
    form.value.phone.trim()

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !form.value.county
  ) {
    formError.value =
      "Please complete all required personal information."

    return false
  }


  const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailPattern.test(email)) {
    formError.value =
      "Please enter a valid email address."

    return false
  }

  return true
}


/*
|--------------------------------------------------------------------------
| STEP 2 VALIDATION
|--------------------------------------------------------------------------
*/

const validateStepTwo = () => {
  formError.value = ""

  if (!form.value.businessStatus) {
    formError.value =
      "Please tell us your current business status."

    return false
  }


  if (
    form.value.businessStatus ===
      "Operating Business" &&
    !form.value.businessName.trim()
  ) {
    formError.value =
      "Please enter your business name."

    return false
  }


  if (!form.value.industry) {
    formError.value =
      "Please select your business or interest area."

    return false
  }


  if (form.value.yearStarted) {
    const year =
      Number(form.value.yearStarted)

    if (
      !Number.isInteger(year) ||
      year < 1900 ||
      year > currentYear
    ) {
      formError.value =
        `Please enter a valid year between 1900 and ${currentYear}.`

      return false
    }
  }

  return true
}


/*
|--------------------------------------------------------------------------
| STEP NAVIGATION
|--------------------------------------------------------------------------
*/

const nextStep = async () => {
  if (
    currentStep.value === 1 &&
    !validateStepOne()
  ) {
    return
  }

  if (
    currentStep.value === 2 &&
    !validateStepTwo()
  ) {
    return
  }

  formError.value = ""
  formMessage.value = ""

  if (currentStep.value < totalSteps) {
    currentStep.value++

    await focusStepHeading()
  }
}


const previousStep = async () => {
  formError.value = ""
  formMessage.value = ""

  if (currentStep.value > 1) {
    currentStep.value--

    await focusStepHeading()
  }
}


/*
|--------------------------------------------------------------------------
| INTEREST SELECTION
|--------------------------------------------------------------------------
*/

const toggleInterest = (interest) => {
  const index =
    form.value.interest.indexOf(
      interest,
    )

  if (index >= 0) {
    form.value.interest.splice(
      index,
      1,
    )
  } else {
    form.value.interest.push(
      interest,
    )
  }
}


/*
|--------------------------------------------------------------------------
| FINAL SUBMISSION
|--------------------------------------------------------------------------
*/

const submitApplication = () => {
  formError.value = ""
  formMessage.value = ""

  const motivation =
    form.value.motivation.trim()

  if (!motivation) {
    formError.value =
      "Please tell us why you would like to join YEN-Liberia."

    return
  }


  if (!form.value.consent) {
    formError.value =
      "Please confirm that YEN-Liberia may review and contact you regarding your membership interest."

    return
  }


  /*
    FRONTEND ONLY FOR NOW

    Later:

    POST /api/membership/applications

    When authentication is introduced,
    this workflow may begin with account
    registration and continue into a
    member dashboard.
  */

  formMessage.value =
    "The membership application form is ready. Submission and account creation will activate when the YEN-Liberia backend and membership system are connected."
}
</script>


<template>
  <main class="w-full overflow-hidden">

    <!-- ========================================
         HERO
    ========================================= -->

    <section
      class="relative isolate min-h-[560px] overflow-hidden sm:min-h-[580px] lg:min-h-[600px]"
    >
      <!-- Background -->

      <img
        src="/images/hero/hero-1.jpg"
        alt="Join Youth Entrepreneurs Network Liberia"
        class="absolute inset-0 h-full w-full object-cover object-center"
      />


      <!-- Contrast -->

      <div
        class="absolute inset-0 bg-linear-to-r from-black/90 via-black/65 to-black/25 sm:via-black/60 sm:to-black/15"
      ></div>

      <div
        class="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/20"
      ></div>


      <!-- Content -->

      <div
        class="relative z-10 mx-auto flex min-h-[560px] max-w-7xl items-center px-5 py-16 sm:min-h-[580px] sm:px-6 sm:py-20 lg:min-h-[600px] lg:px-8"
      >
        <div
          class="w-full max-w-4xl"
        >
          <!-- Breadcrumb -->

          <div
            class="mb-6 flex flex-wrap items-center gap-3 font-display text-xs font-bold sm:mb-8"
          >
            <RouterLink
              :to="{ name: 'home' }"
              class="text-white/55 transition hover:text-yen-gold"
            >
              Home
            </RouterLink>

            <span class="text-white/25">
              /
            </span>

            <span class="text-yen-gold">
              Join YEN
            </span>
          </div>


          <!-- Label -->

          <p
            class="font-display text-[10px] font-extrabold uppercase tracking-[0.2em] text-yen-gold sm:text-xs"
          >
            Become Part of the Network
          </p>


          <!-- Heading -->

          <h1
            class="mt-5 max-w-4xl font-display text-[40px] font-extrabold leading-[1.05] tracking-tight text-white min-[390px]:text-[44px] sm:text-6xl lg:text-7xl"
          >
            Build your business.

            <span class="text-yen-gold">
              Grow your network.
            </span>
          </h1>


          <!-- Description -->

          <p
            class="mt-6 max-w-2xl font-body text-sm leading-7 text-white/80 sm:mt-7 sm:text-lg sm:leading-8"
          >
            Join a growing community of entrepreneurs working,
            learning and building across Liberia.
          </p>


          <!-- Same-page application link -->

          <a
            href="#membership-application"
            class="mt-8 inline-flex w-full items-center justify-center rounded-full bg-yen-gold px-7 py-4 font-display text-sm font-bold text-black transition duration-300 hover:-translate-y-1 hover:bg-white sm:mt-9 sm:w-auto"
          >
            Start Your Application

            <span
              class="ml-3"
              aria-hidden="true"
            >
              →
            </span>
          </a>
        </div>
      </div>


      <!-- Accent -->

      <div
        class="absolute bottom-0 left-0 z-20 h-1 w-full bg-linear-to-r from-yen-red via-yen-gold to-yen-red"
      ></div>
    </section>


    <!-- ========================================
         WHY JOIN
    ========================================= -->

    <section class="bg-white">
      <div
        class="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28"
      >
        <div
          class="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14"
        >
          <!-- Intro -->

          <div>
            <p
              class="font-display text-[10px] font-extrabold uppercase tracking-[0.18em] text-yen-red sm:text-xs"
            >
              Why Join YEN?
            </p>

            <h2
              class="mt-4 font-display text-3xl font-extrabold leading-tight text-black min-[390px]:text-4xl sm:text-5xl"
            >
              Entrepreneurship is easier with a

              <span class="text-yen-red">
                strong network.
              </span>
            </h2>

            <p
              class="mt-6 font-body text-sm leading-8 text-gray-600 sm:text-base"
            >
              YEN-Liberia exists to connect entrepreneurs with
              knowledge, people, institutions and opportunities
              that can help strengthen their businesses.
            </p>
          </div>


          <!-- ==================================
               BENEFITS
          =================================== -->

          <div
            class="grid gap-5 sm:grid-cols-2"
          >
            <!-- Benefit 1 -->

            <article
              class="flex h-full flex-col rounded-[1.5rem] bg-[#f7f7f5] p-6 sm:rounded-[1.6rem] sm:p-7"
            >
              <span
                class="font-display text-3xl font-extrabold text-yen-gold sm:text-4xl"
              >
                01
              </span>

              <h3
                class="mt-5 font-display text-xl font-bold text-black"
              >
                Business Learning
              </h3>

              <p
                class="mt-3 font-body text-sm leading-7 text-gray-600"
              >
                Access practical entrepreneurship training,
                workshops and business-development activities.
              </p>
            </article>


            <!-- Benefit 2 -->

            <article
              class="flex h-full flex-col rounded-[1.5rem] bg-black p-6 sm:rounded-[1.6rem] sm:p-7"
            >
              <span
                class="font-display text-3xl font-extrabold text-yen-gold sm:text-4xl"
              >
                02
              </span>

              <h3
                class="mt-5 font-display text-xl font-bold text-white"
              >
                Networking
              </h3>

              <p
                class="mt-3 font-body text-sm leading-7 text-white/60"
              >
                Connect with entrepreneurs, institutions,
                business leaders, partners and mentors.
              </p>
            </article>


            <!-- Benefit 3 -->

            <article
              class="flex h-full flex-col rounded-[1.5rem] bg-black p-6 sm:rounded-[1.6rem] sm:p-7"
            >
              <span
                class="font-display text-3xl font-extrabold text-yen-gold sm:text-4xl"
              >
                03
              </span>

              <h3
                class="mt-5 font-display text-xl font-bold text-white"
              >
                Opportunities
              </h3>

              <p
                class="mt-3 font-body text-sm leading-7 text-white/60"
              >
                Discover training, funding calls, competitions,
                events and other entrepreneurship opportunities.
              </p>
            </article>


            <!-- Benefit 4 -->

            <article
              class="flex h-full flex-col rounded-[1.5rem] bg-yen-gold p-6 sm:rounded-[1.6rem] sm:p-7"
            >
              <span
                class="font-display text-3xl font-extrabold text-yen-red sm:text-4xl"
              >
                04
              </span>

              <h3
                class="mt-5 font-display text-xl font-bold text-black"
              >
                Business Visibility
              </h3>

              <p
                class="mt-3 font-body text-sm leading-7 text-black/65"
              >
                Approved members can eventually showcase their
                businesses through the YEN entrepreneur
                directory.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>


    <!-- ========================================
         MEMBERSHIP JOURNEY
    ========================================= -->

    <section class="bg-[#f7f7f5]">
      <div
        class="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24"
      >
        <!-- Header -->

        <div class="max-w-3xl">
          <p
            class="font-display text-[10px] font-extrabold uppercase tracking-[0.18em] text-yen-red sm:text-xs"
          >
            Membership Journey
          </p>

          <h2
            class="mt-4 font-display text-3xl font-extrabold leading-tight text-black min-[390px]:text-4xl sm:text-5xl"
          >
            A simple path into the network.
          </h2>
        </div>


        <!-- ==================================
             JOURNEY STEPS
        =================================== -->

        <div
          class="mt-10 grid gap-5 sm:grid-cols-2 xl:mt-12 xl:grid-cols-4"
        >
          <!-- Step 1 -->

          <article
            class="rounded-[1.5rem] bg-white p-6 sm:p-7"
          >
            <span
              class="font-display text-xs font-extrabold text-yen-red sm:text-sm"
            >
              STEP 01
            </span>

            <h3
              class="mt-5 font-display text-xl font-bold text-black"
            >
              Apply
            </h3>

            <p
              class="mt-3 font-body text-sm leading-7 text-gray-600"
            >
              Share basic information about yourself and your
              entrepreneurship journey.
            </p>
          </article>


          <!-- Step 2 -->

          <article
            class="rounded-[1.5rem] bg-white p-6 sm:p-7"
          >
            <span
              class="font-display text-xs font-extrabold text-yen-red sm:text-sm"
            >
              STEP 02
            </span>

            <h3
              class="mt-5 font-display text-xl font-bold text-black"
            >
              Review
            </h3>

            <p
              class="mt-3 font-body text-sm leading-7 text-gray-600"
            >
              YEN administrators review the application and
              verify required information.
            </p>
          </article>


          <!-- Step 3 -->

          <article
            class="rounded-[1.5rem] bg-white p-6 sm:p-7"
          >
            <span
              class="font-display text-xs font-extrabold text-yen-red sm:text-sm"
            >
              STEP 03
            </span>

            <h3
              class="mt-5 font-display text-xl font-bold text-black"
            >
              Join
            </h3>

            <p
              class="mt-3 font-body text-sm leading-7 text-gray-600"
            >
              Approved applicants become part of the YEN
              entrepreneurship network.
            </p>
          </article>


          <!-- Step 4 -->

          <article
            class="rounded-[1.5rem] bg-black p-6 sm:p-7"
          >
            <span
              class="font-display text-xs font-extrabold text-yen-gold sm:text-sm"
            >
              STEP 04
            </span>

            <h3
              class="mt-5 font-display text-xl font-bold text-white"
            >
              Build Your Profile
            </h3>

            <p
              class="mt-3 font-body text-sm leading-7 text-white/60"
            >
              When member accounts are activated, approved
              members can maintain business information and
              access future member services.
            </p>
          </article>
        </div>


        <!-- Membership note -->

        <div
          class="mt-8 rounded-[1.5rem] border border-yen-gold/40 bg-yen-gold/10 p-6"
        >
          <p
            class="font-display text-sm font-bold text-black"
          >
            Final membership details will be published after
            official confirmation.
          </p>

          <p
            class="mt-2 font-body text-sm leading-7 text-gray-600"
          >
            Eligibility requirements, membership categories,
            fees and required documents will only be displayed
            when confirmed by YEN-Liberia.
          </p>
        </div>
      </div>
    </section>


    <!-- ========================================
         APPLICATION
    ========================================= -->

    <section
      id="membership-application"
      class="scroll-mt-28 bg-white"
    >
      <div
        class="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-6 lg:grid-cols-[0.72fr_1.28fr] lg:gap-14 lg:px-8 lg:py-28"
      >
        <!-- ==================================
             SIDE CONTENT
        =================================== -->

        <div>
          <p
            class="font-display text-[10px] font-extrabold uppercase tracking-[0.18em] text-yen-red sm:text-xs"
          >
            Membership Application
          </p>

          <h2
            class="mt-4 font-display text-3xl font-extrabold leading-tight text-black min-[390px]:text-4xl sm:text-5xl"
          >
            Tell us about

            <span class="text-yen-red">
              your journey.
            </span>
          </h2>

          <p
            class="mt-6 font-body text-sm leading-8 text-gray-600 sm:text-base"
          >
            This initial application collects the information
            needed to prepare the YEN membership workflow.
          </p>


          <!-- Future account -->

          <div
            class="mt-8 rounded-[1.5rem] bg-black p-6 sm:mt-9 sm:rounded-[1.6rem] sm:p-7"
          >
            <p
              class="font-display text-[10px] font-extrabold uppercase tracking-[0.16em] text-yen-gold sm:text-xs"
            >
              Future Member Account
            </p>

            <p
              class="mt-4 font-body text-sm leading-7 text-white/60"
            >
              When authentication is built, approved members can
              eventually access a secure dashboard and maintain
              their entrepreneur profile.
            </p>


            <div
              class="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1"
            >
              <p
                class="font-display text-xs font-semibold text-white"
              >
                ✓ Business Profile
              </p>

              <p
                class="font-display text-xs font-semibold text-white"
              >
                ✓ Opportunities
              </p>

              <p
                class="font-display text-xs font-semibold text-white"
              >
                ✓ Programs
              </p>

              <p
                class="font-display text-xs font-semibold text-white"
              >
                ✓ Event Registration
              </p>

              <p
                class="font-display text-xs font-semibold text-white"
              >
                ✓ Membership Status
              </p>
            </div>
          </div>
        </div>


        <!-- ==================================
             FORM CARD
        =================================== -->

        <form
          class="overflow-hidden rounded-[1.7rem] bg-black shadow-2xl sm:rounded-[2rem]"
          @submit.prevent="submitApplication"
        >
          <!-- =================================
               PROGRESS
          ================================== -->

          <div
            class="border-b border-white/10 p-6 sm:p-9"
          >
            <div
              class="flex items-start justify-between gap-5"
            >
              <div class="min-w-0">
                <p
                  class="font-display text-[10px] font-extrabold uppercase tracking-[0.18em] text-yen-gold sm:text-xs"
                >
                  Step {{ currentStep }} of
                  {{ totalSteps }}
                </p>

                <h3
                  ref="stepHeading"
                  tabindex="-1"
                  class="mt-2 font-display text-xl font-bold leading-tight text-white outline-none sm:text-2xl"
                >
                  {{ stepTitle }}
                </h3>
              </div>


              <span
                class="shrink-0 font-display text-lg font-extrabold text-white/20 sm:text-xl"
                aria-hidden="true"
              >
                {{ currentStep }}/{{ totalSteps }}
              </span>
            </div>


            <!-- Accessible progress bar -->

            <div
              class="mt-6"
              role="progressbar"
              aria-label="Membership application progress"
              aria-valuemin="1"
              :aria-valuemax="totalSteps"
              :aria-valuenow="currentStep"
              :aria-valuetext="`Step ${currentStep} of ${totalSteps}: ${stepTitle}`"
            >
              <div
                class="h-2 overflow-hidden rounded-full bg-white/10"
              >
                <div
                  class="h-full rounded-full bg-yen-gold transition-all duration-500"
                  :style="{
                    width: progressWidth,
                  }"
                ></div>
              </div>
            </div>


            <!-- Visual step names -->

            <div
              class="mt-4 hidden grid-cols-3 gap-3 sm:grid"
              aria-hidden="true"
            >
              <p
                class="font-display text-[9px] font-bold uppercase tracking-wider"
                :class="
                  currentStep >= 1
                    ? 'text-yen-gold'
                    : 'text-white/25'
                "
              >
                Personal
              </p>

              <p
                class="text-center font-display text-[9px] font-bold uppercase tracking-wider"
                :class="
                  currentStep >= 2
                    ? 'text-yen-gold'
                    : 'text-white/25'
                "
              >
                Business
              </p>

              <p
                class="text-right font-display text-[9px] font-bold uppercase tracking-wider"
                :class="
                  currentStep >= 3
                    ? 'text-yen-gold'
                    : 'text-white/25'
                "
              >
                Interests
              </p>
            </div>
          </div>


          <!-- =================================
               STEP 1
          ================================== -->

          <div
            v-if="currentStep === 1"
            class="p-6 sm:p-9"
          >
            <p
              class="mb-6 font-body text-xs leading-6 text-white/45"
            >
              Fields marked * are required.
            </p>


            <!-- First + Last Name -->

            <div
              class="grid gap-5 sm:grid-cols-2"
            >
              <!-- First -->

              <div>
                <label
                  for="join-first-name"
                  class="font-display text-xs font-bold text-white"
                >
                  First Name *
                </label>

                <input
                  id="join-first-name"
                  v-model="form.firstName"
                  name="firstName"
                  type="text"
                  autocomplete="given-name"
                  required
                  class="mt-2 w-full rounded-xl border border-white/15 bg-white/10 px-4 py-4 font-display text-sm text-white outline-none transition placeholder:text-white/30 focus:border-yen-gold focus:bg-white/15 sm:px-5"
                  placeholder="First name"
                />
              </div>


              <!-- Last -->

              <div>
                <label
                  for="join-last-name"
                  class="font-display text-xs font-bold text-white"
                >
                  Last Name *
                </label>

                <input
                  id="join-last-name"
                  v-model="form.lastName"
                  name="lastName"
                  type="text"
                  autocomplete="family-name"
                  required
                  class="mt-2 w-full rounded-xl border border-white/15 bg-white/10 px-4 py-4 font-display text-sm text-white outline-none transition placeholder:text-white/30 focus:border-yen-gold focus:bg-white/15 sm:px-5"
                  placeholder="Last name"
                />
              </div>
            </div>


            <!-- Email + Phone -->

            <div
              class="mt-5 grid gap-5 sm:grid-cols-2"
            >
              <!-- Email -->

              <div>
                <label
                  for="join-email"
                  class="font-display text-xs font-bold text-white"
                >
                  Email *
                </label>

                <input
                  id="join-email"
                  v-model="form.email"
                  name="email"
                  type="email"
                  inputmode="email"
                  autocomplete="email"
                  required
                  class="mt-2 w-full rounded-xl border border-white/15 bg-white/10 px-4 py-4 font-display text-sm text-white outline-none transition placeholder:text-white/30 focus:border-yen-gold focus:bg-white/15 sm:px-5"
                  placeholder="you@example.com"
                />
              </div>


              <!-- Phone -->

              <div>
                <label
                  for="join-phone"
                  class="font-display text-xs font-bold text-white"
                >
                  Phone *
                </label>

                <input
                  id="join-phone"
                  v-model="form.phone"
                  name="phone"
                  type="tel"
                  inputmode="tel"
                  autocomplete="tel"
                  required
                  class="mt-2 w-full rounded-xl border border-white/15 bg-white/10 px-4 py-4 font-display text-sm text-white outline-none transition placeholder:text-white/30 focus:border-yen-gold focus:bg-white/15 sm:px-5"
                  placeholder="+231..."
                />
              </div>
            </div>


            <!-- County + City -->

            <div
              class="mt-5 grid gap-5 sm:grid-cols-2"
            >
              <!-- County -->

              <div>
                <label
                  for="join-county"
                  class="font-display text-xs font-bold text-white"
                >
                  County *
                </label>

                <select
                  id="join-county"
                  v-model="form.county"
                  name="county"
                  required
                  class="mt-2 w-full rounded-xl border border-white/15 bg-white/10 px-4 py-4 font-display text-sm text-white outline-none transition focus:border-yen-gold focus:bg-white/15 sm:px-5"
                >
                  <option
                    value=""
                    class="text-black"
                  >
                    Select county
                  </option>

                  <option
                    v-for="county in counties"
                    :key="county"
                    :value="county"
                    class="text-black"
                  >
                    {{ county }}
                  </option>
                </select>
              </div>


              <!-- City -->

              <div>
                <label
                  for="join-city"
                  class="font-display text-xs font-bold text-white"
                >
                  City / Community
                </label>

                <input
                  id="join-city"
                  v-model="form.city"
                  name="city"
                  type="text"
                  autocomplete="address-level2"
                  class="mt-2 w-full rounded-xl border border-white/15 bg-white/10 px-4 py-4 font-display text-sm text-white outline-none transition placeholder:text-white/30 focus:border-yen-gold focus:bg-white/15 sm:px-5"
                  placeholder="City or community"
                />
              </div>
            </div>
          </div>


          <!-- =================================
               STEP 2
          ================================== -->

          <div
            v-else-if="currentStep === 2"
            class="p-6 sm:p-9"
          >
            <p
              class="mb-6 font-body text-xs leading-6 text-white/45"
            >
              Tell us where you are in your entrepreneurship
              journey.
            </p>


            <!-- Business status -->

            <div>
              <label
                for="business-status"
                class="font-display text-xs font-bold text-white"
              >
                Current Business Status *
              </label>

              <select
                id="business-status"
                v-model="form.businessStatus"
                name="businessStatus"
                required
                class="mt-2 w-full rounded-xl border border-white/15 bg-white/10 px-4 py-4 font-display text-sm text-white outline-none transition focus:border-yen-gold focus:bg-white/15 sm:px-5"
              >
                <option
                  value=""
                  class="text-black"
                >
                  Select status
                </option>

                <option
                  value="Operating Business"
                  class="text-black"
                >
                  I currently operate a business
                </option>

                <option
                  value="Developing Business"
                  class="text-black"
                >
                  I am developing a business
                </option>

                <option
                  value="Entrepreneurship Interest"
                  class="text-black"
                >
                  I am exploring entrepreneurship
                </option>
              </select>
            </div>


            <!-- Business Name -->

            <div
              v-if="
                form.businessStatus ===
                'Operating Business'
              "
              class="mt-5"
            >
              <label
                for="join-business"
                class="font-display text-xs font-bold text-white"
              >
                Business Name *
              </label>

              <input
                id="join-business"
                v-model="form.businessName"
                name="businessName"
                type="text"
                autocomplete="organization"
                required
                class="mt-2 w-full rounded-xl border border-white/15 bg-white/10 px-4 py-4 font-display text-sm text-white outline-none transition placeholder:text-white/30 focus:border-yen-gold focus:bg-white/15 sm:px-5"
                placeholder="Business name"
              />
            </div>


            <!-- Industry + year -->

            <div
              class="mt-5 grid gap-5 sm:grid-cols-2"
            >
              <!-- Industry -->

              <div>
                <label
                  for="join-industry"
                  class="font-display text-xs font-bold text-white"
                >
                  Industry / Interest Area *
                </label>

                <select
                  id="join-industry"
                  v-model="form.industry"
                  name="industry"
                  required
                  class="mt-2 w-full rounded-xl border border-white/15 bg-white/10 px-4 py-4 font-display text-sm text-white outline-none transition focus:border-yen-gold focus:bg-white/15 sm:px-5"
                >
                  <option
                    value=""
                    class="text-black"
                  >
                    Select industry
                  </option>

                  <option
                    v-for="industry in industries"
                    :key="industry"
                    :value="industry"
                    class="text-black"
                  >
                    {{ industry }}
                  </option>
                </select>
              </div>


              <!-- Year started -->

              <div>
                <label
                  for="join-year"
                  class="font-display text-xs font-bold text-white"
                >
                  Year Started
                </label>

                <input
                  id="join-year"
                  v-model="form.yearStarted"
                  name="yearStarted"
                  type="number"
                  inputmode="numeric"
                  min="1900"
                  :max="currentYear"
                  class="mt-2 w-full rounded-xl border border-white/15 bg-white/10 px-4 py-4 font-display text-sm text-white outline-none transition placeholder:text-white/30 focus:border-yen-gold focus:bg-white/15 sm:px-5"
                  :placeholder="`Example: ${currentYear - 1}`"
                />
              </div>
            </div>


            <!-- Business Location -->

            <div class="mt-5">
              <label
                for="join-business-location"
                class="font-display text-xs font-bold text-white"
              >
                Business / Project Location
              </label>

              <input
                id="join-business-location"
                v-model="form.businessLocation"
                name="businessLocation"
                type="text"
                class="mt-2 w-full rounded-xl border border-white/15 bg-white/10 px-4 py-4 font-display text-sm text-white outline-none transition placeholder:text-white/30 focus:border-yen-gold focus:bg-white/15 sm:px-5"
                placeholder="Community, city or county"
              />
            </div>


            <!-- Description -->

            <div class="mt-5">
              <label
                for="join-description"
                class="font-display text-xs font-bold text-white"
              >
                Tell us about your business or idea
              </label>

              <textarea
                id="join-description"
                v-model="form.description"
                name="description"
                rows="5"
                class="mt-2 w-full resize-y rounded-xl border border-white/15 bg-white/10 px-4 py-4 font-body text-sm leading-7 text-white outline-none transition placeholder:text-white/30 focus:border-yen-gold focus:bg-white/15 sm:px-5"
                placeholder="Briefly describe your business, idea, products or services..."
              ></textarea>
            </div>
          </div>


          <!-- =================================
               STEP 3
          ================================== -->

          <div
            v-else
            class="p-6 sm:p-9"
          >
            <!-- Interests -->

            <fieldset>
              <legend
                class="font-display text-xs font-bold text-white"
              >
                What would you like to access through YEN?
              </legend>

              <p
                class="mt-2 font-body text-xs leading-6 text-white/45"
              >
                Select as many as apply.
              </p>


              <div
                class="mt-4 flex flex-wrap gap-2"
              >
                <button
                  v-for="interest in interests"
                  :key="interest"
                  type="button"
                  :aria-pressed="
                    form.interest.includes(
                      interest,
                    )
                  "
                  class="rounded-full border px-3.5 py-2.5 font-display text-[11px] font-bold transition sm:px-4 sm:text-xs"
                  :class="
                    form.interest.includes(
                      interest,
                    )
                      ? 'border-yen-gold bg-yen-gold text-black'
                      : 'border-white/15 bg-white/5 text-white/60 hover:border-yen-gold hover:text-yen-gold'
                  "
                  @click="
                    toggleInterest(interest)
                  "
                >
                  {{ interest }}
                </button>
              </div>
            </fieldset>


            <!-- Motivation -->

            <div class="mt-7">
              <label
                for="join-motivation"
                class="font-display text-xs font-bold text-white"
              >
                Why would you like to join YEN-Liberia? *
              </label>

              <textarea
                id="join-motivation"
                v-model="form.motivation"
                name="motivation"
                rows="6"
                required
                class="mt-2 w-full resize-y rounded-xl border border-white/15 bg-white/10 px-4 py-4 font-body text-sm leading-7 text-white outline-none transition placeholder:text-white/30 focus:border-yen-gold focus:bg-white/15 sm:px-5"
                placeholder="Tell us what you hope to learn, contribute or achieve through the network..."
              ></textarea>
            </div>


            <!-- Consent -->

            <label
              for="join-consent"
              class="mt-6 flex cursor-pointer items-start gap-3"
            >
              <input
                id="join-consent"
                v-model="form.consent"
                name="consent"
                type="checkbox"
                required
                class="mt-1 h-4 w-4 shrink-0 accent-[#fdd131]"
              />

              <span
                class="font-body text-xs leading-6 text-white/50"
              >
                I confirm that the information provided is
                accurate and agree that YEN-Liberia may review
                and contact me regarding this membership
                application. *
              </span>
            </label>
          </div>


          <!-- =================================
               ERROR / STATUS
          ================================== -->

          <div
            v-if="formError || formMessage"
            class="px-6 pb-2 sm:px-9"
          >
            <!-- Error -->

            <p
              v-if="formError"
              role="alert"
              aria-live="assertive"
              class="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 font-display text-xs font-semibold leading-5 text-red-300"
            >
              {{ formError }}
            </p>


            <!-- Status -->

            <p
              v-if="formMessage"
              role="status"
              aria-live="polite"
              class="rounded-xl border border-yen-gold/20 bg-yen-gold/10 px-4 py-3 font-body text-xs leading-6 text-yen-gold"
            >
              {{ formMessage }}
            </p>
          </div>


          <!-- =================================
               NAVIGATION
          ================================== -->

          <div
            class="flex flex-col-reverse gap-3 border-t border-white/10 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-9"
          >
            <!-- Back -->

            <button
              v-if="currentStep > 1"
              type="button"
              class="inline-flex w-full items-center justify-center rounded-full border border-white/20 px-6 py-3.5 font-display text-sm font-bold text-white transition hover:border-yen-gold hover:text-yen-gold sm:w-auto"
              @click="previousStep"
            >
              ← Back
            </button>

            <div
              v-else
              class="hidden sm:block"
            ></div>


            <!-- Continue -->

            <button
              v-if="
                currentStep < totalSteps
              "
              type="button"
              class="inline-flex w-full items-center justify-center rounded-full bg-yen-gold px-7 py-3.5 font-display text-sm font-bold text-black transition hover:bg-white sm:ml-auto sm:w-auto"
              @click="nextStep"
            >
              Continue →

            </button>


            <!-- Final submit -->

            <button
              v-else
              type="submit"
              class="inline-flex w-full items-center justify-center rounded-full bg-yen-gold px-7 py-3.5 font-display text-sm font-bold text-black transition hover:bg-white sm:ml-auto sm:w-auto"
            >
              Submit Application →
            </button>
          </div>
        </form>
      </div>
    </section>


    <!-- ========================================
         PRIVACY / SYSTEM PRINCIPLES
    ========================================= -->

    <section class="bg-[#f7f7f5]">
      <div
        class="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8"
      >
        <div
          class="grid gap-6 md:grid-cols-3"
        >
          <!-- Privacy -->

          <article>
            <p
              class="font-display text-lg font-bold text-black"
            >
              Your information matters.
            </p>

            <p
              class="mt-2 font-body text-sm leading-7 text-gray-600"
            >
              Membership information should only be used for
              legitimate YEN membership and program purposes.
            </p>
          </article>


          <!-- Directory -->

          <article>
            <p
              class="font-display text-lg font-bold text-black"
            >
              No automatic public profile.
            </p>

            <p
              class="mt-2 font-body text-sm leading-7 text-gray-600"
            >
              A membership application should not automatically
              publish an applicant in the entrepreneur
              directory.
            </p>
          </article>


          <!-- Review -->

          <article>
            <p
              class="font-display text-lg font-bold text-black"
            >
              Review before publishing.
            </p>

            <p
              class="mt-2 font-body text-sm leading-7 text-gray-600"
            >
              Public business profiles should require approval
              and appropriate profile information before they
              become visible.
            </p>
          </article>
        </div>
      </div>
    </section>
  </main>
</template>