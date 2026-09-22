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
      entrepreneur.county ===
        selectedCounty.value

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
        .includes(query)

    return (
      matchesIndustry &&
      matchesCounty &&
      matchesSearch
    )
  })
})

const homepageEntrepreneurs = computed(() =>
  filteredEntrepreneurs.value.slice(0, 6),
)

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
              Entrepreneur Network
            </span>
          </div>

          <h2
            class="max-w-3xl font-display text-4xl font-extrabold leading-tight tracking-tight text-black sm:text-5xl"
          >
            Discover the entrepreneurs

            <span class="text-yen-red">
              building Liberia.
            </span>
          </h2>
        </div>

        <p
          class="max-w-xl font-body text-base leading-8 text-gray-600 lg:ml-auto"
        >
          Meet founders and youth-led businesses creating
          products, services, jobs and new opportunities across
          Liberia.
        </p>
      </div>


      <!-- =====================================
           FILTER BAR
      ====================================== -->

      <div
        class="mt-12 rounded-[1.7rem] bg-black p-5 sm:p-7"
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
      </div>


      <!-- Results -->

      <div
        class="mt-8 flex items-center justify-between gap-5"
      >
        <p
          class="font-display text-sm font-semibold text-gray-500"
        >
          Showing

          <span class="font-bold text-black">
            {{ homepageEntrepreneurs.length }}
          </span>

          entrepreneurs
        </p>

        <button
          v-if="
            searchQuery ||
            selectedIndustry !== 'All' ||
            selectedCounty !== 'All'
          "
          type="button"
          class="font-display text-sm font-bold text-yen-red"
          @click="clearFilters"
        >
          Clear filters
        </button>
      </div>


      <!-- =====================================
           ENTREPRENEUR CARDS
      ====================================== -->

      <div
        v-if="homepageEntrepreneurs.length"
        class="mt-7 grid gap-7 sm:grid-cols-2 lg:grid-cols-3"
      >
        <article
          v-for="entrepreneur in homepageEntrepreneurs"
          :key="entrepreneur.id"
          class="group overflow-hidden rounded-[1.8rem] border border-gray-200 bg-white transition duration-300 hover:-translate-y-2 hover:border-transparent hover:shadow-2xl"
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


            <!-- Name overlay -->

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
            <div
              class="flex flex-wrap gap-2"
            >
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


            <p
              class="mt-5 font-body text-sm leading-7 text-gray-600"
            >
              {{ entrepreneur.shortDescription }}
            </p>


            <div
              class="mt-7 flex items-center justify-between border-t border-gray-100 pt-6"
            >
              <span
                class="font-display text-[9px] font-bold uppercase tracking-wider text-gray-400"
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
        class="mt-7 rounded-[1.7rem] border border-dashed border-gray-300 bg-[#f7f7f5] px-6 py-14 text-center"
      >
        <h3
          class="font-display text-xl font-bold text-black"
        >
          No entrepreneurs found
        </h3>

        <p
          class="mt-3 font-body text-sm text-gray-500"
        >
          Try another business, industry or county.
        </p>

        <button
          type="button"
          class="mt-5 font-display text-sm font-bold text-yen-red"
          @click="clearFilters"
        >
          View all entrepreneurs
        </button>
      </div>


      <!-- =====================================
           CTA
      ====================================== -->

      <div
        class="relative mt-16 overflow-hidden rounded-[2rem] bg-black p-8 sm:p-10 lg:p-12"
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
              Build Your Visibility
            </p>

            <h3
              class="mt-4 font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl"
            >
              Discover businesses or become part of the

              <span class="text-yen-gold">
                YEN entrepreneur network.
              </span>
            </h3>

            <p
              class="mt-4 max-w-2xl font-body text-sm leading-7 text-white/60 sm:text-base"
            >
              Explore the full entrepreneur directory or join
              YEN-Liberia and prepare to showcase your business.
            </p>
          </div>


          <div
            class="flex flex-col gap-3 sm:flex-row lg:flex-col"
          >
            <RouterLink
              :to="{ name: 'entrepreneurs' }"
              class="inline-flex min-w-[210px] items-center justify-center rounded-full border border-white/25 px-7 py-4 font-display text-sm font-bold text-white transition hover:border-yen-gold hover:text-yen-gold"
            >
              Explore Directory
            </RouterLink>

            <RouterLink
              :to="{ name: 'join' }"
              class="inline-flex min-w-[210px] items-center justify-center rounded-full bg-yen-gold px-7 py-4 font-display text-sm font-bold text-black transition hover:-translate-y-1 hover:bg-white"
            >
              Join YEN-Liberia

              <span class="ml-3">
                →
              </span>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>