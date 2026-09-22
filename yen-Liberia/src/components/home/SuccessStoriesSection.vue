<script setup>
import { computed } from "vue"

import {
  entrepreneurs,
} from "@/data/entrepreneurs"

const featuredEntrepreneur = computed(() => {
  return (
    entrepreneurs.find(
      (entrepreneur) =>
        entrepreneur.featured &&
        entrepreneur.verified,
    ) ||
    entrepreneurs.find(
      (entrepreneur) =>
        entrepreneur.verified,
    ) ||
    entrepreneurs[0]
  )
})

const supportingStats = computed(() => {
  return (
    featuredEntrepreneur.value?.impactStats ||
    []
  )
})
</script>

<template>
  <section
    id="stories"
    class="overflow-hidden bg-white"
  >
    <div
      class="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28"
    >
      <!-- =====================================
           SECTION HEADER
      ====================================== -->

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
              Success Stories
            </span>
          </div>

          <h2
            class="max-w-3xl font-display text-4xl font-extrabold leading-tight tracking-tight text-black sm:text-5xl"
          >
            Entrepreneurs turning ideas into

            <span class="text-yen-red">
              real impact.
            </span>
          </h2>
        </div>

        <p
          class="max-w-xl font-body text-base leading-8 text-gray-600 lg:ml-auto"
        >
          Behind every growing business is a journey of
          persistence, learning, opportunity and connection.
          We highlight entrepreneurs whose stories reflect the
          possibilities within Liberia's business ecosystem.
        </p>
      </div>


      <!-- =====================================
           FEATURED STORY
      ====================================== -->

      <div
        v-if="featuredEntrepreneur"
        class="mt-14 grid overflow-hidden rounded-[2rem] bg-black lg:grid-cols-[1fr_1fr]"
      >
        <!-- =================================
             IMAGE
        ================================== -->

        <div
          class="relative min-h-[500px] overflow-hidden lg:min-h-[650px]"
        >
          <img
            :src="featuredEntrepreneur.image"
            :alt="featuredEntrepreneur.name"
            class="absolute inset-0 h-full w-full object-cover"
          />

          <div
            class="absolute inset-0 bg-linear-to-t from-black/80 via-black/15 to-transparent"
          ></div>


          <!-- Featured badge -->

          <div
            class="absolute left-6 top-6 sm:left-8 sm:top-8"
          >
            <span
              class="inline-flex items-center gap-2 rounded-full bg-yen-gold px-4 py-2 font-display text-[10px] font-extrabold uppercase tracking-[0.15em] text-black"
            >
              <span
                class="h-2 w-2 rounded-full bg-yen-red"
              ></span>

              Featured Entrepreneur
            </span>
          </div>


          <!-- Name overlay -->

          <div
            class="absolute bottom-0 left-0 right-0 p-7 sm:p-9"
          >
            <p
              class="font-display text-xs font-bold uppercase tracking-[0.14em] text-yen-gold"
            >
              {{ featuredEntrepreneur.role }}
            </p>

            <h3
              class="mt-2 font-display text-3xl font-extrabold text-white sm:text-4xl"
            >
              {{ featuredEntrepreneur.name }}
            </h3>

            <p
              class="mt-2 font-display text-sm font-semibold text-white/65"
            >
              {{ featuredEntrepreneur.business }}
            </p>
          </div>
        </div>


        <!-- =================================
             STORY
        ================================== -->

        <div
          class="relative flex items-center overflow-hidden p-8 sm:p-10 lg:p-14"
        >
          <!-- Decoration -->

          <div
            class="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-yen-gold/10"
          ></div>

          <div
            class="pointer-events-none absolute -bottom-28 -left-20 h-64 w-64 rounded-full bg-yen-red/10 blur-2xl"
          ></div>


          <div class="relative">
            <p
              class="font-display text-xs font-extrabold uppercase tracking-[0.18em] text-yen-gold"
            >
              Entrepreneur Journey
            </p>

            <h3
              class="mt-5 font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl"
            >
              {{ featuredEntrepreneur.headline }}
            </h3>

            <p
              class="mt-6 font-body text-sm leading-8 text-white/65 sm:text-base"
            >
              {{ featuredEntrepreneur.story }}
            </p>


            <!-- YEN connection -->

            <div
              class="mt-7 rounded-[1.4rem] border border-white/10 bg-white/[0.05] p-6"
            >
              <p
                class="font-display text-[10px] font-extrabold uppercase tracking-[0.16em] text-yen-gold"
              >
                YEN Connection
              </p>

              <p
                class="mt-3 font-body text-sm leading-7 text-white/60"
              >
                {{ featuredEntrepreneur.yenSupport }}
              </p>
            </div>


            <!-- Stats -->

            <div
              v-if="supportingStats.length"
              class="mt-8 grid gap-4 sm:grid-cols-3"
            >
              <div
                v-for="stat in supportingStats"
                :key="stat.label"
                class="rounded-[1.2rem] bg-white/[0.06] p-5"
              >
                <p
                  class="font-display text-2xl font-extrabold text-yen-gold"
                >
                  {{ stat.value }}
                </p>

                <p
                  class="mt-1 font-display text-[10px] font-semibold leading-5 text-white/45"
                >
                  {{ stat.label }}
                </p>
              </div>
            </div>


            <!-- Buttons -->

            <div
              class="mt-9 flex flex-col gap-3 sm:flex-row"
            >
              <RouterLink
                :to="{
                  name: 'entrepreneur-detail',
                  params: {
                    slug: featuredEntrepreneur.slug,
                  },
                }"
                class="inline-flex items-center justify-center rounded-full bg-yen-gold px-7 py-4 font-display text-sm font-bold text-black transition duration-300 hover:-translate-y-1 hover:bg-white"
              >
                Read Full Story

                <span class="ml-3">
                  →
                </span>
              </RouterLink>

              <RouterLink
                :to="{ name: 'entrepreneurs' }"
                class="inline-flex items-center justify-center rounded-full border border-white/25 px-7 py-4 font-display text-sm font-bold text-white transition hover:border-yen-gold hover:text-yen-gold"
              >
                Meet Our Entrepreneurs
              </RouterLink>
            </div>
          </div>
        </div>
      </div>


      <!-- =====================================
           SHARE STORY CTA
      ====================================== -->

      <div
        class="mt-12 flex flex-col gap-6 rounded-[1.7rem] bg-[#f7f7f5] p-7 sm:p-9 lg:flex-row lg:items-center lg:justify-between"
      >
        <div class="max-w-3xl">
          <p
            class="font-display text-xs font-extrabold uppercase tracking-[0.16em] text-yen-red"
          >
            Your Story Matters
          </p>

          <h3
            class="mt-3 font-display text-2xl font-bold text-black"
          >
            Have an entrepreneurship story worth sharing?
          </h3>

          <p
            class="mt-3 max-w-2xl font-body text-sm leading-7 text-gray-600"
          >
            YEN-Liberia wants to highlight entrepreneurs,
            businesses and journeys that can inspire others
            across the ecosystem.
          </p>
        </div>


        <RouterLink
          :to="{ name: 'contact' }"
          class="inline-flex shrink-0 items-center justify-center rounded-full bg-black px-7 py-4 font-display text-sm font-bold text-white transition duration-300 hover:-translate-y-1 hover:bg-yen-red"
        >
          Share Your Story

          <span class="ml-3 text-yen-gold">
            →
          </span>
        </RouterLink>
      </div>
    </div>
  </section>
</template>