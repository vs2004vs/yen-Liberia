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
| SAFE DATA HELPERS
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
| RELATED RESOURCES
|--------------------------------------------------------------------------
|
| Prefer resources from the same category,
| then fill remaining spaces with other resources.
|
*/

const relatedResources = computed(() => {
  if (!resource.value) {
    return []
  }

  const currentId =
    resource.value.id

  const others = resources.filter(
    (item) =>
      item.id !== currentId,
  )

  const sameCategory =
    others.filter(
      (item) =>
        item.category ===
        resource.value.category,
    )

  const differentCategory =
    others.filter(
      (item) =>
        item.category !==
        resource.value.category,
    )

  return [
    ...sameCategory,
    ...differentCategory,
  ].slice(0, 3)
})


/*
|--------------------------------------------------------------------------
| DYNAMIC DOCUMENT TITLE
|--------------------------------------------------------------------------
*/

watchEffect(() => {
  const siteName =
    "Youth Entrepreneurs Network–Liberia"

  document.title = resource.value
    ? `${resource.value.title} | ${siteName}`
    : `Resource Not Found | ${siteName}`
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
      <!-- Background -->

      <img
        :src="resource.image"
        :alt="resource.title"
        class="absolute inset-0 h-full w-full object-cover object-center"
      />


      <!-- Contrast -->

      <div
        class="absolute inset-0 bg-linear-to-r from-black/90 via-black/65 to-black/25 sm:from-black/85 sm:via-black/55 sm:to-black/10"
      ></div>

      <div
        class="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/20"
      ></div>


      <!-- Content -->

      <div
        class="relative z-10 mx-auto flex min-h-[540px] max-w-7xl items-center px-5 py-16 sm:min-h-[580px] sm:px-6 sm:py-20 lg:min-h-[620px] lg:px-8"
      >
        <div class="w-full max-w-4xl">

          <!-- Breadcrumb -->

          <nav
            class="mb-6 flex flex-wrap items-center gap-3 font-display text-xs font-bold sm:mb-8"
            aria-label="Breadcrumb"
          >
            <RouterLink
              :to="{ name: 'home' }"
              class="text-white/55 transition hover:text-yen-gold"
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
              class="text-white/55 transition hover:text-yen-gold"
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
              {{
                resource.type ||
                resource.title
              }}
            </span>
          </nav>


          <!-- Metadata -->

          <div
            class="flex flex-wrap gap-3"
          >
            <span
              v-if="resource.type"
              class="rounded-full bg-yen-gold px-4 py-2 font-display text-[10px] font-extrabold uppercase tracking-wide text-black"
            >
              {{ resource.type }}
            </span>

            <span
              v-if="resource.format"
              class="rounded-full border border-white/25 bg-black/20 px-4 py-2 font-display text-[10px] font-bold uppercase tracking-wide text-white backdrop-blur-md"
            >
              {{ resource.format }}
            </span>
          </div>


          <!-- Title -->

          <h1
            class="mt-6 max-w-4xl font-display text-[38px] font-extrabold leading-[1.06] tracking-tight text-white min-[390px]:text-[44px] sm:text-5xl lg:text-6xl"
          >
            {{ resource.title }}
          </h1>


          <!-- Summary -->

          <p
            v-if="resource.summary"
            class="mt-6 max-w-2xl font-body text-sm leading-7 text-white/80 sm:text-lg sm:leading-8"
          >
            {{ resource.summary }}
          </p>
        </div>
      </div>


      <!-- Accent -->

      <div
        class="absolute bottom-0 left-0 z-20 h-1 w-full bg-linear-to-r from-yen-red via-yen-gold to-yen-red"
      ></div>
    </section>


    <!-- ========================================
         RESOURCE CONTENT
    ========================================= -->

    <section class="bg-white">
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

          <p
            v-if="resource.description"
            class="mt-6 font-body text-sm leading-8 text-gray-600 sm:text-base"
          >
            {{ resource.description }}
          </p>


          <!-- =================================
               CONTENTS
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
              What's Included
            </h3>

            <ol
              class="mt-6 grid gap-4 sm:grid-cols-2"
            >
              <li
                v-for="(item, index) in contents"
                :key="`${index}-${item}`"
                class="flex h-full items-start gap-4 rounded-[1.3rem] bg-[#f7f7f5] p-5 sm:p-6"
              >
                <span
                  class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-yen-gold font-display text-xs font-bold text-black"
                  aria-hidden="true"
                >
                  {{
                    String(index + 1)
                      .padStart(2, "0")
                  }}
                </span>

                <span
                  class="font-display text-sm font-semibold leading-6 text-black"
                >
                  {{ item }}
                </span>
              </li>
            </ol>
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
                    class="mt-2 font-display text-sm font-semibold leading-6 text-white"
                  >
                    {{ resource.format }}
                  </dd>
                </div>


                <!-- Audience -->

                <div
                  v-if="resource.audience"
                  class="py-5 first:pt-0"
                >
                  <dt
                    class="font-display text-[9px] font-bold uppercase tracking-wider text-white/35 sm:text-[10px]"
                  >
                    Designed For
                  </dt>

                  <dd
                    class="mt-2 font-display text-sm font-semibold leading-6 text-white"
                  >
                    {{ resource.audience }}
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
                    Status
                  </dt>

                  <dd
                    class="mt-2 font-display text-sm font-bold leading-6 text-yen-gold"
                  >
                    {{ resource.status }}
                  </dd>
                </div>
              </dl>


              <!-- =================================
                   LOCAL DOWNLOAD
              ================================== -->

              <a
                v-if="resource.fileUrl"
                :href="resource.fileUrl"
                download
                class="mt-7 flex w-full items-center justify-center rounded-full bg-yen-gold px-7 py-4 font-display text-sm font-bold text-black transition duration-300 hover:-translate-y-1 hover:bg-white"
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
                v-else-if="resource.externalUrl"
                :href="resource.externalUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="mt-7 flex w-full items-center justify-center rounded-full bg-yen-gold px-7 py-4 font-display text-sm font-bold text-black transition duration-300 hover:-translate-y-1 hover:bg-white"
                :aria-label="`Open ${resource.title} — opens external resource in a new tab`"
              >
                Open Resource

                <span
                  class="ml-3"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </a>


              <!-- Resource unavailable -->

              <div
                v-else
                class="mt-7 rounded-xl border border-white/10 bg-white/5 p-5 text-center"
              >
                <p
                  class="font-display text-xs font-bold text-white/65"
                >
                  Resource file not currently available
                </p>

                <p
                  class="mt-2 font-body text-xs leading-6 text-white/40"
                >
                  No approved download or external resource link
                  has been attached to this entry.
                </p>
              </div>


              <!-- Back -->

              <RouterLink
                :to="{ name: 'resources' }"
                class="mt-4 flex w-full items-center justify-center rounded-full border border-white/20 px-6 py-3.5 font-display text-xs font-bold text-white transition hover:border-yen-gold hover:text-yen-gold"
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
                Use resources according to the guidance,
                attribution requirements and terms provided by
                YEN-Liberia or the original publisher.
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
            class="inline-flex items-center gap-2 font-display text-sm font-bold text-black transition hover:text-yen-red"
          >
            View Resource Library

            <span aria-hidden="true">
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
              class="relative h-[220px] overflow-hidden"
            >
              <img
                :src="item.image"
                :alt="item.title"
                loading="lazy"
                class="h-full w-full object-cover object-center transition duration-700 group-hover:scale-105"
              />

              <div
                class="absolute inset-0 bg-linear-to-t from-black/65 via-transparent to-transparent"
              ></div>


              <span
                v-if="item.type"
                class="absolute left-4 top-4 rounded-full bg-yen-gold px-3 py-2 font-display text-[9px] font-extrabold uppercase text-black"
              >
                {{ item.type }}
              </span>
            </div>


            <!-- Body -->

            <div
              class="flex flex-1 flex-col p-6"
            >
              <p
                v-if="item.category"
                class="font-display text-[9px] font-extrabold uppercase tracking-[0.14em] text-yen-red"
              >
                {{ item.category }}
              </p>

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


              <div class="mt-auto pt-6">
                <RouterLink
                  :to="{
                    name: 'resource-detail',
                    params: {
                      slug: item.slug,
                    },
                  }"
                  class="flex items-center justify-between rounded-xl bg-black px-5 py-4 font-display text-sm font-bold text-white transition group-hover:bg-yen-red"
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

    <section class="bg-white">
      <div
        class="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24"
      >
        <div
          class="relative overflow-hidden rounded-[1.7rem] bg-black p-7 sm:rounded-[2rem] sm:p-10 lg:p-14"
        >
          <div
            class="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-yen-gold/10"
          ></div>


          <div
            class="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center"
          >
            <div class="max-w-3xl">
              <p
                class="font-display text-[10px] font-extrabold uppercase tracking-[0.18em] text-yen-gold sm:text-xs"
              >
                Build With Better Tools
              </p>

              <h2
                class="mt-4 font-display text-2xl font-extrabold leading-tight text-white sm:text-4xl"
              >
                Explore more resources for your business.
              </h2>

              <p
                class="mt-4 max-w-2xl font-body text-sm leading-7 text-white/60 sm:text-base"
              >
                Browse the full resource library or tell
                YEN-Liberia what kind of business tool would be
                useful to you.
              </p>
            </div>


            <div
              class="flex flex-col gap-3 sm:flex-row lg:flex-col"
            >
              <RouterLink
                :to="{ name: 'resources' }"
                class="inline-flex w-full items-center justify-center rounded-full bg-yen-gold px-7 py-4 font-display text-sm font-bold text-black transition duration-300 hover:-translate-y-1 hover:bg-white sm:w-auto sm:min-w-[220px]"
              >
                Browse Resources

                <span
                  class="ml-3"
                  aria-hidden="true"
                >
                  →
                </span>
              </RouterLink>

              <RouterLink
                :to="{ name: 'contact' }"
                class="inline-flex w-full items-center justify-center rounded-full border border-white/25 px-7 py-4 font-display text-sm font-bold text-white transition hover:border-yen-gold hover:text-yen-gold sm:w-auto sm:min-w-[220px]"
              >
                Request a Resource
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>


  <!-- ==========================================
       INVALID RESOURCE
  =========================================== -->

  <main
    v-else
    class="relative flex min-h-[70vh] items-center overflow-hidden bg-white px-5 py-20 text-center"
  >
    <div
      class="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-yen-gold/15 blur-3xl"
    ></div>

    <div
      class="pointer-events-none absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-yen-red/10 blur-3xl"
    ></div>


    <div
      class="relative mx-auto max-w-2xl"
    >
      <p
        class="font-display text-7xl font-black text-yen-gold sm:text-8xl"
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
        The resource may have been removed, unpublished, or the
        link may be incorrect.
      </p>


      <div
        class="mt-8 flex flex-col justify-center gap-3 sm:flex-row"
      >
        <RouterLink
          :to="{ name: 'resources' }"
          class="inline-flex items-center justify-center rounded-full bg-black px-7 py-4 font-display text-sm font-bold text-white transition hover:bg-yen-red"
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
          class="inline-flex items-center justify-center rounded-full border border-black px-7 py-4 font-display text-sm font-bold text-black transition hover:bg-yen-gold"
        >
          Return Home
        </RouterLink>
      </div>
    </div>
  </main>
</template>