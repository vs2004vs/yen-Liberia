<script setup>
import {
  computed,
  ref,
} from "vue"

import {
  partners,
  partnershipAreas,
} from "@/data/partners"


/*
|--------------------------------------------------------------------------
| PARTNER LOGOS
|--------------------------------------------------------------------------
*/

const failedLogos = ref([])

const logoFailed = (partnerId) => {
  if (
    !failedLogos.value.includes(
      partnerId,
    )
  ) {
    failedLogos.value.push(
      partnerId,
    )
  }
}


/*
|--------------------------------------------------------------------------
| PARTNERSHIP FORM
|--------------------------------------------------------------------------
*/

const form = ref({
  name: "",
  organization: "",
  email: "",
  phone: "",
  sector: "",
  country: "",
  interest: "",
  message: "",
  acceptedTerms: false,
})

const formError = ref("")
const formMessage = ref("")


const sectors = [
  "Government",
  "Private Sector",
  "Development Organization",
  "NGO / Civil Society",
  "Financial Institution",
  "University / Academia",
  "Foundation",
  "Media",
  "Investor",
  "Other",
]


/*
  Start with the partnership areas defined in
  partners.js, then include any additional
  partnership options we want the inquiry form
  to support.
*/
const interests = computed(() => {
  const dataAreas =
    Array.isArray(partnershipAreas)
      ? partnershipAreas
          .map((area) => area.title)
          .filter(Boolean)
      : []

  const additionalAreas = [
    "Program Funding",
    "Technical Expertise",
    "Access to Finance",
    "Market Access",
    "Research & Data",
    "Digital & Innovation",
    "Events & Networks",
    "Media & Storytelling",
    "Other",
  ]

  return [
    ...new Set([
      ...dataAreas,
      ...additionalAreas,
    ]),
  ]
})


const submitPartnershipForm = () => {
  formError.value = ""
  formMessage.value = ""

  const name =
    form.value.name.trim()

  const organization =
    form.value.organization.trim()

  const email =
    form.value.email.trim()


  /*
    Required validation
  */

  if (
    !name ||
    !organization ||
    !email ||
    !form.value.interest
  ) {
    formError.value =
      "Please complete your name, organization, email and area of interest."

    return
  }


  /*
    Email validation
  */

  const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailPattern.test(email)) {
    formError.value =
      "Please enter a valid email address."

    return
  }


  /*
    Consent validation
  */

  if (!form.value.acceptedTerms) {
    formError.value =
      "Please confirm that YEN-Liberia may contact you regarding this partnership inquiry."

    return
  }


  /*
    FRONTEND ONLY FOR NOW

    Later:

    POST /api/partnership-inquiries

    We deliberately do not say the message
    has been sent or stored until the backend
    actually confirms that.
  */

  formMessage.value =
    "The partnership inquiry form is ready. Submission delivery will activate when the YEN-Liberia backend is connected."
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
        alt="YEN-Liberia partnership and entrepreneurship ecosystem"
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

            <span
              class="text-white/25"
            >
              /
            </span>

            <span
              class="text-yen-gold"
            >
              Partners
            </span>
          </div>


          <!-- Label -->

          <p
            class="font-display text-[10px] font-extrabold uppercase tracking-[0.2em] text-yen-gold sm:text-xs"
          >
            Partner With YEN-Liberia
          </p>


          <!-- Heading -->

          <h1
            class="mt-5 max-w-4xl font-display text-[40px] font-extrabold leading-[1.05] tracking-tight text-white min-[390px]:text-[44px] sm:text-6xl lg:text-7xl"
          >
            Strategic partnerships for

            <span class="text-yen-gold">
              greater entrepreneurial impact.
            </span>
          </h1>


          <!-- Description -->

          <p
            class="mt-6 max-w-2xl font-body text-sm leading-7 text-white/80 sm:mt-7 sm:text-lg sm:leading-8"
          >
            We collaborate with organizations that believe
            young entrepreneurs can drive job creation,
            innovation, stronger communities and Liberia's
            economic transformation.
          </p>


          <!-- Intentional same-page anchor -->

          <a
            href="#partnership-form"
            class="mt-8 inline-flex w-full items-center justify-center rounded-full bg-yen-gold px-7 py-4 font-display text-sm font-bold text-black transition duration-300 hover:-translate-y-1 hover:bg-white sm:mt-9 sm:w-auto"
          >
            Start a Partnership Conversation

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
         WHY PARTNER
    ========================================= -->

    <section class="bg-white">
      <div
        class="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14 lg:px-8 lg:py-28"
      >
        <!-- Heading -->

        <div>
          <div
            class="mb-5 flex items-center gap-3"
          >
            <span
              class="h-[3px] w-10 bg-yen-red"
            ></span>

            <span
              class="font-display text-xs font-bold uppercase tracking-[0.18em] text-yen-red sm:text-sm"
            >
              Why Partner With Us
            </span>
          </div>

          <h2
            class="font-display text-3xl font-extrabold leading-tight text-black min-[390px]:text-4xl sm:text-5xl"
          >
            Strong ecosystems are built through

            <span class="text-yen-red">
              collaboration.
            </span>
          </h2>
        </div>


        <!-- Copy -->

        <div>
          <p
            class="font-body text-sm leading-8 text-gray-600 sm:text-base"
          >
            Entrepreneurship development requires more than one
            organization. Young businesses need access to
            expertise, finance, technology, markets,
            institutions, information and strong networks.
          </p>

          <p
            class="mt-5 font-body text-sm leading-8 text-gray-600 sm:text-base"
          >
            YEN-Liberia works as a bridge between entrepreneurs
            and the organizations that can help create a stronger
            environment for businesses to start, formalize,
            compete and grow.
          </p>
        </div>
      </div>
    </section>


    <!-- ========================================
         PARTNERSHIP AREAS
    ========================================= -->

    <section class="bg-[#f7f7f5]">
      <div
        class="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28"
      >
        <!-- Heading -->

        <div class="max-w-3xl">
          <p
            class="font-display text-[10px] font-extrabold uppercase tracking-[0.18em] text-yen-red sm:text-xs"
          >
            Ways to Collaborate
          </p>

          <h2
            class="mt-4 font-display text-3xl font-extrabold leading-tight text-black min-[390px]:text-4xl sm:text-5xl"
          >
            There are many ways to

            <span class="text-yen-red">
              build with YEN.
            </span>
          </h2>

          <p
            class="mt-5 font-body text-sm leading-8 text-gray-600 sm:text-base"
          >
            Partnership can take different forms depending on
            your organization's strengths, resources and goals.
          </p>
        </div>


        <!-- ==================================
             PARTNERSHIP GRID
        =================================== -->

        <div
          class="mt-10 grid gap-5 sm:mt-14 sm:grid-cols-2 xl:grid-cols-4"
        >
          <article
            v-for="area in partnershipAreas"
            :key="area.id"
            class="group flex h-full flex-col rounded-[1.5rem] bg-white p-6 transition duration-300 hover:-translate-y-2 hover:shadow-xl sm:rounded-[1.6rem] sm:p-7"
          >
            <!-- Number -->

            <div
              class="flex h-12 w-12 items-center justify-center rounded-xl bg-black font-display text-sm font-extrabold text-yen-gold transition duration-300 group-hover:bg-yen-red group-hover:text-white"
            >
              {{ area.id }}
            </div>


            <!-- Title -->

            <h3
              class="mt-6 font-display text-xl font-bold text-black"
            >
              {{ area.title }}
            </h3>


            <!-- Description -->

            <p
              class="mt-3 font-body text-sm leading-7 text-gray-600"
            >
              {{ area.description }}
            </p>


            <!-- Accent -->

            <div
              class="mt-auto pt-6"
            >
              <div
                class="h-[3px] w-9 bg-yen-gold transition-all duration-300 group-hover:w-20"
              ></div>
            </div>
          </article>
        </div>
      </div>
    </section>


    <!-- ========================================
         CURRENT COLLABORATORS
    ========================================= -->

    <section class="bg-white">
      <div
        class="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28"
      >
        <!-- Heading -->

        <div
          class="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end"
        >
          <div>
            <p
              class="font-display text-[10px] font-extrabold uppercase tracking-[0.18em] text-yen-red sm:text-xs"
            >
              Our Ecosystem
            </p>

            <h2
              class="mt-4 font-display text-3xl font-extrabold leading-tight text-black min-[390px]:text-4xl sm:text-5xl"
            >
              Organizations we've

              <span class="text-yen-red">
                worked alongside.
              </span>
            </h2>
          </div>


          <p
            class="max-w-xl font-body text-sm leading-8 text-gray-600 sm:text-base lg:ml-auto"
          >
            These organizations have collaborated with
            YEN-Liberia on publicly documented entrepreneurship,
            MSME, digital-business or sustainability activities.
            Partnership status may vary by initiative.
          </p>
        </div>


        <!-- ==================================
             PARTNER CARDS
        =================================== -->

        <div
          class="mt-10 grid gap-6 md:grid-cols-2 xl:mt-14 xl:grid-cols-3"
        >
          <article
            v-for="partner in partners"
            :key="partner.id"
            class="group flex h-full flex-col rounded-[1.6rem] border border-gray-200 bg-white p-6 transition duration-300 hover:-translate-y-2 hover:border-yen-gold hover:shadow-xl sm:rounded-[1.7rem] sm:p-7"
          >
            <!-- =================================
                 LOGO
            ================================== -->

            <div
              class="flex h-28 items-center justify-center rounded-[1.3rem] bg-[#f7f7f5] p-5"
            >
              <img
                v-if="
                  partner.logo &&
                  !failedLogos.includes(
                    partner.id,
                  )
                "
                :src="partner.logo"
                :alt="`${partner.name} logo`"
                loading="lazy"
                class="max-h-20 max-w-[180px] object-contain"
                @error="
                  logoFailed(partner.id)
                "
              />


              <!-- Logo fallback -->

              <div
                v-else
                class="flex h-16 w-16 items-center justify-center rounded-xl bg-black"
              >
                <span
                  class="font-display text-sm font-extrabold text-yen-gold"
                >
                  {{
                    partner.shortName ||
                    partner.name
                      ?.slice(0, 3)
                      .toUpperCase()
                  }}
                </span>
              </div>
            </div>


            <!-- Partner type -->

            <p
              v-if="partner.type"
              class="mt-6 font-display text-[9px] font-extrabold uppercase tracking-[0.16em] text-yen-red sm:text-[10px]"
            >
              {{ partner.type }}
            </p>


            <!-- Partner name -->

            <h3
              class="mt-3 font-display text-xl font-bold leading-snug text-black"
            >
              {{ partner.name }}
            </h3>


            <!-- Description -->

            <p
              class="mt-4 font-body text-sm leading-7 text-gray-600"
            >
              {{ partner.description }}
            </p>


            <!-- Collaboration -->

            <div
              v-if="partner.collaboration"
              class="mt-6 flex-1 rounded-xl bg-[#f7f7f5] p-5"
            >
              <p
                class="font-display text-[9px] font-extrabold uppercase tracking-[0.15em] text-gray-400"
              >
                YEN Collaboration
              </p>

              <p
                class="mt-3 font-body text-xs leading-6 text-gray-600"
              >
                {{ partner.collaboration }}
              </p>
            </div>


            <!-- Evidence/source -->

            <a
              v-if="partner.sourceUrl"
              :href="partner.sourceUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="mt-6 inline-flex items-center gap-2 font-display text-xs font-bold text-black transition hover:text-yen-red"
              :aria-label="`View collaboration source for ${partner.name} — opens in a new tab`"
            >
              View Collaboration Source

              <span aria-hidden="true">
                ↗
              </span>
            </a>
          </article>
        </div>
      </div>
    </section>


    <!-- ========================================
         ECOSYSTEM STATEMENT
    ========================================= -->

    <section
      class="relative overflow-hidden bg-black"
    >
      <!-- Decoration -->

      <div
        class="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-yen-red/10 blur-3xl"
      ></div>

      <div
        class="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-yen-gold/10 blur-3xl"
      ></div>


      <div
        class="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24"
      >
        <div
          class="mx-auto max-w-4xl text-center"
        >
          <p
            class="font-display text-[10px] font-extrabold uppercase tracking-[0.2em] text-yen-gold sm:text-xs"
          >
            One Ecosystem. Shared Impact.
          </p>

          <h2
            class="mt-5 font-display text-3xl font-extrabold leading-tight text-white min-[390px]:text-4xl sm:text-5xl"
          >
            No single organization can build Liberia's
            entrepreneurship ecosystem alone.
          </h2>

          <p
            class="mx-auto mt-6 max-w-2xl font-body text-sm leading-7 text-white/60 sm:text-base sm:leading-8"
          >
            Government, companies, development partners,
            financial institutions, universities, investors,
            media and entrepreneurs all have a role to play.
          </p>


          <!-- Intentional same-page anchor -->

          <a
            href="#partnership-form"
            class="mt-8 inline-flex w-full items-center justify-center rounded-full bg-yen-gold px-7 py-4 font-display text-sm font-bold text-black transition duration-300 hover:-translate-y-1 hover:bg-white sm:mt-9 sm:w-auto"
          >
            Explore Partnership

            <span
              class="ml-3"
              aria-hidden="true"
            >
              →
            </span>
          </a>
        </div>
      </div>
    </section>


    <!-- ========================================
         PARTNERSHIP FORM
    ========================================= -->

    <section
      id="partnership-form"
      class="scroll-mt-28 bg-white"
    >
      <div
        class="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14 lg:px-8 lg:py-28"
      >
        <!-- ==================================
             FORM INTRO
        =================================== -->

        <div>
          <p
            class="font-display text-[10px] font-extrabold uppercase tracking-[0.18em] text-yen-red sm:text-xs"
          >
            Get In Touch
          </p>

          <h2
            class="mt-4 font-display text-3xl font-extrabold leading-tight text-black min-[390px]:text-4xl sm:text-5xl"
          >
            Start a partnership

            <span class="text-yen-red">
              conversation.
            </span>
          </h2>

          <p
            class="mt-6 font-body text-sm leading-8 text-gray-600 sm:text-base"
          >
            Tell us about your organization and how you would
            like to collaborate with YEN-Liberia.
          </p>


          <!-- Who can partner -->

          <div
            class="mt-8 rounded-[1.5rem] bg-yen-gold p-6 sm:mt-10 sm:rounded-[1.6rem] sm:p-7"
          >
            <p
              class="font-display text-[10px] font-extrabold uppercase tracking-[0.16em] text-yen-red sm:text-xs"
            >
              Who Can Partner?
            </p>

            <ul
              class="mt-5 grid gap-3 font-body text-sm leading-7 text-black/70 sm:grid-cols-2 lg:grid-cols-1"
            >
              <li>
                • Government institutions
              </li>

              <li>
                • Development organizations
              </li>

              <li>
                • Companies & corporate partners
              </li>

              <li>
                • Banks & financial institutions
              </li>

              <li>
                • Foundations
              </li>

              <li>
                • Universities & research institutions
              </li>

              <li>
                • Investors & mentors
              </li>

              <li>
                • NGOs & civil society
              </li>

              <li>
                • Media organizations
              </li>
            </ul>
          </div>
        </div>


        <!-- ==================================
             FORM CARD
        =================================== -->

        <div
          class="rounded-[1.7rem] bg-black p-6 shadow-2xl sm:rounded-[2rem] sm:p-9 lg:p-10"
        >
          <!-- Form heading -->

          <p
            class="font-display text-[10px] font-extrabold uppercase tracking-[0.18em] text-yen-gold sm:text-xs"
          >
            Partnership Inquiry
          </p>

          <h3
            class="mt-3 font-display text-2xl font-bold leading-tight text-white sm:text-3xl"
          >
            Tell us a little about you.
          </h3>

          <p
            id="partnership-form-instructions"
            class="mt-3 font-body text-xs leading-6 text-white/45"
          >
            Fields marked * are required.
          </p>


          <!-- =================================
               FORM
          ================================== -->

          <form
            class="mt-8 space-y-5"
            aria-describedby="partnership-form-instructions"
            @submit.prevent="submitPartnershipForm"
          >
            <!-- Name + Organization -->

            <div
              class="grid gap-5 sm:grid-cols-2"
            >
              <!-- Name -->

              <div>
                <label
                  for="partner-name"
                  class="font-display text-xs font-bold text-white"
                >
                  Your Name *
                </label>

                <input
                  id="partner-name"
                  v-model="form.name"
                  name="name"
                  type="text"
                  autocomplete="name"
                  required
                  class="mt-2 w-full rounded-xl border border-white/15 bg-white/10 px-4 py-4 font-display text-sm text-white outline-none transition placeholder:text-white/30 focus:border-yen-gold focus:bg-white/15 sm:px-5"
                  placeholder="Full name"
                />
              </div>


              <!-- Organization -->

              <div>
                <label
                  for="partner-organization"
                  class="font-display text-xs font-bold text-white"
                >
                  Organization *
                </label>

                <input
                  id="partner-organization"
                  v-model="form.organization"
                  name="organization"
                  type="text"
                  autocomplete="organization"
                  required
                  class="mt-2 w-full rounded-xl border border-white/15 bg-white/10 px-4 py-4 font-display text-sm text-white outline-none transition placeholder:text-white/30 focus:border-yen-gold focus:bg-white/15 sm:px-5"
                  placeholder="Organization name"
                />
              </div>
            </div>


            <!-- Email + Phone -->

            <div
              class="grid gap-5 sm:grid-cols-2"
            >
              <!-- Email -->

              <div>
                <label
                  for="partner-email"
                  class="font-display text-xs font-bold text-white"
                >
                  Email *
                </label>

                <input
                  id="partner-email"
                  v-model="form.email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  inputmode="email"
                  required
                  class="mt-2 w-full rounded-xl border border-white/15 bg-white/10 px-4 py-4 font-display text-sm text-white outline-none transition placeholder:text-white/30 focus:border-yen-gold focus:bg-white/15 sm:px-5"
                  placeholder="you@organization.org"
                />
              </div>


              <!-- Phone -->

              <div>
                <label
                  for="partner-phone"
                  class="font-display text-xs font-bold text-white"
                >
                  Phone
                </label>

                <input
                  id="partner-phone"
                  v-model="form.phone"
                  name="phone"
                  type="tel"
                  autocomplete="tel"
                  inputmode="tel"
                  class="mt-2 w-full rounded-xl border border-white/15 bg-white/10 px-4 py-4 font-display text-sm text-white outline-none transition placeholder:text-white/30 focus:border-yen-gold focus:bg-white/15 sm:px-5"
                  placeholder="+231..."
                />
              </div>
            </div>


            <!-- Sector + Country -->

            <div
              class="grid gap-5 sm:grid-cols-2"
            >
              <!-- Sector -->

              <div>
                <label
                  for="partner-sector"
                  class="font-display text-xs font-bold text-white"
                >
                  Sector
                </label>

                <select
                  id="partner-sector"
                  v-model="form.sector"
                  name="sector"
                  class="mt-2 w-full rounded-xl border border-white/15 bg-white/10 px-4 py-4 font-display text-sm text-white outline-none transition focus:border-yen-gold focus:bg-white/15 sm:px-5"
                >
                  <option
                    value=""
                    class="text-black"
                  >
                    Select sector
                  </option>

                  <option
                    v-for="sector in sectors"
                    :key="sector"
                    :value="sector"
                    class="text-black"
                  >
                    {{ sector }}
                  </option>
                </select>
              </div>


              <!-- Country -->

              <div>
                <label
                  for="partner-country"
                  class="font-display text-xs font-bold text-white"
                >
                  Country
                </label>

                <input
                  id="partner-country"
                  v-model="form.country"
                  name="country"
                  type="text"
                  autocomplete="country-name"
                  class="mt-2 w-full rounded-xl border border-white/15 bg-white/10 px-4 py-4 font-display text-sm text-white outline-none transition placeholder:text-white/30 focus:border-yen-gold focus:bg-white/15 sm:px-5"
                  placeholder="Country"
                />
              </div>
            </div>


            <!-- Interest -->

            <div>
              <label
                for="partner-interest"
                class="font-display text-xs font-bold text-white"
              >
                Area of Interest *
              </label>

              <select
                id="partner-interest"
                v-model="form.interest"
                name="interest"
                required
                class="mt-2 w-full rounded-xl border border-white/15 bg-white/10 px-4 py-4 font-display text-sm text-white outline-none transition focus:border-yen-gold focus:bg-white/15 sm:px-5"
              >
                <option
                  value=""
                  class="text-black"
                >
                  Select partnership area
                </option>

                <option
                  v-for="interest in interests"
                  :key="interest"
                  :value="interest"
                  class="text-black"
                >
                  {{ interest }}
                </option>
              </select>
            </div>


            <!-- Message -->

            <div>
              <label
                for="partner-message"
                class="font-display text-xs font-bold text-white"
              >
                Message
              </label>

              <textarea
                id="partner-message"
                v-model="form.message"
                name="message"
                rows="5"
                class="mt-2 w-full resize-y rounded-xl border border-white/15 bg-white/10 px-4 py-4 font-body text-sm leading-7 text-white outline-none transition placeholder:text-white/30 focus:border-yen-gold focus:bg-white/15 sm:px-5"
                placeholder="Tell us how you would like to work with YEN-Liberia..."
              ></textarea>
            </div>


            <!-- Consent -->

            <label
              for="partner-consent"
              class="flex cursor-pointer items-start gap-3"
            >
              <input
                id="partner-consent"
                v-model="form.acceptedTerms"
                name="consent"
                type="checkbox"
                required
                class="mt-1 h-4 w-4 shrink-0 accent-[#fdd131]"
              />

              <span
                class="font-body text-xs leading-6 text-white/50"
              >
                I agree that YEN-Liberia may contact me regarding
                this partnership inquiry. *
              </span>
            </label>


            <!-- Error -->

            <p
              v-if="formError"
              role="alert"
              aria-live="assertive"
              class="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 font-display text-xs font-semibold leading-5 text-red-300"
            >
              {{ formError }}
            </p>


            <!-- Frontend development message -->

            <p
              v-if="formMessage"
              role="status"
              aria-live="polite"
              class="rounded-xl border border-yen-gold/20 bg-yen-gold/10 px-4 py-3 font-body text-xs leading-6 text-yen-gold"
            >
              {{ formMessage }}
            </p>


            <!-- Submit -->

            <button
              type="submit"
              class="flex w-full items-center justify-center rounded-xl bg-yen-gold px-7 py-4 font-display text-sm font-bold text-black transition duration-300 hover:bg-white"
            >
              Submit Partnership Inquiry

              <span
                class="ml-3"
                aria-hidden="true"
              >
                →
              </span>
            </button>
          </form>
        </div>
      </div>
    </section>
  </main>
</template>