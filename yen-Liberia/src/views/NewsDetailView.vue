<script setup>
import {
  computed,
  watchEffect,
} from "vue"

import { useRoute } from "vue-router"

import {
  getNewsArticleBySlug,
  getRelatedNews,
} from "@/data/news"

import {
  setPageSeo,
} from "@/utils/seo"


/*
|--------------------------------------------------------------------------
| ROUTE
|--------------------------------------------------------------------------
*/

const route = useRoute()


/*
|--------------------------------------------------------------------------
| CURRENT ARTICLE
|--------------------------------------------------------------------------
*/

const article = computed(() => {
  const slug = String(
    route.params.slug ?? "",
  )

  return getNewsArticleBySlug(slug)
})


/*
|--------------------------------------------------------------------------
| SAFE ARTICLE DATA
|--------------------------------------------------------------------------
*/

const contentParagraphs = computed(() => {
  return Array.isArray(
    article.value?.content,
  )
    ? article.value.content
    : []
})


const highlights = computed(() => {
  return Array.isArray(
    article.value?.highlights,
  )
    ? article.value.highlights
    : []
})


const tags = computed(() => {
  return Array.isArray(
    article.value?.tags,
  )
    ? article.value.tags
    : []
})


/*
|--------------------------------------------------------------------------
| RELATED ARTICLES
|--------------------------------------------------------------------------
*/

const relatedArticles = computed(() => {
  if (!article.value) {
    return []
  }

  const result =
    getRelatedNews(
      article.value,
    )

  return Array.isArray(result)
    ? result.slice(0, 3)
    : []
})


/*
|--------------------------------------------------------------------------
| NEWS ARTICLE SEO
|--------------------------------------------------------------------------
|
| The router initially provides generic metadata:
|
| News Article | Youth Entrepreneurs Network–Liberia
|
| Once the article is resolved, replace it with:
|
| - Actual article title
| - Article-specific description
| - Canonical URL
| - Open Graph metadata
| - Twitter/X metadata
|
|--------------------------------------------------------------------------
*/

watchEffect(() => {
  /*
  |--------------------------------------------------------------------------
  | ARTICLE NOT FOUND
  |--------------------------------------------------------------------------
  */

  if (!article.value) {
    setPageSeo({
      title:
        "Article Not Found",

      description:
        "The requested YEN-Liberia news article could not be found.",

      path:
        route.path,

      robots:
        "noindex, follow",

      type:
        "website",
    })

    return
  }


  /*
  |--------------------------------------------------------------------------
  | ARTICLE DESCRIPTION
  |--------------------------------------------------------------------------
  |
  | Prefer:
  |
  | 1. excerpt
  | 2. intro
  | 3. first content paragraph
  |
  */

  const description =
    article.value.excerpt ||
    article.value.intro ||
    contentParagraphs.value[0] ||
    "Read this entrepreneurship news story, update or insight from Youth Entrepreneurs Network–Liberia."


  /*
  |--------------------------------------------------------------------------
  | ARTICLE IMAGE
  |--------------------------------------------------------------------------
  */

  const image =
    article.value.image
      ? new URL(
          article.value.image,
          "https://yen-lib.netlify.app",
        ).toString()
      : undefined


  /*
  |--------------------------------------------------------------------------
  | APPLY ARTICLE SEO
  |--------------------------------------------------------------------------
  */

  setPageSeo({
    title:
      article.value.title,

    description,

    path:
      route.path,

    image,

    robots:
      "index, follow",

    type:
      "article",
  })
})
</script>

<template>
  <!-- ==========================================
       VALID ARTICLE
  =========================================== -->

  <main
    v-if="article"
    class="w-full overflow-hidden"
  >

    <!-- ========================================
         ARTICLE HERO
    ========================================= -->

    <section
      class="relative isolate min-h-[600px] overflow-hidden sm:min-h-[640px] lg:min-h-[680px]"
    >
      <!-- Background -->

      <img
        :src="article.image"
        :alt="article.title"
        class="absolute inset-0 h-full w-full object-cover object-center"
      />


      <!-- Contrast -->

      <div
        class="absolute inset-0 bg-linear-to-r from-black/90 via-black/70 to-black/25 sm:from-black/90 sm:via-black/60 sm:to-black/10"
      ></div>

      <div
        class="absolute inset-0 bg-linear-to-t from-black/75 via-transparent to-black/20"
      ></div>


      <!-- Content -->

      <div
        class="relative z-10 mx-auto flex min-h-[600px] max-w-7xl items-end px-5 pb-16 pt-24 sm:min-h-[640px] sm:px-6 sm:pb-20 lg:min-h-[680px] lg:px-8"
      >
        <div class="w-full max-w-5xl">

          <!-- Breadcrumb -->

          <nav
            class="mb-6 flex flex-wrap items-center gap-3 font-display text-xs font-bold sm:mb-8"
            aria-label="Breadcrumb"
          >
            <RouterLink
              :to="{ name: 'home' }"
              class="text-white/55 transition hover:text-yen-gold"
            >
              Home
            </RouterLink>

            <span
              class="text-white/25"
              aria-hidden="true"
            >
              /
            </span>

            <RouterLink
              :to="{ name: 'news' }"
              class="text-white/55 transition hover:text-yen-gold"
            >
              News
            </RouterLink>

            <span
              class="text-white/25"
              aria-hidden="true"
            >
              /
            </span>

            <span
              class="max-w-[220px] truncate text-yen-gold sm:max-w-md"
              aria-current="page"
            >
              {{
                article.category ||
                article.title
              }}
            </span>
          </nav>


          <!-- Category / type -->

          <div
            class="flex flex-wrap gap-3"
          >
            <span
              v-if="article.category"
              class="rounded-full bg-yen-gold px-4 py-2 font-display text-[10px] font-extrabold uppercase tracking-wider text-black"
            >
              {{ article.category }}
            </span>

            <span
              v-if="article.type"
              class="rounded-full border border-white/25 bg-black/20 px-4 py-2 font-display text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md"
            >
              {{ article.type }}
            </span>
          </div>


          <!-- Title -->

          <h1
            class="mt-6 max-w-5xl font-display text-[38px] font-extrabold leading-[1.06] tracking-tight text-white min-[390px]:text-[44px] sm:text-5xl lg:text-6xl"
          >
            {{ article.title }}
          </h1>


          <!-- Metadata -->

          <div
            v-if="
              article.date ||
              article.source
            "
            class="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3"
          >
            <p
              v-if="article.date"
              class="font-display text-xs font-semibold text-white/60"
            >
              {{ article.date }}
            </p>

            <span
              v-if="
                article.date &&
                article.source
              "
              class="hidden h-1 w-1 rounded-full bg-white/30 sm:block"
              aria-hidden="true"
            ></span>

            <p
              v-if="article.source"
              class="font-display text-xs font-semibold leading-5 text-white/60"
            >
              Source: {{ article.source }}
            </p>
          </div>
        </div>
      </div>


      <!-- Accent -->

      <div
        class="absolute bottom-0 left-0 z-20 h-1 w-full bg-linear-to-r from-yen-red via-yen-gold to-yen-red"
      ></div>
    </section>


    <!-- ========================================
         ARTICLE CONTENT
    ========================================= -->

    <section class="bg-white">
      <div
        class="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-6 lg:grid-cols-[1fr_320px] lg:gap-14 lg:px-8 lg:py-28"
      >

        <!-- ==================================
             ARTICLE
        =================================== -->

        <article class="max-w-3xl">

          <!-- Lead -->

          <p
            v-if="article.intro"
            class="font-body text-lg font-bold leading-8 text-black sm:text-2xl sm:leading-10"
          >
            {{ article.intro }}
          </p>

          <div
            v-if="article.intro"
            class="my-8 h-[3px] w-14 bg-yen-gold sm:my-9"
          ></div>


          <!-- Paragraphs -->

          <div
            v-if="contentParagraphs.length"
            class="space-y-7"
          >
            <p
              v-for="(paragraph, index) in contentParagraphs"
              :key="`${index}-${paragraph.slice(0, 30)}`"
              class="font-body text-sm leading-8 text-gray-600 sm:text-base sm:leading-9"
            >
              {{ paragraph }}
            </p>
          </div>


          <!-- =================================
               HIGHLIGHTS
          ================================== -->

          <section
            v-if="highlights.length"
            class="mt-10 rounded-[1.5rem] bg-[#f7f7f5] p-6 sm:mt-12 sm:rounded-[1.7rem] sm:p-8"
            aria-labelledby="story-highlights-heading"
          >
            <h2
              id="story-highlights-heading"
              class="font-display text-[10px] font-extrabold uppercase tracking-[0.18em] text-yen-red sm:text-xs"
            >
              Story Highlights
            </h2>

            <ul
              class="mt-6 grid gap-4 sm:grid-cols-2"
            >
              <li
                v-for="highlight in highlights"
                :key="highlight"
                class="flex items-start gap-3"
              >
                <span
                  class="mt-2 h-2 w-2 shrink-0 rounded-full bg-yen-gold"
                  aria-hidden="true"
                ></span>

                <span
                  class="font-display text-sm font-semibold leading-6 text-black"
                >
                  {{ highlight }}
                </span>
              </li>
            </ul>
          </section>


          <!-- =================================
               TAGS
          ================================== -->

          <section
            v-if="tags.length"
            class="mt-10 border-t border-gray-200 pt-7"
            aria-labelledby="article-topics-heading"
          >
            <h2
              id="article-topics-heading"
              class="font-display text-[10px] font-bold uppercase tracking-wider text-gray-400 sm:text-xs"
            >
              Topics
            </h2>

            <ul
              class="mt-4 flex flex-wrap gap-2"
            >
              <li
                v-for="tag in tags"
                :key="tag"
                class="rounded-full bg-[#f7f7f5] px-4 py-2 font-display text-xs font-bold text-gray-600"
              >
                {{ tag }}
              </li>
            </ul>
          </section>
        </article>


        <!-- ==================================
             ARTICLE SIDEBAR
        =================================== -->

        <aside
          aria-label="Article information"
        >
          <div
            class="overflow-hidden rounded-[1.6rem] bg-black sm:rounded-[1.7rem] lg:sticky lg:top-28"
          >
            <div class="p-6 sm:p-7">

              <p
                class="font-display text-[10px] font-extrabold uppercase tracking-[0.18em] text-yen-gold sm:text-xs"
              >
                Article Information
              </p>


              <dl
                class="mt-6 divide-y divide-white/10"
              >
                <!-- Published -->

                <div
                  v-if="article.date"
                  class="py-5 first:pt-0"
                >
                  <dt
                    class="font-display text-[9px] font-bold uppercase tracking-wider text-white/35"
                  >
                    Published
                  </dt>

                  <dd
                    class="mt-2 font-display text-sm font-semibold leading-6 text-white"
                  >
                    {{ article.date }}
                  </dd>
                </div>


                <!-- Author -->

                <div
                  v-if="article.author"
                  class="py-5 first:pt-0"
                >
                  <dt
                    class="font-display text-[9px] font-bold uppercase tracking-wider text-white/35"
                  >
                    Author
                  </dt>

                  <dd
                    class="mt-2 font-display text-sm font-semibold leading-6 text-white"
                  >
                    {{ article.author }}
                  </dd>
                </div>


                <!-- Source -->

                <div
                  v-if="article.source"
                  class="py-5 first:pt-0"
                >
                  <dt
                    class="font-display text-[9px] font-bold uppercase tracking-wider text-white/35"
                  >
                    Source
                  </dt>

                  <dd
                    class="mt-2 font-display text-sm font-semibold leading-6 text-white"
                  >
                    {{ article.source }}
                  </dd>
                </div>


                <!-- Content Type -->

                <div
                  v-if="article.type"
                  class="py-5 first:pt-0"
                >
                  <dt
                    class="font-display text-[9px] font-bold uppercase tracking-wider text-white/35"
                  >
                    Content Type
                  </dt>

                  <dd
                    class="mt-2 font-display text-sm font-semibold leading-6 text-yen-gold"
                  >
                    {{ article.type }}
                  </dd>
                </div>
              </dl>


              <!-- Source link -->

              <a
                v-if="article.sourceUrl"
                :href="article.sourceUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="mt-7 flex w-full items-center justify-center rounded-full bg-yen-gold px-6 py-4 font-display text-xs font-bold text-black transition duration-300 hover:-translate-y-1 hover:bg-white"
                :aria-label="`Open original source for ${article.title} — opens in a new tab`"
              >
                View Original Source

                <span
                  class="ml-2"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </a>


              <!-- Back -->

              <RouterLink
                :to="{ name: 'news' }"
                class="mt-4 flex w-full items-center justify-center rounded-full border border-white/20 px-6 py-3.5 font-display text-xs font-bold text-white transition hover:border-yen-gold hover:text-yen-gold"
              >
                ← News & Insights
              </RouterLink>
            </div>


            <!-- Context note -->

            <div
              class="bg-yen-gold px-6 py-5 sm:px-7"
            >
              <p
                class="font-body text-xs leading-6 text-black/70"
              >
                Source, author and publication information are
                displayed as provided with this story. Use the
                original source link when available for complete
                publication context.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </section>


    <!-- ========================================
         RELATED STORIES
    ========================================= -->

    <section
      v-if="relatedArticles.length"
      class="bg-[#f7f7f5]"
    >
      <div
        class="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24"
      >
        <!-- Header -->

        <div
          class="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p
              class="font-display text-[10px] font-extrabold uppercase tracking-[0.18em] text-yen-red sm:text-xs"
            >
              Keep Reading
            </p>

            <h2
              class="mt-3 font-display text-3xl font-extrabold leading-tight text-black sm:text-4xl"
            >
              Related stories
            </h2>
          </div>


          <RouterLink
            :to="{ name: 'news' }"
            class="inline-flex items-center gap-2 font-display text-sm font-bold text-black transition hover:text-yen-red"
          >
            View All News

            <span aria-hidden="true">
              →
            </span>
          </RouterLink>
        </div>


        <!-- Cards -->

        <div
          class="mt-9 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          <article
            v-for="related in relatedArticles"
            :key="related.id"
            class="group flex h-full flex-col overflow-hidden rounded-[1.5rem] bg-white transition duration-300 hover:-translate-y-2 hover:shadow-xl"
          >
            <!-- Image -->

            <div
              class="relative h-[220px] overflow-hidden sm:h-[240px]"
            >
              <img
                :src="related.image"
                :alt="related.title"
                loading="lazy"
                class="h-full w-full object-cover object-center transition duration-700 group-hover:scale-105"
              />

              <div
                class="absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-transparent"
              ></div>


              <span
                v-if="related.category"
                class="absolute left-4 top-4 rounded-full bg-yen-gold px-3 py-2 font-display text-[9px] font-extrabold uppercase text-black"
              >
                {{ related.category }}
              </span>
            </div>


            <!-- Body -->

            <div
              class="flex flex-1 flex-col p-6"
            >
              <div
                class="flex flex-wrap items-center gap-3"
              >
                <span
                  v-if="related.type"
                  class="font-display text-[9px] font-extrabold uppercase tracking-[0.14em] text-yen-red"
                >
                  {{ related.type }}
                </span>

                <span
                  v-if="
                    related.type &&
                    related.date
                  "
                  class="h-1 w-1 rounded-full bg-gray-300"
                ></span>

                <span
                  v-if="related.date"
                  class="font-display text-xs text-gray-400"
                >
                  {{ related.date }}
                </span>
              </div>


              <h3
                class="mt-3 font-display text-xl font-bold leading-snug text-black"
              >
                {{ related.title }}
              </h3>


              <p
                v-if="related.excerpt"
                class="mt-4 font-body text-sm leading-7 text-gray-600"
              >
                {{ related.excerpt }}
              </p>


              <div class="mt-auto pt-6">
                <RouterLink
                  :to="{
                    name: 'news-detail',
                    params: {
                      slug: related.slug,
                    },
                  }"
                  class="flex items-center justify-between rounded-xl bg-black px-5 py-4 font-display text-sm font-bold text-white transition group-hover:bg-yen-red"
                >
                  Read Story

                  <span
                    class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-yen-gold text-black"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </RouterLink>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>


    <!-- ========================================
         FINAL CTA
    ========================================= -->

    <section class="bg-white">
      <div
        class="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24"
      >
        <div
          class="relative overflow-hidden rounded-[1.7rem] bg-black p-7 sm:rounded-[2rem] sm:p-10 lg:p-14"
        >
          <div
            class="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-yen-gold/10"
          ></div>


          <div
            class="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center"
          >
            <div class="max-w-3xl">
              <p
                class="font-display text-[10px] font-extrabold uppercase tracking-[0.18em] text-yen-gold sm:text-xs"
              >
                Stay Informed
              </p>

              <h2
                class="mt-4 font-display text-2xl font-extrabold leading-tight text-white sm:text-4xl"
              >
                Follow what's happening across the
                entrepreneurship ecosystem.
              </h2>

              <p
                class="mt-4 max-w-2xl font-body text-sm leading-7 text-white/60 sm:text-base"
              >
                Explore more YEN-Liberia stories or subscribe for
                news, opportunities, programs and event updates.
              </p>
            </div>


            <div
              class="flex flex-col gap-3 sm:flex-row lg:flex-col"
            >
              <RouterLink
                :to="{ name: 'news' }"
                class="inline-flex w-full items-center justify-center rounded-full bg-yen-gold px-7 py-4 font-display text-sm font-bold text-black transition duration-300 hover:-translate-y-1 hover:bg-white sm:w-auto sm:min-w-[220px]"
              >
                Explore News

                <span
                  class="ml-3"
                  aria-hidden="true"
                >
                  →
                </span>
              </RouterLink>

              <RouterLink
                :to="{
                  name: 'home',
                  hash: '#newsletter',
                }"
                class="inline-flex w-full items-center justify-center rounded-full border border-white/25 px-7 py-4 font-display text-sm font-bold text-white transition hover:border-yen-gold hover:text-yen-gold sm:w-auto sm:min-w-[220px]"
              >
                Join Newsletter
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>


  <!-- ==========================================
       INVALID ARTICLE
  =========================================== -->

  <main
    v-else
    class="relative flex min-h-[70vh] items-center overflow-hidden bg-white px-5 py-20 text-center"
  >
    <div
      class="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-yen-gold/15 blur-3xl"
    ></div>

    <div
      class="pointer-events-none absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-yen-red/10 blur-3xl"
    ></div>


    <div
      class="relative mx-auto max-w-2xl"
    >
      <p
        class="font-display text-7xl font-black text-yen-gold sm:text-8xl"
      >
        404
      </p>

      <p
        class="mt-4 font-display text-[10px] font-extrabold uppercase tracking-[0.2em] text-yen-red sm:text-xs"
      >
        Article Not Found
      </p>

      <h1
        class="mt-4 font-display text-3xl font-extrabold leading-tight text-black sm:text-4xl"
      >
        We couldn't find this story.
      </h1>

      <p
        class="mx-auto mt-4 max-w-lg font-body text-sm leading-7 text-gray-600 sm:text-base"
      >
        The article may have been removed, unpublished, or the
        link may be incorrect.
      </p>


      <div
        class="mt-8 flex flex-col justify-center gap-3 sm:flex-row"
      >
        <RouterLink
          :to="{ name: 'news' }"
          class="inline-flex items-center justify-center rounded-full bg-black px-7 py-4 font-display text-sm font-bold text-white transition hover:bg-yen-red"
        >
          Browse News

          <span
            class="ml-3 text-yen-gold"
            aria-hidden="true"
          >
            →
          </span>
        </RouterLink>

        <RouterLink
          :to="{ name: 'home' }"
          class="inline-flex items-center justify-center rounded-full border border-black px-7 py-4 font-display text-sm font-bold text-black transition hover:bg-yen-gold"
        >
          Return Home
        </RouterLink>
      </div>
    </div>
  </main>
</template>