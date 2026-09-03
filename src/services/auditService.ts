export type AuditActionType =
  | 'subscription_created'
  | 'subscription_updated'
  | 'subscription_cancelled'
  | 'plan_upgraded'
  | 'plan_downgraded'
  | 'payment_succeeded'
  | 'payment_failed'
  | 'credit_purchased'
  | 'credit_deducted'
  | 'credit_adjusted'
  | 'entitlement_override'
  | 'plan_override'
  | 'enterprise_manual_billing'
  | 'invoice_generated'
  | 'trial_started'
  | 'trial_ended'
  | 'company_created'
  | 'user_invited'
  | 'privacy_settings_updated'
  | 'data_export_requested';

export interface AuditLogEntry {
  id: string;
  companyId: string;
  userId: string;
  action: AuditActionType;
  details: Record<string, string | number | boolean>;
  timestamp: string;
  ipAddress?: string;
}

export function createAuditLog(
  _companyId: string,
  _userId: string,
  _action: AuditActionType,
  _details: Record<string, string | number | boolean>
): AuditLogEntry {
  const entry: AuditLogEntry = {
    id: `audit_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
    companyId: _companyId,
    userId: _userId,
    action: _action,
    details: _details,
    timestamp: new Date().toISOString(),
  };
  return entry;
}

export async function saveAuditLog(_entry: AuditLogEntry): Promise<{ success: boolean } | { error: string }> {
  return { error: 'Database not connected. Connect Supabase to enable audit logging.' };
}

export async function getAuditLogs(_companyId: string): Promise<AuditLogEntry[] | { error: string }> {
  return { error: 'Database not connected.' };
}

export const AUDIT_SERVICE = {
  createAuditLog,
  saveAuditLog,
  getAuditLogs,
};