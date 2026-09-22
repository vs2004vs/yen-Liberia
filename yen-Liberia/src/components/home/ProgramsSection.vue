<script setup>
import { computed } from "vue"
import { programs } from "@/data/programs"

const featuredProgram = computed(() => programs[0])

const secondaryPrograms = computed(() =>
  programs.slice(1, 3),
)
</script>

<template>
  <section
    id="programs"
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
              Programs & Initiatives
            </span>
          </div>

          <h2
            class="max-w-3xl font-display text-4xl font-extrabold leading-tight tracking-tight text-black sm:text-5xl"
          >
            Practical programs that help entrepreneurs

            <span class="text-yen-red">
              move forward.
            </span>
          </h2>
        </div>

        <div>
          <p
            class="max-w-xl font-body text-base leading-8 text-gray-600 lg:ml-auto"
          >
            YEN-Liberia works with entrepreneurs and ecosystem
            partners to deliver training, capacity building,
            networking and practical business-development
            initiatives.
          </p>
        </div>
      </div>


      <!-- =====================================
           PROGRAM LAYOUT
      ====================================== -->

      <div
        v-if="featuredProgram"
        class="mt-14 grid gap-7 lg:grid-cols-[1.15fr_0.85fr]"
      >
        <!-- =================================
             FEATURED PROGRAM
        ================================== -->

        <article
          class="group relative min-h-[620px] overflow-hidden rounded-[2rem] bg-black"
        >
          <img
            :src="featuredProgram.image"
            :alt="featuredProgram.title"
            class="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />

          <div
            class="absolute inset-0 bg-linear-to-t from-black via-black/55 to-black/5"
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

              Featured Program
            </span>
          </div>


          <!-- Content -->

          <div
            class="absolute bottom-0 left-0 right-0 p-7 sm:p-9 lg:p-10"
          >
            <div
              class="flex flex-wrap items-center gap-3"
            >
              <span
                class="font-display text-xs font-extrabold uppercase tracking-[0.14em] text-yen-gold"
              >
                {{ featuredProgram.category }}
              </span>

              <span
                class="h-1 w-1 rounded-full bg-white/40"
              ></span>

              <span
                class="font-display text-xs font-semibold text-white/60"
              >
                {{ featuredProgram.year }}
              </span>
            </div>


            <h3
              class="mt-5 max-w-3xl font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl"
            >
              {{ featuredProgram.title }}
            </h3>


            <p
              class="mt-5 max-w-2xl font-body text-sm leading-7 text-white/70 sm:text-base"
            >
              {{ featuredProgram.summary }}
            </p>


            <!-- Impact + button -->

            <div
              class="mt-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"
            >
              <div>
                <p
                  class="font-display text-4xl font-extrabold text-yen-gold"
                >
                  {{ featuredProgram.impact }}
                </p>

                <p
                  class="mt-1 font-display text-xs font-semibold text-white/55"
                >
                  {{ featuredProgram.impactLabel }}
                </p>
              </div>


              <RouterLink
                :to="{
                  name: 'program-detail',
                  params: {
                    slug: featuredProgram.slug,
                  },
                }"
                class="inline-flex items-center justify-center gap-3 rounded-full bg-yen-gold px-6 py-3.5 font-display text-sm font-bold text-black transition duration-300 hover:-translate-y-1 hover:bg-white"
              >
                View Program

                <span>
                  →
                </span>
              </RouterLink>
            </div>
          </div>
        </article>


        <!-- =================================
             SECONDARY PROGRAMS
        ================================== -->

        <div
          class="flex flex-col gap-7"
        >
          <article
            v-for="program in secondaryPrograms"
            :key="program.id"
            class="group flex flex-1 flex-col overflow-hidden rounded-[1.7rem] border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-xl sm:flex-row lg:flex-col xl:flex-row"
          >
            <!-- Image -->

            <div
              class="relative h-[240px] overflow-hidden sm:h-auto sm:w-[42%] lg:h-[230px] lg:w-full xl:h-auto xl:w-[42%]"
            >
              <img
                :src="program.image"
                :alt="program.title"
                class="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />

              <div
                class="absolute inset-0 bg-black/10"
              ></div>


              <div
                class="absolute left-4 top-4"
              >
                <span
                  class="rounded-full bg-yen-gold px-3 py-1.5 font-display text-[9px] font-extrabold uppercase tracking-wider text-black"
                >
                  {{ program.status }}
                </span>
              </div>
            </div>


            <!-- Content -->

            <div
              class="flex flex-1 flex-col justify-center p-6"
            >
              <p
                class="font-display text-[10px] font-extrabold uppercase tracking-[0.14em] text-yen-red"
              >
                {{ program.category }}
              </p>

              <h3
                class="mt-3 font-display text-xl font-bold leading-snug text-black"
              >
                {{ program.title }}
              </h3>

              <p
                class="mt-4 line-clamp-3 font-body text-sm leading-7 text-gray-600"
              >
                {{ program.summary }}
              </p>


              <div
                class="mt-5 flex items-center justify-between gap-4 border-t border-gray-100 pt-5"
              >
                <div>
                  <p
                    class="font-display text-[9px] font-bold uppercase tracking-wider text-gray-400"
                  >
                    Impact
                  </p>

                  <p
                    class="mt-1 font-display text-xs font-bold text-black"
                  >
                    {{ program.impact }}
                    {{ program.impactLabel }}
                  </p>
                </div>


                <RouterLink
                  :to="{
                    name: 'program-detail',
                    params: {
                      slug: program.slug,
                    },
                  }"
                  class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-yen-gold transition duration-300 group-hover:bg-yen-red group-hover:text-white"
                  :aria-label="`View ${program.title}`"
                >
                  →
                </RouterLink>
              </div>
            </div>
          </article>
        </div>
      </div>


      <!-- =====================================
           BOTTOM CTA
      ====================================== -->

      <div
        class="mt-12 flex flex-col items-start justify-between gap-6 border-t border-gray-200 pt-8 sm:flex-row sm:items-center"
      >
        <p
          class="max-w-xl font-body text-sm leading-7 text-gray-500"
        >
          Explore YEN-Liberia's entrepreneurship programs,
          capacity-building initiatives and ecosystem activities.
        </p>

        <RouterLink
          :to="{ name: 'programs' }"
          class="inline-flex items-center gap-3 rounded-full border border-black px-6 py-3.5 font-display text-sm font-bold text-black transition duration-300 hover:bg-black hover:text-yen-gold"
        >
          View All Programs

          <span>
            →
          </span>
        </RouterLink>
      </div>
    </div>
  </section>
</template>