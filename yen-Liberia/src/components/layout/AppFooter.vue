<script setup>
const currentYear = new Date().getFullYear()


/*
|--------------------------------------------------------------------------
| FOOTER NAVIGATION
|--------------------------------------------------------------------------
*/

const exploreLinks = [
  {
    label: "About YEN",
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
    label: "Opportunities",
    to: {
      name: "opportunities",
    },
  },

  {
    label: "Entrepreneurs",
    to: {
      name: "entrepreneurs",
    },
  },

  {
    label: "Events",
    to: {
      name: "events",
    },
  },
]


const involvementLinks = [
  {
    label: "Join YEN-Liberia",
    to: {
      name: "join",
    },
  },

  {
    label: "Partner With Us",
    to: {
      name: "partners",
    },
  },

  {
    label: "Contact Us",
    to: {
      name: "contact",
    },
  },

  {
    label: "Newsletter",
    to: {
      name: "home",
      hash: "#newsletter",
    },
  },
]


const resourceLinks = [
  {
    label: "News & Insights",
    to: {
      name: "news",
    },
  },

  {
    label: "Business Resources",
    to: {
      name: "resources",
    },
  },

  {
    label: "Entrepreneur Directory",
    to: {
      name: "entrepreneurs",
    },
  },

  {
    label: "Partners",
    to: {
      name: "partners",
    },
  },
]


/*
|--------------------------------------------------------------------------
| SOCIAL LINKS
|--------------------------------------------------------------------------
|
| Add ONLY confirmed official YEN-Liberia accounts.
|
| Keep href as null until the real URL is confirmed.
| Links without confirmed URLs are not rendered.
|
*/

const socialLinks = [
  {
    name: "Facebook",
    href: null,
    icon: "facebook",
  },

  {
    name: "LinkedIn",
    href: null,
    icon: "linkedin",
  },

  {
    name: "Instagram",
    href: null,
    icon: "instagram",
  },
]
</script>


<template>
  <footer
    class="relative overflow-hidden bg-black"
  >
    <!-- =========================================
         DECORATIVE BACKGROUND
    ========================================== -->

    <div
      class="pointer-events-none absolute -left-40 top-16 h-96 w-96 rounded-full bg-yen-red/10 blur-3xl"
      aria-hidden="true"
    ></div>

    <div
      class="pointer-events-none absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-yen-gold/10 blur-3xl"
      aria-hidden="true"
    ></div>


    <!-- Decorative watermark -->

    <div
      class="pointer-events-none absolute bottom-0 right-0 select-none font-display text-[180px] font-black leading-none text-white/[0.025] sm:text-[260px] lg:text-[360px]"
      aria-hidden="true"
    >
      YEN
    </div>


    <!-- =========================================
         MAIN FOOTER
    ========================================== -->

    <div
      class="relative mx-auto max-w-7xl px-5 pb-12 pt-20 sm:px-6 lg:px-8 lg:pb-14 lg:pt-24"
    >
      <div
        class="grid gap-14 sm:grid-cols-2 lg:grid-cols-[1.35fr_0.75fr_0.85fr_0.85fr]"
      >

        <!-- =====================================
             BRAND COLUMN
        ====================================== -->

        <div
          class="max-w-md sm:col-span-2 lg:col-span-1"
        >
          <!-- Logo -->

          <RouterLink
            :to="{ name: 'home' }"
            class="inline-flex rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yen-gold focus-visible:ring-offset-4 focus-visible:ring-offset-black"
            aria-label="Youth Entrepreneurs Network Liberia Home"
          >
            <img
              src="/images/yen-logo.png"
              alt=""
              class="h-24 w-auto object-contain sm:h-28"
            />
          </RouterLink>


          <!-- Mission -->

          <p
            class="mt-6 max-w-sm font-body text-sm leading-7 text-white/60"
          >
            Connecting, supporting and empowering young
            entrepreneurs to build sustainable businesses and
            contribute to Liberia's economic transformation.
          </p>


          <!-- Brand statement -->

          <div
            class="mt-7 flex items-center gap-3"
          >
            <span
              class="h-[3px] w-10 bg-yen-red"
              aria-hidden="true"
            ></span>

            <p
              class="font-display text-xs font-bold uppercase tracking-[0.16em] text-yen-gold"
            >
              Build. Connect. Grow.
            </p>
          </div>


          <!-- Quick CTAs -->

          <div
            class="mt-8 flex flex-wrap gap-3"
          >
            <RouterLink
              :to="{ name: 'join' }"
              class="inline-flex items-center justify-center rounded-full bg-yen-gold px-5 py-3 font-display text-xs font-bold text-black transition duration-300 hover:-translate-y-0.5 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-black"
            >
              Join YEN
            </RouterLink>


            <RouterLink
              :to="{ name: 'contact' }"
              class="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-3 font-display text-xs font-bold text-white transition duration-300 hover:border-yen-gold hover:text-yen-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yen-gold focus-visible:ring-offset-4 focus-visible:ring-offset-black"
            >
              Contact Us
            </RouterLink>
          </div>


          <!-- =================================
               SOCIAL MEDIA
          ================================== -->

          <div
            v-if="
              socialLinks.some(
                (social) => social.href,
              )
            "
            class="mt-7"
          >
            <p
              class="sr-only"
            >
              Follow YEN-Liberia on social media
            </p>

            <ul
              class="flex items-center gap-3"
              aria-label="YEN-Liberia social media"
            >
              <template
                v-for="social in socialLinks"
                :key="social.name"
              >
                <li
                  v-if="social.href"
                >
                  <a
                    :href="social.href"
                    target="_blank"
                    rel="noopener noreferrer"
                    :aria-label="`${social.name} — opens in a new tab`"
                    class="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition duration-300 hover:-translate-y-1 hover:border-yen-gold hover:bg-yen-gold hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yen-gold focus-visible:ring-offset-4 focus-visible:ring-offset-black"
                  >
                    <!-- Facebook -->

                    <svg
                      v-if="
                        social.icon ===
                        'facebook'
                      "
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path
                        d="M13.5 22v-9h3l.5-3.5h-3.5V7.3c0-1 .3-1.8 1.8-1.8H17V2.4c-.3 0-1.4-.1-2.6-.1-2.6 0-4.4 1.6-4.4 4.6v2.6H7V13h3v9h3.5Z"
                      />
                    </svg>


                    <!-- LinkedIn -->

                    <svg
                      v-else-if="
                        social.icon ===
                        'linkedin'
                      "
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path
                        d="M6.5 8.2H3V21h3.5V8.2ZM4.75 3A2.05 2.05 0 1 0 4.75 7.1 2.05 2.05 0 0 0 4.75 3ZM21 13.7c0-3.9-2.1-5.7-4.9-5.7-2.3 0-3.3 1.3-3.9 2.2v-2H8.7V21h3.5v-6.3c0-1.7.3-3.3 2.4-3.3 2 0 2.1 1.9 2.1 3.4V21H21v-7.3Z"
                      />
                    </svg>


                    <!-- Instagram -->

                    <svg
                      v-else
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9Zm9.75 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
              </template>
            </ul>
          </div>
        </div>


        <!-- =====================================
             EXPLORE
        ====================================== -->

        <div>
          <h2
            class="font-display text-sm font-bold uppercase tracking-[0.15em] text-white"
          >
            Explore
          </h2>

          <div
            class="mt-2 h-[3px] w-8 bg-yen-gold"
            aria-hidden="true"
          ></div>


          <nav
            class="mt-7"
            aria-label="Footer explore navigation"
          >
            <ul
              class="flex flex-col gap-4"
            >
              <li
                v-for="link in exploreLinks"
                :key="link.label"
              >
                <RouterLink
                  :to="link.to"
                  class="group inline-flex items-center gap-2 rounded-sm font-display text-sm font-medium text-white/55 transition hover:text-yen-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yen-gold focus-visible:ring-offset-4 focus-visible:ring-offset-black"
                >
                  <span
                    class="h-1.5 w-1.5 rounded-full bg-white/20 transition group-hover:bg-yen-red"
                    aria-hidden="true"
                  ></span>

                  {{ link.label }}
                </RouterLink>
              </li>
            </ul>
          </nav>
        </div>


        <!-- =====================================
             GET INVOLVED
        ====================================== -->

        <div>
          <h2
            class="font-display text-sm font-bold uppercase tracking-[0.15em] text-white"
          >
            Get Involved
          </h2>

          <div
            class="mt-2 h-[3px] w-8 bg-yen-red"
            aria-hidden="true"
          ></div>


          <nav
            class="mt-7"
            aria-label="Footer involvement navigation"
          >
            <ul
              class="flex flex-col gap-4"
            >
              <li
                v-for="link in involvementLinks"
                :key="link.label"
              >
                <RouterLink
                  :to="link.to"
                  class="group inline-flex items-center gap-2 rounded-sm font-display text-sm font-medium text-white/55 transition hover:text-yen-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yen-gold focus-visible:ring-offset-4 focus-visible:ring-offset-black"
                >
                  <span
                    class="h-1.5 w-1.5 rounded-full bg-white/20 transition group-hover:bg-yen-red"
                    aria-hidden="true"
                  ></span>

                  {{ link.label }}
                </RouterLink>
              </li>
            </ul>
          </nav>
        </div>


        <!-- =====================================
             RESOURCES
        ====================================== -->

        <div>
          <h2
            class="font-display text-sm font-bold uppercase tracking-[0.15em] text-white"
          >
            Resources
          </h2>

          <div
            class="mt-2 h-[3px] w-8 bg-yen-gold"
            aria-hidden="true"
          ></div>


          <nav
            class="mt-7"
            aria-label="Footer resources navigation"
          >
            <ul
              class="flex flex-col gap-4"
            >
              <li
                v-for="link in resourceLinks"
                :key="link.label"
              >
                <RouterLink
                  :to="link.to"
                  class="group inline-flex items-center gap-2 rounded-sm font-display text-sm font-medium text-white/55 transition hover:text-yen-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yen-gold focus-visible:ring-offset-4 focus-visible:ring-offset-black"
                >
                  <span
                    class="h-1.5 w-1.5 rounded-full bg-white/20 transition group-hover:bg-yen-red"
                    aria-hidden="true"
                  ></span>

                  {{ link.label }}
                </RouterLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>


      <!-- =========================================
           CONTACT STRIP
      ========================================== -->

      <div
        class="mt-16 grid overflow-hidden rounded-[1.7rem] border border-white/10 bg-white/[0.04] sm:grid-cols-3"
      >

        <!-- Location -->

        <div
          class="flex gap-4 border-b border-white/10 p-6 sm:border-b-0 sm:border-r"
        >
          <div
            class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-yen-gold"
            aria-hidden="true"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              focusable="false"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 21s7-5.333 7-12a7 7 0 1 0-14 0c0 6.667 7 12 7 12Zm0-9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
              />
            </svg>
          </div>


          <div>
            <p
              class="font-display text-[10px] font-bold uppercase tracking-[0.16em] text-white/40"
            >
              Location
            </p>

            <p
              class="mt-2 font-display text-sm font-semibold text-white"
            >
              Monrovia, Liberia
            </p>

            <p
              class="mt-1 font-body text-xs text-white/35"
            >
              Republic of Liberia
            </p>
          </div>
        </div>


        <!-- Contact -->

        <RouterLink
          :to="{ name: 'contact' }"
          class="group flex gap-4 border-b border-white/10 p-6 transition hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-yen-gold sm:border-b-0 sm:border-r"
        >
          <div
            class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-yen-red"
            aria-hidden="true"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              focusable="false"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 6l9 6 9-6M4 5h16a1 1 0 0 1 1 1v12H3V6a1 1 0 0 1 1-1Z"
              />
            </svg>
          </div>


          <div>
            <p
              class="font-display text-[10px] font-bold uppercase tracking-[0.16em] text-white/40"
            >
              Get in Touch
            </p>

            <p
              class="mt-2 font-display text-sm font-semibold text-white transition group-hover:text-yen-gold"
            >
              Send YEN a Message
            </p>

            <p
              class="mt-1 font-body text-xs text-white/35"
            >
              Contact form →

            </p>
          </div>
        </RouterLink>


        <!-- Partnership -->

        <RouterLink
          :to="{ name: 'partners' }"
          class="group flex gap-4 p-6 transition hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-yen-gold"
        >
          <div
            class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-yen-gold"
            aria-hidden="true"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              focusable="false"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 20h5v-2a4 4 0 0 0-5-3.87M9 20H2v-2a4 4 0 0 1 5-3.87m10-4.13a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM7 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm5 10v-2a4 4 0 0 0-8 0v2h8Z"
              />
            </svg>
          </div>


          <div>
            <p
              class="font-display text-[10px] font-bold uppercase tracking-[0.16em] text-white/40"
            >
              Collaborate
            </p>

            <p
              class="mt-2 font-display text-sm font-semibold text-white transition group-hover:text-yen-gold"
            >
              Partner With YEN
            </p>

            <p
              class="mt-1 font-body text-xs text-white/35"
            >
              Partnership opportunities →

            </p>
          </div>
        </RouterLink>
      </div>


      <!-- =========================================
           BOTTOM BAR
      ========================================== -->

      <div
        class="mt-12 flex flex-col gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between"
      >
        <!-- Copyright -->

        <p
          class="font-body text-xs leading-6 text-white/40"
        >
          © {{ currentYear }}
          Youth Entrepreneurs Network–Liberia.
          All rights reserved.
        </p>


        <!-- Bottom navigation -->

        <nav
          aria-label="Footer utility navigation"
        >
          <ul
            class="flex flex-wrap items-center gap-x-5 gap-y-3"
          >
            <li>
              <RouterLink
                :to="{ name: 'contact' }"
                class="rounded-sm font-display text-xs font-semibold text-white/40 transition hover:text-yen-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yen-gold focus-visible:ring-offset-4 focus-visible:ring-offset-black"
              >
                Contact
              </RouterLink>
            </li>


            <li>
              <RouterLink
                :to="{ name: 'join' }"
                class="rounded-sm font-display text-xs font-semibold text-white/40 transition hover:text-yen-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yen-gold focus-visible:ring-offset-4 focus-visible:ring-offset-black"
              >
                Join YEN
              </RouterLink>
            </li>


            <li>
              <RouterLink
                :to="{ name: 'partners' }"
                class="rounded-sm font-display text-xs font-semibold text-white/40 transition hover:text-yen-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yen-gold focus-visible:ring-offset-4 focus-visible:ring-offset-black"
              >
                Partnerships
              </RouterLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>


    <!-- =========================================
         YEN BRAND STRIPE
    ========================================== -->

    <div
      class="grid h-1.5 grid-cols-3"
      aria-hidden="true"
    >
      <div class="bg-yen-red"></div>

      <div class="bg-yen-gold"></div>

      <div class="bg-yen-red"></div>
    </div>
  </footer>
</template>