<script setup>
const currentYear = new Date().getFullYear()

const exploreLinks = [
  {
    label: "About YEN",
    href: "#about",
  },
  {
    label: "Programs",
    href: "#programs",
  },
  {
    label: "Opportunities",
    href: "#opportunities",
  },
  {
    label: "Entrepreneurs",
    href: "#entrepreneurs",
  },
  {
    label: "Events",
    href: "#events",
  },
]

const involvementLinks = [
  {
    label: "Join YEN-Liberia",
    href: "#join",
  },
  {
    label: "Partner With Us",
    href: "#partner-with-us",
  },
  {
    label: "Share Your Story",
    href: "#stories",
  },
  {
    label: "Newsletter",
    href: "#newsletter",
  },
]

const resourceLinks = [
  {
    label: "News & Insights",
    href: "#news",
  },
  {
    label: "Success Stories",
    href: "#stories",
  },
  {
    label: "Business Resources",
    href: "#",
  },
  {
    label: "Media Center",
    href: "#",
  },
]

/*
  IMPORTANT:
  Replace these with YEN-Liberia's confirmed official
  social media URLs before public launch.
*/
const socialLinks = [
  {
    name: "Facebook",
    href: "#",
    icon: "facebook",
  },
  {
    name: "LinkedIn",
    href: "#",
    icon: "linkedin",
  },
  {
    name: "Instagram",
    href: "#",
    icon: "instagram",
  },
]
</script>

<template>
  <footer
    id="contact"
    class="relative overflow-hidden bg-black"
  >
    <!-- =========================================
         DECORATIVE BACKGROUND
    ========================================== -->

    <div
      class="pointer-events-none absolute -left-40 top-16 h-96 w-96 rounded-full bg-yen-red/10 blur-3xl"
    ></div>

    <div
      class="pointer-events-none absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-yen-gold/10 blur-3xl"
    ></div>

    <!-- YEN watermark -->

    <div
      class="pointer-events-none absolute bottom-0 right-0 select-none font-display text-[180px] font-black leading-none text-white/[0.025] sm:text-[260px] lg:text-[360px]"
    >
      YEN
    </div>


    <!-- =========================================
         MAIN FOOTER
    ========================================== -->

    <div
      class="relative mx-auto max-w-7xl px-5 pb-12 pt-20 lg:px-8 lg:pb-14 lg:pt-24"
    >
      <div
        class="grid gap-14 lg:grid-cols-[1.35fr_0.75fr_0.85fr_0.85fr]"
      >
        <!-- =====================================
             BRAND COLUMN
        ====================================== -->

        <div class="max-w-md">
          <!-- Logo -->

          <a
            href="#home"
            class="inline-flex"
            aria-label="YEN-Liberia Home"
          >
            <img
              src="/images/yen-logo.png"
              alt="Youth Entrepreneurs Network Liberia"
              class="h-24 w-auto object-contain sm:h-28"
            />
          </a>

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
            ></span>

            <p
              class="font-display text-xs font-bold uppercase tracking-[0.16em] text-yen-gold"
            >
              Build. Connect. Grow.
            </p>
          </div>

          <!-- Social media -->

          <div
            class="mt-8 flex items-center gap-3"
          >
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.href"
              :aria-label="social.name"
              class="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition duration-300 hover:-translate-y-1 hover:border-yen-gold hover:bg-yen-gold hover:text-black"
            >
              <!-- Facebook -->
              <svg
                v-if="social.icon === 'facebook'"
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M13.5 22v-9h3l.5-3.5h-3.5V7.3c0-1 .3-1.8 1.8-1.8H17V2.4c-.3 0-1.4-.1-2.6-.1-2.6 0-4.4 1.6-4.4 4.6v2.6H7V13h3v9h3.5Z"
                />
              </svg>

              <!-- LinkedIn -->
              <svg
                v-else-if="social.icon === 'linkedin'"
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
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
              >
                <path
                  fill-rule="evenodd"
                  d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9Zm9.75 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>


        <!-- =====================================
             EXPLORE
        ====================================== -->

        <div>
          <h3
            class="font-display text-sm font-bold uppercase tracking-[0.15em] text-white"
          >
            Explore
          </h3>

          <div
            class="mt-2 h-[3px] w-8 bg-yen-gold"
          ></div>

          <nav
            class="mt-7 flex flex-col gap-4"
            aria-label="Footer explore navigation"
          >
            <a
              v-for="link in exploreLinks"
              :key="link.label"
              :href="link.href"
              class="group inline-flex items-center gap-2 font-display text-sm font-medium text-white/55 transition hover:text-yen-gold"
            >
              <span
                class="h-1.5 w-1.5 rounded-full bg-white/20 transition group-hover:bg-yen-red"
              ></span>

              {{ link.label }}
            </a>
          </nav>
        </div>


        <!-- =====================================
             GET INVOLVED
        ====================================== -->

        <div>
          <h3
            class="font-display text-sm font-bold uppercase tracking-[0.15em] text-white"
          >
            Get Involved
          </h3>

          <div
            class="mt-2 h-[3px] w-8 bg-yen-red"
          ></div>

          <nav
            class="mt-7 flex flex-col gap-4"
            aria-label="Footer involvement navigation"
          >
            <a
              v-for="link in involvementLinks"
              :key="link.label"
              :href="link.href"
              class="group inline-flex items-center gap-2 font-display text-sm font-medium text-white/55 transition hover:text-yen-gold"
            >
              <span
                class="h-1.5 w-1.5 rounded-full bg-white/20 transition group-hover:bg-yen-red"
              ></span>

              {{ link.label }}
            </a>
          </nav>
        </div>


        <!-- =====================================
             RESOURCES
        ====================================== -->

        <div>
          <h3
            class="font-display text-sm font-bold uppercase tracking-[0.15em] text-white"
          >
            Resources
          </h3>

          <div
            class="mt-2 h-[3px] w-8 bg-yen-gold"
          ></div>

          <nav
            class="mt-7 flex flex-col gap-4"
            aria-label="Footer resources navigation"
          >
            <a
              v-for="link in resourceLinks"
              :key="link.label"
              :href="link.href"
              class="group inline-flex items-center gap-2 font-display text-sm font-medium text-white/55 transition hover:text-yen-gold"
            >
              <span
                class="h-1.5 w-1.5 rounded-full bg-white/20 transition group-hover:bg-yen-red"
              ></span>

              {{ link.label }}
            </a>
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
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
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
          </div>
        </div>


        <!-- Email -->

        <div
          class="flex gap-4 border-b border-white/10 p-6 sm:border-b-0 sm:border-r"
        >
          <div
            class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-yen-red"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
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
              Email
            </p>

            <!-- Replace with official YEN email -->
            <p
              class="mt-2 font-display text-sm font-semibold text-white"
            >
              Official email coming soon
            </p>
          </div>
        </div>


        <!-- Phone -->

        <div
          class="flex gap-4 p-6"
        >
          <div
            class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-yen-gold"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 5a2 2 0 0 1 2-2h3l2 5-2.5 1.5a15 15 0 0 0 7 7L16 14l5 2v3a2 2 0 0 1-2 2h-1C9.7 21 3 14.3 3 6V5Z"
              />
            </svg>
          </div>

          <div>
            <p
              class="font-display text-[10px] font-bold uppercase tracking-[0.16em] text-white/40"
            >
              Telephone
            </p>

            <!-- Replace with official YEN number -->
            <p
              class="mt-2 font-display text-sm font-semibold text-white"
            >
              Official number coming soon
            </p>
          </div>
        </div>
      </div>


      <!-- =========================================
           BOTTOM BAR
      ========================================== -->

      <div
        class="mt-12 flex flex-col gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between"
      >
        <p
          class="font-body text-xs leading-6 text-white/40"
        >
          © {{ currentYear }} Youth Entrepreneurs Network–Liberia.
          All rights reserved.
        </p>

        <div
          class="flex flex-wrap items-center gap-x-6 gap-y-3"
        >
          <a
            href="#"
            class="font-display text-xs font-semibold text-white/40 transition hover:text-yen-gold"
          >
            Privacy Policy
          </a>

          <a
            href="#"
            class="font-display text-xs font-semibold text-white/40 transition hover:text-yen-gold"
          >
            Terms of Use
          </a>

          <a
            href="#"
            class="font-display text-xs font-semibold text-white/40 transition hover:text-yen-gold"
          >
            Accessibility
          </a>
        </div>
      </div>
    </div>


    <!-- YEN BRAND STRIPE -->

    <div
      class="grid h-1.5 grid-cols-3"
    >
      <div class="bg-yen-red"></div>

      <div class="bg-yen-gold"></div>

      <div class="bg-yen-red"></div>
    </div>
  </footer>
</template>