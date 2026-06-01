export const navLinks = [
  { label: 'Features', href: '/#features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Templates', href: '/#templates' },
];

export const faqData = [
  {
    question: 'How does the AI build my site?',
    answer: 'Simply describe your business in plain English. Our AI analyzes your idea, generates a strategic blueprint, and builds a complete website with pages, sections, and content — all in seconds. You can then customize everything with drag-and-drop.'
  },
  {
    question: 'Can I use my own domain?',
    answer: 'Absolutely! On our Pro plan and above, you can connect a custom domain. Starter plan includes a free subdomain (your-site.fearlesslogic.app).'
  },
  {
    question: 'Do I need technical skills?',
    answer: 'No technical skills required at all. No coding, no design experience, no complicated tools. If you can describe your idea, you can launch a professional website.'
  },
  {
    question: 'Can I switch plans?',
    answer: 'Yes, you can upgrade or downgrade at any time. Upgrading unlocks more features immediately. Downgrading takes effect at your next billing cycle.'
  },
  {
    question: 'What if I don\'t like what the AI built?',
    answer: 'You can regenerate any section, edit content directly, swap templates, or start over with a new description. Your project, your control — no lock-in.'
  },
  {
    question: 'Is my site mobile-friendly?',
    answer: 'Every site built with Fearless Logic AI is fully responsive and looks great on all devices — mobile, tablet, and desktop — right out of the box.'
  },
  {
    question: 'Can I cancel anytime?',
    answer: 'Yes, you can cancel your subscription at any time. Your published sites will remain live until the end of your billing period.'
  },
  {
    question: 'What kind of support do you offer?',
    answer: 'All plans include email support and our AI help bot. Pro and Scale plans include priority support. Scale plans also include a dedicated account manager.'
  }
];

export const pricingPlans = [
  {
    name: 'Starter',
    price: 19,
    annualPrice: 190,
    description: 'Perfect for testing the waters with your first project.',
    popular: false,
    features: [
      '1 project',
      'AI builder',
      'Basic templates',
      'Free hosting',
      'Responsive design',
      'Free subdomain',
      'Email support',
    ],
    cta: 'Get Started',
    ctaLink: '/signup',
  },
  {
    name: 'Pro',
    price: 49,
    annualPrice: 470,
    description: 'For serious entrepreneurs ready to grow their online presence.',
    popular: true,
    features: [
      'Unlimited projects',
      'AI builder',
      'All templates',
      'Custom domains',
      'Automations',
      'Analytics dashboard',
      'Priority support',
      'Export code',
    ],
    cta: 'Start Free Trial',
    ctaLink: '/signup',
  },
  {
    name: 'Scale',
    price: 99,
    annualPrice: 990,
    description: 'For growing teams who need advanced tools and collaboration.',
    popular: false,
    features: [
      'Everything in Pro',
      'AI agents',
      'Team collaboration (5 seats)',
      'CRM integrations',
      'API access',
      'White-label options',
      'Dedicated support',
      'SSO',
    ],
    cta: 'Contact Sales',
    ctaLink: '/contact',
  },
];

export const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Career Coach',
    content: 'Built my entire coaching website in 5 minutes. The AI understood exactly what I needed — it even suggested services I hadn\'t thought of. Mind-blowing.',
    rating: 5,
    initials: 'SC',
  },
  {
    name: 'Lisa Martinez',
    role: 'Content Creator',
    content: 'I\'ve never built a website before, but this made it so easy. I had my portfolio live in under an hour. The templates are beautiful.',
    rating: 5,
    initials: 'LM',
  },
  {
    name: 'Mark Thompson',
    role: 'Business Consultant',
    content: 'Game changer for my consulting practice. I went from idea to a fully functional site with a booking system in one afternoon. Highly recommend.',
    rating: 5,
    initials: 'MT',
  },
];

export const features = [
  {
    icon: '🤖',
    title: 'AI Builder',
    description: 'Describe your idea → get a full blueprint and complete site with pages, content, and strategy in seconds.'
  },
  {
    icon: '✨',
    title: 'Templates',
    description: 'Start from beautiful, pre-built layouts designed for coaches, creators, consultants, and local businesses.'
  },
  {
    icon: '🎨',
    title: 'Drag-Drop Editor',
    description: 'Customize everything with simple drag-and-drop. No code, no design skills needed.'
  },
  {
    icon: '🌐',
    title: '1-Click Publish',
    description: 'Publish to your own domain with one click. Free hosting included on all plans.'
  },
  {
    icon: '📱',
    title: 'Mobile Responsive',
    description: 'Every site looks stunning on every device — mobile, tablet, and desktop — automatically.'
  },
  {
    icon: '📊',
    title: 'Dashboard',
    description: 'Manage all your projects, track analytics, and grow your business from one central hub.'
  },
];

export const steps = [
  {
    number: '01',
    icon: '✍️',
    title: 'Describe',
    description: 'Tell the AI about your business in plain English. What you do, who you serve, and what you want to build.'
  },
  {
    number: '02',
    icon: '🤖',
    title: 'AI Builds',
    description: 'Our AI creates a complete strategic blueprint and builds your site with all pages, content, and design.'
  },
  {
    number: '03',
    icon: '🚀',
    title: 'Launch',
    description: 'Customize with drag-and-drop, then publish live with one click. Your business is online in minutes.'
  },
];
