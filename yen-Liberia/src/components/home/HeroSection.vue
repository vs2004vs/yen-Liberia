<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue"

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

let timer = null

const nextSlide = () => {
  currentSlide.value =
    (currentSlide.value + 1) % slides.length
}

const previousSlide = () => {
  currentSlide.value =
    (currentSlide.value - 1 + slides.length) % slides.length
}

const goToSlide = (index) => {
  currentSlide.value = index
}

const togglePause = () => {
  paused.value = !paused.value
}

onMounted(() => {
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches

  if (!reducedMotion) {
    timer = setInterval(() => {
      if (!paused.value) {
        nextSlide()
      }
    }, 6000)
  }
})

onBeforeUnmount(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>

<template>
  <section
    id="home"
    class="relative isolate min-h-[720px] overflow-hidden"
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
          class="absolute inset-0 h-full w-full object-cover object-center"
        />
      </Transition>
    </div>

    <!--
      LIGHT CONTRAST ONLY
      No full black background.
      Left side is slightly darker for readable text.
      Right side keeps the photo clearly visible.
    -->
    <div
      class="absolute inset-0 bg-linear-to-r from-black/55 via-black/20 to-transparent"
    ></div>

    <!-- Slight top contrast for navbar -->
    <div
      class="absolute inset-x-0 top-0 h-36 bg-linear-to-b from-black/35 to-transparent"
    ></div>

    <!-- Slight bottom contrast -->
    <div
      class="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-black/25 to-transparent"
    ></div>

    <!-- ==========================================
         HERO CONTENT
    =========================================== -->

    <div
      class="relative z-10 mx-auto flex min-h-[720px] max-w-7xl items-center px-5 py-24 lg:px-8"
    >
      <div class="max-w-4xl">

        <!-- Small top label -->
        <div
          class="mb-6 inline-flex items-center gap-3 rounded-full border border-white/40 bg-white/10 px-4 py-2 shadow-lg backdrop-blur-md"
        >
          <span
            class="h-2 w-2 rounded-full bg-yen-gold"
          ></span>

          
        </div>

        <!-- Hero Heading -->
        <h1
          class="font-display max-w-4xl text-5xl font-extrabold leading-[1.05] tracking-tight text-white drop-shadow-lg sm:text-6xl lg:text-[76px]"
        >
          Connecting Liberia's

          <span class="text-yen-gold">
            Next Generation
          </span>

          of Entrepreneurs.
        </h1>

        <!-- Supporting text -->
        <p
          class="mt-7 max-w-2xl font-body text-base leading-8 text-black/90 drop-shadow-md sm:text-lg"
        >
          Youth Entrepreneurs Network–Liberia connects young
          entrepreneurs with skills, mentorship, resources,
          partnerships and opportunities to build sustainable
          businesses and contribute to Liberia's economic future.
        </p>

        <!-- CTA Buttons -->
        <div
          class="mt-9 flex flex-col gap-4 sm:flex-row"
        >
          <!-- Main CTA -->
          <a
            href="#join"
            class="font-display inline-flex items-center justify-center rounded-full bg-yen-gold px-7 py-4 text-sm font-bold text-black shadow-xl transition duration-300 hover:-translate-y-1 hover:bg-white"
          >
            Join the Network

            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="ml-2 h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 8l4 4m0 0-4 4m4-4H3"
              />
            </svg>
          </a>

          <!-- Secondary CTA -->
          <a
            href="#opportunities"
            class="font-display inline-flex items-center justify-center rounded-full border border-white/60 bg-white/10 px-7 py-4 text-sm font-semibold text-white shadow-lg backdrop-blur-md transition duration-300 hover:border-yen-gold hover:bg-yen-gold hover:text-black"
          >
            Explore Opportunities
          </a>
        </div>

        <!-- ==========================================
             HERO STATS
        =========================================== -->

        <div
          class="mt-12 grid max-w-2xl grid-cols-3 gap-4 border-t border-white/30 pt-8 sm:gap-8"
        >
          <!-- Stat 1 -->
          <div>
            <p
              class="font-display text-2xl font-extrabold text-yen-gold drop-shadow-md sm:text-3xl"
            >
              300+
            </p>

            <p
              class="mt-2 text-xs leading-5 text-white/85 sm:text-sm"
            >
              Youth-led businesses supported
            </p>
          </div>

          <!-- Stat 2 -->
          <div>
            <p
              class="font-display text-2xl font-extrabold text-white drop-shadow-md sm:text-3xl"
            >
              15
            </p>

            <p
              class="mt-2 text-xs leading-5 text-white/85 sm:text-sm"
            >
              Counties to reach
            </p>
          </div>

          <!-- Stat 3 -->
          <div>
            <p
              class="font-display text-2xl font-extrabold text-white drop-shadow-md sm:text-3xl"
            >
              1
            </p>

            <p
              class="mt-2 text-xs leading-5 text-white/85 sm:text-sm"
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
      class="absolute bottom-7 right-5 z-20 flex items-center gap-3 lg:right-8"
    >
      <!-- Previous button -->
      <button
        type="button"
        aria-label="Previous hero image"
        class="flex h-11 w-11 items-center justify-center rounded-full border border-white/50 bg-white/10 text-white shadow-xl backdrop-blur-md transition duration-300 hover:border-yen-gold hover:bg-yen-gold hover:text-black"
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

      <!-- Slide indicator dots -->
      <div
        class="hidden items-center gap-2 rounded-full border border-white/40 bg-white/10 px-4 py-3 shadow-xl backdrop-blur-md sm:flex"
      >
        <button
          v-for="(_, index) in slides"
          :key="index"
          type="button"
          :aria-label="`Go to slide ${index + 1}`"
          class="h-2 rounded-full transition-all duration-300"
          :class="
            currentSlide === index
              ? 'w-7 bg-yen-gold'
              : 'w-2 bg-white/60 hover:bg-white'
          "
          @click="goToSlide(index)"
        ></button>
      </div>

      <!-- Pause / Play -->
      <button
        type="button"
        :aria-label="
          paused
            ? 'Resume hero slideshow'
            : 'Pause hero slideshow'
        "
        class="flex h-11 w-11 items-center justify-center rounded-full border border-white/50 bg-white/10 text-white shadow-xl backdrop-blur-md transition duration-300 hover:border-yen-gold hover:bg-yen-gold hover:text-black"
        @click="togglePause"
      >
        <!-- Play Icon -->
        <svg
          v-if="paused"
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M8 5v14l11-7z" />
        </svg>

        <!-- Pause Icon -->
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M6 5h4v14H6zm8 0h4v14h-4z" />
        </svg>
      </button>

      <!-- Next button -->
      <button
        type="button"
        aria-label="Next hero image"
        class="flex h-11 w-11 items-center justify-center rounded-full border border-white/50 bg-white/10 text-white shadow-xl backdrop-blur-md transition duration-300 hover:border-yen-gold hover:bg-yen-gold hover:text-black"
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

    <!-- YEN brand accent at bottom -->
    <div
      class="absolute bottom-0 left-0 z-20 h-1 w-full bg-linear-to-r from-yen-red via-yen-gold to-yen-gold"
    ></div>
  </section>
</template>