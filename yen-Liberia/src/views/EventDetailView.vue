<script setup>
import {
  computed,
  watchEffect,
} from "vue"

import { useRoute } from "vue-router"

import {
  events,
  getEventBySlug,
} from "@/data/events"

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
| CURRENT EVENT
|--------------------------------------------------------------------------
*/

const event = computed(() => {
  const slug = String(
    route.params.slug ?? "",
  )

  return getEventBySlug(slug)
})


/*
|--------------------------------------------------------------------------
| SAFE DATA HELPERS
|--------------------------------------------------------------------------
*/

const objectives = computed(() => {
  return Array.isArray(
    event.value?.objectives,
  )
    ? event.value.objectives
    : []
})


const highlights = computed(() => {
  return Array.isArray(
    event.value?.highlights,
  )
    ? event.value.highlights
    : []
})


const organizers = computed(() => {
  return Array.isArray(
    event.value?.organizers,
  )
    ? event.value.organizers
    : []
})


const gallery = computed(() => {
  return Array.isArray(
    event.value?.gallery,
  )
    ? event.value.gallery.filter(Boolean)
    : []
})


/*
|--------------------------------------------------------------------------
| FORMATTED LOCATION
|--------------------------------------------------------------------------
*/

const fullLocation = computed(() => {
  if (!event.value) {
    return ""
  }

  return [
    event.value.location,
    event.value.city,
    event.value.country,
  ]
    .filter(Boolean)
    .join(", ")
})


/*
|--------------------------------------------------------------------------
| RELATED EVENTS
|--------------------------------------------------------------------------
|
| Priority:
|
| 1. Same category
| 2. Other events
|
*/

const relatedEvents = computed(() => {
  if (!event.value) {
    return []
  }

  const currentId =
    event.value.id

  const others =
    events.filter(
      (item) =>
        item.id !== currentId,
    )

  const sameCategory =
    others.filter(
      (item) =>
        item.category ===
        event.value.category,
    )

  const otherCategories =
    others.filter(
      (item) =>
        item.category !==
        event.value.category,
    )

  return [
    ...sameCategory,
    ...otherCategories,
  ].slice(0, 3)
})


/*
|--------------------------------------------------------------------------
| EVENT SEO
|--------------------------------------------------------------------------
|
| The router initially provides generic metadata:
|
| Event | Youth Entrepreneurs Network–Liberia
|
| Once the event record is available, this page replaces it with
| the actual event title, summary, image and canonical URL.
|
|--------------------------------------------------------------------------
*/

watchEffect(() => {
  /*
  |--------------------------------------------------------------------------
  | EVENT NOT FOUND
  |--------------------------------------------------------------------------
  */

  if (!event.value) {
    setPageSeo({
      title:
        "Event Not Found",

      description:
        "The requested YEN-Liberia event could not be found.",

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
  | EVENT DESCRIPTION
  |--------------------------------------------------------------------------
  */

  const description =
    event.value.summary ||
    event.value.description ||
    event.value.theme ||
    "Learn more about this YEN-Liberia entrepreneurship event, its activities, organizers and highlights."


  /*
  |--------------------------------------------------------------------------
  | EVENT IMAGE
  |--------------------------------------------------------------------------
  |
  | Convert the local image path into a full public URL for
  | Open Graph and social-sharing metadata.
  |
  */

  const image =
    event.value.image
      ? new URL(
          event.value.image,
          "https://yen-lib.netlify.app",
        ).toString()
      : undefined


  /*
  |--------------------------------------------------------------------------
  | APPLY EVENT SEO
  |--------------------------------------------------------------------------
  */

  setPageSeo({
    title:
      event.value.title,

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
       VALID EVENT
  =========================================== -->

  <main
    v-if="event"
    class="w-full overflow-hidden"
  >

    <!-- ========================================
         HERO
    ========================================= -->

    <section
      class="relative isolate min-h-[600px] overflow-hidden sm:min-h-[640px] lg:min-h-[680px]"
    >
      <!-- Background -->

      <img
        :src="event.image"
        :alt="event.title"
        class="absolute inset-0 h-full w-full object-cover object-center"
      />


      <!-- Contrast -->

      <div
        class="absolute inset-0 bg-linear-to-r from-black/90 via-black/65 to-black/25 sm:from-black/85 sm:via-black/55 sm:to-black/10"
      ></div>

      <div
        class="absolute inset-0 bg-linear-to-t from-black/75 via-transparent to-black/20"
      ></div>


      <!-- Content -->

      <div
        class="relative z-10 mx-auto flex min-h-[600px] max-w-7xl items-end px-5 pb-16 pt-24 sm:min-h-[640px] sm:px-6 sm:pb-20 lg:min-h-[680px] lg:px-8"
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
              :to="{ name: 'events' }"
              class="text-white/55 transition hover:text-yen-gold"
            >
              Events
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
                event.shortTitle ||
                event.title
              }}
            </span>
          </nav>


          <!-- Status -->

          <div
            class="flex flex-wrap gap-3"
          >
            <span
              v-if="event.category"
              class="rounded-full bg-yen-gold px-4 py-2 font-display text-[10px] font-extrabold uppercase tracking-wider text-black"
            >
              {{ event.category }}
            </span>

            <span
              v-if="event.status"
              class="rounded-full border border-white/25 bg-black/20 px-4 py-2 font-display text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md"
            >
              {{ event.status }} Event
            </span>
          </div>


          <!-- Title -->

          <h1
            class="mt-6 max-w-4xl font-display text-[38px] font-extrabold leading-[1.06] tracking-tight text-white min-[390px]:text-[44px] sm:text-6xl lg:text-7xl"
          >
            {{ event.title }}
          </h1>


          <!-- Theme -->

          <p
            v-if="event.theme"
            class="mt-5 max-w-3xl font-display text-base font-semibold italic leading-7 text-yen-gold sm:text-lg sm:leading-8"
          >
            “{{ event.theme }}”
          </p>


          <!-- Summary -->

          <p
            v-if="event.summary"
            class="mt-6 max-w-3xl font-body text-sm leading-7 text-white/80 sm:text-lg sm:leading-8"
          >
            {{ event.summary }}
          </p>
        </div>
      </div>


      <!-- Accent -->

      <div
        class="absolute bottom-0 left-0 z-20 h-1 w-full bg-linear-to-r from-yen-red via-yen-gold to-yen-red"
      ></div>
    </section>


    <!-- ========================================
         EVENT INFORMATION
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
            Event Overview
          </p>

          <h2
            class="mt-4 font-display text-3xl font-extrabold leading-tight text-black min-[390px]:text-4xl sm:text-5xl"
          >
            About the event
          </h2>

          <p
            v-if="event.description"
            class="mt-6 font-body text-sm leading-8 text-gray-600 sm:text-base"
          >
            {{ event.description }}
          </p>


          <!-- =================================
               OBJECTIVES
          ================================== -->

          <section
            v-if="objectives.length"
            class="mt-10 sm:mt-12"
            aria-labelledby="event-objectives-heading"
          >
            <h3
              id="event-objectives-heading"
              class="font-display text-2xl font-bold text-black"
            >
              Event Objectives
            </h3>

            <ul
              class="mt-6 space-y-4"
            >
              <li
                v-for="objective in objectives"
                :key="objective"
                class="flex items-start gap-4"
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
                  {{ objective }}
                </span>
              </li>
            </ul>
          </section>


          <!-- =================================
               HIGHLIGHTS
          ================================== -->

          <section
            v-if="highlights.length"
            class="mt-10 sm:mt-12"
            aria-labelledby="event-highlights-heading"
          >
            <h3
              id="event-highlights-heading"
              class="font-display text-2xl font-bold text-black"
            >
              Key Themes & Highlights
            </h3>

            <ol
              class="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
            >
              <li
                v-for="(highlight, index) in highlights"
                :key="highlight"
                class="flex h-full flex-col rounded-[1.4rem] bg-[#f7f7f5] p-6"
              >
                <span
                  class="font-display text-sm font-extrabold text-yen-red"
                  aria-hidden="true"
                >
                  {{
                    String(index + 1)
                      .padStart(2, "0")
                  }}
                </span>

                <span
                  class="mt-3 font-display text-sm font-bold leading-6 text-black"
                >
                  {{ highlight }}
                </span>
              </li>
            </ol>
          </section>


          <!-- =================================
               ORGANIZERS
          ================================== -->

          <section
            v-if="organizers.length"
            class="mt-10 sm:mt-12"
            aria-labelledby="event-organizers-heading"
          >
            <h3
              id="event-organizers-heading"
              class="font-display text-2xl font-bold text-black"
            >
              Organizers & Collaborators
            </h3>

            <ul
              class="mt-6 flex flex-wrap gap-3"
            >
              <li
                v-for="organizer in organizers"
                :key="organizer"
                class="rounded-full border border-gray-200 bg-white px-4 py-3 font-display text-xs font-bold leading-5 text-black shadow-sm sm:px-5"
              >
                {{ organizer }}
              </li>
            </ul>
          </section>


          <!-- =================================
               EVENT GALLERY
          ================================== -->

          <section
            v-if="gallery.length"
            class="mt-10 sm:mt-12"
            aria-labelledby="event-gallery-heading"
          >
            <h3
              id="event-gallery-heading"
              class="font-display text-2xl font-bold text-black"
            >
              Event Gallery
            </h3>

            <div
              class="mt-6 grid gap-4 sm:grid-cols-2"
            >
              <img
                v-for="(image, index) in gallery"
                :key="image"
                :src="image"
                :alt="`${event.title} event photo ${index + 1}`"
                loading="lazy"
                class="h-[240px] w-full rounded-[1.4rem] object-cover object-center sm:h-[300px]"
              />
            </div>
          </section>
        </div>


        <!-- ==================================
             SIDEBAR
        =================================== -->

        <aside
          aria-label="Event details"
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
                Event Details
              </p>


              <dl
                class="mt-7 divide-y divide-white/10"
              >
                <!-- Date -->

                <div
                  v-if="event.date"
                  class="py-5 first:pt-0"
                >
                  <dt
                    class="font-display text-[9px] font-bold uppercase tracking-wider text-white/35 sm:text-[10px]"
                  >
                    Date
                  </dt>

                  <dd
                    class="mt-2 font-display text-sm font-semibold leading-6 text-white"
                  >
                    {{ event.date }}
                  </dd>
                </div>


                <!-- Time / duration -->

                <div
                  v-if="event.time"
                  class="py-5 first:pt-0"
                >
                  <dt
                    class="font-display text-[9px] font-bold uppercase tracking-wider text-white/35 sm:text-[10px]"
                  >
                    Time / Duration
                  </dt>

                  <dd
                    class="mt-2 font-display text-sm font-semibold leading-6 text-white"
                  >
                    {{ event.time }}
                  </dd>
                </div>


                <!-- Location -->

                <div
                  v-if="fullLocation"
                  class="py-5 first:pt-0"
                >
                  <dt
                    class="font-display text-[9px] font-bold uppercase tracking-wider text-white/35 sm:text-[10px]"
                  >
                    Venue
                  </dt>

                  <dd
                    class="mt-2 font-display text-sm font-semibold leading-6 text-white"
                  >
                    {{ fullLocation }}
                  </dd>
                </div>


                <!-- Participants -->

                <div
                  v-if="
                    event.participants ||
                    event.participantLabel
                  "
                  class="py-5 first:pt-0"
                >
                  <dt
                    class="font-display text-[9px] font-bold uppercase tracking-wider text-white/35 sm:text-[10px]"
                  >
                    Participation
                  </dt>

                  <dd>
                    <p
                      v-if="event.participants"
                      class="mt-2 font-display text-3xl font-extrabold text-yen-gold"
                    >
                      {{ event.participants }}
                    </p>

                    <p
                      v-if="event.participantLabel"
                      class="mt-1 font-display text-xs leading-5 text-white/45"
                    >
                      {{ event.participantLabel }}
                    </p>
                  </dd>
                </div>


                <!-- Status -->

                <div
                  v-if="event.status"
                  class="py-5 first:pt-0"
                >
                  <dt
                    class="font-display text-[9px] font-bold uppercase tracking-wider text-white/35 sm:text-[10px]"
                  >
                    Event Status
                  </dt>

                  <dd>
                    <span
                      class="mt-2 inline-flex rounded-full bg-white/10 px-3 py-2 font-display text-[10px] font-bold uppercase text-white"
                    >
                      {{ event.status }}
                    </span>
                  </dd>
                </div>
              </dl>


              <!-- =================================
                   REGISTRATION
              ================================== -->

              <a
                v-if="
                  event.status === 'Upcoming' &&
                  event.registrationUrl
                "
                :href="event.registrationUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="mt-7 flex w-full items-center justify-center rounded-full bg-yen-gold px-7 py-4 font-display text-sm font-bold text-black transition duration-300 hover:-translate-y-1 hover:bg-white"
                :aria-label="`Register for ${event.title} — opens registration in a new tab`"
              >
                Register for Event

                <span
                  class="ml-3"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </a>


              <!-- Upcoming but link unavailable -->

              <div
                v-else-if="
                  event.status === 'Upcoming'
                "
                class="mt-7"
              >
                <button
                  type="button"
                  disabled
                  class="flex w-full cursor-not-allowed items-center justify-center rounded-full bg-white/10 px-7 py-4 font-display text-sm font-bold text-white/45"
                >
                  Registration Not Open Yet
                </button>

                <p
                  class="mt-3 text-center font-body text-xs leading-5 text-white/40"
                >
                  An official registration link has not yet
                  been published on this page.
                </p>
              </div>


              <!-- Past -->

              <div
                v-else-if="
                  event.status === 'Past'
                "
                class="mt-7 rounded-xl border border-white/10 bg-white/5 p-4 text-center"
              >
                <p
                  class="font-display text-xs font-semibold text-white/55"
                >
                  This event has concluded.
                </p>
              </div>


              <!-- Source -->

              <a
                v-if="event.sourceUrl"
                :href="event.sourceUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="mt-4 flex w-full items-center justify-center rounded-full border border-white/20 px-6 py-3.5 font-display text-xs font-bold text-white transition hover:border-yen-gold hover:text-yen-gold"
                :aria-label="`View published coverage for ${event.title} — opens in a new tab`"
              >
                View Published Coverage

                <span
                  class="ml-2"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </a>


              <!-- Back -->

              <RouterLink
                :to="{ name: 'events' }"
                class="mt-4 flex w-full items-center justify-center rounded-full border border-white/20 px-6 py-3.5 font-display text-xs font-bold text-white transition hover:border-yen-gold hover:text-yen-gold"
              >
                ← Browse Events
              </RouterLink>
            </div>


            <!-- Notice -->

            <div
              class="bg-yen-gold px-6 py-5 sm:px-8"
            >
              <p
                class="font-body text-xs leading-6 text-black/70"
              >
                Registration details, schedules and attendance
                information should always be confirmed through
                YEN-Liberia or the event's official source.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </section>


    <!-- ========================================
         RELATED EVENTS
    ========================================= -->

    <section
      v-if="relatedEvents.length"
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
              Keep Exploring
            </p>

            <h2
              class="mt-3 font-display text-3xl font-extrabold leading-tight text-black sm:text-4xl"
            >
              More YEN events
            </h2>
          </div>


          <RouterLink
            :to="{ name: 'events' }"
            class="inline-flex items-center gap-2 font-display text-sm font-bold text-black transition hover:text-yen-red"
          >
            View All Events

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
            v-for="item in relatedEvents"
            :key="item.id"
            class="group flex h-full flex-col overflow-hidden rounded-[1.6rem] bg-white transition duration-300 hover:-translate-y-2 hover:shadow-xl"
          >
            <!-- Image -->

            <div
              class="relative h-[230px] overflow-hidden"
            >
              <img
                :src="item.image"
                :alt="item.title"
                loading="lazy"
                class="h-full w-full object-cover object-center transition duration-700 group-hover:scale-105"
              />

              <div
                class="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent"
              ></div>


              <!-- Status -->

              <span
                v-if="item.status"
                class="absolute left-4 top-4 rounded-full bg-yen-gold px-3 py-2 font-display text-[9px] font-extrabold uppercase text-black"
              >
                {{ item.status }}
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
                  v-if="item.category"
                  class="font-display text-[9px] font-extrabold uppercase tracking-wide text-yen-red"
                >
                  {{ item.category }}
                </span>

                <span
                  v-if="
                    item.category &&
                    item.date
                  "
                  class="h-1 w-1 rounded-full bg-gray-300"
                ></span>

                <span
                  v-if="item.date"
                  class="font-display text-xs text-gray-400"
                >
                  {{ item.date }}
                </span>
              </div>


              <h3
                class="mt-4 font-display text-xl font-bold leading-snug text-black"
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
                    name: 'event-detail',
                    params: {
                      slug: item.slug,
                    },
                  }"
                  class="flex items-center justify-between rounded-xl bg-black px-5 py-4 font-display text-sm font-bold text-white transition group-hover:bg-yen-red"
                >
                  {{
                    item.status === "Upcoming"
                      ? "View Event"
                      : "View Highlights"
                  }}

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
            <!-- Copy -->

            <div class="max-w-3xl">
              <p
                class="font-display text-[10px] font-extrabold uppercase tracking-[0.18em] text-yen-gold sm:text-xs"
              >
                Stay Connected
              </p>

              <h2
                class="mt-4 font-display text-2xl font-extrabold leading-tight text-white sm:text-4xl"
              >
                Don't miss the next YEN-Liberia event.
              </h2>

              <p
                class="mt-4 max-w-2xl font-body text-sm leading-7 text-white/60 sm:text-base"
              >
                Explore more activities or subscribe for
                announcements about workshops, summits,
                networking sessions and registrations.
              </p>
            </div>


            <!-- CTAs -->

            <div
              class="flex flex-col gap-3 sm:flex-row lg:flex-col"
            >
              <RouterLink
                :to="{ name: 'events' }"
                class="inline-flex w-full items-center justify-center rounded-full bg-yen-gold px-7 py-4 font-display text-sm font-bold text-black transition duration-300 hover:-translate-y-1 hover:bg-white sm:w-auto sm:min-w-[220px]"
              >
                Explore Events

                <span
                  class="ml-3"
                  aria-hidden="true"
                >
                  →
                </span>
              </RouterLink>


              <RouterLink
                :to="{
                  name: 'home',
                  hash: '#newsletter',
                }"
                class="inline-flex w-full items-center justify-center rounded-full border border-white/25 px-7 py-4 font-display text-sm font-bold text-white transition hover:border-yen-gold hover:text-yen-gold sm:w-auto sm:min-w-[220px]"
              >
                Get Event Updates
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>


  <!-- ==========================================
       INVALID EVENT
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
        Event Not Found
      </p>

      <h1
        class="mt-4 font-display text-3xl font-extrabold leading-tight text-black sm:text-4xl"
      >
        We couldn't find this event.
      </h1>

      <p
        class="mx-auto mt-4 max-w-lg font-body text-sm leading-7 text-gray-600 sm:text-base"
      >
        The event may have been removed, unpublished, or the
        link may be incorrect.
      </p>


      <div
        class="mt-8 flex flex-col justify-center gap-3 sm:flex-row"
      >
        <RouterLink
          :to="{ name: 'events' }"
          class="inline-flex items-center justify-center rounded-full bg-black px-7 py-4 font-display text-sm font-bold text-white transition hover:bg-yen-red"
        >
          Browse Events

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