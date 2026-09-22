<script setup>
import { computed } from "vue"
import { events } from "@/data/events"

const featuredEvents = computed(() => {
  return [...events]
    .sort((a, b) => {
      return (
        new Date(b.startDate).getTime() -
        new Date(a.startDate).getTime()
      )
    })
    .slice(0, 3)
})

const upcomingEvents = computed(() =>
  events.filter(
    (event) => event.status === "Upcoming",
  ),
)
</script>

<template>
  <section
    id="events"
    class="overflow-hidden bg-[#f7f7f5]"
  >
    <div
      class="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28"
    >
      <!-- =====================================
           HEADER
      ====================================== -->

      <div
        class="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
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
              Events & Activities
            </span>
          </div>

          <h2
            class="max-w-3xl font-display text-4xl font-extrabold leading-tight tracking-tight text-black sm:text-5xl"
          >
            Where entrepreneurs

            <span class="text-yen-red">
              connect, learn and grow.
            </span>
          </h2>

          <p
            class="mt-6 max-w-2xl font-body text-base leading-8 text-gray-600"
          >
            Explore entrepreneurship summits, workshops,
            networking events and business-development
            activities from the YEN-Liberia ecosystem.
          </p>
        </div>


        <RouterLink
          :to="{ name: 'events' }"
          class="inline-flex shrink-0 items-center gap-3 rounded-full border border-black px-6 py-3.5 font-display text-sm font-bold text-black transition hover:bg-black hover:text-yen-gold"
        >
          View All Events

          <span>
            →
          </span>
        </RouterLink>
      </div>


      <!-- =====================================
           UPCOMING STATUS
      ====================================== -->

      <div
        v-if="!upcomingEvents.length"
        class="mt-10 flex flex-col gap-5 rounded-[1.5rem] border border-yen-gold/40 bg-yen-gold/10 p-6 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <p
            class="font-display text-sm font-bold text-black"
          >
            No upcoming event has been announced yet.
          </p>

          <p
            class="mt-2 font-body text-sm leading-7 text-gray-600"
          >
            Browse recent activities below or subscribe to
            receive an update when YEN-Liberia announces its
            next event.
          </p>
        </div>


        <RouterLink
          :to="{
            name: 'home',
            hash: '#newsletter',
          }"
          class="inline-flex shrink-0 items-center justify-center rounded-full bg-black px-6 py-3.5 font-display text-sm font-bold text-white transition hover:bg-yen-red"
        >
          Get Event Updates

          <span class="ml-3 text-yen-gold">
            →
          </span>
        </RouterLink>
      </div>


      <!-- =====================================
           EVENT CARDS
      ====================================== -->

      <div
        class="mt-10 grid gap-7 lg:grid-cols-3"
      >
        <article
          v-for="event in featuredEvents"
          :key="event.id"
          class="group flex flex-col overflow-hidden rounded-[1.8rem] bg-white transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
        >
          <!-- Image -->

          <div
            class="relative h-[300px] overflow-hidden"
          >
            <img
              :src="event.image"
              :alt="event.title"
              class="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />

            <div
              class="absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-transparent"
            ></div>


            <!-- Status -->

            <div
              class="absolute left-5 top-5"
            >
              <span
                class="rounded-full px-4 py-2 font-display text-[9px] font-extrabold uppercase tracking-wider"
                :class="
                  event.status === 'Upcoming'
                    ? 'bg-yen-red text-white'
                    : 'bg-yen-gold text-black'
                "
              >
                {{ event.status }}
              </span>
            </div>


            <!-- Participant impact -->

            <div
              class="absolute bottom-5 left-5 right-5"
            >
              <p
                class="font-display text-3xl font-extrabold text-yen-gold"
              >
                {{ event.participants }}
              </p>

              <p
                class="mt-1 max-w-[240px] font-display text-xs font-semibold leading-5 text-white/70"
              >
                {{ event.participantLabel }}
              </p>
            </div>
          </div>


          <!-- Content -->

          <div
            class="flex flex-1 flex-col p-7"
          >
            <div
              class="flex flex-wrap items-center gap-3"
            >
              <span
                class="font-display text-[9px] font-extrabold uppercase tracking-[0.14em] text-yen-red"
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


            <h3
              class="mt-4 font-display text-xl font-bold leading-snug text-black"
            >
              {{ event.title }}
            </h3>


            <p
              class="mt-3 font-display text-xs font-semibold italic leading-6 text-gray-500"
            >
              “{{ event.theme }}”
            </p>


            <p
              class="mt-4 flex-1 font-body text-sm leading-7 text-gray-600"
            >
              {{ event.summary }}
            </p>


            <!-- Location -->

            <div
              class="mt-6 flex items-start gap-3 border-t border-gray-100 pt-5"
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
                  : "View Highlights"
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


      <!-- =====================================
           BOTTOM CTA
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
              Stay Connected
            </p>

            <h3
              class="mt-4 font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl"
            >
              Don't miss the next

              <span class="text-yen-gold">
                YEN-Liberia event.
              </span>
            </h3>

            <p
              class="mt-4 max-w-2xl font-body text-sm leading-7 text-white/60 sm:text-base"
            >
              Subscribe for announcements about workshops,
              conferences, networking sessions and entrepreneur
              registration opportunities.
            </p>
          </div>


          <div
            class="flex flex-col gap-3 sm:flex-row lg:flex-col"
          >
            <RouterLink
              :to="{ name: 'events' }"
              class="inline-flex min-w-[210px] items-center justify-center rounded-full border border-white/25 px-7 py-4 font-display text-sm font-bold text-white transition hover:border-yen-gold hover:text-yen-gold"
            >
              Explore Events
            </RouterLink>

            <RouterLink
              :to="{
                name: 'home',
                hash: '#newsletter',
              }"
              class="inline-flex min-w-[210px] items-center justify-center rounded-full bg-yen-gold px-7 py-4 font-display text-sm font-bold text-black transition hover:-translate-y-1 hover:bg-white"
            >
              Get Event Updates

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