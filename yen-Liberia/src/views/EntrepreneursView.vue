<script setup>
import { computed, ref } from "vue"

import {
  entrepreneurs,
  entrepreneurIndustries,
  entrepreneurCounties,
} from "@/data/entrepreneurs"

const searchQuery = ref("")
const selectedIndustry = ref("All")
const selectedCounty = ref("All")
const verifiedOnly = ref(false)

const filteredEntrepreneurs = computed(() => {
  const query = searchQuery.value
    .toLowerCase()
    .trim()

  return entrepreneurs.filter((entrepreneur) => {
    const matchesIndustry =
      selectedIndustry.value === "All" ||
      entrepreneur.industry ===
        selectedIndustry.value

    const matchesCounty =
      selectedCounty.value === "All" ||
      entrepreneur.county === selectedCounty.value

    const matchesVerified =
      !verifiedOnly.value ||
      entrepreneur.verified

    const matchesSearch =
      !query ||
      entrepreneur.name
        .toLowerCase()
        .includes(query) ||
      entrepreneur.business
        .toLowerCase()
        .includes(query) ||
      entrepreneur.industry
        .toLowerCase()
        .includes(query) ||
      entrepreneur.county
        .toLowerCase()
        .includes(query) ||
      entrepreneur.shortDescription
        .toLowerCase()
        .includes(query)

    return (
      matchesIndustry &&
      matchesCounty &&
      matchesVerified &&
      matchesSearch
    )
  })
})

const clearFilters = () => {
  searchQuery.value = ""
  selectedIndustry.value = "All"
  selectedCounty.value = "All"
  verifiedOnly.value = false
}
</script>

<template>
  <main class="w-full">

    <!-- ====================================
         HERO
    ===================================== -->

    <section
      class="relative isolate min-h-[560px] overflow-hidden"
    >
      <img
        src="/images/hero/hero-2.jpg"
        alt="Entrepreneurs in Liberia"
        class="absolute inset-0 h-full w-full object-cover"
      />

      <div
        class="absolute inset-0 bg-linear-to-r from-black/85 via-black/55 to-black/10"
      ></div>

      <div
        class="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-black/20"
      ></div>

      <div
        class="relative z-10 mx-auto flex min-h-[560px] max-w-7xl items-center px-5 py-20 lg:px-8"
      >
        <div class="max-w-4xl">

          <!-- Breadcrumb -->

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
              Entrepreneurs
            </span>
          </div>

          <p
            class="font-display text-xs font-extrabold uppercase tracking-[0.2em] text-yen-gold"
          >
            YEN Entrepreneur Network
          </p>

          <h1
            class="mt-5 max-w-4xl font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            Discover the people

            <span class="text-yen-gold">
              building Liberia.
            </span>
          </h1>

          <p
            class="mt-7 max-w-2xl font-body text-base leading-8 text-white/75 sm:text-lg"
          >
            Explore entrepreneurs, founders and youth-led
            businesses creating products, services, jobs and
            new possibilities across Liberia.
          </p>
        </div>
      </div>

      <div
        class="absolute bottom-0 left-0 h-1 w-full bg-linear-to-r from-yen-red via-yen-gold to-yen-red"
      ></div>
    </section>


    <!-- ====================================
         DIRECTORY INTRO
    ===================================== -->

    <section class="bg-white">
      <div
        class="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[0.85fr_1.15fr] lg:px-8 lg:py-24"
      >
        <div>
          <p
            class="font-display text-xs font-extrabold uppercase tracking-[0.18em] text-yen-red"
          >
            Business Directory
          </p>

          <h2
            class="mt-4 font-display text-4xl font-extrabold leading-tight text-black sm:text-5xl"
          >
            More than a network.

            <span class="text-yen-red">
              A marketplace of ideas.
            </span>
          </h2>
        </div>

        <div>
          <p
            class="font-body text-base leading-8 text-gray-600"
          >
            The YEN-Liberia Entrepreneur Directory is designed
            to increase visibility for youth-led businesses and
            make it easier for customers, partners, investors,
            institutions and fellow entrepreneurs to discover
            them.
          </p>

          <p
            class="mt-5 font-body text-base leading-8 text-gray-600"
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
        class="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28"
      >

        <!-- Heading -->

        <div>
          <p
            class="font-display text-xs font-extrabold uppercase tracking-[0.18em] text-yen-red"
          >
            Explore the Network
          </p>

          <h2
            class="mt-3 font-display text-3xl font-extrabold text-black sm:text-4xl"
          >
            Find an entrepreneur
          </h2>
        </div>


        <!-- ==================================
             FILTER PANEL
        =================================== -->

        <div
          class="mt-10 rounded-[1.8rem] bg-black p-5 sm:p-7"
        >
          <div
            class="grid gap-4 lg:grid-cols-[1.4fr_0.75fr_0.75fr]"
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
                placeholder="Search entrepreneur, business or industry..."
                class="w-full rounded-xl border border-white/15 bg-white/10 py-4 pl-14 pr-5 font-display text-sm text-white outline-none placeholder:text-white/35 focus:border-yen-gold"
              />
            </div>


            <!-- Industry -->

            <select
              v-model="selectedIndustry"
              class="rounded-xl border border-white/15 bg-white/10 px-5 py-4 font-display text-sm font-semibold text-white outline-none focus:border-yen-gold"
            >
              <option
                v-for="industry in entrepreneurIndustries"
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


            <!-- County -->

            <select
              v-model="selectedCounty"
              class="rounded-xl border border-white/15 bg-white/10 px-5 py-4 font-display text-sm font-semibold text-white outline-none focus:border-yen-gold"
            >
              <option
                v-for="county in entrepreneurCounties"
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


          <!-- Verified toggle -->

          <label
            class="mt-5 inline-flex cursor-pointer items-center gap-3"
          >
            <input
              v-model="verifiedOnly"
              type="checkbox"
              class="h-4 w-4 accent-[#fdd131]"
            />

            <span
              class="font-display text-xs font-semibold text-white/65"
            >
              Show verified YEN profiles only
            </span>
          </label>
        </div>


        <!-- ==================================
             RESULTS BAR
        =================================== -->

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

            entrepreneurs
          </p>

          <button
            v-if="
              searchQuery ||
              selectedIndustry !== 'All' ||
              selectedCounty !== 'All' ||
              verifiedOnly
            "
            type="button"
            class="font-display text-sm font-bold text-yen-red transition hover:text-black"
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
          class="mt-7 grid gap-7 sm:grid-cols-2 lg:grid-cols-3"
        >
          <article
            v-for="entrepreneur in filteredEntrepreneurs"
            :key="entrepreneur.id"
            class="group overflow-hidden rounded-[1.8rem] bg-white transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >

            <!-- Image -->

            <div
              class="relative h-[360px] overflow-hidden bg-gray-100"
            >
              <img
                :src="entrepreneur.image"
                :alt="entrepreneur.name"
                class="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />

              <div
                class="absolute inset-0 bg-linear-to-t from-black/85 via-black/10 to-transparent"
              ></div>


              <!-- Featured -->

              <span
                v-if="entrepreneur.featured"
                class="absolute left-5 top-5 rounded-full bg-yen-gold px-4 py-2 font-display text-[9px] font-extrabold uppercase tracking-wider text-black"
              >
                Featured
              </span>


              <!-- Verified -->

              <div
                v-if="entrepreneur.verified"
                class="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-xl"
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


              <!-- Name -->

              <div
                class="absolute bottom-0 left-0 right-0 p-6"
              >
                <p
                  class="font-display text-xs font-bold text-yen-gold"
                >
                  {{ entrepreneur.role }}
                </p>

                <h3
                  class="mt-1 font-display text-2xl font-extrabold text-white"
                >
                  {{ entrepreneur.name }}
                </h3>

                <p
                  class="mt-1 font-display text-sm font-semibold text-white/70"
                >
                  {{ entrepreneur.business }}
                </p>
              </div>
            </div>


            <!-- Body -->

            <div class="p-7">

              <!-- Meta -->

              <div class="flex flex-wrap gap-2">
                <span
                  class="rounded-full bg-black px-3 py-2 font-display text-[9px] font-bold uppercase tracking-wider text-white"
                >
                  {{ entrepreneur.industry }}
                </span>

                <span
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
                class="mt-7 flex items-center justify-between border-t border-gray-100 pt-6"
              >
                <span
                  class="font-display text-[10px] font-bold uppercase tracking-wider text-gray-400"
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
                  :aria-label="`View ${entrepreneur.name}`"
                >
                  →
                </RouterLink>
              </div>
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
            No entrepreneurs found
          </h3>

          <p
            class="mt-3 font-body text-sm text-gray-500"
          >
            Try another business name, industry or county.
          </p>

          <button
            type="button"
            class="mt-5 font-display text-sm font-bold text-yen-red"
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
        class="mx-auto grid max-w-7xl gap-7 px-5 py-20 md:grid-cols-3 lg:px-8 lg:py-24"
      >
        <article
          class="rounded-[1.6rem] bg-[#f7f7f5] p-8"
        >
          <span
            class="font-display text-4xl font-extrabold text-yen-gold"
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

        <article
          class="rounded-[1.6rem] bg-black p-8"
        >
          <span
            class="font-display text-4xl font-extrabold text-yen-gold"
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

        <article
          class="rounded-[1.6rem] bg-yen-gold p-8"
        >
          <span
            class="font-display text-4xl font-extrabold text-yen-red"
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
        class="mx-auto max-w-7xl px-5 pb-24 lg:px-8"
      >
        <div
          class="relative overflow-hidden rounded-[2rem] bg-black p-8 sm:p-10 lg:p-14"
        >
          <div
            class="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-yen-gold/10"
          ></div>

          <div
            class="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center"
          >
            <div class="max-w-3xl">
              <p
                class="font-display text-xs font-extrabold uppercase tracking-[0.18em] text-yen-gold"
              >
                Join the Network
              </p>

              <h2
                class="mt-4 font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl"
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

            <RouterLink
              :to="{
                name: 'home',
                hash: '#join',
              }"
              class="inline-flex items-center justify-center rounded-full bg-yen-gold px-7 py-4 font-display text-sm font-bold text-black transition hover:-translate-y-1 hover:bg-white"
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