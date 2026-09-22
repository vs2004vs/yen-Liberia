<script setup>
import {
  computed,
  ref,
} from "vue"

import {
  events,
  eventCategories,
  eventStatuses,
} from "@/data/events"


/*
|--------------------------------------------------------------------------
| FILTER STATE
|--------------------------------------------------------------------------
*/

const searchQuery = ref("")
const activeCategory = ref("All")
const activeStatus = ref("All")


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


const formatEventLocation = (event) => {
  return [
    event.location,
    event.city,
  ]
    .filter(Boolean)
    .join(", ")
}


/*
|--------------------------------------------------------------------------
| FILTER OPTIONS
|--------------------------------------------------------------------------
|
| Merge the configured category/status lists with whatever is
| actually present in events.js.
|
| This prevents a future event from being excluded from the
| filters simply because a manual filter list was not updated.
|
*/

const categories = computed(() => {
  const configured =
    Array.isArray(eventCategories)
      ? eventCategories.filter(
          (category) =>
            category &&
            category !== "All",
        )
      : []

  const fromEvents = events
    .map((event) => event.category)
    .filter(Boolean)

  return [
    "All",
    ...new Set([
      ...configured,
      ...fromEvents,
    ]),
  ]
})


const statuses = computed(() => {
  const configured =
    Array.isArray(eventStatuses)
      ? eventStatuses.filter(
          (status) =>
            status &&
            status !== "All",
        )
      : []

  const fromEvents = events
    .map((event) => event.status)
    .filter(Boolean)

  return [
    "All",
    ...new Set([
      ...configured,
      ...fromEvents,
    ]),
  ]
})


/*
|--------------------------------------------------------------------------
| FILTERED EVENTS
|--------------------------------------------------------------------------
*/

const filteredEvents = computed(() => {
  const query = normalizeText(
    searchQuery.value,
  )

  return events.filter((event) => {
    const matchesCategory =
      activeCategory.value === "All" ||
      event.category ===
        activeCategory.value

    const matchesStatus =
      activeStatus.value === "All" ||
      event.status ===
        activeStatus.value

    const searchableContent = [
      event.title,
      event.category,
      event.status,
      event.location,
      event.city,
      event.summary,
      event.theme,
      event.date,
    ]
      .map(normalizeText)
      .join(" ")

    const matchesSearch =
      !query ||
      searchableContent.includes(query)

    return (
      matchesCategory &&
      matchesStatus &&
      matchesSearch
    )
  })
})


const clearFilters = () => {
  searchQuery.value = ""
  activeCategory.value = "All"
  activeStatus.value = "All"
}


/*
|--------------------------------------------------------------------------
| STATUS BADGE
|--------------------------------------------------------------------------
*/

const statusClasses = (status) => {
  if (status === "Upcoming") {
    return "bg-yen-red text-white"
  }

  return "bg-yen-gold text-black"
}
</script>


<template>
  <main class="w-full overflow-hidden">

    <!-- ========================================
         PAGE HERO
    ========================================= -->

    <section
      class="relative isolate min-h-[540px] overflow-hidden sm:min-h-[560px] lg:min-h-[580px]"
    >
      <!-- Background -->

      <img
        src="/images/hero/hero-1.jpg"
        alt="YEN-Liberia events"
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
              Events
            </span>
          </div>


          <!-- Label -->

          <p
            class="font-display text-[10px] font-extrabold uppercase tracking-[0.2em] text-yen-gold sm:text-xs"
          >
            Events & Activities
          </p>


          <!-- Heading -->

          <h1
            class="mt-5 max-w-4xl font-display text-[40px] font-extrabold leading-[1.05] tracking-tight text-white min-[390px]:text-[44px] sm:text-6xl lg:text-7xl"
          >
            Where entrepreneurs

            <span class="text-yen-gold">
              connect, learn and grow.
            </span>
          </h1>


          <!-- Description -->

          <p
            class="mt-6 max-w-2xl font-body text-sm leading-7 text-white/80 sm:mt-7 sm:text-lg sm:leading-8"
          >
            Discover YEN-Liberia summits, workshops,
            conferences, networking events and practical
            entrepreneurship activities.
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
            Convening the Ecosystem
          </p>

          <h2
            class="mt-4 font-display text-3xl font-extrabold leading-tight text-black min-[390px]:text-4xl sm:text-5xl"
          >
            Connections can become

            <span class="text-yen-red">
              opportunities.
            </span>
          </h2>
        </div>


        <!-- Copy -->

        <div>
          <p
            class="font-body text-sm leading-8 text-gray-600 sm:text-base"
          >
            YEN-Liberia events bring entrepreneurs together
            with business leaders, development organizations,
            institutions, mentors and ecosystem partners.
          </p>

          <p
            class="mt-5 font-body text-sm leading-8 text-gray-600 sm:text-base"
          >
            From practical workshops to major entrepreneurship
            summits, our events are designed to create useful
            learning, stronger networks and meaningful business
            connections.
          </p>
        </div>
      </div>
    </section>


    <!-- ========================================
         EVENT DIRECTORY
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
            Explore Events
          </p>

          <h2
            class="mt-3 font-display text-3xl font-extrabold leading-tight text-black sm:text-4xl"
          >
            YEN activities
          </h2>
        </div>


        <!-- ==================================
             SEARCH PANEL
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
              for="event-search"
              class="sr-only"
            >
              Search YEN-Liberia events
            </label>


            <input
              id="event-search"
              v-model="searchQuery"
              type="search"
              autocomplete="off"
              placeholder="Search events, themes or activities..."
              class="w-full rounded-xl border border-white/15 bg-white/10 py-4 pl-12 pr-4 font-display text-sm text-white outline-none transition placeholder:text-white/35 focus:border-yen-gold focus:bg-white/15 sm:pl-14 sm:pr-5"
            />
          </div>


          <!-- =================================
               STATUS FILTERS
          ================================== -->

          <div
            class="mt-5 flex flex-wrap items-center gap-2"
            aria-label="Filter events by status"
          >
            <span
              class="mr-1 font-display text-[9px] font-bold uppercase tracking-[0.16em] text-white/40 sm:mr-2 sm:text-[10px]"
            >
              Status
            </span>

            <button
              v-for="status in statuses"
              :key="status"
              type="button"
              :aria-pressed="
                activeStatus === status
              "
              class="rounded-full px-3.5 py-2.5 font-display text-[11px] font-bold transition sm:px-4 sm:text-xs"
              :class="
                activeStatus === status
                  ? 'bg-yen-gold text-black'
                  : 'border border-white/15 text-white/65 hover:border-yen-gold hover:text-yen-gold'
              "
              @click="
                activeStatus = status
              "
            >
              {{ status }}
            </button>
          </div>


          <!-- =================================
               CATEGORY FILTERS
          ================================== -->

          <div
            class="mt-4 flex flex-wrap items-center gap-2"
            aria-label="Filter events by category"
          >
            <span
              class="mr-1 font-display text-[9px] font-bold uppercase tracking-[0.16em] text-white/40 sm:mr-2 sm:text-[10px]"
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
                  ? 'bg-yen-red text-white'
                  : 'border border-white/15 text-white/65 hover:border-yen-red hover:text-white'
              "
              @click="
                activeCategory = category
              "
            >
              {{ category }}
            </button>
          </div>
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
              {{ filteredEvents.length }}
            </span>

            {{
              filteredEvents.length === 1
                ? "event"
                : "events"
            }}
          </p>


          <button
            v-if="
              searchQuery ||
              activeStatus !== 'All' ||
              activeCategory !== 'All'
            "
            type="button"
            class="font-display text-xs font-bold text-yen-red transition hover:text-black sm:text-sm"
            @click="clearFilters"
          >
            Clear filters
          </button>
        </div>


        <!-- ==================================
             EVENT CARDS
        =================================== -->

        <div
          v-if="filteredEvents.length"
          class="mt-7 grid gap-6 md:grid-cols-2 lg:gap-7"
        >
          <article
            v-for="event in filteredEvents"
            :key="event.id"
            class="group flex h-full flex-col overflow-hidden rounded-[1.6rem] bg-white transition duration-300 hover:-translate-y-2 hover:shadow-2xl sm:rounded-[1.8rem]"
          >
            <!-- =================================
                 IMAGE
            ================================== -->

            <div
              class="relative h-[260px] overflow-hidden sm:h-[300px] lg:h-[340px]"
            >
              <img
                :src="event.image"
                :alt="event.title"
                loading="lazy"
                class="h-full w-full object-cover object-center transition duration-700 group-hover:scale-105"
              />

              <div
                class="absolute inset-0 bg-linear-to-t from-black/85 via-black/10 to-transparent"
              ></div>


              <!-- Status -->

              <div
                v-if="event.status"
                class="absolute left-4 top-4 sm:left-5 sm:top-5"
              >
                <span
                  class="rounded-full px-3 py-2 font-display text-[9px] font-extrabold uppercase tracking-wider sm:px-4 sm:text-[10px]"
                  :class="
                    statusClasses(event.status)
                  "
                >
                  {{ event.status }}
                </span>
              </div>


              <!-- Featured -->

              <div
                v-if="event.featured"
                class="absolute right-4 top-4 sm:right-5 sm:top-5"
              >
                <span
                  class="rounded-full bg-white px-3 py-2 font-display text-[9px] font-extrabold uppercase tracking-wider text-black sm:px-4"
                >
                  Featured
                </span>
              </div>


              <!-- Participant impact -->

              <div
                v-if="event.participants"
                class="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6"
              >
                <p
                  class="font-display text-3xl font-extrabold text-yen-gold sm:text-4xl"
                >
                  {{ event.participants }}
                </p>

                <p
                  v-if="event.participantLabel"
                  class="mt-1 max-w-[260px] font-display text-[10px] font-semibold leading-5 text-white/70 sm:text-xs"
                >
                  {{ event.participantLabel }}
                </p>
              </div>
            </div>


            <!-- =================================
                 BODY
            ================================== -->

            <div
              class="flex flex-1 flex-col p-6 sm:p-8"
            >
              <!-- Meta -->

              <div
                class="flex flex-wrap items-center gap-3"
              >
                <span
                  v-if="event.category"
                  class="font-display text-[9px] font-extrabold uppercase tracking-[0.14em] text-yen-red sm:text-[10px]"
                >
                  {{ event.category }}
                </span>

                <span
                  v-if="
                    event.category &&
                    event.date
                  "
                  class="h-1 w-1 rounded-full bg-gray-300"
                ></span>

                <span
                  v-if="event.date"
                  class="font-display text-[11px] font-semibold text-gray-400 sm:text-xs"
                >
                  {{ event.date }}
                </span>
              </div>


              <!-- Title -->

              <h3
                class="mt-4 font-display text-xl font-bold leading-snug text-black sm:text-2xl"
              >
                {{ event.title }}
              </h3>


              <!-- Theme -->

              <p
                v-if="event.theme"
                class="mt-3 font-display text-xs font-semibold italic leading-6 text-gray-500"
              >
                “{{ event.theme }}”
              </p>


              <!-- Summary -->

              <p
                class="mt-5 font-body text-sm leading-7 text-gray-600"
              >
                {{ event.summary }}
              </p>


              <!-- Push details to bottom -->

              <div class="mt-auto pt-6">

                <!-- Location -->

                <div
                  v-if="
                    formatEventLocation(event)
                  "
                  class="flex items-start gap-3 border-t border-gray-100 pt-6"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="mt-0.5 h-4 w-4 shrink-0 text-yen-red"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 21s7-5.333 7-12a7 7 0 1 0-14 0c0 6.667 7 12 7 12Zm0-9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                    />
                  </svg>

                  <span
                    class="font-display text-xs font-semibold leading-5 text-gray-500"
                  >
                    {{
                      formatEventLocation(
                        event,
                      )
                    }}
                  </span>
                </div>


                <!-- Detail route -->

                <RouterLink
                  :to="{
                    name: 'event-detail',
                    params: {
                      slug: event.slug,
                    },
                  }"
                  class="mt-6 flex items-center justify-between rounded-xl bg-black px-5 py-4 font-display text-sm font-bold text-white transition duration-300 group-hover:bg-yen-red"
                >
                  <span>
                    {{
                      event.status ===
                      "Upcoming"
                        ? "View Event"
                        : "View Event Highlights"
                    }}
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
          class="mt-8 rounded-[1.6rem] border border-dashed border-gray-300 bg-white px-5 py-14 text-center sm:rounded-[1.8rem] sm:px-6 sm:py-16"
        >
          <!-- Icon -->

          <div
            class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-yen-gold"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 7V3m8 4V3M5 11h14M5 5h14a1 1 0 0 1 1 1v14H4V6a1 1 0 0 1 1-1Z"
              />
            </svg>
          </div>


          <!-- Title -->

          <h3
            class="mt-5 font-display text-xl font-bold text-black"
          >
            {{
              activeStatus ===
              "Upcoming"
                ? "No upcoming events announced yet"
                : "No events found"
            }}
          </h3>


          <!-- Description -->

          <p
            class="mx-auto mt-3 max-w-lg font-body text-sm leading-7 text-gray-500"
          >
            {{
              activeStatus ===
              "Upcoming"
                ? "YEN-Liberia has not yet published details for its next event. Subscribe to receive an update when registration opens."
                : "Try changing your search or event filters."
            }}
          </p>


          <!-- Newsletter -->

          <RouterLink
            v-if="
              activeStatus ===
              'Upcoming'
            "
            :to="{
              name: 'home',
              hash: '#newsletter',
            }"
            class="mt-6 inline-flex rounded-full bg-black px-7 py-4 font-display text-sm font-bold text-white transition duration-300 hover:-translate-y-1 hover:bg-yen-red"
          >
            Get Event Updates

            <span
              class="ml-3 text-yen-gold"
            >
              →
            </span>
          </RouterLink>


          <!-- Clear filters -->

          <button
            v-else
            type="button"
            class="mt-5 font-display text-sm font-bold text-yen-red transition hover:text-black"
            @click="clearFilters"
          >
            View All Events
          </button>
        </div>
      </div>
    </section>


    <!-- ========================================
         UPCOMING CTA
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
              <div
                class="inline-flex items-center gap-2 rounded-full bg-black px-4 py-2"
              >
                <span
                  class="h-2 w-2 rounded-full bg-yen-red"
                ></span>

                <span
                  class="font-display text-[9px] font-extrabold uppercase tracking-[0.18em] text-white sm:text-[10px]"
                >
                  What's Next?
                </span>
              </div>


              <h2
                class="mt-5 font-display text-2xl font-extrabold leading-tight text-black sm:text-4xl"
              >
                Be the first to know about the next
                YEN-Liberia event.
              </h2>

              <p
                class="mt-4 max-w-2xl font-body text-sm leading-7 text-black/65 sm:text-base"
              >
                Subscribe for announcements about workshops,
                conferences, networking sessions, summits and
                entrepreneur registration opportunities.
              </p>
            </div>


            <!--
              Intentional homepage hash.

              The newsletter remains on the homepage,
              so this is not a temporary routing workaround.
            -->

            <RouterLink
              :to="{
                name: 'home',
                hash: '#newsletter',
              }"
              class="inline-flex w-full items-center justify-center rounded-full bg-black px-7 py-4 font-display text-sm font-bold text-white transition duration-300 hover:-translate-y-1 hover:bg-yen-red sm:w-auto sm:min-w-[220px]"
            >
              Get Event Updates

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