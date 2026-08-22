<script setup>
const programs = [
  {
    id: 1,
    title: "2026 MSME Clinic",
    category: "Business Development",
    year: "2026",
    image: "/images/hero/hero-3.jpg",
    description:
      "A practical business development clinic helping youth-led and emerging enterprises strengthen financial management, branding, bookkeeping, tax readiness and business formalization.",
    highlight: "100 Entrepreneurs",
    featured: true,
  },
  {
    id: 2,
    title: "Women Agribusiness Digital Empowerment",
    category: "Digital Skills",
    year: "2026",
    image: "/images/hero/hero-2.jpg",
    description:
      "Hands-on digital training helping women entrepreneurs use social media, AI, online marketing, content creation and branding to grow their businesses.",
    highlight: "Women Entrepreneurs",
    featured: false,
  },
  {
    id: 3,
    title: "Global Entrepreneurship Week",
    category: "Entrepreneurship Conference",
    year: "2024",
    image: "/images/hero/hero-4.jpg",
    description:
      "A national entrepreneurship gathering bringing young entrepreneurs and youth leaders together to exchange ideas, strengthen networks and explore inclusive business growth.",
    highlight: "50+ Participants",
    featured: false,
  },
]
</script>

<template>
  <section
    id="programs"
    class="bg-white"
  >
    <div
      class="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28"
    >
      <!-- ==========================================
           SECTION HEADER
      =========================================== -->

      <div
        class="grid items-end gap-8 lg:grid-cols-2"
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
              Programs & Initiatives
            </span>
          </div>

          <h2
            class="font-display max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-black sm:text-5xl"
          >
            Practical programs that help

            <span class="text-yen-red">
              entrepreneurs grow.
            </span>
          </h2>
        </div>

        <div class="lg:pb-2">
          <p
            class="max-w-xl font-body text-base leading-8 text-gray-600 lg:ml-auto"
          >
            YEN-Liberia works with entrepreneurs, institutions
            and development partners to deliver practical
            programs that strengthen businesses, improve skills
            and create new pathways to opportunity.
          </p>
        </div>
      </div>

      <!-- ==========================================
           FEATURED PROGRAM
      =========================================== -->

      <div
        class="mt-14 overflow-hidden rounded-[2rem] bg-black"
      >
        <div
          class="grid lg:grid-cols-2"
        >
          <!-- Image -->
          <div
            class="relative min-h-[420px] overflow-hidden lg:min-h-[560px]"
          >
            <img
              :src="programs[0].image"
              :alt="programs[0].title"
              class="absolute inset-0 h-full w-full object-cover transition duration-700 hover:scale-105"
            />

            <!-- Image shading -->
            <div
              class="absolute inset-0 bg-linear-to-t from-black/65 via-black/10 to-transparent"
            ></div>

            <!-- Featured label -->
            <div
              class="absolute left-6 top-6"
            >
              <span
                class="inline-flex items-center gap-2 rounded-full bg-yen-gold px-4 py-2 font-display text-xs font-bold uppercase tracking-wider text-black"
              >
                <span
                  class="h-2 w-2 rounded-full bg-yen-red"
                ></span>

                Featured Initiative
              </span>
            </div>

            <!-- Mobile title overlay -->
            <div
              class="absolute bottom-6 left-6 right-6 lg:hidden"
            >
              <p
                class="font-display text-sm font-semibold uppercase tracking-wider text-yen-gold"
              >
                {{ programs[0].category }}
              </p>

              <h3
                class="mt-2 font-display text-3xl font-extrabold text-white"
              >
                {{ programs[0].title }}
              </h3>
            </div>
          </div>

          <!-- Content -->
          <div
            class="flex items-center p-8 sm:p-10 lg:p-14"
          >
            <div>
              <!-- Meta -->
              <div
                class="flex flex-wrap items-center gap-3"
              >
                <span
                  class="rounded-full border border-white/20 px-4 py-2 font-display text-xs font-semibold uppercase tracking-wider text-white/80"
                >
                  {{ programs[0].category }}
                </span>

                <span
                  class="rounded-full border border-yen-gold/50 px-4 py-2 font-display text-xs font-bold text-yen-gold"
                >
                  {{ programs[0].year }}
                </span>
              </div>

              <!-- Desktop title -->
              <h3
                class="mt-7 hidden font-display text-4xl font-extrabold leading-tight text-white lg:block xl:text-5xl"
              >
                {{ programs[0].title }}
              </h3>

              <p
                class="mt-6 font-body text-base leading-8 text-white/70"
              >
                {{ programs[0].description }}
              </p>

              <!-- Impact -->
              <div
                class="mt-8 border-l-4 border-yen-gold pl-5"
              >
                <p
                  class="font-display text-3xl font-extrabold text-yen-gold"
                >
                  {{ programs[0].highlight }}
                </p>

                <p
                  class="mt-1 font-body text-sm text-white/60"
                >
                  selected for the 2026 clinic
                </p>
              </div>

              <!-- Program focus -->
              <div
                class="mt-9 grid grid-cols-2 gap-x-4 gap-y-4"
              >
                <div
                  class="flex items-center gap-3 text-white/80"
                >
                  <span
                    class="h-2 w-2 rounded-full bg-yen-gold"
                  ></span>

                  <span
                    class="font-display text-sm font-medium"
                  >
                    Branding
                  </span>
                </div>

                <div
                  class="flex items-center gap-3 text-white/80"
                >
                  <span
                    class="h-2 w-2 rounded-full bg-yen-gold"
                  ></span>

                  <span
                    class="font-display text-sm font-medium"
                  >
                    Finance
                  </span>
                </div>

                <div
                  class="flex items-center gap-3 text-white/80"
                >
                  <span
                    class="h-2 w-2 rounded-full bg-yen-red"
                  ></span>

                  <span
                    class="font-display text-sm font-medium"
                  >
                    Bookkeeping
                  </span>
                </div>

                <div
                  class="flex items-center gap-3 text-white/80"
                >
                  <span
                    class="h-2 w-2 rounded-full bg-yen-red"
                  ></span>

                  <span
                    class="font-display text-sm font-medium"
                  >
                    Formalization
                  </span>
                </div>
              </div>

              <!-- Button -->
              <button
                type="button"
                class="mt-10 inline-flex items-center gap-3 rounded-full bg-yen-gold px-6 py-3.5 font-display text-sm font-bold text-black transition duration-300 hover:-translate-y-1 hover:bg-white"
              >
                Explore Program

                <span
                  class="text-lg"
                >
                  →
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- ==========================================
           OTHER PROGRAMS
      =========================================== -->

      <div
        class="mt-8 grid gap-7 md:grid-cols-2"
      >
        <article
          v-for="program in programs.slice(1)"
          :key="program.id"
          class="group overflow-hidden rounded-[1.7rem] border border-gray-200 bg-white transition duration-300 hover:-translate-y-2 hover:border-transparent hover:shadow-2xl"
        >
          <!-- Image -->
          <div
            class="relative h-[300px] overflow-hidden"
          >
            <img
              :src="program.image"
              :alt="program.title"
              class="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />

            <div
              class="absolute inset-0 bg-linear-to-t from-black/60 via-black/5 to-transparent"
            ></div>

            <!-- Year -->
            <div
              class="absolute right-5 top-5"
            >
              <span
                class="rounded-full bg-black/70 px-4 py-2 font-display text-xs font-bold text-white backdrop-blur-md"
              >
                {{ program.year }}
              </span>
            </div>

            <!-- Highlight -->
            <div
              class="absolute bottom-5 left-5"
            >
              <span
                class="rounded-full bg-yen-gold px-4 py-2 font-display text-xs font-bold text-black"
              >
                {{ program.highlight }}
              </span>
            </div>
          </div>

          <!-- Card body -->
          <div class="p-7 sm:p-8">
            <p
              class="font-display text-xs font-bold uppercase tracking-[0.14em] text-yen-red"
            >
              {{ program.category }}
            </p>

            <h3
              class="mt-3 font-display text-2xl font-bold leading-snug text-black"
            >
              {{ program.title }}
            </h3>

            <p
              class="mt-4 font-body text-sm leading-7 text-gray-600"
            >
              {{ program.description }}
            </p>

            <button
              type="button"
              class="mt-6 inline-flex items-center gap-3 font-display text-sm font-bold text-black transition group-hover:text-yen-red"
            >
              Learn More

              <span
                class="flex h-8 w-8 items-center justify-center rounded-full bg-black text-yen-gold transition duration-300 group-hover:bg-yen-red group-hover:text-white"
              >
                →
              </span>
            </button>
          </div>
        </article>
      </div>

      <!-- ==========================================
           PROGRAM CTA
      =========================================== -->

      <div
        class="mt-14 flex flex-col items-start justify-between gap-7 rounded-[1.7rem] bg-[#f7f7f5] p-8 sm:p-10 lg:flex-row lg:items-center"
      >
        <div>
          <p
            class="font-display text-sm font-bold uppercase tracking-[0.16em] text-yen-red"
          >
            Building Businesses
          </p>

          <h3
            class="mt-3 max-w-2xl font-display text-2xl font-bold leading-snug text-black sm:text-3xl"
          >
            Looking for a program to help strengthen
            your business?
          </h3>

          <p
            class="mt-3 max-w-2xl font-body text-sm leading-7 text-gray-600"
          >
            Stay connected with YEN-Liberia for upcoming training,
            mentorship, workshops, conferences and business
            development opportunities.
          </p>
        </div>

        <a
          href="#opportunities"
          class="inline-flex shrink-0 items-center justify-center rounded-full bg-black px-7 py-4 font-display text-sm font-bold text-white transition duration-300 hover:-translate-y-1 hover:bg-yen-red"
        >
          Find Opportunities

          <span class="ml-3 text-yen-gold">
            →
          </span>
        </a>
      </div>
    </div>
  </section>
</template>