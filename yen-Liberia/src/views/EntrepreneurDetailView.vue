<script setup>
import { computed } from "vue"
import { useRoute } from "vue-router"

import {
  getEntrepreneurBySlug,
} from "@/data/entrepreneurs"

const route = useRoute()

const entrepreneur = computed(() =>
  getEntrepreneurBySlug(route.params.slug),
)

const hasContactInformation = computed(() => {
  if (!entrepreneur.value) return false

  return Boolean(
    entrepreneur.value.website ||
      entrepreneur.value.facebook ||
      entrepreneur.value.instagram ||
      entrepreneur.value.linkedin ||
      entrepreneur.value.phone ||
      entrepreneur.value.email,
  )
})
</script>

<template>
  <main
    v-if="entrepreneur"
    class="w-full"
  >

    <!-- ==================================
         PROFILE HERO
    =================================== -->

    <section
      class="relative isolate min-h-[620px] overflow-hidden"
    >
      <img
        :src="entrepreneur.image"
        :alt="entrepreneur.name"
        class="absolute inset-0 h-full w-full object-cover"
      />

      <div
        class="absolute inset-0 bg-linear-to-r from-black/90 via-black/65 to-black/20"
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

            <span class="text-white/25">
              /
            </span>

            <RouterLink
              :to="{ name: 'entrepreneurs' }"
              class="text-white/50 hover:text-yen-gold"
            >
              Entrepreneurs
            </RouterLink>

            <span class="text-white/25">
              /
            </span>

            <span class="text-yen-gold">
              {{ entrepreneur.name }}
            </span>
          </div>


          <!-- Status -->

          <div class="flex flex-wrap gap-3">
            <span
              class="rounded-full bg-yen-gold px-4 py-2 font-display text-[10px] font-extrabold uppercase tracking-wider text-black"
            >
              {{ entrepreneur.industry }}
            </span>

            <span
              v-if="entrepreneur.verified"
              class="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 font-display text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md"
            >
              <span
                class="flex h-4 w-4 items-center justify-center rounded-full bg-yen-red text-[8px]"
              >
                ✓
              </span>

              Verified YEN Profile
            </span>
          </div>


          <!-- Name -->

          <h1
            class="mt-6 font-display text-5xl font-extrabold leading-tight text-white sm:text-6xl lg:text-7xl"
          >
            {{ entrepreneur.name }}
          </h1>

          <p
            class="mt-3 font-display text-xl font-bold text-yen-gold sm:text-2xl"
          >
            {{ entrepreneur.role }},
            {{ entrepreneur.business }}
          </p>

          <p
            class="mt-6 max-w-3xl font-body text-base leading-8 text-white/70 sm:text-lg"
          >
            {{ entrepreneur.headline }}
          </p>
        </div>
      </div>

      <div
        class="absolute bottom-0 h-1 w-full bg-linear-to-r from-yen-red via-yen-gold to-yen-red"
      ></div>
    </section>


    <!-- ==================================
         PROFILE OVERVIEW
    =================================== -->

    <section class="bg-white">
      <div
        class="mx-auto grid max-w-7xl gap-14 px-5 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-28"
      >

        <!-- LEFT -->

        <div>
          <p
            class="font-display text-xs font-extrabold uppercase tracking-[0.18em] text-yen-red"
          >
            Entrepreneur Profile
          </p>

          <h2
            class="mt-4 font-display text-4xl font-extrabold text-black"
          >
            About {{ entrepreneur.name }}
          </h2>

          <p
            class="mt-6 font-body text-base leading-8 text-gray-600"
          >
            {{ entrepreneur.about }}
          </p>


          <!-- Journey -->

          <h3
            class="mt-12 font-display text-2xl font-bold text-black"
          >
            The Business Journey
          </h3>

          <p
            class="mt-5 font-body text-base leading-8 text-gray-600"
          >
            {{ entrepreneur.story }}
          </p>


          <!-- YEN relationship -->

          <div
            class="mt-10 rounded-[1.6rem] bg-[#f7f7f5] p-7 sm:p-8"
          >
            <p
              class="font-display text-xs font-extrabold uppercase tracking-[0.17em] text-yen-red"
            >
              YEN Connection
            </p>

            <h3
              class="mt-3 font-display text-xl font-bold text-black"
            >
              Growing through the network
            </h3>

            <p
              class="mt-4 font-body text-sm leading-7 text-gray-600"
            >
              {{ entrepreneur.yenSupport }}
            </p>
          </div>


          <!-- Services -->

          <div class="mt-12">
            <h3
              class="font-display text-2xl font-bold text-black"
            >
              Products & Services
            </h3>

            <div
              class="mt-6 flex flex-wrap gap-3"
            >
              <span
                v-for="service in entrepreneur.productsServices"
                :key="service"
                class="rounded-full border border-gray-200 bg-white px-5 py-3 font-display text-xs font-bold text-black shadow-sm"
              >
                {{ service }}
              </span>
            </div>
          </div>


          <!-- Impact -->

          <div
            v-if="entrepreneur.impactStats.length"
            class="mt-12"
          >
            <h3
              class="font-display text-2xl font-bold text-black"
            >
              Business Impact
            </h3>

            <div
              class="mt-6 grid gap-4 sm:grid-cols-3"
            >
              <div
                v-for="stat in entrepreneur.impactStats"
                :key="stat.label"
                class="rounded-[1.4rem] bg-black p-6"
              >
                <p
                  class="font-display text-3xl font-extrabold text-yen-gold"
                >
                  {{ stat.value }}
                </p>

                <p
                  class="mt-2 font-display text-xs font-semibold text-white/55"
                >
                  {{ stat.label }}
                </p>
              </div>
            </div>
          </div>
        </div>


        <!-- =================================
             BUSINESS CARD
        ================================== -->

        <aside>
          <div
            class="sticky top-28 overflow-hidden rounded-[1.8rem] bg-black"
          >
            <div class="p-7 sm:p-8">

              <p
                class="font-display text-xs font-extrabold uppercase tracking-[0.18em] text-yen-gold"
              >
                Business Information
              </p>

              <h3
                class="mt-4 font-display text-2xl font-bold leading-snug text-white"
              >
                {{ entrepreneur.business }}
              </h3>

              <div
                class="mt-7 divide-y divide-white/10"
              >

                <!-- Founder -->

                <div class="py-5 first:pt-0">
                  <p
                    class="font-display text-[10px] font-bold uppercase tracking-wider text-white/35"
                  >
                    Founder
                  </p>

                  <p
                    class="mt-2 font-display text-sm font-semibold text-white"
                  >
                    {{ entrepreneur.name }}
                  </p>
                </div>


                <!-- Industry -->

                <div class="py-5">
                  <p
                    class="font-display text-[10px] font-bold uppercase tracking-wider text-white/35"
                  >
                    Industry
                  </p>

                  <p
                    class="mt-2 font-display text-sm font-semibold text-white"
                  >
                    {{ entrepreneur.industry }}
                  </p>
                </div>


                <!-- County -->

                <div class="py-5">
                  <p
                    class="font-display text-[10px] font-bold uppercase tracking-wider text-white/35"
                  >
                    County
                  </p>

                  <p
                    class="mt-2 font-display text-sm font-semibold text-white"
                  >
                    {{ entrepreneur.county }}
                  </p>
                </div>


                <!-- Location -->

                <div class="py-5">
                  <p
                    class="font-display text-[10px] font-bold uppercase tracking-wider text-white/35"
                  >
                    Location
                  </p>

                  <p
                    class="mt-2 font-display text-sm font-semibold text-white"
                  >
                    {{ entrepreneur.location }}
                  </p>
                </div>


                <!-- Founded -->

                <div class="py-5">
                  <p
                    class="font-display text-[10px] font-bold uppercase tracking-wider text-white/35"
                  >
                    Founded
                  </p>

                  <p
                    class="mt-2 font-display text-sm font-semibold text-white"
                  >
                    {{ entrepreneur.yearFounded }}
                  </p>
                </div>


                <!-- Status -->

                <div class="py-5">
                  <p
                    class="font-display text-[10px] font-bold uppercase tracking-wider text-white/35"
                  >
                    YEN Status
                  </p>

                  <span
                    class="mt-2 inline-flex rounded-full bg-yen-gold/10 px-3 py-2 font-display text-xs font-bold text-yen-gold"
                  >
                    {{ entrepreneur.memberStatus }}
                  </span>
                </div>
              </div>


              <!-- Contact links -->

              <div
                v-if="hasContactInformation"
                class="mt-7 space-y-3"
              >
                <a
                  v-if="entrepreneur.website"
                  :href="entrepreneur.website"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex w-full justify-center rounded-full bg-yen-gold px-6 py-4 font-display text-sm font-bold text-black"
                >
                  Visit Website
                </a>

                <a
                  v-if="entrepreneur.email"
                  :href="`mailto:${entrepreneur.email}`"
                  class="flex w-full justify-center rounded-full border border-white/20 px-6 py-4 font-display text-sm font-bold text-white"
                >
                  Contact Business
                </a>
              </div>

              <!-- Contact unavailable -->

              <div
                v-else
                class="mt-7 rounded-xl bg-white/5 p-4"
              >
                <p
                  class="font-body text-xs leading-6 text-white/45"
                >
                  Public contact information has not yet been
                  added to this profile.
                </p>
              </div>
            </div>


            <!-- Profile notice -->

            <div
              class="bg-yen-gold px-7 py-5 sm:px-8"
            >
              <p
                class="font-body text-xs leading-6 text-black/70"
              >
                YEN profile information should be verified by
                the entrepreneur and YEN-Liberia before public
                publication.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </section>


    <!-- ==================================
         BACK / CTA
    =================================== -->

    <section class="bg-[#f7f7f5]">
      <div
        class="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-16 sm:flex-row sm:items-center sm:justify-between lg:px-8"
      >
        <RouterLink
          :to="{ name: 'entrepreneurs' }"
          class="inline-flex items-center gap-3 font-display text-sm font-bold text-black transition hover:text-yen-red"
        >
          ← Back to Entrepreneur Directory
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


  <!-- ==================================
       404
  =================================== -->

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
        Entrepreneur not found
      </h1>

      <p
        class="mx-auto mt-3 max-w-md font-body text-sm leading-7 text-gray-500"
      >
        This entrepreneur profile may have been removed or is
        not yet publicly available.
      </p>

      <RouterLink
        :to="{ name: 'entrepreneurs' }"
        class="mt-7 inline-flex rounded-full bg-black px-7 py-4 font-display text-sm font-bold text-white"
      >
        Browse Entrepreneurs
      </RouterLink>
    </div>
  </main>
</template>