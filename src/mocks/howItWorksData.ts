export const howItWorksStepsFull = [
  {
    step: 1,
    title: 'Create your account',
    description: 'The client creates a company account and selects a subscription plan that matches their workplace size and feature needs.',
  },
  {
    step: 2,
    title: 'Set up your workplace',
    description: 'Add sites, buildings, floors, hot desk areas, and individual desks. Upload floorplans to visually map the workspace.',
  },
  {
    step: 3,
    title: 'Tag your desks',
    description: 'Assign QR codes or NFC tags to each desk. Desk cards are placed on floorplans and connected to physical tags.',
  },
  {
    step: 4,
    title: 'Invite staff',
    description: 'Staff receive an invite email, create their own login, and access the staff portal for check-ins and desk finding.',
  },
  {
    step: 5,
    title: 'Check in and out',
    description: 'Staff tap or scan desk tags to check in at the start of the day and check out when they leave. All tracked in real time.',
  },
  {
    step: 6,
    title: 'View live dashboards',
    description: 'Managers see desk availability, occupancy, usage patterns, and reported issues — updated in real time across all sites.',
  },
  {
    step: 7,
    title: 'Use AI insights',
    description: 'Higher-tier clients generate AI reports, workplace recommendations, desk demand predictions, and space optimisation insights.',
  },
];

export const roleJourneys = [
  {
    role: 'Client Admin',
    icon: 'ri-shield-user-line',
    description: 'Set up workplace, manage users, view reports, control privacy settings, manage billing and subscriptions.',
    steps: ['Create company account', 'Configure sites and desks', 'Invite and manage staff', 'View occupancy reports', 'Control privacy settings', 'Manage billing'],
  },
  {
    role: 'Staff',
    icon: 'ri-user-line',
    description: 'Log in, scan desk, check in, find available desks, report issues, and view own booking history.',
    steps: ['Receive invite email', 'Create personal login', 'Scan desk tag to check in', 'Find available desks', 'Report desk issues', 'View check-in history'],
  },
  {
    role: 'Site Manager',
    icon: 'ri-building-line',
    description: 'Monitor floor usage, manage desks, respond to issues, review occupancy patterns, and keep the office running smoothly.',
    steps: ['View live floor dashboard', 'Monitor desk availability', 'Manage desk assignments', 'Respond to issue reports', 'Review occupancy trends', 'Update floor layouts'],
  },
  {
    role: 'Platform Admin',
    icon: 'ri-settings-3-line',
    description: 'Manage clients, subscriptions, entitlements, support tickets, system health monitoring, and billing across the platform.',
    steps: ['Onboard new clients', 'Manage subscriptions', 'Configure entitlements', 'Handle support tickets', 'Monitor system health', 'Process billing'],
  },
];