<script setup>
import {
  computed,
  ref,
} from "vue"

import {
  entrepreneurs,
  entrepreneurIndustries,
  entrepreneurCounties,
} from "@/data/entrepreneurs"


/*
|--------------------------------------------------------------------------
| FILTER STATE
|--------------------------------------------------------------------------
*/

const searchQuery = ref("")
const selectedIndustry = ref("All")
const selectedCounty = ref("All")
const verifiedOnly = ref(false)


/*
|--------------------------------------------------------------------------
| SAFE HELPERS
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
| Combine the configured values with whatever actually exists
| in the entrepreneur data.
|
| This keeps the directory filters synchronized when new
| industries or counties are added later.
|
*/

const industries = computed(() => {
  const configured =
    Array.isArray(entrepreneurIndustries)
      ? entrepreneurIndustries.filter(
          (industry) =>
            industry &&
            industry !== "All",
        )
      : []

  const fromProfiles = entrepreneurs
    .map(
      (entrepreneur) =>
        entrepreneur.industry,
    )
    .filter(Boolean)

  return [
    "All",
    ...new Set([
      ...configured,
      ...fromProfiles,
    ]),
  ]
})


const counties = computed(() => {
  const configured =
    Array.isArray(entrepreneurCounties)
      ? entrepreneurCounties.filter(
          (county) =>
            county &&
            county !== "All",
        )
      : []

  const fromProfiles = entrepreneurs
    .map(
      (entrepreneur) =>
        entrepreneur.county,
    )
    .filter(Boolean)

  return [
    "All",
    ...new Set([
      ...configured,
      ...fromProfiles,
    ]),
  ]
})


/*
|--------------------------------------------------------------------------
| FILTERED ENTREPRENEURS
|--------------------------------------------------------------------------
*/

const filteredEntrepreneurs = computed(() => {
  const query = normalizeText(
    searchQuery.value,
  )

  return entrepreneurs.filter(
    (entrepreneur) => {
      const matchesIndustry =
        selectedIndustry.value === "All" ||
        entrepreneur.industry ===
          selectedIndustry.value

      const matchesCounty =
        selectedCounty.value === "All" ||
        entrepreneur.county ===
          selectedCounty.value

      const matchesVerified =
        !verifiedOnly.value ||
        Boolean(entrepreneur.verified)

      const searchableContent = [
        entrepreneur.name,
        entrepreneur.business,
        entrepreneur.industry,
        entrepreneur.county,
        entrepreneur.role,
        entrepreneur.shortDescription,
      ]
        .map(normalizeText)
        .join(" ")

      const matchesSearch =
        !query ||
        searchableContent.includes(query)

      return (
        matchesIndustry &&
        matchesCounty &&
        matchesVerified &&
        matchesSearch
      )
    },
  )
})


const clearFilters = () => {
  searchQuery.value = ""
  selectedIndustry.value = "All"
  selectedCounty.value = "All"
  verifiedOnly.value = false
}
</script>


<template>
  <main class="w-full overflow-hidden">

    <!-- ====================================
         HERO
    ===================================== -->

    <section
      class="relative isolate min-h-[540px] overflow-hidden sm:min-h-[560px] lg:min-h-[580px]"
    >
      <!-- Background -->

      <img
        src="/images/hero/hero-2.jpg"
        alt="Entrepreneurs in Liberia"
        class="absolute inset-0 h-full w-full object-cover object-center"
      />


      <!-- Contrast -->

      <div
        class="absolute inset-0 bg-linear-to-r from-black/90 via-black/65 to-black/25 sm:from-black/85 sm:via-black/55 sm:to-black/10"
      ></div>

      <div
        class="absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-black/20"
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
              Entrepreneurs
            </span>
          </div>


          <!-- Label -->

          <p
            class="font-display text-[10px] font-extrabold uppercase tracking-[0.2em] text-yen-gold sm:text-xs"
          >
            YEN Entrepreneur Network
          </p>


          <!-- Heading -->

          <h1
            class="mt-5 max-w-4xl font-display text-[40px] font-extrabold leading-[1.05] tracking-tight text-white min-[390px]:text-[44px] sm:text-6xl lg:text-7xl"
          >
            Discover the people

            <span class="text-yen-gold">
              building Liberia.
            </span>
          </h1>


          <!-- Description -->

          <p
            class="mt-6 max-w-2xl font-body text-sm leading-7 text-white/80 sm:mt-7 sm:text-lg sm:leading-8"
          >
            Explore entrepreneurs, founders and youth-led
            businesses creating products, services, jobs and
            new possibilities across Liberia.
          </p>
        </div>
      </div>


      <!-- Brand accent -->

      <div
        class="absolute bottom-0 left-0 z-20 h-1 w-full bg-linear-to-r from-yen-red via-yen-gold to-yen-red"
      ></div>
    </section>


    <!-- ====================================
         DIRECTORY INTRO
    ===================================== -->

    <section class="bg-white">
      <div
        class="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14 lg:px-8 lg:py-24"
      >
        <!-- Heading -->

        <div>
          <p
            class="font-display text-[10px] font-extrabold uppercase tracking-[0.18em] text-yen-red sm:text-xs"
          >
            Business Directory
          </p>

          <h2
            class="mt-4 font-display text-3xl font-extrabold leading-tight text-black min-[390px]:text-4xl sm:text-5xl"
          >
            More than a network.

            <span class="text-yen-red">
              A marketplace of ideas.
            </span>
          </h2>
        </div>


        <!-- Description -->

        <div>
          <p
            class="font-body text-sm leading-8 text-gray-600 sm:text-base"
          >
            The YEN-Liberia Entrepreneur Directory is designed
            to increase visibility for youth-led businesses and
            make it easier for customers, partners, investors,
            institutions and fellow entrepreneurs to discover
            them.
          </p>

          <p
            class="mt-5 font-body text-sm leading-8 text-gray-600 sm:text-base"
          >
            As the platform develops, approved YEN members will
            be able to maintain business profiles while YEN
            administrators verify information before it becomes
            publicly visible.
          </p>
        </div>
      </div>
    </section>


    <!-- ====================================
         DIRECTORY
    ===================================== -->

    <section class="bg-[#f7f7f5]">
      <div
        class="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28"
      >
        <!-- Heading -->

        <div>
          <p
            class="font-display text-[10px] font-extrabold uppercase tracking-[0.18em] text-yen-red sm:text-xs"
          >
            Explore the Network
          </p>

          <h2
            class="mt-3 font-display text-3xl font-extrabold leading-tight text-black sm:text-4xl"
          >
            Find an entrepreneur
          </h2>
        </div>


        <!-- ==================================
             FILTER PANEL
        =================================== -->

        <div
          class="mt-9 rounded-[1.5rem] bg-black p-4 sm:mt-10 sm:rounded-[1.8rem] sm:p-7"
        >
          <div
            class="grid gap-4 lg:grid-cols-[1.4fr_0.75fr_0.75fr]"
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
                for="entrepreneur-search"
                class="sr-only"
              >
                Search entrepreneur directory
              </label>


              <input
                id="entrepreneur-search"
                v-model="searchQuery"
                type="search"
                autocomplete="off"
                placeholder="Search entrepreneur, business or industry..."
                class="w-full rounded-xl border border-white/15 bg-white/10 py-4 pl-12 pr-4 font-display text-sm text-white outline-none transition placeholder:text-white/35 focus:border-yen-gold focus:bg-white/15 sm:pl-14 sm:pr-5"
              />
            </div>


            <!-- Industry -->

            <div>
              <label
                for="entrepreneur-industry"
                class="sr-only"
              >
                Filter entrepreneurs by industry
              </label>

              <select
                id="entrepreneur-industry"
                v-model="selectedIndustry"
                class="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-4 font-display text-sm font-semibold text-white outline-none transition focus:border-yen-gold focus:bg-white/15 sm:px-5"
              >
                <option
                  v-for="industry in industries"
                  :key="industry"
                  :value="industry"
                  class="text-black"
                >
                  {{
                    industry === "All"
                      ? "All Industries"
                      : industry
                  }}
                </option>
              </select>
            </div>


            <!-- County -->

            <div>
              <label
                for="entrepreneur-county"
                class="sr-only"
              >
                Filter entrepreneurs by county
              </label>

              <select
                id="entrepreneur-county"
                v-model="selectedCounty"
                class="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-4 font-display text-sm font-semibold text-white outline-none transition focus:border-yen-gold focus:bg-white/15 sm:px-5"
              >
                <option
                  v-for="county in counties"
                  :key="county"
                  :value="county"
                  class="text-black"
                >
                  {{
                    county === "All"
                      ? "All Counties"
                      : county
                  }}
                </option>
              </select>
            </div>
          </div>


          <!-- Verified toggle -->

          <label
            class="mt-5 inline-flex max-w-full cursor-pointer items-start gap-3"
          >
            <input
              v-model="verifiedOnly"
              type="checkbox"
              class="mt-0.5 h-4 w-4 shrink-0 accent-[#fdd131]"
            />

            <span
              class="font-display text-[11px] font-semibold leading-5 text-white/65 sm:text-xs"
            >
              Show verified YEN profiles only
            </span>
          </label>
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
              {{ filteredEntrepreneurs.length }}
            </span>

            {{
              filteredEntrepreneurs.length === 1
                ? "entrepreneur"
                : "entrepreneurs"
            }}
          </p>


          <button
            v-if="
              searchQuery ||
              selectedIndustry !== 'All' ||
              selectedCounty !== 'All' ||
              verifiedOnly
            "
            type="button"
            class="font-display text-xs font-bold text-yen-red transition hover:text-black sm:text-sm"
            @click="clearFilters"
          >
            Clear filters
          </button>
        </div>


        <!-- ==================================
             PROFILE CARDS
        =================================== -->

        <div
          v-if="filteredEntrepreneurs.length"
          class="mt-7 grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
        >
          <article
            v-for="entrepreneur in filteredEntrepreneurs"
            :key="entrepreneur.id"
            class="group flex h-full flex-col overflow-hidden rounded-[1.6rem] bg-white transition duration-300 hover:-translate-y-2 hover:shadow-2xl sm:rounded-[1.8rem]"
          >
            <!-- =================================
                 IMAGE
            ================================== -->

            <div
              class="relative h-[320px] overflow-hidden bg-gray-100 sm:h-[350px] xl:h-[360px]"
            >
              <img
                :src="entrepreneur.image"
                :alt="entrepreneur.name"
                loading="lazy"
                class="h-full w-full object-cover object-center transition duration-700 group-hover:scale-105"
              />

              <div
                class="absolute inset-0 bg-linear-to-t from-black/90 via-black/15 to-transparent"
              ></div>


              <!-- Featured -->

              <span
                v-if="entrepreneur.featured"
                class="absolute left-4 top-4 rounded-full bg-yen-gold px-3 py-2 font-display text-[9px] font-extrabold uppercase tracking-wider text-black sm:left-5 sm:top-5 sm:px-4"
              >
                Featured
              </span>


              <!-- Verified -->

              <div
                v-if="entrepreneur.verified"
                class="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-xl sm:right-5 sm:top-5"
                title="Verified YEN profile"
                aria-label="Verified YEN profile"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-yen-red"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.707 7.293a1 1 0 0 1 0 1.414l-5 5a1 1 0 0 1-1.414 0l-3-3a1 1 0 1 1 1.414-1.414L11 13.586l4.293-4.293a1 1 0 0 1 1.414 0Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>


              <!-- Name overlay -->

              <div
                class="absolute bottom-0 left-0 right-0 p-5 sm:p-6"
              >
                <p
                  class="font-display text-[11px] font-bold leading-5 text-yen-gold sm:text-xs"
                >
                  {{ entrepreneur.role }}
                </p>

                <h3
                  class="mt-1 font-display text-2xl font-extrabold leading-tight text-white"
                >
                  {{ entrepreneur.name }}
                </h3>

                <p
                  class="mt-1 font-display text-xs font-semibold leading-5 text-white/70 sm:text-sm"
                >
                  {{ entrepreneur.business }}
                </p>
              </div>
            </div>


            <!-- =================================
                 BODY
            ================================== -->

            <div
              class="flex flex-1 flex-col p-6 sm:p-7"
            >
              <!-- Meta -->

              <div
                class="flex flex-wrap gap-2"
              >
                <span
                  v-if="entrepreneur.industry"
                  class="rounded-full bg-black px-3 py-2 font-display text-[9px] font-bold uppercase tracking-wider text-white"
                >
                  {{ entrepreneur.industry }}
                </span>

                <span
                  v-if="entrepreneur.county"
                  class="rounded-full bg-yen-gold/30 px-3 py-2 font-display text-[9px] font-bold uppercase tracking-wider text-black"
                >
                  {{ entrepreneur.county }}
                </span>
              </div>


              <!-- Description -->

              <p
                class="mt-5 font-body text-sm leading-7 text-gray-600"
              >
                {{ entrepreneur.shortDescription }}
              </p>


              <!-- Footer -->

              <div
                class="mt-auto pt-7"
              >
                <div
                  class="flex items-center justify-between gap-4 border-t border-gray-100 pt-6"
                >
                  <span
                    class="min-w-0 font-display text-[9px] font-bold uppercase leading-5 tracking-wider text-gray-400 sm:text-[10px]"
                  >
                    {{ entrepreneur.memberStatus }}
                  </span>


                  <RouterLink
                    :to="{
                      name: 'entrepreneur-detail',
                      params: {
                        slug: entrepreneur.slug,
                      },
                    }"
                    class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black text-yen-gold transition duration-300 group-hover:bg-yen-red group-hover:text-white"
                    :aria-label="
                      `View ${entrepreneur.name}`
                    "
                  >
                    →
                  </RouterLink>
                </div>
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
            No entrepreneurs found
          </h3>

          <p
            class="mx-auto mt-3 max-w-md font-body text-sm leading-7 text-gray-500"
          >
            Try another business name, industry or county.
          </p>

          <button
            type="button"
            class="mt-5 font-display text-sm font-bold text-yen-red transition hover:text-black"
            @click="clearFilters"
          >
            View all entrepreneurs
          </button>
        </div>
      </div>
    </section>


    <!-- ====================================
         DIRECTORY PURPOSE
    ===================================== -->

    <section class="bg-white">
      <div
        class="mx-auto grid max-w-7xl gap-5 px-5 py-20 sm:px-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7 lg:px-8 lg:py-24"
      >
        <!-- Card 1 -->

        <article
          class="rounded-[1.5rem] bg-[#f7f7f5] p-7 sm:rounded-[1.6rem] sm:p-8"
        >
          <span
            class="font-display text-3xl font-extrabold text-yen-gold sm:text-4xl"
          >
            01
          </span>

          <h3
            class="mt-5 font-display text-xl font-bold text-black"
          >
            Get Discovered
          </h3>

          <p
            class="mt-3 font-body text-sm leading-7 text-gray-600"
          >
            Showcase your business to customers, partners,
            investors and institutions.
          </p>
        </article>


        <!-- Card 2 -->

        <article
          class="rounded-[1.5rem] bg-black p-7 sm:rounded-[1.6rem] sm:p-8"
        >
          <span
            class="font-display text-3xl font-extrabold text-yen-gold sm:text-4xl"
          >
            02
          </span>

          <h3
            class="mt-5 font-display text-xl font-bold text-white"
          >
            Build Connections
          </h3>

          <p
            class="mt-3 font-body text-sm leading-7 text-white/60"
          >
            Discover other entrepreneurs and strengthen
            connections across Liberia's business ecosystem.
          </p>
        </article>


        <!-- Card 3 -->

        <article
          class="rounded-[1.5rem] bg-yen-gold p-7 sm:col-span-2 sm:rounded-[1.6rem] sm:p-8 lg:col-span-1"
        >
          <span
            class="font-display text-3xl font-extrabold text-yen-red sm:text-4xl"
          >
            03
          </span>

          <h3
            class="mt-5 font-display text-xl font-bold text-black"
          >
            Unlock Opportunities
          </h3>

          <p
            class="mt-3 font-body text-sm leading-7 text-black/65"
          >
            Connect your business profile to programs,
            opportunities and future YEN services.
          </p>
        </article>
      </div>
    </section>


    <!-- ====================================
         JOIN CTA
    ===================================== -->

    <section class="bg-white">
      <div
        class="mx-auto max-w-7xl px-5 pb-20 sm:px-6 sm:pb-24 lg:px-8"
      >
        <div
          class="relative overflow-hidden rounded-[1.7rem] bg-black p-7 sm:rounded-[2rem] sm:p-10 lg:p-14"
        >
          <!-- Decoration -->

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
                Join the Network
              </p>

              <h2
                class="mt-4 font-display text-2xl font-extrabold leading-tight text-white sm:text-4xl"
              >
                Want your business represented in the

                <span class="text-yen-gold">
                  YEN directory?
                </span>
              </h2>

              <p
                class="mt-4 max-w-2xl font-body text-sm leading-7 text-white/60 sm:text-base"
              >
                Join YEN-Liberia and build a professional
                entrepreneur profile that can connect your
                business with customers, partners and
                opportunities.
              </p>
            </div>


            <!-- CTA -->

            <RouterLink
              :to="{ name: 'join' }"
              class="inline-flex w-full items-center justify-center rounded-full bg-yen-gold px-7 py-4 font-display text-sm font-bold text-black transition duration-300 hover:-translate-y-1 hover:bg-white sm:w-auto sm:min-w-[220px]"
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
  </main>
</template>