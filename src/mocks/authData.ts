export const userRoles = [
  { slug: 'platform_admin', label: 'Platform Admin', description: 'Internal HotDesk Hub administrator. Full system access.' },
  { slug: 'company_owner', label: 'Company Owner', description: 'Main client account owner. Full company access including billing.' },
  { slug: 'company_admin', label: 'Company Admin', description: 'Client-side administrator. Manages sites, staff, desks, and reports.' },
  { slug: 'billing_admin', label: 'Billing Admin', description: 'Manages subscriptions, invoices, AI credits, and payments.' },
  { slug: 'site_manager', label: 'Site Manager', description: 'Manages assigned sites, desks, staff, and maintenance.' },
  { slug: 'floor_manager', label: 'Floor Manager', description: 'Manages assigned floors and hot desk areas.' },
  { slug: 'staff_user', label: 'Staff User', description: 'Checks into desks, finds available spaces, reports issues.' },
  { slug: 'installer', label: 'Installer', description: 'Sets up desk tags, QR/NFC linking, and floorplan placement.' },
  { slug: 'auditor', label: 'Auditor', description: 'Reviews privacy settings, policies, and audit logs. Read-only by default.' },
];

export const roleRouteMap: Record<string, string> = {
  platform_admin: '/admin',
  company_owner: '/dashboard',
  company_admin: '/dashboard',
  billing_admin: '/dashboard/billing',
  site_manager: '/dashboard/sites',
  floor_manager: '/dashboard/floors',
  staff_user: '/staff',
  installer: '/setup',
  auditor: '/dashboard/compliance',
};

export const accountStates = [
  { slug: 'pending_email_verification', label: 'Email Verification Pending', icon: 'ri-mail-check-line', color: 'amber', message: 'Please verify your email address to continue. Check your inbox for the verification link.' },
  { slug: 'pending_checkout', label: 'Checkout Incomplete', icon: 'ri-shopping-cart-line', color: 'amber', message: 'Your account has been created. Complete checkout to activate your HotDesk Hub workspace.' },
  { slug: 'trial_active', label: 'Trial Active', icon: 'ri-timer-line', color: 'primary', message: 'You are on a trial. Choose a plan before your trial ends to keep full access.' },
  { slug: 'active', label: 'Active', icon: 'ri-checkbox-circle-line', color: 'green', message: 'Your account is active and all features are available.' },
  { slug: 'payment_failed', label: 'Payment Failed', icon: 'ri-error-warning-line', color: 'red', message: 'There is a problem with your payment. Please update your billing details to continue using paid features.' },
  { slug: 'suspended', label: 'Suspended', icon: 'ri-pause-circle-line', color: 'red', message: 'Your account has been suspended. Please contact support for assistance.' },
  { slug: 'cancelled', label: 'Cancelled', icon: 'ri-close-circle-line', color: 'gray', message: 'Your subscription has been cancelled. You can reactivate your account at any time.' },
  { slug: 'enterprise_pending', label: 'Enterprise Review', icon: 'ri-building-line', color: 'amber', message: 'Thanks for your Enterprise request. Our team will contact you to plan your setup.' },
  { slug: 'demo_mode', label: 'Demo Mode', icon: 'ri-eye-line', color: 'secondary', message: 'You are viewing a demo of HotDesk Hub. Contact sales to set up your own workspace.' },
];

export const onboardingSteps = [
  { step: 1, id: 'company-profile', label: 'Company Profile', icon: 'ri-building-2-line' },
  { step: 2, id: 'first-site', label: 'First Site', icon: 'ri-map-pin-line' },
  { step: 3, id: 'buildings-floors', label: 'Buildings & Floors', icon: 'ri-building-4-line' },
  { step: 4, id: 'hot-desk-areas', label: 'Hot Desk Areas', icon: 'ri-layout-grid-line' },
  { step: 5, id: 'desk-setup', label: 'Desk Setup', icon: 'ri-computer-line' },
  { step: 6, id: 'staff-invite', label: 'Staff Invite', icon: 'ri-user-add-line' },
  { step: 7, id: 'privacy-policy', label: 'Privacy & Policy', icon: 'ri-shield-check-line' },
  { step: 8, id: 'review-launch', label: 'Review & Launch', icon: 'ri-rocket-line' },
];

export const companySizes = [
  '1–25 staff',
  '26–100 staff',
  '101–250 staff',
  '251–1,000 staff',
  '1,000+ staff',
];

export const industries = [
  'Office / Corporate',
  'Facilities Management',
  'Technology',
  'Finance',
  'Legal',
  'Education',
  'Healthcare',
  'Public Sector',
  'Other',
];

export const deskTypes = [
  'standard desk',
  'standing desk',
  'quiet desk',
  'accessible desk',
  'dual monitor desk',
  'visitor desk',
  'team desk',
];

export const deskStatuses = ['draft', 'active', 'inactive', 'maintenance'];

export const dataRetentionPeriods = [
  { value: '30', label: '30 days' },
  { value: '90', label: '90 days' },
  { value: '180', label: '180 days' },
  { value: '365', label: '1 year' },
  { value: 'custom', label: 'Custom' },
];

export const clientSidebarLinks = [
  { label: 'Overview', href: '/dashboard', icon: 'ri-dashboard-line' },
  { label: 'Sites', href: '/dashboard/sites', icon: 'ri-building-line' },
  { label: 'Buildings', href: '/dashboard/buildings', icon: 'ri-building-4-line' },
  { label: 'Floors', href: '/dashboard/floors', icon: 'ri-stack-line' },
  { label: 'Hot Desk Areas', href: '/dashboard/areas', icon: 'ri-layout-grid-line' },
  { label: 'Desks', href: '/dashboard/desks', icon: 'ri-computer-line' },
  { label: 'Floorplans', href: '/dashboard/floorplans', icon: 'ri-map-pin-line' },
  { label: 'Tags', href: '/dashboard/tags', icon: 'ri-price-tag-3-line' },
  { label: 'Staff', href: '/dashboard/staff', icon: 'ri-team-line' },
  { label: 'Check-Ins', href: '/dashboard/check-ins', icon: 'ri-qr-scan-line' },
  { label: 'Reports', href: '/dashboard/reports', icon: 'ri-bar-chart-line' },
  { label: 'Billing', href: '/dashboard/billing', icon: 'ri-bank-card-line' },
  { label: 'AI Credits', href: '/dashboard/ai-credits', icon: 'ri-brain-line' },
  { label: 'Privacy & Compliance', href: '/dashboard/compliance', icon: 'ri-shield-check-line' },
  { label: 'Audit Logs', href: '/dashboard/compliance/audit-logs', icon: 'ri-file-list-3-line' },
  { label: 'Settings', href: '/dashboard/settings', icon: 'ri-settings-3-line' },
];

export const adminSidebarLinks = [
  { label: 'Overview', href: '/admin', icon: 'ri-dashboard-line' },
  { label: 'Companies', href: '/admin/companies', icon: 'ri-building-line' },
  { label: 'Subscriptions', href: '/admin/subscriptions', icon: 'ri-bank-card-line' },
  { label: 'Billing', href: '/admin/billing', icon: 'ri-money-pound-circle-line' },
  { label: 'AI Credits', href: '/admin/ai-credits', icon: 'ri-brain-line' },
  { label: 'Entitlements', href: '/admin/entitlements', icon: 'ri-key-2-line' },
  { label: 'Users', href: '/admin/users', icon: 'ri-team-line' },
  { label: 'Support', href: '/admin/support', icon: 'ri-customer-service-line' },
  { label: 'Webhooks', href: '/admin/webhooks', icon: 'ri-webhook-line' },
  { label: 'System Health', href: '/admin/system', icon: 'ri-heart-pulse-line' },
  { label: 'Audit Logs', href: '/admin/audit-logs', icon: 'ri-file-list-3-line' },
  { label: 'Settings', href: '/admin/settings', icon: 'ri-settings-3-line' },
];

export const staffNavLinks = [
  { label: 'Home', href: '/staff', icon: 'ri-home-4-line' },
  { label: 'Scan', href: '/staff/check-in', icon: 'ri-qr-scan-line' },
  { label: 'Find Desk', href: '/staff/find-desk', icon: 'ri-search-line' },
  { label: 'Current Desk', href: '/staff/current-desk', icon: 'ri-computer-line' },
  { label: 'Issues', href: '/staff/issues', icon: 'ri-error-warning-line' },
  { label: 'My Data', href: '/staff/my-data', icon: 'ri-shield-user-line' },
  { label: 'Privacy', href: '/staff/privacy', icon: 'ri-lock-line' },
];

export const installerChecklist = [
  { id: 1, label: 'Review assigned sites', done: false },
  { id: 2, label: 'Tag desks with QR/NFC codes', done: false },
  { id: 3, label: 'Link tags to desk records', done: false },
  { id: 4, label: 'Place desk cards on floorplan', done: false },
  { id: 5, label: 'Verify check-in flow per desk', done: false },
  { id: 6, label: 'Report setup issues', done: false },
  { id: 7, label: 'Submit setup completion', done: false },
];

export const emailTemplates = [
  { name: 'Account Verification', slug: 'verify-email', subject: 'Verify your email address — HotDesk Hub', description: 'Sent after signup. Contains verification link.' },
  { name: 'Password Reset', slug: 'password-reset', subject: 'Reset your password — HotDesk Hub', description: 'Sent when user requests password reset.' },
  { name: 'Staff Invite', slug: 'staff-invite', subject: 'You\'ve been invited to HotDesk Hub', description: 'Sent to staff members invited by admin. Contains accept link.' },
  { name: 'Admin Invite', slug: 'admin-invite', subject: 'You\'ve been added as an admin on HotDesk Hub', description: 'Sent to new admins. Contains setup link.' },
  { name: 'Checkout Success', slug: 'checkout-success', subject: 'Welcome to HotDesk Hub — Your workspace is ready', description: 'Sent after successful Stripe checkout.' },
  { name: 'Payment Failed', slug: 'payment-failed', subject: 'Action needed — Payment issue on HotDesk Hub', description: 'Sent when subscription payment fails.' },
  { name: 'Trial Ending', slug: 'trial-ending', subject: 'Your HotDesk Hub trial ends in 7 days', description: 'Sent 7 days before trial expiry.' },
  { name: 'Onboarding Reminder', slug: 'onboarding-reminder', subject: 'Finish setting up your HotDesk Hub workplace', description: 'Sent if onboarding incomplete after 48 hours.' },
  { name: 'Privacy Notice Update', slug: 'privacy-notice-update', subject: 'Privacy notice updated — HotDesk Hub', description: 'Sent when privacy policy or monitoring policy changes.' },
  { name: 'AI Credit Low Balance', slug: 'ai-credit-low', subject: 'AI credits running low — HotDesk Hub', description: 'Sent when AI credit balance drops below 25%.' },
];

export const enquiryTypes = [
  'Sales',
  'Support',
  'Pricing',
  'Enterprise',
  'Partnerships',
  'Other',
];

export const staffPortalCards = [
  { title: 'Check into a desk', description: 'Scan a QR or tap an NFC tag to check in', icon: 'ri-qr-scan-line', href: '/staff/check-in', color: 'bg-primary-500' },
  { title: 'Find available desk', description: 'See which desks are free right now', icon: 'ri-search-line', href: '/staff/find-desk', color: 'bg-accent-500' },
  { title: 'My current desk', description: 'View your active check-in details', icon: 'ri-computer-line', href: '/staff/current-desk', color: 'bg-secondary-600' },
  { title: 'Check-in history', description: 'View your past desk check-ins', icon: 'ri-history-line', href: '/staff/history', color: 'bg-foreground-600' },
  { title: 'Report a desk issue', description: 'Report faulty equipment or maintenance needs', icon: 'ri-error-warning-line', href: '/staff/issues', color: 'bg-primary-600' },
  { title: 'My data & privacy', description: 'Access and manage your workplace data', icon: 'ri-shield-user-line', href: '/staff/my-data', color: 'bg-accent-600' },
];