<script setup>
import {
  computed,
  ref,
} from "vue"

import {
  programs,
} from "@/data/programs"


/*
|--------------------------------------------------------------------------
| SEARCH & FILTERS
|--------------------------------------------------------------------------
*/

const searchQuery = ref("")
const activeCategory = ref("All")

/*
  Generate categories directly from the program data.

  This prevents the Programs page filter from becoming
  outdated if a new program category is added later.
*/
const categories = computed(() => {
  const availableCategories = programs
    .map((program) => program.category)
    .filter(Boolean)

  return [
    "All",
    ...new Set(availableCategories),
  ]
})


/*
  Safely return focus areas.

  This prevents a missing focusAreas array from
  breaking the entire Programs page.
*/
const getFocusAreas = (program) => {
  return Array.isArray(program.focusAreas)
    ? program.focusAreas
    : []
}


const filteredPrograms = computed(() => {
  const query = searchQuery.value
    .toLowerCase()
    .trim()

  return programs.filter((program) => {
    const focusAreas =
      getFocusAreas(program)

    const matchesCategory =
      activeCategory.value === "All" ||
      program.category ===
        activeCategory.value

    const matchesSearch =
      !query ||
      program.title
        ?.toLowerCase()
        .includes(query) ||
      program.category
        ?.toLowerCase()
        .includes(query) ||
      program.summary
        ?.toLowerCase()
        .includes(query) ||
      focusAreas.some((area) =>
        area
          .toLowerCase()
          .includes(query),
      )

    return (
      matchesCategory &&
      matchesSearch
    )
  })
})


const clearFilters = () => {
  searchQuery.value = ""
  activeCategory.value = "All"
}
</script>


<template>
  <main class="w-full overflow-hidden">

    <!-- ==========================================
         PAGE HERO
    =========================================== -->

    <section
      class="relative isolate min-h-[540px] overflow-hidden sm:min-h-[560px] lg:min-h-[580px]"
    >
      <!-- Background -->

      <img
        src="/images/hero/hero-3.jpg"
        alt="YEN-Liberia entrepreneurship programs"
        class="absolute inset-0 h-full w-full object-cover object-center"
      />


      <!-- Contrast -->

      <div
        class="absolute inset-0 bg-linear-to-r from-black/90 via-black/65 to-black/25 sm:from-black/85 sm:via-black/55 sm:to-black/15"
      ></div>

      <div
        class="absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-black/20"
      ></div>


      <!-- Content -->

      <div
        class="relative z-10 mx-auto flex min-h-[540px] max-w-7xl items-center px-5 py-16 sm:min-h-[560px] sm:px-6 sm:py-20 lg:min-h-[580px] lg:px-8"
      >
        <div class="w-full max-w-4xl">

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

            <span class="text-white/30">
              /
            </span>

            <span class="text-yen-gold">
              Programs
            </span>
          </div>


          <!-- Label -->

          <p
            class="font-display text-[10px] font-extrabold uppercase tracking-[0.2em] text-yen-gold sm:text-xs"
          >
            Programs & Initiatives
          </p>


          <!-- Heading -->

          <h1
            class="mt-5 max-w-4xl font-display text-[40px] font-extrabold leading-[1.05] tracking-tight text-white min-[390px]:text-[44px] sm:text-6xl lg:text-7xl"
          >
            Turning entrepreneurial potential into

            <span class="text-yen-gold">
              practical progress.
            </span>
          </h1>


          <!-- Description -->

          <p
            class="mt-6 max-w-2xl font-body text-sm leading-7 text-white/80 sm:mt-7 sm:text-lg sm:leading-8"
          >
            Explore YEN-Liberia programs designed to strengthen
            entrepreneurs through practical skills, connections,
            partnerships and access to opportunities.
          </p>
        </div>
      </div>


      <!-- Accent -->

      <div
        class="absolute bottom-0 left-0 z-20 h-1 w-full bg-linear-to-r from-yen-red via-yen-gold to-yen-red"
      ></div>
    </section>


    <!-- ==========================================
         PROGRAM INTRO
    =========================================== -->

    <section class="bg-white">
      <div
        class="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14 lg:px-8 lg:py-24"
      >
        <!-- Heading -->

        <div>
          <p
            class="font-display text-[10px] font-extrabold uppercase tracking-[0.18em] text-yen-red sm:text-xs"
          >
            What We Do
          </p>

          <h2
            class="mt-4 font-display text-3xl font-extrabold leading-tight text-black min-[390px]:text-4xl sm:text-5xl"
          >
            Programs built around

            <span class="text-yen-red">
              real business needs.
            </span>
          </h2>
        </div>


        <!-- Copy -->

        <div>
          <p
            class="font-body text-sm leading-8 text-gray-600 sm:text-base"
          >
            YEN-Liberia works with entrepreneurs and ecosystem
            partners to deliver business-development programs,
            entrepreneurship conferences, capacity building,
            networking activities and initiatives that strengthen
            emerging enterprises.
          </p>

          <p
            class="mt-5 font-body text-sm leading-8 text-gray-600 sm:text-base"
          >
            Our goal is not simply to organize activities. We want
            entrepreneurs to leave with knowledge, connections,
            tools and opportunities that can move their businesses
            forward.
          </p>
        </div>
      </div>
    </section>


    <!-- ==========================================
         PROGRAM DIRECTORY
    =========================================== -->

    <section class="bg-[#f7f7f5]">
      <div
        class="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28"
      >
        <!-- Heading -->

        <div>
          <p
            class="font-display text-[10px] font-extrabold uppercase tracking-[0.18em] text-yen-red sm:text-xs"
          >
            Explore Our Programs
          </p>

          <h2
            class="mt-3 font-display text-3xl font-extrabold leading-tight text-black sm:text-4xl"
          >
            Programs & initiatives
          </h2>
        </div>


        <!-- ======================================
             SEARCH & CATEGORY FILTERS
        ======================================= -->

        <div
          class="mt-9 rounded-[1.5rem] bg-black p-4 sm:mt-10 sm:rounded-[1.7rem] sm:p-7"
        >
          <!-- Search -->

          <div class="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40 sm:left-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m21 21-4.35-4.35m2.35-5.65A8 8 0 1 1 3 11a8 8 0 0 1 16 0Z"
              />
            </svg>


            <label
              for="program-search"
              class="sr-only"
            >
              Search YEN-Liberia programs
            </label>


            <input
              id="program-search"
              v-model="searchQuery"
              type="search"
              autocomplete="off"
              placeholder="Search programs, topics or initiatives..."
              class="w-full rounded-xl border border-white/15 bg-white/10 py-4 pl-12 pr-4 font-display text-sm text-white outline-none transition placeholder:text-white/35 focus:border-yen-gold focus:bg-white/15 sm:pl-14 sm:pr-5"
            />
          </div>


          <!-- Categories -->

          <div
            class="mt-5 flex flex-wrap gap-2"
            aria-label="Filter programs by category"
          >
            <button
              v-for="category in categories"
              :key="category"
              type="button"
              :aria-pressed="
                activeCategory === category
              "
              class="rounded-full px-3.5 py-2.5 font-display text-[11px] font-bold transition sm:px-4 sm:text-xs"
              :class="
                activeCategory === category
                  ? 'bg-yen-gold text-black'
                  : 'border border-white/15 text-white/65 hover:border-yen-gold hover:text-yen-gold'
              "
              @click="
                activeCategory = category
              "
            >
              {{ category }}
            </button>
          </div>
        </div>


        <!-- ======================================
             RESULT COUNT
        ======================================= -->

        <div
          class="mt-7 flex flex-wrap items-center justify-between gap-4 sm:mt-8"
        >
          <p
            class="font-display text-xs font-semibold text-gray-500 sm:text-sm"
            aria-live="polite"
          >
            Showing

            <span class="font-bold text-black">
              {{ filteredPrograms.length }}
            </span>

            {{
              filteredPrograms.length === 1
                ? "program"
                : "programs"
            }}
          </p>


          <button
            v-if="
              searchQuery ||
              activeCategory !== 'All'
            "
            type="button"
            class="font-display text-xs font-bold text-yen-red transition hover:text-black sm:text-sm"
            @click="clearFilters"
          >
            Clear filters
          </button>
        </div>


        <!-- ======================================
             PROGRAM CARDS
        ======================================= -->

        <div
          v-if="filteredPrograms.length"
          class="mt-7 grid gap-6 md:grid-cols-2 lg:gap-7"
        >
          <article
            v-for="program in filteredPrograms"
            :key="program.id"
            class="group flex h-full flex-col overflow-hidden rounded-[1.6rem] bg-white transition duration-300 hover:-translate-y-2 hover:shadow-2xl sm:rounded-[1.8rem]"
          >
            <!-- Image -->

            <div
              class="relative h-[250px] overflow-hidden sm:h-[290px] lg:h-[330px]"
            >
              <img
                :src="program.image"
                :alt="program.title"
                loading="lazy"
                class="h-full w-full object-cover object-center transition duration-700 group-hover:scale-105"
              />

              <div
                class="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent"
              ></div>


              <!-- Status -->

              <div
                class="absolute left-4 top-4 sm:left-5 sm:top-5"
              >
                <span
                  class="rounded-full bg-yen-gold px-3 py-2 font-display text-[9px] font-extrabold uppercase tracking-wider text-black sm:px-4 sm:text-[10px]"
                >
                  {{ program.status }}
                </span>
              </div>


              <!-- Impact -->

              <div
                class="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5"
              >
                <p
                  class="font-display text-2xl font-extrabold text-white sm:text-3xl"
                >
                  {{ program.impact }}
                </p>

                <p
                  class="mt-1 max-w-[260px] font-display text-[10px] font-semibold leading-5 text-white/70 sm:text-xs"
                >
                  {{ program.impactLabel }}
                </p>
              </div>
            </div>


            <!-- ==================================
                 CARD CONTENT
            =================================== -->

            <div
              class="flex flex-1 flex-col p-6 sm:p-8"
            >
              <!-- Meta -->

              <div
                class="flex flex-wrap items-center gap-3"
              >
                <span
                  class="font-display text-[9px] font-extrabold uppercase tracking-[0.14em] text-yen-red sm:text-[10px]"
                >
                  {{ program.category }}
                </span>

                <span
                  class="h-1 w-1 rounded-full bg-gray-300"
                ></span>

                <span
                  class="font-display text-[11px] font-semibold text-gray-400 sm:text-xs"
                >
                  {{ program.year }}
                </span>
              </div>


              <!-- Title -->

              <h3
                class="mt-3 font-display text-xl font-bold leading-snug text-black sm:text-2xl"
              >
                {{ program.title }}
              </h3>


              <!-- Summary -->

              <p
                class="mt-4 font-body text-sm leading-7 text-gray-600"
              >
                {{ program.summary }}
              </p>


              <!-- Focus chips -->

              <div
                v-if="
                  getFocusAreas(program).length
                "
                class="mt-6 flex flex-wrap gap-2"
              >
                <span
                  v-for="area in getFocusAreas(program).slice(0, 3)"
                  :key="area"
                  class="rounded-full bg-[#f7f7f5] px-3 py-2 font-display text-[9px] font-bold leading-4 text-gray-600 sm:text-[10px]"
                >
                  {{ area }}
                </span>
              </div>


              <!-- Footer -->

              <div
                class="mt-auto pt-7"
              >
                <div
                  class="flex items-end justify-between gap-5 border-t border-gray-100 pt-6"
                >
                  <div class="min-w-0">
                    <p
                      class="font-display text-[9px] font-bold uppercase tracking-wider text-gray-400 sm:text-[10px]"
                    >
                      Date
                    </p>

                    <p
                      class="mt-1 font-display text-xs font-semibold leading-5 text-black"
                    >
                      {{ program.date }}
                    </p>
                  </div>


                  <RouterLink
                    :to="{
                      name: 'program-detail',
                      params: {
                        slug: program.slug,
                      },
                    }"
                    class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black text-yen-gold transition duration-300 group-hover:bg-yen-red group-hover:text-white"
                    :aria-label="
                      `View ${program.title}`
                    "
                  >
                    →
                  </RouterLink>
                </div>
              </div>
            </div>
          </article>
        </div>


        <!-- ======================================
             EMPTY STATE
        ======================================= -->

        <div
          v-else
          class="mt-8 rounded-[1.6rem] border border-dashed border-gray-300 bg-white px-5 py-14 text-center sm:rounded-[1.7rem] sm:px-6 sm:py-16"
        >
          <h3
            class="font-display text-xl font-bold text-black"
          >
            No programs found
          </h3>

          <p
            class="mx-auto mt-3 max-w-md font-body text-sm leading-7 text-gray-500"
          >
            Try another search or program category.
          </p>

          <button
            type="button"
            class="mt-5 font-display text-sm font-bold text-yen-red transition hover:text-black"
            @click="clearFilters"
          >
            View all programs
          </button>
        </div>
      </div>
    </section>


    <!-- ==========================================
         PROGRAM CTA
    =========================================== -->

    <section class="bg-white">
      <div
        class="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24"
      >
        <div
          class="relative overflow-hidden rounded-[1.7rem] bg-yen-gold p-7 sm:rounded-[2rem] sm:p-10 lg:p-14"
        >
          <!-- Decoration -->

          <div
            class="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border-[40px] border-black/5"
          ></div>


          <div
            class="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center"
          >
            <!-- Copy -->

            <div class="max-w-3xl">
              <p
                class="font-display text-[10px] font-extrabold uppercase tracking-[0.18em] text-yen-red sm:text-xs"
              >
                Ready to Grow?
              </p>

              <h2
                class="mt-4 font-display text-2xl font-extrabold leading-tight text-black sm:text-4xl"
              >
                Looking for your next business opportunity?
              </h2>

              <p
                class="mt-4 max-w-2xl font-body text-sm leading-7 text-black/65 sm:text-base"
              >
                Explore available training, funding, events,
                fellowships and entrepreneurship opportunities.
              </p>
            </div>


            <!--
              FIXED:
              This previously pointed back to
              /#opportunities on the homepage.

              It now uses the dedicated Opportunities page.
            -->

            <RouterLink
              :to="{ name: 'opportunities' }"
              class="inline-flex w-full items-center justify-center rounded-full bg-black px-7 py-4 font-display text-sm font-bold text-white transition duration-300 hover:-translate-y-1 hover:bg-yen-red sm:w-auto sm:min-w-[220px]"
            >
              Explore Opportunities

              <span class="ml-3 text-yen-gold">
                →
              </span>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>