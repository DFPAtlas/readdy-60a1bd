export interface StripeCheckoutParams {
  planSlug: string;
  deskCount: number;
  successUrl: string;
  cancelUrl: string;
}

export interface StripeSubscriptionResult {
  subscriptionId: string;
  status: string;
  currentPeriodEnd: string;
}

export interface StripeInvoiceResult {
  invoiceId: string;
  amount: number;
  status: string;
  pdfUrl: string;
}

export async function createCheckoutSession(_params: StripeCheckoutParams): Promise<{ url: string } | { error: string }> {
  return { error: 'Stripe is not connected. Connect Stripe to enable checkout.' };
}

export async function getStripeCustomerPortalUrl(_customerId: string): Promise<{ url: string } | { error: string }> {
  return { error: 'Stripe is not connected.' };
}

export async function getSubscription(_companyId: string): Promise<StripeSubscriptionResult | { error: string }> {
  return { error: 'Stripe is not connected.' };
}

export async function getInvoices(_companyId: string): Promise<StripeInvoiceResult[] | { error: string }> {
  return { error: 'Stripe is not connected.' };
}

export async function cancelSubscription(_subscriptionId: string): Promise<{ success: boolean } | { error: string }> {
  return { error: 'Stripe is not connected.' };
}

export async function upgradeSubscription(_subscriptionId: string, _newPlanSlug: string): Promise<StripeSubscriptionResult | { error: string }> {
  return { error: 'Stripe is not connected.' };
}

export const STRIPE_SERVICE = {
  createCheckoutSession,
  getStripeCustomerPortalUrl,
  getSubscription,
  getInvoices,
  cancelSubscription,
  upgradeSubscription,
};