import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/HomeView.vue"),
      meta: {
        title: "Home",
      },
    },

    {
      path: "/about",
      name: "about",
      component: () => import("@/views/AboutView.vue"),
      meta: {
        title: "About Us",
      },
    },

    {
      path: "/programs",
      name: "programs",
      component: () => import("@/views/ProgramsView.vue"),
      meta: {
        title: "Programs",
      },
    },

    {
      path: "/programs/:slug",
      name: "program-detail",
      component: () =>
        import("@/views/ProgramDetailView.vue"),
      meta: {
        title: "Program",
      },
    },

    {
  path: "/opportunities",
  name: "opportunities",
  component: () =>
    import("@/views/OpportunitiesView.vue"),
  meta: {
    title: "Opportunities",
  },
},

{
  path: "/opportunities/:slug",
  name: "opportunity-detail",
  component: () =>
    import("@/views/OpportunityDetailView.vue"),
  meta: {
    title: "Opportunity",
  },
},

{
  path: "/entrepreneurs",
  name: "entrepreneurs",
  component: () =>
    import("@/views/EntrepreneursView.vue"),
  meta: {
    title: "Entrepreneurs",
  },
},

{
  path: "/entrepreneurs/:slug",
  name: "entrepreneur-detail",
  component: () =>
    import("@/views/EntrepreneurDetailView.vue"),
  meta: {
    title: "Entrepreneur Profile",
  },
},

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
    import("@/views/EventDetailView.vue"),
  meta: {
    title: "Event",
  },
},

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
    import("@/views/NewsDetailView.vue"),
  meta: {
    title: "News Article",
  },
},

{
  path: "/partners",
  name: "partners",
  component: () =>
    import("@/views/PartnersView.vue"),
  meta: {
    title: "Partners",
  },
},
  ],

  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
        top: 100,
      }
    }

    return {
      top: 0,
      behavior: "smooth",
    }
  },
})

router.afterEach((to) => {
  const siteName =
    "Youth Entrepreneurs Network–Liberia"

  document.title = to.meta.title
    ? `${to.meta.title} | ${siteName}`
    : siteName
})

export default router