<script setup>
import {
  computed,
  ref,
} from "vue"

import {
  newsArticles,
} from "@/data/news"


/*
|--------------------------------------------------------------------------
| NEWS DATA
|--------------------------------------------------------------------------
*/

const featuredArticle = computed(() => {
  return (
    newsArticles.find(
      (article) => article.featured,
    ) ||
    newsArticles[0]
  )
})

const secondaryArticles = computed(() => {
  if (!featuredArticle.value) {
    return []
  }

  return newsArticles
    .filter(
      (article) =>
        article.id !==
        featuredArticle.value.id,
    )
    .slice(0, 2)
})


/*
|--------------------------------------------------------------------------
| NEWSLETTER
|--------------------------------------------------------------------------
*/

const email = ref("")
const newsletterError = ref("")
const newsletterMessage = ref("")

const submitNewsletter = () => {
  newsletterError.value = ""
  newsletterMessage.value = ""

  const normalizedEmail =
    email.value.trim()

  if (!normalizedEmail) {
    newsletterError.value =
      "Please enter your email address."

    return
  }

  const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (
    !emailPattern.test(
      normalizedEmail,
    )
  ) {
    newsletterError.value =
      "Please enter a valid email address."

    return
  }

  /*
    FRONTEND ONLY FOR NOW.

    Later:
    POST /api/newsletter/subscribe

    Do not claim the address has actually
    been subscribed until the backend confirms it.
  */

  newsletterMessage.value =
    "Newsletter signup is ready. Subscription delivery will activate when the YEN-Liberia backend is connected."

  email.value = ""
}
</script>

<template>
  <section
    id="news"
    class="overflow-hidden bg-white"
  >
    <!-- =========================================
         NEWS & INSIGHTS
    ========================================== -->

    <div
      class="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28"
    >
      <!-- HEADER -->

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
            class="max-w-3xl font-display text-4xl font-extrabold leading-tight tracking-tight text-black sm:text-5xl"
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
            Follow entrepreneurship programs, partnerships,
            events, business stories and ecosystem developments
            relevant to YEN-Liberia and young entrepreneurs.
          </p>
        </div>
      </div>


      <!-- =========================================
           NEWS LAYOUT
      ========================================== -->

      <div
        v-if="featuredArticle"
        class="mt-14 grid gap-7 lg:grid-cols-[1.15fr_0.85fr]"
      >
        <!-- =====================================
             FEATURED ARTICLE
        ====================================== -->

        <article
          class="group relative min-h-[620px] overflow-hidden rounded-[2rem] bg-black"
        >
          <img
            :src="featuredArticle.image"
            :alt="featuredArticle.title"
            class="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />

          <div
            class="absolute inset-0 bg-linear-to-t from-black via-black/45 to-black/5"
          ></div>


          <!-- Badge -->

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
            <div
              class="flex flex-wrap items-center gap-3"
            >
              <span
                class="font-display text-xs font-extrabold uppercase tracking-[0.14em] text-yen-gold"
              >
                {{ featuredArticle.category }}
              </span>

              <span
                class="h-1 w-1 rounded-full bg-white/40"
              ></span>

              <span
                class="font-display text-xs font-semibold text-white/60"
              >
                {{ featuredArticle.date }}
              </span>
            </div>


            <h3
              class="mt-5 max-w-3xl font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl"
            >
              {{ featuredArticle.title }}
            </h3>


            <p
              class="mt-5 max-w-2xl font-body text-sm leading-7 text-white/70 sm:text-base"
            >
              {{ featuredArticle.excerpt }}
            </p>


            <div
              class="mt-7 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p
                  class="font-display text-[9px] font-extrabold uppercase tracking-[0.14em] text-white/35"
                >
                  Source
                </p>

                <p
                  class="mt-1 font-display text-xs font-semibold text-white/55"
                >
                  {{ featuredArticle.source }}
                </p>
              </div>


              <RouterLink
                :to="{
                  name: 'news-detail',
                  params: {
                    slug: featuredArticle.slug,
                  },
                }"
                class="inline-flex items-center justify-center gap-3 rounded-full bg-yen-gold px-6 py-3.5 font-display text-sm font-bold text-black transition duration-300 hover:-translate-y-1 hover:bg-white"
              >
                Read Story

                <span>
                  →
                </span>
              </RouterLink>
            </div>
          </div>
        </article>


        <!-- =====================================
             SECONDARY ARTICLES
        ====================================== -->

        <div
          class="flex flex-col gap-7"
        >
          <article
            v-for="article in secondaryArticles"
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
                <div>
                  <p
                    class="font-display text-[9px] font-bold uppercase tracking-wider text-gray-400"
                  >
                    Source
                  </p>

                  <p
                    class="mt-1 font-display text-[10px] font-semibold text-gray-500"
                  >
                    {{ article.source }}
                  </p>
                </div>


                <RouterLink
                  :to="{
                    name: 'news-detail',
                    params: {
                      slug: article.slug,
                    },
                  }"
                  class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-yen-gold transition duration-300 group-hover:bg-yen-red group-hover:text-white"
                  :aria-label="`Read ${article.title}`"
                >
                  →
                </RouterLink>
              </div>
            </div>
          </article>
        </div>
      </div>


      <!-- =========================================
           ALL NEWS CTA
      ========================================== -->

      <div
        class="mt-12 flex flex-col items-start justify-between gap-5 border-t border-gray-200 pt-8 sm:flex-row sm:items-center"
      >
        <p
          class="max-w-xl font-body text-sm leading-7 text-gray-500"
        >
          Explore announcements, entrepreneur stories, program
          updates, media coverage and ecosystem insights.
        </p>

        <RouterLink
          :to="{ name: 'news' }"
          class="inline-flex items-center gap-3 rounded-full border border-black px-6 py-3.5 font-display text-sm font-bold text-black transition duration-300 hover:bg-black hover:text-yen-gold"
        >
          View All News

          <span>
            →
          </span>
        </RouterLink>
      </div>
    </div>


    <!-- =========================================
         NEWSLETTER
    ========================================== -->

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
              business-development updates directly in your
              inbox.
            </p>


            <!-- Quick links -->

            <div
              class="mt-7 flex flex-wrap gap-3"
            >
              <RouterLink
                :to="{ name: 'opportunities' }"
                class="font-display text-sm font-bold text-black underline decoration-yen-red decoration-2 underline-offset-4 transition hover:text-yen-red"
              >
                Browse Opportunities
              </RouterLink>

              <RouterLink
                :to="{ name: 'events' }"
                class="font-display text-sm font-bold text-black underline decoration-yen-red decoration-2 underline-offset-4 transition hover:text-yen-red"
              >
                Explore Events
              </RouterLink>
            </div>
          </div>


          <!-- =====================================
               NEWSLETTER FORM
          ====================================== -->

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
                  name="email"
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
                aria-live="assertive"
                class="mt-3 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 font-display text-xs font-semibold text-red-300"
              >
                {{ newsletterError }}
              </p>


              <!-- Development message -->

              <p
                v-if="newsletterMessage"
                aria-live="polite"
                class="mt-4 rounded-xl border border-yen-gold/20 bg-yen-gold/10 px-4 py-3 font-body text-xs leading-6 text-yen-gold"
              >
                {{ newsletterMessage }}
              </p>
            </form>


            <!-- Privacy note -->

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
                Subscription processing will become active when
                the backend is connected.
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