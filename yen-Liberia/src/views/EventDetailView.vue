<script setup>
import { computed } from "vue"
import { useRoute } from "vue-router"

import {
  getEventBySlug,
} from "@/data/events"

const route = useRoute()

const event = computed(() =>
  getEventBySlug(route.params.slug),
)
</script>

<template>
  <main
    v-if="event"
    class="w-full"
  >

    <!-- ========================================
         HERO
    ========================================= -->

    <section
      class="relative isolate min-h-[620px] overflow-hidden"
    >
      <img
        :src="event.image"
        :alt="event.title"
        class="absolute inset-0 h-full w-full object-cover"
      />

      <div
        class="absolute inset-0 bg-linear-to-r from-black/90 via-black/65 to-black/15"
      ></div>

      <div
        class="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/20"
      ></div>

      <div
        class="relative z-10 mx-auto flex min-h-[620px] max-w-7xl items-end px-5 py-16 lg:px-8 lg:py-20"
      >
        <div class="max-w-4xl">

          <!-- Breadcrumb -->

          <div
            class="mb-8 flex flex-wrap items-center gap-3 font-display text-xs font-bold"
          >
            <RouterLink
              :to="{ name: 'home' }"
              class="text-white/50 hover:text-yen-gold"
            >
              Home
            </RouterLink>

            <span class="text-white/25">/</span>

            <RouterLink
              :to="{ name: 'events' }"
              class="text-white/50 hover:text-yen-gold"
            >
              Events
            </RouterLink>

            <span class="text-white/25">/</span>

            <span class="text-yen-gold">
              {{ event.shortTitle }}
            </span>
          </div>


          <!-- Status -->

          <div
            class="flex flex-wrap gap-3"
          >
            <span
              class="rounded-full bg-yen-gold px-4 py-2 font-display text-[10px] font-extrabold uppercase tracking-wider text-black"
            >
              {{ event.category }}
            </span>

            <span
              class="rounded-full border border-white/25 bg-white/10 px-4 py-2 font-display text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md"
            >
              {{ event.status }} Event
            </span>
          </div>


          <!-- Title -->

          <h1
            class="mt-6 font-display text-5xl font-extrabold leading-tight text-white sm:text-6xl lg:text-7xl"
          >
            {{ event.title }}
          </h1>

          <!-- Theme -->

          <p
            class="mt-5 max-w-3xl font-display text-lg font-semibold italic leading-8 text-yen-gold"
          >
            “{{ event.theme }}”
          </p>

          <p
            class="mt-6 max-w-3xl font-body text-base leading-8 text-white/70 sm:text-lg"
          >
            {{ event.summary }}
          </p>
        </div>
      </div>

      <div
        class="absolute bottom-0 h-1 w-full bg-linear-to-r from-yen-red via-yen-gold to-yen-red"
      ></div>
    </section>


    <!-- ========================================
         EVENT INFORMATION
    ========================================= -->

    <section class="bg-white">
      <div
        class="mx-auto grid max-w-7xl gap-14 px-5 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-28"
      >

        <!-- ==================================
             MAIN CONTENT
        =================================== -->

        <div>
          <p
            class="font-display text-xs font-extrabold uppercase tracking-[0.18em] text-yen-red"
          >
            Event Overview
          </p>

          <h2
            class="mt-4 font-display text-4xl font-extrabold text-black"
          >
            About the event
          </h2>

          <p
            class="mt-6 font-body text-base leading-8 text-gray-600"
          >
            {{ event.description }}
          </p>


          <!-- Objectives -->

          <div class="mt-12">
            <h3
              class="font-display text-2xl font-bold text-black"
            >
              Event Objectives
            </h3>

            <div
              class="mt-6 space-y-4"
            >
              <div
                v-for="objective in event.objectives"
                :key="objective"
                class="flex items-start gap-4"
              >
                <span
                  class="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-yen-gold font-display text-xs font-black text-black"
                >
                  ✓
                </span>

                <p
                  class="font-body text-sm leading-7 text-gray-600"
                >
                  {{ objective }}
                </p>
              </div>
            </div>
          </div>


          <!-- Highlights -->

          <div class="mt-12">
            <h3
              class="font-display text-2xl font-bold text-black"
            >
              Key Themes & Highlights
            </h3>

            <div
              class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              <div
                v-for="(highlight, index) in event.highlights"
                :key="highlight"
                class="rounded-[1.4rem] bg-[#f7f7f5] p-6"
              >
                <span
                  class="font-display text-sm font-extrabold text-yen-red"
                >
                  {{ String(index + 1).padStart(2, "0") }}
                </span>

                <p
                  class="mt-3 font-display text-sm font-bold leading-6 text-black"
                >
                  {{ highlight }}
                </p>
              </div>
            </div>
          </div>


          <!-- Organizers -->

          <div class="mt-12">
            <h3
              class="font-display text-2xl font-bold text-black"
            >
              Organizers & Collaborators
            </h3>

            <div
              class="mt-6 flex flex-wrap gap-3"
            >
              <span
                v-for="organizer in event.organizers"
                :key="organizer"
                class="rounded-full border border-gray-200 bg-white px-5 py-3 font-display text-xs font-bold text-black shadow-sm"
              >
                {{ organizer }}
              </span>
            </div>
          </div>


          <!-- Gallery placeholder -->

          <div class="mt-12">
            <h3
              class="font-display text-2xl font-bold text-black"
            >
              Event Gallery
            </h3>

            <div
              v-if="event.gallery.length"
              class="mt-6 grid gap-4 sm:grid-cols-2"
            >
              <img
                v-for="image in event.gallery"
                :key="image"
                :src="image"
                alt="Event gallery"
                class="h-[300px] w-full rounded-[1.4rem] object-cover"
              />
            </div>

            <div
              v-else
              class="mt-6 rounded-[1.5rem] border border-dashed border-gray-300 bg-[#f7f7f5] p-8"
            >
              <p
                class="font-display text-sm font-bold text-black"
              >
                Event gallery coming soon
              </p>

              <p
                class="mt-2 font-body text-sm leading-7 text-gray-500"
              >
                Official YEN-Liberia event photographs can be
                uploaded here through the Admin Dashboard once
                the media system is connected.
              </p>
            </div>
          </div>
        </div>


        <!-- ==================================
             SIDEBAR
        =================================== -->

        <aside>
          <div
            class="sticky top-28 overflow-hidden rounded-[1.8rem] bg-black"
          >
            <div class="p-7 sm:p-8">

              <p
                class="font-display text-xs font-extrabold uppercase tracking-[0.18em] text-yen-gold"
              >
                Event Details
              </p>


              <div
                class="mt-7 divide-y divide-white/10"
              >

                <!-- Date -->

                <div class="py-5 first:pt-0">
                  <p
                    class="font-display text-[10px] font-bold uppercase tracking-wider text-white/35"
                  >
                    Date
                  </p>

                  <p
                    class="mt-2 font-display text-sm font-semibold text-white"
                  >
                    {{ event.date }}
                  </p>
                </div>


                <!-- Duration -->

                <div class="py-5">
                  <p
                    class="font-display text-[10px] font-bold uppercase tracking-wider text-white/35"
                  >
                    Duration
                  </p>

                  <p
                    class="mt-2 font-display text-sm font-semibold text-white"
                  >
                    {{ event.time }}
                  </p>
                </div>


                <!-- Location -->

                <div class="py-5">
                  <p
                    class="font-display text-[10px] font-bold uppercase tracking-wider text-white/35"
                  >
                    Venue
                  </p>

                  <p
                    class="mt-2 font-display text-sm font-semibold leading-6 text-white"
                  >
                    {{ event.location }}
                  </p>

                  <p
                    class="mt-1 font-display text-xs text-white/45"
                  >
                    {{ event.city }},
                    {{ event.country }}
                  </p>
                </div>


                <!-- Participants -->

                <div class="py-5">
                  <p
                    class="font-display text-[10px] font-bold uppercase tracking-wider text-white/35"
                  >
                    Participation
                  </p>

                  <p
                    class="mt-2 font-display text-3xl font-extrabold text-yen-gold"
                  >
                    {{ event.participants }}
                  </p>

                  <p
                    class="mt-1 font-display text-xs leading-5 text-white/45"
                  >
                    {{ event.participantLabel }}
                  </p>
                </div>


                <!-- Status -->

                <div class="py-5">
                  <p
                    class="font-display text-[10px] font-bold uppercase tracking-wider text-white/35"
                  >
                    Event Status
                  </p>

                  <span
                    class="mt-2 inline-flex rounded-full bg-white/10 px-3 py-2 font-display text-xs font-bold text-white"
                  >
                    {{ event.status }}
                  </span>
                </div>
              </div>


              <!-- Registration -->

              <a
                v-if="
                  event.status === 'Upcoming' &&
                  event.registrationUrl
                "
                :href="event.registrationUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="mt-7 flex w-full justify-center rounded-full bg-yen-gold px-7 py-4 font-display text-sm font-bold text-black transition hover:bg-white"
              >
                Register for Event
              </a>

              <div
                v-else-if="event.status === 'Past'"
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
                class="mt-4 flex w-full justify-center rounded-full border border-white/20 px-6 py-3.5 font-display text-xs font-bold text-white transition hover:border-yen-gold hover:text-yen-gold"
              >
                View Published Coverage
              </a>
            </div>


            <!-- Notice -->

            <div
              class="bg-yen-gold px-7 py-5 sm:px-8"
            >
              <p
                class="font-body text-xs leading-6 text-black/70"
              >
                Future event registration details will be
                published only after YEN-Liberia officially
                announces the event.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </section>


    <!-- ========================================
         NAVIGATION
    ========================================= -->

    <section class="bg-[#f7f7f5]">
      <div
        class="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-16 sm:flex-row sm:items-center sm:justify-between lg:px-8"
      >
        <RouterLink
          :to="{ name: 'events' }"
          class="font-display text-sm font-bold text-black transition hover:text-yen-red"
        >
          ← Back to Events
        </RouterLink>

        <RouterLink
          :to="{ name: 'opportunities' }"
          class="inline-flex items-center justify-center rounded-full bg-black px-7 py-4 font-display text-sm font-bold text-white transition hover:bg-yen-red"
        >
          Explore Opportunities

          <span class="ml-3 text-yen-gold">
            →
          </span>
        </RouterLink>
      </div>
    </section>
  </main>


  <!-- ========================================
       404
  ========================================= -->

  <main
    v-else
    class="flex min-h-[65vh] items-center justify-center bg-white px-5 text-center"
  >
    <div>
      <p
        class="font-display text-7xl font-black text-yen-gold"
      >
        404
      </p>

      <h1
        class="mt-4 font-display text-3xl font-extrabold text-black"
      >
        Event not found
      </h1>

      <p
        class="mx-auto mt-3 max-w-md font-body text-sm leading-7 text-gray-500"
      >
        This event may have been removed or is not currently
        available.
      </p>

      <RouterLink
        :to="{ name: 'events' }"
        class="mt-7 inline-flex rounded-full bg-black px-7 py-4 font-display text-sm font-bold text-white"
      >
        Browse Events
      </RouterLink>
    </div>
  </main>
</template>