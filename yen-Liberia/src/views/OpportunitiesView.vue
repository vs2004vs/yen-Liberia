<script setup>
import { computed, ref } from "vue"
import {
  opportunities,
  opportunityCategories,
} from "@/data/opportunities"

const searchQuery = ref("")
const activeCategory = ref("All")
const selectedLocation = ref("All")

const locations = [
  "All",
  ...new Set(
    opportunities.map((opportunity) => opportunity.location),
  ),
]

const filteredOpportunities = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()

  return opportunities.filter((opportunity) => {
    const matchesCategory =
      activeCategory.value === "All" ||
      opportunity.category === activeCategory.value

    const matchesLocation =
      selectedLocation.value === "All" ||
      opportunity.location === selectedLocation.value

    const matchesSearch =
      !query ||
      opportunity.title.toLowerCase().includes(query) ||
      opportunity.organization.toLowerCase().includes(query) ||
      opportunity.category.toLowerCase().includes(query) ||
      opportunity.location.toLowerCase().includes(query) ||
      opportunity.summary.toLowerCase().includes(query)

    return (
      matchesCategory &&
      matchesLocation &&
      matchesSearch
    )
  })
})

const clearFilters = () => {
  searchQuery.value = ""
  activeCategory.value = "All"
  selectedLocation.value = "All"
}

const categoryClasses = (category) => {
  const classes = {
    Funding: "bg-yen-gold text-black",
    Training: "bg-black text-yen-gold",
    Fellowship: "bg-yen-red text-white",
    Competition: "bg-gray-100 text-black",
    Events: "bg-black text-white",
  }

  return classes[category] || "bg-gray-100 text-black"
}
</script>

<template>
  <main class="w-full">
    <!-- ======================================
         HERO
    ======================================= -->

    <section
      class="relative isolate min-h-[560px] overflow-hidden"
    >
      <img
        src="/images/hero/hero-1.jpg"
        alt="Entrepreneurship opportunities"
        class="absolute inset-0 h-full w-full object-cover"
      />

      <div
        class="absolute inset-0 bg-linear-to-r from-black/85 via-black/55 to-black/10"
      ></div>

      <div
        class="relative z-10 mx-auto flex min-h-[560px] max-w-7xl items-center px-5 py-20 lg:px-8"
      >
        <div class="max-w-4xl">
          <div
            class="mb-8 flex items-center gap-3 font-display text-xs font-bold"
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
              Opportunities
            </span>
          </div>

          <p
            class="font-display text-xs font-extrabold uppercase tracking-[0.2em] text-yen-gold"
          >
            Opportunities Hub
          </p>

          <h1
            class="mt-5 max-w-4xl font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            Find opportunities to

            <span class="text-yen-gold">
              build, learn and grow.
            </span>
          </h1>

          <p
            class="mt-7 max-w-2xl font-body text-base leading-8 text-white/75 sm:text-lg"
          >
            Discover funding, training, fellowships,
            competitions, events and entrepreneurship
            opportunities relevant to young founders in Liberia
            and beyond.
          </p>
        </div>
      </div>

      <div
        class="absolute bottom-0 left-0 h-1 w-full bg-linear-to-r from-yen-red via-yen-gold to-yen-red"
      ></div>
    </section>

    <!-- ======================================
         INTRO
    ======================================= -->

    <section class="bg-white">
      <div
        class="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-24"
      >
        <div>
          <p
            class="font-display text-xs font-extrabold uppercase tracking-[0.18em] text-yen-red"
          >
            Opportunity Access
          </p>

          <h2
            class="mt-4 font-display text-4xl font-extrabold leading-tight text-black sm:text-5xl"
          >
            The right opportunity can change a

            <span class="text-yen-red">
              business journey.
            </span>
          </h2>
        </div>

        <div>
          <p
            class="font-body text-base leading-8 text-gray-600"
          >
            YEN-Liberia's Opportunities Hub is designed to make it
            easier for entrepreneurs to discover relevant calls,
            programs and resources without searching across dozens
            of separate platforms.
          </p>

          <p
            class="mt-5 font-body text-base leading-8 text-gray-600"
          >
            As the platform grows, opportunities will be reviewed,
            categorized and published through the YEN-Liberia
            Admin Dashboard.
          </p>
        </div>
      </div>
    </section>

    <!-- ======================================
         DIRECTORY
    ======================================= -->

    <section class="bg-[#f7f7f5]">
      <div
        class="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28"
      >
        <div>
          <p
            class="font-display text-xs font-extrabold uppercase tracking-[0.18em] text-yen-red"
          >
            Browse Opportunities
          </p>

          <h2
            class="mt-3 font-display text-3xl font-extrabold text-black sm:text-4xl"
          >
            Explore what's available
          </h2>
        </div>

        <!-- Search panel -->

        <div
          class="mt-10 rounded-[1.8rem] bg-black p-5 sm:p-7"
        >
          <div
            class="grid gap-4 lg:grid-cols-[1.4fr_0.6fr]"
          >
            <!-- Search -->

            <div class="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m21 21-4.35-4.35m2.35-5.65A8 8 0 1 1 3 11a8 8 0 0 1 16 0Z"
                />
              </svg>

              <input
                v-model="searchQuery"
                type="search"
                placeholder="Search funding, training, fellowships..."
                class="w-full rounded-xl border border-white/15 bg-white/10 py-4 pl-14 pr-5 font-display text-sm text-white outline-none placeholder:text-white/35 focus:border-yen-gold"
              />
            </div>

            <!-- Location -->

            <select
              v-model="selectedLocation"
              class="rounded-xl border border-white/15 bg-white/10 px-5 py-4 font-display text-sm font-semibold text-white outline-none focus:border-yen-gold"
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

          <!-- Categories -->

          <div
            class="mt-5 flex flex-wrap gap-2"
          >
            <button
              v-for="category in opportunityCategories"
              :key="category"
              type="button"
              class="rounded-full px-4 py-2.5 font-display text-xs font-bold transition duration-300"
              :class="
                activeCategory === category
                  ? 'bg-yen-gold text-black'
                  : 'border border-white/15 text-white/65 hover:border-yen-gold hover:text-yen-gold'
              "
              @click="activeCategory = category"
            >
              {{ category }}
            </button>
          </div>
        </div>

        <!-- Result bar -->

        <div
          class="mt-8 flex items-center justify-between gap-5"
        >
          <p
            class="font-display text-sm font-semibold text-gray-500"
          >
            Showing

            <span class="font-bold text-black">
              {{ filteredOpportunities.length }}
            </span>

            opportunities
          </p>

          <button
            v-if="
              searchQuery ||
              activeCategory !== 'All' ||
              selectedLocation !== 'All'
            "
            type="button"
            class="font-display text-sm font-bold text-yen-red transition hover:text-black"
            @click="clearFilters"
          >
            Clear filters
          </button>
        </div>

        <!-- Cards -->

        <div
          v-if="filteredOpportunities.length"
          class="mt-7 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          <article
            v-for="opportunity in filteredOpportunities"
            :key="opportunity.id"
            class="group relative flex flex-col overflow-hidden rounded-[1.7rem] border border-gray-200 bg-white transition duration-300 hover:-translate-y-2 hover:border-transparent hover:shadow-2xl"
          >
            <!-- Image -->

            <div
              class="relative h-[230px] overflow-hidden"
            >
              <img
                :src="opportunity.image"
                :alt="opportunity.title"
                class="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />

              <div
                class="absolute inset-0 bg-linear-to-t from-black/65 via-black/10 to-transparent"
              ></div>

              <div
                class="absolute left-5 top-5"
              >
                <span
                  class="rounded-full px-4 py-2 font-display text-[10px] font-extrabold uppercase tracking-wider"
                  :class="categoryClasses(opportunity.category)"
                >
                  {{ opportunity.category }}
                </span>
              </div>

              <div
                v-if="opportunity.featured"
                class="absolute right-5 top-5"
              >
                <span
                  class="rounded-full bg-white px-3 py-2 font-display text-[9px] font-extrabold uppercase tracking-wider text-black"
                >
                  Featured
                </span>
              </div>
            </div>

            <!-- Body -->

            <div class="flex flex-1 flex-col p-7">
              <p
                class="font-display text-xs font-semibold text-yen-red"
              >
                {{ opportunity.organization }}
              </p>

              <h3
                class="mt-3 font-display text-2xl font-bold leading-snug text-black"
              >
                {{ opportunity.title }}
              </h3>

              <p
                class="mt-4 flex-1 font-body text-sm leading-7 text-gray-600"
              >
                {{ opportunity.summary }}
              </p>

              <!-- Meta -->

              <div
                class="mt-6 space-y-3 border-t border-gray-100 pt-5"
              >
                <div
                  class="flex items-center justify-between gap-4"
                >
                  <span
                    class="font-display text-[10px] font-bold uppercase tracking-wider text-gray-400"
                  >
                    Location
                  </span>

                  <span
                    class="text-right font-display text-xs font-semibold text-black"
                  >
                    {{ opportunity.location }}
                  </span>
                </div>

                <div
                  class="flex items-center justify-between gap-4"
                >
                  <span
                    class="font-display text-[10px] font-bold uppercase tracking-wider text-gray-400"
                  >
                    Deadline
                  </span>

                  <span
                    class="text-right font-display text-xs font-semibold text-yen-red"
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
                View Opportunity

                <span
                  class="flex h-8 w-8 items-center justify-center rounded-full bg-yen-gold text-black"
                >
                  →
                </span>
              </RouterLink>
            </div>
          </article>
        </div>

        <!-- Empty -->

        <div
          v-else
          class="mt-8 rounded-[1.7rem] border border-dashed border-gray-300 bg-white px-6 py-16 text-center"
        >
          <h3
            class="font-display text-xl font-bold text-black"
          >
            No opportunities found
          </h3>

          <p
            class="mt-3 font-body text-sm text-gray-500"
          >
            Try another search, category or location.
          </p>

          <button
            type="button"
            class="mt-5 font-display text-sm font-bold text-yen-red"
            @click="clearFilters"
          >
            View all opportunities
          </button>
        </div>
      </div>
    </section>

    <!-- ======================================
         ALERT CTA
    ======================================= -->

    <section class="bg-white">
      <div
        class="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24"
      >
        <div
          class="relative overflow-hidden rounded-[2rem] bg-yen-gold p-8 sm:p-10 lg:p-14"
        >
          <div
            class="absolute -right-24 -top-24 h-72 w-72 rounded-full border-[40px] border-black/5"
          ></div>

          <div
            class="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center"
          >
            <div class="max-w-3xl">
              <p
                class="font-display text-xs font-extrabold uppercase tracking-[0.18em] text-yen-red"
              >
                Opportunity Alerts
              </p>

              <h2
                class="mt-4 font-display text-3xl font-extrabold leading-tight text-black sm:text-4xl"
              >
                Don't miss the next opportunity.
              </h2>

              <p
                class="mt-4 max-w-2xl font-body text-sm leading-7 text-black/65 sm:text-base"
              >
                Join the YEN Opportunity Newsletter and receive
                funding, training, fellowships and entrepreneurship
                calls directly in your inbox.
              </p>
            </div>

            <RouterLink
              :to="{
                name: 'home',
                hash: '#newsletter',
              }"
              class="inline-flex items-center justify-center rounded-full bg-black px-7 py-4 font-display text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-yen-red"
            >
              Get Opportunity Alerts

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