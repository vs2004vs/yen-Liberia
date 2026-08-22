<script setup>
import { ref, watch } from "vue"
import { useRoute } from "vue-router"

const mobileMenuOpen = ref(false)
const route = useRoute()

const navigation = [
  {
    label: "Home",
    to: {
      name: "home",
    },
  },

  {
    label: "About",
    to: {
      name: "about",
    },
  },

{
  label: "Programs",
  to: {
    name: "programs",
  },
},
  

  {
  label: "Entrepreneurs",
  to: {
    name: "entrepreneurs",
  },
},

 {
  label: "Opportunities",
  to: {
    name: "opportunities",
  },
},

{
  label: "Events",
  to: {
    name: "events",
  },
},

{
  label: "News",
  to: {
    name: "news",
  },
},

{
  label: "Partners",
  to: {
    name: "partners",
  },
},
]

const toggleMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

watch(
  () => route.fullPath,
  () => {
    mobileMenuOpen.value = false
  },
)
</script>

<template>
  <header
    class="sticky top-0 z-50 border-b border-white/10 bg-black/95 backdrop-blur-xl"
  >
    <nav
      class="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-8"
    >
      <!-- ====================================
           LOGO
      ===================================== -->

      <RouterLink
        :to="{ name: 'home' }"
        class="flex shrink-0 items-center"
        aria-label="YEN-Liberia Home"
      >
        <img
          src="/images/yen-logo.png"
          alt="Youth Entrepreneurs Network Liberia"
          class="h-16 w-auto object-contain md:h-20"
        />
      </RouterLink>


      <!-- ====================================
           DESKTOP NAVIGATION
      ===================================== -->

      <div
        class="hidden items-center gap-6 xl:flex"
      >
        <RouterLink
          v-for="item in navigation"
          :key="item.label"
          :to="item.to"
          class="relative py-3 font-display text-sm font-semibold text-white/75 transition duration-300 hover:text-yen-gold"
          active-class="text-yen-gold"
        >
          {{ item.label }}

          <!-- Active indicator -->

          <span
            v-if="
              (item.label === 'Home' && route.name === 'home' && !route.hash) ||
              (item.label === 'About' && route.name === 'about')
            "
            class="absolute bottom-0 left-1/2 h-[3px] w-5 -translate-x-1/2 rounded-full bg-yen-gold"
          ></span>
        </RouterLink>
      </div>


      <!-- ====================================
           DESKTOP CTA
      ===================================== -->

      <div
        class="hidden items-center gap-3 xl:flex"
      >
     <RouterLink
  :to="{ name: 'opportunities' }"
          class="rounded-full border border-yen-gold px-5 py-2.5 font-display text-xs font-bold text-yen-gold transition duration-300 hover:bg-yen-gold hover:text-black"
        >
          Explore Opportunities
        </RouterLink>

        <RouterLink
          :to="{
            name: 'home',
            hash: '#join',
          }"
          class="rounded-full bg-yen-gold px-5 py-2.5 font-display text-xs font-bold text-black transition duration-300 hover:-translate-y-0.5 hover:bg-white"
        >
          Join YEN
        </RouterLink>
      </div>


      <!-- ====================================
           MOBILE MENU BUTTON
      ===================================== -->

      <button
        type="button"
        class="flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 text-white xl:hidden"
        aria-label="Toggle navigation menu"
        :aria-expanded="mobileMenuOpen"
        @click="toggleMenu"
      >
        <!-- Menu -->

        <svg
          v-if="!mobileMenuOpen"
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>

        <!-- Close -->

        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </button>
    </nav>


    <!-- ====================================
         MOBILE NAVIGATION
    ===================================== -->

    <Transition name="mobile-menu">
      <div
        v-if="mobileMenuOpen"
        class="border-t border-white/10 bg-black px-5 py-6 xl:hidden"
      >
        <nav
          class="mx-auto flex max-w-7xl flex-col gap-1"
        >
          <RouterLink
            v-for="item in navigation"
            :key="item.label"
            :to="item.to"
            class="rounded-xl px-4 py-3.5 font-display text-sm font-semibold text-white/75 transition hover:bg-white/10 hover:text-yen-gold"
            active-class="bg-white/5 text-yen-gold"
          >
            {{ item.label }}
          </RouterLink>

          <div
            class="my-4 border-t border-white/10"
          ></div>

          <RouterLink
            :to="{
              name: 'home',
              hash: '#opportunities',
            }"
            class="flex justify-center rounded-full border border-yen-gold px-5 py-3.5 font-display text-sm font-bold text-yen-gold"
          >
            Explore Opportunities
          </RouterLink>

          <RouterLink
            :to="{
              name: 'home',
              hash: '#join',
            }"
            class="mt-2 flex justify-center rounded-full bg-yen-gold px-5 py-3.5 font-display text-sm font-bold text-black"
          >
            Join YEN-Liberia
          </RouterLink>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>