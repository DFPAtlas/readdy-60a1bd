## 2. Page Structure
- `/` — Landing page (split-screen hero, interactive office image, features overview, how it works preview, pricing preview, privacy section, enterprise section, CTA, testimonials, footer)
- `/features` — Full Features page with 5 feature groups (Desk Management, Site & Floor Management, Analytics & AI, Privacy & Compliance, Enterprise Integrations)
- `/how-it-works` — How It Works page with 7-step timeline, flow diagram, and 4 role-based journeys
- `/pricing` — Pricing page with 4 plans (Basic, Professional, Intelligence, Enterprise), live pricing calculator with limit warnings, AI credit wallet section, data-flow add-ons, FAQ
- `/solutions` — Solutions page with 6 customer types (Hybrid Offices, Facilities Managers, Office Managers, Multi-Site, Enterprise, Workplace Intelligence)
- `/security` — Security & Privacy page with 10 privacy features and enterprise data controls
- `/enterprise` — Enterprise page with 15 enterprise features, architecture diagram, and connected systems note
- `/book-demo` — Book Demo page with form and side panel
- `/contact` — Contact page with form and department contact cards
- `/login` — Login page (split screen, role-based routing, SSO/TOTP/magic link placeholders, remember me)
- `/signup` — 5-step signup wizard (User Details → Company → Workplace Estimate → Plan Selection → Checkout Review) with plan recommendation engine
- `/forgot-password` — Forgot password page with email input and inbox confirmation
- `/reset-password` — Reset password page with token-based password update
- `/onboarding` — 8-step onboarding wizard (Company Profile → First Site → Buildings & Floors → Hot Desk Areas → Desk Setup → Staff Invite → Privacy & Policy → Review & Launch)
- `/accept-invite` — Staff invite acceptance page with pre-filled email and required policy acceptance
- `/staff` — Staff portal entry page (mobile-first, bottom nav, quick-action cards)
- `/staff/check-in` — Staff desk check-in
- `/staff/find-desk` — Find available desk
- `/staff/current-desk` — Current desk view
- `/staff/history` — Check-in history
- `/staff/issues` — Desk issue reporting
- `/staff/my-data` — Staff My Data page (current status, check-in history, issue reports, privacy summary, download/request actions)
- `/staff/privacy` — Staff Privacy page (privacy notice, monitoring policy summary, data collected list, acknowledge flow)
- `/setup` — Installer setup (checklist, site selection, tag assignment, floorplan upload)
- `/dashboard` — Client dashboard shell (sidebar, top bar, breadcrumbs, company switcher, notifications, profile menu)
- `/dashboard/sites` — Sites page (table/card views, search, status filters, add/edit drawer, entitlement checks)
- `/dashboard/buildings` — Buildings page (filterable table, site context, add/edit drawer)
- `/dashboard/floors` — Floors page (filterable table, building context, add/edit drawer)
- `/dashboard/areas` — Hot Desk Areas page (table with availability stats, add/edit drawer)
- `/dashboard/desks` — Desks page (full filter table by status/type, search, actions: view/edit/tag/archive)
- `/dashboard/desks/new` — Add Desk page (3-tab: Manual, Bulk Create with preview, CSV Upload placeholder)
- `/dashboard/tags` — Desk Tags page (table, assign modal, actions by status: assign/copy URL/print/disable/replace)
- `/dashboard/live-status` — Live Desk Status (3 views: cards/table/grid, 5 stat cards, multi-level filters, colored dots)
- `/dashboard/check-ins` — Check-Ins history (table, anonymous mode toggle, CSV export placeholder, privacy note)
- `/dashboard/issues` — Desk Issues dashboard (table, priority/status badges, detail drawer with resolve/close actions)
- `/dashboard/billing` — Client Billing Dashboard (subscription, AI wallet, usage, invoices, add-ons)
- `/dashboard/staff` through `/dashboard/settings` — remaining dashboard placeholders
- `/dashboard/compliance` — Privacy & Compliance overview (10 status cards, readiness checklist with score)
- `/dashboard/compliance/privacy-notices` — Staff Privacy Notice editor (7 editable sections, data collection toggles, publish workflow)
- `/dashboard/compliance/workplace-monitoring-policy` — Workplace Monitoring Policy editor (9 editable sections, publish with versioning)
- `/dashboard/compliance/data-processing-agreement` — DPA support page (9 sections, status tracking, review workflow)
- `/dashboard/compliance/dpia` — DPIA Support page (6 assessment cards by feature, risk level badges, assessment form)
- `/dashboard/compliance/data-retention` — Data Retention Settings (9 data categories with per-category period selectors, confirmation modal)
- `/dashboard/compliance/tracking-controls` — Tracking Controls (6 toggle settings, named tracking confirmation gate, signage checklist)
- `/dashboard/compliance/audit-logs` — Client Audit Logs (filterable table with 7 filters, detail slide-out drawer)
- `/dashboard/compliance/staff-data-requests` — Staff Data Requests dashboard (filterable table, detail drawer with notes)
- `/admin` — Platform admin shell (dark sidebar, company search, system health badge, admin profile)
- `/admin/companies` through `/admin/settings` — 11 admin section placeholders
- `/admin/billing` — Platform Admin Billing Dashboard
- `/admin/audit-logs` — Platform Admin Audit Logs (cross-company, stat cards, same filter + detail pattern)
- `/admin/compliance` — Platform Admin Compliance (company readiness table, platform privacy features grid)
- `/legal/privacy-policy` — Privacy Policy placeholder
- `/legal/terms` — Terms of Use placeholder
- `/legal/workplace-monitoring` — Workplace Monitoring Policy placeholder
- `/legal/data-processing` — Data Processing Agreement placeholder
- `/legal/dpia` — DPIA Support placeholder
- `*` — 404 Not Found

## 3. Current Phase: Phase 1 — Complete Public Website + Auth & Billing + Desk Management System

All public website pages built. Billing system foundation (pricing, Stripe placeholders, AI credit wallet, entitlement system, client & admin billing dashboards) in place. Account signup, login, onboarding wizard, role system, and portal shells built. Core desk management system now fully built: sites, buildings, floors, hot desk areas, desks, QR/NFC tags, staff check-in/check-out, desk issue reporting, live status, and check-in history.

## 4. Next Phase: Phase 2 — Supabase Connection
- Goal: Connect Supabase Auth for real login/signup, database for storing all workspace data (sites, buildings, floors, areas, desks, tags, check-ins, issues)
- Requires: Supabase connection

## 5. Core Features
- [x] Full public website with 14+ pages
- [x] Consistent shared navigation (Navbar + Footer)
- [x] Pricing page with live calculator, plan limit warnings, AI credits, data-flow add-ons, FAQ
- [x] Client Billing Dashboard (subscription, AI wallet, usage, invoices, add-ons)
- [x] Platform Admin Billing Dashboard (MRR, client table, failed payments, webhooks, overrides)
- [x] Entitlement system (plan defaults, company overrides, feature flags, limit checks)
- [x] Stripe integration placeholders (checkout, webhooks, customer portal, billing)
- [x] AI credit wallet service (top-up packs, deduction, usage logging, low-credit warnings)
- [x] Audit log service placeholders
- [x] Form handling (Book Demo, Contact, Newsletter)
- [x] Login page (split-screen, role-based routing, SSO/TOTP/magic link placeholders)
- [x] 5-step signup wizard with plan recommendation engine
- [x] 8-step onboarding wizard (company → sites → buildings → areas → desks → staff → privacy → launch)
- [x] 9 user roles defined (Platform Admin, Company Owner, Company Admin, Billing Admin, Site Manager, Floor Manager, Staff, Installer, Auditor)
- [x] Role-based portal routing (9 role→route mappings)
- [x] Client Dashboard shell (sidebar, breadcrumbs, notifications, company switcher)
- [x] Platform Admin shell (dark sidebar, company search, system health)
- [x] Staff portal (mobile-first, bottom nav, quick-action cards)
- [x] Installer setup (checklist, tag assignment, floorplan upload)
- [x] Staff invite acceptance flow
- [x] Privacy & policy setup step in onboarding (named tracking/Probe-WiFi/location disabled by default)
- [x] Account status states (pending email verification, pending checkout, trial, active, payment failed, suspended, cancelled, enterprise pending, demo)
- [x] Email template placeholders (10 templates)
- [x] Auth service placeholders (17 functions)
- [x] Workspace service placeholders (30+ functions: sites, buildings, floors, areas, desks, tags, checkins, issues, permissions)
- [x] Sites page (table/card views, search, status filters, add/edit drawer with entitlement checks)
- [x] Buildings page (filterable table, site context, add/edit drawer)
- [x] Floors page (filterable table, building context, add/edit drawer)
- [x] Hot Desk Areas page (table with availability stats, add/edit drawer)
- [x] Desks page (full filter table by status/type, search, actions: view/edit/tag/archive)
- [x] Add Desk page (3-tab: Manual, Bulk Create with preview, CSV Upload placeholder)
- [x] Desk Tags page (table, assign modal, per-status actions: assign/copy URL/print/disable/replace)
- [x] Staff Desk Check-In page (QR scan simulation, manual code entry, occupied/maintenance states, check-out flow)
- [x] Staff Find Desk page (card/list views, multi-filter, available-only toggle, accessibility filter)
- [x] Staff Current Desk page (active check-in display with duration, check-out, issue report link)
- [x] Staff Issue Reporting page (issue type, priority, description form with counter, submission tracking)
- [x] Live Desk Status dashboard (cards/table/grid views, 5 stat cards, colored dot status, multi-level filters)
- [x] Check-Ins dashboard (filterable history table, anonymous mode toggle, CSV export placeholder, privacy note)
- [x] Desk Issues dashboard (filterable table, priority/status badges, detail drawer with resolve/close actions)
- [x] Desk management mock data (3 sites, 3 buildings, 6 floors, 9 areas, 20 desks, 11 tags, 8 check-ins, 4 issues)
- [x] Workspace data model placeholders (9 tables planned: sites, buildings, floors, hot_desk_areas, desks, desk_tags, desk_checkins, desk_issues)
- [x] Floorplan module with upload, visual editor (drag-and-drop desk placement), live view, staff map views
- [x] Floorplan data model placeholders (floorplans, floorplan_desk_positions, floorplan_versions)
- [x] Floorplan service placeholders (25+ functions: upload, CRUD, position management, live status, entitlement checks)
- [x] Privacy & Compliance module — Staff Privacy Notice editor with editable sections and publish workflow
- [x] Workplace Monitoring Policy editor with 9 sections and versioning
- [x] Data Processing Agreement support page with status tracking
- [x] DPIA Support page with 6 feature assessments and risk level badges
- [x] Data Retention Settings with 9 configurable data categories
- [x] Tracking Controls — named tracking disabled by default, confirmation gates for sensitive features
- [x] Client Audit Logs with 7 filter types, detail drawer, and severity badges
- [x] Platform Admin Audit Logs with cross-company view and stat cards
- [x] Staff My Data page — check-in history, issue reports, privacy summary, data download placeholder
- [x] Staff Privacy page — notice display, acknowledge flow, monitoring policy summary
- [x] Staff Data Requests dashboard with filterable table, detail drawer, and notes system
- [x] Platform Admin Compliance overview with company readiness table
- [x] Compliance data model placeholders (privacy_notices, monitoring_policies, DPA, DPIA, retention, tracking, audit_logs, staff_data_requests)
- [x] Compliance service placeholders (25+ functions)
- [ ] User authentication (real login / signup with Supabase)
- [ ] Real-time workspace occupancy dashboard
- [ ] Desk reservation and booking system
- [ ] AI-powered usage analytics and optimization suggestions

## 6. Data Model Design — Auth, Billing & Entitlements
(To be implemented when Supabase is connected)

### Auth & User Tables (planned)
- `users` — User accounts with roles, company association, account state
- `companies` — Company profiles with settings, contacts, timezone
- `user_roles` — Role assignments per user per company
- `staff_invites` — Pending staff invitations with tokens
- `password_reset_tokens` — Password reset tokens with expiry
- `email_verification_tokens` — Email verification tokens

### Billing Tables (planned)
- `subscription_plans` — Plan definitions with limits and price config
- `plan_entitlements` — Feature flags per plan
- `company_entitlements` — Per-company entitlement overrides
- `company_subscriptions` — Active subscriptions per company
- `stripe_customers` — Stripe customer ID mapping
- `stripe_subscriptions` — Stripe subscription sync
- `stripe_prices` — Stripe price ID mapping
- `stripe_webhook_events` — Incoming webhook event log
- `billing_events` — Internal billing event audit trail
- `invoices` — Generated invoices
- `payment_failures` — Failed payment tracking
- `ai_credit_wallets` — Per-company AI credit balances
- `ai_credit_transactions` — Credit top-up/deduction history
- `ai_usage_logs` — Token-level AI usage tracking
- `company_usage_snapshots` — Monthly usage snapshots for billing
- `desk_usage_billing_snapshots` — Per-desk billing data
- `addon_subscriptions` — Active add-on subscriptions

### Workspace Tables (planned)
- `sites` — Physical office locations
- `buildings` — Buildings within sites
- `floors` — Floors within buildings
- `hot_desk_areas` — Desk zones/areas
- `desks` — Individual desk records with QR/NFC tag mappings
- `desk_check_ins` — Check-in/check-out records
- `desk_issues` — Maintenance and issue reports
- `floorplans` — Uploaded floorplan images with site/building/floor mappings and view permissions
- `floorplan_desk_positions` — X/Y position, rotation, label/staff visibility per desk per floorplan
- `floorplan_versions` — Version history tracking for uploaded floorplan files
- `privacy_settings` — Per-company privacy configuration
- `privacy_notices` — Staff privacy notice versions with publish/acknowledge workflow
- `privacy_notice_acknowledgements` — Staff acknowledgement records per notice version
- `workplace_monitoring_policies` — Workplace monitoring policy versions
- `data_retention_settings` — Per-category data retention period configuration
- `tracking_settings` — Privacy toggles (anonymous mode, named tracking, staff access, location, probe, signage)
- `dpia_assessments` — Data Protection Impact Assessments per feature
- `audit_logs` — Immutable audit trail for all sensitive actions across the platform
- `staff_data_requests` — Staff data access/correction/deletion/privacy requests with notes

## 7. Backend / Third-party Integration Plan
- **Supabase**: Required for user authentication, database storage, and real-time subscriptions. Will be connected in Phase 2.
- **Stripe**: For subscription payments — checkout sessions, webhooks, customer portal. Placeholder services ready.
- **Shopify**: Not needed