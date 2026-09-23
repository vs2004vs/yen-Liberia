import {
  createRouter,
  createWebHistory,
} from "vue-router"

import {
  applyRouteSeo,
} from "@/utils/seo"


/*
|--------------------------------------------------------------------------
| MOTION PREFERENCE
|--------------------------------------------------------------------------
|
| Router scroll behavior is JavaScript-driven, so the global CSS
| reduced-motion rule does not necessarily control it.
|
| This helper lets anchor scrolling respect the user's OS/browser
| reduced-motion preference.
|
*/

const prefersReducedMotion = () => {
  if (
    typeof window === "undefined" ||
    typeof window.matchMedia !==
      "function"
  ) {
    return false
  }

  return window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches
}


/*
|--------------------------------------------------------------------------
| ROUTER
|--------------------------------------------------------------------------
*/

const router = createRouter({
  history: createWebHistory(
    import.meta.env.BASE_URL,
  ),


  routes: [
    // =========================================
    // HOME
    // =========================================

    {
      path: "/",
      name: "home",

      component: () =>
        import("@/views/HomeView.vue"),

      meta: {
        title: "Home",
      },
    },


    // =========================================
    // ABOUT
    // =========================================

    {
      path: "/about",
      name: "about",

      component: () =>
        import("@/views/AboutView.vue"),

      meta: {
        title: "About Us",
      },
    },


    // =========================================
    // PROGRAMS
    // =========================================

    {
      path: "/programs",
      name: "programs",

      component: () =>
        import(
          "@/views/ProgramsView.vue"
        ),

      meta: {
        title: "Programs",
      },
    },

    {
      path: "/programs/:slug",
      name: "program-detail",

      component: () =>
        import(
          "@/views/ProgramDetailView.vue"
        ),

      meta: {
        title: "Program",
      },
    },


    // =========================================
    // ENTREPRENEURS
    // =========================================

    {
      path: "/entrepreneurs",
      name: "entrepreneurs",

      component: () =>
        import(
          "@/views/EntrepreneursView.vue"
        ),

      meta: {
        title: "Entrepreneurs",
      },
    },

    {
      path: "/entrepreneurs/:slug",
      name: "entrepreneur-detail",

      component: () =>
        import(
          "@/views/EntrepreneurDetailView.vue"
        ),

      meta: {
        title: "Entrepreneur Profile",
      },
    },


    // =========================================
    // OPPORTUNITIES
    // =========================================

    {
      path: "/opportunities",
      name: "opportunities",

      component: () =>
        import(
          "@/views/OpportunitiesView.vue"
        ),

      meta: {
        title: "Opportunities",
      },
    },

    {
      path: "/opportunities/:slug",
      name: "opportunity-detail",

      component: () =>
        import(
          "@/views/OpportunityDetailView.vue"
        ),

      meta: {
        title: "Opportunity",
      },
    },


    // =========================================
    // EVENTS
    // =========================================

    {
      path: "/events",
      name: "events",

      component: () =>
        import(
          "@/views/EventsView.vue"
        ),

      meta: {
        title: "Events",
      },
    },

    {
      path: "/events/:slug",
      name: "event-detail",

      component: () =>
        import(
          "@/views/EventDetailView.vue"
        ),

      meta: {
        title: "Event",
      },
    },


    // =========================================
    // RESOURCES
    // =========================================

    {
      path: "/resources",
      name: "resources",

      component: () =>
        import(
          "@/views/ResourcesView.vue"
        ),

      meta: {
        title: "Resources",
      },
    },

    {
      path: "/resources/:slug",
      name: "resource-detail",

      component: () =>
        import(
          "@/views/ResourceDetailView.vue"
        ),

      meta: {
        title: "Resource",
      },
    },


    // =========================================
    // NEWS
    // =========================================

    {
      path: "/news",
      name: "news",

      component: () =>
        import(
          "@/views/NewsView.vue"
        ),

      meta: {
        title: "News & Insights",
      },
    },

    {
      path: "/news/:slug",
      name: "news-detail",

      component: () =>
        import(
          "@/views/NewsDetailView.vue"
        ),

      meta: {
        title: "News Article",
      },
    },


    // =========================================
    // PARTNERS
    // =========================================

    {
      path: "/partners",
      name: "partners",

      component: () =>
        import(
          "@/views/PartnersView.vue"
        ),

      meta: {
        title: "Partners",
      },
    },


    // =========================================
    // CONTACT
    // =========================================

    {
      path: "/contact",
      name: "contact",

      component: () =>
        import(
          "@/views/ContactView.vue"
        ),

      meta: {
        title: "Contact Us",
      },
    },


    // =========================================
    // JOIN YEN
    // =========================================

    {
      path: "/join",
      name: "join",

      component: () =>
        import(
          "@/views/JoinView.vue"
        ),

      meta: {
        title:
          "Join YEN-Liberia",
      },
    },


    // =========================================
    // 404
    // MUST ALWAYS REMAIN LAST
    // =========================================

    {
      path: "/:pathMatch(.*)*",
      name: "not-found",

      component: () =>
        import(
          "@/views/NotFoundView.vue"
        ),

      meta: {
        title: "Page Not Found",
      },
    },
  ],


  /*
  |--------------------------------------------------------------------------
  | SCROLL BEHAVIOR
  |--------------------------------------------------------------------------
  */

  scrollBehavior(
    to,
    _from,
    savedPosition,
  ) {
    /*
      Browser Back / Forward

      Restore the position the visitor was
      previously viewing.
    */

    if (savedPosition) {
      return savedPosition
    }


    /*
      Hash navigation

      Examples:

      /#newsletter
      /partners#partnership-form

      The top offset prevents the sticky navbar
      from covering the destination.
    */

    if (to.hash) {
      return {
        el: to.hash,

        top: 100,

        behavior:
          prefersReducedMotion()
            ? "auto"
            : "smooth",
      }
    }


    /*
      Normal navigation

      Start every newly opened page from the top.

      We intentionally do NOT use smooth scrolling
      here because this is a new route rather than
      movement within the same page.
    */

    return {
      top: 0,
      left: 0,
    }
  },
})


/*
|--------------------------------------------------------------------------
| DOCUMENT TITLE
|--------------------------------------------------------------------------
|
| Static routes use their route meta title.
|
| Detail views can still replace this generic title with their
| specific program/article/event/resource name after loading.
|
*/

router.afterEach(
  (
    to,
    _from,
    failure,
  ) => {
    /*
      Do not change the browser title if navigation
      did not complete successfully.
    */

    if (failure) {
      return
    }


    const siteName =
      "Youth Entrepreneurs Network–Liberia"


    const pageTitle =
      typeof to.meta.title ===
      "string"
        ? to.meta.title
        : ""


    document.title =
      pageTitle
        ? `${pageTitle} | ${siteName}`
        : siteName
  },
)

router.afterEach(
  (
    to,
    _from,
    failure,
  ) => {
    if (failure) {
      return
    }

    applyRouteSeo(to)
  },
)

export default router