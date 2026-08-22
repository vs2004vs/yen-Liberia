export const opportunities = [
  {
    id: 1,
    slug: "youth-business-growth-fund",
    title: "Youth Business Growth Fund",
    organization: "Entrepreneur Support Program",
    category: "Funding",
    location: "Liberia",
    format: "National",
    deadline: "To be announced",
    deadlineDate: null,
    status: "Coming Soon",
    featured: true,
    image: "/images/hero/hero-1.jpg",

    summary:
      "Funding support designed to help youth-led businesses strengthen operations, expand market reach and prepare for sustainable growth.",

    description:
      "The Youth Business Growth Fund is a sample funding opportunity used to demonstrate how grants and financing opportunities will appear on the YEN-Liberia platform.",

    eligibility: [
      "Young entrepreneurs operating in Liberia",
      "Youth-led or youth-owned enterprises",
      "Businesses with a clear growth plan",
      "Applicants able to provide basic business information",
    ],

    benefits: [
      "Potential business financing",
      "Business development support",
      "Growth planning assistance",
      "Access to entrepreneurship networks",
    ],

    requirements: [
      "Completed application form",
      "Business profile",
      "Short description of funding need",
      "Basic growth plan",
    ],

    applicationUrl: null,
  },

  {
    id: 2,
    slug: "digital-business-skills-training",
    title: "Digital Business Skills Training",
    organization: "YEN-Liberia",
    category: "Training",
    location: "Monrovia, Liberia",
    format: "In Person",
    deadline: "Registration opening soon",
    deadlineDate: null,
    status: "Coming Soon",
    featured: false,
    image: "/images/hero/hero-2.jpg",

    summary:
      "Practical digital training covering branding, online marketing, productivity tools and strategies for reaching customers online.",

    description:
      "This sample training opportunity demonstrates how YEN-Liberia will publish learning opportunities for entrepreneurs who want to improve their digital capabilities.",

    eligibility: [
      "Young entrepreneurs",
      "Small business owners",
      "Early-stage founders",
      "Applicants interested in digital business growth",
    ],

    benefits: [
      "Hands-on digital training",
      "Marketing and branding skills",
      "Digital productivity tools",
      "Networking with other entrepreneurs",
    ],

    requirements: [
      "Online registration",
      "Basic business information",
      "Commitment to attend the training",
    ],

    applicationUrl: null,
  },

  {
    id: 3,
    slug: "young-entrepreneurs-fellowship",
    title: "Young Entrepreneurs Fellowship",
    organization: "Entrepreneurship Partner",
    category: "Fellowship",
    location: "Africa",
    format: "Hybrid",
    deadline: "Applications opening soon",
    deadlineDate: null,
    status: "Coming Soon",
    featured: false,
    image: "/images/hero/hero-3.jpg",

    summary:
      "A fellowship designed to connect emerging entrepreneurs with mentorship, structured learning and a broader African peer network.",

    description:
      "This sample fellowship shows how international and regional entrepreneurship opportunities can be listed and shared through the YEN platform.",

    eligibility: [
      "Young African entrepreneurs",
      "Founders or emerging business leaders",
      "Applicants interested in mentorship and networking",
    ],

    benefits: [
      "Mentorship",
      "Business-learning sessions",
      "Peer networking",
      "Regional exposure",
    ],

    requirements: [
      "Application form",
      "Entrepreneur profile",
      "Motivation statement",
    ],

    applicationUrl: null,
  },

  {
    id: 4,
    slug: "liberia-startup-pitch-competition",
    title: "Liberia Startup Pitch Competition",
    organization: "YEN-Liberia",
    category: "Competition",
    location: "Liberia",
    format: "In Person",
    deadline: "Coming soon",
    deadlineDate: null,
    status: "Coming Soon",
    featured: false,
    image: "/images/hero/hero-4.jpg",

    summary:
      "An opportunity for young founders to pitch their businesses, receive expert feedback and compete for business-development support.",

    description:
      "The startup pitch competition is sample content demonstrating how competitive opportunities can be promoted and managed through the YEN-Liberia platform.",

    eligibility: [
      "Liberian founders",
      "Early-stage businesses",
      "Youth-led startups",
      "Businesses with a pitch-ready idea or product",
    ],

    benefits: [
      "Pitch exposure",
      "Expert feedback",
      "Networking",
      "Potential business support",
    ],

    requirements: [
      "Business summary",
      "Pitch deck",
      "Founder profile",
      "Application form",
    ],

    applicationUrl: null,
  },

  {
    id: 5,
    slug: "entrepreneur-networking-forum",
    title: "Entrepreneur Networking Forum",
    organization: "YEN-Liberia",
    category: "Events",
    location: "Monrovia, Liberia",
    format: "In Person",
    deadline: "Event date coming soon",
    deadlineDate: null,
    status: "Coming Soon",
    featured: false,
    image: "/images/hero/hero-1.jpg",

    summary:
      "A networking event connecting entrepreneurs with founders, business leaders, institutions, mentors and ecosystem partners.",

    description:
      "This sample event demonstrates how YEN-Liberia can promote networking opportunities and eventually support event registration directly through the platform.",

    eligibility: [
      "Entrepreneurs",
      "Business owners",
      "Mentors",
      "Investors",
      "Entrepreneurship ecosystem organizations",
    ],

    benefits: [
      "Business networking",
      "Peer connections",
      "Institutional engagement",
      "Opportunity discovery",
    ],

    requirements: [
      "Event registration",
    ],

    applicationUrl: null,
  },

  {
    id: 6,
    slug: "women-entrepreneurs-capacity-program",
    title: "Women Entrepreneurs Capacity Program",
    organization: "YEN-Liberia & Partners",
    category: "Training",
    location: "Liberia",
    format: "Hybrid",
    deadline: "To be announced",
    deadlineDate: null,
    status: "Coming Soon",
    featured: false,
    image: "/images/hero/hero-2.jpg",

    summary:
      "Capacity-building support designed to help women-led enterprises improve business systems, digital skills and market readiness.",

    description:
      "This sample opportunity represents the kind of inclusive entrepreneurship programming YEN-Liberia can publish for women founders and women-led businesses.",

    eligibility: [
      "Women entrepreneurs",
      "Women-led enterprises",
      "Early-stage and growing businesses",
    ],

    benefits: [
      "Business-development training",
      "Digital skills",
      "Market-readiness support",
      "Entrepreneur networking",
    ],

    requirements: [
      "Application form",
      "Business information",
      "Commitment to participate",
    ],

    applicationUrl: null,
  },
]

export const opportunityCategories = [
  "All",
  "Funding",
  "Training",
  "Fellowship",
  "Competition",
  "Events",
]

export const getOpportunityBySlug = (slug) => {
  return opportunities.find(
    (opportunity) => opportunity.slug === slug,
  )
}