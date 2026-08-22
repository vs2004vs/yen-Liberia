<script setup>
import { computed, ref } from "vue"

const searchQuery = ref("")
const activeCategory = ref("All")

const categories = [
  "All",
  "Funding",
  "Training",
  "Fellowship",
  "Competition",
  "Events",
]

/*
  DEMO DATA FOR FRONTEND DEVELOPMENT.

  Later these opportunities will come from our database/admin dashboard.
  For now, these allow us to build and test the UI.
*/
const opportunities = ref([
  {
    id: 1,
    title: "Youth Business Growth Fund",
    organization: "Entrepreneur Support Program",
    category: "Funding",
    location: "Liberia",
    deadline: "To be announced",
    description:
      "Funding support designed to help youth-led businesses strengthen operations, expand market reach and create sustainable employment.",
    featured: true,
  },
  {
    id: 2,
    title: "Digital Business Skills Training",
    organization: "YEN-Liberia",
    category: "Training",
    location: "Monrovia, Liberia",
    deadline: "Registration opening soon",
    description:
      "Practical training covering digital marketing, branding, business productivity tools and strategies for growing a business online.",
    featured: false,
  },
  {
    id: 3,
    title: "Young Entrepreneurs Fellowship",
    organization: "Entrepreneurship Partner",
    category: "Fellowship",
    location: "Africa",
    deadline: "Applications opening soon",
    description:
      "A fellowship opportunity connecting emerging entrepreneurs with mentorship, business learning and an international peer network.",
    featured: false,
  },
  {
    id: 4,
    title: "Liberia Startup Pitch Competition",
    organization: "YEN-Liberia",
    category: "Competition",
    location: "Liberia",
    deadline: "Coming soon",
    description:
      "An opportunity for young founders to present their businesses, receive feedback and compete for business-development support.",
    featured: false,
  },
  {
    id: 5,
    title: "Entrepreneur Networking Forum",
    organization: "YEN-Liberia",
    category: "Events",
    location: "Monrovia, Liberia",
    deadline: "Event date coming soon",
    description:
      "Connect with founders, business leaders, mentors, institutions and development partners across Liberia's entrepreneurship ecosystem.",
    featured: false,
  },
  {
    id: 6,
    title: "Women Entrepreneurs Capacity Program",
    organization: "YEN-Liberia & Partners",
    category: "Training",
    location: "Liberia",
    deadline: "To be announced",
    description:
      "Business-development and digital capacity support designed to strengthen women-led enterprises and expand market opportunities.",
    featured: false,
  },
])

const filteredOpportunities = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()

  return opportunities.value.filter((opportunity) => {
    const matchesCategory =
      activeCategory.value === "All" ||
      opportunity.category === activeCategory.value

    const matchesSearch =
      !query ||
      opportunity.title.toLowerCase().includes(query) ||
      opportunity.organization.toLowerCase().includes(query) ||
      opportunity.location.toLowerCase().includes(query) ||
      opportunity.category.toLowerCase().includes(query)

    return matchesCategory && matchesSearch
  })
})
</script>

<template>
  <section
    id="opportunities"
    class="bg-[#f7f7f5]"
  >
    <div
      class="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28"
    >
      <!-- =========================================
           SECTION HEADER
      ========================================== -->

      <div
        class="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end"
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
            class="font-display max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-black sm:text-5xl"
          >
            Opportunities that can move your

            <span class="text-yen-red">
              business forward.
            </span>
          </h2>
        </div>

        <p
          class="max-w-xl font-body text-base leading-8 text-gray-600 lg:ml-auto"
        >
          Discover funding, training, fellowships, competitions,
          events and business-development opportunities selected
          for Liberia's growing entrepreneur community.
        </p>
      </div>

      <!-- =========================================
           SEARCH + FILTER
      ========================================== -->

      <div
        class="mt-12 rounded-[1.7rem] bg-black p-5 shadow-xl sm:p-7"
      >
        <!-- Search -->
        <div class="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-white/50"
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
            placeholder="Search grants, training, funding, events..."
            class="w-full rounded-2xl border border-white/15 bg-white/10 py-4 pl-14 pr-5 font-display text-sm text-white outline-none transition placeholder:text-white/45 focus:border-yen-gold focus:bg-white/15"
          />
        </div>

        <!-- Filter buttons -->
        <div
          class="mt-5 flex flex-wrap gap-2"
        >
          <button
            v-for="category in categories"
            :key="category"
            type="button"
            class="rounded-full px-4 py-2.5 font-display text-xs font-bold transition duration-300"
            :class="
              activeCategory === category
                ? 'bg-yen-gold text-black'
                : 'border border-white/15 bg-white/5 text-white/70 hover:border-yen-gold hover:text-yen-gold'
            "
            @click="activeCategory = category"
          >
            {{ category }}
          </button>
        </div>
      </div>

      <!-- Result count -->
      <div
        class="mt-8 flex items-center justify-between gap-5"
      >
        <p
          class="font-display text-sm font-semibold text-gray-600"
        >
          Showing
          <span class="font-bold text-black">
            {{ filteredOpportunities.length }}
          </span>
          opportunities
        </p>

        <button
          v-if="searchQuery || activeCategory !== 'All'"
          type="button"
          class="font-display text-sm font-bold text-yen-red hover:text-black"
          @click="
            searchQuery = '';
            activeCategory = 'All'
          "
        >
          Clear filters
        </button>
      </div>

      <!-- =========================================
           OPPORTUNITY CARDS
      ========================================== -->

      <div
        v-if="filteredOpportunities.length"
        class="mt-7 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        <article
          v-for="opportunity in filteredOpportunities"
          :key="opportunity.id"
          class="group relative flex flex-col overflow-hidden rounded-[1.6rem] border border-gray-200 bg-white p-7 transition duration-300 hover:-translate-y-2 hover:border-transparent hover:shadow-2xl"
        >
          <!-- Featured -->
          <div
            v-if="opportunity.featured"
            class="absolute right-5 top-5"
          >
            <span
              class="rounded-full bg-yen-gold px-3 py-1.5 font-display text-[10px] font-extrabold uppercase tracking-wider text-black"
            >
              Featured
            </span>
          </div>

          <!-- Category icon -->
          <div
            class="flex h-12 w-12 items-center justify-center rounded-xl"
            :class="{
              'bg-yen-gold text-black':
                opportunity.category === 'Funding',

              'bg-black text-yen-gold':
                opportunity.category === 'Training',

              'bg-yen-red text-white':
                opportunity.category === 'Fellowship',

              'bg-gray-100 text-black':
                opportunity.category === 'Competition',

              'bg-black text-white':
                opportunity.category === 'Events',
            }"
          >
            <!-- Funding -->
            <svg
              v-if="opportunity.category === 'Funding'"
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
              />
            </svg>

            <!-- Training -->
            <svg
              v-else-if="opportunity.category === 'Training'"
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 14l9-5-9-5-9 5 9 5Zm0 0 6.16-3.422A12.083 12.083 0 0 1 18 14c0 2.21-2.686 4-6 4s-6-1.79-6-4c0-1.226.825-2.323 2.12-3.06"
              />
            </svg>

            <!-- Fellowship -->
            <svg
              v-else-if="opportunity.category === 'Fellowship'"
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 20h5v-2a4 4 0 0 0-4-4h-1M9 20H2v-2a4 4 0 0 1 4-4h1m5-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
              />
            </svg>

            <!-- Competition -->
            <svg
              v-else-if="opportunity.category === 'Competition'"
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 21h8M12 17v4M7 4h10v3a5 5 0 0 1-10 0V4Zm0 1H4v2a4 4 0 0 0 4 4m9-6h3v2a4 4 0 0 1-4 4"
              />
            </svg>

            <!-- Events -->
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 7V3m8 4V3M4 11h16M5 5h14a1 1 0 0 1 1 1v14H4V6a1 1 0 0 1 1-1Z"
              />
            </svg>
          </div>

          <!-- Category -->
          <p
            class="mt-6 font-display text-xs font-bold uppercase tracking-[0.14em] text-yen-red"
          >
            {{ opportunity.category }}
          </p>

          <!-- Title -->
          <h3
            class="mt-3 font-display text-xl font-bold leading-snug text-black"
          >
            {{ opportunity.title }}
          </h3>

          <!-- Organization -->
          <p
            class="mt-2 font-display text-xs font-semibold text-gray-500"
          >
            {{ opportunity.organization }}
          </p>

          <!-- Description -->
          <p
            class="mt-5 flex-1 font-body text-sm leading-7 text-gray-600"
          >
            {{ opportunity.description }}
          </p>

          <!-- Metadata -->
          <div
            class="mt-6 space-y-3 border-t border-gray-100 pt-5"
          >
            <div
              class="flex items-center gap-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 shrink-0 text-yen-red"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 21s7-5.333 7-12a7 7 0 1 0-14 0c0 6.667 7 12 7 12Zm0-9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                />
              </svg>

              <span
                class="font-display text-xs font-medium text-gray-600"
              >
                {{ opportunity.location }}
              </span>
            </div>

            <div
              class="flex items-center gap-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 shrink-0 text-yen-red"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 2m6-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>

              <span
                class="font-display text-xs font-medium text-gray-600"
              >
                {{ opportunity.deadline }}
              </span>
            </div>
          </div>

          <!-- Button -->
          <button
            type="button"
            class="mt-6 flex w-full items-center justify-between rounded-xl bg-black px-5 py-3.5 font-display text-sm font-bold text-white transition duration-300 group-hover:bg-yen-red"
          >
            View Opportunity

            <span
              class="flex h-7 w-7 items-center justify-center rounded-full bg-yen-gold text-black"
            >
              →
            </span>
          </button>
        </article>
      </div>

      <!-- No results -->
      <div
        v-else
        class="mt-8 rounded-[1.7rem] border border-dashed border-gray-300 bg-white px-6 py-16 text-center"
      >
        <div
          class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-gray-500"
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
        </div>

        <h3
          class="mt-5 font-display text-xl font-bold text-black"
        >
          No opportunities found
        </h3>

        <p
          class="mx-auto mt-2 max-w-md font-body text-sm leading-7 text-gray-600"
        >
          Try another search term or select a different
          opportunity category.
        </p>
      </div>

      <!-- =========================================
           BOTTOM CTA
      ========================================== -->

      <div
        class="relative mt-16 overflow-hidden rounded-[2rem] bg-yen-gold p-8 sm:p-10 lg:p-12"
      >
        <div
          class="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/30"
        ></div>

        <div
          class="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between"
        >
          <div class="max-w-2xl">
            <p
              class="font-display text-xs font-extrabold uppercase tracking-[0.18em] text-yen-red"
            >
              Never Miss an Opportunity
            </p>

            <h3
              class="mt-3 font-display text-3xl font-extrabold leading-tight text-black sm:text-4xl"
            >
              Get entrepreneurship opportunities delivered to you.
            </h3>

            <p
              class="mt-4 font-body text-sm leading-7 text-black/70"
            >
              Join the YEN-Liberia network and stay informed about
              funding, training, events, competitions and programs.
            </p>
          </div>

          <a
            href="#join"
            class="inline-flex shrink-0 items-center justify-center rounded-full bg-black px-7 py-4 font-display text-sm font-bold text-white transition duration-300 hover:-translate-y-1 hover:bg-yen-red"
          >
            Join YEN-Liberia

            <span class="ml-3 text-yen-gold">
              →
            </span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>