<script setup>
import {
  computed,
  ref,
} from "vue"

import {
  opportunities,
  opportunityCategories,
} from "@/data/opportunities"


/*
|--------------------------------------------------------------------------
| FILTER STATE
|--------------------------------------------------------------------------
*/

const searchQuery = ref("")
const activeCategory = ref("All")
const selectedLocation = ref("All")


/*
|--------------------------------------------------------------------------
| SAFE DATA HELPERS
|--------------------------------------------------------------------------
*/

const normalizeText = (value) => {
  return String(value ?? "")
    .toLowerCase()
    .trim()
}


/*
|--------------------------------------------------------------------------
| FILTER OPTIONS
|--------------------------------------------------------------------------
|
| Categories use both the central category list and categories that
| actually exist in the opportunity records.
|
| This prevents the page from becoming out of sync later.
|
*/

const categories = computed(() => {
  const configuredCategories =
    Array.isArray(opportunityCategories)
      ? opportunityCategories.filter(
          (category) =>
            category &&
            category !== "All",
        )
      : []

  const availableCategories =
    opportunities
      .map(
        (opportunity) =>
          opportunity.category,
      )
      .filter(Boolean)

  return [
    "All",
    ...new Set([
      ...configuredCategories,
      ...availableCategories,
    ]),
  ]
})


const locations = computed(() => {
  const availableLocations =
    opportunities
      .map(
        (opportunity) =>
          opportunity.location,
      )
      .filter(Boolean)

  return [
    "All",
    ...new Set(availableLocations),
  ]
})


/*
|--------------------------------------------------------------------------
| FILTERED OPPORTUNITIES
|--------------------------------------------------------------------------
*/

const filteredOpportunities = computed(() => {
  const query = normalizeText(
    searchQuery.value,
  )

  return opportunities.filter(
    (opportunity) => {
      const matchesCategory =
        activeCategory.value === "All" ||
        opportunity.category ===
          activeCategory.value

      const matchesLocation =
        selectedLocation.value === "All" ||
        opportunity.location ===
          selectedLocation.value

      const searchableContent = [
        opportunity.title,
        opportunity.organization,
        opportunity.category,
        opportunity.location,
        opportunity.summary,
      ]
        .map(normalizeText)
        .join(" ")

      const matchesSearch =
        !query ||
        searchableContent.includes(query)

      return (
        matchesCategory &&
        matchesLocation &&
        matchesSearch
      )
    },
  )
})


const clearFilters = () => {
  searchQuery.value = ""
  activeCategory.value = "All"
  selectedLocation.value = "All"
}


/*
|--------------------------------------------------------------------------
| CATEGORY BADGE STYLES
|--------------------------------------------------------------------------
*/

const categoryClasses = (category) => {
  const classes = {
    Funding:
      "bg-yen-gold text-black",

    Training:
      "bg-black text-yen-gold",

    Fellowship:
      "bg-yen-red text-white",

    Competition:
      "bg-gray-100 text-black",

    Events:
      "bg-black text-white",
  }

  return (
    classes[category] ||
    "bg-gray-100 text-black"
  )
}
</script>


<template>
  <main class="w-full overflow-hidden">

    <!-- ======================================
         HERO
    ======================================= -->

    <section
      class="relative isolate min-h-[540px] overflow-hidden sm:min-h-[560px] lg:min-h-[580px]"
    >
      <!-- Background -->

      <img
        src="/images/hero/hero-1.jpg"
        alt="Entrepreneurship opportunities"
        class="absolute inset-0 h-full w-full object-cover object-center"
      />


      <!-- Contrast -->

      <div
        class="absolute inset-0 bg-linear-to-r from-black/90 via-black/65 to-black/25 sm:from-black/85 sm:via-black/55 sm:to-black/10"
      ></div>

      <div
        class="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-black/20"
      ></div>


      <!-- Content -->

      <div
        class="relative z-10 mx-auto flex min-h-[540px] max-w-7xl items-center px-5 py-16 sm:min-h-[560px] sm:px-6 sm:py-20 lg:min-h-[580px] lg:px-8"
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
              Opportunities
            </span>
          </div>


          <!-- Label -->

          <p
            class="font-display text-[10px] font-extrabold uppercase tracking-[0.2em] text-yen-gold sm:text-xs"
          >
            Opportunities Hub
          </p>


          <!-- Heading -->

          <h1
            class="mt-5 max-w-4xl font-display text-[40px] font-extrabold leading-[1.05] tracking-tight text-white min-[390px]:text-[44px] sm:text-6xl lg:text-7xl"
          >
            Find opportunities to

            <span class="text-yen-gold">
              build, learn and grow.
            </span>
          </h1>


          <!-- Description -->

          <p
            class="mt-6 max-w-2xl font-body text-sm leading-7 text-white/80 sm:mt-7 sm:text-lg sm:leading-8"
          >
            Discover funding, training, fellowships,
            competitions, events and entrepreneurship
            opportunities relevant to young founders in
            Liberia and beyond.
          </p>
        </div>
      </div>


      <!-- Brand accent -->

      <div
        class="absolute bottom-0 left-0 z-20 h-1 w-full bg-linear-to-r from-yen-red via-yen-gold to-yen-red"
      ></div>
    </section>


    <!-- ======================================
         INTRO
    ======================================= -->

    <section class="bg-white">
      <div
        class="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:px-8 lg:py-24"
      >
        <!-- Heading -->

        <div>
          <p
            class="font-display text-[10px] font-extrabold uppercase tracking-[0.18em] text-yen-red sm:text-xs"
          >
            Opportunity Access
          </p>

          <h2
            class="mt-4 font-display text-3xl font-extrabold leading-tight text-black min-[390px]:text-4xl sm:text-5xl"
          >
            The right opportunity can change a

            <span class="text-yen-red">
              business journey.
            </span>
          </h2>
        </div>


        <!-- Description -->

        <div>
          <p
            class="font-body text-sm leading-8 text-gray-600 sm:text-base"
          >
            YEN-Liberia's Opportunities Hub is designed to make
            it easier for entrepreneurs to discover relevant
            calls, programs and resources without searching
            across dozens of separate platforms.
          </p>

          <p
            class="mt-5 font-body text-sm leading-8 text-gray-600 sm:text-base"
          >
            As the platform grows, opportunities will be
            reviewed, categorized and published through the
            YEN-Liberia Admin Dashboard.
          </p>
        </div>
      </div>
    </section>


    <!-- ======================================
         OPPORTUNITY DIRECTORY
    ======================================= -->

    <section class="bg-[#f7f7f5]">
      <div
        class="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28"
      >
        <!-- Heading -->

        <div>
          <p
            class="font-display text-[10px] font-extrabold uppercase tracking-[0.18em] text-yen-red sm:text-xs"
          >
            Browse Opportunities
          </p>

          <h2
            class="mt-3 font-display text-3xl font-extrabold leading-tight text-black sm:text-4xl"
          >
            Explore what's available
          </h2>
        </div>


        <!-- ==================================
             SEARCH PANEL
        =================================== -->

        <div
          class="mt-9 rounded-[1.5rem] bg-black p-4 sm:mt-10 sm:rounded-[1.8rem] sm:p-7"
        >
          <div
            class="grid gap-4 lg:grid-cols-[1.4fr_0.6fr]"
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
                for="opportunity-search"
                class="sr-only"
              >
                Search entrepreneurship opportunities
              </label>


              <input
                id="opportunity-search"
                v-model="searchQuery"
                type="search"
                autocomplete="off"
                placeholder="Search funding, training, fellowships..."
                class="w-full rounded-xl border border-white/15 bg-white/10 py-4 pl-12 pr-4 font-display text-sm text-white outline-none transition placeholder:text-white/35 focus:border-yen-gold focus:bg-white/15 sm:pl-14 sm:pr-5"
              />
            </div>


            <!-- Location -->

            <div>
              <label
                for="opportunity-location"
                class="sr-only"
              >
                Filter opportunities by location
              </label>

              <select
                id="opportunity-location"
                v-model="selectedLocation"
                class="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-4 font-display text-sm font-semibold text-white outline-none transition focus:border-yen-gold focus:bg-white/15 sm:px-5"
              >
                <option
                  v-for="location in locations"
                  :key="location"
                  :value="location"
                  class="text-black"
                >
                  {{
                    location === "All"
                      ? "All Locations"
                      : location
                  }}
                </option>
              </select>
            </div>
          </div>


          <!-- Categories -->

          <div
            class="mt-5 flex flex-wrap gap-2"
            aria-label="Filter opportunities by category"
          >
            <button
              v-for="category in categories"
              :key="category"
              type="button"
              :aria-pressed="
                activeCategory === category
              "
              class="rounded-full px-3.5 py-2.5 font-display text-[11px] font-bold transition duration-300 sm:px-4 sm:text-xs"
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


        <!-- ==================================
             RESULTS BAR
        =================================== -->

        <div
          class="mt-7 flex flex-wrap items-center justify-between gap-4 sm:mt-8"
        >
          <p
            class="font-display text-xs font-semibold text-gray-500 sm:text-sm"
            aria-live="polite"
          >
            Showing

            <span class="font-bold text-black">
              {{ filteredOpportunities.length }}
            </span>

            {{
              filteredOpportunities.length === 1
                ? "opportunity"
                : "opportunities"
            }}
          </p>


          <button
            v-if="
              searchQuery ||
              activeCategory !== 'All' ||
              selectedLocation !== 'All'
            "
            type="button"
            class="font-display text-xs font-bold text-yen-red transition hover:text-black sm:text-sm"
            @click="clearFilters"
          >
            Clear filters
          </button>
        </div>


        <!-- ==================================
             OPPORTUNITY CARDS
        =================================== -->

        <div
          v-if="filteredOpportunities.length"
          class="mt-7 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          <article
            v-for="opportunity in filteredOpportunities"
            :key="opportunity.id"
            class="group relative flex h-full flex-col overflow-hidden rounded-[1.6rem] border border-gray-200 bg-white transition duration-300 hover:-translate-y-2 hover:border-transparent hover:shadow-2xl sm:rounded-[1.7rem]"
          >
            <!-- Image -->

            <div
              class="relative h-[220px] overflow-hidden sm:h-[240px]"
            >
              <img
                :src="opportunity.image"
                :alt="opportunity.title"
                loading="lazy"
                class="h-full w-full object-cover object-center transition duration-700 group-hover:scale-105"
              />

              <div
                class="absolute inset-0 bg-linear-to-t from-black/65 via-black/10 to-transparent"
              ></div>


              <!-- Category -->

              <div
                class="absolute left-4 top-4 sm:left-5 sm:top-5"
              >
                <span
                  class="rounded-full px-3 py-2 font-display text-[9px] font-extrabold uppercase tracking-wider sm:px-4 sm:text-[10px]"
                  :class="
                    categoryClasses(
                      opportunity.category,
                    )
                  "
                >
                  {{ opportunity.category }}
                </span>
              </div>


              <!-- Featured -->

              <div
                v-if="opportunity.featured"
                class="absolute right-4 top-4 sm:right-5 sm:top-5"
              >
                <span
                  class="rounded-full bg-white px-3 py-2 font-display text-[9px] font-extrabold uppercase tracking-wider text-black"
                >
                  Featured
                </span>
              </div>
            </div>


            <!-- =================================
                 CARD BODY
            ================================== -->

            <div
              class="flex flex-1 flex-col p-6 sm:p-7"
            >
              <!-- Organization -->

              <p
                class="font-display text-xs font-semibold leading-5 text-yen-red"
              >
                {{ opportunity.organization }}
              </p>


              <!-- Title -->

              <h3
                class="mt-3 font-display text-xl font-bold leading-snug text-black sm:text-2xl"
              >
                {{ opportunity.title }}
              </h3>


              <!-- Summary -->

              <p
                class="mt-4 font-body text-sm leading-7 text-gray-600"
              >
                {{ opportunity.summary }}
              </p>


              <!-- Push bottom content down -->

              <div class="mt-auto pt-6">

                <!-- Metadata -->

                <div
                  class="space-y-4 border-t border-gray-100 pt-5"
                >
                  <!-- Location -->

                  <div
                    class="grid grid-cols-[auto_1fr] items-start gap-4"
                  >
                    <span
                      class="font-display text-[9px] font-bold uppercase tracking-wider text-gray-400 sm:text-[10px]"
                    >
                      Location
                    </span>

                    <span
                      class="min-w-0 text-right font-display text-xs font-semibold leading-5 text-black"
                    >
                      {{ opportunity.location }}
                    </span>
                  </div>


                  <!-- Deadline -->

                  <div
                    class="grid grid-cols-[auto_1fr] items-start gap-4"
                  >
                    <span
                      class="font-display text-[9px] font-bold uppercase tracking-wider text-gray-400 sm:text-[10px]"
                    >
                      Deadline
                    </span>

                    <span
                      class="min-w-0 text-right font-display text-xs font-semibold leading-5 text-yen-red"
                    >
                      {{ opportunity.deadline }}
                    </span>
                  </div>
                </div>


                <!-- Link -->

                <RouterLink
                  :to="{
                    name: 'opportunity-detail',
                    params: {
                      slug: opportunity.slug,
                    },
                  }"
                  class="mt-6 flex items-center justify-between rounded-xl bg-black px-5 py-4 font-display text-sm font-bold text-white transition duration-300 group-hover:bg-yen-red"
                >
                  <span>
                    View Opportunity
                  </span>

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


        <!-- ==================================
             EMPTY STATE
        =================================== -->

        <div
          v-else
          class="mt-8 rounded-[1.6rem] border border-dashed border-gray-300 bg-white px-5 py-14 text-center sm:rounded-[1.7rem] sm:px-6 sm:py-16"
        >
          <h3
            class="font-display text-xl font-bold text-black"
          >
            No opportunities found
          </h3>

          <p
            class="mx-auto mt-3 max-w-md font-body text-sm leading-7 text-gray-500"
          >
            Try another search, category or location.
          </p>

          <button
            type="button"
            class="mt-5 font-display text-sm font-bold text-yen-red transition hover:text-black"
            @click="clearFilters"
          >
            View all opportunities
          </button>
        </div>
      </div>
    </section>


    <!-- ======================================
         OPPORTUNITY ALERT CTA
    ======================================= -->

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
                Opportunity Alerts
              </p>

              <h2
                class="mt-4 font-display text-2xl font-extrabold leading-tight text-black sm:text-4xl"
              >
                Don't miss the next opportunity.
              </h2>

              <p
                class="mt-4 max-w-2xl font-body text-sm leading-7 text-black/65 sm:text-base"
              >
                Join the YEN Opportunity Newsletter and receive
                funding, training, fellowships and
                entrepreneurship calls directly in your inbox.
              </p>
            </div>


            <!--
              Intentional homepage hash.

              The newsletter remains a section on Home,
              so this is NOT an unfinished routing shortcut.
            -->

            <RouterLink
              :to="{
                name: 'home',
                hash: '#newsletter',
              }"
              class="inline-flex w-full items-center justify-center rounded-full bg-black px-7 py-4 font-display text-sm font-bold text-white transition duration-300 hover:-translate-y-1 hover:bg-yen-red sm:w-auto sm:min-w-[220px]"
            >
              Get Opportunity Alerts

              <span
                class="ml-3 text-yen-gold"
              >
                →
              </span>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>