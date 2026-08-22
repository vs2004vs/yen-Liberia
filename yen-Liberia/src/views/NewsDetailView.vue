<script setup>
import { computed } from "vue"
import { useRoute } from "vue-router"

import {
  getNewsArticleBySlug,
  getRelatedNews,
} from "@/data/news"

const route = useRoute()

const article = computed(() =>
  getNewsArticleBySlug(route.params.slug),
)

const relatedArticles = computed(() => {
  if (!article.value) return []

  return getRelatedNews(article.value)
})
</script>

<template>
  <main
    v-if="article"
    class="w-full"
  >

    <!-- ======================================
         ARTICLE HERO
    ======================================= -->

    <section
      class="relative isolate min-h-[620px] overflow-hidden"
    >
      <img
        :src="article.image"
        :alt="article.title"
        class="absolute inset-0 h-full w-full object-cover"
      />

      <div
        class="absolute inset-0 bg-linear-to-r from-black/90 via-black/70 to-black/25"
      ></div>

      <div
        class="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-black/20"
      ></div>

      <div
        class="relative z-10 mx-auto flex min-h-[620px] max-w-7xl items-end px-5 py-16 lg:px-8 lg:py-20"
      >
        <div class="max-w-5xl">

          <!-- Breadcrumb -->

          <div
            class="mb-8 flex flex-wrap items-center gap-3 font-display text-xs font-bold"
          >
            <RouterLink
              :to="{ name: 'home' }"
              class="text-white/50 transition hover:text-yen-gold"
            >
              Home
            </RouterLink>

            <span class="text-white/25">
              /
            </span>

            <RouterLink
              :to="{ name: 'news' }"
              class="text-white/50 transition hover:text-yen-gold"
            >
              News
            </RouterLink>

            <span class="text-white/25">
              /
            </span>

            <span class="text-yen-gold">
              {{ article.category }}
            </span>
          </div>


          <!-- Metadata -->

          <div
            class="flex flex-wrap items-center gap-3"
          >
            <span
              class="rounded-full bg-yen-gold px-4 py-2 font-display text-[10px] font-extrabold uppercase tracking-wider text-black"
            >
              {{ article.category }}
            </span>

            <span
              class="rounded-full border border-white/25 bg-white/10 px-4 py-2 font-display text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md"
            >
              {{ article.type }}
            </span>
          </div>


          <!-- Title -->

          <h1
            class="mt-6 max-w-5xl font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl"
          >
            {{ article.title }}
          </h1>


          <!-- Meta -->

          <div
            class="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3"
          >
            <p
              class="font-display text-xs font-semibold text-white/60"
            >
              {{ article.date }}
            </p>

            <span
              class="hidden h-1 w-1 rounded-full bg-white/30 sm:block"
            ></span>

            <p
              class="font-display text-xs font-semibold text-white/60"
            >
              Source: {{ article.source }}
            </p>
          </div>
        </div>
      </div>

      <div
        class="absolute bottom-0 h-1 w-full bg-linear-to-r from-yen-red via-yen-gold to-yen-red"
      ></div>
    </section>


    <!-- ======================================
         ARTICLE
    ======================================= -->

    <section class="bg-white">
      <div
        class="mx-auto grid max-w-7xl gap-14 px-5 py-20 lg:grid-cols-[1fr_320px] lg:px-8 lg:py-28"
      >

        <!-- Article body -->

        <article class="max-w-3xl">

          <!-- Lead -->

          <p
            class="font-body text-xl font-bold leading-9 text-black sm:text-2xl sm:leading-10"
          >
            {{ article.intro }}
          </p>

          <div
            class="my-9 h-[3px] w-14 bg-yen-gold"
          ></div>


          <!-- Paragraphs -->

          <div
            class="space-y-7"
          >
            <p
              v-for="paragraph in article.content"
              :key="paragraph"
              class="font-body text-base leading-9 text-gray-600"
            >
              {{ paragraph }}
            </p>
          </div>


          <!-- Highlights -->

          <div
            class="mt-12 rounded-[1.7rem] bg-[#f7f7f5] p-7 sm:p-8"
          >
            <p
              class="font-display text-xs font-extrabold uppercase tracking-[0.18em] text-yen-red"
            >
              Story Highlights
            </p>

            <div
              class="mt-6 grid gap-4 sm:grid-cols-2"
            >
              <div
                v-for="highlight in article.highlights"
                :key="highlight"
                class="flex items-start gap-3"
              >
                <span
                  class="mt-2 h-2 w-2 shrink-0 rounded-full bg-yen-gold"
                ></span>

                <p
                  class="font-display text-sm font-semibold leading-6 text-black"
                >
                  {{ highlight }}
                </p>
              </div>
            </div>
          </div>


          <!-- Tags -->

          <div
            class="mt-10 border-t border-gray-200 pt-7"
          >
            <p
              class="font-display text-xs font-bold uppercase tracking-wider text-gray-400"
            >
              Topics
            </p>

            <div
              class="mt-4 flex flex-wrap gap-2"
            >
              <span
                v-for="tag in article.tags"
                :key="tag"
                class="rounded-full bg-[#f7f7f5] px-4 py-2 font-display text-xs font-bold text-gray-600"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </article>


        <!-- ==================================
             SIDEBAR
        =================================== -->

        <aside>
          <div
            class="sticky top-28 overflow-hidden rounded-[1.7rem] bg-black"
          >
            <div class="p-7">
              <p
                class="font-display text-xs font-extrabold uppercase tracking-[0.18em] text-yen-gold"
              >
                Article Information
              </p>

              <div
                class="mt-6 divide-y divide-white/10"
              >
                <div class="py-5 first:pt-0">
                  <p
                    class="font-display text-[9px] font-bold uppercase tracking-wider text-white/35"
                  >
                    Published
                  </p>

                  <p
                    class="mt-2 font-display text-sm font-semibold text-white"
                  >
                    {{ article.date }}
                  </p>
                </div>

                <div class="py-5">
                  <p
                    class="font-display text-[9px] font-bold uppercase tracking-wider text-white/35"
                  >
                    Original Author
                  </p>

                  <p
                    class="mt-2 font-display text-sm font-semibold text-white"
                  >
                    {{ article.author }}
                  </p>
                </div>

                <div class="py-5">
                  <p
                    class="font-display text-[9px] font-bold uppercase tracking-wider text-white/35"
                  >
                    Source
                  </p>

                  <p
                    class="mt-2 font-display text-sm font-semibold text-white"
                  >
                    {{ article.source }}
                  </p>
                </div>

                <div class="py-5">
                  <p
                    class="font-display text-[9px] font-bold uppercase tracking-wider text-white/35"
                  >
                    Content Type
                  </p>

                  <p
                    class="mt-2 font-display text-sm font-semibold text-yen-gold"
                  >
                    {{ article.type }}
                  </p>
                </div>
              </div>


              <!-- Original source -->

              <a
                :href="article.sourceUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="mt-7 flex w-full items-center justify-center rounded-full bg-yen-gold px-6 py-4 font-display text-xs font-bold text-black transition hover:bg-white"
              >
                Read Original Coverage

                <span class="ml-2">
                  ↗
                </span>
              </a>
            </div>

            <div
              class="bg-yen-gold px-7 py-5"
            >
              <p
                class="font-body text-xs leading-6 text-black/70"
              >
                This article summarizes publicly published
                coverage relevant to YEN-Liberia. Follow the
                source link for the original report.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </section>


    <!-- ======================================
         RELATED STORIES
    ======================================= -->

    <section class="bg-[#f7f7f5]">
      <div
        class="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24"
      >
        <div
          class="flex items-end justify-between gap-6"
        >
          <div>
            <p
              class="font-display text-xs font-extrabold uppercase tracking-[0.18em] text-yen-red"
            >
              Keep Reading
            </p>

            <h2
              class="mt-3 font-display text-3xl font-extrabold text-black sm:text-4xl"
            >
              Related stories
            </h2>
          </div>

          <RouterLink
            :to="{ name: 'news' }"
            class="hidden font-display text-sm font-bold text-black transition hover:text-yen-red sm:block"
          >
            View All News →
          </RouterLink>
        </div>


        <div
          class="mt-9 grid gap-6 md:grid-cols-3"
        >
          <article
            v-for="related in relatedArticles"
            :key="related.id"
            class="group overflow-hidden rounded-[1.5rem] bg-white transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div
              class="h-[220px] overflow-hidden"
            >
              <img
                :src="related.image"
                :alt="related.title"
                class="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
            </div>

            <div class="p-6">
              <p
                class="font-display text-[9px] font-extrabold uppercase tracking-[0.14em] text-yen-red"
              >
                {{ related.category }}
              </p>

              <h3
                class="mt-3 font-display text-lg font-bold leading-snug text-black"
              >
                {{ related.title }}
              </h3>

              <RouterLink
                :to="{
                  name: 'news-detail',
                  params: {
                    slug: related.slug,
                  },
                }"
                class="mt-5 inline-flex items-center gap-2 font-display text-xs font-bold text-black transition group-hover:text-yen-red"
              >
                Read Story →

              </RouterLink>
            </div>
          </article>
        </div>
      </div>
    </section>


    <!-- Back -->

    <section class="bg-white">
      <div
        class="mx-auto max-w-7xl px-5 py-14 lg:px-8"
      >
        <RouterLink
          :to="{ name: 'news' }"
          class="font-display text-sm font-bold text-black transition hover:text-yen-red"
        >
          ← Back to News & Insights
        </RouterLink>
      </div>
    </section>
  </main>


  <!-- ======================================
       404
  ======================================= -->

  <main
    v-else
    class="flex min-h-[65vh] items-center justify-center bg-white px-5 text-center"
  >
    <div>
      <p
        class="font-display text-7xl font-black text-yen-gold"
      >
        404
      </p>

      <h1
        class="mt-4 font-display text-3xl font-extrabold text-black"
      >
        Article not found
      </h1>

      <RouterLink
        :to="{ name: 'news' }"
        class="mt-7 inline-flex rounded-full bg-black px-7 py-4 font-display text-sm font-bold text-white"
      >
        Browse News
      </RouterLink>
    </div>
  </main>
</template>