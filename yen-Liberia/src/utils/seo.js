const SITE_NAME =
  "Youth Entrepreneurs Network–Liberia"

const SITE_URL =
  "https://yen-lib.netlify.app"

const DEFAULT_DESCRIPTION =
  "Youth Entrepreneurs Network–Liberia connects, supports and empowers young entrepreneurs through programs, opportunities, resources, partnerships and business development initiatives."

const DEFAULT_IMAGE =
  `${SITE_URL}/images/yen-logo.png`


/*
|--------------------------------------------------------------------------
| ROUTE SEO
|--------------------------------------------------------------------------
*/

const routeSeo = {
  home: {
    title:
      "Youth Entrepreneurs Network–Liberia",
    description:
      "Connecting, supporting and empowering young entrepreneurs to build sustainable businesses and contribute to Liberia's economic transformation.",
  },

  about: {
    title: "About Us",
    description:
      "Learn about Youth Entrepreneurs Network–Liberia, our mission, vision and commitment to supporting young entrepreneurs in Liberia.",
  },

  programs: {
    title: "Programs",
    description:
      "Explore YEN-Liberia programs supporting entrepreneurship, business development, innovation and sustainable enterprise growth.",
  },

  "program-detail": {
    title: "Program",
    description:
      "Learn more about this YEN-Liberia entrepreneurship and business development program.",
  },

  entrepreneurs: {
  title:
    "Entrepreneurs",

  description:
    "Discover entrepreneurs, businesses and enterprise stories connected to Youth Entrepreneurs Network–Liberia.",

  robots:
    "noindex, follow",
},

opportunities: {
  title:
    "Opportunities",

  description:
    "Explore entrepreneurship opportunities, training, funding calls, events and business development opportunities shared by YEN-Liberia.",

  robots:
    "noindex, follow",
},
  events: {
    title: "Events",
    description:
      "Explore YEN-Liberia entrepreneurship events, workshops, summits, networking activities and business development programs.",
  },

  "event-detail": {
    title: "Event",
    description:
      "View information about this YEN-Liberia entrepreneurship event, including its activities, organizers and highlights.",
  },

  resources: {
    title: "Business Resources",
    description:
      "Access business guides, tools, templates, reports and practical entrepreneurship resources from YEN-Liberia.",
  },

  "resource-detail": {
    title: "Resource",
    description:
      "Access this YEN-Liberia business resource and supporting information for entrepreneurs and small business owners.",
  },

  news: {
    title: "News & Insights",
    description:
      "Read entrepreneurship news, YEN-Liberia updates, program stories, business insights and ecosystem developments.",
  },

  "news-detail": {
    title: "News Article",
    description:
      "Read this entrepreneurship news story, update or insight from the YEN-Liberia platform.",
  },

  partners: {
    title: "Partners",
    description:
      "Explore organizations that have collaborated with YEN-Liberia to strengthen entrepreneurship and enterprise development in Liberia.",
  },

  contact: {
    title: "Contact Us",
    description:
      "Contact Youth Entrepreneurs Network–Liberia for inquiries, collaboration, programs, entrepreneurship support and partnerships.",
  },

  join: {
    title: "Join YEN-Liberia",
    description:
      "Connect with Youth Entrepreneurs Network–Liberia and learn how entrepreneurs and ecosystem stakeholders can participate in the network.",
  },

  "not-found": {
    title: "Page Not Found",
    description:
      "The page you requested could not be found on the YEN-Liberia website.",
    robots: "noindex, follow",
  },
}


/*
|--------------------------------------------------------------------------
| CREATE OR UPDATE META TAG
|--------------------------------------------------------------------------
*/

const setMeta = (
  attribute,
  key,
  content,
) => {
  if (!content) {
    return
  }

  let element =
    document.head.querySelector(
      `meta[${attribute}="${key}"]`,
    )

  if (!element) {
    element =
      document.createElement("meta")

    element.setAttribute(
      attribute,
      key,
    )

    document.head.appendChild(
      element,
    )
  }

  element.setAttribute(
    "content",
    content,
  )
}


/*
|--------------------------------------------------------------------------
| CANONICAL URL
|--------------------------------------------------------------------------
*/

const setCanonical = (url) => {
  let canonical =
    document.head.querySelector(
      'link[rel="canonical"]',
    )

  if (!canonical) {
    canonical =
      document.createElement("link")

    canonical.setAttribute(
      "rel",
      "canonical",
    )

    document.head.appendChild(
      canonical,
    )
  }

  canonical.setAttribute(
    "href",
    url,
  )
}


/*
|--------------------------------------------------------------------------
| SET PAGE SEO
|--------------------------------------------------------------------------
|
| Detail views can call this function later with specific
| program, article, event or entrepreneur information.
|
*/

export const setPageSeo = ({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  robots = "index, follow",
  image = DEFAULT_IMAGE,
  type = "website",
}) => {
  const canonicalUrl =
    new URL(
      path,
      SITE_URL,
    ).toString()

  const fullTitle =
    title === SITE_NAME
      ? SITE_NAME
      : `${title} | ${SITE_NAME}`


  /*
  |--------------------------------------------------------------------------
  | DOCUMENT TITLE
  |--------------------------------------------------------------------------
  */

  document.title =
    fullTitle


  /*
  |--------------------------------------------------------------------------
  | STANDARD SEO
  |--------------------------------------------------------------------------
  */

  setMeta(
    "name",
    "description",
    description,
  )

  setMeta(
    "name",
    "robots",
    robots,
  )

  setCanonical(
    canonicalUrl,
  )


  /*
  |--------------------------------------------------------------------------
  | OPEN GRAPH
  |--------------------------------------------------------------------------
  */

  setMeta(
    "property",
    "og:type",
    type,
  )

  setMeta(
    "property",
    "og:site_name",
    SITE_NAME,
  )

  setMeta(
    "property",
    "og:title",
    fullTitle,
  )

  setMeta(
    "property",
    "og:description",
    description,
  )

  setMeta(
    "property",
    "og:url",
    canonicalUrl,
  )

  setMeta(
    "property",
    "og:image",
    image,
  )


  /*
  |--------------------------------------------------------------------------
  | TWITTER / X
  |--------------------------------------------------------------------------
  */

  setMeta(
    "name",
    "twitter:card",
    "summary_large_image",
  )

  setMeta(
    "name",
    "twitter:title",
    fullTitle,
  )

  setMeta(
    "name",
    "twitter:description",
    description,
  )

  setMeta(
    "name",
    "twitter:image",
    image,
  )
}


/*
|--------------------------------------------------------------------------
| APPLY ROUTE SEO
|--------------------------------------------------------------------------
*/

export const applyRouteSeo = (
  route,
) => {
  const config =
    routeSeo[route.name] ?? {
      title: SITE_NAME,

      description:
        DEFAULT_DESCRIPTION,
    }


  setPageSeo({
    ...config,

    path:
      route.path || "/",
  })
}