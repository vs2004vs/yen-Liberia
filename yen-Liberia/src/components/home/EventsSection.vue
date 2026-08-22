<script setup>
const recentEvents = [
  {
    id: 1,
    category: "Women Entrepreneurship",
    title: "Female Entrepreneurs Summit 2026",
    date: "August 10–11, 2026",
    location:
      "Ellen Johnson Sirleaf Ministerial Complex, Congo Town",
    image: "/images/hero/hero-1.jpg",
    description:
      "A two-day entrepreneurship summit bringing women entrepreneurs, business leaders and development partners together around investment, technology, formalization and market access.",
    stat: "200+",
    statLabel: "Participants",
    featured: true,
  },

  {
    id: 2,
    category: "Climate & Business",
    title: "Climate-Smart MSME Workshop",
    date: "June 30, 2026",
    location: "Liberia Chamber of Commerce, Monrovia",
    image: "/images/hero/hero-3.jpg",
    description:
      "A four-day capacity-building workshop helping MSMEs understand how sustainable and climate-smart business practices can strengthen operations and competitiveness.",
    stat: "4 Days",
    statLabel: "Business Training",
    featured: false,
  },

  {
    id: 3,
    category: "Business Development",
    title: "2026 MSME Clinic",
    date: "February 18–19, 2026",
    location: "Liberia Chamber of Commerce, Monrovia",
    image: "/images/hero/hero-4.jpg",
    description:
      "A practical entrepreneurship clinic supporting youth-led and emerging businesses with business formalization, finance, bookkeeping, branding and market readiness.",
    stat: "100",
    statLabel: "Entrepreneurs",
    featured: false,
  },
]
</script>

<template>
  <section
    id="events"
    class="overflow-hidden bg-white"
  >
    <div
      class="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28"
    >

      <!-- ==============================
           SECTION HEADER
      =============================== -->

      <div
        class="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end"
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
            class="font-display max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-black sm:text-5xl"
          >
            Where entrepreneurs

            <span class="text-yen-red">
              connect, learn and grow.
            </span>
          </h2>

        </div>

        <p
          class="max-w-xl font-body text-base leading-8 text-gray-600 lg:ml-auto"
        >
          YEN-Liberia brings entrepreneurs, business leaders,
          institutions and development partners together through
          summits, workshops, networking activities and practical
          business-development programs.
        </p>
      </div>


      <!-- ==============================
           FEATURED EVENT
      =============================== -->

      <article
        class="group mt-14 overflow-hidden rounded-[2rem] bg-black"
      >
        <div
          class="grid lg:grid-cols-[1.1fr_0.9fr]"
        >

          <!-- IMAGE -->

          <div
            class="relative min-h-[430px] overflow-hidden lg:min-h-[590px]"
          >

            <img
              :src="recentEvents[0].image"
              :alt="recentEvents[0].title"
              class="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />

            <div
              class="absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-transparent"
            ></div>

            <!-- Tag -->

            <div
              class="absolute left-6 top-6"
            >
              <span
                class="rounded-full bg-yen-gold px-4 py-2 font-display text-xs font-extrabold uppercase tracking-wider text-black"
              >
                Featured Event
              </span>
            </div>

            <!-- Stats -->

            <div
              class="absolute bottom-6 left-6"
            >
              <p
                class="font-display text-4xl font-extrabold text-yen-gold"
              >
                {{ recentEvents[0].stat }}
              </p>

              <p
                class="mt-1 font-display text-sm font-semibold text-white"
              >
                {{ recentEvents[0].statLabel }}
              </p>
            </div>

          </div>


          <!-- CONTENT -->

          <div
            class="flex items-center p-8 sm:p-10 lg:p-14"
          >
            <div>

              <p
                class="font-display text-xs font-bold uppercase tracking-[0.16em] text-yen-gold"
              >
                {{ recentEvents[0].category }}
              </p>

              <h3
                class="mt-4 font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl"
              >
                {{ recentEvents[0].title }}
              </h3>


              <!-- DATE -->

              <div
                class="mt-7 flex items-start gap-4"
              >

                <div
                  class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-yen-gold"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-black"
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

                <div>
                  <p
                    class="font-display text-xs font-bold uppercase tracking-wider text-white/45"
                  >
                    Date
                  </p>

                  <p
                    class="mt-1 font-display text-sm font-semibold text-white"
                  >
                    {{ recentEvents[0].date }}
                  </p>
                </div>

              </div>


              <!-- LOCATION -->

              <div
                class="mt-5 flex items-start gap-4"
              >

                <div
                  class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-yen-red"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-white"
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
                </div>

                <div>
                  <p
                    class="font-display text-xs font-bold uppercase tracking-wider text-white/45"
                  >
                    Location
                  </p>

                  <p
                    class="mt-1 font-display text-sm font-semibold leading-6 text-white"
                  >
                    {{ recentEvents[0].location }}
                  </p>
                </div>

              </div>


              <!-- DESCRIPTION -->

              <p
                class="mt-7 font-body text-sm leading-8 text-white/65 sm:text-base"
              >
                {{ recentEvents[0].description }}
              </p>


              <!-- ACTION -->

              <button
                type="button"
                class="mt-9 inline-flex items-center gap-3 rounded-full bg-yen-gold px-7 py-4 font-display text-sm font-bold text-black transition duration-300 hover:-translate-y-1 hover:bg-white"
              >
                View Event Highlights

                <span>
                  →
                </span>
              </button>

            </div>
          </div>

        </div>
      </article>


      <!-- ==============================
           RECENT EVENTS
      =============================== -->

      <div
        class="mt-14 flex items-end justify-between gap-6"
      >

        <div>
          <p
            class="font-display text-xs font-extrabold uppercase tracking-[0.16em] text-yen-red"
          >
            Recent Activities
          </p>

          <h3
            class="mt-2 font-display text-2xl font-bold text-black sm:text-3xl"
          >
            More from the YEN network
          </h3>
        </div>

        <a
          href="#"
          class="hidden font-display text-sm font-bold text-black transition hover:text-yen-red sm:block"
        >
          View All Events →
        </a>

      </div>


      <!-- CARDS -->

      <div
        class="mt-7 grid gap-7 md:grid-cols-2"
      >

        <article
          v-for="event in recentEvents.slice(1)"
          :key="event.id"
          class="group overflow-hidden rounded-[1.7rem] border border-gray-200 bg-white transition duration-300 hover:-translate-y-2 hover:border-transparent hover:shadow-2xl"
        >

          <!-- IMAGE -->

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

            <!-- Category -->

            <div
              class="absolute left-5 top-5"
            >
              <span
                class="rounded-full bg-yen-gold px-4 py-2 font-display text-[10px] font-extrabold uppercase tracking-wider text-black"
              >
                {{ event.category }}
              </span>
            </div>

            <!-- Stat -->

            <div
              class="absolute bottom-5 left-5"
            >
              <p
                class="font-display text-3xl font-extrabold text-white"
              >
                {{ event.stat }}
              </p>

              <p
                class="font-display text-xs font-semibold text-white/70"
              >
                {{ event.statLabel }}
              </p>
            </div>

          </div>


          <!-- BODY -->

          <div
            class="p-7 sm:p-8"
          >

            <p
              class="font-display text-xs font-bold uppercase tracking-[0.14em] text-yen-red"
            >
              {{ event.date }}
            </p>

            <h3
              class="mt-3 font-display text-2xl font-bold leading-snug text-black"
            >
              {{ event.title }}
            </h3>


            <!-- LOCATION -->

            <div
              class="mt-4 flex items-start gap-2"
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
                class="font-display text-xs font-medium leading-5 text-gray-500"
              >
                {{ event.location }}
              </span>

            </div>


            <p
              class="mt-5 font-body text-sm leading-7 text-gray-600"
            >
              {{ event.description }}
            </p>


            <button
              type="button"
              class="mt-6 inline-flex items-center gap-3 font-display text-sm font-bold text-black transition group-hover:text-yen-red"
            >
              View Event

              <span
                class="flex h-8 w-8 items-center justify-center rounded-full bg-black text-yen-gold transition duration-300 group-hover:bg-yen-red group-hover:text-white"
              >
                →
              </span>
            </button>

          </div>

        </article>

      </div>


      <!-- ==============================
           UPCOMING EVENT CTA
      =============================== -->

      <div
        class="relative mt-16 overflow-hidden rounded-[2rem] bg-yen-gold p-8 sm:p-10 lg:p-12"
      >

        <!-- Decorations -->

        <div
          class="absolute -right-20 -top-20 h-64 w-64 rounded-full border-[35px] border-black/5"
        ></div>

        <div
          class="absolute -bottom-16 left-1/3 h-40 w-40 rounded-full bg-yen-red/10"
        ></div>


        <div
          class="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center"
        >

          <div
            class="max-w-3xl"
          >

            <div
              class="inline-flex items-center gap-2 rounded-full bg-black px-4 py-2"
            >
              <span
                class="h-2 w-2 animate-pulse rounded-full bg-yen-red"
              ></span>

              <span
                class="font-display text-[10px] font-extrabold uppercase tracking-[0.16em] text-white"
              >
                Upcoming
              </span>
            </div>

            <h3
              class="mt-5 font-display text-3xl font-extrabold leading-tight text-black sm:text-4xl"
            >
              The next YEN-Liberia event is coming.
            </h3>

            <p
              class="mt-4 max-w-2xl font-body text-sm leading-7 text-black/70 sm:text-base"
            >
              Event details will be announced soon. Stay connected
              to receive registration updates, entrepreneurship
              workshops, networking sessions and upcoming YEN
              activities.
            </p>

          </div>


          <div
            class="flex flex-col gap-3 sm:flex-row lg:flex-col"
          >

            <a
              href="#newsletter"
              class="inline-flex items-center justify-center rounded-full bg-black px-7 py-4 font-display text-sm font-bold text-white transition duration-300 hover:-translate-y-1 hover:bg-yen-red"
            >
              Get Event Updates

              <span
                class="ml-3 text-yen-gold"
              >
                →
              </span>
            </a>

            <a
              href="#"
              class="inline-flex items-center justify-center rounded-full border border-black/25 px-7 py-4 font-display text-sm font-bold text-black transition hover:bg-black hover:text-white"
            >
              View All Events
            </a>

          </div>

        </div>

      </div>

    </div>
  </section>
</template>