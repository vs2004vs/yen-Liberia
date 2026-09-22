<template>
  <section
    id="about"
    class="overflow-hidden bg-white"
  >
    <!-- ==========================================
         WHO WE ARE
    =========================================== -->

    <div
      class="mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 lg:grid-cols-2 lg:px-8 lg:py-28"
    >
      <!-- Image Side -->
      <div class="relative">
        <div
          class="relative overflow-hidden rounded-[2rem] bg-gray-100"
        >
          <!--
            For now we're reusing one of your hero photos.
            You can replace this later with a dedicated YEN photo.
          -->
          <img
            src="/images/hero/hero-2.jpg"
            alt="Youth Entrepreneurs Network Liberia activity"
            class="h-[520px] w-full object-cover"
          />

          <!-- Slight image overlay -->
          <div
            class="absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-transparent"
          ></div>

          <!-- Image Caption -->
          <div
            class="absolute bottom-6 left-6 right-6"
          >
            <div
              class="inline-flex items-center gap-2 rounded-full bg-yen-gold px-4 py-2 font-display text-xs font-bold uppercase tracking-wider text-black"
            >
              <span
                class="h-2 w-2 rounded-full bg-yen-red"
              ></span>

              Building Entrepreneurs
            </div>
          </div>
        </div>

        <!-- Floating Impact Card -->
        <div
          class="absolute -bottom-7 right-4 max-w-[230px] rounded-2xl bg-black p-6 shadow-2xl sm:right-8"
        >
          <p
            class="font-display text-4xl font-extrabold text-yen-gold"
          >
            300+
          </p>

          <p
            class="mt-2 font-display text-sm font-semibold leading-6 text-white"
          >
            Youth-led businesses supported through the network
          </p>

          <div
            class="mt-5 h-1 w-12 rounded-full bg-yen-red"
          ></div>
        </div>

        <!-- Decorative Shape -->
        <div
          class="absolute -left-5 -top-5 -z-10 h-28 w-28 rounded-3xl bg-yen-gold"
        ></div>
      </div>

      <!-- Content Side -->
      <div class="lg:pl-6">

        <!-- Section Label -->
        <div
          class="mb-5 flex items-center gap-3"
        >
          <span
            class="h-[3px] w-10 bg-yen-red"
          ></span>

          <span
            class="font-display text-sm font-bold uppercase tracking-[0.18em] text-yen-red"
          >
            Who We Are
          </span>
        </div>

        <!-- Heading -->
        <h2
          class="font-display text-4xl font-extrabold leading-tight tracking-tight text-black sm:text-5xl"
        >
          Building an Inclusive

          <span class="text-yen-red">
            Entrepreneurship Ecosystem
          </span>

          in Liberia.
        </h2>

        <!-- Main Copy -->
        <p
          class="mt-7 font-body text-base leading-8 text-gray-600"
        >
          Youth Entrepreneurs Network–Liberia is a youth-focused
          entrepreneurship network working to inspire, support and
          connect young Liberian entrepreneurs.
        </p>

        <p
          class="mt-5 font-body text-base leading-8 text-gray-600"
        >
          Through mentorship, capacity building, networking,
          partnerships and access to opportunities, YEN-Liberia
          helps young people strengthen their businesses, expand
          their connections and participate meaningfully in
          Liberia's economic development.
        </p>

        <!-- Mission / Vision -->
        <div
          class="mt-9 grid gap-5 sm:grid-cols-2"
        >
          <!-- Mission -->
          <div
            class="rounded-2xl border border-gray-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-yen-gold hover:shadow-lg"
          >
            <div
              class="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-yen-gold"
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
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>

            <h3
              class="font-display text-lg font-bold text-black"
            >
              Our Mission
            </h3>

            <p
              class="mt-3 font-body text-sm leading-7 text-gray-600"
            >
              Empower young entrepreneurs with the skills,
              connections and opportunities needed to build
              sustainable enterprises.
            </p>
          </div>

          <!-- Vision -->
          <div
            class="rounded-2xl border border-gray-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-yen-red hover:shadow-lg"
          >
            <div
              class="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-yen-gold"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M4 6h9a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z"
                />
              </svg>
            </div>

            <h3
              class="font-display text-lg font-bold text-black"
            >
              Our Vision
            </h3>

            <p
              class="mt-3 font-body text-sm leading-7 text-gray-600"
            >
              A Liberia where young entrepreneurs have the
              ecosystem, confidence and opportunities to build
              businesses that transform communities.
            </p>
          </div>
        </div>

        <!-- Learn More -->
        <RouterLink
  :to="{ name: 'about' }"
  class="YOUR-EXISTING-CLASS-HERE"
>
  Learn More About YEN

  <span>
    →
  </span>
</RouterLink>
      </div>
    </div>

    <!-- ==========================================
         CORE APPROACH
    =========================================== -->

    <div class="bg-[#f7f7f5]">
      <div
        class="mx-auto max-w-7xl px-5 py-20 lg:px-8"
      >
        <!-- Section Heading -->
        <div
          class="mx-auto max-w-3xl text-center"
        >
          <p
            class="font-display text-sm font-bold uppercase tracking-[0.18em] text-yen-red"
          >
            How We Create Impact
          </p>

          <h2
            class="mt-4 font-display text-3xl font-extrabold text-black sm:text-4xl"
          >
            Helping entrepreneurs move from
            <span class="text-yen-red">
              ideas to sustainable businesses.
            </span>
          </h2>

          <p
            class="mx-auto mt-5 max-w-2xl font-body text-sm leading-7 text-gray-600 sm:text-base"
          >
            Our work focuses on creating practical pathways that
            help young entrepreneurs connect, strengthen their
            businesses and access new opportunities.
          </p>
        </div>

        <!-- Four Pillars -->
        <div
          class="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          <!-- Connect -->
          <article
            class="group rounded-2xl bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
          >
            <div
              class="flex h-12 w-12 items-center justify-center rounded-xl bg-black font-display text-lg font-bold text-yen-gold"
            >
              01
            </div>

            <h3
              class="mt-6 font-display text-xl font-bold text-black"
            >
              Connect
            </h3>

            <p
              class="mt-3 font-body text-sm leading-7 text-gray-600"
            >
              Build meaningful connections between entrepreneurs,
              mentors, investors, institutions and markets.
            </p>

            <div
              class="mt-6 h-[3px] w-10 bg-yen-gold transition-all duration-300 group-hover:w-20"
            ></div>
          </article>

          <!-- Equip -->
          <article
            class="group rounded-2xl bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
          >
            <div
              class="flex h-12 w-12 items-center justify-center rounded-xl bg-yen-gold font-display text-lg font-bold text-black"
            >
              02
            </div>

            <h3
              class="mt-6 font-display text-xl font-bold text-black"
            >
              Equip
            </h3>

            <p
              class="mt-3 font-body text-sm leading-7 text-gray-600"
            >
              Provide practical knowledge, mentorship and
              capacity-building support for business growth.
            </p>

            <div
              class="mt-6 h-[3px] w-10 bg-yen-gold transition-all duration-300 group-hover:w-20"
            ></div>
          </article>

          <!-- Grow -->
          <article
            class="group rounded-2xl bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
          >
            <div
              class="flex h-12 w-12 items-center justify-center rounded-xl bg-yen-red font-display text-lg font-bold text-white"
            >
              03
            </div>

            <h3
              class="mt-6 font-display text-xl font-bold text-black"
            >
              Grow
            </h3>

            <p
              class="mt-3 font-body text-sm leading-7 text-gray-600"
            >
              Connect entrepreneurs to markets, funding,
              partnerships and opportunities that help businesses
              scale.
            </p>

            <div
              class="mt-6 h-[3px] w-10 bg-yen-red transition-all duration-300 group-hover:w-20"
            ></div>
          </article>

          <!-- Advocate -->
          <article
            class="group rounded-2xl bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
          >
            <div
              class="flex h-12 w-12 items-center justify-center rounded-xl bg-black font-display text-lg font-bold text-white"
            >
              04
            </div>

            <h3
              class="mt-6 font-display text-xl font-bold text-black"
            >
              Advocate
            </h3>

            <p
              class="mt-3 font-body text-sm leading-7 text-gray-600"
            >
              Strengthen the voice of young entrepreneurs and
              encourage an enabling environment for enterprise.
            </p>

            <div
              class="mt-6 h-[3px] w-10 bg-black transition-all duration-300 group-hover:w-20"
            ></div>
          </article>
        </div>
      </div>
    </div>

    <!-- ==========================================
         IMPACT BAND
    =========================================== -->

    <div class="relative overflow-hidden bg-black">
      <!-- Decorative glow -->
      <div
        class="absolute -left-32 top-0 h-72 w-72 rounded-full bg-yen-red/15 blur-3xl"
      ></div>

      <div
        class="absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-yen-gold/15 blur-3xl"
      ></div>

      <div
        class="relative mx-auto max-w-7xl px-5 py-16 lg:px-8"
      >
        <div
          class="grid gap-10 text-center sm:grid-cols-2 lg:grid-cols-4"
        >
          <!-- Impact 1 -->
          <div>
            <p
              class="font-display text-4xl font-extrabold text-yen-gold sm:text-5xl"
            >
              300+
            </p>

            <p
              class="mt-3 font-display text-sm font-semibold text-white"
            >
              Youth-led Businesses Supported
            </p>
          </div>

          <!-- Impact 2 -->
          <div>
            <p
              class="font-display text-4xl font-extrabold text-white sm:text-5xl"
            >
              100
            </p>

            <p
              class="mt-3 font-display text-sm font-semibold text-white"
            >
              Entrepreneurs in 2026 MSME Clinic
            </p>
          </div>

          <!-- Impact 3 -->
          <div>
            <p
              class="font-display text-4xl font-extrabold text-yen-gold sm:text-5xl"
            >
              50+
            </p>

            <p
              class="mt-3 font-display text-sm font-semibold text-white"
            >
              Participants at 2024 Entrepreneurship Conference
            </p>
          </div>

          <!-- Impact 4 -->
          <div>
            <p
              class="font-display text-4xl font-extrabold text-white sm:text-5xl"
            >
              Liberia
            </p>

            <p
              class="mt-3 font-display text-sm font-semibold text-white"
            >
              Building a National Entrepreneur Ecosystem
            </p>
          </div>
        </div>
      </div>

      <div
        class="h-1 w-full bg-linear-to-r from-yen-red via-yen-gold to-yen-red"
      ></div>
    </div>
  </section>
</template>