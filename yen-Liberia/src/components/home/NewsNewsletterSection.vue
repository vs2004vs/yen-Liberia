<script setup>
import { ref } from "vue"

const email = ref("")
const newsletterMessage = ref("")
const newsletterError = ref("")

const newsItems = [
  {
    id: 1,
    category: "Women Entrepreneurship",
    date: "August 10, 2026",
    title:
      "Female Entrepreneurs Summit 2026 Brings 200+ Business Leaders Together",
    excerpt:
      "Women entrepreneurs, business leaders and development partners gathered in Monrovia for a two-day summit focused on investment, technology, formalization and access to wider markets.",
    image: "/images/hero/hero-1.jpg",
    source: "The Liberian Investigator",
    sourceUrl:
      "https://liberianinvestigator.com/women-mean-business-female-entrepreneurs-summit-pushes-liberian-women-toward-investment-technology-and-global-markets/",
    featured: true,
  },

  {
    id: 2,
    category: "Climate & Enterprise",
    date: "June 30, 2026",
    title:
      "YEN-Liberia Joins Climate-Smart MSME Capacity Building Initiative",
    excerpt:
      "YEN-Liberia collaborated with Liberia's Environmental Protection Agency and UNIDO GROW-2 on a four-day workshop helping MSMEs align business practices with Liberia's climate goals.",
    image: "/images/hero/hero-3.jpg",
    source: "EPA Liberia",
    sourceUrl:
      "https://epa.gov.lr/dr-yarkpawolo-says-private-sector-is-critical-to-liberias-climate-future/",
    featured: false,
  },

  {
    id: 3,
    category: "Business Development",
    date: "February 19, 2026",
    title:
      "2026 MSME Clinic Supports 100 Entrepreneurs to Move From Side Hustle to Enterprise",
    excerpt:
      "The hands-on clinic supported youth-led and emerging businesses with practical training in branding, finance, bookkeeping, tax readiness and business formalization.",
    image: "/images/hero/hero-4.jpg",
    source: "The Liberian Investigator",
    sourceUrl:
      "https://liberianinvestigator.com/unido-grow2-launches-2026-msme-cinic-to-strengthen-youth-businesses-in-branding-finance-and-formalization/",
    featured: false,
  },
]

const submitNewsletter = () => {
  newsletterMessage.value = ""
  newsletterError.value = ""

  const normalizedEmail = email.value.trim()

  if (!normalizedEmail) {
    newsletterError.value = "Please enter your email address."
    return
  }

  const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailPattern.test(normalizedEmail)) {
    newsletterError.value =
      "Please enter a valid email address."
    return
  }

  /*
    FRONTEND-ONLY FOR HOMEPAGE V1

    When we build the backend, this is where we'll send:
    POST /api/newsletter/subscribe

    For now, do not pretend the email has been stored.
  */

  newsletterMessage.value =
    "Newsletter signup is ready. Subscription delivery will activate when the YEN platform backend is connected."

  email.value = ""
}
</script>

<template>
  <section
    id="news"
    class="overflow-hidden bg-white"
  >
    <!-- ==========================================
         NEWS & INSIGHTS
    =========================================== -->

    <div
      class="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28"
    >
      <!-- Header -->

      <div
        class="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end"
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
              News & Insights
            </span>
          </div>

          <h2
            class="font-display max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-black sm:text-5xl"
          >
            What's happening across the

            <span class="text-yen-red">
              YEN ecosystem.
            </span>
          </h2>
        </div>

        <div>
          <p
            class="max-w-xl font-body text-base leading-8 text-gray-600 lg:ml-auto"
          >
            Follow the latest entrepreneurship programs,
            partnerships, events, business stories and ecosystem
            developments from YEN-Liberia and our collaborators.
          </p>
        </div>
      </div>

      <!-- ==========================================
           NEWS LAYOUT
      =========================================== -->

      <div
        class="mt-14 grid gap-7 lg:grid-cols-[1.15fr_0.85fr]"
      >
        <!-- ======================================
             FEATURED ARTICLE
        ======================================= -->

        <article
          class="group relative min-h-[620px] overflow-hidden rounded-[2rem] bg-black"
        >
          <!-- Image -->

          <img
            :src="newsItems[0].image"
            :alt="newsItems[0].title"
            class="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />

          <!-- Overlay -->

          <div
            class="absolute inset-0 bg-linear-to-t from-black via-black/45 to-black/5"
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

              Featured Story
            </span>
          </div>

          <!-- Content -->

          <div
            class="absolute bottom-0 left-0 right-0 p-7 sm:p-9 lg:p-10"
          >
            <!-- Meta -->

            <div
              class="flex flex-wrap items-center gap-3"
            >
              <span
                class="font-display text-xs font-extrabold uppercase tracking-[0.14em] text-yen-gold"
              >
                {{ newsItems[0].category }}
              </span>

              <span
                class="h-1 w-1 rounded-full bg-white/40"
              ></span>

              <span
                class="font-display text-xs font-semibold text-white/60"
              >
                {{ newsItems[0].date }}
              </span>
            </div>

            <!-- Title -->

            <h3
              class="mt-5 max-w-3xl font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl"
            >
              {{ newsItems[0].title }}
            </h3>

            <!-- Excerpt -->

            <p
              class="mt-5 max-w-2xl font-body text-sm leading-7 text-white/70 sm:text-base"
            >
              {{ newsItems[0].excerpt }}
            </p>

            <!-- Footer -->

            <div
              class="mt-7 flex flex-wrap items-center justify-between gap-5"
            >
              <p
                class="font-display text-xs font-semibold text-white/50"
              >
                Source:
                {{ newsItems[0].source }}
              </p>

              <a
                :href="newsItems[0].sourceUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-3 rounded-full bg-yen-gold px-6 py-3.5 font-display text-sm font-bold text-black transition duration-300 hover:bg-white"
              >
                Read Story

                <span>
                  →
                </span>
              </a>
            </div>
          </div>
        </article>

        <!-- ======================================
             SMALL ARTICLES
        ======================================= -->

        <div
          class="flex flex-col gap-7"
        >
          <article
            v-for="article in newsItems.slice(1)"
            :key="article.id"
            class="group flex flex-1 flex-col overflow-hidden rounded-[1.7rem] border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-xl sm:flex-row lg:flex-col xl:flex-row"
          >
            <!-- Image -->

            <div
              class="relative h-[240px] overflow-hidden sm:h-auto sm:w-[42%] lg:h-[230px] lg:w-full xl:h-auto xl:w-[42%]"
            >
              <img
                :src="article.image"
                :alt="article.title"
                class="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />

              <div
                class="absolute inset-0 bg-black/10"
              ></div>

              <!-- Category -->

              <div
                class="absolute left-4 top-4"
              >
                <span
                  class="rounded-full bg-yen-gold px-3 py-1.5 font-display text-[9px] font-extrabold uppercase tracking-wider text-black"
                >
                  {{ article.category }}
                </span>
              </div>
            </div>

            <!-- Body -->

            <div
              class="flex flex-1 flex-col justify-center p-6"
            >
              <p
                class="font-display text-[10px] font-bold uppercase tracking-[0.14em] text-yen-red"
              >
                {{ article.date }}
              </p>

              <h3
                class="mt-3 font-display text-xl font-bold leading-snug text-black"
              >
                {{ article.title }}
              </h3>

              <p
                class="mt-4 line-clamp-3 font-body text-sm leading-7 text-gray-600"
              >
                {{ article.excerpt }}
              </p>

              <div
                class="mt-5 flex items-center justify-between gap-4 border-t border-gray-100 pt-5"
              >
                <span
                  class="font-display text-[10px] font-semibold text-gray-400"
                >
                  {{ article.source }}
                </span>

                <a
                  :href="article.sourceUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black text-yen-gold transition duration-300 group-hover:bg-yen-red group-hover:text-white"
                  :aria-label="`Read ${article.title}`"
                >
                  →
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>

      <!-- ==========================================
           ALL NEWS CTA
      =========================================== -->

      <div
        class="mt-12 flex flex-col items-start justify-between gap-5 border-t border-gray-200 pt-8 sm:flex-row sm:items-center"
      >
        <p
          class="max-w-xl font-body text-sm leading-7 text-gray-500"
        >
          Explore YEN-Liberia announcements, entrepreneur stories,
          program updates, media coverage and ecosystem insights.
        </p>

        <a
          href="#"
          class="inline-flex items-center gap-3 rounded-full border border-black px-6 py-3.5 font-display text-sm font-bold text-black transition duration-300 hover:bg-black hover:text-yen-gold"
        >
          View All News

          <span>
            →
          </span>
        </a>
      </div>
    </div>


    <!-- ==========================================
         NEWSLETTER
    =========================================== -->

    <div
      id="newsletter"
      class="relative overflow-hidden bg-yen-gold"
    >
      <!-- Background typography -->

      <div
        class="pointer-events-none absolute -right-10 top-1/2 -translate-y-1/2 select-none font-display text-[180px] font-black leading-none text-black/[0.035] sm:text-[260px] lg:text-[340px]"
      >
        YEN
      </div>

      <!-- Decorative shapes -->

      <div
        class="absolute -left-24 -top-24 h-64 w-64 rounded-full border-[40px] border-black/5"
      ></div>

      <div
        class="absolute -bottom-24 left-1/2 h-56 w-56 rounded-full bg-yen-red/10 blur-2xl"
      ></div>

      <div
        class="relative mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24"
      >
        <div
          class="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center"
        >
          <!-- LEFT -->

          <div>
            <div
              class="inline-flex items-center gap-2 rounded-full bg-black px-4 py-2"
            >
              <span
                class="h-2 w-2 rounded-full bg-yen-red"
              ></span>

              <span
                class="font-display text-[10px] font-extrabold uppercase tracking-[0.18em] text-white"
              >
                Stay Connected
              </span>
            </div>

            <h2
              class="mt-6 font-display text-4xl font-extrabold leading-tight text-black sm:text-5xl"
            >
              Opportunities shouldn't

              <span class="text-yen-red">
                pass you by.
              </span>
            </h2>

            <p
              class="mt-5 max-w-xl font-body text-sm leading-7 text-black/70 sm:text-base"
            >
              Receive entrepreneurship opportunities, YEN
              programs, funding calls, events, training and
              business-development updates directly in your inbox.
            </p>
          </div>

          <!-- ======================================
               NEWSLETTER FORM
          ======================================= -->

          <div
            class="rounded-[2rem] bg-black p-7 shadow-2xl sm:p-9 lg:p-10"
          >
            <p
              class="font-display text-xs font-extrabold uppercase tracking-[0.18em] text-yen-gold"
            >
              YEN Opportunity Newsletter
            </p>

            <h3
              class="mt-3 font-display text-2xl font-bold leading-snug text-white sm:text-3xl"
            >
              Stay informed. Stay connected.
            </h3>

            <p
              class="mt-3 font-body text-sm leading-7 text-white/55"
            >
              Be among the first to hear about opportunities
              available to entrepreneurs in Liberia and beyond.
            </p>

            <!-- Form -->

            <form
              class="mt-7"
              @submit.prevent="submitNewsletter"
            >
              <label
                for="newsletter-email"
                class="font-display text-xs font-bold text-white"
              >
                Email address
              </label>

              <div
                class="mt-3 flex flex-col gap-3 sm:flex-row"
              >
                <input
                  id="newsletter-email"
                  v-model="email"
                  type="email"
                  autocomplete="email"
                  placeholder="you@example.com"
                  class="min-w-0 flex-1 rounded-xl border border-white/15 bg-white/10 px-5 py-4 font-display text-sm text-white outline-none transition placeholder:text-white/35 focus:border-yen-gold focus:bg-white/15"
                />

                <button
                  type="submit"
                  class="shrink-0 rounded-xl bg-yen-gold px-6 py-4 font-display text-sm font-bold text-black transition duration-300 hover:bg-white"
                >
                  Subscribe
                </button>
              </div>

              <!-- Error -->

              <p
                v-if="newsletterError"
                class="mt-3 font-display text-xs font-semibold text-red-400"
              >
                {{ newsletterError }}
              </p>

              <!-- Development message -->

              <p
                v-if="newsletterMessage"
                class="mt-4 rounded-xl border border-yen-gold/20 bg-yen-gold/10 px-4 py-3 font-body text-xs leading-6 text-yen-gold"
              >
                {{ newsletterMessage }}
              </p>
            </form>

            <!-- Privacy -->

            <div
              class="mt-6 flex items-start gap-3 border-t border-white/10 pt-6"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="mt-0.5 h-4 w-4 shrink-0 text-yen-gold"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 11c1.657 0 3-1.343 3-3V6a3 3 0 0 0-6 0v2c0 1.657 1.343 3 3 3Zm-6 0h12v10H6V11Z"
                />
              </svg>

              <p
                class="font-body text-xs leading-6 text-white/45"
              >
                Your email will only be used for YEN-Liberia
                updates and entrepreneurship opportunities.
                You can unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Brand line -->

      <div
        class="h-1 bg-linear-to-r from-yen-red via-black to-yen-red"
      ></div>
    </div>
  </section>
</template>