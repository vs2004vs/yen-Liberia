<script setup>
import {
  computed,
  watchEffect,
} from "vue"

import { useRoute } from "vue-router"

import {
  opportunities,
  getOpportunityBySlug,
} from "@/data/opportunities"

import {
  setPageSeo,
} from "@/utils/seo"


/*
|--------------------------------------------------------------------------
| ROUTE
|--------------------------------------------------------------------------
*/

const route = useRoute()


/*
|--------------------------------------------------------------------------
| CURRENT OPPORTUNITY
|--------------------------------------------------------------------------
*/

const opportunity = computed(() => {
  const slug = String(
    route.params.slug ?? "",
  )

  return getOpportunityBySlug(slug)
})


/*
|--------------------------------------------------------------------------
| SAFE DATA HELPERS
|--------------------------------------------------------------------------
*/

const eligibility = computed(() => {
  return Array.isArray(
    opportunity.value?.eligibility,
  )
    ? opportunity.value.eligibility
    : []
})


const benefits = computed(() => {
  return Array.isArray(
    opportunity.value?.benefits,
  )
    ? opportunity.value.benefits
    : []
})


const requirements = computed(() => {
  return Array.isArray(
    opportunity.value?.requirements,
  )
    ? opportunity.value.requirements
    : []
})


/*
|--------------------------------------------------------------------------
| INDEXING SAFEGUARD
|--------------------------------------------------------------------------
|
| Current opportunity records are still development/sample content.
|
| They remain visible on the site, but search engines should not
| intentionally index them until we explicitly approve a real record.
|
| Later, a verified opportunity can include:
|
| indexable: true
|
| inside opportunities.js.
|
*/

const shouldIndexOpportunity = computed(() => {
  return (
    opportunity.value?.indexable === true
  )
})


/*
|--------------------------------------------------------------------------
| RELATED OPPORTUNITIES
|--------------------------------------------------------------------------
|
| Prioritize other opportunities in the same category,
| then fill remaining spaces with other records.
|
*/

const relatedOpportunities = computed(() => {
  if (!opportunity.value) {
    return []
  }

  const currentId =
    opportunity.value.id

  const otherOpportunities =
    opportunities.filter(
      (item) =>
        item.id !== currentId,
    )

  const sameCategory =
    otherOpportunities.filter(
      (item) =>
        item.category ===
        opportunity.value.category,
    )

  const differentCategory =
    otherOpportunities.filter(
      (item) =>
        item.category !==
        opportunity.value.category,
    )

  return [
    ...sameCategory,
    ...differentCategory,
  ].slice(0, 3)
})


/*
|--------------------------------------------------------------------------
| OPPORTUNITY SEO
|--------------------------------------------------------------------------
|
| Replace the router's generic:
|
| Opportunity | Youth Entrepreneurs Network–Liberia
|
| with the actual opportunity information.
|
|--------------------------------------------------------------------------
*/

watchEffect(() => {
  /*
  |--------------------------------------------------------------------------
  | OPPORTUNITY NOT FOUND
  |--------------------------------------------------------------------------
  */

  if (!opportunity.value) {
    setPageSeo({
      title:
        "Opportunity Not Found",

      description:
        "The requested YEN-Liberia opportunity could not be found.",

      path:
        route.path,

      robots:
        "noindex, follow",

      type:
        "website",
    })

    return
  }


  /*
  |--------------------------------------------------------------------------
  | DESCRIPTION
  |--------------------------------------------------------------------------
  */

  const description =
    opportunity.value.summary ||
    opportunity.value.description ||
    "Explore this entrepreneurship opportunity shared through the YEN-Liberia Opportunities Hub."


  /*
  |--------------------------------------------------------------------------
  | SOCIAL IMAGE
  |--------------------------------------------------------------------------
  */

  const image =
    opportunity.value.image
      ? new URL(
          opportunity.value.image,
          "https://yen-lib.netlify.app",
        ).toString()
      : undefined


  /*
  |--------------------------------------------------------------------------
  | APPLY SEO
  |--------------------------------------------------------------------------
  */

  setPageSeo({
    title:
      opportunity.value.title,

    description,

    path:
      route.path,

    image,

    robots:
      shouldIndexOpportunity.value
        ? "index, follow"
        : "noindex, follow",

    type:
      "website",
  })
})
</script>


<template>
  <!-- ==========================================
       VALID OPPORTUNITY
  =========================================== -->

  <main
    v-if="opportunity"
    class="w-full overflow-hidden"
  >

    <!-- ========================================
         HERO
    ========================================= -->

    <section
      class="relative isolate min-h-[560px] overflow-hidden sm:min-h-[600px] lg:min-h-[640px]"
    >
      <!-- Background -->

      <img
        :src="opportunity.image"
        :alt="opportunity.title"
        class="absolute inset-0 h-full w-full object-cover object-center"
      />


      <!-- Contrast -->

      <div
        class="absolute inset-0 bg-linear-to-r from-black/90 via-black/65 to-black/25 sm:from-black/85 sm:via-black/55 sm:to-black/10"
      ></div>

      <div
        class="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/20"
      ></div>


      <!-- Content -->

      <div
        class="relative z-10 mx-auto flex min-h-[560px] max-w-7xl items-center px-5 py-16 sm:min-h-[600px] sm:px-6 sm:py-20 lg:min-h-[640px] lg:px-8"
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
              :to="{ name: 'opportunities' }"
              class="text-white/55 transition hover:text-yen-gold"
            >
              Opportunities
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
              {{
                opportunity.category ||
                opportunity.title
              }}
            </span>
          </nav>


          <!-- Organization -->

          <p
            v-if="opportunity.organization"
            class="font-display text-[10px] font-extrabold uppercase tracking-[0.2em] text-yen-gold sm:text-xs"
          >
            {{ opportunity.organization }}
          </p>


          <!-- Title -->

          <h1
            class="mt-5 max-w-4xl font-display text-[38px] font-extrabold leading-[1.06] tracking-tight text-white min-[390px]:text-[44px] sm:text-6xl lg:text-7xl"
          >
            {{ opportunity.title }}
          </h1>


          <!-- Summary -->

          <p
            v-if="opportunity.summary"
            class="mt-6 max-w-2xl font-body text-sm leading-7 text-white/80 sm:mt-7 sm:text-lg sm:leading-8"
          >
            {{ opportunity.summary }}
          </p>


          <!-- Badges -->

          <div
            v-if="
              opportunity.category ||
              opportunity.status
            "
            class="mt-8 flex flex-wrap gap-3"
          >
            <span
              v-if="opportunity.category"
              class="rounded-full bg-yen-gold px-4 py-2 font-display text-[10px] font-bold uppercase tracking-wide text-black sm:text-xs"
            >
              {{ opportunity.category }}
            </span>

            <span
              v-if="opportunity.status"
              class="rounded-full border border-white/25 bg-black/20 px-4 py-2 font-display text-[10px] font-semibold text-white backdrop-blur-md sm:text-xs"
            >
              {{ opportunity.status }}
            </span>
          </div>
        </div>
      </div>


      <!-- Accent -->

      <div
        class="absolute bottom-0 left-0 z-20 h-1 w-full bg-linear-to-r from-yen-red via-yen-gold to-yen-red"
      ></div>
    </section>


    <!-- ========================================
         OVERVIEW
    ========================================= -->

    <section class="bg-white">
      <div
        class="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 lg:px-8 lg:py-28"
      >
        <!-- ==================================
             MAIN CONTENT
        =================================== -->

        <div>
          <p
            class="font-display text-[10px] font-extrabold uppercase tracking-[0.18em] text-yen-red sm:text-xs"
          >
            Opportunity Overview
          </p>

          <h2
            class="mt-4 font-display text-3xl font-extrabold leading-tight text-black min-[390px]:text-4xl sm:text-5xl"
          >
            About this opportunity
          </h2>

          <p
            v-if="opportunity.description"
            class="mt-6 font-body text-sm leading-8 text-gray-600 sm:text-base"
          >
            {{ opportunity.description }}
          </p>


          <!-- =================================
               ELIGIBILITY
          ================================== -->

          <section
            v-if="eligibility.length"
            class="mt-10 sm:mt-12"
            aria-labelledby="eligibility-heading"
          >
            <h3
              id="eligibility-heading"
              class="font-display text-2xl font-bold text-black"
            >
              Who Can Apply
            </h3>

            <ul
              class="mt-6 space-y-4"
            >
              <li
                v-for="item in eligibility"
                :key="item"
                class="flex items-start gap-4"
              >
                <span
                  class="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-yen-gold font-display text-xs font-black text-black"
                  aria-hidden="true"
                >
                  ✓
                </span>

                <span
                  class="font-body text-sm leading-7 text-gray-600"
                >
                  {{ item }}
                </span>
              </li>
            </ul>
          </section>


          <!-- =================================
               BENEFITS
          ================================== -->

          <section
            v-if="benefits.length"
            class="mt-10 sm:mt-12"
            aria-labelledby="benefits-heading"
          >
            <h3
              id="benefits-heading"
              class="font-display text-2xl font-bold text-black"
            >
              What You Can Gain
            </h3>

            <ol
              class="mt-6 grid gap-4 sm:grid-cols-2"
            >
              <li
                v-for="(benefit, index) in benefits"
                :key="benefit"
                class="flex h-full flex-col rounded-[1.3rem] bg-[#f7f7f5] p-6"
              >
                <span
                  class="font-display text-sm font-extrabold text-yen-red"
                  aria-hidden="true"
                >
                  {{
                    String(index + 1)
                      .padStart(2, "0")
                  }}
                </span>

                <span
                  class="mt-3 font-display text-sm font-bold leading-6 text-black"
                >
                  {{ benefit }}
                </span>
              </li>
            </ol>
          </section>


          <!-- =================================
               REQUIREMENTS
          ================================== -->

          <section
            v-if="requirements.length"
            class="mt-10 sm:mt-12"
            aria-labelledby="requirements-heading"
          >
            <h3
              id="requirements-heading"
              class="font-display text-2xl font-bold text-black"
            >
              Application Requirements
            </h3>

            <ul
              class="mt-6 space-y-3"
            >
              <li
                v-for="requirement in requirements"
                :key="requirement"
                class="flex items-start gap-3"
              >
                <span
                  class="mt-3 h-2 w-2 shrink-0 rounded-full bg-yen-red"
                  aria-hidden="true"
                ></span>

                <span
                  class="font-body text-sm leading-7 text-gray-600"
                >
                  {{ requirement }}
                </span>
              </li>
            </ul>
          </section>
        </div>


        <!-- ==================================
             SIDEBAR
        =================================== -->

        <aside
          aria-label="Opportunity details"
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
                Opportunity Details
              </p>


              <div
                class="mt-7 divide-y divide-white/10"
              >
                <!-- Organization -->

                <div
                  v-if="opportunity.organization"
                  class="py-5 first:pt-0"
                >
                  <p
                    class="font-display text-[9px] font-bold uppercase tracking-wider text-white/35 sm:text-[10px]"
                  >
                    Organization
                  </p>

                  <p
                    class="mt-2 font-display text-sm font-semibold leading-6 text-white"
                  >
                    {{ opportunity.organization }}
                  </p>
                </div>


                <!-- Location -->

                <div
                  v-if="opportunity.location"
                  class="py-5 first:pt-0"
                >
                  <p
                    class="font-display text-[9px] font-bold uppercase tracking-wider text-white/35 sm:text-[10px]"
                  >
                    Location
                  </p>

                  <p
                    class="mt-2 font-display text-sm font-semibold leading-6 text-white"
                  >
                    {{ opportunity.location }}
                  </p>
                </div>


                <!-- Format -->

                <div
                  v-if="opportunity.format"
                  class="py-5 first:pt-0"
                >
                  <p
                    class="font-display text-[9px] font-bold uppercase tracking-wider text-white/35 sm:text-[10px]"
                  >
                    Format
                  </p>

                  <p
                    class="mt-2 font-display text-sm font-semibold leading-6 text-white"
                  >
                    {{ opportunity.format }}
                  </p>
                </div>


                <!-- Deadline -->

                <div
                  v-if="opportunity.deadline"
                  class="py-5 first:pt-0"
                >
                  <p
                    class="font-display text-[9px] font-bold uppercase tracking-wider text-white/35 sm:text-[10px]"
                  >
                    Deadline
                  </p>

                  <p
                    class="mt-2 font-display text-sm font-bold leading-6 text-yen-gold"
                  >
                    {{ opportunity.deadline }}
                  </p>
                </div>


                <!-- Status -->

                <div
                  v-if="opportunity.status"
                  class="py-5 first:pt-0"
                >
                  <p
                    class="font-display text-[9px] font-bold uppercase tracking-wider text-white/35 sm:text-[10px]"
                  >
                    Status
                  </p>

                  <span
                    class="mt-2 inline-flex rounded-full bg-white/10 px-3 py-2 font-display text-[10px] font-bold uppercase text-white"
                  >
                    {{ opportunity.status }}
                  </span>
                </div>
              </div>


              <!-- =================================
                   APPLY BUTTON
              ================================== -->

              <a
                v-if="opportunity.applicationUrl"
                :href="opportunity.applicationUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="mt-7 flex w-full items-center justify-center rounded-full bg-yen-gold px-7 py-4 font-display text-sm font-bold text-black transition duration-300 hover:-translate-y-1 hover:bg-white"
                :aria-label="`Apply for ${opportunity.title} — opens external application in a new tab`"
              >
                Apply Now

                <span
                  class="ml-3"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </a>


              <!-- No application URL -->

              <div
                v-else
                class="mt-7"
              >
                <button
                  type="button"
                  disabled
                  class="flex w-full cursor-not-allowed items-center justify-center rounded-full bg-white/10 px-7 py-4 font-display text-sm font-bold text-white/45"
                >
                  Applications Not Open Yet
                </button>

                <p
                  class="mt-3 text-center font-body text-xs leading-5 text-white/40"
                >
                  An official application link has not been
                  published on this page.
                </p>
              </div>


              <!-- Back -->

              <RouterLink
                :to="{ name: 'opportunities' }"
                class="mt-4 flex w-full items-center justify-center rounded-full border border-white/20 px-6 py-3.5 font-display text-xs font-bold text-white transition hover:border-yen-gold hover:text-yen-gold"
              >
                ← Browse Opportunities
              </RouterLink>
            </div>


            <!-- Verification note -->

            <div
              class="bg-yen-gold px-6 py-5 sm:px-8"
            >
              <p
                class="font-body text-xs leading-6 text-black/70"
              >
                Always verify eligibility, requirements,
                deadlines and submission instructions with the
                official organization before applying.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </section>


    <!-- ========================================
         RELATED OPPORTUNITIES
    ========================================= -->

    <section
      v-if="relatedOpportunities.length"
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
              Keep Exploring
            </p>

            <h2
              class="mt-3 font-display text-3xl font-extrabold leading-tight text-black sm:text-4xl"
            >
              Related opportunities
            </h2>
          </div>


          <RouterLink
            :to="{ name: 'opportunities' }"
            class="inline-flex items-center gap-2 font-display text-sm font-bold text-black transition hover:text-yen-red"
          >
            View All Opportunities

            <span aria-hidden="true">
              →
            </span>
          </RouterLink>
        </div>


        <!-- Cards -->

        <div
          class="mt-9 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          <article
            v-for="item in relatedOpportunities"
            :key="item.id"
            class="group flex h-full flex-col overflow-hidden rounded-[1.6rem] bg-white transition duration-300 hover:-translate-y-2 hover:shadow-xl"
          >
            <!-- Image -->

            <div
              class="relative h-[220px] overflow-hidden"
            >
              <img
                :src="item.image"
                :alt="item.title"
                loading="lazy"
                class="h-full w-full object-cover object-center transition duration-700 group-hover:scale-105"
              />

              <div
                class="absolute inset-0 bg-linear-to-t from-black/65 via-transparent to-transparent"
              ></div>


              <!-- Category -->

              <span
                v-if="item.category"
                class="absolute left-4 top-4 rounded-full bg-yen-gold px-3 py-2 font-display text-[9px] font-extrabold uppercase text-black"
              >
                {{ item.category }}
              </span>
            </div>


            <!-- Body -->

            <div
              class="flex flex-1 flex-col p-6"
            >
              <p
                v-if="item.organization"
                class="font-display text-xs font-semibold leading-5 text-yen-red"
              >
                {{ item.organization }}
              </p>

              <h3
                class="mt-2 font-display text-xl font-bold leading-snug text-black"
              >
                {{ item.title }}
              </h3>

              <p
                v-if="item.summary"
                class="mt-4 font-body text-sm leading-7 text-gray-600"
              >
                {{ item.summary }}
              </p>


              <!-- Metadata -->

              <div
                class="mt-auto pt-6"
              >
                <div
                  v-if="
                    item.location ||
                    item.deadline
                  "
                  class="space-y-3 border-t border-gray-100 pt-5"
                >
                  <div
                    v-if="item.location"
                    class="flex items-start justify-between gap-4"
                  >
                    <span
                      class="font-display text-[9px] font-bold uppercase text-gray-400"
                    >
                      Location
                    </span>

                    <span
                      class="text-right font-display text-xs font-semibold leading-5 text-black"
                    >
                      {{ item.location }}
                    </span>
                  </div>


                  <div
                    v-if="item.deadline"
                    class="flex items-start justify-between gap-4"
                  >
                    <span
                      class="font-display text-[9px] font-bold uppercase text-gray-400"
                    >
                      Deadline
                    </span>

                    <span
                      class="text-right font-display text-xs font-semibold leading-5 text-yen-red"
                    >
                      {{ item.deadline }}
                    </span>
                  </div>
                </div>


                <RouterLink
                  :to="{
                    name: 'opportunity-detail',
                    params: {
                      slug: item.slug,
                    },
                  }"
                  class="mt-6 flex items-center justify-between rounded-xl bg-black px-5 py-4 font-display text-sm font-bold text-white transition group-hover:bg-yen-red"
                >
                  View Opportunity

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
         FINAL CTA
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
            <!-- Copy -->

            <div class="max-w-3xl">
              <p
                class="font-display text-[10px] font-extrabold uppercase tracking-[0.18em] text-yen-gold sm:text-xs"
              >
                Find Your Next Step
              </p>

              <h2
                class="mt-4 font-display text-2xl font-extrabold leading-tight text-white sm:text-4xl"
              >
                More opportunities are waiting.
              </h2>

              <p
                class="mt-4 max-w-2xl font-body text-sm leading-7 text-white/60 sm:text-base"
              >
                Browse the full YEN-Liberia Opportunities Hub
                or join the network to stay connected to
                entrepreneurship programs and opportunities.
              </p>
            </div>


            <!-- CTAs -->

            <div
              class="flex flex-col gap-3 sm:flex-row lg:flex-col"
            >
              <RouterLink
                :to="{ name: 'opportunities' }"
                class="inline-flex w-full items-center justify-center rounded-full bg-yen-gold px-7 py-4 font-display text-sm font-bold text-black transition duration-300 hover:-translate-y-1 hover:bg-white sm:w-auto sm:min-w-[220px]"
              >
                Browse Opportunities

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
       INVALID OPPORTUNITY
  =========================================== -->

  <main
    v-else
    class="relative flex min-h-[70vh] items-center overflow-hidden bg-white px-5 py-20 text-center"
  >
    <!-- Decoration -->

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
        Opportunity Not Found
      </p>

      <h1
        class="mt-4 font-display text-3xl font-extrabold leading-tight text-black sm:text-4xl"
      >
        We couldn't find this opportunity.
      </h1>

      <p
        class="mx-auto mt-4 max-w-lg font-body text-sm leading-7 text-gray-600 sm:text-base"
      >
        The opportunity may have moved, expired, been removed,
        or the link may be incorrect.
      </p>


      <div
        class="mt-8 flex flex-col justify-center gap-3 sm:flex-row"
      >
        <RouterLink
          :to="{ name: 'opportunities' }"
          class="inline-flex items-center justify-center rounded-full bg-black px-7 py-4 font-display text-sm font-bold text-white transition hover:bg-yen-red"
        >
          Browse Opportunities

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