<script setup>
import { computed } from "vue"
import { useRoute } from "vue-router"
import { getOpportunityBySlug } from "@/data/opportunities"

const route = useRoute()

const opportunity = computed(() =>
  getOpportunityBySlug(route.params.slug),
)
</script>

<template>
  <main
    v-if="opportunity"
    class="w-full"
  >
    <!-- ======================================
         HERO
    ======================================= -->

    <section
      class="relative isolate min-h-[580px] overflow-hidden"
    >
      <img
        :src="opportunity.image"
        :alt="opportunity.title"
        class="absolute inset-0 h-full w-full object-cover"
      />

      <div
        class="absolute inset-0 bg-linear-to-r from-black/90 via-black/65 to-black/20"
      ></div>

      <div
        class="relative z-10 mx-auto flex min-h-[580px] max-w-7xl items-center px-5 py-20 lg:px-8"
      >
        <div class="max-w-4xl">
          <!-- Breadcrumb -->

          <div
            class="mb-8 flex flex-wrap items-center gap-3 font-display text-xs font-bold"
          >
            <RouterLink
              :to="{ name: 'home' }"
              class="text-white/50 transition hover:text-yen-gold"
            >
              Home
            </RouterLink>

            <span class="text-white/25">
              /
            </span>

            <RouterLink
              :to="{ name: 'opportunities' }"
              class="text-white/50 transition hover:text-yen-gold"
            >
              Opportunities
            </RouterLink>

            <span class="text-white/25">
              /
            </span>

            <span class="text-yen-gold">
              {{ opportunity.category }}
            </span>
          </div>

          <p
            class="font-display text-xs font-extrabold uppercase tracking-[0.18em] text-yen-gold"
          >
            {{ opportunity.organization }}
          </p>

          <h1
            class="mt-5 font-display text-5xl font-extrabold leading-tight text-white sm:text-6xl"
          >
            {{ opportunity.title }}
          </h1>

          <p
            class="mt-6 max-w-2xl font-body text-base leading-8 text-white/70 sm:text-lg"
          >
            {{ opportunity.summary }}
          </p>

          <div
            class="mt-8 flex flex-wrap gap-3"
          >
            <span
              class="rounded-full bg-yen-gold px-4 py-2 font-display text-xs font-bold text-black"
            >
              {{ opportunity.category }}
            </span>

            <span
              class="rounded-full border border-white/25 bg-white/10 px-4 py-2 font-display text-xs font-semibold text-white backdrop-blur-md"
            >
              {{ opportunity.status }}
            </span>
          </div>
        </div>
      </div>

      <div
        class="absolute bottom-0 h-1 w-full bg-linear-to-r from-yen-red via-yen-gold to-yen-red"
      ></div>
    </section>

    <!-- ======================================
         OVERVIEW
    ======================================= -->

    <section class="bg-white">
      <div
        class="mx-auto grid max-w-7xl gap-14 px-5 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-28"
      >
        <!-- Left -->

        <div>
          <p
            class="font-display text-xs font-extrabold uppercase tracking-[0.18em] text-yen-red"
          >
            Opportunity Overview
          </p>

          <h2
            class="mt-4 font-display text-4xl font-extrabold text-black"
          >
            About this opportunity
          </h2>

          <p
            class="mt-6 font-body text-base leading-8 text-gray-600"
          >
            {{ opportunity.description }}
          </p>

          <!-- Eligibility -->

          <div class="mt-12">
            <h3
              class="font-display text-2xl font-bold text-black"
            >
              Who Can Apply
            </h3>

            <div class="mt-6 space-y-4">
              <div
                v-for="item in opportunity.eligibility"
                :key="item"
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
                  {{ item }}
                </p>
              </div>
            </div>
          </div>

          <!-- Benefits -->

          <div class="mt-12">
            <h3
              class="font-display text-2xl font-bold text-black"
            >
              What You Can Gain
            </h3>

            <div
              class="mt-6 grid gap-4 sm:grid-cols-2"
            >
              <div
                v-for="(benefit, index) in opportunity.benefits"
                :key="benefit"
                class="rounded-[1.3rem] bg-[#f7f7f5] p-6"
              >
                <span
                  class="font-display text-sm font-extrabold text-yen-red"
                >
                  {{ String(index + 1).padStart(2, "0") }}
                </span>

                <p
                  class="mt-3 font-display text-sm font-bold leading-6 text-black"
                >
                  {{ benefit }}
                </p>
              </div>
            </div>
          </div>

          <!-- Requirements -->

          <div class="mt-12">
            <h3
              class="font-display text-2xl font-bold text-black"
            >
              Application Requirements
            </h3>

            <ul class="mt-6 space-y-3">
              <li
                v-for="requirement in opportunity.requirements"
                :key="requirement"
                class="flex items-start gap-3 font-body text-sm leading-7 text-gray-600"
              >
                <span
                  class="mt-3 h-2 w-2 shrink-0 rounded-full bg-yen-red"
                ></span>

                {{ requirement }}
              </li>
            </ul>
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
                Opportunity Details
              </p>

              <div
                class="mt-7 divide-y divide-white/10"
              >
                <div class="py-5 first:pt-0">
                  <p
                    class="font-display text-[10px] font-bold uppercase tracking-wider text-white/35"
                  >
                    Organization
                  </p>

                  <p
                    class="mt-2 font-display text-sm font-semibold text-white"
                  >
                    {{ opportunity.organization }}
                  </p>
                </div>

                <div class="py-5">
                  <p
                    class="font-display text-[10px] font-bold uppercase tracking-wider text-white/35"
                  >
                    Location
                  </p>

                  <p
                    class="mt-2 font-display text-sm font-semibold text-white"
                  >
                    {{ opportunity.location }}
                  </p>
                </div>

                <div class="py-5">
                  <p
                    class="font-display text-[10px] font-bold uppercase tracking-wider text-white/35"
                  >
                    Format
                  </p>

                  <p
                    class="mt-2 font-display text-sm font-semibold text-white"
                  >
                    {{ opportunity.format }}
                  </p>
                </div>

                <div class="py-5">
                  <p
                    class="font-display text-[10px] font-bold uppercase tracking-wider text-white/35"
                  >
                    Deadline
                  </p>

                  <p
                    class="mt-2 font-display text-sm font-bold text-yen-gold"
                  >
                    {{ opportunity.deadline }}
                  </p>
                </div>

                <div class="py-5">
                  <p
                    class="font-display text-[10px] font-bold uppercase tracking-wider text-white/35"
                  >
                    Status
                  </p>

                  <span
                    class="mt-2 inline-flex rounded-full bg-white/10 px-3 py-2 font-display text-xs font-bold text-white"
                  >
                    {{ opportunity.status }}
                  </span>
                </div>
              </div>

              <!-- Apply -->

              <a
                v-if="opportunity.applicationUrl"
                :href="opportunity.applicationUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="mt-7 flex w-full items-center justify-center rounded-full bg-yen-gold px-7 py-4 font-display text-sm font-bold text-black transition hover:bg-white"
              >
                Apply Now

                <span class="ml-3">
                  →
                </span>
              </a>

              <button
                v-else
                type="button"
                disabled
                class="mt-7 flex w-full cursor-not-allowed items-center justify-center rounded-full bg-white/10 px-7 py-4 font-display text-sm font-bold text-white/45"
              >
                Applications Not Open Yet
              </button>
            </div>

            <div
              class="bg-yen-gold px-7 py-5 sm:px-8"
            >
              <p
                class="font-body text-xs leading-6 text-black/70"
              >
                Always verify opportunity requirements and
                deadlines from the official organization before
                submitting an application.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </section>

    <!-- Back -->

    <section class="bg-[#f7f7f5]">
      <div
        class="mx-auto max-w-7xl px-5 py-16 lg:px-8"
      >
        <RouterLink
          :to="{ name: 'opportunities' }"
          class="inline-flex items-center gap-3 rounded-full bg-black px-7 py-4 font-display text-sm font-bold text-white transition hover:bg-yen-red"
        >
          ← Back to Opportunities
        </RouterLink>
      </div>
    </section>
  </main>

  <!-- 404 -->

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
        Opportunity not found
      </h1>

      <RouterLink
        :to="{ name: 'opportunities' }"
        class="mt-7 inline-flex rounded-full bg-black px-7 py-4 font-display text-sm font-bold text-white"
      >
        Browse Opportunities
      </RouterLink>
    </div>
  </main>
</template>