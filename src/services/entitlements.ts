export interface PricingPlan {
  slug: string;
  name: string;
  price: number;
  perDesk: number | null;
  period: string;
  tag: string | null;
  description: string;
  cta: string;
  ctaLink: string;
  highlighted: boolean;
  includes: string[];
  limits: PlanLimits;
  addOns?: string[];
}

export interface PlanLimits {
  max_sites: number;
  max_buildings: number;
  max_floors: number;
  max_hot_desk_areas: number;
  max_staff_users: number;
  floorplan_uploads: number;
  ai_credits_monthly: number;
}

export interface AiCreditPack {
  name: string;
  credits: number;
  price: number;
  slug: string;
}

export interface AddOnService {
  name: string;
  price: string;
  category: string;
}

export interface PricingFAQ {
  question: string;
  answer: string;
}

export interface PlanEntitlement {
  key: string;
  label: string;
  type: 'boolean' | 'number';
}

export interface ExtraUsagePrice {
  extra_staff_user: number | null;
  extra_site: number | null;
  extra_hot_desk_area: number | null;
  extra_floorplan: number | null;
  extra_building: number | null;
  extra_floor: number | null;
}

export interface AiUsageCost {
  feature: string;
  credits: number;
  icon: string;
}

export interface DataFlowAddon {
  level: number;
  name: string;
  price: string;
  description: string;
  includedIn: string[];
  addOnFor?: string[];
  priceValue?: number;
  tracks?: string[];
}

import { pricingPlans, planDefaultEntitlements, extraUsagePrices } from '@/mocks/billingData';

export interface CompanyEntitlements {
  planSlug: string;
  featureFlags: Record<string, boolean>;
  limits: PlanLimits;
  overrides: Record<string, boolean | number>;
}

export function getPlanBySlug(slug: string): PricingPlan | undefined {
  return pricingPlans.find((p) => p.slug === slug);
}

export function getDefaultEntitlements(planSlug: string): string[] {
  return planDefaultEntitlements[planSlug] || [];
}

export function getExtraUsagePrice(planSlug: string, key: keyof ExtraUsagePrice): number | null {
  const prices = extraUsagePrices[planSlug];
  if (!prices) return null;
  return prices[key];
}

export function hasEntitlement(companyPlan: string, entitlementKey: string): boolean {
  const entitlements = getDefaultEntitlements(companyPlan);
  return entitlements.includes(entitlementKey);
}

export function checkPlanLimit(planSlug: string, limitKey: keyof PlanLimits, currentValue: number): { ok: boolean; limit: number; message: string | null } {
  const plan = getPlanBySlug(planSlug);
  if (!plan) return { ok: false, limit: 0, message: 'Plan not found' };
  const limit = plan.limits[limitKey];
  if (currentValue > limit) {
    return { ok: false, limit, message: `You have exceeded the ${limitKey} limit (${currentValue}/${limit}). Upgrade your plan to continue.` };
  }
  return { ok: true, limit, message: null };
}

export function getLimitWarningMessage(planSlug: string, limitKey: string, currentValue: number, planLimit: number): string | null {
  if (currentValue > planLimit) {
    const upgrades = getUpgradeSuggestions(planSlug, limitKey);
    return `This feature is not included in your selected plan. ${upgrades}`;
  }
  return null;
}

function getUpgradeSuggestions(planSlug: string, limitKey: string): string {
  const hierarchy = ['basic', 'professional', 'intelligence', 'enterprise'];
  const currentIndex = hierarchy.indexOf(planSlug);
  const suggestions: string[] = [];
  for (let i = currentIndex + 1; i < hierarchy.length; i++) {
    const plan = getPlanBySlug(hierarchy[i]);
    if (plan) {
      suggestions.push(plan.name);
    }
  }
  if (suggestions.length === 0) return 'Contact sales for custom options.';
  return `Upgrade to ${suggestions.join(' or ')}.`;
}

export const ENTITLEMENT_CHECKER = {
  hasEntitlement,
  checkPlanLimit,
  getLimitWarningMessage,
  getPlanBySlug,
  getDefaultEntitlements,
  getExtraUsagePrice,
};