<script setup>
import {
  computed,
  watchEffect,
} from "vue"

import { useRoute } from "vue-router"

import {
  programs,
  getProgramBySlug,
} from "@/data/programs"

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
| CURRENT PROGRAM
|--------------------------------------------------------------------------
*/

const program = computed(() => {
  const slug = String(
    route.params.slug ?? "",
  )

  return getProgramBySlug(slug)
})


/*
|--------------------------------------------------------------------------
| SAFE DATA HELPERS
|--------------------------------------------------------------------------
*/

const objectives = computed(() => {
  return Array.isArray(
    program.value?.objectives,
  )
    ? program.value.objectives
    : []
})


const focusAreas = computed(() => {
  return Array.isArray(
    program.value?.focusAreas,
  )
    ? program.value.focusAreas
    : []
})


const programPartners = computed(() => {
  return Array.isArray(
    program.value?.partners,
  )
    ? program.value.partners
    : []
})


/*
|--------------------------------------------------------------------------
| RELATED PROGRAMS
|--------------------------------------------------------------------------
|
| Prefer programs from the same category.
|
| If there are fewer than 3 programs in the same
| category, fill the remaining positions with other
| available programs.
|
*/

const relatedPrograms = computed(() => {
  if (!program.value) {
    return []
  }

  const currentId =
    program.value.id

  const otherPrograms =
    programs.filter(
      (item) =>
        item.id !== currentId,
    )

  const sameCategory =
    otherPrograms.filter(
      (item) =>
        item.category ===
        program.value.category,
    )

  const differentCategory =
    otherPrograms.filter(
      (item) =>
        item.category !==
        program.value.category,
    )

  return [
    ...sameCategory,
    ...differentCategory,
  ].slice(0, 3)
})


/*
|--------------------------------------------------------------------------
| PROGRAM SEO
|--------------------------------------------------------------------------
|
| The router provides generic fallback metadata such as:
|
| Program | Youth Entrepreneurs Network–Liberia
|
| Once this detail page resolves the actual program from the
| slug, replace that generic metadata with the real program:
|
| - title
| - description
| - canonical URL
| - Open Graph metadata
| - Twitter/X metadata
|
|--------------------------------------------------------------------------
*/

watchEffect(() => {
  /*
  |--------------------------------------------------------------------------
  | PROGRAM NOT FOUND
  |--------------------------------------------------------------------------
  */

  if (!program.value) {
    setPageSeo({
      title:
        "Program Not Found",

      description:
        "The requested YEN-Liberia program could not be found.",

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
  | PROGRAM DESCRIPTION
  |--------------------------------------------------------------------------
  |
  | Prefer the short summary because it normally works better
  | as search-result and social-sharing copy.
  |
  | Fall back to the full description if no summary exists.
  |
  */

  const description =
    program.value.summary ||
    program.value.description ||
    "Learn more about this YEN-Liberia entrepreneurship and business development program."


  /*
  |--------------------------------------------------------------------------
  | PROGRAM IMAGE
  |--------------------------------------------------------------------------
  |
  | Program data currently uses local image paths such as:
  |
  | /images/...
  |
  | Social metadata should use an absolute public URL.
  |
  */

  const image =
    program.value.image
      ? new URL(
          program.value.image,
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
      program.value.title,

    description,

    path:
      route.path,

    image,

    robots:
      "index, follow",

    type:
      "website",
  })
})
</script>

<template>
  <!-- ==========================================
       VALID PROGRAM
  =========================================== -->

  <main
    v-if="program"
    class="w-full overflow-hidden"
  >
    <!-- ========================================
         HERO
    ========================================= -->

    <section
      class="relative isolate min-h-[560px] overflow-hidden sm:min-h-[600px] lg:min-h-[640px]"
    >
      <!-- Background image -->

      <img
        :src="program.image"
        :alt="program.title"
        class="absolute inset-0 h-full w-full object-cover object-center"
      />


      <!-- Contrast -->

      <div
        class="absolute inset-0 bg-linear-to-r from-black/90 via-black/65 to-black/25 sm:from-black/85 sm:via-black/55 sm:to-black/10"
        aria-hidden="true"
      ></div>

      <div
        class="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/20"
        aria-hidden="true"
      ></div>


      <!-- Hero content -->

      <div
        class="relative z-10 mx-auto flex min-h-[560px] max-w-7xl items-center px-5 py-16 sm:min-h-[600px] sm:px-6 sm:py-20 lg:min-h-[640px] lg:px-8"
      >
        <div
          class="w-full max-w-4xl"
        >
          <!-- Breadcrumb -->

          <nav
            class="mb-6 flex flex-wrap items-center gap-3 font-display text-xs font-bold sm:mb-8"
            aria-label="Breadcrumb"
          >
            <RouterLink
              :to="{ name: 'home' }"
              class="rounded-sm text-white/55 transition hover:text-yen-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yen-gold"
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
              :to="{ name: 'programs' }"
              class="rounded-sm text-white/55 transition hover:text-yen-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yen-gold"
            >
              Programs
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
                program.shortTitle ||
                program.title
              }}
            </span>
          </nav>


          <!-- Category -->

          <p
            v-if="program.category"
            class="font-display text-[10px] font-extrabold uppercase tracking-[0.2em] text-yen-gold sm:text-xs"
          >
            {{ program.category }}
          </p>


          <!-- Title -->

          <h1
            class="mt-5 max-w-4xl font-display text-[38px] font-extrabold leading-[1.06] tracking-tight text-white min-[390px]:text-[44px] sm:text-6xl lg:text-7xl"
          >
            {{ program.title }}
          </h1>


          <!-- Summary -->

          <p
            v-if="program.summary"
            class="mt-6 max-w-2xl font-body text-sm leading-7 text-white/80 sm:mt-7 sm:text-lg sm:leading-8"
          >
            {{ program.summary }}
          </p>


          <!-- Status / date -->

          <div
            v-if="
              program.status ||
              program.date
            "
            class="mt-8 flex flex-wrap gap-3"
          >
            <span
              v-if="program.status"
              class="rounded-full bg-yen-gold px-4 py-2 font-display text-[10px] font-bold uppercase tracking-wide text-black sm:text-xs"
            >
              {{ program.status }}
            </span>

            <span
              v-if="program.date"
              class="rounded-full border border-white/25 bg-black/20 px-4 py-2 font-display text-[10px] font-semibold text-white backdrop-blur-md sm:text-xs"
            >
              {{ program.date }}
            </span>
          </div>
        </div>
      </div>


      <!-- Brand accent -->

      <div
        class="absolute bottom-0 left-0 z-20 h-1 w-full bg-linear-to-r from-yen-red via-yen-gold to-yen-red"
        aria-hidden="true"
      ></div>
    </section>


    <!-- ========================================
         OVERVIEW
    ========================================= -->

    <section
      class="bg-white"
    >
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
            Program Overview
          </p>

          <h2
            class="mt-4 font-display text-3xl font-extrabold leading-tight text-black min-[390px]:text-4xl sm:text-5xl"
          >
            About this initiative
          </h2>

          <p
            v-if="program.description"
            class="mt-6 font-body text-sm leading-8 text-gray-600 sm:text-base"
          >
            {{ program.description }}
          </p>


          <!-- =================================
               OBJECTIVES
          ================================== -->

          <section
            v-if="objectives.length"
            class="mt-10 sm:mt-12"
            aria-labelledby="program-objectives-heading"
          >
            <h3
              id="program-objectives-heading"
              class="font-display text-2xl font-bold text-black"
            >
              Program Objectives
            </h3>

            <ul
              class="mt-6 space-y-4"
            >
              <li
                v-for="objective in objectives"
                :key="objective"
                class="flex items-start gap-4 rounded-xl bg-[#f7f7f5] p-4 sm:bg-transparent sm:p-0"
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
                  {{ objective }}
                </span>
              </li>
            </ul>
          </section>
        </div>


        <!-- ==================================
             DETAILS CARD
        =================================== -->

        <aside
          aria-label="Program details"
        >
          <div
            class="rounded-[1.6rem] bg-black p-6 sm:rounded-[1.7rem] sm:p-8 lg:sticky lg:top-28"
          >
            <p
              class="font-display text-[10px] font-extrabold uppercase tracking-[0.18em] text-yen-gold sm:text-xs"
            >
              Program Details
            </p>


            <dl
              class="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-1"
            >
              <!-- Date -->

              <div
                v-if="program.date"
              >
                <dt
                  class="font-display text-[9px] font-bold uppercase tracking-wider text-white/35 sm:text-[10px]"
                >
                  Date
                </dt>

                <dd
                  class="mt-2 font-display text-sm font-semibold leading-6 text-white"
                >
                  {{ program.date }}
                </dd>
              </div>


              <!-- Location -->

              <div
                v-if="program.location"
              >
                <dt
                  class="font-display text-[9px] font-bold uppercase tracking-wider text-white/35 sm:text-[10px]"
                >
                  Location
                </dt>

                <dd
                  class="mt-2 font-display text-sm font-semibold leading-6 text-white"
                >
                  {{ program.location }}
                </dd>
              </div>


              <!-- Category -->

              <div
                v-if="program.category"
              >
                <dt
                  class="font-display text-[9px] font-bold uppercase tracking-wider text-white/35 sm:text-[10px]"
                >
                  Category
                </dt>

                <dd
                  class="mt-2 font-display text-sm font-semibold leading-6 text-white"
                >
                  {{ program.category }}
                </dd>
              </div>


              <!-- Status -->

              <div
                v-if="program.status"
              >
                <dt
                  class="font-display text-[9px] font-bold uppercase tracking-wider text-white/35 sm:text-[10px]"
                >
                  Status
                </dt>

                <dd>
                  <span
                    class="mt-2 inline-flex rounded-full bg-yen-gold px-3 py-2 font-display text-[10px] font-bold uppercase text-black"
                  >
                    {{ program.status }}
                  </span>
                </dd>
              </div>


              <!-- Impact -->

              <div
                v-if="
                  program.impact ||
                  program.impactLabel
                "
                class="sm:col-span-2 lg:col-span-1"
              >
                <dt
                  class="font-display text-[9px] font-bold uppercase tracking-wider text-white/35 sm:text-[10px]"
                >
                  Impact
                </dt>

                <dd>
                  <p
                    v-if="program.impact"
                    class="mt-2 font-display text-3xl font-extrabold text-yen-gold"
                  >
                    {{ program.impact }}
                  </p>

                  <p
                    v-if="program.impactLabel"
                    class="mt-1 font-display text-xs leading-5 text-white/50"
                  >
                    {{ program.impactLabel }}
                  </p>
                </dd>
              </div>
            </dl>


            <!-- Back link -->

            <RouterLink
              :to="{ name: 'programs' }"
              class="mt-8 flex items-center justify-center rounded-full border border-white/20 px-5 py-3.5 font-display text-xs font-bold text-white transition hover:border-yen-gold hover:text-yen-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yen-gold"
            >
              ← Explore All Programs
            </RouterLink>
          </div>
        </aside>
      </div>
    </section>


    <!-- ========================================
         FOCUS AREAS
    ========================================= -->

    <section
      v-if="focusAreas.length"
      class="bg-[#f7f7f5]"
    >
      <div
        class="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24"
      >
        <div
          class="max-w-3xl"
        >
          <p
            class="font-display text-[10px] font-extrabold uppercase tracking-[0.18em] text-yen-red sm:text-xs"
          >
            Key Areas
          </p>

          <h2
            class="mt-4 font-display text-3xl font-extrabold leading-tight text-black sm:text-4xl"
          >
            Program focus
          </h2>

          <p
            class="mt-4 max-w-2xl font-body text-sm leading-7 text-gray-600 sm:text-base"
          >
            Key themes and areas addressed through this
            YEN-Liberia initiative.
          </p>
        </div>


        <div
          class="mt-9 grid gap-4 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3"
        >
          <article
            v-for="(area, index) in focusAreas"
            :key="area"
            class="group flex h-full flex-col rounded-[1.4rem] bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <span
              class="font-display text-sm font-extrabold text-yen-gold"
              aria-hidden="true"
            >
              {{
                String(index + 1)
                  .padStart(2, "0")
              }}
            </span>

            <h3
              class="mt-4 font-display text-lg font-bold leading-snug text-black"
            >
              {{ area }}
            </h3>

            <div
              class="mt-auto pt-6"
              aria-hidden="true"
            >
              <div
                class="h-[3px] w-8 bg-yen-red transition-all duration-300 group-hover:w-16"
              ></div>
            </div>
          </article>
        </div>
      </div>
    </section>


    <!-- ========================================
         COLLABORATORS
    ========================================= -->

    <section
      v-if="programPartners.length"
      class="bg-white"
    >
      <div
        class="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24"
      >
        <div
          class="max-w-3xl"
        >
          <p
            class="font-display text-[10px] font-extrabold uppercase tracking-[0.18em] text-yen-red sm:text-xs"
          >
            Collaboration
          </p>

          <h2
            class="mt-4 font-display text-3xl font-extrabold leading-tight text-black sm:text-4xl"
          >
            Program collaborators
          </h2>

          <p
            class="mt-4 max-w-2xl font-body text-sm leading-7 text-gray-600 sm:text-base"
          >
            Organizations associated with the delivery or
            support of this initiative.
          </p>
        </div>


        <ul
          class="mt-9 flex flex-wrap gap-3"
        >
          <li
            v-for="partner in programPartners"
            :key="partner"
            class="rounded-full border border-gray-200 bg-[#f7f7f5] px-4 py-3 font-display text-xs font-bold leading-5 text-black sm:px-5 sm:text-sm"
          >
            {{ partner }}
          </li>
        </ul>
      </div>
    </section>


    <!-- ========================================
         RELATED PROGRAMS
    ========================================= -->

    <section
      v-if="relatedPrograms.length"
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
              class="mt-3 font-display text-3xl font-extrabold text-black sm:text-4xl"
            >
              Related programs
            </h2>
          </div>


          <RouterLink
            :to="{ name: 'programs' }"
            class="inline-flex items-center gap-2 rounded-sm font-display text-sm font-bold text-black transition hover:text-yen-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yen-red"
          >
            View All Programs

            <span
              aria-hidden="true"
            >
              →
            </span>
          </RouterLink>
        </div>


        <!-- Cards -->

        <div
          class="mt-9 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          <article
            v-for="item in relatedPrograms"
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
                aria-hidden="true"
              ></div>


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
              <h3
                class="font-display text-xl font-bold leading-snug text-black"
              >
                {{ item.title }}
              </h3>

              <p
                v-if="item.summary"
                class="mt-4 font-body text-sm leading-7 text-gray-600"
              >
                {{ item.summary }}
              </p>


              <div
                class="mt-auto pt-6"
              >
                <RouterLink
                  :to="{
                    name: 'program-detail',
                    params: {
                      slug: item.slug,
                    },
                  }"
                  class="flex items-center justify-between rounded-xl bg-black px-5 py-4 font-display text-sm font-bold text-white transition group-hover:bg-yen-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yen-red"
                >
                  View Program

                  <span
                    class="flex h-8 w-8 items-center justify-center rounded-full bg-yen-gold text-black"
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

    <section
      class="bg-white"
    >
      <div
        class="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24"
      >
        <div
          class="relative overflow-hidden rounded-[1.7rem] bg-black p-7 sm:rounded-[2rem] sm:p-10 lg:p-14"
        >
          <!-- Decoration -->

          <div
            class="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-yen-gold/10"
            aria-hidden="true"
          ></div>


          <div
            class="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center"
          >
            <!-- Copy -->

            <div
              class="max-w-3xl"
            >
              <p
                class="font-display text-[10px] font-extrabold uppercase tracking-[0.18em] text-yen-gold sm:text-xs"
              >
                Continue Your Journey
              </p>

              <h2
                class="mt-4 font-display text-2xl font-extrabold leading-tight text-white sm:text-4xl"
              >
                Discover more ways to grow your business.
              </h2>

              <p
                class="mt-4 max-w-2xl font-body text-sm leading-7 text-white/60 sm:text-base"
              >
                Explore current entrepreneurship opportunities
                or browse other YEN-Liberia programs and
                initiatives.
              </p>
            </div>


            <!-- CTAs -->

            <div
              class="flex flex-col gap-3 sm:flex-row lg:flex-col"
            >
              <RouterLink
                :to="{ name: 'opportunities' }"
                class="inline-flex w-full items-center justify-center rounded-full bg-yen-gold px-7 py-4 font-display text-sm font-bold text-black transition duration-300 hover:-translate-y-1 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:w-auto sm:min-w-[220px]"
              >
                Explore Opportunities

                <span
                  class="ml-3"
                  aria-hidden="true"
                >
                  →
                </span>
              </RouterLink>


              <RouterLink
                :to="{ name: 'programs' }"
                class="inline-flex w-full items-center justify-center rounded-full border border-white/25 px-7 py-4 font-display text-sm font-bold text-white transition hover:border-yen-gold hover:text-yen-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yen-gold sm:w-auto sm:min-w-[220px]"
              >
                All Programs
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>


  <!-- ==========================================
       INVALID PROGRAM SLUG
  =========================================== -->

  <main
    v-else
    class="relative flex min-h-[70vh] items-center overflow-hidden bg-white px-5 py-20 text-center"
  >
    <!-- Decoration -->

    <div
      class="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-yen-gold/15 blur-3xl"
      aria-hidden="true"
    ></div>

    <div
      class="pointer-events-none absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-yen-red/10 blur-3xl"
      aria-hidden="true"
    ></div>


    <div
      class="relative mx-auto max-w-2xl"
    >
      <p
        class="font-display text-7xl font-black text-yen-gold sm:text-8xl"
        aria-hidden="true"
      >
        404
      </p>

      <p
        class="mt-4 font-display text-[10px] font-extrabold uppercase tracking-[0.2em] text-yen-red sm:text-xs"
      >
        Program Not Found
      </p>

      <h1
        class="mt-4 font-display text-3xl font-extrabold leading-tight text-black sm:text-4xl"
      >
        We couldn't find this program.
      </h1>

      <p
        class="mx-auto mt-4 max-w-lg font-body text-sm leading-7 text-gray-600 sm:text-base"
      >
        The program may have moved, the link may be incorrect,
        or it may no longer be available.
      </p>


      <div
        class="mt-8 flex flex-col justify-center gap-3 sm:flex-row"
      >
        <RouterLink
          :to="{ name: 'programs' }"
          class="inline-flex items-center justify-center rounded-full bg-black px-7 py-4 font-display text-sm font-bold text-white transition hover:bg-yen-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yen-red"
        >
          View Programs

          <span
            class="ml-3 text-yen-gold"
            aria-hidden="true"
          >
            →
          </span>
        </RouterLink>

        <RouterLink
          :to="{ name: 'home' }"
          class="inline-flex items-center justify-center rounded-full border border-black px-7 py-4 font-display text-sm font-bold text-black transition hover:bg-yen-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yen-red"
        >
          Return Home
        </RouterLink>
      </div>
    </div>
  </main>
</template>