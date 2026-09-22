import {
  createRouter,
  createWebHistory,
} from "vue-router"

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
        import("@/views/ProgramsView.vue"),

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
        import("@/views/EventsView.vue"),

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
        import("@/views/NewsView.vue"),

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
        import("@/views/JoinView.vue"),

      meta: {
        title: "Join YEN-Liberia",
      },
    },


    // =========================================
    // 404
    // MUST REMAIN LAST
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


  // =========================================
  // SCROLL BEHAVIOR
  // =========================================

  scrollBehavior(
    to,
    from,
    savedPosition,
  ) {
    /*
      Browser back/forward navigation
      restores the user's previous position.
    */
    if (savedPosition) {
      return savedPosition
    }

    /*
      Homepage anchors such as:

      /#newsletter

      remain supported.
    */
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
        top: 100,
      }
    }

    /*
      Normal page navigation starts from
      the top of the page.
    */
    return {
      top: 0,
      left: 0,
      behavior: "smooth",
    }
  },
})


/*
|--------------------------------------------------------------------------
| DOCUMENT TITLE
|--------------------------------------------------------------------------
*/

router.afterEach((to) => {
  const siteName =
    "Youth Entrepreneurs Network–Liberia"

  const pageTitle =
    typeof to.meta.title === "string"
      ? to.meta.title
      : ""

  document.title = pageTitle
    ? `${pageTitle} | ${siteName}`
    : siteName
})


export default router