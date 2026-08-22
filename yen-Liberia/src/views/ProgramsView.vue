<script setup>
import { computed, ref } from "vue"
import { programs } from "@/data/programs"

const searchQuery = ref("")
const activeCategory = ref("All")

const categories = [
  "All",
  "Business Development",
  "Women Entrepreneurship",
  "Climate & Sustainability",
  "Conference & Networking",
]

const filteredPrograms = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()

  return programs.filter((program) => {
    const matchesCategory =
      activeCategory.value === "All" ||
      program.category === activeCategory.value

    const matchesSearch =
      !query ||
      program.title.toLowerCase().includes(query) ||
      program.category.toLowerCase().includes(query) ||
      program.summary.toLowerCase().includes(query) ||
      program.focusAreas.some((area) =>
        area.toLowerCase().includes(query),
      )

    return matchesCategory && matchesSearch
  })
})

const clearFilters = () => {
  searchQuery.value = ""
  activeCategory.value = "All"
}
</script>

<template>
  <main class="w-full">
    <!-- ==========================================
         PAGE HERO
    =========================================== -->

    <section
      class="relative isolate min-h-[560px] overflow-hidden"
    >
      <img
        src="/images/hero/hero-3.jpg"
        alt="YEN-Liberia entrepreneurship programs"
        class="absolute inset-0 h-full w-full object-cover"
      />

      <div
        class="absolute inset-0 bg-linear-to-r from-black/85 via-black/55 to-black/15"
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

            <span class="text-white/30">
              /
            </span>

            <span class="text-yen-gold">
              Programs
            </span>
          </div>

          <p
            class="font-display text-xs font-extrabold uppercase tracking-[0.2em] text-yen-gold"
          >
            Programs & Initiatives
          </p>

          <h1
            class="mt-5 max-w-4xl font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            Turning entrepreneurial potential into

            <span class="text-yen-gold">
              practical progress.
            </span>
          </h1>

          <p
            class="mt-7 max-w-2xl font-body text-base leading-8 text-white/75 sm:text-lg"
          >
            Explore YEN-Liberia programs designed to strengthen
            entrepreneurs through practical skills, connections,
            partnerships and access to opportunities.
          </p>
        </div>
      </div>

      <div
        class="absolute bottom-0 left-0 z-20 h-1 w-full bg-linear-to-r from-yen-red via-yen-gold to-yen-red"
      ></div>
    </section>


    <!-- ==========================================
         PROGRAM INTRO
    =========================================== -->

    <section class="bg-white">
      <div
        class="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[0.85fr_1.15fr] lg:px-8 lg:py-24"
      >
        <div>
          <p
            class="font-display text-xs font-extrabold uppercase tracking-[0.18em] text-yen-red"
          >
            What We Do
          </p>

          <h2
            class="mt-4 font-display text-4xl font-extrabold leading-tight text-black sm:text-5xl"
          >
            Programs built around

            <span class="text-yen-red">
              real business needs.
            </span>
          </h2>
        </div>

        <div>
          <p
            class="font-body text-base leading-8 text-gray-600"
          >
            YEN-Liberia works with entrepreneurs and ecosystem
            partners to deliver business-development programs,
            entrepreneurship conferences, capacity building,
            networking activities and initiatives that strengthen
            emerging enterprises.
          </p>

          <p
            class="mt-5 font-body text-base leading-8 text-gray-600"
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
        class="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28"
      >
        <!-- Heading -->

        <div>
          <p
            class="font-display text-xs font-extrabold uppercase tracking-[0.18em] text-yen-red"
          >
            Explore Our Programs
          </p>

          <h2
            class="mt-3 font-display text-3xl font-extrabold text-black sm:text-4xl"
          >
            Programs & initiatives
          </h2>
        </div>

        <!-- Search -->

        <div
          class="mt-10 rounded-[1.7rem] bg-black p-5 sm:p-7"
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
              placeholder="Search programs, topics or initiatives..."
              class="w-full rounded-xl border border-white/15 bg-white/10 py-4 pl-14 pr-5 font-display text-sm text-white outline-none placeholder:text-white/35 focus:border-yen-gold"
            />
          </div>

          <!-- Categories -->

          <div
            class="mt-5 flex flex-wrap gap-2"
          >
            <button
              v-for="category in categories"
              :key="category"
              type="button"
              class="rounded-full px-4 py-2.5 font-display text-xs font-bold transition"
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

        <!-- Count -->

        <div
          class="mt-8 flex items-center justify-between gap-5"
        >
          <p
            class="font-display text-sm font-semibold text-gray-500"
          >
            Showing

            <span class="font-bold text-black">
              {{ filteredPrograms.length }}
            </span>

            programs
          </p>

          <button
            v-if="searchQuery || activeCategory !== 'All'"
            type="button"
            class="font-display text-sm font-bold text-yen-red"
            @click="clearFilters"
          >
            Clear filters
          </button>
        </div>

        <!-- Cards -->

        <div
          v-if="filteredPrograms.length"
          class="mt-7 grid gap-7 md:grid-cols-2"
        >
          <article
            v-for="program in filteredPrograms"
            :key="program.id"
            class="group overflow-hidden rounded-[1.8rem] bg-white transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >
            <!-- Image -->

            <div
              class="relative h-[330px] overflow-hidden"
            >
              <img
                :src="program.image"
                :alt="program.title"
                class="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />

              <div
                class="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent"
              ></div>

              <!-- Status -->

              <div
                class="absolute left-5 top-5"
              >
                <span
                  class="rounded-full bg-yen-gold px-4 py-2 font-display text-[10px] font-extrabold uppercase tracking-wider text-black"
                >
                  {{ program.status }}
                </span>
              </div>

              <!-- Impact -->

              <div
                class="absolute bottom-5 left-5"
              >
                <p
                  class="font-display text-3xl font-extrabold text-white"
                >
                  {{ program.impact }}
                </p>

                <p
                  class="font-display text-xs font-semibold text-white/65"
                >
                  {{ program.impactLabel }}
                </p>
              </div>
            </div>

            <!-- Content -->

            <div class="p-7 sm:p-8">
              <div
                class="flex flex-wrap items-center gap-3"
              >
                <span
                  class="font-display text-[10px] font-extrabold uppercase tracking-[0.14em] text-yen-red"
                >
                  {{ program.category }}
                </span>

                <span
                  class="h-1 w-1 rounded-full bg-gray-300"
                ></span>

                <span
                  class="font-display text-xs font-semibold text-gray-400"
                >
                  {{ program.year }}
                </span>
              </div>

              <h3
                class="mt-3 font-display text-2xl font-bold leading-snug text-black"
              >
                {{ program.title }}
              </h3>

              <p
                class="mt-4 font-body text-sm leading-7 text-gray-600"
              >
                {{ program.summary }}
              </p>

              <!-- Focus chips -->

              <div
                class="mt-6 flex flex-wrap gap-2"
              >
                <span
                  v-for="area in program.focusAreas.slice(0, 3)"
                  :key="area"
                  class="rounded-full bg-[#f7f7f5] px-3 py-2 font-display text-[10px] font-bold text-gray-600"
                >
                  {{ area }}
                </span>
              </div>

              <!-- Footer -->

              <div
                class="mt-7 flex items-center justify-between border-t border-gray-100 pt-6"
              >
                <div>
                  <p
                    class="font-display text-[10px] font-bold uppercase tracking-wider text-gray-400"
                  >
                    Date
                  </p>

                  <p
                    class="mt-1 font-display text-xs font-semibold text-black"
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
                  class="flex h-11 w-11 items-center justify-center rounded-full bg-black text-yen-gold transition duration-300 group-hover:bg-yen-red group-hover:text-white"
                  :aria-label="`View ${program.title}`"
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
            No programs found
          </h3>

          <p
            class="mt-3 font-body text-sm text-gray-500"
          >
            Try another search or program category.
          </p>

          <button
            class="mt-5 font-display text-sm font-bold text-yen-red"
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
                Ready to Grow?
              </p>

              <h2
                class="mt-4 font-display text-3xl font-extrabold leading-tight text-black sm:text-4xl"
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

            <RouterLink
              :to="{
                name: 'home',
                hash: '#opportunities',
              }"
              class="inline-flex items-center justify-center rounded-full bg-black px-7 py-4 font-display text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-yen-red"
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