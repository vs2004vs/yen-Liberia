<script setup>
const stories = [
  {
    id: 1,
    type: "Entrepreneur Story",
    name: "Danise Dodoo",
    business: "Lenise Home Care & Support Services",
    industry: "Professional Services",
    image: "/images/hero/hero-2.jpg",
    headline:
      "Building trust, creating jobs and professionalizing home care in Liberia.",
    description:
      "Lenise Home Care & Support Services is building a more structured approach to domestic and home-care services through worker training, screening, client support and professional service delivery.",
    support:
      "Early support from the Youth Entrepreneurs Network included a US$2,000 grant that helped the company acquire a motorbike to strengthen mobility, monitoring and client response.",
    stats: [
      {
        value: "$2,000",
        label: "Early YEN Grant",
      },
      {
        value: "150+",
        label: "Clients Reported",
      },
      {
        value: "2023",
        label: "Business Founded",
      },
    ],
    featured: true,
  },

  {
    id: 2,
    type: "Digital Growth",
    name: "Green Basket Agro Enterprise",
    business: "Women in Agriculture for Sustainable Development",
    industry: "Agribusiness",
    image: "/images/hero/hero-3.jpg",
    headline:
      "Using digital skills to strengthen visibility and market access.",
    description:
      "Green Basket Agro Enterprise participated in online marketing and sales training delivered through collaboration involving YEN-Liberia and partners, strengthening practical skills for digital business growth.",
    support:
      "The training covered tools and strategies designed to help women-led businesses improve their digital presence, showcase products and reach more customers.",
    stats: [],
    featured: false,
  },

  {
    id: 3,
    type: "Program Impact",
    name: "2026 MSME Clinic Participants",
    business: "From Side Hustle to Enterprise",
    industry: "Business Development",
    image: "/images/hero/hero-4.jpg",
    headline:
      "Turning business knowledge into stronger and more formal enterprises.",
    description:
      "Entrepreneurs participating in the 2026 MSME Clinic received practical support around finance, bookkeeping, tax readiness, branding, marketing and business formalization.",
    support:
      "Participants described the clinic as valuable for understanding taxation, financing pathways and the systems needed to structure and grow their businesses.",
    stats: [
      {
        value: "100",
        label: "Entrepreneurs Selected",
      },
      {
        value: "2 Days",
        label: "Intensive Clinic",
      },
    ],
    featured: false,
  },
]
</script>

<template>
  <section
    id="stories"
    class="overflow-hidden bg-[#f7f7f5]"
  >
    <div
      class="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28"
    >
      <!-- ========================================
           SECTION HEADER
      ========================================= -->

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
              Stories of Impact
            </span>
          </div>

          <h2
            class="font-display max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-black sm:text-5xl"
          >
            Behind every business is a

            <span class="text-yen-red">
              story worth telling.
            </span>
          </h2>
        </div>

        <div>
          <p
            class="max-w-xl font-body text-base leading-8 text-gray-600 lg:ml-auto"
          >
            Discover how entrepreneurs across the YEN-Liberia
            ecosystem are developing businesses, strengthening
            their skills and creating meaningful economic and
            social impact.
          </p>
        </div>
      </div>

      <!-- ========================================
           FEATURED STORY
      ========================================= -->

      <article
        class="group mt-14 overflow-hidden rounded-[2rem] bg-white shadow-sm"
      >
        <div
          class="grid lg:grid-cols-[0.95fr_1.05fr]"
        >
          <!-- IMAGE -->

          <div
            class="relative min-h-[500px] overflow-hidden lg:min-h-[650px]"
          >
            <img
              :src="stories[0].image"
              :alt="stories[0].business"
              class="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />

            <div
              class="absolute inset-0 bg-linear-to-t from-black/80 via-black/15 to-transparent"
            ></div>

            <!-- Story category -->

            <div
              class="absolute left-6 top-6"
            >
              <span
                class="inline-flex items-center gap-2 rounded-full bg-yen-gold px-4 py-2 font-display text-[10px] font-extrabold uppercase tracking-[0.14em] text-black"
              >
                <span
                  class="h-2 w-2 rounded-full bg-yen-red"
                ></span>

                Featured Story
              </span>
            </div>

            <!-- Person -->

            <div
              class="absolute bottom-7 left-7 right-7"
            >
              <p
                class="font-display text-sm font-bold text-yen-gold"
              >
                {{ stories[0].name }}
              </p>

              <h3
                class="mt-1 font-display text-2xl font-extrabold text-white sm:text-3xl"
              >
                {{ stories[0].business }}
              </h3>

              <p
                class="mt-2 font-display text-xs font-semibold uppercase tracking-wider text-white/60"
              >
                {{ stories[0].industry }}
              </p>
            </div>
          </div>

          <!-- STORY CONTENT -->

          <div
            class="flex items-center p-8 sm:p-10 lg:p-14"
          >
            <div>
              <p
                class="font-display text-xs font-extrabold uppercase tracking-[0.18em] text-yen-red"
              >
                {{ stories[0].type }}
              </p>

              <h3
                class="mt-5 font-display text-3xl font-extrabold leading-tight text-black sm:text-4xl"
              >
                {{ stories[0].headline }}
              </h3>

              <!-- Editorial quote mark -->

              <div
                class="mt-7 font-body text-7xl font-black leading-none text-yen-gold"
              >
                “
              </div>

              <p
                class="-mt-4 font-body text-base leading-8 text-gray-600"
              >
                {{ stories[0].description }}
              </p>

              <p
                class="mt-5 font-body text-base leading-8 text-gray-600"
              >
                {{ stories[0].support }}
              </p>

              <!-- STATS -->

              <div
                class="mt-9 grid grid-cols-3 gap-3 border-y border-gray-200 py-7"
              >
                <div
                  v-for="stat in stories[0].stats"
                  :key="stat.label"
                >
                  <p
                    class="font-display text-2xl font-extrabold text-black sm:text-3xl"
                  >
                    {{ stat.value }}
                  </p>

                  <p
                    class="mt-2 font-display text-[10px] font-bold uppercase tracking-wider text-gray-500 sm:text-xs"
                  >
                    {{ stat.label }}
                  </p>
                </div>
              </div>

              <!-- Read More -->

              <button
                type="button"
                class="mt-8 inline-flex items-center gap-3 rounded-full bg-black px-7 py-4 font-display text-sm font-bold text-white transition duration-300 hover:-translate-y-1 hover:bg-yen-red"
              >
                Read Danise's Story

                <span
                  class="text-yen-gold"
                >
                  →
                </span>
              </button>
            </div>
          </div>
        </div>
      </article>

      <!-- ========================================
           MORE STORIES
      ========================================= -->

      <div
        class="mt-14 flex items-end justify-between gap-5"
      >
        <div>
          <p
            class="font-display text-xs font-extrabold uppercase tracking-[0.18em] text-yen-red"
          >
            More From the Network
          </p>

          <h3
            class="mt-2 font-display text-2xl font-bold text-black sm:text-3xl"
          >
            Entrepreneurs moving forward
          </h3>
        </div>

        <a
          href="#"
          class="hidden font-display text-sm font-bold text-black transition hover:text-yen-red sm:inline-flex"
        >
          View All Stories →

        </a>
      </div>

      <div
        class="mt-7 grid gap-7 lg:grid-cols-2"
      >
        <article
          v-for="story in stories.slice(1)"
          :key="story.id"
          class="group overflow-hidden rounded-[1.7rem] bg-white transition duration-300 hover:-translate-y-2 hover:shadow-xl"
        >
          <!-- IMAGE -->

          <div
            class="relative h-[310px] overflow-hidden"
          >
            <img
              :src="story.image"
              :alt="story.business"
              class="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />

            <div
              class="absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-transparent"
            ></div>

            <div
              class="absolute left-5 top-5"
            >
              <span
                class="rounded-full bg-yen-gold px-4 py-2 font-display text-[10px] font-extrabold uppercase tracking-wider text-black"
              >
                {{ story.type }}
              </span>
            </div>

            <div
              class="absolute bottom-5 left-5 right-5"
            >
              <p
                class="font-display text-sm font-bold text-yen-gold"
              >
                {{ story.name }}
              </p>

              <h3
                class="mt-1 font-display text-xl font-bold text-white"
              >
                {{ story.business }}
              </h3>
            </div>
          </div>

          <!-- CONTENT -->

          <div class="p-7 sm:p-8">
            <p
              class="font-display text-xs font-bold uppercase tracking-[0.14em] text-yen-red"
            >
              {{ story.industry }}
            </p>

            <h3
              class="mt-3 font-display text-2xl font-bold leading-snug text-black"
            >
              {{ story.headline }}
            </h3>

            <p
              class="mt-5 font-body text-sm leading-7 text-gray-600"
            >
              {{ story.description }}
            </p>

            <!-- Stats when available -->

            <div
              v-if="story.stats.length"
              class="mt-6 flex flex-wrap gap-6 border-t border-gray-100 pt-6"
            >
              <div
                v-for="stat in story.stats"
                :key="stat.label"
              >
                <p
                  class="font-display text-xl font-extrabold text-black"
                >
                  {{ stat.value }}
                </p>

                <p
                  class="mt-1 font-display text-[10px] font-bold uppercase tracking-wider text-gray-500"
                >
                  {{ stat.label }}
                </p>
              </div>
            </div>

            <!-- Read button -->

            <button
              type="button"
              class="mt-7 inline-flex items-center gap-3 font-display text-sm font-bold text-black transition group-hover:text-yen-red"
            >
              Read Story

              <span
                class="flex h-8 w-8 items-center justify-center rounded-full bg-black text-yen-gold transition duration-300 group-hover:bg-yen-red group-hover:text-white"
              >
                →
              </span>
            </button>
          </div>
        </article>
      </div>

      <!-- ========================================
           STORY SUBMISSION CTA
      ========================================= -->

      <div
        class="relative mt-16 overflow-hidden rounded-[2rem] bg-black px-8 py-12 sm:px-10 lg:px-14"
      >
        <!-- Decorative circles -->

        <div
          class="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-yen-gold/10"
        ></div>

        <div
          class="absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-yen-red/10 blur-2xl"
        ></div>

        <div
          class="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center"
        >
          <div
            class="max-w-3xl"
          >
            <p
              class="font-display text-xs font-bold uppercase tracking-[0.18em] text-yen-gold"
            >
              Share Your Journey
            </p>

            <h3
              class="mt-4 font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl"
            >
              Your entrepreneurial journey could inspire someone else.
            </h3>

            <p
              class="mt-4 max-w-2xl font-body text-sm leading-7 text-white/65 sm:text-base"
            >
              Are you a YEN-Liberia entrepreneur with a story of
              growth, resilience or impact? Share your journey and
              help inspire Liberia's next generation of founders.
            </p>
          </div>

          <a
            href="#"
            class="inline-flex shrink-0 items-center justify-center rounded-full bg-yen-gold px-7 py-4 font-display text-sm font-bold text-black transition duration-300 hover:-translate-y-1 hover:bg-white"
          >
            Share Your Story

            <span class="ml-3">
              →
            </span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>