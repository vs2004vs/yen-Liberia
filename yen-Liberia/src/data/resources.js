/*
|--------------------------------------------------------------------------
| YEN-LIBERIA RESOURCE LIBRARY
|--------------------------------------------------------------------------
|
| The public Resources page should only contain:
|
| 1. YEN-Liberia resources approved for public release, or
| 2. Verified external resources from trusted institutions.
|
| Do not add sample downloads, fake guides, placeholder URLs,
| or documents that have not been approved for publication.
|
|--------------------------------------------------------------------------
*/


/*
|--------------------------------------------------------------------------
| RESOURCES
|--------------------------------------------------------------------------
*/

export const resources = [
  {
    id: 1,

    slug: "business-plan-guide",

    title: "Business Plan Guide",

    category: "Business Planning",

    type: "Guide",

    format: "PDF",

    audience:
      "Entrepreneurs and small business owners",

    status: "Available",

    featured: true,

    image:
      "/images/resources/business-plan-guide.jpg",

    summary:
      "A practical guide for developing a structured business plan.",

    description:
      "This guide helps entrepreneurs organize their business concept, market, operations and financial planning.",

    contents: [
      "Business overview",
      "Market analysis",
      "Operations planning",
      "Financial planning",
    ],

    /*
    |--------------------------------------------------------------------------
    | YEN-HOSTED DOWNLOAD
    |--------------------------------------------------------------------------
    |
    | Required file location:
    |
    | public/resources/Business_Plan_Guide.pdf
    |
    */

    fileUrl:
      "/resources/Business_Plan_Guide.pdf",

    /*
    |--------------------------------------------------------------------------
    | EXTERNAL RESOURCE
    |--------------------------------------------------------------------------
    |
    | Keep null because this resource is currently configured
    | as a YEN-hosted downloadable PDF.
    |
    */

    externalUrl: null,
  },
]


/*
|--------------------------------------------------------------------------
| RESOURCE CATEGORIES
|--------------------------------------------------------------------------
*/

export const resourceCategories = [
  "All",

  "Business Planning",

  "Business Formalization",

  "Finance & Bookkeeping",

  "Tax & Compliance",

  "Funding Readiness",

  "Marketing & Branding",

  "Digital Business",

  "Market Access",

  "Entrepreneurship",

  "Research & Reports",

  "Policy & Regulation",
]


/*
|--------------------------------------------------------------------------
| RESOURCE TYPES
|--------------------------------------------------------------------------
*/

export const resourceTypes = [
  "All",

  "Guide",

  "Template",

  "Checklist",

  "Toolkit",

  "Report",

  "Policy",

  "Portal",

  "Worksheet",

  "Reference",
]


/*
|--------------------------------------------------------------------------
| GET RESOURCE BY SLUG
|--------------------------------------------------------------------------
|
| Used by:
|
| ResourceDetailView.vue
|
| Example:
|
| /resources/business-plan-guide
|
*/

export const getResourceBySlug = (slug) => {
  return resources.find(
    (resource) =>
      resource.slug === slug,
  )
}