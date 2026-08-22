<script setup>
import { computed, ref } from "vue"

import {
  events,
  eventCategories,
  eventStatuses,
} from "@/data/events"

const searchQuery = ref("")
const activeCategory = ref("All")
const activeStatus = ref("All")

const filteredEvents = computed(() => {
  const query = searchQuery.value
    .toLowerCase()
    .trim()

  return events.filter((event) => {
    const matchesCategory =
      activeCategory.value === "All" ||
      event.category === activeCategory.value

    const matchesStatus =
      activeStatus.value === "All" ||
      event.status === activeStatus.value

    const matchesSearch =
      !query ||
      event.title.toLowerCase().includes(query) ||
      event.category.toLowerCase().includes(query) ||
      event.location.toLowerCase().includes(query) ||
      event.summary.toLowerCase().includes(query) ||
      event.theme.toLowerCase().includes(query)

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
</script>

<template>
  <main class="w-full">

    <!-- ========================================
         PAGE HERO
    ========================================= -->

    <section
      class="relative isolate min-h-[560px] overflow-hidden"
    >
      <img
        src="/images/hero/hero-1.jpg"
        alt="YEN-Liberia events"
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
              Events
            </span>
          </div>

          <p
            class="font-display text-xs font-extrabold uppercase tracking-[0.2em] text-yen-gold"
          >
            Events & Activities
          </p>

          <h1
            class="mt-5 max-w-4xl font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            Where entrepreneurs

            <span class="text-yen-gold">
              connect, learn and grow.
            </span>
          </h1>

          <p
            class="mt-7 max-w-2xl font-body text-base leading-8 text-white/75 sm:text-lg"
          >
            Discover YEN-Liberia summits, workshops,
            conferences, networking events and practical
            entrepreneurship activities.
          </p>
        </div>
      </div>

      <div
        class="absolute bottom-0 left-0 h-1 w-full bg-linear-to-r from-yen-red via-yen-gold to-yen-red"
      ></div>
    </section>


    <!-- ========================================
         INTRO
    ========================================= -->

    <section class="bg-white">
      <div
        class="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[0.85fr_1.15fr] lg:px-8 lg:py-24"
      >
        <div>
          <p
            class="font-display text-xs font-extrabold uppercase tracking-[0.18em] text-yen-red"
          >
            Convening the Ecosystem
          </p>

          <h2
            class="mt-4 font-display text-4xl font-extrabold leading-tight text-black sm:text-5xl"
          >
            Connections can become

            <span class="text-yen-red">
              opportunities.
            </span>
          </h2>
        </div>

        <div>
          <p
            class="font-body text-base leading-8 text-gray-600"
          >
            YEN-Liberia events bring entrepreneurs together
            with business leaders, development organizations,
            institutions, mentors and ecosystem partners.
          </p>

          <p
            class="mt-5 font-body text-base leading-8 text-gray-600"
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
         DIRECTORY
    ========================================= -->

    <section class="bg-[#f7f7f5]">
      <div
        class="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28"
      >

        <!-- Heading -->

        <div>
          <p
            class="font-display text-xs font-extrabold uppercase tracking-[0.18em] text-yen-red"
          >
            Explore Events
          </p>

          <h2
            class="mt-3 font-display text-3xl font-extrabold text-black sm:text-4xl"
          >
            YEN activities
          </h2>
        </div>


        <!-- ==================================
             SEARCH PANEL
        =================================== -->

        <div
          class="mt-10 rounded-[1.8rem] bg-black p-5 sm:p-7"
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
              placeholder="Search events, themes or activities..."
              class="w-full rounded-xl border border-white/15 bg-white/10 py-4 pl-14 pr-5 font-display text-sm text-white outline-none placeholder:text-white/35 focus:border-yen-gold"
            />
          </div>


          <!-- Status Filters -->

          <div
            class="mt-5 flex flex-wrap items-center gap-2"
          >
            <span
              class="mr-2 font-display text-[10px] font-bold uppercase tracking-[0.16em] text-white/40"
            >
              Status
            </span>

            <button
              v-for="status in eventStatuses"
              :key="status"
              type="button"
              class="rounded-full px-4 py-2.5 font-display text-xs font-bold transition"
              :class="
                activeStatus === status
                  ? 'bg-yen-gold text-black'
                  : 'border border-white/15 text-white/65 hover:border-yen-gold hover:text-yen-gold'
              "
              @click="activeStatus = status"
            >
              {{ status }}
            </button>
          </div>


          <!-- Categories -->

          <div
            class="mt-4 flex flex-wrap items-center gap-2"
          >
            <span
              class="mr-2 font-display text-[10px] font-bold uppercase tracking-[0.16em] text-white/40"
            >
              Category
            </span>

            <button
              v-for="category in eventCategories"
              :key="category"
              type="button"
              class="rounded-full px-4 py-2.5 font-display text-xs font-bold transition"
              :class="
                activeCategory === category
                  ? 'bg-yen-red text-white'
                  : 'border border-white/15 text-white/65 hover:border-yen-red hover:text-white'
              "
              @click="activeCategory = category"
            >
              {{ category }}
            </button>
          </div>
        </div>


        <!-- ==================================
             RESULTS
        =================================== -->

        <div
          class="mt-8 flex items-center justify-between gap-5"
        >
          <p
            class="font-display text-sm font-semibold text-gray-500"
          >
            Showing

            <span class="font-bold text-black">
              {{ filteredEvents.length }}
            </span>

            events
          </p>

          <button
            v-if="
              searchQuery ||
              activeStatus !== 'All' ||
              activeCategory !== 'All'
            "
            type="button"
            class="font-display text-sm font-bold text-yen-red"
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
          class="mt-7 grid gap-7 md:grid-cols-2"
        >
          <article
            v-for="event in filteredEvents"
            :key="event.id"
            class="group overflow-hidden rounded-[1.8rem] bg-white transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >

            <!-- Image -->

            <div
              class="relative h-[340px] overflow-hidden"
            >
              <img
                :src="event.image"
                :alt="event.title"
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
                  class="rounded-full px-4 py-2 font-display text-[10px] font-extrabold uppercase tracking-wider"
                  :class="
                    event.status === 'Upcoming'
                      ? 'bg-yen-red text-white'
                      : 'bg-yen-gold text-black'
                  "
                >
                  {{ event.status }}
                </span>
              </div>


              <!-- Featured -->

              <div
                v-if="event.featured"
                class="absolute right-5 top-5"
              >
                <span
                  class="rounded-full bg-white px-4 py-2 font-display text-[9px] font-extrabold uppercase tracking-wider text-black"
                >
                  Featured
                </span>
              </div>


              <!-- Impact -->

              <div
                class="absolute bottom-6 left-6"
              >
                <p
                  class="font-display text-4xl font-extrabold text-yen-gold"
                >
                  {{ event.participants }}
                </p>

                <p
                  class="mt-1 max-w-[230px] font-display text-xs font-semibold leading-5 text-white/70"
                >
                  {{ event.participantLabel }}
                </p>
              </div>
            </div>


            <!-- Body -->

            <div class="p-7 sm:p-8">

              <!-- Meta -->

              <div
                class="flex flex-wrap items-center gap-3"
              >
                <span
                  class="font-display text-[10px] font-extrabold uppercase tracking-[0.14em] text-yen-red"
                >
                  {{ event.category }}
                </span>

                <span
                  class="h-1 w-1 rounded-full bg-gray-300"
                ></span>

                <span
                  class="font-display text-xs font-semibold text-gray-400"
                >
                  {{ event.date }}
                </span>
              </div>


              <!-- Title -->

              <h3
                class="mt-4 font-display text-2xl font-bold leading-snug text-black"
              >
                {{ event.title }}
              </h3>


              <!-- Theme -->

              <p
                class="mt-3 font-display text-xs font-semibold italic leading-6 text-gray-500"
              >
                “{{ event.theme }}”
              </p>


              <!-- Description -->

              <p
                class="mt-5 font-body text-sm leading-7 text-gray-600"
              >
                {{ event.summary }}
              </p>


              <!-- Location -->

              <div
                class="mt-6 flex items-start gap-3 border-t border-gray-100 pt-6"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="mt-0.5 h-4 w-4 shrink-0 text-yen-red"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
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
                  {{ event.location }},
                  {{ event.city }}
                </span>
              </div>


              <!-- Link -->

              <RouterLink
                :to="{
                  name: 'event-detail',
                  params: {
                    slug: event.slug,
                  },
                }"
                class="mt-6 flex items-center justify-between rounded-xl bg-black px-5 py-4 font-display text-sm font-bold text-white transition group-hover:bg-yen-red"
              >
                {{
                  event.status === "Upcoming"
                    ? "View Event"
                    : "View Event Highlights"
                }}

                <span
                  class="flex h-8 w-8 items-center justify-center rounded-full bg-yen-gold text-black"
                >
                  →
                </span>
              </RouterLink>
            </div>
          </article>
        </div>


        <!-- ==================================
             EMPTY STATE
        =================================== -->

        <div
          v-else
          class="mt-8 rounded-[1.8rem] border border-dashed border-gray-300 bg-white px-6 py-16 text-center"
        >
          <div
            class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-yen-gold"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 7V3m8 4V3M5 11h14M5 5h14a1 1 0 0 1 1 1v14H4V6a1 1 0 0 1 1-1Z"
              />
            </svg>
          </div>

          <h3
            class="mt-5 font-display text-xl font-bold text-black"
          >
            {{
              activeStatus === "Upcoming"
                ? "No upcoming events announced yet"
                : "No events found"
            }}
          </h3>

          <p
            class="mx-auto mt-3 max-w-lg font-body text-sm leading-7 text-gray-500"
          >
            {{
              activeStatus === "Upcoming"
                ? "YEN-Liberia has not yet published details for its next event. Subscribe to receive an update when registration opens."
                : "Try changing your search or event filters."
            }}
          </p>

          <RouterLink
            v-if="activeStatus === 'Upcoming'"
            :to="{
              name: 'home',
              hash: '#newsletter',
            }"
            class="mt-6 inline-flex rounded-full bg-black px-7 py-4 font-display text-sm font-bold text-white transition hover:bg-yen-red"
          >
            Get Event Updates
          </RouterLink>

          <button
            v-else
            type="button"
            class="mt-5 font-display text-sm font-bold text-yen-red"
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

              <div
                class="inline-flex items-center gap-2 rounded-full bg-black px-4 py-2"
              >
                <span
                  class="h-2 w-2 rounded-full bg-yen-red"
                ></span>

                <span
                  class="font-display text-[10px] font-extrabold uppercase tracking-[0.18em] text-white"
                >
                  What's Next?
                </span>
              </div>

              <h2
                class="mt-5 font-display text-3xl font-extrabold leading-tight text-black sm:text-4xl"
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

            <RouterLink
              :to="{
                name: 'home',
                hash: '#newsletter',
              }"
              class="inline-flex items-center justify-center rounded-full bg-black px-7 py-4 font-display text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-yen-red"
            >
              Get Event Updates

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