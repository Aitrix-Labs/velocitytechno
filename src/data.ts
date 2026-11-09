import { asset } from './asset'

export const brand = {
  name: 'VelocityTechno',
  short: 'velocitytechno',
  tagline: 'Reliable AI for the world’s most important decisions',
}

export const megaMenus = {
  Products: {
    columns: [
      {
        label: 'Build AI',
        links: [
          { to: '/products/data-engine', label: 'Data Engine' },
          { to: '/products/genai', label: 'For Generative AI' },
          { to: '/products/donovan', label: 'For Physical AI' },
          { to: '/solutions/public-sector', label: 'For Government' },
          { to: '/solutions/enterprise', label: 'For Automotive' },
          { to: '/products/genai', label: 'RL Environments' },
        ],
      },
      {
        label: 'Apply AI',
        links: [
          { to: '/products/genai', label: 'GenAI Portfolio' },
          { to: '/products/donovan', label: 'Donovan' },
        ],
      },
      {
        label: 'Evaluate AI',
        links: [
          { to: '/products/genai', label: 'For Model Developers' },
          { to: '/solutions/public-sector', label: 'For Public Sector' },
          { to: '/solutions/enterprise', label: 'For Enterprise' },
        ],
      },
    ],
    feature: {
      image: asset('images/cases/meta.jpg'),
      title: 'Human expertise at the frontier',
      to: '/products/data-engine',
    },
  },
  Solutions: {
    columns: [
      {
        label: 'By Industry',
        links: [
          { to: '/solutions/enterprise', label: 'Enterprise' },
          { to: '/solutions/healthcare', label: 'Healthcare' },
          { to: '/solutions/national-security', label: 'National Security' },
          { to: '/solutions/public-sector', label: 'Public Sector' },
        ],
      },
      {
        label: 'By Need',
        links: [
          { to: '/products/data-engine', label: 'Training Data' },
          { to: '/products/genai', label: 'Evaluation' },
          { to: '/products/donovan', label: 'Mission AI' },
        ],
      },
    ],
    feature: {
      image: asset('images/cases/defense.jpg'),
      title: 'AI for critical missions',
      to: '/solutions/national-security',
    },
  },
  Research: {
    columns: [
      {
        label: 'Explore',
        links: [
          { to: '/blog', label: 'Research Blog' },
          { to: '/resources', label: 'Leaderboards' },
          { to: '/company/about', label: 'Labs' },
        ],
      },
    ],
    feature: {
      image: asset('images/news-1.jpg'),
      title: 'From the lab to the real world',
      to: '/blog',
    },
  },
  Resources: {
    columns: [
      {
        label: 'Learn',
        links: [
          { to: '/blog', label: 'Blog' },
          { to: '/resources', label: 'Documentation' },
          { to: '/resources', label: 'Guides' },
          { to: '/contact', label: 'Events' },
        ],
      },
      {
        label: 'Company',
        links: [
          { to: '/company/about', label: 'About' },
          { to: '/company/careers', label: 'Careers' },
          { to: '/company/security', label: 'Security' },
        ],
      },
    ],
    feature: {
      image: asset('images/news-2.jpg'),
      title: 'Reliable AI for better healthcare',
      to: '/blog',
    },
  },
} as const

export type MegaKey = keyof typeof megaMenus

export const navKeys = Object.keys(megaMenus) as MegaKey[]

export const hero = {
  title: 'The world’s most important decisions need reliable AI systems.',
  poster: asset('images/fallback.jpg'),
  videos: [
    asset('videos/hero-1.mp4'),
    asset('videos/hero-2.mp4'),
    asset('videos/hero-3.mp4'),
    asset('videos/hero-4.mp4'),
  ],
}

export const stackSection = {
  title: 'Reliable AI has no shortcuts.',
  body: 'VelocityTechno works across the AI stack, from the data that trains the models you rely on, to the systems that put them to work. Humans stay in the loop.',
  video: asset('videos/packed.mp4'),
}

export const applications = {
  label: 'Applications',
  title: 'AI systems that actually work.',
  body: 'Most AI deployments in enterprise and government fail. We find the right use case, build the system, and own the outcome.',
  cta: { to: '/solutions/enterprise', label: 'For Enterprise' },
}

export const dataEngine = {
  label: 'Data',
  title: 'The data powering the world’s best AI.',
  body: 'The models at the frontier run on VelocityTechno data. We source contributors with precision and deliver at the bar frontier AI demands.',
  stat: '90%',
  statLine: 'of the world’s leading generative AI model builders are powered by VelocityTechno.',
  cta: { to: '/products/data-engine', label: 'Explore Data Engine' },
  video: asset('videos/hero-1.mp4'),
}

export const caseStudies = [
  {
    id: 'defense',
    title: 'Turning raw, classified data into actionable intelligence.',
    client: 'CDAO',
    image: asset('images/cases/defense.jpg'),
  },
  {
    id: 'meta',
    title: 'Partnering to accelerate frontier LLM and Generative AI.',
    client: 'Meta',
    image: asset('images/cases/meta.jpg'),
  },
  {
    id: 'health',
    title: 'Reducing physician cognitive load by turning complex patient records into clinical intelligence.',
    client: 'Mayo Clinic',
    image: asset('images/cases/health.jpg'),
  },
  {
    id: 'media',
    title: 'Powering an interactive AI experience that brings a century of journalism to life.',
    client: 'Time',
    image: asset('images/cases/media.jpg'),
  },
  {
    id: 'energy',
    title: 'Accelerating enterprise AI adoption across global energy operations.',
    client: 'British Petroleum',
    image: asset('images/cases/energy.jpg'),
  },
  {
    id: 'robotics',
    title: 'Fuelling the next generation of robotic foundation models with real-world training data.',
    client: 'Physical Intelligence',
    image: asset('images/cases/robot.jpg'),
  },
]

export const industries = [
  { name: 'Artificial Intelligence', image: asset('images/industries/ai.jpg') },
  { name: 'Real Research', image: asset('images/industries/ai.jpg') },
  { name: 'Life Science', image: asset('images/industries/medicine.jpg') },
  { name: 'Medicine', image: asset('images/industries/medicine.jpg') },
  { name: 'Energy', image: asset('images/industries/energy.jpg') },
  { name: 'Infrastructure', image: asset('images/industries/logistics.jpg') },
  { name: 'Sovereignty', image: asset('images/industries/defense.jpg') },
  { name: 'Robotics', image: asset('images/industries/robot.jpg') },
  { name: 'Defense', image: asset('images/industries/defense.jpg') },
  { name: 'Operations', image: asset('images/industries/logistics.jpg') },
  { name: 'Healthcare', image: asset('images/industries/medicine.jpg') },
  { name: 'Autonomy', image: asset('images/industries/robot.jpg') },
  { name: 'Logistics', image: asset('images/industries/logistics.jpg') },
]

export const benchmarks = {
  title: 'We set the benchmark for what’s possible with AI',
  items: [
    {
      title: '10 years powering the world’s biggest AI breakthroughs.',
      body: 'Since 2016, we’ve been at the forefront — from autonomous vehicles to frontier models solving the world’s hardest problems.',
      image: asset('images/cases/defense.jpg'),
      to: '/company/about',
    },
    {
      title: 'The standard every frontier model is measured against.',
      body: 'Our leaderboards run private benchmarks for the most ambitious AI companies to improve model capabilities.',
      image: asset('images/news-1.jpg'),
      to: '/products/genai',
    },
    {
      title: 'Behind the model. Behind the mission. Behind it all.',
      body: 'Only VelocityTechno has the frontier research, world’s best data, and deployment experience to build AI that works in the real world.',
      image: asset('images/cases/meta.jpg'),
      to: '/solutions/enterprise',
    },
  ],
}

export const news = {
  eyebrow: 'From the Lab to the real world. The latest from VelocityTechno.',
  items: [
    {
      title: 'Introducing VelocityTechno Labs',
      category: 'Company',
      image: asset('images/news-1.jpg'),
      to: '/blog',
    },
    {
      title: 'Mayo Clinic + VelocityTechno: Reliable AI for Better Healthcare',
      category: 'Healthcare',
      image: asset('images/news-2.jpg'),
      to: '/blog',
    },
    {
      title: 'How enterprises deploy AI that actually works (hint: it’s evals)',
      category: 'Company',
      image: asset('images/news-3.jpg'),
      to: '/blog',
    },
    {
      title: 'The Next Phase of AI Policy: Governance, Implementation, and Leadership',
      category: 'Public Sector',
      image: asset('images/news-4.jpg'),
      to: '/blog',
    },
  ],
}

export const ctaBand = {
  title: 'Our legacy, your success.',
  body: 'Book a demo today and see how VelocityTechno can build reliable AI for your organization.',
  cta: { to: '/contact', label: 'Book a Demo' },
}

export const footerColumns = [
  {
    title: 'Products',
    links: [
      { to: '/products/data-engine', label: 'Data Engine' },
      { to: '/products/genai', label: 'GenAI Portfolio' },
      { to: '/products/donovan', label: 'Donovan' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { to: '/solutions/enterprise', label: 'Enterprise' },
      { to: '/solutions/healthcare', label: 'Healthcare' },
      { to: '/solutions/national-security', label: 'National Security' },
      { to: '/solutions/public-sector', label: 'US Public Sector' },
    ],
  },
  {
    title: 'Company',
    links: [
      { to: '/company/about', label: 'About' },
      { to: '/company/careers', label: 'Careers' },
      { to: '/company/security', label: 'Security' },
      { to: '/terms', label: 'Terms' },
      { to: '/privacy', label: 'Privacy' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { to: '/blog', label: 'Blog' },
      { to: '/contact', label: 'Contact Us' },
      { to: '/resources', label: 'Documentation' },
    ],
  },
  {
    title: 'Guides',
    links: [
      { to: '/resources', label: 'Data Labeling' },
      { to: '/resources', label: 'ML Model Training' },
      { to: '/resources', label: 'Large Language Models' },
      { to: '/resources', label: 'Computer Vision' },
    ],
  },
]

export const products = [
  {
    slug: 'data-engine',
    title: 'Data Engine',
    summary: 'High-quality training and evaluation data for frontier models.',
    body: 'VelocityTechno Data Engine sources expert contributors, enforces rigorous QA, and delivers datasets that meet the bar of the world’s leading AI labs.',
  },
  {
    slug: 'genai',
    title: 'GenAI Portfolio',
    summary: 'Evaluate, improve, and deploy generative AI with confidence.',
    body: 'From private leaderboards to production evals, GenAI Portfolio helps enterprises measure model quality and ship reliable AI systems.',
  },
  {
    slug: 'donovan',
    title: 'Donovan',
    summary: 'Mission-ready AI for national security and public sector.',
    body: 'Donovan turns classified and sensitive data into actionable intelligence with human-accountable workflows built for critical missions.',
  },
]

export const solutions = [
  {
    slug: 'enterprise',
    title: 'Enterprise',
    summary: 'AI systems that deliver measurable business outcomes.',
    body: 'We partner with enterprises to identify high-value use cases, build production systems, and own the outcome from pilot to scale.',
  },
  {
    slug: 'healthcare',
    title: 'Healthcare',
    summary: 'Clinical intelligence that reduces cognitive load.',
    body: 'From patient records to decision support, VelocityTechno helps health systems deploy reliable AI with rigorous evaluation.',
  },
  {
    slug: 'national-security',
    title: 'National Security',
    summary: 'Trusted AI for the most consequential missions.',
    body: 'Secure data pipelines, expert labeling, and mission applications designed for defense and intelligence organizations.',
  },
  {
    slug: 'public-sector',
    title: 'Public Sector',
    summary: 'Responsible AI for government at every level.',
    body: 'Policy-aware deployments, evaluation frameworks, and operational AI that meets the standards of public institutions.',
  },
]
