export interface AiCreditWallet {
  companyId: string;
  balance: number;
  monthlyAllowance: number;
  usedThisMonth: number;
  totalPurchased: number;
  lastTopUpDate: string | null;
}

export interface AiCreditTransaction {
  id: string;
  companyId: string;
  userId: string;
  type: 'usage' | 'top_up' | 'monthly_reset' | 'admin_adjustment' | 'refund';
  amount: number;
  balanceAfter: number;
  feature?: string;
  description: string;
  createdAt: string;
}

export interface AiUsageLogEntry {
  id: string;
  companyId: string;
  userId: string;
  feature: string;
  modelName: string;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  estimatedCost: number;
  creditsCharged: number;
  createdAt: string;
}

export interface TopUpPack {
  slug: string;
  name: string;
  credits: number;
  price: number;
}

import { aiCreditPacks } from '@/mocks/billingData';

export function getCreditPacks(): TopUpPack[] {
  return aiCreditPacks.filter((p) => p.price > 0).map((p) => ({
    slug: p.slug,
    name: p.name,
    credits: p.credits,
    price: p.price,
  }));
}

export function creditsToPounds(credits: number): number {
  return Math.round((credits / 1000) * 100) / 100;
}

export function poundsToCredits(pounds: number): number {
  return pounds * 1000;
}

export async function getAiCreditWallet(_companyId: string): Promise<AiCreditWallet | { error: string }> {
  return { error: 'Database not connected. Connect Supabase to enable AI credit tracking.' };
}

export async function purchaseCredits(_companyId: string, _packSlug: string): Promise<{ newBalance: number; transactionId: string } | { error: string }> {
  return { error: 'Stripe is not connected. Connect Stripe to enable credit purchases.' };
}

export async function deductCredits(_companyId: string, _userId: string, _feature: string, _credits: number): Promise<{ remaining: number } | { error: string }> {
  return { error: 'Database not connected.' };
}

export async function getUsageLogs(_companyId: string): Promise<AiUsageLogEntry[] | { error: string }> {
  return { error: 'Database not connected.' };
}

export async function getTransactionHistory(_companyId: string): Promise<AiCreditTransaction[] | { error: string }> {
  return { error: 'Database not connected.' };
}

export function getLowCreditWarning(balance: number, monthlyAllowance: number): { isLow: boolean; percentage: number; message: string | null } {
  const percentage = monthlyAllowance > 0 ? (balance / monthlyAllowance) * 100 : 0;
  if (balance <= 0) {
    return { isLow: true, percentage: 0, message: 'AI credits depleted. AI features are paused. Buy credits to resume.' };
  }
  if (percentage <= 10) {
    return { isLow: true, percentage, message: `Only ${balance.toLocaleString()} credits remaining (${Math.round(percentage)}%). Consider topping up soon.` };
  }
  if (percentage <= 25) {
    return { isLow: false, percentage, message: `Running low: ${balance.toLocaleString()} credits left.` };
  }
  return { isLow: false, percentage, message: null };
}

export const AI_CREDIT_SERVICE = {
  getCreditPacks,
  creditsToPounds,
  poundsToCredits,
  getAiCreditWallet,
  purchaseCredits,
  deductCredits,
  getUsageLogs,
  getTransactionHistory,
  getLowCreditWarning,
};