<script setup>
import { computed, ref } from "vue"

import {
  newsArticles,
  newsCategories,
} from "@/data/news"

const searchQuery = ref("")
const activeCategory = ref("All")

const filteredArticles = computed(() => {
  const query = searchQuery.value
    .toLowerCase()
    .trim()

  return newsArticles.filter((article) => {
    const matchesCategory =
      activeCategory.value === "All" ||
      article.category === activeCategory.value

    const matchesSearch =
      !query ||
      article.title.toLowerCase().includes(query) ||
      article.category.toLowerCase().includes(query) ||
      article.type.toLowerCase().includes(query) ||
      article.source.toLowerCase().includes(query) ||
      article.excerpt.toLowerCase().includes(query) ||
      article.tags.some((tag) =>
        tag.toLowerCase().includes(query),
      )

    return matchesCategory && matchesSearch
  })
})

const clearFilters = () => {
  searchQuery.value = ""
  activeCategory.value = "All"
}
</script>

<template>
  <main class="w-full">

    <!-- ======================================
         HERO
    ======================================= -->

    <section
      class="relative isolate min-h-[560px] overflow-hidden"
    >
      <img
        src="/images/hero/hero-4.jpg"
        alt="YEN-Liberia News and Insights"
        class="absolute inset-0 h-full w-full object-cover"
      />

      <div
        class="absolute inset-0 bg-linear-to-r from-black/85 via-black/55 to-black/10"
      ></div>

      <div
        class="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-black/20"
      ></div>

      <div
        class="relative z-10 mx-auto flex min-h-[560px] max-w-7xl items-center px-5 py-20 lg:px-8"
      >
        <div class="max-w-4xl">

          <!-- Breadcrumb -->

          <div
            class="mb-8 flex items-center gap-3 font-display text-xs font-bold"
          >
            <RouterLink
              :to="{ name: 'home' }"
              class="text-white/55 transition hover:text-yen-gold"
            >
              Home
            </RouterLink>

            <span class="text-white/25">
              /
            </span>

            <span class="text-yen-gold">
              News & Insights
            </span>
          </div>

          <p
            class="font-display text-xs font-extrabold uppercase tracking-[0.2em] text-yen-gold"
          >
            Media Center
          </p>

          <h1
            class="mt-5 max-w-4xl font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            Stories shaping Liberia's

            <span class="text-yen-gold">
              entrepreneurship ecosystem.
            </span>
          </h1>

          <p
            class="mt-7 max-w-2xl font-body text-base leading-8 text-white/75 sm:text-lg"
          >
            Follow YEN-Liberia programs, entrepreneur stories,
            partnerships, events, media coverage and developments
            affecting young businesses across Liberia.
          </p>
        </div>
      </div>

      <div
        class="absolute bottom-0 left-0 h-1 w-full bg-linear-to-r from-yen-red via-yen-gold to-yen-red"
      ></div>
    </section>


    <!-- ======================================
         FEATURED STORY
    ======================================= -->

    <section class="bg-white">
      <div
        class="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24"
      >
        <div
          class="mb-10 flex items-end justify-between gap-6"
        >
          <div>
            <p
              class="font-display text-xs font-extrabold uppercase tracking-[0.18em] text-yen-red"
            >
              Featured
            </p>

            <h2
              class="mt-3 font-display text-3xl font-extrabold text-black sm:text-4xl"
            >
              Latest from the ecosystem
            </h2>
          </div>
        </div>


        <article
          class="group overflow-hidden rounded-[2rem] bg-black"
        >
          <div
            class="grid lg:grid-cols-[1.1fr_0.9fr]"
          >
            <!-- Image -->

            <div
              class="relative min-h-[430px] overflow-hidden lg:min-h-[560px]"
            >
              <img
                :src="newsArticles[0].image"
                :alt="newsArticles[0].title"
                class="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />

              <div
                class="absolute inset-0 bg-linear-to-t from-black/65 via-transparent to-transparent"
              ></div>

              <div
                class="absolute left-6 top-6"
              >
                <span
                  class="rounded-full bg-yen-gold px-4 py-2 font-display text-[10px] font-extrabold uppercase tracking-wider text-black"
                >
                  Featured Story
                </span>
              </div>
            </div>


            <!-- Content -->

            <div
              class="flex items-center p-8 sm:p-10 lg:p-12"
            >
              <div>
                <div
                  class="flex flex-wrap items-center gap-3"
                >
                  <span
                    class="font-display text-[10px] font-extrabold uppercase tracking-[0.15em] text-yen-gold"
                  >
                    {{ newsArticles[0].category }}
                  </span>

                  <span
                    class="h-1 w-1 rounded-full bg-white/30"
                  ></span>

                  <span
                    class="font-display text-xs font-semibold text-white/45"
                  >
                    {{ newsArticles[0].date }}
                  </span>
                </div>

                <h2
                  class="mt-5 font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl"
                >
                  {{ newsArticles[0].title }}
                </h2>

                <p
                  class="mt-6 font-body text-sm leading-8 text-white/65 sm:text-base"
                >
                  {{ newsArticles[0].excerpt }}
                </p>

                <div
                  class="mt-7 flex items-center gap-3 border-t border-white/10 pt-6"
                >
                  <span
                    class="rounded-full border border-white/15 px-3 py-2 font-display text-[10px] font-bold uppercase tracking-wider text-white/60"
                  >
                    {{ newsArticles[0].type }}
                  </span>

                  <span
                    class="font-display text-xs text-white/40"
                  >
                    {{ newsArticles[0].source }}
                  </span>
                </div>

                <RouterLink
                  :to="{
                    name: 'news-detail',
                    params: {
                      slug: newsArticles[0].slug,
                    },
                  }"
                  class="mt-8 inline-flex items-center gap-3 rounded-full bg-yen-gold px-7 py-4 font-display text-sm font-bold text-black transition hover:-translate-y-1 hover:bg-white"
                >
                  Read Story

                  <span>
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
        class="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28"
      >

        <!-- Header -->

        <div>
          <p
            class="font-display text-xs font-extrabold uppercase tracking-[0.18em] text-yen-red"
          >
            News & Insights
          </p>

          <h2
            class="mt-3 font-display text-3xl font-extrabold text-black sm:text-4xl"
          >
            Explore our latest stories
          </h2>
        </div>


        <!-- Search -->

        <div
          class="mt-10 rounded-[1.8rem] bg-black p-5 sm:p-7"
        >
          <div class="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m21 21-4.35-4.35m2.35-5.65A8 8 0 1 1 3 11a8 8 0 0 1 16 0Z"
              />
            </svg>

            <input
              v-model="searchQuery"
              type="search"
              placeholder="Search news, programs, partnerships..."
              class="w-full rounded-xl border border-white/15 bg-white/10 py-4 pl-14 pr-5 font-display text-sm text-white outline-none placeholder:text-white/35 focus:border-yen-gold"
            />
          </div>


          <!-- Category filters -->

          <div
            class="mt-5 flex flex-wrap gap-2"
          >
            <button
              v-for="category in newsCategories"
              :key="category"
              type="button"
              class="rounded-full px-4 py-2.5 font-display text-xs font-bold transition"
              :class="
                activeCategory === category
                  ? 'bg-yen-gold text-black'
                  : 'border border-white/15 text-white/65 hover:border-yen-gold hover:text-yen-gold'
              "
              @click="activeCategory = category"
            >
              {{ category }}
            </button>
          </div>
        </div>


        <!-- Result count -->

        <div
          class="mt-8 flex items-center justify-between gap-5"
        >
          <p
            class="font-display text-sm font-semibold text-gray-500"
          >
            Showing

            <span class="font-bold text-black">
              {{ filteredArticles.length }}
            </span>

            stories
          </p>

          <button
            v-if="
              searchQuery ||
              activeCategory !== 'All'
            "
            type="button"
            class="font-display text-sm font-bold text-yen-red transition hover:text-black"
            @click="clearFilters"
          >
            Clear filters
          </button>
        </div>


        <!-- Cards -->

        <div
          v-if="filteredArticles.length"
          class="mt-7 grid gap-7 md:grid-cols-2 lg:grid-cols-3"
        >
          <article
            v-for="article in filteredArticles"
            :key="article.id"
            class="group flex flex-col overflow-hidden rounded-[1.7rem] bg-white transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >

            <!-- Image -->

            <div
              class="relative h-[260px] overflow-hidden"
            >
              <img
                :src="article.image"
                :alt="article.title"
                class="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />

              <div
                class="absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-transparent"
              ></div>

              <span
                class="absolute left-5 top-5 rounded-full bg-yen-gold px-3 py-2 font-display text-[9px] font-extrabold uppercase tracking-wider text-black"
              >
                {{ article.category }}
              </span>

              <span
                v-if="article.featured"
                class="absolute right-5 top-5 rounded-full bg-white px-3 py-2 font-display text-[9px] font-extrabold uppercase text-black"
              >
                Featured
              </span>
            </div>


            <!-- Body -->

            <div
              class="flex flex-1 flex-col p-7"
            >
              <div
                class="flex items-center gap-3"
              >
                <span
                  class="font-display text-[10px] font-bold uppercase tracking-[0.15em] text-yen-red"
                >
                  {{ article.type }}
                </span>

                <span
                  class="h-1 w-1 rounded-full bg-gray-300"
                ></span>

                <span
                  class="font-display text-xs text-gray-400"
                >
                  {{ article.date }}
                </span>
              </div>

              <h3
                class="mt-4 font-display text-xl font-bold leading-snug text-black"
              >
                {{ article.title }}
              </h3>

              <p
                class="mt-4 flex-1 font-body text-sm leading-7 text-gray-600"
              >
                {{ article.excerpt }}
              </p>

              <div
                class="mt-6 flex items-center justify-between border-t border-gray-100 pt-5"
              >
                <div>
                  <p
                    class="font-display text-[9px] font-bold uppercase tracking-wider text-gray-400"
                  >
                    Source
                  </p>

                  <p
                    class="mt-1 font-display text-xs font-semibold text-black"
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
                  class="flex h-10 w-10 items-center justify-center rounded-full bg-black text-yen-gold transition group-hover:bg-yen-red group-hover:text-white"
                  :aria-label="`Read ${article.title}`"
                >
                  →
                </RouterLink>
              </div>
            </div>
          </article>
        </div>


        <!-- Empty -->

        <div
          v-else
          class="mt-8 rounded-[1.7rem] border border-dashed border-gray-300 bg-white px-6 py-16 text-center"
        >
          <h3
            class="font-display text-xl font-bold text-black"
          >
            No stories found
          </h3>

          <p
            class="mt-3 font-body text-sm text-gray-500"
          >
            Try another search or news category.
          </p>

          <button
            type="button"
            class="mt-5 font-display text-sm font-bold text-yen-red"
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
        class="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24"
      >
        <div
          class="relative overflow-hidden rounded-[2rem] bg-yen-gold p-8 sm:p-10 lg:p-14"
        >
          <div
            class="absolute -right-24 -top-24 h-72 w-72 rounded-full border-[40px] border-black/5"
          ></div>

          <div
            class="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center"
          >
            <div class="max-w-3xl">
              <p
                class="font-display text-xs font-extrabold uppercase tracking-[0.18em] text-yen-red"
              >
                Stay Informed
              </p>

              <h2
                class="mt-4 font-display text-3xl font-extrabold text-black sm:text-4xl"
              >
                Keep up with Liberia's entrepreneur ecosystem.
              </h2>

              <p
                class="mt-4 max-w-2xl font-body text-sm leading-7 text-black/65 sm:text-base"
              >
                Receive YEN-Liberia news, programs, opportunities,
                entrepreneur stories and event announcements.
              </p>
            </div>

            <RouterLink
              :to="{
                name: 'home',
                hash: '#newsletter',
              }"
              class="inline-flex items-center justify-center rounded-full bg-black px-7 py-4 font-display text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-yen-red"
            >
              Join Newsletter

              <span class="ml-3 text-yen-gold">
                →
              </span>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>