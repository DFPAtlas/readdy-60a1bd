export const complianceOverviewCards = [
  { id: 'staff-privacy-notice', title: 'Staff Privacy Notice', description: 'Define what data is collected, why, who can access it, and how long it is kept.', icon: 'ri-file-text-line', status: 'active', statusLabel: 'Active', href: '/dashboard/compliance/privacy-notices' },
  { id: 'workplace-monitoring-policy', title: 'Workplace Monitoring Policy', description: 'Define how HotDesk Hub is used for workplace monitoring and occupancy management.', icon: 'ri-survey-line', status: 'active', statusLabel: 'Active', href: '/dashboard/compliance/workplace-monitoring-policy' },
  { id: 'data-processing-agreement', title: 'Data Processing Agreement', description: 'Manage controller details, processing purposes, and data categories.', icon: 'ri-file-copy-line', status: 'needs_review', statusLabel: 'Needs Review', href: '/dashboard/compliance/data-processing-agreement' },
  { id: 'dpia-support', title: 'DPIA Support', description: 'Assess privacy risks before enabling advanced workplace monitoring features.', icon: 'ri-alert-line', status: 'draft', statusLabel: 'Draft', href: '/dashboard/compliance/dpia' },
  { id: 'data-retention', title: 'Data Retention', description: 'Define how long workplace data is stored before deletion.', icon: 'ri-time-line', status: 'active', statusLabel: 'Active', href: '/dashboard/compliance/data-retention' },
  { id: 'anonymous-occupancy', title: 'Anonymous Occupancy Mode', description: 'Show occupancy without revealing staff names in reports.', icon: 'ri-eye-off-line', status: 'active', statusLabel: 'Enabled', href: '/dashboard/compliance/tracking-controls' },
  { id: 'named-tracking', title: 'Named Tracking', description: 'Track which staff member used a desk or area.', icon: 'ri-user-search-line', status: 'disabled', statusLabel: 'Disabled', href: '/dashboard/compliance/tracking-controls' },
  { id: 'staff-data-access', title: 'Staff Data Access', description: 'Allow staff to view their own check-in history and workplace data.', icon: 'ri-shield-user-line', status: 'active', statusLabel: 'Enabled', href: '/dashboard/compliance/tracking-controls' },
  { id: 'audit-logs', title: 'Audit Logs', description: 'Review all sensitive actions across your workplace.', icon: 'ri-file-list-3-line', status: 'active', statusLabel: 'Enabled', href: '/dashboard/compliance/audit-logs' },
  { id: 'signage-reminders', title: 'Signage Reminders', description: 'Reminders for physical signage when location or probe analytics are enabled.', icon: 'ri-signpost-line', status: 'not_started', statusLabel: 'Not Started', href: '/dashboard/compliance/tracking-controls' },
];

export const complianceChecklistItems = [
  { id: 'check-1', label: 'Staff privacy notice enabled', done: true },
  { id: 'check-2', label: 'Workplace monitoring policy configured', done: true },
  { id: 'check-3', label: 'Data retention period selected', done: true },
  { id: 'check-4', label: 'Anonymous occupancy mode selected', done: true },
  { id: 'check-5', label: 'Named tracking reviewed', done: true },
  { id: 'check-6', label: 'Staff data access enabled', done: true },
  { id: 'check-7', label: 'Audit logs enabled', done: true },
  { id: 'check-8', label: 'Signage reminder reviewed', done: false },
  { id: 'check-9', label: 'DPIA started if advanced tracking is enabled', done: false },
  { id: 'check-10', label: 'Data Processing Agreement reviewed', done: false },
];

export const privacyNoticeContent = {
  id: 'notice_v1',
  title: 'Staff Privacy Notice',
  version: 1,
  status: 'active',
  publishedAt: '2026-06-15T10:30:00Z',
  publishedBy: 'Sarah Chen',
  lastUpdated: '2026-06-15T10:30:00Z',
  sections: {
    whatIsCollected: {
      title: '1. What Data Is Collected',
      content: 'HotDesk Hub collects the following workplace data to manage desk availability and occupancy:\n\n• Desk check-in and check-out records — which desk you used, when you checked in, and when you checked out\n• Desk issue reports — any maintenance or equipment issues you report\n• Desk booking records — if booking features are enabled\n• Floorplan desk activity — your desk location on office floorplans where applicable',
      dataCollectionOptions: [
        { key: 'desk_checkin', label: 'Desk check-in records', enabled: true },
        { key: 'desk_checkout', label: 'Desk check-out records', enabled: true },
        { key: 'desk_issues', label: 'Desk issue reports', enabled: true },
        { key: 'desk_booking', label: 'Desk booking records', enabled: false },
        { key: 'floorplan_activity', label: 'Floorplan desk activity', enabled: true },
        { key: 'location_checkin', label: 'Location check-in', enabled: false },
        { key: 'probe_wifi', label: 'Probe/Wi-Fi analytics', enabled: false },
        { key: 'sensor_data', label: 'Sensor data', enabled: false },
      ],
    },
    whyCollected: {
      title: '2. Why Data Is Collected',
      content: 'Your workplace collects desk usage data to:\n\n• Help you and your colleagues find available desks quickly\n• Manage office capacity and space planning\n• Maintain desk equipment and report issues\n• Ensure a safe and efficient working environment\n• Provide occupancy insights to workplace managers',
    },
    whoCanAccess: {
      title: '3. Who Can Access the Data',
      content: 'Access to desk usage data is role-based:\n\n• You can always view your own check-in history and data\n• Site managers can view desk activity for their assigned sites\n• Floor managers can view activity for their assigned floors and areas\n• Company administrators can view aggregated reports\n• Anonymous occupancy mode can be enabled to hide individual names in reports\n• Named tracking is only enabled when explicitly approved by your organisation',
    },
    howLongKept: {
      title: '4. How Long Data Is Kept',
      content: 'Desk check-in records are retained according to your organisation\'s data retention settings. Current retention period: 180 days. After this period, records are automatically deleted. You can request access to your data or ask questions by using the My Data page in the staff portal.',
    },
    staffRights: {
      title: '5. Staff Rights and Access',
      content: 'As a staff member, you have the right to:\n\n• Access your own check-in history at any time via the My Data page\n• Know what data is collected and why\n• Ask questions about how your data is used\n• Request correction of inaccurate data\n• Know who in your organisation can see your desk activity\n\nContact your company administrator if you have any questions about data handling.',
    },
    contact: {
      title: '6. Contact Person',
      content: 'For questions about this privacy notice or your workplace data, contact:\n\nSarah Chen — Workplace Operations Manager\nEmail: sarah.chen@acmecorp.com',
    },
    lastUpdatedInfo: {
      title: '7. Last Updated',
      content: 'This notice was last updated on 15 June 2026. Staff will be notified when significant changes are made.',
    },
  },
};

export const workplaceMonitoringPolicyContent = {
  id: 'policy_v2',
  version: 2,
  status: 'active',
  publishedAt: '2026-05-20T14:00:00Z',
  publishedBy: 'Sarah Chen',
  sections: {
    purpose: {
      title: 'Purpose of Monitoring',
      content: 'HotDesk Hub is used at Acme Corp to manage flexible desk usage and optimise office space. The system helps staff find available desks, enables efficient space planning, and supports facility management decisions. Monitoring data is used for occupancy analysis and workspace improvement — not for individual performance tracking.',
    },
    systemsUsed: {
      title: 'Systems Used',
      content: 'Acme Corp uses HotDesk Hub for:\n\n• QR and NFC-based desk check-in and check-out\n• Desk availability tracking\n• Floorplan-based desk maps\n• Occupancy reporting\n\nNo additional monitoring systems (CCTV integration, sensors, or Wi-Fi analytics) are currently enabled.',
    },
    dataCollected: {
      title: 'Data Collected',
      content: 'The system collects:\n\n• Staff desk check-in and check-out timestamps\n• Desk selection and location within the office\n• Desk issue and maintenance reports\n\nOnly the minimum data needed for workspace management is collected.',
    },
    whoCanAccessReports: {
      title: 'Who Can Access Reports',
      content: 'Occupancy reports are available to:\n\n• Company administrators (aggregated data)\n• Site managers (for their assigned sites)\n• Floor managers (for their assigned floors)\n\nStaff names are hidden in reports when anonymous occupancy mode is enabled. Individual check-in data is only visible to the staff member and authorised managers with a legitimate business need.',
    },
    namedTracking: {
      title: 'Named Tracking Status',
      content: 'Named tracking is currently disabled. All occupancy reports use anonymous data by default. Staff identities are only linked to check-in records for desk management purposes, such as finding who is at a desk for urgent matters. This setting is reviewed regularly.',
    },
    anonymousMode: {
      title: 'Anonymous Occupancy Mode',
      content: 'Anonymous occupancy mode is enabled. This means desk reports and live status views do not show individual staff names by default. Managers see aggregated counts rather than named lists.',
    },
    retention: {
      title: 'Data Retention',
      content: 'Check-in records are retained for 180 days. After this period, records are automatically deleted. Retention settings are reviewed annually.',
    },
    questions: {
      title: 'How to Ask Questions',
      content: 'Staff members can:\n\n• View their own data via the My Data page in the staff portal\n• Contact their manager or company admin with questions\n• Submit a formal data request through the privacy settings page\n\nAll questions will be responded to within 14 working days.',
    },
    reviewDate: {
      title: 'Review Date',
      content: 'This policy is scheduled for review on 20 November 2026.',
    },
  },
};

export const dataProcessingAgreement = {
  status: 'needs_review',
  statusLabel: 'Needs Review',
  reviewedAt: null,
  reviewedBy: null,
  sections: {
    controller: { title: 'Controller Details', content: 'Acme Corp is the data controller for all workplace data processed through HotDesk Hub. Controller contact: Data Protection Officer, Acme Corp, 123 Innovation Drive, London EC2A 1NT, United Kingdom.' },
    processor: { title: 'Processor Details', content: 'HotDesk Hub (operated by HotDesk Technologies Ltd) acts as the data processor. Processor contact details will be provided in the full DPA.' },
    purpose: { title: 'Processing Purpose', content: 'Processing is limited to desk management, occupancy analytics, workplace space optimisation, and facility management as described in the Workplace Monitoring Policy.' },
    categories: { title: 'Categories of Data', content: 'Personal data processed includes: staff names, work email addresses, desk check-in/check-out timestamps, desk location within buildings, and desk issue reports.' },
    users: { title: 'Categories of Users', content: 'Data subjects are employees and authorised visitors of Acme Corp who use hot desk facilities managed through HotDesk Hub.' },
    subprocessors: { title: 'Subprocessors', content: 'Subprocessor information will be provided in the full DPA. HotDesk Hub uses cloud infrastructure providers for data hosting and processing.' },
    security: { title: 'Security Measures', content: 'Security measures include encryption at rest and in transit, role-based access controls, audit logging, and regular security reviews.' },
    retention: { title: 'Retention Summary', content: 'Data is retained for 180 days as configured in Data Retention Settings. After this period, records are automatically deleted.' },
    contact: { title: 'Contact Details', content: 'For DPA-related enquiries, contact the Data Protection Officer at dpo@acmecorp.com.' },
  },
};

export const dpiaAssessments = [
  { id: 'dpia-1', featureKey: 'qr_nfc_checkin', featureName: 'QR/NFC Desk Check-In', riskLevel: 'low', riskLabel: 'Low Risk', enabled: true, status: 'completed', statusLabel: 'Completed', assessmentDate: '2026-04-10' },
  { id: 'dpia-2', featureKey: 'named_reports', featureName: 'Named Check-In Reports', riskLevel: 'medium', riskLabel: 'Medium Risk', enabled: false, status: 'not_started', statusLabel: 'Not Started', assessmentDate: null },
  { id: 'dpia-3', featureKey: 'location_checkin', featureName: 'Location Check-In', riskLevel: 'medium', riskLabel: 'Medium Risk', enabled: false, status: 'not_required', statusLabel: 'Not Required (Disabled)', assessmentDate: null },
  { id: 'dpia-4', featureKey: 'probe_wifi', featureName: 'Probe/Wi-Fi Analytics', riskLevel: 'high', riskLabel: 'High Risk', enabled: false, status: 'not_required', statusLabel: 'Not Required (Disabled)', assessmentDate: null },
  { id: 'dpia-5', featureKey: 'sensors_live', featureName: 'Sensors / Live Data', riskLevel: 'high', riskLabel: 'High Risk', enabled: false, status: 'not_required', statusLabel: 'Not Required (Disabled)', assessmentDate: null },
  { id: 'dpia-6', featureKey: 'cctv_access', featureName: 'CCTV / Access Control Integrations', riskLevel: 'high', riskLabel: 'High Risk', enabled: false, status: 'not_required', statusLabel: 'Not Required (Disabled)', assessmentDate: null },
];

export const riskLevelOptions = ['low', 'medium', 'high'];

export const dpiaDecisionOptions = ['approved', 'approved with controls', 'not approved', 'needs more review'];

export const dpiaStatusOptions = ['not required', 'not started', 'in progress', 'completed', 'needs review'];

export const retentionCategories = [
  { key: 'desk_checkins', label: 'Desk check-in records', currentPeriod: '180', currentLabel: '180 days', description: 'Records of when staff check into and out of desks.' },
  { key: 'desk_checkouts', label: 'Desk check-out records', currentPeriod: '180', currentLabel: '180 days', description: 'Check-out timestamps and duration data.' },
  { key: 'desk_issues', label: 'Desk issue reports', currentPeriod: '365', currentLabel: '1 year', description: 'Maintenance and equipment issue reports.' },
  { key: 'desk_bookings', label: 'Desk booking records', currentPeriod: '90', currentLabel: '90 days', description: 'Future desk reservation records.' },
  { key: 'staff_invites', label: 'Staff invite records', currentPeriod: '365', currentLabel: '1 year', description: 'Records of staff invitations and acceptance.' },
  { key: 'audit_logs', label: 'Audit logs', currentPeriod: '365', currentLabel: '1 year', description: 'System audit trail for sensitive actions.' },
  { key: 'ai_usage', label: 'AI usage logs', currentPeriod: '90', currentLabel: '90 days', description: 'AI analytics usage and prompt logs.' },
  { key: 'location_checkin', label: 'Location check-in records', currentPeriod: '90', currentLabel: '90 days', description: 'Location-based check-in data.' },
  { key: 'probe_wifi', label: 'Probe/Wi-Fi analytics records', currentPeriod: '30', currentLabel: '30 days', description: 'Wi-Fi and probe-based occupancy data.' },
];

export const retentionPeriodOptions = [
  { value: '30', label: '30 days' },
  { value: '90', label: '90 days' },
  { value: '180', label: '180 days' },
  { value: '365', label: '1 year' },
  { value: '730', label: '2 years' },
  { value: 'custom', label: 'Custom' },
  { value: 'keep_until_deleted', label: 'Keep until deleted' },
];

export const trackingSettings = {
  anonymousOccupancyMode: true,
  namedTrackingEnabled: false,
  staffDataAccessEnabled: true,
  locationCheckinEnabled: false,
  probeWifiEnabled: false,
  signageReminderEnabled: false,
  lastUpdated: '2026-06-15T10:30:00Z',
  updatedBy: 'Sarah Chen',
};

export const signageChecklist = [
  { id: 'sign-1', label: 'Staff notice updated', done: false },
  { id: 'sign-2', label: 'Workplace monitoring policy updated', done: false },
  { id: 'sign-3', label: 'Signage prepared for office areas', done: false },
  { id: 'sign-4', label: 'DPIA reviewed and approved', done: false },
  { id: 'sign-5', label: 'Manager access limited to authorised personnel', done: false },
];

export const clientAuditLogs = [
  { id: 'audit-1', eventType: 'login', user: 'Sarah Chen', role: 'company_admin', company: 'Acme Corp', site: null, action: 'User logged in', targetType: 'auth', targetId: 'user_sarah', severity: 'info', timestamp: '2026-07-09T08:15:22Z', metadata: { ip: '192.168.1.100', browser: 'Chrome 126' } },
  { id: 'audit-2', eventType: 'check-in', user: 'James Wilson', role: 'staff_user', company: 'Acme Corp', site: 'King\'s Cross HQ', action: 'Checked into desk A-012', targetType: 'desk_checkin', targetId: 'desk_a012', severity: 'info', timestamp: '2026-07-09T08:22:45Z', metadata: { desk: 'A-012', floor: 'Ground Floor' } },
  { id: 'audit-3', eventType: 'desk_created', user: 'Sarah Chen', role: 'company_admin', company: 'Acme Corp', site: 'King\'s Cross HQ', action: 'Created desk B-025', targetType: 'desk', targetId: 'desk_b025', severity: 'info', timestamp: '2026-07-09T07:50:00Z', metadata: { deskType: 'standard desk', area: 'Engineering Zone' } },
  { id: 'audit-4', eventType: 'tag_assigned', user: 'Mike Turner', role: 'installer', company: 'Acme Corp', site: 'King\'s Cross HQ', action: 'Assigned NFC tag T-045 to desk A-008', targetType: 'desk_tag', targetId: 'tag_t045', severity: 'info', timestamp: '2026-07-08T16:30:00Z', metadata: { tagType: 'NFC', desk: 'A-008' } },
  { id: 'audit-5', eventType: 'privacy_changed', user: 'Sarah Chen', role: 'company_admin', company: 'Acme Corp', site: null, action: 'Published Staff Privacy Notice v2', targetType: 'privacy_notice', targetId: 'notice_v2', severity: 'warning', timestamp: '2026-07-08T14:00:00Z', metadata: { version: 2, publishedBy: 'Sarah Chen' } },
  { id: 'audit-6', eventType: 'failed_login', user: null, role: null, company: 'Acme Corp', site: null, action: 'Failed login attempt for david.lee@acmecorp.com', targetType: 'auth', targetId: 'auth_failed_01', severity: 'warning', timestamp: '2026-07-08T12:45:30Z', metadata: { ip: '192.168.1.150', reason: 'Invalid password' } },
  { id: 'audit-7', eventType: 'manual_checkout', user: 'Sarah Chen', role: 'company_admin', company: 'Acme Corp', site: 'King\'s Cross HQ', action: 'Manual check-out of desk C-003 — user Emily Park', targetType: 'desk_checkin', targetId: 'checkin_045', severity: 'warning', timestamp: '2026-07-08T11:20:00Z', metadata: { desk: 'C-003', checkedOutUser: 'Emily Park', reason: 'Staff forgot to check out' } },
  { id: 'audit-8', eventType: 'retention_changed', user: 'Sarah Chen', role: 'company_admin', company: 'Acme Corp', site: null, action: 'Changed desk check-in retention from 90 to 180 days', targetType: 'retention_setting', targetId: 'retention_desk_checkins', severity: 'warning', timestamp: '2026-07-07T09:00:00Z', metadata: { oldValue: '90', newValue: '180' } },
  { id: 'audit-9', eventType: 'issue_updated', user: 'James Wilson', role: 'staff_user', company: 'Acme Corp', site: 'King\'s Cross HQ', action: 'Reported desk issue: Broken chair at desk B-012', targetType: 'desk_issue', targetId: 'issue_012', severity: 'info', timestamp: '2026-07-07T10:15:00Z', metadata: { desk: 'B-012', issueType: 'broken_chair' } },
  { id: 'audit-10', eventType: 'policy_published', user: 'Sarah Chen', role: 'company_admin', company: 'Acme Corp', site: null, action: 'Published Workplace Monitoring Policy v2', targetType: 'monitoring_policy', targetId: 'policy_v2', severity: 'info', timestamp: '2026-07-06T15:45:00Z', metadata: { version: 2 } },
  { id: 'audit-11', eventType: 'site_created', user: 'Sarah Chen', role: 'company_admin', company: 'Acme Corp', site: 'East Wing', action: 'Created new site: East Wing', targetType: 'site', targetId: 'site_east_wing', severity: 'info', timestamp: '2026-07-06T13:00:00Z', metadata: { address: '45 East Road, London E2 8PT' } },
  { id: 'audit-12', eventType: 'billing_changed', user: 'Sarah Chen', role: 'company_admin', company: 'Acme Corp', site: null, action: 'Upgraded plan from Professional to Intelligence', targetType: 'subscription', targetId: 'sub_acme', severity: 'critical', timestamp: '2026-07-05T11:30:00Z', metadata: { oldPlan: 'professional', newPlan: 'intelligence' } },
];

export const eventTypeOptions = ['login', 'logout', 'failed_login', 'company_updated', 'site_created', 'desk_created', 'desk_archived', 'tag_assigned', 'checkin_created', 'manual_checkout', 'issue_updated', 'privacy_changed', 'policy_published', 'retention_changed', 'named_tracking', 'probe_wifi_setting', 'entitlement_changed', 'billing_changed', 'ai_credits_adjusted'];

export const severityOptions = ['info', 'warning', 'critical'];

export const staffMyData = {
  currentDesk: { name: 'A-012', code: 'A-012', site: 'King\'s Cross HQ', building: 'KWH Main Building', floor: 'Ground Floor', area: 'Engineering Zone', type: 'standing desk', checkedInAt: '2026-07-09T08:22:45Z', status: 'occupied' },
  assignedSite: 'King\'s Cross HQ',
  assignedRole: 'staff_user',
  privacyNoticeAccepted: true,
  privacyNoticeVersion: 1,
  privacyNoticeAcceptedAt: '2026-06-20T09:00:00Z',
  checkInHistory: [
    { id: 'hist-1', desk: 'A-012', site: 'King\'s Cross HQ', floor: 'Ground Floor', area: 'Engineering Zone', checkedInAt: '2026-07-09T08:22:45Z', checkedOutAt: null, duration: 'Active' },
    { id: 'hist-2', desk: 'B-007', site: 'King\'s Cross HQ', floor: 'First Floor', area: 'Quiet Work Area', checkedInAt: '2026-07-08T08:30:00Z', checkedOutAt: '2026-07-08T17:15:00Z', duration: '8h 45m' },
    { id: 'hist-3', desk: 'A-012', site: 'King\'s Cross HQ', floor: 'Ground Floor', area: 'Engineering Zone', checkedInAt: '2026-07-07T08:45:00Z', checkedOutAt: '2026-07-07T16:30:00Z', duration: '7h 45m' },
    { id: 'hist-4', desk: 'C-003', site: 'King\'s Cross HQ', floor: 'First Floor', area: 'Sales Zone', checkedInAt: '2026-07-06T09:00:00Z', checkedOutAt: '2026-07-06T17:00:00Z', duration: '8h 0m' },
    { id: 'hist-5', desk: 'A-012', site: 'King\'s Cross HQ', floor: 'Ground Floor', area: 'Engineering Zone', checkedInAt: '2026-07-05T08:15:00Z', checkedOutAt: '2026-07-05T17:30:00Z', duration: '9h 15m' },
  ],
  issueReports: [
    { id: 'issue-1', type: 'Broken chair', desk: 'B-012', status: 'in_progress', statusLabel: 'In Progress', createdAt: '2026-07-07T10:15:00Z', resolvedAt: null },
    { id: 'issue-2', type: 'Power issue', desk: 'C-005', status: 'resolved', statusLabel: 'Resolved', createdAt: '2026-06-28T14:20:00Z', resolvedAt: '2026-06-29T09:00:00Z' },
  ],
  privacySummary: {
    noticeTitle: 'Staff Privacy Notice v1',
    monitoringPolicyTitle: 'Workplace Monitoring Policy v2',
    retentionPeriod: '180 days',
    dataCollected: ['Desk check-in records', 'Desk check-out records', 'Desk issue reports', 'Floorplan desk activity'],
    contactPerson: 'Sarah Chen — sarah.chen@acmecorp.com',
  },
};

export const staffDataRequests = [
  { id: 'req-1', staffName: 'Emily Park', staffEmail: 'emily.park@acmecorp.com', requestType: 'access_my_data', requestTypeLabel: 'Access My Data', status: 'new', statusLabel: 'New', message: 'I would like to request a full copy of my check-in history and all personal data stored in HotDesk Hub.', createdAt: '2026-07-09T07:30:00Z', assignedTo: null, notes: [] },
  { id: 'req-2', staffName: 'David Lee', staffEmail: 'david.lee@acmecorp.com', requestType: 'correct_data', requestTypeLabel: 'Correct My Data', status: 'in_review', statusLabel: 'In Review', message: 'My check-in record for 5 July shows I was at desk B-010, but I was actually at desk A-003. Please correct this.', createdAt: '2026-07-08T14:00:00Z', assignedTo: 'Sarah Chen', notes: ['Checked desk logs — system shows B-010 but building access log confirms David was on Ground Floor near A-003.', 'Awaiting confirmation from floor manager.'] },
  { id: 'req-3', staffName: 'Priya Sharma', staffEmail: 'priya.sharma@acmecorp.com', requestType: 'privacy_concern', requestTypeLabel: 'Privacy Concern', status: 'waiting_for_staff', statusLabel: 'Waiting for Staff', message: 'I noticed that my desk check-in times are visible to my team lead. Can you confirm who has access to this data and whether it can be restricted?', createdAt: '2026-07-07T11:00:00Z', assignedTo: 'Sarah Chen', notes: ['Responded: Only site managers and company admins can view individual check-in data. Anonymous mode is enabled for reports.', 'Asked Priya if she would like to discuss further.'] },
  { id: 'req-4', staffName: 'Tom Baker', staffEmail: 'tom.baker@acmecorp.com', requestType: 'question_monitoring', requestTypeLabel: 'Question About Monitoring', status: 'resolved', statusLabel: 'Resolved', message: 'Is HotDesk Hub tracking my location throughout the day or only when I check into a desk?', createdAt: '2026-07-05T09:45:00Z', assignedTo: 'Sarah Chen', notes: ['Responded: Location check-in is disabled. The system only records your desk assignment when you check in via QR/NFC. No continuous tracking is active.'] },
  { id: 'req-5', staffName: 'Lisa Wong', staffEmail: 'lisa.wong@acmecorp.com', requestType: 'delete_data', requestTypeLabel: 'Delete My Data', status: 'new', statusLabel: 'New', message: 'I am leaving the company next month and would like to understand how my desk usage data will be handled and when it will be deleted.', createdAt: '2026-07-09T06:00:00Z', assignedTo: null, notes: [] },
];

export const requestTypeOptions = [
  { value: 'access_my_data', label: 'Access My Data' },
  { value: 'correct_data', label: 'Correct My Data' },
  { value: 'delete_data', label: 'Delete My Data' },
  { value: 'question_monitoring', label: 'Question About Monitoring' },
  { value: 'privacy_concern', label: 'Privacy Concern' },
];

export const requestStatusOptions = [
  { value: 'new', label: 'New' },
  { value: 'in_review', label: 'In Review' },
  { value: 'waiting_for_staff', label: 'Waiting for Staff' },
  { value: 'resolved', label: 'Resolved' },
  { value: 'closed', label: 'Closed' },
];