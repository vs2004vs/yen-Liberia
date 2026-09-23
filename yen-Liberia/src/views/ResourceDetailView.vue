<script setup>
import {
  computed,
  watchEffect,
} from "vue"

import { useRoute } from "vue-router"

import {
  resources,
  getResourceBySlug,
} from "@/data/resources"

import {
  setPageSeo,
} from "@/utils/seo"


/*
|--------------------------------------------------------------------------
| ROUTE
|--------------------------------------------------------------------------
*/

const route = useRoute()


/*
|--------------------------------------------------------------------------
| CURRENT RESOURCE
|--------------------------------------------------------------------------
*/

const resource = computed(() => {
  const slug = String(
    route.params.slug ?? "",
  )

  return getResourceBySlug(slug)
})


/*
|--------------------------------------------------------------------------
| SAFE RESOURCE DATA
|--------------------------------------------------------------------------
*/

const contents = computed(() => {
  return Array.isArray(
    resource.value?.contents,
  )
    ? resource.value.contents
    : []
})


/*
|--------------------------------------------------------------------------
| RESOURCE AVAILABILITY
|--------------------------------------------------------------------------
*/

const hasDownload = computed(() => {
  return Boolean(
    resource.value?.fileUrl,
  )
})


const hasExternalResource = computed(() => {
  return Boolean(
    resource.value?.externalUrl,
  )
})


/*
|--------------------------------------------------------------------------
| RELATED RESOURCES
|--------------------------------------------------------------------------
|
| Priority:
|
| 1. Same category
| 2. Other resources
|
*/

const relatedResources = computed(() => {
  if (!resource.value) {
    return []
  }

  const currentId =
    resource.value.id

  const otherResources =
    resources.filter(
      (item) =>
        item.id !== currentId,
    )

  const sameCategory =
    otherResources.filter(
      (item) =>
        item.category ===
        resource.value.category,
    )

  const otherCategories =
    otherResources.filter(
      (item) =>
        item.category !==
        resource.value.category,
    )

  return [
    ...sameCategory,
    ...otherCategories,
  ].slice(0, 3)
})


/*
|--------------------------------------------------------------------------
| RESOURCE SEO
|--------------------------------------------------------------------------
|
| Replace the router's generic:
|
| Resource | Youth Entrepreneurs Network–Liberia
|
| with the actual resource information.
|
*/

watchEffect(() => {
  /*
  |--------------------------------------------------------------------------
  | RESOURCE NOT FOUND
  |--------------------------------------------------------------------------
  */

  if (!resource.value) {
    setPageSeo({
      title:
        "Resource Not Found",

      description:
        "The requested YEN-Liberia business resource could not be found.",

      path:
        route.path,

      robots:
        "noindex, follow",

      type:
        "website",
    })

    return
  }


  /*
  |--------------------------------------------------------------------------
  | DESCRIPTION
  |--------------------------------------------------------------------------
  */

  const description =
    resource.value.summary ||
    resource.value.description ||
    "Access this YEN-Liberia business resource for entrepreneurs and small business owners."


  /*
  |--------------------------------------------------------------------------
  | SOCIAL IMAGE
  |--------------------------------------------------------------------------
  */

  const image =
    resource.value.image
      ? new URL(
          resource.value.image,
          "https://yen-lib.netlify.app",
        ).toString()
      : undefined


  /*
  |--------------------------------------------------------------------------
  | APPLY SEO
  |--------------------------------------------------------------------------
  */

  setPageSeo({
    title:
      resource.value.title,

    description,

    path:
      route.path,

    image,

    robots:
      "index, follow",

    type:
      "website",
  })
})
</script>


<template>
  <!-- ==========================================
       VALID RESOURCE
  =========================================== -->

  <main
    v-if="resource"
    class="w-full overflow-hidden"
  >
    <!-- ========================================
         HERO
    ========================================= -->

    <section
      class="relative isolate min-h-[540px] overflow-hidden sm:min-h-[580px] lg:min-h-[620px]"
    >
      <!-- Background image -->

      <img
        :src="resource.image"
        :alt="resource.title"
        class="absolute inset-0 h-full w-full object-cover object-center"
      />


      <!-- Contrast overlays -->

      <div
        class="absolute inset-0 bg-linear-to-r from-black/90 via-black/70 to-black/25 sm:from-black/90 sm:via-black/60 sm:to-black/10"
        aria-hidden="true"
      ></div>

      <div
        class="absolute inset-0 bg-linear-to-t from-black/75 via-transparent to-black/20"
        aria-hidden="true"
      ></div>


      <!-- Hero content -->

      <div
        class="relative z-10 mx-auto flex min-h-[540px] max-w-7xl items-end px-5 pb-16 pt-24 sm:min-h-[580px] sm:px-6 sm:pb-20 lg:min-h-[620px] lg:px-8"
      >
        <div
          class="w-full max-w-4xl"
        >
          <!-- Breadcrumb -->

          <nav
            class="mb-6 flex flex-wrap items-center gap-3 font-display text-xs font-bold sm:mb-8"
            aria-label="Breadcrumb"
          >
            <RouterLink
              :to="{ name: 'home' }"
              class="rounded-sm text-white/55 transition hover:text-yen-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yen-gold"
            >
              Home
            </RouterLink>

            <span
              class="text-white/25"
              aria-hidden="true"
            >
              /
            </span>

            <RouterLink
              :to="{ name: 'resources' }"
              class="rounded-sm text-white/55 transition hover:text-yen-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yen-gold"
            >
              Resources
            </RouterLink>

            <span
              class="text-white/25"
              aria-hidden="true"
            >
              /
            </span>

            <span
              class="max-w-[220px] truncate text-yen-gold sm:max-w-md"
              aria-current="page"
            >
              {{ resource.title }}
            </span>
          </nav>


          <!-- Category and type -->

          <div
            class="flex flex-wrap gap-3"
          >
            <span
              v-if="resource.category"
              class="rounded-full bg-yen-gold px-4 py-2 font-display text-[10px] font-extrabold uppercase tracking-wider text-black"
            >
              {{ resource.category }}
            </span>

            <span
              v-if="resource.type"
              class="rounded-full border border-white/25 bg-black/20 px-4 py-2 font-display text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md"
            >
              {{ resource.type }}
            </span>
          </div>


          <!-- Title -->

          <h1
            class="mt-6 max-w-4xl font-display text-[38px] font-extrabold leading-[1.06] tracking-tight text-white min-[390px]:text-[44px] sm:text-6xl lg:text-7xl"
          >
            {{ resource.title }}
          </h1>


          <!-- Summary -->

          <p
            v-if="resource.summary"
            class="mt-6 max-w-3xl font-body text-sm leading-7 text-white/80 sm:text-lg sm:leading-8"
          >
            {{ resource.summary }}
          </p>


          <!-- Format/status -->

          <div
            class="mt-7 flex flex-wrap gap-3"
          >
            <span
              v-if="resource.format"
              class="rounded-full border border-white/20 bg-white/10 px-4 py-2 font-display text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur-md"
            >
              {{ resource.format }}
            </span>

            <span
              v-if="resource.status"
              class="rounded-full border border-white/20 bg-white/10 px-4 py-2 font-display text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur-md"
            >
              {{ resource.status }}
            </span>
          </div>
        </div>
      </div>


      <!-- Brand accent -->

      <div
        class="absolute bottom-0 left-0 z-20 h-1 w-full bg-linear-to-r from-yen-red via-yen-gold to-yen-red"
        aria-hidden="true"
      ></div>
    </section>


    <!-- ========================================
         RESOURCE OVERVIEW
    ========================================= -->

    <section
      class="bg-white"
    >
      <div
        class="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 lg:px-8 lg:py-28"
      >
        <!-- ==================================
             MAIN CONTENT
        =================================== -->

        <div>
          <p
            class="font-display text-[10px] font-extrabold uppercase tracking-[0.18em] text-yen-red sm:text-xs"
          >
            Resource Overview
          </p>

          <h2
            class="mt-4 font-display text-3xl font-extrabold leading-tight text-black min-[390px]:text-4xl sm:text-5xl"
          >
            About this resource
          </h2>


          <!-- Description -->

          <p
            v-if="resource.description"
            class="mt-6 font-body text-sm leading-8 text-gray-600 sm:text-base"
          >
            {{ resource.description }}
          </p>


          <!-- =================================
               WHAT'S INCLUDED
          ================================== -->

          <section
            v-if="contents.length"
            class="mt-10 sm:mt-12"
            aria-labelledby="resource-contents-heading"
          >
            <h3
              id="resource-contents-heading"
              class="font-display text-2xl font-bold text-black"
            >
              What's included
            </h3>

            <ul
              class="mt-6 space-y-4"
            >
              <li
                v-for="item in contents"
                :key="item"
                class="flex items-start gap-4 rounded-xl bg-[#f7f7f5] p-4 sm:bg-transparent sm:p-0"
              >
                <span
                  class="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-yen-gold font-display text-xs font-black text-black"
                  aria-hidden="true"
                >
                  ✓
                </span>

                <span
                  class="font-body text-sm leading-7 text-gray-600"
                >
                  {{ item }}
                </span>
              </li>
            </ul>
          </section>


          <!-- =================================
               AUDIENCE
          ================================== -->

          <section
            v-if="resource.audience"
            class="mt-10 rounded-[1.5rem] bg-[#f7f7f5] p-6 sm:mt-12 sm:p-8"
            aria-labelledby="resource-audience-heading"
          >
            <p
              class="font-display text-[10px] font-extrabold uppercase tracking-[0.18em] text-yen-red"
            >
              Who It's For
            </p>

            <h3
              id="resource-audience-heading"
              class="mt-3 font-display text-xl font-bold text-black sm:text-2xl"
            >
              Intended audience
            </h3>

            <p
              class="mt-4 font-body text-sm leading-7 text-gray-600 sm:text-base"
            >
              {{ resource.audience }}
            </p>
          </section>
        </div>


        <!-- ==================================
             RESOURCE SIDEBAR
        =================================== -->

        <aside
          aria-label="Resource information"
        >
          <div
            class="overflow-hidden rounded-[1.6rem] bg-black sm:rounded-[1.8rem] lg:sticky lg:top-28"
          >
            <div
              class="p-6 sm:p-8"
            >
              <p
                class="font-display text-[10px] font-extrabold uppercase tracking-[0.18em] text-yen-gold sm:text-xs"
              >
                Resource Information
              </p>


              <!-- Details -->

              <dl
                class="mt-7 divide-y divide-white/10"
              >
                <!-- Category -->

                <div
                  v-if="resource.category"
                  class="py-5 first:pt-0"
                >
                  <dt
                    class="font-display text-[9px] font-bold uppercase tracking-wider text-white/35 sm:text-[10px]"
                  >
                    Category
                  </dt>

                  <dd
                    class="mt-2 font-display text-sm font-semibold leading-6 text-white"
                  >
                    {{ resource.category }}
                  </dd>
                </div>


                <!-- Type -->

                <div
                  v-if="resource.type"
                  class="py-5 first:pt-0"
                >
                  <dt
                    class="font-display text-[9px] font-bold uppercase tracking-wider text-white/35 sm:text-[10px]"
                  >
                    Resource Type
                  </dt>

                  <dd
                    class="mt-2 font-display text-sm font-semibold leading-6 text-white"
                  >
                    {{ resource.type }}
                  </dd>
                </div>


                <!-- Format -->

                <div
                  v-if="resource.format"
                  class="py-5 first:pt-0"
                >
                  <dt
                    class="font-display text-[9px] font-bold uppercase tracking-wider text-white/35 sm:text-[10px]"
                  >
                    Format
                  </dt>

                  <dd
                    class="mt-2 font-display text-sm font-semibold leading-6 text-yen-gold"
                  >
                    {{ resource.format }}
                  </dd>
                </div>


                <!-- Status -->

                <div
                  v-if="resource.status"
                  class="py-5 first:pt-0"
                >
                  <dt
                    class="font-display text-[9px] font-bold uppercase tracking-wider text-white/35 sm:text-[10px]"
                  >
                    Availability
                  </dt>

                  <dd>
                    <span
                      class="mt-2 inline-flex rounded-full bg-white/10 px-3 py-2 font-display text-[10px] font-bold uppercase text-white"
                    >
                      {{ resource.status }}
                    </span>
                  </dd>
                </div>
              </dl>


              <!-- =================================
                   LOCAL DOWNLOAD
              ================================== -->

              <a
                v-if="hasDownload"
                :href="resource.fileUrl"
                download
                class="mt-7 flex w-full items-center justify-center rounded-full bg-yen-gold px-6 py-4 font-display text-sm font-bold text-black transition duration-300 hover:-translate-y-1 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                :aria-label="`Download ${resource.title}`"
              >
                Download Resource

                <span
                  class="ml-3"
                  aria-hidden="true"
                >
                  ↓
                </span>
              </a>


              <!-- =================================
                   EXTERNAL RESOURCE
              ================================== -->

              <a
                v-else-if="hasExternalResource"
                :href="resource.externalUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="mt-7 flex w-full items-center justify-center rounded-full bg-yen-gold px-6 py-4 font-display text-sm font-bold text-black transition duration-300 hover:-translate-y-1 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                :aria-label="`Open ${resource.title} — opens in a new tab`"
              >
                Access Resource

                <span
                  class="ml-3"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </a>


              <!-- =================================
                   UNAVAILABLE
              ================================== -->

              <div
                v-else
                class="mt-7"
              >
                <button
                  type="button"
                  disabled
                  class="flex w-full cursor-not-allowed items-center justify-center rounded-full bg-white/10 px-6 py-4 font-display text-sm font-bold text-white/45"
                >
                  Resource Unavailable
                </button>

                <p
                  class="mt-3 text-center font-body text-xs leading-5 text-white/40"
                >
                  A downloadable file or official external link
                  is not currently available for this resource.
                </p>
              </div>


              <!-- Back -->

              <RouterLink
                :to="{ name: 'resources' }"
                class="mt-4 flex w-full items-center justify-center rounded-full border border-white/20 px-6 py-3.5 font-display text-xs font-bold text-white transition hover:border-yen-gold hover:text-yen-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yen-gold"
              >
                ← Browse Resources
              </RouterLink>
            </div>


            <!-- Notice -->

            <div
              class="bg-yen-gold px-6 py-5 sm:px-8"
            >
              <p
                class="font-body text-xs leading-6 text-black/70"
              >
                YEN-Liberia resources should only be downloaded or
                accessed through verified links published on this
                website or through trusted partner institutions.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </section>


    <!-- ========================================
         RELATED RESOURCES
    ========================================= -->

    <section
      v-if="relatedResources.length"
      class="bg-[#f7f7f5]"
    >
      <div
        class="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24"
      >
        <!-- Header -->

        <div
          class="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p
              class="font-display text-[10px] font-extrabold uppercase tracking-[0.18em] text-yen-red sm:text-xs"
            >
              Keep Learning
            </p>

            <h2
              class="mt-3 font-display text-3xl font-extrabold leading-tight text-black sm:text-4xl"
            >
              Related resources
            </h2>
          </div>


          <RouterLink
            :to="{ name: 'resources' }"
            class="inline-flex items-center gap-2 rounded-sm font-display text-sm font-bold text-black transition hover:text-yen-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yen-red"
          >
            View All Resources

            <span
              aria-hidden="true"
            >
              →
            </span>
          </RouterLink>
        </div>


        <!-- Cards -->

        <div
          class="mt-9 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          <article
            v-for="item in relatedResources"
            :key="item.id"
            class="group flex h-full flex-col overflow-hidden rounded-[1.6rem] bg-white transition duration-300 hover:-translate-y-2 hover:shadow-xl"
          >
            <!-- Image -->

            <div
              class="relative h-[220px] overflow-hidden sm:h-[240px]"
            >
              <img
                :src="item.image"
                :alt="item.title"
                loading="lazy"
                class="h-full w-full object-cover object-center transition duration-700 group-hover:scale-105"
              />

              <div
                class="absolute inset-0 bg-linear-to-t from-black/65 via-transparent to-transparent"
                aria-hidden="true"
              ></div>


              <span
                v-if="item.category"
                class="absolute left-4 top-4 rounded-full bg-yen-gold px-3 py-2 font-display text-[9px] font-extrabold uppercase text-black"
              >
                {{ item.category }}
              </span>
            </div>


            <!-- Body -->

            <div
              class="flex flex-1 flex-col p-6"
            >
              <div
                class="flex flex-wrap items-center gap-3"
              >
                <span
                  v-if="item.type"
                  class="font-display text-[9px] font-extrabold uppercase tracking-[0.14em] text-yen-red"
                >
                  {{ item.type }}
                </span>

                <span
                  v-if="
                    item.type &&
                    item.format
                  "
                  class="h-1 w-1 rounded-full bg-gray-300"
                  aria-hidden="true"
                ></span>

                <span
                  v-if="item.format"
                  class="font-display text-xs text-gray-400"
                >
                  {{ item.format }}
                </span>
              </div>


              <h3
                class="mt-3 font-display text-xl font-bold leading-snug text-black"
              >
                {{ item.title }}
              </h3>


              <p
                v-if="item.summary"
                class="mt-4 font-body text-sm leading-7 text-gray-600"
              >
                {{ item.summary }}
              </p>


              <div
                class="mt-auto pt-6"
              >
                <RouterLink
                  :to="{
                    name: 'resource-detail',
                    params: {
                      slug: item.slug,
                    },
                  }"
                  class="flex items-center justify-between rounded-xl bg-black px-5 py-4 font-display text-sm font-bold text-white transition group-hover:bg-yen-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yen-red"
                >
                  View Resource

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
      </div>
    </section>


    <!-- ========================================
         FINAL CTA
    ========================================= -->

    <section
      class="bg-white"
    >
      <div
        class="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24"
      >
        <div
          class="relative overflow-hidden rounded-[1.7rem] bg-black p-7 sm:rounded-[2rem] sm:p-10 lg:p-14"
        >
          <!-- Decoration -->

          <div
            class="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-yen-gold/10"
            aria-hidden="true"
          ></div>


          <div
            class="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center"
          >
            <!-- Copy -->

            <div
              class="max-w-3xl"
            >
              <p
                class="font-display text-[10px] font-extrabold uppercase tracking-[0.18em] text-yen-gold sm:text-xs"
              >
                Build Your Business
              </p>

              <h2
                class="mt-4 font-display text-2xl font-extrabold leading-tight text-white sm:text-4xl"
              >
                Explore more tools for your entrepreneurial journey.
              </h2>

              <p
                class="mt-4 max-w-2xl font-body text-sm leading-7 text-white/60 sm:text-base"
              >
                Browse practical business resources or explore
                YEN-Liberia programs supporting entrepreneurs
                across Liberia.
              </p>
            </div>


            <!-- CTAs -->

            <div
              class="flex flex-col gap-3 sm:flex-row lg:flex-col"
            >
              <RouterLink
                :to="{ name: 'resources' }"
                class="inline-flex w-full items-center justify-center rounded-full bg-yen-gold px-7 py-4 font-display text-sm font-bold text-black transition duration-300 hover:-translate-y-1 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:w-auto sm:min-w-[220px]"
              >
                Explore Resources

                <span
                  class="ml-3"
                  aria-hidden="true"
                >
                  →
                </span>
              </RouterLink>


              <RouterLink
                :to="{ name: 'programs' }"
                class="inline-flex w-full items-center justify-center rounded-full border border-white/25 px-7 py-4 font-display text-sm font-bold text-white transition hover:border-yen-gold hover:text-yen-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yen-gold sm:w-auto sm:min-w-[220px]"
              >
                Explore Programs
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>


  <!-- ==========================================
       RESOURCE NOT FOUND
  =========================================== -->

  <main
    v-else
    class="relative flex min-h-[70vh] items-center overflow-hidden bg-white px-5 py-20 text-center"
  >
    <!-- Decorations -->

    <div
      class="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-yen-gold/15 blur-3xl"
      aria-hidden="true"
    ></div>

    <div
      class="pointer-events-none absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-yen-red/10 blur-3xl"
      aria-hidden="true"
    ></div>


    <div
      class="relative mx-auto max-w-2xl"
    >
      <p
        class="font-display text-7xl font-black text-yen-gold sm:text-8xl"
        aria-hidden="true"
      >
        404
      </p>

      <p
        class="mt-4 font-display text-[10px] font-extrabold uppercase tracking-[0.2em] text-yen-red sm:text-xs"
      >
        Resource Not Found
      </p>

      <h1
        class="mt-4 font-display text-3xl font-extrabold leading-tight text-black sm:text-4xl"
      >
        We couldn't find this resource.
      </h1>

      <p
        class="mx-auto mt-4 max-w-lg font-body text-sm leading-7 text-gray-600 sm:text-base"
      >
        The resource may have been removed, unpublished,
        or the link may be incorrect.
      </p>


      <div
        class="mt-8 flex flex-col justify-center gap-3 sm:flex-row"
      >
        <RouterLink
          :to="{ name: 'resources' }"
          class="inline-flex items-center justify-center rounded-full bg-black px-7 py-4 font-display text-sm font-bold text-white transition hover:bg-yen-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yen-red"
        >
          Browse Resources

          <span
            class="ml-3 text-yen-gold"
            aria-hidden="true"
          >
            →
          </span>
        </RouterLink>


        <RouterLink
          :to="{ name: 'home' }"
          class="inline-flex items-center justify-center rounded-full border border-black px-7 py-4 font-display text-sm font-bold text-black transition hover:bg-yen-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yen-red"
        >
          Return Home
        </RouterLink>
      </div>
    </div>
  </main>
</template>