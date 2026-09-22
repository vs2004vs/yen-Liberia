<script setup>
import {
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from "vue"

import { useRoute } from "vue-router"


/*
|--------------------------------------------------------------------------
| ROUTE
|--------------------------------------------------------------------------
*/

const route = useRoute()


/*
|--------------------------------------------------------------------------
| MENU STATE
|--------------------------------------------------------------------------
*/

const mobileMenuOpen = ref(false)
const mediaMenuOpen = ref(false)


/*
|--------------------------------------------------------------------------
| ELEMENT REFERENCES
|--------------------------------------------------------------------------
*/

const mobileMenuButton = ref(null)
const mediaButton = ref(null)
const mediaContainer = ref(null)
const mediaDropdown = ref(null)


/*
|--------------------------------------------------------------------------
| DESKTOP NAVIGATION
|--------------------------------------------------------------------------
*/

const navigation = [
  {
    label: "Home",

    to: {
      name: "home",
    },

    activeNames: [
      "home",
    ],
  },

  {
    label: "About",

    to: {
      name: "about",
    },

    activeNames: [
      "about",
    ],
  },

  {
    label: "Programs",

    to: {
      name: "programs",
    },

    activeNames: [
      "programs",
      "program-detail",
    ],
  },

  {
    label: "Entrepreneurs",

    to: {
      name: "entrepreneurs",
    },

    activeNames: [
      "entrepreneurs",
      "entrepreneur-detail",
    ],
  },

  {
    label: "Opportunities",

    to: {
      name: "opportunities",
    },

    activeNames: [
      "opportunities",
      "opportunity-detail",
    ],
  },

  {
    label: "Events",

    to: {
      name: "events",
    },

    activeNames: [
      "events",
      "event-detail",
    ],
  },

  {
    label: "Partners",

    to: {
      name: "partners",
    },

    activeNames: [
      "partners",
    ],
  },
]


/*
|--------------------------------------------------------------------------
| MEDIA NAVIGATION
|--------------------------------------------------------------------------
*/

const mediaNavigation = [
  {
    label: "News & Insights",

    description:
      "Stories, announcements and media coverage.",

    to: {
      name: "news",
    },

    activeNames: [
      "news",
      "news-detail",
    ],
  },

  {
    label: "Business Resources",

    description:
      "Templates, guides, reports and business tools.",

    to: {
      name: "resources",
    },

    activeNames: [
      "resources",
      "resource-detail",
    ],
  },
]


/*
|--------------------------------------------------------------------------
| MOBILE NAVIGATION
|--------------------------------------------------------------------------
|
| Keep each page visible individually on smaller screens.
|
| activeNames also allow section links to stay highlighted
| when the visitor is viewing a detail page.
|
*/

const mobileNavigation = [
  {
    label: "Home",

    to: {
      name: "home",
    },

    activeNames: [
      "home",
    ],
  },

  {
    label: "About",

    to: {
      name: "about",
    },

    activeNames: [
      "about",
    ],
  },

  {
    label: "Programs",

    to: {
      name: "programs",
    },

    activeNames: [
      "programs",
      "program-detail",
    ],
  },

  {
    label: "Entrepreneurs",

    to: {
      name: "entrepreneurs",
    },

    activeNames: [
      "entrepreneurs",
      "entrepreneur-detail",
    ],
  },

  {
    label: "Opportunities",

    to: {
      name: "opportunities",
    },

    activeNames: [
      "opportunities",
      "opportunity-detail",
    ],
  },

  {
    label: "Events",

    to: {
      name: "events",
    },

    activeNames: [
      "events",
      "event-detail",
    ],
  },

  {
    label: "Resources",

    to: {
      name: "resources",
    },

    activeNames: [
      "resources",
      "resource-detail",
    ],
  },

  {
    label: "News",

    to: {
      name: "news",
    },

    activeNames: [
      "news",
      "news-detail",
    ],
  },

  {
    label: "Partners",

    to: {
      name: "partners",
    },

    activeNames: [
      "partners",
    ],
  },

  {
    label: "Contact",

    to: {
      name: "contact",
    },

    activeNames: [
      "contact",
    ],
  },
]


/*
|--------------------------------------------------------------------------
| ACTIVE STATES
|--------------------------------------------------------------------------
*/

const isActive = (item) => {
  return item.activeNames?.includes(
    String(route.name),
  )
}


/*
  aria-current="page" should identify the link to the
  actual current page.

  Parent section links may still appear visually active
  while viewing a detail page, but they are not falsely
  announced as the current page.
*/

const isCurrentPage = (item) => {
  return (
    String(route.name) ===
    String(item.to?.name)
  )
}


const isMediaActive = () => {
  return mediaNavigation.some(
    (item) =>
      item.activeNames.includes(
        String(route.name),
      ),
  )
}


/*
|--------------------------------------------------------------------------
| MOBILE MENU
|--------------------------------------------------------------------------
*/

const toggleMobileMenu = () => {
  mobileMenuOpen.value =
    !mobileMenuOpen.value

  if (mobileMenuOpen.value) {
    mediaMenuOpen.value = false
  }
}


const closeMobileMenu = async (
  returnFocus = false,
) => {
  mobileMenuOpen.value = false

  if (returnFocus) {
    await nextTick()

    mobileMenuButton.value?.focus()
  }
}


/*
|--------------------------------------------------------------------------
| MEDIA DROPDOWN
|--------------------------------------------------------------------------
*/

const openMediaMenu = () => {
  mediaMenuOpen.value = true
  mobileMenuOpen.value = false
}


const closeMediaMenu = async (
  returnFocus = false,
) => {
  mediaMenuOpen.value = false

  if (returnFocus) {
    await nextTick()

    mediaButton.value?.focus()
  }
}


const toggleMediaMenu = () => {
  if (mediaMenuOpen.value) {
    closeMediaMenu()
  } else {
    openMediaMenu()
  }
}


/*
  Optional keyboard convenience:

  Down Arrow from the Media button opens
  the disclosure and moves focus to the
  first navigation link.
*/

const openMediaMenuAndFocusFirst =
  async () => {
    openMediaMenu()

    await nextTick()

    const firstLink =
      mediaDropdown.value?.querySelector(
        "a",
      )

    firstLink?.focus()
  }


/*
  Keep traditional desktop hover behavior.

  Do not close the menu on mouse leave if keyboard
  focus is still inside the Media navigation area.
*/

const handleMediaMouseLeave = () => {
  const container =
    mediaContainer.value

  if (!container) {
    return
  }

  if (
    container.contains(
      document.activeElement,
    )
  ) {
    return
  }

  mediaMenuOpen.value = false
}


/*
  When keyboard focus completely leaves the Media
  disclosure, close it.
*/

const handleMediaFocusOut = (
  event,
) => {
  const container =
    mediaContainer.value

  const nextTarget =
    event.relatedTarget

  if (!container) {
    return
  }

  if (
    nextTarget &&
    container.contains(nextTarget)
  ) {
    return
  }

  mediaMenuOpen.value = false
}


/*
|--------------------------------------------------------------------------
| OUTSIDE CLICK
|--------------------------------------------------------------------------
*/

const handleDocumentPointerDown = (
  event,
) => {
  if (!mediaMenuOpen.value) {
    return
  }

  const container =
    mediaContainer.value

  if (
    container &&
    !container.contains(event.target)
  ) {
    mediaMenuOpen.value = false
  }
}


/*
|--------------------------------------------------------------------------
| ESCAPE KEY
|--------------------------------------------------------------------------
*/

const handleDocumentKeydown = async (
  event,
) => {
  if (event.key !== "Escape") {
    return
  }


  /*
    Media takes priority if open.
  */

  if (mediaMenuOpen.value) {
    event.preventDefault()

    await closeMediaMenu(true)

    return
  }


  /*
    Close mobile navigation and return focus
    to the menu button.
  */

  if (mobileMenuOpen.value) {
    event.preventDefault()

    await closeMobileMenu(true)
  }
}


/*
|--------------------------------------------------------------------------
| RESPONSIVE STATE CLEANUP
|--------------------------------------------------------------------------
|
| Prevent an invisible mobile or desktop menu from remaining
| logically open when the viewport changes significantly.
|
*/

const handleResize = () => {
  if (window.innerWidth >= 1280) {
    mobileMenuOpen.value = false
  } else {
    mediaMenuOpen.value = false
  }
}


/*
|--------------------------------------------------------------------------
| ROUTE CHANGES
|--------------------------------------------------------------------------
|
| Close navigation disclosures after navigation.
|
*/

watch(
  () => route.fullPath,

  () => {
    mobileMenuOpen.value = false
    mediaMenuOpen.value = false
  },
)


/*
|--------------------------------------------------------------------------
| GLOBAL EVENT LISTENERS
|--------------------------------------------------------------------------
*/

onMounted(() => {
  document.addEventListener(
    "pointerdown",
    handleDocumentPointerDown,
  )

  document.addEventListener(
    "keydown",
    handleDocumentKeydown,
  )

  window.addEventListener(
    "resize",
    handleResize,
  )
})


onBeforeUnmount(() => {
  document.removeEventListener(
    "pointerdown",
    handleDocumentPointerDown,
  )

  document.removeEventListener(
    "keydown",
    handleDocumentKeydown,
  )

  window.removeEventListener(
    "resize",
    handleResize,
  )
})
</script>


<template>
  <header
    class="sticky top-0 z-50 border-b border-white/10 bg-black/95 backdrop-blur-xl"
  >
    <!-- =========================================
         MAIN NAVBAR
    ========================================== -->

    <nav
      class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 lg:px-8"
      aria-label="Main navigation"
    >

      <!-- =====================================
           LOGO
      ====================================== -->

      <RouterLink
        :to="{ name: 'home' }"
        class="flex shrink-0 items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yen-gold focus-visible:ring-offset-4 focus-visible:ring-offset-black"
        aria-label="Youth Entrepreneurs Network Liberia Home"
      >
        <img
          src="/images/yen-logo.png"
          alt=""
          class="h-16 w-auto object-contain md:h-[72px]"
        />
      </RouterLink>


      <!-- =====================================
           DESKTOP NAVIGATION
      ====================================== -->

      <ul
        class="hidden items-center gap-4 xl:flex"
      >
        <!-- Normal navigation -->

        <li
          v-for="item in navigation"
          :key="item.label"
        >
          <RouterLink
            :to="item.to"
            class="group relative block whitespace-nowrap rounded-sm py-3 font-display text-xs font-semibold text-white/75 transition duration-300 hover:text-yen-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yen-gold focus-visible:ring-offset-4 focus-visible:ring-offset-black 2xl:text-sm"
            :class="
              isActive(item)
                ? 'text-yen-gold'
                : ''
            "
            :aria-current="
              isCurrentPage(item)
                ? 'page'
                : undefined
            "
          >
            {{ item.label }}


            <!-- Active underline -->

            <span
              class="absolute bottom-0 left-1/2 h-[3px] -translate-x-1/2 rounded-full bg-yen-gold transition-all duration-300"
              :class="
                isActive(item)
                  ? 'w-6 opacity-100'
                  : 'w-0 opacity-0 group-hover:w-5 group-hover:opacity-100'
              "
              aria-hidden="true"
            ></span>
          </RouterLink>
        </li>


        <!-- =================================
             MEDIA DISCLOSURE
        ================================== -->

        <li
          ref="mediaContainer"
          class="relative"
          @mouseenter="openMediaMenu"
          @mouseleave="handleMediaMouseLeave"
          @focusout="handleMediaFocusOut"
        >
          <button
            ref="mediaButton"
            type="button"
            class="relative flex items-center gap-1.5 whitespace-nowrap rounded-sm py-3 font-display text-xs font-semibold transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yen-gold focus-visible:ring-offset-4 focus-visible:ring-offset-black 2xl:text-sm"
            :class="
              isMediaActive()
                ? 'text-yen-gold'
                : 'text-white/75 hover:text-yen-gold'
            "
            :aria-expanded="
              mediaMenuOpen
            "
            aria-controls="desktop-media-navigation"
            @click="toggleMediaMenu"
            @keydown.down.prevent="
              openMediaMenuAndFocusFirst
            "
          >
            Media


            <!-- Arrow -->

            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-3.5 w-3.5 transition duration-300"
              :class="
                mediaMenuOpen
                  ? 'rotate-180'
                  : ''
              "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
              focusable="false"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m6 9 6 6 6-6"
              />
            </svg>


            <!-- Active underline -->

            <span
              class="absolute bottom-0 left-1/2 h-[3px] -translate-x-1/2 rounded-full bg-yen-gold transition-all duration-300"
              :class="
                isMediaActive()
                  ? 'w-6 opacity-100'
                  : 'w-0 opacity-0'
              "
              aria-hidden="true"
            ></span>
          </button>


          <!-- =================================
               MEDIA DROPDOWN
          ================================== -->

          <Transition name="media-menu">
            <div
              v-if="mediaMenuOpen"
              id="desktop-media-navigation"
              ref="mediaDropdown"
              class="absolute left-1/2 top-full z-50 w-[330px] -translate-x-1/2 rounded-[1.3rem] border border-white/10 bg-black p-3 shadow-2xl"
            >
              <ul>
                <li
                  v-for="item in mediaNavigation"
                  :key="item.label"
                >
                  <RouterLink
                    :to="item.to"
                    class="group/media flex items-start gap-4 rounded-xl p-4 transition hover:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yen-gold"
                    :class="
                      isActive(item)
                        ? 'bg-white/[0.05]'
                        : ''
                    "
                    :aria-current="
                      isCurrentPage(item)
                        ? 'page'
                        : undefined
                    "
                  >
                    <!-- Icon -->

                    <div
                      class="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-yen-gold font-display text-sm font-extrabold text-black"
                      aria-hidden="true"
                    >
                      →
                    </div>


                    <!-- Text -->

                    <div>
                      <p
                        class="font-display text-sm font-bold transition"
                        :class="
                          isActive(item)
                            ? 'text-yen-gold'
                            : 'text-white group-hover/media:text-yen-gold'
                        "
                      >
                        {{ item.label }}
                      </p>

                      <p
                        class="mt-1 font-body text-xs leading-5 text-white/45"
                      >
                        {{ item.description }}
                      </p>
                    </div>
                  </RouterLink>
                </li>
              </ul>
            </div>
          </Transition>
        </li>
      </ul>


      <!-- =====================================
           DESKTOP CTAs
      ====================================== -->

      <div
        class="hidden shrink-0 items-center gap-2 xl:flex"
      >
        <RouterLink
          :to="{ name: 'opportunities' }"
          class="whitespace-nowrap rounded-full border border-yen-gold px-4 py-2.5 font-display text-[11px] font-bold text-yen-gold transition duration-300 hover:bg-yen-gold hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yen-gold focus-visible:ring-offset-4 focus-visible:ring-offset-black 2xl:px-5 2xl:text-xs"
        >
          Explore Opportunities
        </RouterLink>


        <RouterLink
          :to="{ name: 'join' }"
          class="whitespace-nowrap rounded-full bg-yen-gold px-4 py-2.5 font-display text-[11px] font-bold text-black transition duration-300 hover:-translate-y-0.5 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-black 2xl:px-5 2xl:text-xs"
        >
          Join YEN
        </RouterLink>
      </div>


      <!-- =====================================
           MOBILE MENU BUTTON
      ====================================== -->

      <button
        ref="mobileMenuButton"
        type="button"
        class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/20 text-white transition hover:border-yen-gold hover:text-yen-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yen-gold focus-visible:ring-offset-4 focus-visible:ring-offset-black xl:hidden"
        :aria-label="
          mobileMenuOpen
            ? 'Close navigation menu'
            : 'Open navigation menu'
        "
        :aria-expanded="
          mobileMenuOpen
        "
        aria-controls="mobile-navigation"
        @click="toggleMobileMenu"
      >
        <!-- Menu icon -->

        <svg
          v-if="!mobileMenuOpen"
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
          focusable="false"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>


        <!-- Close icon -->

        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
          focusable="false"
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


    <!-- =========================================
         MOBILE NAVIGATION
    ========================================== -->

    <Transition name="mobile-menu">
      <div
        v-if="mobileMenuOpen"
        id="mobile-navigation"
        class="border-t border-white/10 bg-black xl:hidden"
      >
        <nav
          class="mx-auto max-h-[calc(100vh-90px)] max-w-7xl overflow-y-auto overscroll-contain px-5 py-6"
          aria-label="Mobile navigation"
        >
          <!-- Links -->

          <ul
            class="flex flex-col gap-1"
          >
            <li
              v-for="item in mobileNavigation"
              :key="item.label"
            >
              <RouterLink
                :to="item.to"
                class="flex items-center justify-between rounded-xl px-4 py-3.5 font-display text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yen-gold"
                :class="
                  isActive(item)
                    ? 'bg-white/[0.07] text-yen-gold'
                    : 'text-white/70 hover:bg-white/[0.07] hover:text-yen-gold'
                "
                :aria-current="
                  isCurrentPage(item)
                    ? 'page'
                    : undefined
                "
              >
                <span>
                  {{ item.label }}
                </span>

                <span
                  class="text-white/25"
                  aria-hidden="true"
                >
                  →
                </span>
              </RouterLink>
            </li>
          </ul>


          <!-- Divider -->

          <div
            class="my-5 border-t border-white/10"
            aria-hidden="true"
          ></div>


          <!-- =================================
               MOBILE CTAs
          ================================== -->

          <div
            class="flex flex-col gap-3"
          >
            <RouterLink
              :to="{ name: 'opportunities' }"
              class="flex items-center justify-center rounded-full border border-yen-gold px-5 py-3.5 font-display text-sm font-bold text-yen-gold transition hover:bg-yen-gold hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yen-gold"
            >
              Explore Opportunities
            </RouterLink>


            <RouterLink
              :to="{ name: 'join' }"
              class="flex items-center justify-center rounded-full bg-yen-gold px-5 py-3.5 font-display text-sm font-bold text-black transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Join YEN-Liberia
            </RouterLink>
          </div>
        </nav>
      </div>
    </Transition>
  </header>
</template>


<style scoped>
/*
|--------------------------------------------------------------------------
| MOBILE MENU TRANSITION
|--------------------------------------------------------------------------
*/

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


/*
|--------------------------------------------------------------------------
| MEDIA MENU TRANSITION
|--------------------------------------------------------------------------
*/

.media-menu-enter-active,
.media-menu-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.media-menu-enter-from,
.media-menu-leave-to {
  opacity: 0;
  transform:
    translateX(-50%)
    translateY(8px);
}

.media-menu-enter-to,
.media-menu-leave-from {
  opacity: 1;
  transform:
    translateX(-50%)
    translateY(0);
}


/*
|--------------------------------------------------------------------------
| REDUCED MOTION
|--------------------------------------------------------------------------
*/

@media (
  prefers-reduced-motion: reduce
) {
  .mobile-menu-enter-active,
  .mobile-menu-leave-active,
  .media-menu-enter-active,
  .media-menu-leave-active {
    transition-duration: 0.01ms;
  }
}
</style>