import {
  complianceOverviewCards,
  privacyNoticeContent,
  workplaceMonitoringPolicyContent,
  dataProcessingAgreement,
  dpiaAssessments,
  retentionCategories,
  trackingSettings,
  clientAuditLogs,
  staffMyData,
  staffDataRequests,
  signageChecklist,
} from '@/mocks/complianceData';

const mockCompanyId = 'comp_01HX9K8N3P';
const mockUserId = 'user_01HX9K8N3Q';

let mockAuditLogs = [...clientAuditLogs];
let mockDataRequests = [...staffDataRequests];
let mockTrackingSettings = { ...trackingSettings };
let mockPrivacyNotice = { ...privacyNoticeContent };
let mockMonitoringPolicy = { ...workplaceMonitoringPolicyContent };
let mockDpa = { ...dataProcessingAgreement };
let mockRetentionCategories = [...retentionCategories];

// --- Compliance Overview ---
export async function getComplianceOverview(companyId: string): Promise<typeof complianceOverviewCards> {
  console.log('[COMPLIANCE PLACEHOLDER] getComplianceOverview', { companyId });
  return complianceOverviewCards;
}

export function getComplianceReadinessScore(): { completed: number; total: number } {
  const completed = 7;
  const total = 10;
  return { completed, total };
}

// --- Staff Privacy Notice ---
export async function getPrivacyNotice(companyId: string) {
  console.log('[COMPLIANCE PLACEHOLDER] getPrivacyNotice', { companyId });
  return mockPrivacyNotice;
}

export async function updatePrivacyNotice(companyId: string, sections: unknown): Promise<{ success: boolean }> {
  console.log('[COMPLIANCE PLACEHOLDER] updatePrivacyNotice', { companyId });
  mockPrivacyNotice = { ...mockPrivacyNotice, ...(sections as object) };
  console.log('[AUDIT] privacy_notice_updated', { userId: mockUserId, companyId });
  return { success: true };
}

export async function publishPrivacyNotice(companyId: string): Promise<{ success: boolean; message: string }> {
  console.log('[COMPLIANCE PLACEHOLDER] publishPrivacyNotice', { companyId });
  mockPrivacyNotice.status = 'active';
  mockPrivacyNotice.version += 1;
  mockPrivacyNotice.publishedAt = new Date().toISOString();
  console.log('[AUDIT] privacy_notice_published', { userId: mockUserId, companyId, version: mockPrivacyNotice.version });
  return { success: true, message: 'Privacy notice published successfully.' };
}

export async function acknowledgePrivacyNotice(userId: string, noticeId: string, version: number): Promise<{ success: boolean }> {
  console.log('[COMPLIANCE PLACEHOLDER] acknowledgePrivacyNotice', { userId, noticeId, version });
  return { success: true };
}

// --- Workplace Monitoring Policy ---
export async function getWorkplaceMonitoringPolicy(companyId: string) {
  console.log('[COMPLIANCE PLACEHOLDER] getWorkplaceMonitoringPolicy', { companyId });
  return mockMonitoringPolicy;
}

export async function updateWorkplaceMonitoringPolicy(companyId: string, sections: unknown): Promise<{ success: boolean }> {
  console.log('[COMPLIANCE PLACEHOLDER] updateWorkplaceMonitoringPolicy', { companyId });
  mockMonitoringPolicy = { ...mockMonitoringPolicy, ...(sections as object) };
  console.log('[AUDIT] monitoring_policy_updated', { userId: mockUserId, companyId });
  return { success: true };
}

export async function publishWorkplaceMonitoringPolicy(companyId: string): Promise<{ success: boolean }> {
  console.log('[COMPLIANCE PLACEHOLDER] publishWorkplaceMonitoringPolicy', { companyId });
  mockMonitoringPolicy.status = 'active';
  mockMonitoringPolicy.version += 1;
  mockMonitoringPolicy.publishedAt = new Date().toISOString();
  console.log('[AUDIT] monitoring_policy_published', { userId: mockUserId, companyId });
  return { success: true };
}

// --- Data Processing Agreement ---
export async function getDataProcessingAgreement(companyId: string) {
  console.log('[COMPLIANCE PLACEHOLDER] getDataProcessingAgreement', { companyId });
  return mockDpa;
}

export async function markDpaReviewed(companyId: string): Promise<{ success: boolean }> {
  console.log('[COMPLIANCE PLACEHOLDER] markDpaReviewed', { companyId });
  mockDpa.status = 'reviewed';
  mockDpa.statusLabel = 'Reviewed';
  mockDpa.reviewedAt = new Date().toISOString();
  mockDpa.reviewedBy = 'Sarah Chen';
  console.log('[AUDIT] dpa_reviewed', { userId: mockUserId, companyId });
  return { success: true };
}

// --- DPIA ---
export async function getDpiaAssessments(companyId: string) {
  console.log('[COMPLIANCE PLACEHOLDER] getDpiaAssessments', { companyId });
  return dpiaAssessments;
}

export async function startDpiaAssessment(companyId: string, data: { featureKey: string; purpose: string; dataCollected: string; usersAffected: string; risks: string; controls: string; retention: string; accessControls: string; staffComms: string; decision: string; reviewDate: string }): Promise<{ success: boolean }> {
  console.log('[COMPLIANCE PLACEHOLDER] startDpiaAssessment', { companyId, featureKey: data.featureKey });
  console.log('[AUDIT] dpia_assessment_started', { userId: mockUserId, companyId, feature: data.featureKey });
  return { success: true };
}

export async function updateDpiaAssessment(companyId: string, assessmentId: string, updates: unknown): Promise<{ success: boolean }> {
  console.log('[COMPLIANCE PLACEHOLDER] updateDpiaAssessment', { companyId, assessmentId });
  console.log('[AUDIT] dpia_assessment_updated', { userId: mockUserId, companyId, assessmentId });
  return { success: true };
}

// --- Data Retention ---
export async function getRetentionSettings(companyId: string) {
  console.log('[COMPLIANCE PLACEHOLDER] getRetentionSettings', { companyId });
  return mockRetentionCategories;
}

export async function updateRetentionSettings(companyId: string, categoryKey: string, period: string): Promise<{ success: boolean }> {
  console.log('[COMPLIANCE PLACEHOLDER] updateRetentionSettings', { companyId, categoryKey, period });
  const category = mockRetentionCategories.find((c) => c.key === categoryKey);
  if (category) {
    category.currentPeriod = period;
    const opt = [{ value: '30', label: '30 days' }, { value: '90', label: '90 days' }, { value: '180', label: '180 days' }, { value: '365', label: '1 year' }, { value: '730', label: '2 years' }, { value: 'custom', label: 'Custom' }, { value: 'keep_until_deleted', label: 'Keep until deleted' }].find((o) => o.value === period);
    category.currentLabel = opt ? opt.label : period;
  }
  console.log('[AUDIT] retention_updated', { userId: mockUserId, companyId, categoryKey, period });
  return { success: true };
}

// --- Tracking Controls ---
export async function getTrackingSettings(companyId: string) {
  console.log('[COMPLIANCE PLACEHOLDER] getTrackingSettings', { companyId });
  return mockTrackingSettings;
}

export async function updateTrackingSettings(companyId: string, settings: Record<string, boolean>): Promise<{ success: boolean }> {
  console.log('[COMPLIANCE PLACEHOLDER] updateTrackingSettings', { companyId, settings });
  mockTrackingSettings = { ...mockTrackingSettings, ...settings, lastUpdated: new Date().toISOString() };
  const sensitiveKeys = ['namedTrackingEnabled', 'probeWifiEnabled', 'locationCheckinEnabled'];
  for (const key of sensitiveKeys) {
    if (settings[key] !== undefined && settings[key] === true) {
      console.log('[AUDIT] sensitive_tracking_enabled', { userId: mockUserId, companyId, setting: key });
    }
  }
  return { success: true };
}

export async function getSignageChecklist(companyId: string) {
  console.log('[COMPLIANCE PLACEHOLDER] getSignageChecklist', { companyId });
  return signageChecklist;
}

// --- Audit Logs ---
export async function getClientAuditLogs(companyId: string, filters?: Record<string, string>) {
  console.log('[COMPLIANCE PLACEHOLDER] getClientAuditLogs', { companyId, filters });
  let logs = [...mockAuditLogs];
  if (filters) {
    if (filters.eventType) logs = logs.filter((l) => l.eventType === filters.eventType);
    if (filters.user) logs = logs.filter((l) => l.user && l.user.toLowerCase().includes(filters.user.toLowerCase()));
    if (filters.severity) logs = logs.filter((l) => l.severity === filters.severity);
    if (filters.site) logs = logs.filter((l) => l.site && l.site.toLowerCase().includes(filters.site.toLowerCase()));
  }
  return logs;
}

export async function exportAuditLogs(companyId: string): Promise<{ success: boolean; message: string }> {
  console.log('[COMPLIANCE PLACEHOLDER] exportAuditLogs', { companyId });
  console.log('[AUDIT] audit_logs_exported', { userId: mockUserId, companyId });
  return { success: true, message: 'Audit log export placeholder — CSV generation will be available when Supabase is connected.' };
}

export async function getAdminAuditLogs(filters?: Record<string, string>) {
  console.log('[COMPLIANCE PLACEHOLDER] getAdminAuditLogs', { filters });
  const adminLogs = [
    ...mockAuditLogs,
    { id: 'admin-audit-1', eventType: 'entitlement_changed', user: 'Platform Admin', role: 'platform_admin', company: 'Beta Ltd', site: null, action: 'Overrode plan entitlement: added floorplan_uploads', targetType: 'entitlement', targetId: 'ent_beta', severity: 'critical', timestamp: '2026-07-08T10:00:00Z', metadata: { company: 'Beta Ltd', entitlement: 'floorplan_uploads' } },
    { id: 'admin-audit-2', eventType: 'billing_changed', user: 'Platform Admin', role: 'platform_admin', company: 'StartupPrime', site: null, action: 'Applied manual credit to StartupPrime account', targetType: 'billing', targetId: 'bill_sp', severity: 'warning', timestamp: '2026-07-07T16:00:00Z', metadata: { company: 'StartupPrime', credits: 500 } },
  ];
  let logs = [...adminLogs];
  if (filters) {
    if (filters.eventType) logs = logs.filter((l) => l.eventType === filters.eventType);
    if (filters.company) logs = logs.filter((l) => l.company && l.company.toLowerCase().includes(filters.company.toLowerCase()));
    if (filters.severity) logs = logs.filter((l) => l.severity === filters.severity);
    if (filters.user) logs = logs.filter((l) => l.user && l.user.toLowerCase().includes(filters.user.toLowerCase()));
  }
  return logs;
}

// --- Staff Data ---
export async function getStaffOwnData(userId: string) {
  console.log('[COMPLIANCE PLACEHOLDER] getStaffOwnData', { userId });
  console.log('[AUDIT] staff_viewed_own_data', { userId });
  return staffMyData;
}

export async function downloadStaffData(userId: string): Promise<{ success: boolean; message: string }> {
  console.log('[COMPLIANCE PLACEHOLDER] downloadStaffData', { userId });
  console.log('[AUDIT] staff_data_export_requested', { userId });
  return { success: true, message: 'Your data export request has been logged. Download will be available when Supabase is connected.' };
}

// --- Staff Data Requests ---
export async function getStaffDataRequests(companyId: string) {
  console.log('[COMPLIANCE PLACEHOLDER] getStaffDataRequests', { companyId });
  return mockDataRequests;
}

export async function createStaffDataRequest(companyId: string, data: { userId: string; requestType: string; message: string }): Promise<{ success: boolean }> {
  console.log('[COMPLIANCE PLACEHOLDER] createStaffDataRequest', { companyId, ...data });
  console.log('[AUDIT] staff_data_request_created', { userId: data.userId, companyId, type: data.requestType });
  return { success: true };
}

export async function updateStaffDataRequest(companyId: string, requestId: string, updates: { status?: string; assignedTo?: string; notes?: string[] }): Promise<{ success: boolean }> {
  console.log('[COMPLIANCE PLACEHOLDER] updateStaffDataRequest', { companyId, requestId, updates });
  console.log('[AUDIT] staff_data_request_updated', { userId: mockUserId, companyId, requestId });
  return { success: true };
}

// --- Utility ---
export async function checkComplianceEntitlement(entitlementKey: string): Promise<boolean> {
  console.log('[COMPLIANCE PLACEHOLDER] checkComplianceEntitlement', { entitlementKey });
  const basicEntitlements = ['staff_privacy_notice', 'workplace_monitoring_policy', 'basic_audit_logs', 'basic_retention'];
  const allEntitlements = [...basicEntitlements, 'advanced_audit_logs', 'dpia_support', 'data_processing_agreement', 'data_retention_controls', 'staff_data_access', 'anonymous_occupancy_mode', 'named_tracking', 'location_checkin', 'probe_data'];
  return allEntitlements.includes(entitlementKey);
}

export async function checkUserPermission(action: string, companyId: string): Promise<boolean> {
  console.log('[COMPLIANCE PLACEHOLDER] checkUserPermission', { action, companyId });
  return true;
}

export function createAuditLog(data: { companyId: string; userId: string; action: string; targetType: string; targetId: string; severity: string; metadata: Record<string, unknown> }): void {
  console.log('[COMPLIANCE PLACEHOLDER] createAuditLog', data);
}