<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue"

const slider = ref(null)
let autoplayTimer = null

/*
  Add the official partner logos here:

  public/
    images/
      partners/
        unido-grow2.png
        lcc.png
        mercy-corps.png
        epa-liberia.png
        yblc.png
        her-voice.png
*/

const partners = [
  {
    id: 1,
    name: "UNIDO GROW-2",
    short: "UNIDO",
    logo: "/images/partners/unido-grow2.png",
  },
  {
    id: 2,
    name: "Liberia Chamber of Commerce",
    short: "LCC",
    logo: "/images/partners/lcc.png",
  },
  {
    id: 3,
    name: "Mercy Corps Liberia",
    short: "MC",
    logo: "/images/partners/mercy-corps.png",
  },
  {
    id: 4,
    name: "Environmental Protection Agency of Liberia",
    short: "EPA",
    logo: "/images/partners/epa-liberia.png",
  },
  {
    id: 5,
    name: "Young Business Leaders Club",
    short: "YBLC",
    logo: "/images/partners/yblc.png",
  },
  {
    id: 6,
    name: "Her Voice Agriculture Farm",
    short: "HVAF",
    logo: "/images/partners/her-voice.png",
  },
]

const failedLogos = ref([])

const logoFailed = (id) => {
  if (!failedLogos.value.includes(id)) {
    failedLogos.value.push(id)
  }
}

const scrollNext = () => {
  if (!slider.value) return

  const container = slider.value

  const reachedEnd =
    container.scrollLeft + container.clientWidth >=
    container.scrollWidth - 20

  if (reachedEnd) {
    container.scrollTo({
      left: 0,
      behavior: "smooth",
    })
  } else {
    container.scrollBy({
      left: Math.min(container.clientWidth * 0.75, 380),
      behavior: "smooth",
    })
  }
}

const scrollPrevious = () => {
  if (!slider.value) return

  const container = slider.value

  if (container.scrollLeft <= 20) {
    container.scrollTo({
      left: container.scrollWidth,
      behavior: "smooth",
    })
  } else {
    container.scrollBy({
      left: -Math.min(container.clientWidth * 0.75, 380),
      behavior: "smooth",
    })
  }
}

const startAutoplay = () => {
  stopAutoplay()

  autoplayTimer = setInterval(() => {
    scrollNext()
  }, 3500)
}

const stopAutoplay = () => {
  if (autoplayTimer) {
    clearInterval(autoplayTimer)
    autoplayTimer = null
  }
}

onMounted(() => {
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches

  if (!reducedMotion) {
    startAutoplay()
  }
})

onBeforeUnmount(() => {
  stopAutoplay()
})
</script>

<template>
  <section
    id="partners"
    class="overflow-hidden bg-white"
  >
    <!-- =========================================
         PARTNER LOGO SLIDER
    ========================================== -->

    <div
      class="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24"
    >
      <!-- Header -->

      <div
        class="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between"
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
            class="font-display max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-black sm:text-5xl"
          >
            Partnerships powering

            <span class="text-yen-red">
              entrepreneurship in Liberia.
            </span>
          </h2>
        </div>

        <!-- Slider Controls -->

        <div
          class="flex items-center gap-3"
        >
          <button
            type="button"
            aria-label="Previous partners"
            class="flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 bg-white text-black transition duration-300 hover:border-black hover:bg-black hover:text-yen-gold"
            @click="scrollPrevious"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            type="button"
            aria-label="Next partners"
            class="flex h-12 w-12 items-center justify-center rounded-full bg-black text-yen-gold transition duration-300 hover:bg-yen-red hover:text-white"
            @click="scrollNext"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Description -->

      <p
        class="mt-6 max-w-3xl font-body text-base leading-8 text-gray-600"
      >
        We collaborate with public institutions, development
        organizations, private-sector actors and entrepreneurship
        networks to expand opportunities for young entrepreneurs
        across Liberia.
      </p>

      <!-- =========================================
           SLIDER
      ========================================== -->

      <div
        class="relative mt-14"
        @mouseenter="stopAutoplay"
        @mouseleave="startAutoplay"
      >
        <!-- Left fade -->

        <div
          class="pointer-events-none absolute bottom-0 left-0 top-0 z-10 hidden w-16 bg-linear-to-r from-white to-transparent lg:block"
        ></div>

        <!-- Right fade -->

        <div
          class="pointer-events-none absolute bottom-0 right-0 top-0 z-10 hidden w-16 bg-linear-to-l from-white to-transparent lg:block"
        ></div>

        <div
          ref="slider"
          class="partner-slider flex snap-x snap-mandatory gap-5 overflow-x-auto px-1 py-4"
        >
          <article
            v-for="partner in partners"
            :key="partner.id"
            class="group flex min-h-[190px] min-w-[82%] snap-start items-center justify-center rounded-[1.5rem] border border-gray-200 bg-white px-8 py-8 transition duration-300 hover:-translate-y-1 hover:border-yen-gold hover:shadow-xl sm:min-w-[45%] lg:min-w-[30%] xl:min-w-[23%]"
          >
            <!-- Actual Logo -->

            <img
              v-if="!failedLogos.includes(partner.id)"
              :src="partner.logo"
              :alt="`${partner.name} logo`"
              class="max-h-24 max-w-[190px] object-contain transition duration-300 group-hover:scale-105"
              @error="logoFailed(partner.id)"
            />

            <!-- Temporary fallback until logo is added -->

            <div
              v-else
              class="flex flex-col items-center text-center"
            >
              <div
                class="flex h-20 w-20 items-center justify-center rounded-2xl bg-black"
              >
                <span
                  class="font-display text-lg font-extrabold text-yen-gold"
                >
                  {{ partner.short }}
                </span>
              </div>

              <p
                class="mt-4 max-w-[180px] font-display text-xs font-bold leading-5 text-gray-500"
              >
                {{ partner.name }}
              </p>
            </div>
          </article>
        </div>
      </div>

      <!-- Small caption -->

      <div
        class="mt-7 flex items-center gap-3"
      >
        <span
          class="h-2 w-2 rounded-full bg-yen-gold"
        ></span>

        <p
          class="font-display text-xs font-semibold text-gray-500"
        >
          Swipe or use the arrows to explore our ecosystem
          collaborators.
        </p>
      </div>
    </div>


    <!-- =========================================
         PARTNERSHIP MESSAGE
    ========================================== -->

    <div
      class="bg-[#f7f7f5]"
    >
      <div
        class="mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8 lg:py-24"
      >
        <!-- Left -->

        <div>
          <p
            class="font-display text-xs font-extrabold uppercase tracking-[0.18em] text-yen-red"
          >
            Why Partner With Us
          </p>

          <h3
            class="mt-4 font-display text-3xl font-extrabold leading-tight text-black sm:text-4xl"
          >
            Strong partnerships create

            <span class="text-yen-red">
              greater impact.
            </span>
          </h3>

          <p
            class="mt-5 font-body text-sm leading-7 text-gray-600 sm:text-base"
          >
            YEN-Liberia brings together entrepreneurs,
            institutions, businesses and development partners
            around a shared goal: creating a stronger environment
            for young people to build sustainable enterprises.
          </p>

          <a
            href="#partner-with-us"
            class="mt-8 inline-flex items-center gap-3 rounded-full bg-black px-7 py-4 font-display text-sm font-bold text-white transition duration-300 hover:-translate-y-1 hover:bg-yen-red"
          >
            Partner With YEN

            <span class="text-yen-gold">
              →
            </span>
          </a>
        </div>

        <!-- Partnership Areas -->

        <div
          class="grid gap-4 sm:grid-cols-2"
        >
          <div
            class="rounded-[1.5rem] bg-white p-7 shadow-sm"
          >
            <span
              class="font-display text-3xl font-extrabold text-yen-gold"
            >
              01
            </span>

            <h4
              class="mt-4 font-display text-xl font-bold text-black"
            >
              Business Development
            </h4>

            <p
              class="mt-3 font-body text-sm leading-7 text-gray-600"
            >
              Training, mentorship and technical support for
              emerging enterprises.
            </p>
          </div>

          <div
            class="rounded-[1.5rem] bg-white p-7 shadow-sm"
          >
            <span
              class="font-display text-3xl font-extrabold text-yen-red"
            >
              02
            </span>

            <h4
              class="mt-4 font-display text-xl font-bold text-black"
            >
              Access to Markets
            </h4>

            <p
              class="mt-3 font-body text-sm leading-7 text-gray-600"
            >
              Helping entrepreneurs connect with institutions,
              customers and new opportunities.
            </p>
          </div>

          <div
            class="rounded-[1.5rem] bg-white p-7 shadow-sm"
          >
            <span
              class="font-display text-3xl font-extrabold text-yen-red"
            >
              03
            </span>

            <h4
              class="mt-4 font-display text-xl font-bold text-black"
            >
              Funding & Investment
            </h4>

            <p
              class="mt-3 font-body text-sm leading-7 text-gray-600"
            >
              Creating pathways toward finance, grants and
              investment readiness.
            </p>
          </div>

          <div
            class="rounded-[1.5rem] bg-white p-7 shadow-sm"
          >
            <span
              class="font-display text-3xl font-extrabold text-yen-gold"
            >
              04
            </span>

            <h4
              class="mt-4 font-display text-xl font-bold text-black"
            >
              Ecosystem Building
            </h4>

            <p
              class="mt-3 font-body text-sm leading-7 text-gray-600"
            >
              Connecting government, private sector and
              development institutions around entrepreneurship.
            </p>
          </div>
        </div>
      </div>
    </div>


    <!-- =========================================
         PARTNER CTA
    ========================================== -->

    <div
      id="partner-with-us"
      class="relative overflow-hidden bg-black"
    >
      <div
        class="absolute -left-32 top-0 h-80 w-80 rounded-full bg-yen-red/10 blur-3xl"
      ></div>

      <div
        class="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-yen-gold/10 blur-3xl"
      ></div>

      <div
        class="relative mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8"
      >
        <div
          class="max-w-3xl"
        >
          <p
            class="font-display text-xs font-bold uppercase tracking-[0.18em] text-yen-gold"
          >
            Build With Us
          </p>

          <h3
            class="mt-5 font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl"
          >
            Let's build a stronger entrepreneurship ecosystem

            <span class="text-yen-gold">
              together.
            </span>
          </h3>

          <p
            class="mt-5 max-w-2xl font-body text-sm leading-7 text-white/65 sm:text-base"
          >
            We welcome businesses, investors, government
            institutions, universities, foundations and
            development organizations committed to supporting
            Liberia's entrepreneurs.
          </p>
        </div>

        <div
          class="flex flex-col gap-3"
        >
          <a
            href="#"
            class="inline-flex min-w-[210px] items-center justify-center rounded-full bg-yen-gold px-7 py-4 font-display text-sm font-bold text-black transition duration-300 hover:-translate-y-1 hover:bg-white"
          >
            Become a Partner

            <span class="ml-3">
              →
            </span>
          </a>

          <a
            href="#contact"
            class="inline-flex min-w-[210px] items-center justify-center rounded-full border border-white/25 px-7 py-4 font-display text-sm font-bold text-white transition duration-300 hover:border-yen-gold hover:text-yen-gold"
          >
            Contact YEN
          </a>
        </div>
      </div>

      <div
        class="h-1 bg-linear-to-r from-yen-red via-yen-gold to-yen-red"
      ></div>
    </div>
  </section>
</template>

<style scoped>
.partner-slider {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.partner-slider::-webkit-scrollbar {
  display: none;
}
</style>