<script setup>
import { computed, ref } from "vue"

import {
  opportunities,
  opportunityCategories,
} from "@/data/opportunities"

const searchQuery = ref("")
const activeCategory = ref("All")

const filteredOpportunities = computed(() => {
  const query = searchQuery.value
    .toLowerCase()
    .trim()

  return opportunities.filter((opportunity) => {
    const matchesCategory =
      activeCategory.value === "All" ||
      opportunity.category === activeCategory.value

    const matchesSearch =
      !query ||
      opportunity.title
        .toLowerCase()
        .includes(query) ||
      opportunity.organization
        .toLowerCase()
        .includes(query) ||
      opportunity.category
        .toLowerCase()
        .includes(query) ||
      opportunity.summary
        .toLowerCase()
        .includes(query)

    return matchesCategory && matchesSearch
  })
})

const homepageOpportunities = computed(() =>
  filteredOpportunities.value.slice(0, 6),
)

const clearFilters = () => {
  searchQuery.value = ""
  activeCategory.value = "All"
}
</script>

<template>
  <section
    id="opportunities"
    class="overflow-hidden bg-[#f7f7f5]"
  >
    <div
      class="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28"
    >
      <!-- =====================================
           HEADER
      ====================================== -->

      <div
        class="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end"
      >
        <div>
          <div
            class="mb-5 flex items-center gap-3"
          >
            <span
              class="h-[3px] w-10 bg-yen-red"
            ></span>

            <span
              class="font-display text-sm font-bold uppercase tracking-[0.18em] text-yen-red"
            >
              Opportunities Hub
            </span>
          </div>

          <h2
            class="max-w-3xl font-display text-4xl font-extrabold leading-tight tracking-tight text-black sm:text-5xl"
          >
            Find opportunities to

            <span class="text-yen-red">
              build, learn and grow.
            </span>
          </h2>
        </div>

        <p
          class="max-w-xl font-body text-base leading-8 text-gray-600 lg:ml-auto"
        >
          Explore funding, training, fellowships, competitions
          and events relevant to entrepreneurs in Liberia and
          beyond.
        </p>
      </div>


      <!-- =====================================
           SEARCH + FILTER
      ====================================== -->

      <div
        class="mt-12 rounded-[1.7rem] bg-black p-5 sm:p-7"
      >
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
                : 'border border-white/15 text-white/60 hover:border-yen-gold hover:text-yen-gold'
            "
            @click="activeCategory = category"
          >
            {{ category }}
          </button>
        </div>
      </div>


      <!-- =====================================
           RESULT BAR
      ====================================== -->

      <div
        class="mt-8 flex items-center justify-between gap-5"
      >
        <p
          class="font-display text-sm font-semibold text-gray-500"
        >
          Showing

          <span class="font-bold text-black">
            {{ homepageOpportunities.length }}
          </span>

          opportunities
        </p>

        <button
          v-if="
            searchQuery ||
            activeCategory !== 'All'
          "
          type="button"
          class="font-display text-sm font-bold text-yen-red transition hover:text-black"
          @click="clearFilters"
        >
          Clear filters
        </button>
      </div>


      <!-- =====================================
           OPPORTUNITY CARDS
      ====================================== -->

      <div
        v-if="homepageOpportunities.length"
        class="mt-7 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        <article
          v-for="opportunity in homepageOpportunities"
          :key="opportunity.id"
          class="group flex flex-col overflow-hidden rounded-[1.7rem] border border-gray-200 bg-white transition duration-300 hover:-translate-y-2 hover:border-transparent hover:shadow-2xl"
        >
          <!-- Image -->

          <div
            class="relative h-[220px] overflow-hidden"
          >
            <img
              :src="opportunity.image"
              :alt="opportunity.title"
              class="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />

            <div
              class="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent"
            ></div>


            <div
              class="absolute left-5 top-5"
            >
              <span
                class="rounded-full bg-yen-gold px-3 py-2 font-display text-[9px] font-extrabold uppercase tracking-wider text-black"
              >
                {{ opportunity.category }}
              </span>
            </div>


            <div
              v-if="opportunity.featured"
              class="absolute right-5 top-5"
            >
              <span
                class="rounded-full bg-white px-3 py-2 font-display text-[9px] font-extrabold uppercase text-black"
              >
                Featured
              </span>
            </div>
          </div>


          <!-- Content -->

          <div
            class="flex flex-1 flex-col p-7"
          >
            <p
              class="font-display text-xs font-semibold text-yen-red"
            >
              {{ opportunity.organization }}
            </p>

            <h3
              class="mt-3 font-display text-xl font-bold leading-snug text-black"
            >
              {{ opportunity.title }}
            </h3>

            <p
              class="mt-4 flex-1 font-body text-sm leading-7 text-gray-600"
            >
              {{ opportunity.summary }}
            </p>


            <!-- Metadata -->

            <div
              class="mt-6 space-y-3 border-t border-gray-100 pt-5"
            >
              <div
                class="flex items-center justify-between gap-4"
              >
                <span
                  class="font-display text-[9px] font-bold uppercase tracking-wider text-gray-400"
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
                  class="font-display text-[9px] font-bold uppercase tracking-wider text-gray-400"
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


            <RouterLink
              :to="{
                name: 'opportunity-detail',
                params: {
                  slug: opportunity.slug,
                },
              }"
              class="mt-6 flex items-center justify-between rounded-xl bg-black px-5 py-4 font-display text-sm font-bold text-white transition group-hover:bg-yen-red"
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
        class="mt-7 rounded-[1.7rem] border border-dashed border-gray-300 bg-white px-6 py-14 text-center"
      >
        <h3
          class="font-display text-xl font-bold text-black"
        >
          No opportunities found
        </h3>

        <p
          class="mt-3 font-body text-sm text-gray-500"
        >
          Try another search or opportunity category.
        </p>

        <button
          type="button"
          class="mt-5 font-display text-sm font-bold text-yen-red"
          @click="clearFilters"
        >
          View all opportunities
        </button>
      </div>


      <!-- =====================================
           BOTTOM ACTIONS
      ====================================== -->

      <div
        class="mt-12 flex flex-col items-start justify-between gap-6 border-t border-gray-200 pt-8 lg:flex-row lg:items-center"
      >
        <div>
          <h3
            class="font-display text-xl font-bold text-black"
          >
            Looking for your next opportunity?
          </h3>

          <p
            class="mt-2 max-w-xl font-body text-sm leading-7 text-gray-500"
          >
            Browse the full Opportunities Hub or join YEN-Liberia
            to become part of the entrepreneurship network.
          </p>
        </div>


        <div
          class="flex flex-col gap-3 sm:flex-row"
        >
          <RouterLink
            :to="{ name: 'opportunities' }"
            class="inline-flex items-center justify-center rounded-full border border-black px-6 py-3.5 font-display text-sm font-bold text-black transition hover:bg-black hover:text-yen-gold"
          >
            Explore All Opportunities
          </RouterLink>

          <RouterLink
            :to="{ name: 'join' }"
            class="inline-flex items-center justify-center rounded-full bg-yen-gold px-6 py-3.5 font-display text-sm font-bold text-black transition hover:-translate-y-1 hover:bg-black hover:text-white"
          >
            Join YEN-Liberia

            <span class="ml-3">
              →
            </span>
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>