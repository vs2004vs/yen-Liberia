<script setup>
import { computed, ref } from "vue"

const searchQuery = ref("")
const selectedIndustry = ref("All")
const selectedCounty = ref("All")

const industries = [
  "All",
  "Agriculture",
  "Technology",
  "Fashion",
  "Food & Beverage",
  "Creative",
  "Professional Services",
]

const counties = [
  "All",
  "Montserrado",
  "Margibi",
  "Bong",
  "Nimba",
  "Grand Bassa",
]

/*
  SAMPLE FRONTEND DATA ONLY.

  These are not being presented as actual YEN members.
  Later this data will come from the YEN member database.
*/
const entrepreneurs = ref([
  {
    id: 1,
    name: "Sample Entrepreneur",
    business: "Green Harvest Liberia",
    industry: "Agriculture",
    county: "Montserrado",
    image: "/images/hero/hero-1.jpg",
    description:
      "Building a growing agribusiness focused on locally produced food, sustainable farming and market access.",
    featured: true,
    verified: true,
  },
  {
    id: 2,
    name: "Sample Entrepreneur",
    business: "Digital Bridge Solutions",
    industry: "Technology",
    county: "Montserrado",
    image: "/images/hero/hero-2.jpg",
    description:
      "Using digital tools and technology services to help small businesses improve productivity and reach customers.",
    featured: false,
    verified: true,
  },
  {
    id: 3,
    name: "Sample Entrepreneur",
    business: "Made in Liberia Fashion",
    industry: "Fashion",
    county: "Margibi",
    image: "/images/hero/hero-3.jpg",
    description:
      "Creating locally inspired fashion products while supporting youth skills development and local production.",
    featured: false,
    verified: false,
  },
  {
    id: 4,
    name: "Sample Entrepreneur",
    business: "Fresh Taste Foods",
    industry: "Food & Beverage",
    county: "Bong",
    image: "/images/hero/hero-4.jpg",
    description:
      "Developing locally processed food products designed for Liberia's growing consumer market.",
    featured: false,
    verified: true,
  },
  {
    id: 5,
    name: "Sample Entrepreneur",
    business: "Creative Liberia Studio",
    industry: "Creative",
    county: "Nimba",
    image: "/images/hero/hero-1.jpg",
    description:
      "Providing branding, design and creative services to entrepreneurs, institutions and emerging businesses.",
    featured: false,
    verified: false,
  },
  {
    id: 6,
    name: "Sample Entrepreneur",
    business: "Enterprise Growth Partners",
    industry: "Professional Services",
    county: "Grand Bassa",
    image: "/images/hero/hero-2.jpg",
    description:
      "Supporting small businesses with administrative, consulting and business-development services.",
    featured: false,
    verified: true,
  },
])

const filteredEntrepreneurs = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()

  return entrepreneurs.value.filter((entrepreneur) => {
    const matchesIndustry =
      selectedIndustry.value === "All" ||
      entrepreneur.industry === selectedIndustry.value

    const matchesCounty =
      selectedCounty.value === "All" ||
      entrepreneur.county === selectedCounty.value

    const matchesSearch =
      !query ||
      entrepreneur.name.toLowerCase().includes(query) ||
      entrepreneur.business.toLowerCase().includes(query) ||
      entrepreneur.industry.toLowerCase().includes(query) ||
      entrepreneur.county.toLowerCase().includes(query)

    return matchesIndustry && matchesCounty && matchesSearch
  })
})

const clearFilters = () => {
  searchQuery.value = ""
  selectedIndustry.value = "All"
  selectedCounty.value = "All"
}
</script>

<template>
  <section
    id="entrepreneurs"
    class="overflow-hidden bg-white"
  >
    <div
      class="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28"
    >
      <!-- HEADER -->

      <div
        class="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end"
      >
        <div>
          <div class="mb-5 flex items-center gap-3">
            <span
              class="h-[3px] w-10 bg-yen-red"
            ></span>

            <span
              class="font-display text-sm font-bold uppercase tracking-[0.18em] text-yen-red"
            >
              Our Entrepreneur Network
            </span>
          </div>

          <h2
            class="font-display max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-black sm:text-5xl"
          >
            Meet the people building

            <span class="text-yen-red">
              Liberia's future.
            </span>
          </h2>
        </div>

        <p
          class="max-w-xl font-body text-base leading-8 text-gray-600 lg:ml-auto"
        >
          Discover entrepreneurs, founders and youth-led businesses
          across Liberia and learn about the ideas, products and
          enterprises they are building.
        </p>
      </div>

      <!-- DIRECTORY TOOLBAR -->

      <div
        class="mt-12 rounded-[1.7rem] border border-gray-200 bg-[#f7f7f5] p-5 sm:p-7"
      >
        <div
          class="grid gap-4 lg:grid-cols-[1.5fr_0.8fr_0.8fr]"
        >
          <!-- Search -->

          <div class="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
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
              placeholder="Search entrepreneur or business..."
              class="w-full rounded-xl border border-gray-200 bg-white py-4 pl-14 pr-5 font-display text-sm text-black outline-none transition placeholder:text-gray-400 focus:border-yen-gold"
            />
          </div>

          <!-- Industry -->

          <select
            v-model="selectedIndustry"
            class="rounded-xl border border-gray-200 bg-white px-5 py-4 font-display text-sm font-semibold text-black outline-none transition focus:border-yen-gold"
          >
            <option
              v-for="industry in industries"
              :key="industry"
              :value="industry"
            >
              {{ industry === "All" ? "All Industries" : industry }}
            </option>
          </select>

          <!-- County -->

          <select
            v-model="selectedCounty"
            class="rounded-xl border border-gray-200 bg-white px-5 py-4 font-display text-sm font-semibold text-black outline-none transition focus:border-yen-gold"
          >
            <option
              v-for="county in counties"
              :key="county"
              :value="county"
            >
              {{ county === "All" ? "All Counties" : county }}
            </option>
          </select>
        </div>
      </div>

      <!-- RESULTS -->

      <div
        class="mt-8 flex items-center justify-between gap-5"
      >
        <p
          class="font-display text-sm font-semibold text-gray-500"
        >
          Showing

          <span class="font-bold text-black">
            {{ filteredEntrepreneurs.length }}
          </span>

          entrepreneur profiles
        </p>

        <button
          v-if="
            searchQuery ||
            selectedIndustry !== 'All' ||
            selectedCounty !== 'All'
          "
          type="button"
          class="font-display text-sm font-bold text-yen-red transition hover:text-black"
          @click="clearFilters"
        >
          Clear filters
        </button>
      </div>

      <!-- CARDS -->

      <div
        v-if="filteredEntrepreneurs.length"
        class="mt-7 grid gap-7 sm:grid-cols-2 lg:grid-cols-3"
      >
        <article
          v-for="entrepreneur in filteredEntrepreneurs"
          :key="entrepreneur.id"
          class="group overflow-hidden rounded-[1.7rem] border border-gray-200 bg-white transition duration-300 hover:-translate-y-2 hover:border-transparent hover:shadow-2xl"
        >
          <!-- Image -->

          <div
            class="relative h-[330px] overflow-hidden bg-gray-100"
          >
            <img
              :src="entrepreneur.image"
              :alt="entrepreneur.business"
              class="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />

            <div
              class="absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-transparent"
            ></div>

            <!-- Featured -->

            <span
              v-if="entrepreneur.featured"
              class="absolute left-5 top-5 rounded-full bg-yen-gold px-4 py-2 font-display text-[10px] font-extrabold uppercase tracking-wider text-black"
            >
              Featured Entrepreneur
            </span>

            <!-- Verified -->

            <div
              v-if="entrepreneur.verified"
              class="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-lg"
              title="Verified YEN profile"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-yen-red"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.707 7.293a1 1 0 0 1 0 1.414l-5 5a1 1 0 0 1-1.414 0l-3-3a1 1 0 1 1 1.414-1.414L11 13.586l4.293-4.293a1 1 0 0 1 1.414 0Z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>

            <!-- Name and business -->

            <div
              class="absolute bottom-0 left-0 right-0 p-6"
            >
              <p
                class="font-display text-sm font-semibold text-yen-gold"
              >
                {{ entrepreneur.name }}
              </p>

              <h3
                class="mt-1 font-display text-2xl font-bold text-white"
              >
                {{ entrepreneur.business }}
              </h3>
            </div>
          </div>

          <!-- Body -->

          <div class="p-6 sm:p-7">
            <!-- Meta -->

            <div
              class="flex flex-wrap gap-2"
            >
              <span
                class="rounded-full bg-black px-3 py-1.5 font-display text-[10px] font-bold uppercase tracking-wider text-white"
              >
                {{ entrepreneur.industry }}
              </span>

              <span
                class="rounded-full bg-yen-gold/30 px-3 py-1.5 font-display text-[10px] font-bold uppercase tracking-wider text-black"
              >
                {{ entrepreneur.county }}
              </span>
            </div>

            <p
              class="mt-5 font-body text-sm leading-7 text-gray-600"
            >
              {{ entrepreneur.description }}
            </p>

            <!-- Footer -->

            <div
              class="mt-6 flex items-center justify-between border-t border-gray-100 pt-5"
            >
              <button
                type="button"
                class="font-display text-sm font-bold text-black transition group-hover:text-yen-red"
              >
                View Profile
              </button>

              <span
                class="flex h-9 w-9 items-center justify-center rounded-full bg-black text-yen-gold transition duration-300 group-hover:bg-yen-red group-hover:text-white"
              >
                →
              </span>
            </div>
          </div>
        </article>
      </div>

      <!-- NO RESULTS -->

      <div
        v-else
        class="mt-8 rounded-[1.7rem] border border-dashed border-gray-300 bg-[#f7f7f5] px-6 py-16 text-center"
      >
        <div
          class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-gray-400"
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
        </div>

        <h3
          class="mt-5 font-display text-xl font-bold text-black"
        >
          No entrepreneurs found
        </h3>

        <p
          class="mx-auto mt-2 max-w-md font-body text-sm leading-7 text-gray-600"
        >
          Try a different business name, industry or county.
        </p>

        <button
          type="button"
          class="mt-5 font-display text-sm font-bold text-yen-red"
          @click="clearFilters"
        >
          View all entrepreneurs
        </button>
      </div>

      <!-- JOIN NETWORK CTA -->

      <div
        id="join"
        class="relative mt-16 overflow-hidden rounded-[2rem] bg-black px-7 py-10 sm:px-10 lg:px-14 lg:py-14"
      >
        <!-- Decorative YEN shapes -->

        <div
          class="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-yen-gold/15"
        ></div>

        <div
          class="absolute -bottom-24 left-1/3 h-60 w-60 rounded-full bg-yen-red/15 blur-2xl"
        ></div>

        <div
          class="relative grid gap-9 lg:grid-cols-[1fr_auto] lg:items-center"
        >
          <div class="max-w-3xl">
            <p
              class="font-display text-xs font-bold uppercase tracking-[0.18em] text-yen-gold"
            >
              Become Part of the Network
            </p>

            <h3
              class="mt-4 font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl"
            >
              Are you building a business in Liberia?
            </h3>

            <p
              class="mt-4 max-w-2xl font-body text-sm leading-7 text-white/65 sm:text-base"
            >
              Join YEN-Liberia, connect with other entrepreneurs,
              discover opportunities and showcase your business to
              Liberia's growing entrepreneurship ecosystem.
            </p>
          </div>

          <div
            class="flex flex-col gap-3 sm:flex-row lg:flex-col"
          >
            <a
              href="#"
              class="inline-flex items-center justify-center rounded-full bg-yen-gold px-7 py-4 font-display text-sm font-bold text-black transition duration-300 hover:-translate-y-1 hover:bg-white"
            >
              Join YEN-Liberia

              <span class="ml-3">
                →
              </span>
            </a>

            <a
              href="#"
              class="inline-flex items-center justify-center rounded-full border border-white/25 px-7 py-4 font-display text-sm font-bold text-white transition hover:border-yen-gold hover:text-yen-gold"
            >
              View Directory
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>