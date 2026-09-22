<script setup>
import {
  computed,
  ref,
} from "vue"

import {
  resources,
  resourceCategories,
  resourceTypes,
} from "@/data/resources"


/*
|--------------------------------------------------------------------------
| FILTER STATE
|--------------------------------------------------------------------------
*/

const searchQuery = ref("")
const activeCategory = ref("All")
const activeType = ref("All")


/*
|--------------------------------------------------------------------------
| SAFE TEXT HELPER
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
| Merge the configured filters with the values that actually
| exist in resources.js.
|
| This keeps the Resource Library synchronized when new
| categories or resource types are added later.
|
*/

const categories = computed(() => {
  const configured =
    Array.isArray(resourceCategories)
      ? resourceCategories.filter(
          (category) =>
            category &&
            category !== "All",
        )
      : []

  const fromResources = resources
    .map(
      (resource) =>
        resource.category,
    )
    .filter(Boolean)

  return [
    "All",
    ...new Set([
      ...configured,
      ...fromResources,
    ]),
  ]
})


const types = computed(() => {
  const configured =
    Array.isArray(resourceTypes)
      ? resourceTypes.filter(
          (type) =>
            type &&
            type !== "All",
        )
      : []

  const fromResources = resources
    .map(
      (resource) =>
        resource.type,
    )
    .filter(Boolean)

  return [
    "All",
    ...new Set([
      ...configured,
      ...fromResources,
    ]),
  ]
})


/*
|--------------------------------------------------------------------------
| FEATURED RESOURCES
|--------------------------------------------------------------------------
*/

const featuredResources = computed(() => {
  return resources.filter(
    (resource) =>
      Boolean(resource.featured),
  )
})


/*
|--------------------------------------------------------------------------
| FILTERED RESOURCES
|--------------------------------------------------------------------------
*/

const filteredResources = computed(() => {
  const query = normalizeText(
    searchQuery.value,
  )

  return resources.filter((resource) => {
    const matchesCategory =
      activeCategory.value === "All" ||
      resource.category ===
        activeCategory.value

    const matchesType =
      activeType.value === "All" ||
      resource.type ===
        activeType.value

    const searchableContent = [
      resource.title,
      resource.category,
      resource.type,
      resource.summary,
      resource.description,
      resource.audience,
      resource.format,
    ]
      .map(normalizeText)
      .join(" ")

    const matchesSearch =
      !query ||
      searchableContent.includes(query)

    return (
      matchesCategory &&
      matchesType &&
      matchesSearch
    )
  })
})


const clearFilters = () => {
  searchQuery.value = ""
  activeCategory.value = "All"
  activeType.value = "All"
}
</script>


<template>
  <main class="w-full overflow-hidden">

    <!-- ========================================
         HERO
    ========================================= -->

    <section
      class="relative isolate min-h-[540px] overflow-hidden sm:min-h-[560px] lg:min-h-[580px]"
    >
      <!-- Background -->

      <img
        src="/images/hero/hero-3.jpg"
        alt="Business resources for entrepreneurs"
        class="absolute inset-0 h-full w-full object-cover object-center"
      />


      <!-- Contrast -->

      <div
        class="absolute inset-0 bg-linear-to-r from-black/90 via-black/65 to-black/25 sm:from-black/90 sm:via-black/60 sm:to-black/10"
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

            <span class="text-white/25">
              /
            </span>

            <span class="text-yen-gold">
              Resources
            </span>
          </div>


          <!-- Label -->

          <p
            class="font-display text-[10px] font-extrabold uppercase tracking-[0.2em] text-yen-gold sm:text-xs"
          >
            Business Resource Center
          </p>


          <!-- Heading -->

          <h1
            class="mt-5 max-w-4xl font-display text-[40px] font-extrabold leading-[1.05] tracking-tight text-white min-[390px]:text-[44px] sm:text-6xl lg:text-7xl"
          >
            Practical tools for

            <span class="text-yen-gold">
              stronger businesses.
            </span>
          </h1>


          <!-- Description -->

          <p
            class="mt-6 max-w-2xl font-body text-sm leading-7 text-white/80 sm:mt-7 sm:text-lg sm:leading-8"
          >
            Access business templates, guides, checklists,
            reports and practical resources designed to help
            entrepreneurs plan, manage and grow their businesses.
          </p>
        </div>
      </div>


      <!-- Accent -->

      <div
        class="absolute bottom-0 left-0 z-20 h-1 w-full bg-linear-to-r from-yen-red via-yen-gold to-yen-red"
      ></div>
    </section>


    <!-- ========================================
         INTRO
    ========================================= -->

    <section class="bg-white">
      <div
        class="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14 lg:px-8 lg:py-24"
      >
        <!-- Heading -->

        <div>
          <p
            class="font-display text-[10px] font-extrabold uppercase tracking-[0.18em] text-yen-red sm:text-xs"
          >
            Learn. Apply. Grow.
          </p>

          <h2
            class="mt-4 font-display text-3xl font-extrabold leading-tight text-black min-[390px]:text-4xl sm:text-5xl"
          >
            Resources entrepreneurs can

            <span class="text-yen-red">
              actually use.
            </span>
          </h2>
        </div>


        <!-- Copy -->

        <div>
          <p
            class="font-body text-sm leading-8 text-gray-600 sm:text-base"
          >
            The YEN-Liberia Resource Center will bring practical
            business tools into one place so entrepreneurs can
            spend less time searching and more time building.
          </p>

          <p
            class="mt-5 font-body text-sm leading-8 text-gray-600 sm:text-base"
          >
            Resources will include templates, business guides,
            funding-readiness tools, reports, training material
            and documents developed by YEN-Liberia and approved
            ecosystem partners.
          </p>
        </div>
      </div>
    </section>


    <!-- ========================================
         FEATURED RESOURCES
    ========================================= -->

    <section
      v-if="featuredResources.length"
      class="bg-black"
    >
      <div
        class="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24"
      >
        <!-- Heading -->

        <div>
          <p
            class="font-display text-[10px] font-extrabold uppercase tracking-[0.18em] text-yen-gold sm:text-xs"
          >
            Featured Tools
          </p>

          <h2
            class="mt-3 font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl"
          >
            Start with the essentials
          </h2>
        </div>


        <!-- Featured cards -->

        <div
          class="mt-10 grid gap-6 xl:grid-cols-2"
        >
          <article
            v-for="resource in featuredResources"
            :key="resource.id"
            class="group grid overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/[0.05] transition duration-300 hover:border-yen-gold/40 sm:grid-cols-[0.8fr_1.2fr] sm:rounded-[1.8rem]"
          >
            <!-- Image -->

            <div
              class="relative h-[240px] overflow-hidden sm:h-auto sm:min-h-[280px]"
            >
              <img
                :src="resource.image"
                :alt="resource.title"
                loading="lazy"
                class="absolute inset-0 h-full w-full object-cover object-center transition duration-700 group-hover:scale-105"
              />

              <div
                class="absolute inset-0 bg-black/20"
              ></div>
            </div>


            <!-- Content -->

            <div
              class="flex flex-col p-6 sm:p-8"
            >
              <!-- Badges -->

              <div
                class="flex flex-wrap gap-2"
              >
                <span
                  v-if="resource.type"
                  class="rounded-full bg-yen-gold px-3 py-2 font-display text-[9px] font-extrabold uppercase text-black"
                >
                  {{ resource.type }}
                </span>

                <span
                  v-if="resource.format"
                  class="rounded-full border border-white/20 px-3 py-2 font-display text-[9px] font-bold uppercase text-white/60"
                >
                  {{ resource.format }}
                </span>
              </div>


              <!-- Title -->

              <h3
                class="mt-5 font-display text-xl font-bold leading-snug text-white sm:text-2xl"
              >
                {{ resource.title }}
              </h3>


              <!-- Summary -->

              <p
                class="mt-4 font-body text-sm leading-7 text-white/60"
              >
                {{ resource.summary }}
              </p>


              <!-- Link -->

              <div class="mt-auto pt-7">
                <RouterLink
                  :to="{
                    name: 'resource-detail',
                    params: {
                      slug: resource.slug,
                    },
                  }"
                  class="inline-flex items-center gap-3 font-display text-sm font-bold text-yen-gold transition hover:text-white"
                >
                  View Resource

                  <span aria-hidden="true">
                    →
                  </span>
                </RouterLink>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>


    <!-- ========================================
         RESOURCE LIBRARY
    ========================================= -->

    <section class="bg-[#f7f7f5]">
      <div
        class="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28"
      >
        <!-- Heading -->

        <div>
          <p
            class="font-display text-[10px] font-extrabold uppercase tracking-[0.18em] text-yen-red sm:text-xs"
          >
            Resource Library
          </p>

          <h2
            class="mt-3 font-display text-3xl font-extrabold leading-tight text-black sm:text-4xl"
          >
            Find what you need
          </h2>
        </div>


        <!-- ==================================
             FILTER PANEL
        =================================== -->

        <div
          class="mt-9 rounded-[1.5rem] bg-black p-4 sm:mt-10 sm:rounded-[1.8rem] sm:p-7"
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
              for="resource-search"
              class="sr-only"
            >
              Search business resources
            </label>


            <input
              id="resource-search"
              v-model="searchQuery"
              type="search"
              autocomplete="off"
              placeholder="Search templates, guides, finance tools..."
              class="w-full rounded-xl border border-white/15 bg-white/10 py-4 pl-12 pr-4 font-display text-sm text-white outline-none transition placeholder:text-white/35 focus:border-yen-gold focus:bg-white/15 sm:pl-14 sm:pr-5"
            />
          </div>


          <!-- Categories -->

          <div
            class="mt-5 flex flex-wrap items-center gap-2"
            aria-label="Filter resources by category"
          >
            <span
              class="mr-1 font-display text-[9px] font-bold uppercase tracking-[0.15em] text-white/35 sm:mr-2 sm:text-[10px]"
            >
              Category
            </span>

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
                  : 'border border-white/15 text-white/60 hover:border-yen-gold hover:text-yen-gold'
              "
              @click="
                activeCategory = category
              "
            >
              {{ category }}
            </button>
          </div>


          <!-- Resource types -->

          <div
            class="mt-4 flex flex-wrap items-center gap-2"
            aria-label="Filter resources by type"
          >
            <span
              class="mr-1 font-display text-[9px] font-bold uppercase tracking-[0.15em] text-white/35 sm:mr-2 sm:text-[10px]"
            >
              Type
            </span>

            <button
              v-for="type in types"
              :key="type"
              type="button"
              :aria-pressed="
                activeType === type
              "
              class="rounded-full px-3.5 py-2.5 font-display text-[11px] font-bold transition sm:px-4 sm:text-xs"
              :class="
                activeType === type
                  ? 'bg-yen-red text-white'
                  : 'border border-white/15 text-white/60 hover:border-yen-red hover:text-white'
              "
              @click="
                activeType = type
              "
            >
              {{ type }}
            </button>
          </div>
        </div>


        <!-- ==================================
             RESULT COUNT
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
              {{ filteredResources.length }}
            </span>

            {{
              filteredResources.length === 1
                ? "resource"
                : "resources"
            }}
          </p>


          <button
            v-if="
              searchQuery ||
              activeCategory !== 'All' ||
              activeType !== 'All'
            "
            type="button"
            class="font-display text-xs font-bold text-yen-red transition hover:text-black sm:text-sm"
            @click="clearFilters"
          >
            Clear filters
          </button>
        </div>


        <!-- ==================================
             RESOURCE CARDS
        =================================== -->

        <div
          v-if="filteredResources.length"
          class="mt-7 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          <article
            v-for="resource in filteredResources"
            :key="resource.id"
            class="group flex h-full flex-col overflow-hidden rounded-[1.6rem] bg-white transition duration-300 hover:-translate-y-2 hover:shadow-2xl sm:rounded-[1.7rem]"
          >
            <!-- Image -->

            <div
              class="relative h-[210px] overflow-hidden sm:h-[230px]"
            >
              <img
                :src="resource.image"
                :alt="resource.title"
                loading="lazy"
                class="h-full w-full object-cover object-center transition duration-700 group-hover:scale-105"
              />

              <div
                class="absolute inset-0 bg-linear-to-t from-black/65 via-transparent to-transparent"
              ></div>


              <!-- Type -->

              <span
                v-if="resource.type"
                class="absolute left-4 top-4 rounded-full bg-yen-gold px-3 py-2 font-display text-[9px] font-extrabold uppercase text-black sm:left-5 sm:top-5"
              >
                {{ resource.type }}
              </span>


              <!-- Format -->

              <span
                v-if="resource.format"
                class="absolute bottom-4 left-4 font-display text-[11px] font-bold text-white sm:bottom-5 sm:left-5 sm:text-xs"
              >
                {{ resource.format }}
              </span>
            </div>


            <!-- Body -->

            <div
              class="flex flex-1 flex-col p-6 sm:p-7"
            >
              <!-- Category -->

              <p
                v-if="resource.category"
                class="font-display text-[9px] font-extrabold uppercase tracking-[0.14em] text-yen-red sm:text-[10px]"
              >
                {{ resource.category }}
              </p>


              <!-- Title -->

              <h3
                class="mt-3 font-display text-xl font-bold leading-snug text-black"
              >
                {{ resource.title }}
              </h3>


              <!-- Summary -->

              <p
                class="mt-4 font-body text-sm leading-7 text-gray-600"
              >
                {{ resource.summary }}
              </p>


              <!-- Bottom content -->

              <div class="mt-auto pt-6">

                <!-- Audience -->

                <div
                  v-if="resource.audience"
                  class="border-t border-gray-100 pt-5"
                >
                  <p
                    class="font-display text-[9px] font-bold uppercase tracking-wider text-gray-400"
                  >
                    Designed For
                  </p>

                  <p
                    class="mt-2 font-display text-xs font-semibold leading-5 text-black"
                  >
                    {{ resource.audience }}
                  </p>
                </div>


                <!-- Detail link -->

                <RouterLink
                  :to="{
                    name: 'resource-detail',
                    params: {
                      slug: resource.slug,
                    },
                  }"
                  class="mt-6 flex items-center justify-between rounded-xl bg-black px-5 py-4 font-display text-sm font-bold text-white transition duration-300 group-hover:bg-yen-red"
                >
                  <span>
                    View Resource
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
            No resources found
          </h3>

          <p
            class="mx-auto mt-3 max-w-md font-body text-sm leading-7 text-gray-500"
          >
            Try another category, resource type or search term.
          </p>

          <button
            type="button"
            class="mt-5 font-display text-sm font-bold text-yen-red transition hover:text-black"
            @click="clearFilters"
          >
            View all resources
          </button>
        </div>
      </div>
    </section>


    <!-- ========================================
         REQUEST RESOURCE CTA
    ========================================= -->

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
                Need Something Else?
              </p>

              <h2
                class="mt-4 font-display text-2xl font-extrabold leading-tight text-black sm:text-4xl"
              >
                We're building this library for entrepreneurs.
              </h2>

              <p
                class="mt-4 max-w-2xl font-body text-sm leading-7 text-black/65 sm:text-base"
              >
                As YEN-Liberia grows, new guides, templates,
                research and business tools can be added based on
                what entrepreneurs actually need.
              </p>
            </div>


            <!-- Dedicated Contact route -->

            <RouterLink
              :to="{ name: 'contact' }"
              class="inline-flex w-full items-center justify-center rounded-full bg-black px-7 py-4 font-display text-sm font-bold text-white transition duration-300 hover:-translate-y-1 hover:bg-yen-red sm:w-auto sm:min-w-[220px]"
            >
              Request a Resource

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