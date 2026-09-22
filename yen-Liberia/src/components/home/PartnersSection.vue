<script setup>
import { computed, ref } from "vue"

import {
  partners,
} from "@/data/partners"

const failedLogos = ref([])

const logoFailed = (partnerId) => {
  if (!failedLogos.value.includes(partnerId)) {
    failedLogos.value.push(partnerId)
  }
}

/*
  Duplicate partners so the logo track can loop
  continuously without showing a large blank space.
*/
const partnerLoop = computed(() => [
  ...partners,
  ...partners,
])
</script>

<template>
  <section
    id="partners"
    class="overflow-hidden bg-[#f7f7f5]"
  >
    <!-- =====================================
         PARTNER INTRO
    ====================================== -->

    <div
      class="mx-auto max-w-7xl px-5 pb-14 pt-20 lg:px-8 lg:pb-16 lg:pt-28"
    >
      <div
        class="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end"
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
              Our Partners
            </span>
          </div>

          <h2
            class="max-w-3xl font-display text-4xl font-extrabold leading-tight tracking-tight text-black sm:text-5xl"
          >
            Strong partnerships create

            <span class="text-yen-red">
              greater impact.
            </span>
          </h2>
        </div>

        <p
          class="max-w-xl font-body text-base leading-8 text-gray-600 lg:ml-auto"
        >
          YEN-Liberia works alongside public institutions,
          development organizations, business networks and
          private-sector partners to strengthen Liberia's
          entrepreneurship ecosystem.
        </p>
      </div>
    </div>


    <!-- =====================================
         PARTNER SLIDER
    ====================================== -->

    <div
      class="relative border-y border-gray-200 bg-white py-10"
    >
      <!-- Edge fades -->

      <div
        class="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-white to-transparent sm:w-28"
      ></div>

      <div
        class="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-white to-transparent sm:w-28"
      ></div>


      <!-- Track -->

      <div
        class="partner-marquee flex w-max items-center"
      >
        <div
          v-for="(partner, index) in partnerLoop"
          :key="`${partner.id}-${index}`"
          class="mx-3 flex h-32 w-[240px] shrink-0 items-center justify-center rounded-[1.4rem] border border-gray-200 bg-white px-7 transition duration-300 hover:-translate-y-1 hover:border-yen-gold hover:shadow-xl"
        >
          <img
            v-if="!failedLogos.includes(partner.id)"
            :src="partner.logo"
            :alt="`${partner.name} logo`"
            class="max-h-20 max-w-[180px] object-contain"
            @error="logoFailed(partner.id)"
          />

          <!-- Fallback -->

          <div
            v-else
            class="flex flex-col items-center justify-center text-center"
          >
            <div
              class="flex h-14 w-14 items-center justify-center rounded-xl bg-black"
            >
              <span
                class="font-display text-xs font-extrabold text-yen-gold"
              >
                {{ partner.shortName }}
              </span>
            </div>

            <p
              class="mt-3 max-w-[180px] font-display text-[10px] font-bold leading-4 text-gray-500"
            >
              {{ partner.name }}
            </p>
          </div>
        </div>
      </div>
    </div>


    <!-- =====================================
         PARTNER DETAIL CARDS
    ====================================== -->

    <div
      class="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24"
    >
      <div
        class="grid gap-6 md:grid-cols-3"
      >
        <!-- COLLABORATE -->

        <article
          class="rounded-[1.7rem] bg-white p-8"
        >
          <span
            class="font-display text-4xl font-extrabold text-yen-gold"
          >
            01
          </span>

          <h3
            class="mt-5 font-display text-xl font-bold text-black"
          >
            Collaborate
          </h3>

          <p
            class="mt-3 font-body text-sm leading-7 text-gray-600"
          >
            Co-create entrepreneurship programs, workshops,
            events and initiatives that address real business
            needs.
          </p>
        </article>


        <!-- CONNECT -->

        <article
          class="rounded-[1.7rem] bg-black p-8"
        >
          <span
            class="font-display text-4xl font-extrabold text-yen-gold"
          >
            02
          </span>

          <h3
            class="mt-5 font-display text-xl font-bold text-white"
          >
            Connect
          </h3>

          <p
            class="mt-3 font-body text-sm leading-7 text-white/60"
          >
            Help entrepreneurs connect with knowledge, finance,
            institutions, markets, mentors and opportunities.
          </p>
        </article>


        <!-- SCALE -->

        <article
          class="rounded-[1.7rem] bg-yen-gold p-8"
        >
          <span
            class="font-display text-4xl font-extrabold text-yen-red"
          >
            03
          </span>

          <h3
            class="mt-5 font-display text-xl font-bold text-black"
          >
            Scale Impact
          </h3>

          <p
            class="mt-3 font-body text-sm leading-7 text-black/65"
          >
            Combine resources and expertise to strengthen more
            youth-led businesses across Liberia.
          </p>
        </article>
      </div>


      <!-- =====================================
           PARTNERSHIP CTA
      ====================================== -->

      <div
        class="relative mt-14 overflow-hidden rounded-[2rem] bg-black p-8 sm:p-10 lg:p-14"
      >
        <div
          class="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-yen-gold/10"
        ></div>

        <div
          class="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-yen-red/10 blur-2xl"
        ></div>


        <div
          class="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center"
        >
          <div class="max-w-3xl">
            <p
              class="font-display text-xs font-extrabold uppercase tracking-[0.18em] text-yen-gold"
            >
              Build With Us
            </p>

            <h3
              class="mt-4 font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl"
            >
              Become part of the ecosystem helping

              <span class="text-yen-gold">
                entrepreneurs succeed.
              </span>
            </h3>

            <p
              class="mt-4 max-w-2xl font-body text-sm leading-7 text-white/60 sm:text-base"
            >
              Organizations can work with YEN-Liberia through
              program funding, technical expertise, market
              access, research, events, digital innovation and
              other forms of collaboration.
            </p>
          </div>


          <div
            class="flex flex-col gap-3 sm:flex-row lg:flex-col"
          >
            <RouterLink
              :to="{ name: 'partners' }"
              class="inline-flex min-w-[220px] items-center justify-center rounded-full bg-yen-gold px-7 py-4 font-display text-sm font-bold text-black transition duration-300 hover:-translate-y-1 hover:bg-white"
            >
              Partner With YEN

              <span class="ml-3">
                →
              </span>
            </RouterLink>

            <RouterLink
              :to="{ name: 'contact' }"
              class="inline-flex min-w-[220px] items-center justify-center rounded-full border border-white/25 px-7 py-4 font-display text-sm font-bold text-white transition hover:border-yen-gold hover:text-yen-gold"
            >
              Contact YEN
            </RouterLink>
          </div>
        </div>
      </div>


      <!-- All partners link -->

      <div
        class="mt-10 flex justify-center"
      >
        <RouterLink
          :to="{ name: 'partners' }"
          class="inline-flex items-center gap-3 font-display text-sm font-bold text-black transition hover:text-yen-red"
        >
          Explore Our Partnership Ecosystem

          <span>
            →
          </span>
        </RouterLink>
      </div>
    </div>
  </section>
</template>


<style scoped>
.partner-marquee {
  animation: partner-scroll 35s linear infinite;
}

.partner-marquee:hover {
  animation-play-state: paused;
}

@keyframes partner-scroll {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-50%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .partner-marquee {
    animation: none;
  }
}
</style>