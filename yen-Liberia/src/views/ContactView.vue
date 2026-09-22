<script setup>
import { ref } from "vue"

/*
|--------------------------------------------------------------------------
| CONTACT FORM
|--------------------------------------------------------------------------
*/

const form = ref({
  name: "",
  email: "",
  phone: "",
  organization: "",
  inquiryType: "",
  subject: "",
  message: "",
  consent: false,
})

const formError = ref("")
const formMessage = ref("")

const inquiryTypes = [
  "General Inquiry",
  "Membership",
  "Programs",
  "Opportunities",
  "Entrepreneur Directory",
  "Events",
  "Partnership",
  "Media & Press",
  "Resources",
  "Other",
]


/*
|--------------------------------------------------------------------------
| FORM SUBMISSION
|--------------------------------------------------------------------------
*/

const submitContactForm = () => {
  formError.value = ""
  formMessage.value = ""

  const name = form.value.name.trim()
  const email = form.value.email.trim()
  const message = form.value.message.trim()

  if (
    !name ||
    !email ||
    !form.value.inquiryType ||
    !message
  ) {
    formError.value =
      "Please complete your name, email, inquiry type and message."

    return
  }

  const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailPattern.test(email)) {
    formError.value =
      "Please enter a valid email address."

    return
  }

  if (!form.value.consent) {
    formError.value =
      "Please confirm that YEN-Liberia may contact you regarding your inquiry."

    return
  }

  /*
    FRONTEND ONLY FOR NOW

    Later:

    POST /api/contact-inquiries

    Do not claim the message has actually
    been delivered until the backend confirms it.
  */

  formMessage.value =
    "The contact form is ready. Message delivery will activate when the YEN-Liberia backend is connected."
}
</script>


<template>
  <main class="w-full overflow-hidden">

    <!-- ========================================
         HERO
    ========================================= -->

    <section
      class="relative isolate min-h-[540px] overflow-hidden sm:min-h-[560px] lg:min-h-[580px]"
    >
      <!-- Background -->

      <img
        src="/images/hero/hero-2.jpg"
        alt="Contact Youth Entrepreneurs Network Liberia"
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
        <div class="w-full max-w-4xl">

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

            <span class="text-white/25">
              /
            </span>

            <span class="text-yen-gold">
              Contact
            </span>
          </div>

          <!-- Label -->

          <p
            class="font-display text-[10px] font-extrabold uppercase tracking-[0.2em] text-yen-gold sm:text-xs"
          >
            Get in Touch
          </p>

          <!-- Heading -->

          <h1
            class="mt-5 max-w-4xl font-display text-[40px] font-extrabold leading-[1.05] tracking-tight text-white min-[390px]:text-[44px] sm:text-6xl lg:text-7xl"
          >
            Let's connect and

            <span class="text-yen-gold">
              build together.
            </span>
          </h1>

          <!-- Description -->

          <p
            class="mt-6 max-w-2xl font-body text-sm leading-7 text-white/80 sm:mt-7 sm:text-lg sm:leading-8"
          >
            Whether you're an entrepreneur, partner, institution,
            supporter or someone interested in YEN-Liberia,
            we'd like to hear from you.
          </p>

          <!-- CTA -->

          <a
            href="#contact-form"
            class="mt-8 inline-flex w-full items-center justify-center rounded-full bg-yen-gold px-7 py-4 font-display text-sm font-bold text-black transition duration-300 hover:-translate-y-1 hover:bg-white sm:mt-9 sm:w-auto"
          >
            Send Us a Message

            <span
              class="ml-3"
              aria-hidden="true"
            >
              →
            </span>
          </a>
        </div>
      </div>

      <!-- Accent -->

      <div
        class="absolute bottom-0 left-0 z-20 h-1 w-full bg-linear-to-r from-yen-red via-yen-gold to-yen-red"
      ></div>
    </section>


    <!-- ========================================
         INTRO + CONTACT OPTIONS
    ========================================= -->

    <section class="bg-white">
      <div
        class="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24"
      >
        <div
          class="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14"
        >
          <!-- Left -->

          <div>
            <p
              class="font-display text-[10px] font-extrabold uppercase tracking-[0.18em] text-yen-red sm:text-xs"
            >
              Contact YEN-Liberia
            </p>

            <h2
              class="mt-4 font-display text-3xl font-extrabold leading-tight text-black min-[390px]:text-4xl sm:text-5xl"
            >
              Start a

              <span class="text-yen-red">
                conversation.
              </span>
            </h2>

            <p
              class="mt-6 font-body text-sm leading-8 text-gray-600 sm:text-base"
            >
              Contact us about membership, entrepreneurship
              programs, opportunities, partnerships, events,
              media requests and other YEN-Liberia activities.
            </p>

            <p
              class="mt-5 font-body text-sm leading-8 text-gray-600 sm:text-base"
            >
              As the platform develops, inquiries will be managed
              through the YEN-Liberia administration system so
              requests can be reviewed, routed and followed up
              efficiently.
            </p>
          </div>


          <!-- ==================================
               CONTACT OPTIONS
          =================================== -->

          <div
            class="grid gap-5 sm:grid-cols-2"
          >
            <!-- Location -->

            <article
              class="rounded-[1.5rem] bg-[#f7f7f5] p-6 sm:rounded-[1.6rem] sm:p-7"
            >
              <div
                class="flex h-12 w-12 items-center justify-center rounded-xl bg-yen-gold"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 21s7-5.333 7-12a7 7 0 1 0-14 0c0 6.667 7 12 7 12Zm0-9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                  />
                </svg>
              </div>

              <p
                class="mt-6 font-display text-[10px] font-extrabold uppercase tracking-[0.16em] text-yen-red"
              >
                Location
              </p>

              <h3
                class="mt-2 font-display text-xl font-bold text-black"
              >
                Monrovia, Liberia
              </h3>

              <p
                class="mt-3 font-body text-sm leading-7 text-gray-600"
              >
                YEN-Liberia operates in Liberia. The full official
                office address will be published once confirmed.
              </p>
            </article>


            <!-- General inquiry -->

            <a
              href="#contact-form"
              class="group rounded-[1.5rem] bg-black p-6 transition duration-300 hover:-translate-y-1 sm:rounded-[1.6rem] sm:p-7"
            >
              <div
                class="flex h-12 w-12 items-center justify-center rounded-xl bg-yen-red"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 6l9 6 9-6M4 5h16a1 1 0 0 1 1 1v12H3V6a1 1 0 0 1 1-1Z"
                  />
                </svg>
              </div>

              <p
                class="mt-6 font-display text-[10px] font-extrabold uppercase tracking-[0.16em] text-yen-gold"
              >
                General Inquiries
              </p>

              <h3
                class="mt-2 font-display text-xl font-bold text-white transition group-hover:text-yen-gold"
              >
                Send YEN a Message
              </h3>

              <p
                class="mt-3 font-body text-sm leading-7 text-white/55"
              >
                Use the contact form below for general questions,
                programs, media requests and other inquiries.
              </p>

              <p
                class="mt-5 font-display text-xs font-bold text-yen-gold"
              >
                Contact form →
              </p>
            </a>


            <!-- Membership -->

            <RouterLink
              :to="{ name: 'join' }"
              class="group rounded-[1.5rem] bg-black p-6 transition duration-300 hover:-translate-y-1 sm:rounded-[1.6rem] sm:p-7"
            >
              <div
                class="flex h-12 w-12 items-center justify-center rounded-xl bg-yen-gold"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m7-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm8-1v6m3-3h-6"
                  />
                </svg>
              </div>

              <p
                class="mt-6 font-display text-[10px] font-extrabold uppercase tracking-[0.16em] text-yen-gold"
              >
                Membership
              </p>

              <h3
                class="mt-2 font-display text-xl font-bold text-white transition group-hover:text-yen-gold"
              >
                Join YEN-Liberia
              </h3>

              <p
                class="mt-3 font-body text-sm leading-7 text-white/55"
              >
                Interested in becoming part of the entrepreneur
                network? Start with the membership page.
              </p>

              <p
                class="mt-5 font-display text-xs font-bold text-yen-gold"
              >
                Membership →
              </p>
            </RouterLink>


            <!-- Partnership -->

            <RouterLink
              :to="{ name: 'partners' }"
              class="group rounded-[1.5rem] bg-yen-gold p-6 transition duration-300 hover:-translate-y-1 sm:rounded-[1.6rem] sm:p-7"
            >
              <div
                class="flex h-12 w-12 items-center justify-center rounded-xl bg-black"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-yen-gold"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 20h5v-2a4 4 0 0 0-5-3.87M9 20H2v-2a4 4 0 0 1 5-3.87m10-4.13a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM7 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm5 10v-2a4 4 0 0 0-8 0v2h8Z"
                  />
                </svg>
              </div>

              <p
                class="mt-6 font-display text-[10px] font-extrabold uppercase tracking-[0.16em] text-yen-red"
              >
                Partnerships
              </p>

              <h3
                class="mt-2 font-display text-xl font-bold text-black"
              >
                Collaborate With YEN
              </h3>

              <p
                class="mt-3 font-body text-sm leading-7 text-black/65"
              >
                Organizations interested in collaboration can
                use our dedicated partnership inquiry process.
              </p>

              <p
                class="mt-5 font-display text-xs font-bold text-black"
              >
                Partnership page →
              </p>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>


    <!-- ========================================
         CONTACT FORM
    ========================================= -->

    <section
      id="contact-form"
      class="scroll-mt-28 bg-[#f7f7f5]"
    >
      <div
        class="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-6 lg:grid-cols-[0.75fr_1.25fr] lg:gap-14 lg:px-8 lg:py-28"
      >
        <!-- ==================================
             FORM INTRO
        =================================== -->

        <div>
          <p
            class="font-display text-[10px] font-extrabold uppercase tracking-[0.18em] text-yen-red sm:text-xs"
          >
            Send a Message
          </p>

          <h2
            class="mt-4 font-display text-3xl font-extrabold leading-tight text-black min-[390px]:text-4xl sm:text-5xl"
          >
            How can we

            <span class="text-yen-red">
              help?
            </span>
          </h2>

          <p
            class="mt-6 font-body text-sm leading-8 text-gray-600 sm:text-base"
          >
            Select the reason for contacting us so your inquiry
            can eventually be routed to the appropriate YEN team
            or administrator.
          </p>


          <!-- Topics -->

          <div
            class="mt-8 rounded-[1.5rem] bg-yen-gold p-6 sm:mt-9 sm:rounded-[1.6rem] sm:p-7"
          >
            <p
              class="font-display text-[10px] font-extrabold uppercase tracking-[0.16em] text-yen-red sm:text-xs"
            >
              You can contact us about
            </p>

            <ul
              class="mt-5 grid gap-3 font-body text-sm leading-7 text-black/70 sm:grid-cols-2 lg:grid-cols-1"
            >
              <li>• Joining YEN-Liberia</li>
              <li>• Programs & training</li>
              <li>• Opportunities</li>
              <li>• Entrepreneur profiles</li>
              <li>• Partnership opportunities</li>
              <li>• Events & activities</li>
              <li>• Media requests</li>
              <li>• Business resources</li>
            </ul>
          </div>
        </div>


        <!-- ==================================
             FORM CARD
        =================================== -->

        <div
          class="rounded-[1.7rem] bg-black p-6 shadow-2xl sm:rounded-[2rem] sm:p-9 lg:p-10"
        >
          <p
            class="font-display text-[10px] font-extrabold uppercase tracking-[0.18em] text-yen-gold sm:text-xs"
          >
            Contact Form
          </p>

          <h3
            class="mt-3 font-display text-2xl font-bold leading-tight text-white sm:text-3xl"
          >
            Send YEN-Liberia a message.
          </h3>

          <p
            id="contact-form-instructions"
            class="mt-3 font-body text-xs leading-6 text-white/45"
          >
            Fields marked * are required.
          </p>


          <!-- =================================
               FORM
          ================================== -->

          <form
            class="mt-8 space-y-5"
            aria-describedby="contact-form-instructions"
            @submit.prevent="submitContactForm"
          >
            <!-- Name + Email -->

            <div
              class="grid gap-5 sm:grid-cols-2"
            >
              <!-- Name -->

              <div>
                <label
                  for="contact-name"
                  class="font-display text-xs font-bold text-white"
                >
                  Full Name *
                </label>

                <input
                  id="contact-name"
                  v-model="form.name"
                  name="name"
                  type="text"
                  autocomplete="name"
                  required
                  placeholder="Your full name"
                  class="mt-2 w-full rounded-xl border border-white/15 bg-white/10 px-4 py-4 font-display text-sm text-white outline-none transition placeholder:text-white/30 focus:border-yen-gold focus:bg-white/15 sm:px-5"
                />
              </div>


              <!-- Email -->

              <div>
                <label
                  for="contact-email"
                  class="font-display text-xs font-bold text-white"
                >
                  Email Address *
                </label>

                <input
                  id="contact-email"
                  v-model="form.email"
                  name="email"
                  type="email"
                  inputmode="email"
                  autocomplete="email"
                  required
                  placeholder="you@example.com"
                  class="mt-2 w-full rounded-xl border border-white/15 bg-white/10 px-4 py-4 font-display text-sm text-white outline-none transition placeholder:text-white/30 focus:border-yen-gold focus:bg-white/15 sm:px-5"
                />
              </div>
            </div>


            <!-- Phone + Organization -->

            <div
              class="grid gap-5 sm:grid-cols-2"
            >
              <!-- Phone -->

              <div>
                <label
                  for="contact-phone"
                  class="font-display text-xs font-bold text-white"
                >
                  Phone
                </label>

                <input
                  id="contact-phone"
                  v-model="form.phone"
                  name="phone"
                  type="tel"
                  inputmode="tel"
                  autocomplete="tel"
                  placeholder="+231..."
                  class="mt-2 w-full rounded-xl border border-white/15 bg-white/10 px-4 py-4 font-display text-sm text-white outline-none transition placeholder:text-white/30 focus:border-yen-gold focus:bg-white/15 sm:px-5"
                />
              </div>


              <!-- Organization -->

              <div>
                <label
                  for="contact-organization"
                  class="font-display text-xs font-bold text-white"
                >
                  Organization / Business
                </label>

                <input
                  id="contact-organization"
                  v-model="form.organization"
                  name="organization"
                  type="text"
                  autocomplete="organization"
                  placeholder="Optional"
                  class="mt-2 w-full rounded-xl border border-white/15 bg-white/10 px-4 py-4 font-display text-sm text-white outline-none transition placeholder:text-white/30 focus:border-yen-gold focus:bg-white/15 sm:px-5"
                />
              </div>
            </div>


            <!-- Inquiry type -->

            <div>
              <label
                for="contact-inquiry"
                class="font-display text-xs font-bold text-white"
              >
                Inquiry Type *
              </label>

              <select
                id="contact-inquiry"
                v-model="form.inquiryType"
                name="inquiryType"
                required
                class="mt-2 w-full rounded-xl border border-white/15 bg-white/10 px-4 py-4 font-display text-sm text-white outline-none transition focus:border-yen-gold focus:bg-white/15 sm:px-5"
              >
                <option
                  value=""
                  class="text-black"
                >
                  Select an inquiry type
                </option>

                <option
                  v-for="type in inquiryTypes"
                  :key="type"
                  :value="type"
                  class="text-black"
                >
                  {{ type }}
                </option>
              </select>
            </div>


            <!-- Subject -->

            <div>
              <label
                for="contact-subject"
                class="font-display text-xs font-bold text-white"
              >
                Subject
              </label>

              <input
                id="contact-subject"
                v-model="form.subject"
                name="subject"
                type="text"
                placeholder="What is your inquiry about?"
                class="mt-2 w-full rounded-xl border border-white/15 bg-white/10 px-4 py-4 font-display text-sm text-white outline-none transition placeholder:text-white/30 focus:border-yen-gold focus:bg-white/15 sm:px-5"
              />
            </div>


            <!-- Message -->

            <div>
              <label
                for="contact-message"
                class="font-display text-xs font-bold text-white"
              >
                Message *
              </label>

              <textarea
                id="contact-message"
                v-model="form.message"
                name="message"
                rows="6"
                required
                placeholder="Tell us how we can help..."
                class="mt-2 w-full resize-y rounded-xl border border-white/15 bg-white/10 px-4 py-4 font-body text-sm leading-7 text-white outline-none transition placeholder:text-white/30 focus:border-yen-gold focus:bg-white/15 sm:px-5"
              ></textarea>
            </div>


            <!-- Consent -->

            <label
              for="contact-consent"
              class="flex cursor-pointer items-start gap-3"
            >
              <input
                id="contact-consent"
                v-model="form.consent"
                name="consent"
                type="checkbox"
                required
                class="mt-1 h-4 w-4 shrink-0 accent-[#fdd131]"
              />

              <span
                class="font-body text-xs leading-6 text-white/50"
              >
                I agree that YEN-Liberia may use the information
                provided to respond to this inquiry. *
              </span>
            </label>


            <!-- Error -->

            <p
              v-if="formError"
              role="alert"
              aria-live="assertive"
              class="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 font-display text-xs font-semibold leading-5 text-red-300"
            >
              {{ formError }}
            </p>


            <!-- Development status -->

            <p
              v-if="formMessage"
              role="status"
              aria-live="polite"
              class="rounded-xl border border-yen-gold/20 bg-yen-gold/10 px-4 py-3 font-body text-xs leading-6 text-yen-gold"
            >
              {{ formMessage }}
            </p>


            <!-- Submit -->

            <button
              type="submit"
              class="flex w-full items-center justify-center rounded-xl bg-yen-gold px-7 py-4 font-display text-sm font-bold text-black transition duration-300 hover:bg-white"
            >
              Send Message

              <span
                class="ml-3"
                aria-hidden="true"
              >
                →
              </span>
            </button>
          </form>
        </div>
      </div>
    </section>


    <!-- ========================================
         PARTNERSHIP CTA
    ========================================= -->

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
                Looking to Collaborate?
              </p>

              <h2
                class="mt-4 font-display text-2xl font-extrabold leading-tight text-black sm:text-4xl"
              >
                Partnership inquiries deserve a dedicated space.
              </h2>

              <p
                class="mt-4 max-w-2xl font-body text-sm leading-7 text-black/65 sm:text-base"
              >
                Organizations interested in funding, technical
                collaboration, market access, events or ecosystem
                development can use our partnership page.
              </p>
            </div>


            <!-- Dedicated route -->

            <RouterLink
              :to="{ name: 'partners' }"
              class="inline-flex w-full items-center justify-center rounded-full bg-black px-7 py-4 font-display text-sm font-bold text-white transition duration-300 hover:-translate-y-1 hover:bg-yen-red sm:w-auto sm:min-w-[220px]"
            >
              Partner With YEN

              <span
                class="ml-3 text-yen-gold"
                aria-hidden="true"
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