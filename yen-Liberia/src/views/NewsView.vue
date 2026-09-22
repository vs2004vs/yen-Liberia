<script setup>
import {
  computed,
  ref,
} from "vue"

import {
  newsArticles,
  newsCategories,
} from "@/data/news"


/*
|--------------------------------------------------------------------------
| FILTER STATE
|--------------------------------------------------------------------------
*/

const searchQuery = ref("")
const activeCategory = ref("All")


/*
|--------------------------------------------------------------------------
| SAFE HELPERS
|--------------------------------------------------------------------------
*/

const normalizeText = (value) => {
  return String(value ?? "")
    .toLowerCase()
    .trim()
}

const getTags = (article) => {
  return Array.isArray(article.tags)
    ? article.tags
    : []
}


/*
|--------------------------------------------------------------------------
| FEATURED ARTICLE
|--------------------------------------------------------------------------
|
| Do not assume the first item in news.js is always featured.
| Prefer an explicitly featured article, then fall back to
| the first available article.
|
*/

const featuredArticle = computed(() => {
  return (
    newsArticles.find(
      (article) =>
        Boolean(article.featured),
    ) ||
    newsArticles[0] ||
    null
  )
})


/*
|--------------------------------------------------------------------------
| CATEGORY FILTERS
|--------------------------------------------------------------------------
|
| Merge configured categories with categories actually present
| in the news data so the filter cannot fall out of sync.
|
*/

const categories = computed(() => {
  const configured =
    Array.isArray(newsCategories)
      ? newsCategories.filter(
          (category) =>
            category &&
            category !== "All",
        )
      : []

  const fromArticles =
    newsArticles
      .map(
        (article) =>
          article.category,
      )
      .filter(Boolean)

  return [
    "All",
    ...new Set([
      ...configured,
      ...fromArticles,
    ]),
  ]
})


/*
|--------------------------------------------------------------------------
| FILTERED ARTICLES
|--------------------------------------------------------------------------
*/

const filteredArticles = computed(() => {
  const query = normalizeText(
    searchQuery.value,
  )

  return newsArticles.filter(
    (article) => {
      const matchesCategory =
        activeCategory.value === "All" ||
        article.category ===
          activeCategory.value

      const searchableContent = [
        article.title,
        article.category,
        article.type,
        article.source,
        article.excerpt,
        article.date,
        ...getTags(article),
      ]
        .map(normalizeText)
        .join(" ")

      const matchesSearch =
        !query ||
        searchableContent.includes(query)

      return (
        matchesCategory &&
        matchesSearch
      )
    },
  )
})


const clearFilters = () => {
  searchQuery.value = ""
  activeCategory.value = "All"
}
</script>


<template>
  <main class="w-full overflow-hidden">

    <!-- ======================================
         HERO
    ======================================= -->

    <section
      class="relative isolate min-h-[540px] overflow-hidden sm:min-h-[560px] lg:min-h-[580px]"
    >
      <!-- Background -->

      <img
        src="/images/hero/hero-4.jpg"
        alt="YEN-Liberia News and Insights"
        class="absolute inset-0 h-full w-full object-cover object-center"
      />


      <!-- Contrast -->

      <div
        class="absolute inset-0 bg-linear-to-r from-black/90 via-black/65 to-black/25 sm:from-black/85 sm:via-black/55 sm:to-black/10"
      ></div>

      <div
        class="absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-black/20"
      ></div>


      <!-- Content -->

      <div
        class="relative z-10 mx-auto flex min-h-[540px] max-w-7xl items-center px-5 py-16 sm:min-h-[560px] sm:px-6 sm:py-20 lg:min-h-[580px] lg:px-8"
      >
        <div
          class="w-full max-w-4xl"
        >
          <!-- Breadcrumb -->

          <div
            class="mb-6 flex flex-wrap items-center gap-3 font-display text-xs font-bold sm:mb-8"
          >
            <RouterLink
              :to="{ name: 'home' }"
              class="text-white/55 transition hover:text-yen-gold"
            >
              Home
            </RouterLink>

            <span
              class="text-white/25"
            >
              /
            </span>

            <span
              class="text-yen-gold"
            >
              News & Insights
            </span>
          </div>


          <!-- Label -->

          <p
            class="font-display text-[10px] font-extrabold uppercase tracking-[0.2em] text-yen-gold sm:text-xs"
          >
            Media Center
          </p>


          <!-- Heading -->

          <h1
            class="mt-5 max-w-4xl font-display text-[40px] font-extrabold leading-[1.05] tracking-tight text-white min-[390px]:text-[44px] sm:text-6xl lg:text-7xl"
          >
            Stories shaping Liberia's

            <span class="text-yen-gold">
              entrepreneurship ecosystem.
            </span>
          </h1>


          <!-- Description -->

          <p
            class="mt-6 max-w-2xl font-body text-sm leading-7 text-white/80 sm:mt-7 sm:text-lg sm:leading-8"
          >
            Follow YEN-Liberia programs, entrepreneur stories,
            partnerships, events, media coverage and
            developments affecting young businesses across
            Liberia.
          </p>
        </div>
      </div>


      <!-- Accent -->

      <div
        class="absolute bottom-0 left-0 z-20 h-1 w-full bg-linear-to-r from-yen-red via-yen-gold to-yen-red"
      ></div>
    </section>


    <!-- ======================================
         FEATURED STORY
    ======================================= -->

    <section
      v-if="featuredArticle"
      class="bg-white"
    >
      <div
        class="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24"
      >
        <!-- Heading -->

        <div class="mb-9 sm:mb-10">
          <p
            class="font-display text-[10px] font-extrabold uppercase tracking-[0.18em] text-yen-red sm:text-xs"
          >
            Featured
          </p>

          <h2
            class="mt-3 font-display text-3xl font-extrabold leading-tight text-black sm:text-4xl"
          >
            Latest from the ecosystem
          </h2>
        </div>


        <!-- Featured card -->

        <article
          class="group overflow-hidden rounded-[1.7rem] bg-black sm:rounded-[2rem]"
        >
          <div
            class="grid lg:grid-cols-[1.1fr_0.9fr]"
          >
            <!-- =================================
                 IMAGE
            ================================== -->

            <div
              class="relative h-[300px] overflow-hidden sm:h-[420px] lg:h-auto lg:min-h-[560px]"
            >
              <img
                :src="featuredArticle.image"
                :alt="featuredArticle.title"
                class="absolute inset-0 h-full w-full object-cover object-center transition duration-700 group-hover:scale-105"
              />

              <div
                class="absolute inset-0 bg-linear-to-t from-black/65 via-transparent to-transparent"
              ></div>


              <!-- Badge -->

              <div
                class="absolute left-4 top-4 sm:left-6 sm:top-6"
              >
                <span
                  class="rounded-full bg-yen-gold px-3 py-2 font-display text-[9px] font-extrabold uppercase tracking-wider text-black sm:px-4 sm:text-[10px]"
                >
                  Featured Story
                </span>
              </div>
            </div>


            <!-- =================================
                 CONTENT
            ================================== -->

            <div
              class="flex items-center p-6 sm:p-10 lg:p-12"
            >
              <div class="w-full">

                <!-- Meta -->

                <div
                  class="flex flex-wrap items-center gap-3"
                >
                  <span
                    v-if="featuredArticle.category"
                    class="font-display text-[9px] font-extrabold uppercase tracking-[0.15em] text-yen-gold sm:text-[10px]"
                  >
                    {{ featuredArticle.category }}
                  </span>

                  <span
                    v-if="
                      featuredArticle.category &&
                      featuredArticle.date
                    "
                    class="h-1 w-1 rounded-full bg-white/30"
                  ></span>

                  <span
                    v-if="featuredArticle.date"
                    class="font-display text-[11px] font-semibold text-white/45 sm:text-xs"
                  >
                    {{ featuredArticle.date }}
                  </span>
                </div>


                <!-- Title -->

                <h2
                  class="mt-5 font-display text-2xl font-extrabold leading-tight text-white sm:text-4xl"
                >
                  {{ featuredArticle.title }}
                </h2>


                <!-- Excerpt -->

                <p
                  class="mt-5 font-body text-sm leading-7 text-white/65 sm:mt-6 sm:text-base sm:leading-8"
                >
                  {{ featuredArticle.excerpt }}
                </p>


                <!-- Source / type -->

                <div
                  v-if="
                    featuredArticle.type ||
                    featuredArticle.source
                  "
                  class="mt-7 flex flex-wrap items-center gap-3 border-t border-white/10 pt-6"
                >
                  <span
                    v-if="featuredArticle.type"
                    class="rounded-full border border-white/15 px-3 py-2 font-display text-[9px] font-bold uppercase tracking-wider text-white/60 sm:text-[10px]"
                  >
                    {{ featuredArticle.type }}
                  </span>

                  <span
                    v-if="featuredArticle.source"
                    class="min-w-0 font-display text-xs leading-5 text-white/40"
                  >
                    {{ featuredArticle.source }}
                  </span>
                </div>


                <!-- Link -->

                <RouterLink
                  :to="{
                    name: 'news-detail',
                    params: {
                      slug: featuredArticle.slug,
                    },
                  }"
                  class="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-full bg-yen-gold px-7 py-4 font-display text-sm font-bold text-black transition duration-300 hover:-translate-y-1 hover:bg-white sm:w-auto"
                >
                  Read Story

                  <span aria-hidden="true">
                    →
                  </span>
                </RouterLink>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>


    <!-- ======================================
         NEWS DIRECTORY
    ======================================= -->

    <section class="bg-[#f7f7f5]">
      <div
        class="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28"
      >
        <!-- Header -->

        <div>
          <p
            class="font-display text-[10px] font-extrabold uppercase tracking-[0.18em] text-yen-red sm:text-xs"
          >
            News & Insights
          </p>

          <h2
            class="mt-3 font-display text-3xl font-extrabold leading-tight text-black sm:text-4xl"
          >
            Explore our latest stories
          </h2>
        </div>


        <!-- ==================================
             SEARCH PANEL
        =================================== -->

        <div
          class="mt-9 rounded-[1.5rem] bg-black p-4 sm:mt-10 sm:rounded-[1.8rem] sm:p-7"
        >
          <!-- Search -->

          <div class="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40 sm:left-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m21 21-4.35-4.35m2.35-5.65A8 8 0 1 1 3 11a8 8 0 0 1 16 0Z"
              />
            </svg>


            <label
              for="news-search"
              class="sr-only"
            >
              Search YEN-Liberia news and insights
            </label>


            <input
              id="news-search"
              v-model="searchQuery"
              type="search"
              autocomplete="off"
              placeholder="Search news, programs, partnerships..."
              class="w-full rounded-xl border border-white/15 bg-white/10 py-4 pl-12 pr-4 font-display text-sm text-white outline-none transition placeholder:text-white/35 focus:border-yen-gold focus:bg-white/15 sm:pl-14 sm:pr-5"
            />
          </div>


          <!-- Category filters -->

          <div
            class="mt-5 flex flex-wrap gap-2"
            aria-label="Filter news by category"
          >
            <button
              v-for="category in categories"
              :key="category"
              type="button"
              :aria-pressed="
                activeCategory === category
              "
              class="rounded-full px-3.5 py-2.5 font-display text-[11px] font-bold transition sm:px-4 sm:text-xs"
              :class="
                activeCategory === category
                  ? 'bg-yen-gold text-black'
                  : 'border border-white/15 text-white/65 hover:border-yen-gold hover:text-yen-gold'
              "
              @click="
                activeCategory = category
              "
            >
              {{ category }}
            </button>
          </div>
        </div>


        <!-- ==================================
             RESULT COUNT
        =================================== -->

        <div
          class="mt-7 flex flex-wrap items-center justify-between gap-4 sm:mt-8"
        >
          <p
            class="font-display text-xs font-semibold text-gray-500 sm:text-sm"
            aria-live="polite"
          >
            Showing

            <span class="font-bold text-black">
              {{ filteredArticles.length }}
            </span>

            {{
              filteredArticles.length === 1
                ? "story"
                : "stories"
            }}
          </p>


          <button
            v-if="
              searchQuery ||
              activeCategory !== 'All'
            "
            type="button"
            class="font-display text-xs font-bold text-yen-red transition hover:text-black sm:text-sm"
            @click="clearFilters"
          >
            Clear filters
          </button>
        </div>


        <!-- ==================================
             NEWS CARDS
        =================================== -->

        <div
          v-if="filteredArticles.length"
          class="mt-7 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          <article
            v-for="article in filteredArticles"
            :key="article.id"
            class="group flex h-full flex-col overflow-hidden rounded-[1.6rem] bg-white transition duration-300 hover:-translate-y-2 hover:shadow-2xl sm:rounded-[1.7rem]"
          >
            <!-- Image -->

            <div
              class="relative h-[220px] overflow-hidden sm:h-[250px] xl:h-[260px]"
            >
              <img
                :src="article.image"
                :alt="article.title"
                loading="lazy"
                class="h-full w-full object-cover object-center transition duration-700 group-hover:scale-105"
              />

              <div
                class="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"
              ></div>


              <!-- Category -->

              <span
                v-if="article.category"
                class="absolute left-4 top-4 rounded-full bg-yen-gold px-3 py-2 font-display text-[9px] font-extrabold uppercase tracking-wider text-black sm:left-5 sm:top-5"
              >
                {{ article.category }}
              </span>


              <!-- Featured -->

              <span
                v-if="article.featured"
                class="absolute right-4 top-4 rounded-full bg-white px-3 py-2 font-display text-[9px] font-extrabold uppercase text-black sm:right-5 sm:top-5"
              >
                Featured
              </span>
            </div>


            <!-- =================================
                 BODY
            ================================== -->

            <div
              class="flex flex-1 flex-col p-6 sm:p-7"
            >
              <!-- Meta -->

              <div
                class="flex flex-wrap items-center gap-3"
              >
                <span
                  v-if="article.type"
                  class="font-display text-[9px] font-bold uppercase tracking-[0.15em] text-yen-red sm:text-[10px]"
                >
                  {{ article.type }}
                </span>

                <span
                  v-if="
                    article.type &&
                    article.date
                  "
                  class="h-1 w-1 rounded-full bg-gray-300"
                ></span>

                <span
                  v-if="article.date"
                  class="font-display text-[11px] text-gray-400 sm:text-xs"
                >
                  {{ article.date }}
                </span>
              </div>


              <!-- Title -->

              <h3
                class="mt-4 font-display text-xl font-bold leading-snug text-black"
              >
                {{ article.title }}
              </h3>


              <!-- Excerpt -->

              <p
                class="mt-4 font-body text-sm leading-7 text-gray-600"
              >
                {{ article.excerpt }}
              </p>


              <!-- Bottom content -->

              <div class="mt-auto pt-6">
                <div
                  class="flex items-end justify-between gap-4 border-t border-gray-100 pt-5"
                >
                  <!-- Source -->

                  <div class="min-w-0">
                    <p
                      class="font-display text-[9px] font-bold uppercase tracking-wider text-gray-400"
                    >
                      Source
                    </p>

                    <p
                      class="mt-1 break-words font-display text-xs font-semibold leading-5 text-black"
                    >
                      {{ article.source }}
                    </p>
                  </div>


                  <!-- Detail route -->

                  <RouterLink
                    :to="{
                      name: 'news-detail',
                      params: {
                        slug: article.slug,
                      },
                    }"
                    class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-yen-gold transition duration-300 group-hover:bg-yen-red group-hover:text-white"
                    :aria-label="
                      `Read ${article.title}`
                    "
                  >
                    →
                  </RouterLink>
                </div>
              </div>
            </div>
          </article>
        </div>


        <!-- ==================================
             EMPTY STATE
        =================================== -->

        <div
          v-else
          class="mt-8 rounded-[1.6rem] border border-dashed border-gray-300 bg-white px-5 py-14 text-center sm:rounded-[1.7rem] sm:px-6 sm:py-16"
        >
          <h3
            class="font-display text-xl font-bold text-black"
          >
            No stories found
          </h3>

          <p
            class="mx-auto mt-3 max-w-md font-body text-sm leading-7 text-gray-500"
          >
            Try another search or news category.
          </p>

          <button
            type="button"
            class="mt-5 font-display text-sm font-bold text-yen-red transition hover:text-black"
            @click="clearFilters"
          >
            View all news
          </button>
        </div>
      </div>
    </section>


    <!-- ======================================
         NEWSLETTER CTA
    ======================================= -->

    <section class="bg-white">
      <div
        class="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24"
      >
        <div
          class="relative overflow-hidden rounded-[1.7rem] bg-yen-gold p-7 sm:rounded-[2rem] sm:p-10 lg:p-14"
        >
          <!-- Decoration -->

          <div
            class="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border-[40px] border-black/5"
          ></div>


          <div
            class="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center"
          >
            <!-- Copy -->

            <div class="max-w-3xl">
              <p
                class="font-display text-[10px] font-extrabold uppercase tracking-[0.18em] text-yen-red sm:text-xs"
              >
                Stay Informed
              </p>

              <h2
                class="mt-4 font-display text-2xl font-extrabold leading-tight text-black sm:text-4xl"
              >
                Keep up with Liberia's entrepreneur ecosystem.
              </h2>

              <p
                class="mt-4 max-w-2xl font-body text-sm leading-7 text-black/65 sm:text-base"
              >
                Receive YEN-Liberia news, programs,
                opportunities, entrepreneur stories and event
                announcements.
              </p>
            </div>


            <!--
              Intentional homepage hash:
              the newsletter currently lives on the homepage.
            -->

            <RouterLink
              :to="{
                name: 'home',
                hash: '#newsletter',
              }"
              class="inline-flex w-full items-center justify-center rounded-full bg-black px-7 py-4 font-display text-sm font-bold text-white transition duration-300 hover:-translate-y-1 hover:bg-yen-red sm:w-auto sm:min-w-[220px]"
            >
              Join Newsletter

              <span
                class="ml-3 text-yen-gold"
              >
                →
              </span>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>