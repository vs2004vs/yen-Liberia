<script setup>
import {
  onBeforeUnmount,
  onMounted,
  ref,
} from "vue"

const slides = [
  {
    image: "/images/hero/hero-1.jpg",
  },
  {
    image: "/images/hero/hero-2.jpg",
  },
  {
    image: "/images/hero/hero-3.jpg",
  },
  {
    image: "/images/hero/hero-4.jpg",
  },
]

const currentSlide = ref(0)
const paused = ref(false)
const reducedMotion = ref(false)

let timer = null
let motionQuery = null

const clearTimer = () => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

const startTimer = () => {
  clearTimer()

  if (
    reducedMotion.value ||
    paused.value
  ) {
    return
  }

  timer = setInterval(() => {
    currentSlide.value =
      (currentSlide.value + 1) %
      slides.length
  }, 6000)
}

const nextSlide = () => {
  currentSlide.value =
    (currentSlide.value + 1) %
    slides.length

  startTimer()
}

const previousSlide = () => {
  currentSlide.value =
    (
      currentSlide.value -
      1 +
      slides.length
    ) %
    slides.length

  startTimer()
}

const goToSlide = (index) => {
  currentSlide.value = index

  startTimer()
}

const togglePause = () => {
  paused.value = !paused.value

  if (paused.value) {
    clearTimer()
  } else {
    startTimer()
  }
}

const handleMotionChange = (event) => {
  reducedMotion.value = event.matches

  if (reducedMotion.value) {
    clearTimer()
  } else if (!paused.value) {
    startTimer()
  }
}

onMounted(() => {
  motionQuery = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  )

  reducedMotion.value =
    motionQuery.matches

  motionQuery.addEventListener(
    "change",
    handleMotionChange,
  )

  startTimer()
})

onBeforeUnmount(() => {
  clearTimer()

  if (motionQuery) {
    motionQuery.removeEventListener(
      "change",
      handleMotionChange,
    )
  }
})
</script>

<template>
  <section
    id="home"
    class="relative isolate min-h-[840px] overflow-hidden sm:min-h-[760px] lg:min-h-[780px] xl:min-h-[800px]"
  >
    <!-- ==========================================
         FULL HERO IMAGE SLIDESHOW
    =========================================== -->

    <div class="absolute inset-0">
      <Transition name="hero-fade" mode="out-in">
        <img
          :key="slides[currentSlide].image"
          :src="slides[currentSlide].image"
          alt=""
          aria-hidden="true"
          class="absolute inset-0 h-full w-full object-cover object-center"
        />
      </Transition>
    </div>


    <!-- ==========================================
         RESPONSIVE IMAGE CONTRAST
    =========================================== -->

    <div
      class="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-black/20 sm:from-black/70 sm:via-black/35 sm:to-black/10 lg:from-black/65 lg:via-black/25 lg:to-transparent"
    ></div>


    <!-- Top navbar contrast -->

    <div
      class="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-black/45 to-transparent sm:h-36"
    ></div>


    <!-- Bottom contrast -->

    <div
      class="absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-black/45 to-transparent sm:h-40 sm:from-black/30"
    ></div>


    <!-- ==========================================
         HERO CONTENT
    =========================================== -->

    <div
      class="relative z-10 mx-auto flex min-h-[840px] max-w-7xl items-center px-5 pb-28 pt-16 sm:min-h-[760px] sm:px-6 sm:pb-24 sm:pt-20 lg:min-h-[780px] lg:px-8 lg:pb-28 lg:pt-24 xl:min-h-[800px]"
    >
      <div
        class="w-full max-w-4xl"
      >
        <!-- ======================================
             TOP LABEL
        ======================================= -->

        <div
          class="mb-5 inline-flex max-w-full items-center gap-3 rounded-full border border-white/35 bg-black/20 px-4 py-2 shadow-lg backdrop-blur-md sm:mb-6"
        >
          <span
            class="h-2 w-2 shrink-0 rounded-full bg-yen-gold"
          ></span>

          <span
            class="truncate font-display text-[10px] font-bold uppercase tracking-[0.16em] text-white/85 sm:text-xs"
          >
            Youth Entrepreneurs Network–Liberia
          </span>
        </div>


        <!-- ======================================
             HERO HEADING
        ======================================= -->

        <h1
          class="max-w-4xl font-display text-[40px] font-extrabold leading-[1.05] tracking-tight text-white drop-shadow-lg min-[390px]:text-[44px] sm:text-6xl lg:text-[70px] xl:text-[76px]"
        >
          Connecting Liberia's

          <span class="text-yen-gold">
            Next Generation
          </span>

          of Entrepreneurs.
        </h1>


        <!-- ======================================
             SUPPORTING TEXT
        ======================================= -->

        <p
          class="mt-6 max-w-2xl font-body text-sm leading-7 text-white/90 drop-shadow-md min-[390px]:text-[15px] sm:mt-7 sm:text-lg sm:leading-8"
        >
          Youth Entrepreneurs Network–Liberia connects young
          entrepreneurs with skills, mentorship, resources,
          partnerships and opportunities to build sustainable
          businesses and contribute to Liberia's economic future.
        </p>


        <!-- ======================================
             CTA BUTTONS
        ======================================= -->

        <div
          class="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:gap-4"
        >
          <RouterLink
            :to="{ name: 'join' }"
            class="inline-flex w-full items-center justify-center rounded-full bg-yen-gold px-6 py-4 font-display text-sm font-bold text-black transition duration-300 hover:-translate-y-1 hover:bg-white sm:w-auto sm:px-7"
          >
            Join YEN-Liberia

            <span class="ml-3">
              →
            </span>
          </RouterLink>


          <RouterLink
            :to="{ name: 'opportunities' }"
            class="inline-flex w-full items-center justify-center rounded-full border border-white/40 bg-black/10 px-6 py-4 font-display text-sm font-bold text-white backdrop-blur-sm transition duration-300 hover:border-yen-gold hover:bg-black/20 hover:text-yen-gold sm:w-auto sm:px-7"
          >
            Explore Opportunities

            <span class="ml-3">
              →
            </span>
          </RouterLink>
        </div>


        <!-- ======================================
             HERO STATS
        ======================================= -->

        <div
          class="mt-9 grid max-w-2xl grid-cols-3 gap-3 border-t border-white/25 pt-6 sm:mt-12 sm:gap-8 sm:pt-8"
        >
          <!-- Stat 1 -->

          <div class="min-w-0">
            <p
              class="font-display text-xl font-extrabold text-yen-gold drop-shadow-md min-[390px]:text-2xl sm:text-3xl"
            >
              300+
            </p>

            <p
              class="mt-2 text-[10px] leading-4 text-white/80 min-[390px]:text-[11px] sm:text-sm sm:leading-5"
            >
              Youth-led businesses supported
            </p>
          </div>


          <!-- Stat 2 -->

          <div class="min-w-0">
            <p
              class="font-display text-xl font-extrabold text-white drop-shadow-md min-[390px]:text-2xl sm:text-3xl"
            >
              15
            </p>

            <p
              class="mt-2 text-[10px] leading-4 text-white/80 min-[390px]:text-[11px] sm:text-sm sm:leading-5"
            >
              Counties to reach
            </p>
          </div>


          <!-- Stat 3 -->

          <div class="min-w-0">
            <p
              class="font-display text-xl font-extrabold text-white drop-shadow-md min-[390px]:text-2xl sm:text-3xl"
            >
              1
            </p>

            <p
              class="mt-2 text-[10px] leading-4 text-white/80 min-[390px]:text-[11px] sm:text-sm sm:leading-5"
            >
              National entrepreneur network
            </p>
          </div>
        </div>
      </div>
    </div>


    <!-- ==========================================
         SLIDESHOW CONTROLS
    =========================================== -->

    <div
      class="absolute bottom-6 right-5 z-20 flex items-center gap-2 sm:bottom-7 sm:gap-3 lg:right-8"
      aria-label="Hero slideshow controls"
    >
      <!-- Previous -->

      <button
        type="button"
        aria-label="Previous hero image"
        class="flex h-10 w-10 items-center justify-center rounded-full border border-white/45 bg-black/20 text-white shadow-xl backdrop-blur-md transition duration-300 hover:border-yen-gold hover:bg-yen-gold hover:text-black sm:h-11 sm:w-11"
        @click="previousSlide"
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


      <!-- Dots -->

      <div
        class="hidden items-center gap-2 rounded-full border border-white/35 bg-black/20 px-4 py-3 shadow-xl backdrop-blur-md sm:flex"
      >
        <button
          v-for="(_, index) in slides"
          :key="index"
          type="button"
          :aria-label="`Go to slide ${index + 1}`"
          :aria-current="
            currentSlide === index
              ? 'true'
              : undefined
          "
          class="h-2 rounded-full transition-all duration-300"
          :class="
            currentSlide === index
              ? 'w-7 bg-yen-gold'
              : 'w-2 bg-white/55 hover:bg-white'
          "
          @click="goToSlide(index)"
        ></button>
      </div>


      <!-- Pause / Play
           Hidden for reduced-motion users because
           autoplay is intentionally disabled.
      -->

      <button
        v-if="!reducedMotion"
        type="button"
        :aria-label="
          paused
            ? 'Resume hero slideshow'
            : 'Pause hero slideshow'
        "
        :aria-pressed="paused"
        class="flex h-10 w-10 items-center justify-center rounded-full border border-white/45 bg-black/20 text-white shadow-xl backdrop-blur-md transition duration-300 hover:border-yen-gold hover:bg-yen-gold hover:text-black sm:h-11 sm:w-11"
        @click="togglePause"
      >
        <!-- Play -->

        <svg
          v-if="paused"
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            d="M8 5v14l11-7z"
          />
        </svg>


        <!-- Pause -->

        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            d="M6 5h4v14H6zm8 0h4v14h-4z"
          />
        </svg>
      </button>


      <!-- Next -->

      <button
        type="button"
        aria-label="Next hero image"
        class="flex h-10 w-10 items-center justify-center rounded-full border border-white/45 bg-black/20 text-white shadow-xl backdrop-blur-md transition duration-300 hover:border-yen-gold hover:bg-yen-gold hover:text-black sm:h-11 sm:w-11"
        @click="nextSlide"
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


    <!-- ==========================================
         YEN BRAND ACCENT
    =========================================== -->

    <div
      class="absolute bottom-0 left-0 z-20 h-1 w-full bg-linear-to-r from-yen-red via-yen-gold to-yen-gold"
    ></div>
  </section>
</template>


<style scoped>
.hero-fade-enter-active,
.hero-fade-leave-active {
  transition: opacity 0.7s ease;
}

.hero-fade-enter-from,
.hero-fade-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .hero-fade-enter-active,
  .hero-fade-leave-active {
    transition: none;
  }
}
</style>