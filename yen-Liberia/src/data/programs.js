export const programs = [
  {
    id: 1,
    slug: "msme-clinic-2026",
    title: "2026 MSME Clinic",
    shortTitle: "MSME Clinic",
    category: "Business Development",
    year: "2026",
    status: "Completed",
    date: "February 18–19, 2026",
    location: "Liberia Chamber of Commerce, Monrovia",
    image: "/images/hero/hero-4.jpg",

    summary:
      "A practical two-day business development clinic designed to help youth-led and emerging enterprises strengthen their systems, formalize operations and prepare for growth.",

    description:
      "The 2026 MSME Clinic brought together 100 primarily youth-led and growth-oriented businesses for practical support in areas that directly affect business sustainability and competitiveness.",

    impact: "100",
    impactLabel: "Entrepreneurs",

    focusAreas: [
      "Business Formalization",
      "Financial Management",
      "Bookkeeping",
      "Branding",
      "Marketing",
      "Tax Readiness",
      "Access to Business Support",
    ],

    partners: [
      "UNIDO GROW-2",
      "Liberia Chamber of Commerce",
      "Youth Entrepreneurs Network–Liberia",
      "Young Business Leaders Club",
    ],

    objectives: [
      "Strengthen practical business-management capabilities.",
      "Improve understanding of taxation and financial systems.",
      "Support entrepreneurs in formalizing their businesses.",
      "Connect MSMEs with relevant public and private institutions.",
    ],
  },

  {
    id: 2,
    slug: "female-entrepreneurs-summit-2026",
    title: "Female Entrepreneurs Summit 2026",
    shortTitle: "Female Entrepreneurs Summit",
    category: "Women Entrepreneurship",
    year: "2026",
    status: "Completed",
    date: "August 10–11, 2026",
    location:
      "Ellen Johnson Sirleaf Ministerial Complex, Congo Town",
    image: "/images/hero/hero-1.jpg",

    summary:
      "A national platform bringing women entrepreneurs, business leaders and development partners together around investment, technology, formalization and market access.",

    description:
      "The Female Entrepreneurs Summit 2026 convened more than 200 entrepreneurs, business leaders and development partners to strengthen opportunities for women-owned enterprises in Liberia.",

    impact: "200+",
    impactLabel: "Participants",

    focusAreas: [
      "Women-Owned Enterprises",
      "Access to Finance",
      "Technology",
      "Business Formalization",
      "Market Access",
      "Investment Readiness",
      "Business Linkages",
    ],

    partners: [
  "Youth Entrepreneurs Network–Liberia",
  "UNIDO GROW-2",
  "Liberia Chamber of Commerce",
],

    objectives: [
      "Showcase women-owned enterprises.",
      "Provide practical business support to women entrepreneurs.",
      "Strengthen investment and market readiness.",
      "Create structured business linkages.",
    ],
  },

  {
    id: 3,
    slug: "climate-smart-msme-workshop-2026",
    title: "Climate-Smart MSME Workshop",
    shortTitle: "Climate-Smart MSMEs",
    category: "Climate & Sustainability",
    year: "2026",
    status: "Completed",
    date: "Opened June 30, 2026",
    location: "Liberia Chamber of Commerce, Monrovia",
    image: "/images/hero/hero-3.jpg",

    summary:
      "A four-day capacity-building workshop helping MSMEs understand how climate-smart business practices can strengthen resilience, competitiveness and sustainability.",

    description:
      "The workshop focused on aligning MSME business practices with Liberia's national climate goals while helping entrepreneurs identify practical ways to improve efficiency and sustainability.",

    impact: "4 Days",
    impactLabel: "Capacity Building",

    focusAreas: [
      "Climate-Smart Business",
      "Energy Efficiency",
      "Waste Management",
      "Business Resilience",
      "Responsible Resource Use",
      "Sustainable Enterprise",
    ],

    partners: [
      "Environmental Protection Agency of Liberia",
      "Youth Entrepreneurs Network–Liberia",
      "UNIDO GROW-2",
    ],

    objectives: [
      "Build awareness of Liberia's national climate goals.",
      "Help MSMEs adopt environmentally responsible practices.",
      "Improve business resilience and operational efficiency.",
      "Connect sustainability with enterprise growth.",
    ],
  },

  {
    id: 4,
    slug: "global-entrepreneurship-week-2024",
    title: "Global Entrepreneurship Week 2024",
    shortTitle: "Global Entrepreneurship Week",
    category: "Conference & Networking",
    year: "2024",
    status: "Completed",
    date: "November 2024",
    location: "Monrovia, Liberia",
    image: "/images/hero/hero-2.jpg",

    summary:
      "A two-day entrepreneurship conference bringing young entrepreneurs and youth leaders together to strengthen networks, exchange ideas and explore inclusive business growth.",

    description:
      "YEN-Liberia hosted the entrepreneurship conference with support from Mercy Corps Liberia as part of Global Entrepreneurship Week under a theme focused on shaping the future of youth entrepreneurship.",

    impact: "50+",
    impactLabel: "Participants",

    focusAreas: [
      "Youth Entrepreneurship",
      "Inclusive Growth",
      "Innovation",
      "Networking",
      "Technology",
      "Market Systems",
    ],

    partners: [
      "Youth Entrepreneurs Network–Liberia",
      "Mercy Corps Liberia",
    ],

    objectives: [
      "Bring young entrepreneurs together.",
      "Encourage collaboration and knowledge exchange.",
      "Explore technology and inclusive entrepreneurship.",
      "Strengthen Liberia's youth entrepreneurship network.",
    ],
  },
]

export const getProgramBySlug = (slug) => {
  return programs.find((program) => program.slug === slug)
}