export const plans = [
  {
    name: 'Basic',
    price: '£49',
    period: '/month',
    description: 'Small offices needing simple QR/NFC check-ins.',
    features: [
      '1 site, 2 hot desk areas',
      '50 staff users',
      'QR/NFC desk check-in',
      'Basic dashboard & reports',
      'Staff privacy notice',
      'Audit logs',
      '5,000 AI credits/month',
    ],
    cta: 'Start Basic',
    highlighted: false,
    imageSeq: 'plan-basic-02',
  },
  {
    name: 'Professional',
    price: '£149',
    period: '/month',
    description: 'Growing workplaces needing multi-site tools and better reporting.',
    features: [
      '3 sites, 10 hot desk areas',
      '250 staff users',
      'Everything in Basic',
      'Occupancy trends',
      'Mobile setup mode',
      '1 floorplan upload',
      '50,000 AI credits/month',
    ],
    cta: 'Start Professional',
    highlighted: true,
    imageSeq: 'plan-pro-02',
  },
  {
    name: 'Intelligence',
    price: '£399',
    period: '/month',
    description: 'Companies needing AI analytics and advanced occupancy intelligence.',
    features: [
      '10 sites, 30 hot desk areas',
      '1,000 staff users',
      'Everything in Professional',
      'AI analytics dashboard',
      'Area utilisation heatmaps',
      'Desk demand prediction',
      '250,000 AI credits/month',
    ],
    cta: 'Start Intelligence',
    highlighted: false,
    imageSeq: 'plan-intel-02',
  },
  {
    name: 'Enterprise',
    price: 'From £999',
    period: '/month',
    description: 'Large companies, estates, and multi-building workplaces.',
    features: [
      'Everything in Intelligence',
      'Multi-building support',
      'Local server gateway',
      'Access control & CCTV',
      'API access & SLA support',
      'Custom dashboards',
      'Dedicated onboarding',
    ],
    cta: 'Contact Sales',
    highlighted: false,
    imageSeq: 'plan-ent-02',
  },
];

export const aiFeatures = [
  {
    title: 'Smart Desk Matching',
    description: 'AI learns team preferences and work patterns to suggest the ideal desk — near collaborators, with the right equipment every time.',
    imageSeq: 'feature-smart-match',
    size: 'large',
  },
  {
    title: 'Occupancy Predictions',
    description: 'Forecast tomorrow\'s office density so teams can plan ahead. Avoid overcrowding with machine-learning models trained on your actual usage data.',
    imageSeq: 'feature-occupancy',
    size: 'small',
  },
  {
    title: 'Cost Optimisation',
    description: 'Identify underused zones and get actionable recommendations to right-size your real estate footprint. Save up to 30% on workspace costs.',
    imageSeq: 'feature-cost',
    size: 'small',
  },
];

export const testimonials = [
  {
    id: 1,
    quote: 'HotDesk Hub transformed how our hybrid team uses the office. We went from people wandering around looking for desks to a smooth booking experience that everyone actually uses. Occupancy is up 40% and complaints are down to zero.',
    author: 'Sarah Mitchell',
    role: 'Head of Workplace, FinTech London',
    rating: 4.9,
    avatarSeq: 'avatar-sarah',
  },
  {
    id: 2,
    quote: 'The AI suggestions are scarily accurate. It knows I prefer window seats near the marketing team on Tuesdays before I even think about it. Our ops team saved £120k in real estate costs within six months.',
    author: 'James Okonkwo',
    role: 'COO, ScaleUp Manchester',
    rating: 4.8,
    avatarSeq: 'avatar-james',
  },
  {
    id: 3,
    quote: 'We evaluated six desk booking platforms and HotDesk Hub was the only one that actually delivered on the AI promise. The occupancy predictions help us decide which floors to heat and clean each day — the energy savings alone paid for the subscription.',
    author: 'Emma Larsson',
    role: 'Facilities Director, TechCorp Bristol',
    rating: 5.0,
    avatarSeq: 'avatar-emma',
  },
];

export const stats = [
  { value: '12,000+', label: 'Desks Managed' },
  { value: '340+', label: 'Companies' },
  { value: '99.8%', label: 'Uptime SLA' },
  { value: '£2.4M', label: 'Saved by Clients' },
];

export const privacyFeatures = [
  {
    icon: 'ri-shield-check-line',
    title: 'Occupancy Anonymisation',
    description: 'One-click anonymisation strips personal identifiers from sensor data, giving you pure utilisation metrics without compromising individual privacy.',
  },
  {
    icon: 'ri-user-unfollow-line',
    title: 'Disable Named Tracking',
    description: 'Toggle off named occupancy tracking organisation-wide. The system records only aggregate headcount and zone density.',
  },
  {
    icon: 'ri-file-user-line',
    title: 'Staff Data Access Portal',
    description: 'Every team member gets a personal privacy dashboard to view, export, and delete their own booking history and occupancy records.',
  },
  {
    icon: 'ri-signal-wifi-line',
    title: 'Transparent Analytics Signage',
    description: 'Pre-built digital signage templates clearly inform everyone what data is collected, why, and how to opt out.',
  },
];

export const howItWorksSteps = [
  {
    step: 1,
    title: 'Create your account',
    description: 'Set up a company account and choose a subscription plan that fits your workplace size.',
  },
  {
    step: 2,
    title: 'Set up your workplace',
    description: 'Add sites, buildings, floors, hot desk areas, and individual desks. Upload floorplans to map your layout.',
  },
  {
    step: 3,
    title: 'Tag your desks',
    description: 'Assign QR codes or NFC tags to each desk. Staff can tap or scan to check in instantly — no app needed.',
  },
  {
    step: 4,
    title: 'Invite your staff',
    description: 'Staff receive an invite email, create their login, and access the staff portal to start checking in.',
  },
  {
    step: 5,
    title: 'Check in and out',
    description: 'Staff tap or scan desk tags to check in at the start of the day and check out when they leave.',
  },
  {
    step: 6,
    title: 'View live dashboards',
    description: 'Managers see desk availability, occupancy levels, usage patterns, and reported issues in real time.',
  },
  {
    step: 7,
    title: 'Use AI insights',
    description: 'Higher-tier clients unlock AI-generated reports, demand predictions, and space optimisation insights.',
  },
];

export const enterpriseHomeFeatures = [
  {
    icon: 'ri-stack-line',
    title: 'Multi-Building Support',
    description: 'Manage desks, staff, and occupancy across unlimited buildings from a single unified dashboard.',
  },
  {
    icon: 'ri-server-line',
    title: 'Local Server Gateway',
    description: 'Deploy on-site gateways for low-latency data processing and enhanced data sovereignty.',
  },
  {
    icon: 'ri-links-line',
    title: 'API Access',
    description: 'Integrate HotDesk Hub with your existing workplace systems through our comprehensive REST API.',
  },
  {
    icon: 'ri-dashboard-3-line',
    title: 'Custom Dashboards',
    description: 'Build tailored views and reports that match your organisation\'s specific analytics needs.',
  },
];