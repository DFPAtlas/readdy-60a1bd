export interface ClientSubscription {
  id: string;
  plan: string;
  planName: string;
  status: 'active' | 'trialing' | 'past_due' | 'cancelled' | 'expired';
  renewalDate: string;
  startedAt: string;
  basePrice: number;
  perDeskPrice: number;
  activeDesks: number;
  activeUsers: number;
  activeSites: number;
  activeHotDeskAreas: number;
  includedLimits: {
    maxSites: number;
    maxStaffUsers: number;
    maxHotDeskAreas: number;
    maxFloorplans: number;
  };
  extraUsage: {
    extraSites: number;
    extraUsers: number;
    extraAreas: number;
    extraFloorplans: number;
    extraSitesCost: number;
    extraUsersCost: number;
    extraAreasCost: number;
    extraFloorplansCost: number;
    totalExtraCost: number;
  };
  estimatedMonthlyTotal: number;
  aiCredits: {
    balance: number;
    usedThisMonth: number;
    monthlyAllowance: number;
  };
  activeAddOns: { name: string; monthlyCost: number }[];
  availableAddOns: { name: string; monthlyCost: number; description: string }[];
  invoices: ClientInvoice[];
  paymentStatus: 'paid' | 'pending' | 'overdue' | 'none';
}

export interface ClientInvoice {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  pdfUrl: string;
  description: string;
}

export interface AdminBillingOverview {
  mrr: number;
  activeSubscriptions: number;
  failedPayments: number;
  aiCreditSales: number;
  activeDeskCount: number;
  trialAccounts: number;
  enterpriseAccounts: number;
}

export interface AdminClientRecord {
  id: string;
  company: string;
  plan: string;
  planName: string;
  status: string;
  monthlyTotal: number;
  activeDesks: number;
  aiCreditsUsed: number;
  paymentStatus: string;
  renewalDate: string;
  isEnterprise: boolean;
}

export interface WebhookEvent {
  id: string;
  type: string;
  createdAt: string;
  status: 'succeeded' | 'failed' | 'pending';
  summary: string;
}

export interface FailedPayment {
  id: string;
  company: string;
  amount: number;
  date: string;
  reason: string;
  retryCount: number;
  status: string;
}

export const mockClientSubscription: ClientSubscription = {
  id: 'sub_01HX9K2MNP',
  plan: 'professional',
  planName: 'Professional',
  status: 'active',
  renewalDate: '2026-08-01',
  startedAt: '2026-03-15',
  basePrice: 149,
  perDeskPrice: 2.50,
  activeDesks: 85,
  activeUsers: 120,
  activeSites: 2,
  activeHotDeskAreas: 6,
  includedLimits: {
    maxSites: 3,
    maxStaffUsers: 250,
    maxHotDeskAreas: 10,
    maxFloorplans: 1,
  },
  extraUsage: {
    extraSites: 0,
    extraUsers: 0,
    extraAreas: 0,
    extraFloorplans: 0,
    extraSitesCost: 0,
    extraUsersCost: 0,
    extraAreasCost: 0,
    extraFloorplansCost: 0,
    totalExtraCost: 0,
  },
  estimatedMonthlyTotal: 361.50,
  aiCredits: {
    balance: 32450,
    usedThisMonth: 17550,
    monthlyAllowance: 50000,
  },
  activeAddOns: [
    { name: 'Location Check-in (1 site)', monthlyCost: 25 },
  ],
  availableAddOns: [
    { name: 'Location Check-in', monthlyCost: 25, description: 'Site-level location confirmation for check-ins' },
    { name: 'Extra Floorplan', monthlyCost: 10, description: 'Upload additional floorplans beyond your plan limit' },
  ],
  invoices: [
    { id: 'inv_001', date: '2026-07-01', amount: 361.50, status: 'paid', pdfUrl: '#', description: 'July 2026 — Professional Plan' },
    { id: 'inv_002', date: '2026-06-01', amount: 349.00, status: 'paid', pdfUrl: '#', description: 'June 2026 — Professional Plan' },
    { id: 'inv_003', date: '2026-05-01', amount: 349.00, status: 'paid', pdfUrl: '#', description: 'May 2026 — Professional Plan' },
    { id: 'inv_004', date: '2026-04-01', amount: 311.50, status: 'paid', pdfUrl: '#', description: 'April 2026 — Professional Plan' },
    { id: 'inv_005', date: '2026-03-15', amount: 274.00, status: 'paid', pdfUrl: '#', description: 'March 2026 — Professional Plan (prorated)' },
  ],
  paymentStatus: 'paid',
};

export const mockAdminOverview: AdminBillingOverview = {
  mrr: 48750,
  activeSubscriptions: 142,
  failedPayments: 3,
  aiCreditSales: 2150,
  activeDeskCount: 4872,
  trialAccounts: 18,
  enterpriseAccounts: 7,
};

export const mockAdminClients: AdminClientRecord[] = [
  { id: 'c_001', company: 'Acme Corp', plan: 'enterprise', planName: 'Enterprise', status: 'active', monthlyTotal: 2499, activeDesks: 520, aiCreditsUsed: 185000, paymentStatus: 'paid', renewalDate: '2026-08-15', isEnterprise: true },
  { id: 'c_002', company: 'TechStart Ltd', plan: 'intelligence', planName: 'Intelligence', status: 'active', monthlyTotal: 1199, activeDesks: 200, aiCreditsUsed: 95000, paymentStatus: 'paid', renewalDate: '2026-07-22', isEnterprise: false },
  { id: 'c_003', company: 'Green Offices', plan: 'professional', planName: 'Professional', status: 'active', monthlyTotal: 449, activeDesks: 120, aiCreditsUsed: 28000, paymentStatus: 'paid', renewalDate: '2026-08-03', isEnterprise: false },
  { id: 'c_004', company: 'DeskFirst Agency', plan: 'basic', planName: 'Basic', status: 'active', monthlyTotal: 124, activeDesks: 50, aiCreditsUsed: 3200, paymentStatus: 'paid', renewalDate: '2026-07-18', isEnterprise: false },
  { id: 'c_005', company: 'Meridian Estates', plan: 'enterprise', planName: 'Enterprise', status: 'past_due', monthlyTotal: 4200, activeDesks: 850, aiCreditsUsed: 420000, paymentStatus: 'overdue', renewalDate: '2026-07-01', isEnterprise: true },
  { id: 'c_006', company: 'WorkHub Collective', plan: 'intelligence', planName: 'Intelligence', status: 'active', monthlyTotal: 879, activeDesks: 145, aiCreditsUsed: 110000, paymentStatus: 'paid', renewalDate: '2026-08-10', isEnterprise: false },
  { id: 'c_007', company: 'CityDesk Solutions', plan: 'professional', planName: 'Professional', status: 'trialing', monthlyTotal: 0, activeDesks: 30, aiCreditsUsed: 5000, paymentStatus: 'none', renewalDate: '2026-07-22', isEnterprise: false },
];

export const mockWebhookEvents: WebhookEvent[] = [
  { id: 'evt_001', type: 'invoice.paid', createdAt: '2026-07-09T08:30:00Z', status: 'succeeded', summary: 'Invoice inv_089 paid £449.00' },
  { id: 'evt_002', type: 'customer.subscription.updated', createdAt: '2026-07-09T07:15:00Z', status: 'succeeded', summary: 'Green Offices upgraded to Professional' },
  { id: 'evt_003', type: 'invoice.payment_failed', createdAt: '2026-07-08T23:45:00Z', status: 'failed', summary: 'Payment failed for Meridian Estates (£4,200)' },
  { id: 'evt_004', type: 'customer.created', createdAt: '2026-07-08T16:20:00Z', status: 'succeeded', summary: 'New customer: WorkHub Collective' },
  { id: 'evt_005', type: 'checkout.session.completed', createdAt: '2026-07-08T14:10:00Z', status: 'succeeded', summary: 'Checkout completed: TechStart Ltd (£1,199)' },
];

export const mockFailedPayments: FailedPayment[] = [
  { id: 'fp_001', company: 'Meridian Estates', amount: 4200, date: '2026-07-08', reason: 'Card declined — insufficient funds', retryCount: 2, status: 'requires_action' },
  { id: 'fp_002', company: 'NorthBridge Consulting', amount: 149, date: '2026-07-05', reason: 'Card expired', retryCount: 1, status: 'requires_action' },
  { id: 'fp_003', company: 'Studio Workspace', amount: 399, date: '2026-07-03', reason: 'Do not honour', retryCount: 3, status: 'failed_final' },
];