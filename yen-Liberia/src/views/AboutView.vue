<script setup>
const impactStats = [
  {
    value: "300+",
    label: "Youth-led businesses supported",
  },
  {
    value: "100",
    label: "Entrepreneurs in the 2026 MSME Clinic",
  },
  {
    value: "200+",
    label: "Participants at Female Entrepreneurs Summit 2026",
  },
  {
    value: "Liberia",
    label: "Building a national entrepreneurship ecosystem",
  },
]

const pillars = [
  {
    number: "01",
    title: "Inspire",
    description:
      "Encourage young Liberians to see entrepreneurship as a pathway to innovation, independence and economic opportunity.",
  },
  {
    number: "02",
    title: "Support",
    description:
      "Strengthen entrepreneurs through practical knowledge, mentorship, technical assistance and capacity building.",
  },
  {
    number: "03",
    title: "Connect",
    description:
      "Bring entrepreneurs closer to peers, institutions, markets, mentors, partners and emerging opportunities.",
  },
  {
    number: "04",
    title: "Grow",
    description:
      "Help youth-led businesses become stronger, more structured, sustainable and ready for larger markets.",
  },
]

const journey = [
  {
    year: "2024",
    title: "Global Entrepreneurship Week",
    description:
      "YEN-Liberia hosted a two-day entrepreneurship conference with support from Mercy Corps Liberia, bringing together more than 50 young entrepreneurs and youth leaders.",
  },
  {
    year: "2026",
    title: "MSME Clinic",
    description:
      "YEN-Liberia joined UNIDO GROW-2, the Liberia Chamber of Commerce and Young Business Leaders Club to support 100 youth-led and emerging businesses.",
  },
  {
    year: "2026",
    title: "Female Entrepreneurs Summit",
    description:
      "More than 200 entrepreneurs, business leaders and development partners gathered around investment, technology, formalization and market access.",
  },
]
</script>

<template>
  <main class="w-full overflow-hidden">

    <!-- ========================================
         ABOUT HERO
    ========================================= -->

    <section
      class="relative isolate min-h-[560px] overflow-hidden sm:min-h-[600px] lg:min-h-[620px]"
    >
      <!-- Background image -->

      <img
        src="/images/hero/hero-2.jpg"
        alt="Youth entrepreneurs participating in a YEN-Liberia activity"
        class="absolute inset-0 h-full w-full object-cover object-center"
      />

      <!-- Contrast layers -->

      <div
        class="absolute inset-0 bg-linear-to-r from-black/85 via-black/60 to-black/25 sm:from-black/80 sm:via-black/50 sm:to-black/15"
      ></div>

      <div
        class="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/20"
      ></div>

      <!-- Content -->

      <div
        class="relative z-10 mx-auto flex min-h-[560px] max-w-7xl items-center px-5 py-16 sm:min-h-[600px] sm:px-6 sm:py-20 lg:min-h-[620px] lg:px-8"
      >
        <div class="w-full max-w-4xl">

          <!-- Breadcrumb -->

          <div
            class="mb-6 flex flex-wrap items-center gap-3 font-display text-xs font-bold sm:mb-8"
          >
            <RouterLink
              :to="{ name: 'home' }"
              class="text-white/60 transition hover:text-yen-gold"
            >
              Home
            </RouterLink>

            <span class="text-white/30">
              /
            </span>

            <span class="text-yen-gold">
              About YEN-Liberia
            </span>
          </div>

          <p
            class="font-display text-[10px] font-extrabold uppercase tracking-[0.2em] text-yen-gold sm:text-xs"
          >
            Who We Are
          </p>

          <h1
            class="mt-5 max-w-4xl font-display text-[40px] font-extrabold leading-[1.06] tracking-tight text-white min-[390px]:text-[44px] sm:text-6xl lg:text-7xl"
          >
            Building the ecosystem where

            <span class="text-yen-gold">
              Liberia's entrepreneurs thrive.
            </span>
          </h1>

          <p
            class="mt-6 max-w-2xl font-body text-sm leading-7 text-white/80 sm:mt-7 sm:text-lg sm:leading-8"
          >
            Youth Entrepreneurs Network–Liberia inspires, supports
            and connects young entrepreneurs while strengthening
            the environment they need to build sustainable
            businesses and meaningful livelihoods.
          </p>
        </div>
      </div>

      <!-- Accent -->

      <div
        class="absolute bottom-0 left-0 z-20 h-1 w-full bg-linear-to-r from-yen-red via-yen-gold to-yen-red"
      ></div>
    </section>


    <!-- ========================================
         OUR STORY
    ========================================= -->

    <section class="bg-white">
      <div
        class="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8 lg:py-28"
      >
        <!-- Content -->

        <div>
          <div
            class="mb-5 flex items-center gap-3"
          >
            <span
              class="h-[3px] w-10 bg-yen-red"
            ></span>

            <span
              class="font-display text-xs font-bold uppercase tracking-[0.18em] text-yen-red sm:text-sm"
            >
              Our Story
            </span>
          </div>

          <h2
            class="font-display text-3xl font-extrabold leading-tight text-black min-[390px]:text-4xl sm:text-5xl"
          >
            Entrepreneurship can transform

            <span class="text-yen-red">
              lives and communities.
            </span>
          </h2>

          <p
            class="mt-6 font-body text-sm leading-8 text-gray-600 sm:mt-7 sm:text-base"
          >
            Youth Entrepreneurs Network–Liberia is a youth-led
            entrepreneurship organization committed to empowering
            young entrepreneurs and small businesses across
            Liberia.
          </p>

          <p
            class="mt-5 font-body text-sm leading-8 text-gray-600 sm:text-base"
          >
            Our work brings entrepreneurs together with practical
            learning, mentorship, networks, institutions and
            opportunities that can help transform ideas and
            informal businesses into stronger and more sustainable
            enterprises.
          </p>

          <p
            class="mt-5 font-body text-sm leading-8 text-gray-600 sm:text-base"
          >
            We believe Liberia's young people should not only
            participate in the economy. They should help build,
            innovate and lead it.
          </p>
        </div>


        <!-- Image composition -->

        <div class="relative">
          <!-- Accent -->

          <div
            class="absolute -left-4 -top-4 -z-10 h-24 w-24 rounded-3xl bg-yen-gold sm:-left-5 sm:-top-5 sm:h-28 sm:w-28"
          ></div>

          <!-- Image -->

          <div
            class="overflow-hidden rounded-[1.6rem] sm:rounded-[2rem]"
          >
            <img
              src="/images/hero/hero-3.jpg"
              alt="Young entrepreneurs in Liberia"
              class="h-[400px] w-full object-cover object-center sm:h-[500px] lg:h-[570px]"
            />
          </div>


          <!-- Floating-style impact card -->

          <div
            class="relative z-10 mx-4 -mt-12 rounded-[1.4rem] bg-black p-6 shadow-2xl sm:ml-auto sm:mr-8 sm:max-w-[300px] sm:p-7"
          >
            <p
              class="font-display text-3xl font-extrabold text-yen-gold sm:text-4xl"
            >
              300+
            </p>

            <p
              class="mt-2 font-display text-sm font-semibold leading-6 text-white"
            >
              Youth-led businesses currently supported across the
              YEN-Liberia network.
            </p>

            <div
              class="mt-5 h-[3px] w-12 bg-yen-red"
            ></div>
          </div>
        </div>
      </div>
    </section>


    <!-- ========================================
         MISSION & VISION
    ========================================= -->

    <section class="bg-[#f7f7f5]">
      <div
        class="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24"
      >
        <div
          class="mx-auto max-w-3xl text-center"
        >
          <p
            class="font-display text-[10px] font-extrabold uppercase tracking-[0.18em] text-yen-red sm:text-xs"
          >
            Our Direction
          </p>

          <h2
            class="mt-4 font-display text-3xl font-extrabold leading-tight text-black min-[390px]:text-4xl sm:text-5xl"
          >
            Purpose that guides our work.
          </h2>
        </div>


        <div
          class="mt-10 grid gap-6 sm:mt-14 lg:grid-cols-2 lg:gap-7"
        >
          <!-- Mission -->

          <article
            class="relative overflow-hidden rounded-[1.7rem] bg-black p-7 sm:rounded-[2rem] sm:p-10 lg:p-12"
          >
            <div
              class="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-yen-gold/10"
            ></div>

            <div class="relative">
              <div
                class="flex h-12 w-12 items-center justify-center rounded-2xl bg-yen-gold font-display text-lg font-extrabold text-black sm:h-14 sm:w-14 sm:text-xl"
              >
                M
              </div>

              <p
                class="mt-7 font-display text-[10px] font-extrabold uppercase tracking-[0.18em] text-yen-gold sm:mt-8 sm:text-xs"
              >
                Our Mission
              </p>

              <h3
                class="mt-4 font-display text-2xl font-bold leading-tight text-white sm:text-3xl"
              >
                Inspire, support and connect young Liberian
                entrepreneurs.
              </h3>

              <p
                class="mt-5 font-body text-sm leading-7 text-white/65 sm:text-base sm:leading-8"
              >
                We work to equip entrepreneurs with practical
                skills, meaningful connections, mentorship and
                access to opportunities that help them build
                stronger and more sustainable businesses.
              </p>
            </div>
          </article>


          <!-- Vision -->

          <article
            class="relative overflow-hidden rounded-[1.7rem] bg-yen-gold p-7 sm:rounded-[2rem] sm:p-10 lg:p-12"
          >
            <div
              class="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full border-[40px] border-black/5"
            ></div>

            <div class="relative">
              <div
                class="flex h-12 w-12 items-center justify-center rounded-2xl bg-black font-display text-lg font-extrabold text-yen-gold sm:h-14 sm:w-14 sm:text-xl"
              >
                V
              </div>

              <p
                class="mt-7 font-display text-[10px] font-extrabold uppercase tracking-[0.18em] text-yen-red sm:mt-8 sm:text-xs"
              >
                Our Vision
              </p>

              <h3
                class="mt-4 font-display text-2xl font-bold leading-tight text-black sm:text-3xl"
              >
                A thriving Liberia powered by innovative young
                entrepreneurs.
              </h3>

              <p
                class="mt-5 font-body text-sm leading-7 text-black/65 sm:text-base sm:leading-8"
              >
                We envision an inclusive entrepreneurship ecosystem
                where young people can transform ideas into
                enterprises, create livelihoods and contribute to
                Liberia's long-term economic transformation.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>


    <!-- ========================================
         OUR APPROACH
    ========================================= -->

    <section class="bg-white">
      <div
        class="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28"
      >
        <div
          class="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14"
        >
          <!-- Heading -->

          <div>
            <p
              class="font-display text-[10px] font-extrabold uppercase tracking-[0.18em] text-yen-red sm:text-xs"
            >
              Our Approach
            </p>

            <h2
              class="mt-4 font-display text-3xl font-extrabold leading-tight text-black min-[390px]:text-4xl sm:text-5xl"
            >
              From ideas to

              <span class="text-yen-red">
                sustainable enterprises.
              </span>
            </h2>

            <p
              class="mt-6 max-w-md font-body text-sm leading-8 text-gray-600 sm:text-base"
            >
              Our approach focuses on practical support and
              meaningful relationships that help entrepreneurs
              move forward.
            </p>
          </div>


          <!-- Pillars -->

          <div
            class="grid gap-5 sm:grid-cols-2"
          >
            <article
              v-for="pillar in pillars"
              :key="pillar.number"
              class="group rounded-[1.5rem] border border-gray-200 p-6 transition duration-300 hover:-translate-y-1 hover:border-yen-gold hover:shadow-xl sm:rounded-[1.6rem] sm:p-7"
            >
              <span
                class="font-display text-3xl font-extrabold text-yen-gold"
              >
                {{ pillar.number }}
              </span>

              <h3
                class="mt-5 font-display text-xl font-bold text-black sm:text-2xl"
              >
                {{ pillar.title }}
              </h3>

              <p
                class="mt-3 font-body text-sm leading-7 text-gray-600"
              >
                {{ pillar.description }}
              </p>

              <div
                class="mt-6 h-[3px] w-10 bg-yen-red transition-all duration-300 group-hover:w-20"
              ></div>
            </article>
          </div>
        </div>
      </div>
    </section>


    <!-- ========================================
         OUR JOURNEY
    ========================================= -->

    <section class="bg-black">
      <div
        class="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24"
      >
        <div class="max-w-3xl">
          <p
            class="font-display text-[10px] font-extrabold uppercase tracking-[0.18em] text-yen-gold sm:text-xs"
          >
            Our Journey
          </p>

          <h2
            class="mt-4 font-display text-3xl font-extrabold leading-tight text-white min-[390px]:text-4xl sm:text-5xl"
          >
            Growing through action,

            <span class="text-yen-gold">
              collaboration and impact.
            </span>
          </h2>
        </div>


        <div
          class="mt-10 grid gap-5 sm:mt-14 md:grid-cols-2 lg:grid-cols-3"
        >
          <article
            v-for="item in journey"
            :key="`${item.year}-${item.title}`"
            class="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6 transition duration-300 hover:border-yen-gold/50 hover:bg-white/[0.07] sm:rounded-[1.6rem] sm:p-7"
          >
            <p
              class="font-display text-3xl font-extrabold text-yen-gold sm:text-4xl"
            >
              {{ item.year }}
            </p>

            <h3
              class="mt-5 font-display text-xl font-bold text-white sm:mt-6"
            >
              {{ item.title }}
            </h3>

            <p
              class="mt-4 font-body text-sm leading-7 text-white/60"
            >
              {{ item.description }}
            </p>

            <div
              class="mt-7 h-[3px] w-10 bg-yen-red"
            ></div>
          </article>
        </div>
      </div>
    </section>


    <!-- ========================================
         IMPACT
    ========================================= -->

    <section class="bg-yen-gold">
      <div
        class="mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-16 lg:px-8"
      >
        <div
          class="grid grid-cols-2 gap-x-5 gap-y-10 text-center lg:grid-cols-4 lg:gap-9"
        >
          <div
            v-for="stat in impactStats"
            :key="stat.label"
            class="min-w-0"
          >
            <p
              class="font-display text-3xl font-extrabold text-black sm:text-5xl"
            >
              {{ stat.value }}
            </p>

            <p
              class="mx-auto mt-3 max-w-[220px] font-display text-[10px] font-bold leading-5 text-black/65 sm:text-xs sm:leading-6"
            >
              {{ stat.label }}
            </p>
          </div>
        </div>
      </div>
    </section>


    <!-- ========================================
         CTA
    ========================================= -->

    <section class="bg-white">
      <div
        class="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24"
      >
        <div
          class="relative overflow-hidden rounded-[1.7rem] bg-black px-6 py-10 sm:rounded-[2rem] sm:px-10 sm:py-12 lg:px-14 lg:py-16"
        >
          <div
            class="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-yen-gold/10 blur-2xl"
          ></div>

          <div
            class="pointer-events-none absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-yen-red/10 blur-2xl"
          ></div>


          <div
            class="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-9"
          >
            <div class="max-w-3xl">
              <p
                class="font-display text-[10px] font-extrabold uppercase tracking-[0.18em] text-yen-gold sm:text-xs"
              >
                Join the Movement
              </p>

              <h2
                class="mt-4 font-display text-2xl font-extrabold leading-tight text-white sm:text-4xl"
              >
                Liberia's entrepreneurship future is being built

                <span class="text-yen-gold">
                  today.
                </span>
              </h2>

              <p
                class="mt-4 max-w-2xl font-body text-sm leading-7 text-white/60 sm:text-base"
              >
                Whether you're an entrepreneur, mentor, investor,
                institution or development partner, there is a
                place for you in the YEN-Liberia ecosystem.
              </p>
            </div>


            <div
              class="flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:flex-col"
            >
              <RouterLink
                :to="{ name: 'join' }"
                class="inline-flex w-full items-center justify-center rounded-full bg-yen-gold px-7 py-4 font-display text-sm font-bold text-black transition duration-300 hover:-translate-y-1 hover:bg-white sm:w-auto sm:min-w-[210px]"
              >
                Join YEN-Liberia

                <span class="ml-3">
                  →
                </span>
              </RouterLink>


              <!-- FIXED:
                   Was still going to the old homepage anchor.
                   Now uses the dedicated Partners route.
              -->

              <RouterLink
                :to="{ name: 'partners' }"
                class="inline-flex w-full items-center justify-center rounded-full border border-white/25 px-7 py-4 font-display text-sm font-bold text-white transition duration-300 hover:border-yen-gold hover:text-yen-gold sm:w-auto sm:min-w-[210px]"
              >
                Partner With Us
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template> 