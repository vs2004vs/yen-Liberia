<script setup>
import { computed } from "vue"
import { useRoute } from "vue-router"
import { getProgramBySlug } from "@/data/programs"

const route = useRoute()

const program = computed(() =>
  getProgramBySlug(route.params.slug),
)
</script>

<template>
  <main
    v-if="program"
    class="w-full"
  >
    <!-- HERO -->

    <section
      class="relative isolate min-h-[580px] overflow-hidden"
    >
      <img
        :src="program.image"
        :alt="program.title"
        class="absolute inset-0 h-full w-full object-cover"
      />

      <div
        class="absolute inset-0 bg-linear-to-r from-black/90 via-black/60 to-black/15"
      ></div>

      <div
        class="relative z-10 mx-auto flex min-h-[580px] max-w-7xl items-center px-5 py-20 lg:px-8"
      >
        <div class="max-w-4xl">
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
              :to="{ name: 'programs' }"
              class="text-white/50 hover:text-yen-gold"
            >
              Programs
            </RouterLink>

            <span class="text-white/25">/</span>

            <span class="text-yen-gold">
              {{ program.shortTitle }}
            </span>
          </div>

          <p
            class="font-display text-xs font-extrabold uppercase tracking-[0.18em] text-yen-gold"
          >
            {{ program.category }}
          </p>

          <h1
            class="mt-5 font-display text-5xl font-extrabold leading-tight text-white sm:text-6xl"
          >
            {{ program.title }}
          </h1>

          <p
            class="mt-6 max-w-2xl font-body text-base leading-8 text-white/70 sm:text-lg"
          >
            {{ program.summary }}
          </p>

          <div
            class="mt-8 flex flex-wrap gap-3"
          >
            <span
              class="rounded-full bg-yen-gold px-4 py-2 font-display text-xs font-bold text-black"
            >
              {{ program.status }}
            </span>

            <span
              class="rounded-full border border-white/25 bg-white/10 px-4 py-2 font-display text-xs font-semibold text-white backdrop-blur-md"
            >
              {{ program.date }}
            </span>
          </div>
        </div>
      </div>

      <div
        class="absolute bottom-0 h-1 w-full bg-linear-to-r from-yen-red via-yen-gold to-yen-red"
      ></div>
    </section>


    <!-- OVERVIEW -->

    <section class="bg-white">
      <div
        class="mx-auto grid max-w-7xl gap-14 px-5 py-20 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:py-28"
      >
        <div>
          <p
            class="font-display text-xs font-extrabold uppercase tracking-[0.18em] text-yen-red"
          >
            Program Overview
          </p>

          <h2
            class="mt-4 font-display text-4xl font-extrabold text-black"
          >
            About this initiative
          </h2>

          <p
            class="mt-6 font-body text-base leading-8 text-gray-600"
          >
            {{ program.description }}
          </p>

          <!-- Objectives -->

          <h3
            class="mt-10 font-display text-2xl font-bold text-black"
          >
            Program Objectives
          </h3>

          <div
            class="mt-6 space-y-4"
          >
            <div
              v-for="objective in program.objectives"
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


        <!-- DETAILS CARD -->

        <aside>
          <div
            class="sticky top-28 rounded-[1.7rem] bg-black p-7 sm:p-8"
          >
            <p
              class="font-display text-xs font-extrabold uppercase tracking-[0.18em] text-yen-gold"
            >
              Program Details
            </p>

            <div
              class="mt-7 space-y-6"
            >
              <div>
                <p
                  class="font-display text-[10px] font-bold uppercase tracking-wider text-white/35"
                >
                  Date
                </p>

                <p
                  class="mt-2 font-display text-sm font-semibold text-white"
                >
                  {{ program.date }}
                </p>
              </div>

              <div>
                <p
                  class="font-display text-[10px] font-bold uppercase tracking-wider text-white/35"
                >
                  Location
                </p>

                <p
                  class="mt-2 font-display text-sm font-semibold leading-6 text-white"
                >
                  {{ program.location }}
                </p>
              </div>

              <div>
                <p
                  class="font-display text-[10px] font-bold uppercase tracking-wider text-white/35"
                >
                  Impact
                </p>

                <p
                  class="mt-2 font-display text-3xl font-extrabold text-yen-gold"
                >
                  {{ program.impact }}
                </p>

                <p
                  class="font-display text-xs text-white/50"
                >
                  {{ program.impactLabel }}
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>


    <!-- FOCUS AREAS -->

    <section class="bg-[#f7f7f5]">
      <div
        class="mx-auto max-w-7xl px-5 py-20 lg:px-8"
      >
        <p
          class="font-display text-xs font-extrabold uppercase tracking-[0.18em] text-yen-red"
        >
          Key Areas
        </p>

        <h2
          class="mt-4 font-display text-3xl font-extrabold text-black sm:text-4xl"
        >
          Program focus
        </h2>

        <div
          class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          <div
            v-for="(area, index) in program.focusAreas"
            :key="area"
            class="rounded-[1.4rem] bg-white p-6"
          >
            <span
              class="font-display text-sm font-extrabold text-yen-gold"
            >
              {{ String(index + 1).padStart(2, "0") }}
            </span>

            <p
              class="mt-4 font-display text-lg font-bold text-black"
            >
              {{ area }}
            </p>
          </div>
        </div>
      </div>
    </section>


    <!-- PARTNERS -->

    <section class="bg-white">
      <div
        class="mx-auto max-w-7xl px-5 py-20 lg:px-8"
      >
        <p
          class="font-display text-xs font-extrabold uppercase tracking-[0.18em] text-yen-red"
        >
          Collaboration
        </p>

        <h2
          class="mt-4 font-display text-3xl font-extrabold text-black sm:text-4xl"
        >
          Program collaborators
        </h2>

        <div
          class="mt-9 flex flex-wrap gap-3"
        >
          <span
            v-for="partner in program.partners"
            :key="partner"
            class="rounded-full border border-gray-200 bg-[#f7f7f5] px-5 py-3 font-display text-sm font-bold text-black"
          >
            {{ partner }}
          </span>
        </div>

        <RouterLink
          :to="{ name: 'programs' }"
          class="mt-12 inline-flex items-center gap-3 rounded-full bg-black px-7 py-4 font-display text-sm font-bold text-white transition hover:bg-yen-red"
        >
          ← Back to Programs
        </RouterLink>
      </div>
    </section>
  </main>


  <!-- Invalid slug -->

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
        Program not found
      </h1>

      <RouterLink
        :to="{ name: 'programs' }"
        class="mt-7 inline-flex rounded-full bg-black px-7 py-4 font-display text-sm font-bold text-white"
      >
        View Programs
      </RouterLink>
    </div>
  </main>
</template>