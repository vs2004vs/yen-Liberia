<script setup>
import {
  computed,
  watchEffect,
} from "vue"

import { useRoute } from "vue-router"

import {
  entrepreneurs,
  getEntrepreneurBySlug,
} from "@/data/entrepreneurs"


/*
|--------------------------------------------------------------------------
| ROUTE
|--------------------------------------------------------------------------
*/

const route = useRoute()


/*
|--------------------------------------------------------------------------
| CURRENT ENTREPRENEUR
|--------------------------------------------------------------------------
*/

const entrepreneur = computed(() => {
  const slug = String(
    route.params.slug ?? "",
  )

  return getEntrepreneurBySlug(slug)
})


/*
|--------------------------------------------------------------------------
| SAFE DATA HELPERS
|--------------------------------------------------------------------------
*/

const productsServices = computed(() => {
  return Array.isArray(
    entrepreneur.value?.productsServices,
  )
    ? entrepreneur.value.productsServices
    : []
})


const impactStats = computed(() => {
  return Array.isArray(
    entrepreneur.value?.impactStats,
  )
    ? entrepreneur.value.impactStats
    : []
})


/*
|--------------------------------------------------------------------------
| CONTACT INFORMATION
|--------------------------------------------------------------------------
*/

const hasContactInformation = computed(() => {
  if (!entrepreneur.value) {
    return false
  }

  return Boolean(
    entrepreneur.value.website ||
      entrepreneur.value.facebook ||
      entrepreneur.value.instagram ||
      entrepreneur.value.linkedin ||
      entrepreneur.value.phone ||
      entrepreneur.value.email,
  )
})


/*
|--------------------------------------------------------------------------
| SOCIAL / EXTERNAL LINKS
|--------------------------------------------------------------------------
*/

const socialLinks = computed(() => {
  if (!entrepreneur.value) {
    return []
  }

  return [
    {
      label: "Facebook",
      url: entrepreneur.value.facebook,
    },
    {
      label: "Instagram",
      url: entrepreneur.value.instagram,
    },
    {
      label: "LinkedIn",
      url: entrepreneur.value.linkedin,
    },
  ].filter((item) => item.url)
})


/*
|--------------------------------------------------------------------------
| RELATED ENTREPRENEURS
|--------------------------------------------------------------------------
|
| Priority:
| 1. Same industry
| 2. Same county
| 3. Other entrepreneurs
|
*/

const relatedEntrepreneurs = computed(() => {
  if (!entrepreneur.value) {
    return []
  }

  const currentId =
    entrepreneur.value.id

  const others = entrepreneurs.filter(
    (item) =>
      item.id !== currentId,
  )


  const sameIndustry =
    others.filter(
      (item) =>
        item.industry ===
        entrepreneur.value.industry,
    )


  const sameCounty =
    others.filter(
      (item) =>
        item.industry !==
          entrepreneur.value.industry &&
        item.county ===
          entrepreneur.value.county,
    )


  const remaining =
    others.filter(
      (item) =>
        item.industry !==
          entrepreneur.value.industry &&
        item.county !==
          entrepreneur.value.county,
    )


  return [
    ...sameIndustry,
    ...sameCounty,
    ...remaining,
  ].slice(0, 3)
})


/*
|--------------------------------------------------------------------------
| DYNAMIC DOCUMENT TITLE
|--------------------------------------------------------------------------
*/

watchEffect(() => {
  const siteName =
    "Youth Entrepreneurs Network–Liberia"

  document.title = entrepreneur.value
    ? `${entrepreneur.value.name} | ${siteName}`
    : `Entrepreneur Not Found | ${siteName}`
})
</script>


<template>
  <!-- ==========================================
       VALID ENTREPRENEUR
  =========================================== -->

  <main
    v-if="entrepreneur"
    class="w-full overflow-hidden"
  >

    <!-- ========================================
         PROFILE HERO
    ========================================= -->

    <section
      class="relative isolate min-h-[600px] overflow-hidden sm:min-h-[640px] lg:min-h-[680px]"
    >
      <!-- Background image -->

      <img
        :src="entrepreneur.image"
        :alt="entrepreneur.name"
        class="absolute inset-0 h-full w-full object-cover object-center"
      />


      <!-- Contrast -->

      <div
        class="absolute inset-0 bg-linear-to-r from-black/90 via-black/65 to-black/25 sm:from-black/85 sm:via-black/55 sm:to-black/10"
      ></div>

      <div
        class="absolute inset-0 bg-linear-to-t from-black/75 via-transparent to-black/20"
      ></div>


      <!-- Content -->

      <div
        class="relative z-10 mx-auto flex min-h-[600px] max-w-7xl items-end px-5 pb-16 pt-24 sm:min-h-[640px] sm:px-6 sm:pb-20 lg:min-h-[680px] lg:px-8"
      >
        <div class="w-full max-w-4xl">

          <!-- Breadcrumb -->

          <nav
            class="mb-6 flex flex-wrap items-center gap-3 font-display text-xs font-bold sm:mb-8"
            aria-label="Breadcrumb"
          >
            <RouterLink
              :to="{ name: 'home' }"
              class="text-white/55 transition hover:text-yen-gold"
            >
              Home
            </RouterLink>

            <span
              class="text-white/25"
              aria-hidden="true"
            >
              /
            </span>

            <RouterLink
              :to="{ name: 'entrepreneurs' }"
              class="text-white/55 transition hover:text-yen-gold"
            >
              Entrepreneurs
            </RouterLink>

            <span
              class="text-white/25"
              aria-hidden="true"
            >
              /
            </span>

            <span
              class="max-w-[220px] truncate text-yen-gold sm:max-w-md"
              aria-current="page"
            >
              {{ entrepreneur.name }}
            </span>
          </nav>


          <!-- Status -->

          <div
            class="flex flex-wrap gap-3"
          >
            <span
              v-if="entrepreneur.industry"
              class="rounded-full bg-yen-gold px-4 py-2 font-display text-[10px] font-extrabold uppercase tracking-wider text-black"
            >
              {{ entrepreneur.industry }}
            </span>


            <span
              v-if="entrepreneur.verified"
              class="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/20 px-4 py-2 font-display text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md"
            >
              <span
                class="flex h-4 w-4 items-center justify-center rounded-full bg-yen-red text-[8px]"
                aria-hidden="true"
              >
                ✓
              </span>

              Verified YEN Profile
            </span>
          </div>


          <!-- Name -->

          <h1
            class="mt-6 max-w-4xl font-display text-[40px] font-extrabold leading-[1.05] tracking-tight text-white min-[390px]:text-[44px] sm:text-6xl lg:text-7xl"
          >
            {{ entrepreneur.name }}
          </h1>


          <!-- Role / business -->

          <p
            v-if="
              entrepreneur.role ||
              entrepreneur.business
            "
            class="mt-3 font-display text-lg font-bold leading-7 text-yen-gold sm:text-2xl"
          >
            <span
              v-if="entrepreneur.role"
            >
              {{ entrepreneur.role }}
            </span>

            <span
              v-if="
                entrepreneur.role &&
                entrepreneur.business
              "
            >
              ,
            </span>

            <span
              v-if="entrepreneur.business"
            >
              {{ entrepreneur.business }}
            </span>
          </p>


          <!-- Headline -->

          <p
            v-if="entrepreneur.headline"
            class="mt-6 max-w-3xl font-body text-sm leading-7 text-white/80 sm:text-lg sm:leading-8"
          >
            {{ entrepreneur.headline }}
          </p>
        </div>
      </div>


      <!-- Accent -->

      <div
        class="absolute bottom-0 left-0 z-20 h-1 w-full bg-linear-to-r from-yen-red via-yen-gold to-yen-red"
      ></div>
    </section>


    <!-- ========================================
         PROFILE OVERVIEW
    ========================================= -->

    <section class="bg-white">
      <div
        class="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 lg:px-8 lg:py-28"
      >

        <!-- ==================================
             LEFT CONTENT
        =================================== -->

        <div>
          <p
            class="font-display text-[10px] font-extrabold uppercase tracking-[0.18em] text-yen-red sm:text-xs"
          >
            Entrepreneur Profile
          </p>


          <h2
            class="mt-4 font-display text-3xl font-extrabold leading-tight text-black min-[390px]:text-4xl sm:text-5xl"
          >
            About {{ entrepreneur.name }}
          </h2>


          <p
            v-if="entrepreneur.about"
            class="mt-6 font-body text-sm leading-8 text-gray-600 sm:text-base"
          >
            {{ entrepreneur.about }}
          </p>


          <!-- =================================
               JOURNEY
          ================================== -->

          <section
            v-if="entrepreneur.story"
            class="mt-10 sm:mt-12"
            aria-labelledby="journey-heading"
          >
            <h3
              id="journey-heading"
              class="font-display text-2xl font-bold text-black"
            >
              The Business Journey
            </h3>

            <p
              class="mt-5 font-body text-sm leading-8 text-gray-600 sm:text-base"
            >
              {{ entrepreneur.story }}
            </p>
          </section>


          <!-- =================================
               YEN CONNECTION
          ================================== -->

          <section
            v-if="entrepreneur.yenSupport"
            class="mt-10 rounded-[1.5rem] bg-[#f7f7f5] p-6 sm:rounded-[1.6rem] sm:p-8"
            aria-labelledby="yen-connection-heading"
          >
            <p
              class="font-display text-[10px] font-extrabold uppercase tracking-[0.17em] text-yen-red sm:text-xs"
            >
              YEN Connection
            </p>

            <h3
              id="yen-connection-heading"
              class="mt-3 font-display text-xl font-bold text-black"
            >
              Growing through the network
            </h3>

            <p
              class="mt-4 font-body text-sm leading-7 text-gray-600"
            >
              {{ entrepreneur.yenSupport }}
            </p>
          </section>


          <!-- =================================
               PRODUCTS & SERVICES
          ================================== -->

          <section
            v-if="productsServices.length"
            class="mt-10 sm:mt-12"
            aria-labelledby="services-heading"
          >
            <h3
              id="services-heading"
              class="font-display text-2xl font-bold text-black"
            >
              Products & Services
            </h3>

            <ul
              class="mt-6 flex flex-wrap gap-3"
            >
              <li
                v-for="service in productsServices"
                :key="service"
                class="rounded-full border border-gray-200 bg-white px-4 py-3 font-display text-xs font-bold leading-5 text-black shadow-sm sm:px-5"
              >
                {{ service }}
              </li>
            </ul>
          </section>


          <!-- =================================
               IMPACT
          ================================== -->

          <section
            v-if="impactStats.length"
            class="mt-10 sm:mt-12"
            aria-labelledby="impact-heading"
          >
            <h3
              id="impact-heading"
              class="font-display text-2xl font-bold text-black"
            >
              Business Impact
            </h3>

            <div
              class="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
            >
              <article
                v-for="stat in impactStats"
                :key="stat.label"
                class="rounded-[1.4rem] bg-black p-6"
              >
                <p
                  class="font-display text-3xl font-extrabold text-yen-gold"
                >
                  {{ stat.value }}
                </p>

                <p
                  class="mt-2 font-display text-xs font-semibold leading-5 text-white/55"
                >
                  {{ stat.label }}
                </p>
              </article>
            </div>
          </section>
        </div>


        <!-- ==================================
             BUSINESS INFORMATION
        =================================== -->

        <aside
          aria-label="Business information"
        >
          <div
            class="overflow-hidden rounded-[1.6rem] bg-black sm:rounded-[1.8rem] lg:sticky lg:top-28"
          >
            <div
              class="p-6 sm:p-8"
            >
              <p
                class="font-display text-[10px] font-extrabold uppercase tracking-[0.18em] text-yen-gold sm:text-xs"
              >
                Business Information
              </p>


              <h3
                v-if="entrepreneur.business"
                class="mt-4 font-display text-2xl font-bold leading-snug text-white"
              >
                {{ entrepreneur.business }}
              </h3>


              <!-- Business details -->

              <dl
                class="mt-7 divide-y divide-white/10"
              >
                <!-- Founder -->

                <div
                  v-if="entrepreneur.name"
                  class="py-5 first:pt-0"
                >
                  <dt
                    class="font-display text-[9px] font-bold uppercase tracking-wider text-white/35 sm:text-[10px]"
                  >
                    Founder
                  </dt>

                  <dd
                    class="mt-2 font-display text-sm font-semibold leading-6 text-white"
                  >
                    {{ entrepreneur.name }}
                  </dd>
                </div>


                <!-- Industry -->

                <div
                  v-if="entrepreneur.industry"
                  class="py-5 first:pt-0"
                >
                  <dt
                    class="font-display text-[9px] font-bold uppercase tracking-wider text-white/35 sm:text-[10px]"
                  >
                    Industry
                  </dt>

                  <dd
                    class="mt-2 font-display text-sm font-semibold leading-6 text-white"
                  >
                    {{ entrepreneur.industry }}
                  </dd>
                </div>


                <!-- County -->

                <div
                  v-if="entrepreneur.county"
                  class="py-5 first:pt-0"
                >
                  <dt
                    class="font-display text-[9px] font-bold uppercase tracking-wider text-white/35 sm:text-[10px]"
                  >
                    County
                  </dt>

                  <dd
                    class="mt-2 font-display text-sm font-semibold leading-6 text-white"
                  >
                    {{ entrepreneur.county }}
                  </dd>
                </div>


                <!-- Location -->

                <div
                  v-if="entrepreneur.location"
                  class="py-5 first:pt-0"
                >
                  <dt
                    class="font-display text-[9px] font-bold uppercase tracking-wider text-white/35 sm:text-[10px]"
                  >
                    Location
                  </dt>

                  <dd
                    class="mt-2 font-display text-sm font-semibold leading-6 text-white"
                  >
                    {{ entrepreneur.location }}
                  </dd>
                </div>


                <!-- Founded -->

                <div
                  v-if="entrepreneur.yearFounded"
                  class="py-5 first:pt-0"
                >
                  <dt
                    class="font-display text-[9px] font-bold uppercase tracking-wider text-white/35 sm:text-[10px]"
                  >
                    Founded
                  </dt>

                  <dd
                    class="mt-2 font-display text-sm font-semibold leading-6 text-white"
                  >
                    {{ entrepreneur.yearFounded }}
                  </dd>
                </div>


                <!-- Status -->

                <div
                  v-if="entrepreneur.memberStatus"
                  class="py-5 first:pt-0"
                >
                  <dt
                    class="font-display text-[9px] font-bold uppercase tracking-wider text-white/35 sm:text-[10px]"
                  >
                    YEN Status
                  </dt>

                  <dd>
                    <span
                      class="mt-2 inline-flex rounded-full bg-yen-gold/10 px-3 py-2 font-display text-[10px] font-bold uppercase text-yen-gold"
                    >
                      {{ entrepreneur.memberStatus }}
                    </span>
                  </dd>
                </div>
              </dl>


              <!-- =================================
                   CONTACT INFORMATION
              ================================== -->

              <div
                v-if="hasContactInformation"
                class="mt-7 border-t border-white/10 pt-7"
              >
                <p
                  class="font-display text-[9px] font-bold uppercase tracking-[0.16em] text-white/35 sm:text-[10px]"
                >
                  Connect With This Business
                </p>


                <div
                  class="mt-4 space-y-3"
                >
                  <!-- Website -->

                  <a
                    v-if="entrepreneur.website"
                    :href="entrepreneur.website"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex w-full items-center justify-center rounded-full bg-yen-gold px-6 py-4 font-display text-sm font-bold text-black transition hover:bg-white"
                    :aria-label="`Visit ${entrepreneur.business || entrepreneur.name} website — opens in a new tab`"
                  >
                    Visit Website

                    <span
                      class="ml-3"
                      aria-hidden="true"
                    >
                      ↗
                    </span>
                  </a>


                  <!-- Email -->

                  <a
                    v-if="entrepreneur.email"
                    :href="`mailto:${entrepreneur.email}`"
                    class="flex w-full items-center justify-center rounded-full border border-white/20 px-6 py-4 font-display text-sm font-bold text-white transition hover:border-yen-gold hover:text-yen-gold"
                  >
                    Email Business
                  </a>


                  <!-- Phone -->

                  <a
                    v-if="entrepreneur.phone"
                    :href="`tel:${entrepreneur.phone}`"
                    class="flex w-full items-center justify-center rounded-full border border-white/20 px-6 py-4 font-display text-sm font-bold text-white transition hover:border-yen-gold hover:text-yen-gold"
                  >
                    Call Business
                  </a>
                </div>


                <!-- Social profiles -->

                <div
                  v-if="socialLinks.length"
                  class="mt-5 flex flex-wrap gap-2"
                >
                  <a
                    v-for="social in socialLinks"
                    :key="social.label"
                    :href="social.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="rounded-full border border-white/15 bg-white/5 px-4 py-2.5 font-display text-[10px] font-bold text-white/70 transition hover:border-yen-gold hover:text-yen-gold"
                    :aria-label="`${entrepreneur.name} on ${social.label} — opens in a new tab`"
                  >
                    {{ social.label }}
                  </a>
                </div>
              </div>


              <!-- Contact unavailable -->

              <div
                v-else
                class="mt-7 rounded-xl bg-white/5 p-4"
              >
                <p
                  class="font-body text-xs leading-6 text-white/45"
                >
                  Public contact information has not yet been
                  added to this profile.
                </p>
              </div>


              <!-- Directory -->

              <RouterLink
                :to="{ name: 'entrepreneurs' }"
                class="mt-5 flex w-full items-center justify-center rounded-full border border-white/20 px-6 py-3.5 font-display text-xs font-bold text-white transition hover:border-yen-gold hover:text-yen-gold"
              >
                ← Entrepreneur Directory
              </RouterLink>
            </div>


            <!-- Profile notice -->

            <div
              class="bg-yen-gold px-6 py-5 sm:px-8"
            >
              <p
                class="font-body text-xs leading-6 text-black/70"
              >
                Profile details, business claims and public
                contact information should be confirmed by the
                entrepreneur and YEN-Liberia before publication.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </section>


    <!-- ========================================
         RELATED ENTREPRENEURS
    ========================================= -->

    <section
      v-if="relatedEntrepreneurs.length"
      class="bg-[#f7f7f5]"
    >
      <div
        class="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24"
      >
        <!-- Header -->

        <div
          class="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p
              class="font-display text-[10px] font-extrabold uppercase tracking-[0.18em] text-yen-red sm:text-xs"
            >
              Explore the Network
            </p>

            <h2
              class="mt-3 font-display text-3xl font-extrabold leading-tight text-black sm:text-4xl"
            >
              Meet more entrepreneurs
            </h2>
          </div>


          <RouterLink
            :to="{ name: 'entrepreneurs' }"
            class="inline-flex items-center gap-2 font-display text-sm font-bold text-black transition hover:text-yen-red"
          >
            View Directory

            <span aria-hidden="true">
              →
            </span>
          </RouterLink>
        </div>


        <!-- Cards -->

        <div
          class="mt-9 grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
        >
          <article
            v-for="item in relatedEntrepreneurs"
            :key="item.id"
            class="group flex h-full flex-col overflow-hidden rounded-[1.6rem] bg-white transition duration-300 hover:-translate-y-2 hover:shadow-xl"
          >
            <!-- Image -->

            <div
              class="relative h-[300px] overflow-hidden"
            >
              <img
                :src="item.image"
                :alt="item.name"
                loading="lazy"
                class="h-full w-full object-cover object-center transition duration-700 group-hover:scale-105"
              />

              <div
                class="absolute inset-0 bg-linear-to-t from-black/85 via-black/10 to-transparent"
              ></div>


              <!-- Verified -->

              <span
                v-if="item.verified"
                class="absolute right-4 top-4 rounded-full bg-white px-3 py-2 font-display text-[9px] font-extrabold uppercase text-black"
              >
                Verified
              </span>


              <!-- Identity -->

              <div
                class="absolute bottom-0 left-0 right-0 p-5"
              >
                <p
                  v-if="item.role"
                  class="font-display text-[10px] font-bold text-yen-gold"
                >
                  {{ item.role }}
                </p>

                <h3
                  class="mt-1 font-display text-xl font-extrabold text-white"
                >
                  {{ item.name }}
                </h3>

                <p
                  v-if="item.business"
                  class="mt-1 font-display text-xs font-semibold text-white/65"
                >
                  {{ item.business }}
                </p>
              </div>
            </div>


            <!-- Body -->

            <div
              class="flex flex-1 flex-col p-6"
            >
              <div
                class="flex flex-wrap gap-2"
              >
                <span
                  v-if="item.industry"
                  class="rounded-full bg-black px-3 py-2 font-display text-[9px] font-bold uppercase text-white"
                >
                  {{ item.industry }}
                </span>

                <span
                  v-if="item.county"
                  class="rounded-full bg-yen-gold/25 px-3 py-2 font-display text-[9px] font-bold uppercase text-black"
                >
                  {{ item.county }}
                </span>
              </div>


              <p
                v-if="item.shortDescription"
                class="mt-4 font-body text-sm leading-7 text-gray-600"
              >
                {{ item.shortDescription }}
              </p>


              <div class="mt-auto pt-6">
                <RouterLink
                  :to="{
                    name: 'entrepreneur-detail',
                    params: {
                      slug: item.slug,
                    },
                  }"
                  class="flex items-center justify-between rounded-xl bg-black px-5 py-4 font-display text-sm font-bold text-white transition group-hover:bg-yen-red"
                >
                  View Profile

                  <span
                    class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-yen-gold text-black"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </RouterLink>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>


    <!-- ========================================
         CTA
    ========================================= -->

    <section class="bg-white">
      <div
        class="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24"
      >
        <div
          class="relative overflow-hidden rounded-[1.7rem] bg-black p-7 sm:rounded-[2rem] sm:p-10 lg:p-14"
        >
          <div
            class="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-yen-gold/10"
          ></div>


          <div
            class="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center"
          >
            <div class="max-w-3xl">
              <p
                class="font-display text-[10px] font-extrabold uppercase tracking-[0.18em] text-yen-gold sm:text-xs"
              >
                Build Your Network
              </p>

              <h2
                class="mt-4 font-display text-2xl font-extrabold leading-tight text-white sm:text-4xl"
              >
                Discover entrepreneurs or become part of the
                YEN-Liberia network.
              </h2>

              <p
                class="mt-4 max-w-2xl font-body text-sm leading-7 text-white/60 sm:text-base"
              >
                Explore other businesses across the network or
                start your own YEN-Liberia membership
                application.
              </p>
            </div>


            <div
              class="flex flex-col gap-3 sm:flex-row lg:flex-col"
            >
              <RouterLink
                :to="{ name: 'entrepreneurs' }"
                class="inline-flex w-full items-center justify-center rounded-full bg-yen-gold px-7 py-4 font-display text-sm font-bold text-black transition duration-300 hover:-translate-y-1 hover:bg-white sm:w-auto sm:min-w-[220px]"
              >
                Explore Directory

                <span
                  class="ml-3"
                  aria-hidden="true"
                >
                  →
                </span>
              </RouterLink>


              <RouterLink
                :to="{ name: 'join' }"
                class="inline-flex w-full items-center justify-center rounded-full border border-white/25 px-7 py-4 font-display text-sm font-bold text-white transition hover:border-yen-gold hover:text-yen-gold sm:w-auto sm:min-w-[220px]"
              >
                Join YEN-Liberia
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>


  <!-- ==========================================
       INVALID ENTREPRENEUR
  =========================================== -->

  <main
    v-else
    class="relative flex min-h-[70vh] items-center overflow-hidden bg-white px-5 py-20 text-center"
  >
    <div
      class="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-yen-gold/15 blur-3xl"
    ></div>

    <div
      class="pointer-events-none absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-yen-red/10 blur-3xl"
    ></div>


    <div
      class="relative mx-auto max-w-2xl"
    >
      <p
        class="font-display text-7xl font-black text-yen-gold sm:text-8xl"
      >
        404
      </p>

      <p
        class="mt-4 font-display text-[10px] font-extrabold uppercase tracking-[0.2em] text-yen-red sm:text-xs"
      >
        Entrepreneur Not Found
      </p>

      <h1
        class="mt-4 font-display text-3xl font-extrabold leading-tight text-black sm:text-4xl"
      >
        We couldn't find this entrepreneur profile.
      </h1>

      <p
        class="mx-auto mt-4 max-w-lg font-body text-sm leading-7 text-gray-600 sm:text-base"
      >
        The profile may have been removed, unpublished, or the
        link may be incorrect.
      </p>


      <div
        class="mt-8 flex flex-col justify-center gap-3 sm:flex-row"
      >
        <RouterLink
          :to="{ name: 'entrepreneurs' }"
          class="inline-flex items-center justify-center rounded-full bg-black px-7 py-4 font-display text-sm font-bold text-white transition hover:bg-yen-red"
        >
          Browse Entrepreneurs

          <span
            class="ml-3 text-yen-gold"
            aria-hidden="true"
          >
            →
          </span>
        </RouterLink>


        <RouterLink
          :to="{ name: 'home' }"
          class="inline-flex items-center justify-center rounded-full border border-black px-7 py-4 font-display text-sm font-bold text-black transition hover:bg-yen-gold"
        >
          Return Home
        </RouterLink>
      </div>
    </div>
  </main>
</template>