import { userRoles, roleRouteMap, accountStates } from '@/mocks/authData';

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
  companyId: string | null;
  accountState: string;
  emailVerified: boolean;
}

let mockUser: AuthUser | null = null;
const mockCompanyId = 'comp_01HX9K8N3P';

export async function createAccount(data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  companyName: string;
  companySize: string;
  industry: string;
  country: string;
  postcode: string;
  role: string;
}): Promise<{ success: boolean; message: string }> {
  console.log('[AUTH PLACEHOLDER] createAccount', { email: data.email, company: data.companyName });
  return { success: true, message: 'Account created. Supabase Auth connection required for real authentication.' };
}

export async function loginUser(email: string, password: string): Promise<AuthUser | null> {
  console.log('[AUTH PLACEHOLDER] loginUser', { email });
  mockUser = {
    id: 'user_01HX9K8N3Q',
    email,
    firstName: 'Demo',
    lastName: 'User',
    roles: ['company_owner'],
    companyId: mockCompanyId,
    accountState: 'active',
    emailVerified: true,
  };
  return mockUser;
}

export async function logoutUser(): Promise<void> {
  console.log('[AUTH PLACEHOLDER] logoutUser');
  mockUser = null;
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  console.log('[AUTH PLACEHOLDER] getCurrentUser');
  return mockUser;
}

export async function sendPasswordReset(email: string): Promise<{ success: boolean; message: string }> {
  console.log('[AUTH PLACEHOLDER] sendPasswordReset', { email });
  return { success: true, message: 'If an account exists for this email, reset instructions have been sent.' };
}

export async function resetPassword(token: string, newPassword: string): Promise<{ success: boolean; message: string }> {
  console.log('[AUTH PLACEHOLDER] resetPassword', { token });
  return { success: true, message: 'Password has been reset. You can now log in.' };
}

export async function verifyEmail(token: string): Promise<{ success: boolean; message: string }> {
  console.log('[AUTH PLACEHOLDER] verifyEmail', { token });
  return { success: true, message: 'Email verified successfully.' };
}

export function routeUserByRole(roles: string[]): string {
  if (roles.includes('platform_admin')) return roleRouteMap.platform_admin;
  if (roles.includes('company_owner') || roles.includes('company_admin')) return roleRouteMap.company_owner;
  if (roles.includes('billing_admin')) return roleRouteMap.billing_admin;
  if (roles.includes('site_manager')) return roleRouteMap.site_manager;
  if (roles.includes('floor_manager')) return roleRouteMap.floor_manager;
  if (roles.includes('staff_user')) return roleRouteMap.staff_user;
  if (roles.includes('installer')) return roleRouteMap.installer;
  if (roles.includes('auditor')) return roleRouteMap.auditor;
  return '/dashboard';
}

export function getUserRoleLabel(slug: string): string {
  const role = userRoles.find((r) => r.slug === slug);
  return role ? role.label : slug;
}

export function getAccountStateMessage(slug: string): string {
  const state = accountStates.find((s) => s.slug === slug);
  return state ? state.message : 'Your account status is being reviewed.';
}

export function getAccountStateDetails(slug: string) {
  return accountStates.find((s) => s.slug === slug) || accountStates[0];
}

export async function createCompany(data: {
  name: string;
  website: string;
  size: string;
  industry: string;
  country: string;
  postcode: string;
  contactRole: string;
}): Promise<{ success: boolean; companyId: string }> {
  console.log('[AUTH PLACEHOLDER] createCompany', { name: data.name });
  return { success: true, companyId: mockCompanyId };
}

export async function selectPlan(plan: string, deskCount: number): Promise<{ success: boolean; estimatedTotal: number }> {
  console.log('[AUTH PLACEHOLDER] selectPlan', { plan, deskCount });
  const prices: Record<string, { base: number; perDesk: number }> = {
    basic: { base: 49, perDesk: 1.5 },
    professional: { base: 149, perDesk: 2.5 },
    intelligence: { base: 399, perDesk: 4 },
    enterprise: { base: 999, perDesk: 0 },
  };
  const p = prices[plan] || prices.basic;
  return { success: true, estimatedTotal: p.base + p.perDesk * deskCount };
}

export async function startStripeCheckout(plan: string, deskCount: number): Promise<{ success: boolean; checkoutUrl: string }> {
  console.log('[AUTH PLACEHOLDER] startStripeCheckout', { plan, deskCount });
  return { success: true, checkoutUrl: '#' };
}

export async function completeOnboarding(companyId: string): Promise<{ success: boolean }> {
  console.log('[AUTH PLACEHOLDER] completeOnboarding', { companyId });
  return { success: true };
}

export async function inviteStaff(data: {
  name: string;
  email: string;
  role: string;
  assignedSite: string;
  assignedArea: string;
}[]): Promise<{ success: boolean; invited: number }> {
  console.log('[AUTH PLACEHOLDER] inviteStaff', { count: data.length });
  return { success: true, invited: data.length };
}

export async function acceptStaffInvite(data: {
  token: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}): Promise<{ success: boolean; message: string }> {
  console.log('[AUTH PLACEHOLDER] acceptStaffInvite', { email: data.email });
  return { success: true, message: 'Staff account created. Welcome to HotDesk Hub!' };
}

export async function switchRole(targetRole: string): Promise<{ success: boolean; redirectTo: string }> {
  console.log('[AUTH PLACEHOLDER] switchRole', { targetRole });
  return { success: true, redirectTo: roleRouteMap[targetRole] || '/dashboard' };
}

export async function checkEntitlement(entitlementKey: string): Promise<boolean> {
  console.log('[AUTH PLACEHOLDER] checkEntitlement', { entitlementKey });
  return true;
}

export async function updatePrivacySettings(settings: Record<string, unknown>): Promise<{ success: boolean }> {
  console.log('[AUTH PLACEHOLDER] updatePrivacySettings', settings);
  return { success: true };
}

export async function createAuditLog(data: {
  action: string;
  userId: string;
  companyId: string;
  details: string;
}): Promise<void> {
  console.log('[AUTH PLACEHOLDER] createAuditLog', { action: data.action, userId: data.userId });
}