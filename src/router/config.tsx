import type { RouteObject } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import Home from "@/pages/home/page";
import Features from "@/pages/features/page";
import HowItWorks from "@/pages/how-it-works/page";
import Pricing from "@/pages/pricing/page";
import Solutions from "@/pages/solutions/page";
import Security from "@/pages/security/page";
import Enterprise from "@/pages/enterprise/page";
import BookDemo from "@/pages/book-demo/page";
import Contact from "@/pages/contact/page";
import Login from "@/pages/login/page";
import Signup from "@/pages/signup/page";
import ForgotPassword from "@/pages/forgot-password/page";
import ResetPassword from "@/pages/reset-password/page";
import Onboarding from "@/pages/onboarding/page";
import AcceptInvite from "@/pages/accept-invite/page";
import StaffPortal from "@/pages/staff/page";
import StaffCheckIn from "@/pages/staff/CheckInPage";
import StaffFindDesk from "@/pages/staff/FindDeskPage";
import StaffCurrentDesk from "@/pages/staff/CurrentDeskPage";
import StaffIssuesPage from "@/pages/staff/StaffIssuesPage";
import InstallerSetup from "@/pages/setup/page";
import PrivacyPolicy from "@/pages/legal/privacy-policy/page";
import Terms from "@/pages/legal/terms/page";
import WorkplaceMonitoring from "@/pages/legal/workplace-monitoring/page";
import DataProcessing from "@/pages/legal/data-processing/page";
import Dpia from "@/pages/legal/dpia/page";
import Billing from "@/pages/billing/page";
import AdminBilling from "@/pages/admin/billing/page";
import DashboardShell from "@/pages/dashboard/Shell";
import AdminShell from "@/pages/admin/Shell";
import SitesPage from "@/pages/dashboard/SitesPage";
import BuildingsPage from "@/pages/dashboard/BuildingsPage";
import FloorsPage from "@/pages/dashboard/FloorsPage";
import HotDeskAreasPage from "@/pages/dashboard/HotDeskAreasPage";
import DesksPage from "@/pages/dashboard/DesksPage";
import AddDeskPage from "@/pages/dashboard/AddDeskPage";
import DeskTagsPage from "@/pages/dashboard/DeskTagsPage";
import LiveStatusPage from "@/pages/dashboard/LiveStatusPage";
import CheckInsPage from "@/pages/dashboard/CheckInsPage";
import IssuesDashboardPage from "@/pages/dashboard/IssuesPage";
import FloorplansPage from "@/pages/dashboard/FloorplansPage";
import UploadFloorplanPage from "@/pages/dashboard/UploadFloorplanPage";
import FloorplanDetailPage from "@/pages/dashboard/FloorplanDetailPage";
import FloorplanEditorPage from "@/pages/dashboard/FloorplanEditorPage";
import LiveFloorplanPage from "@/pages/dashboard/LiveFloorplanPage";
import StaffFloorplanPage from "@/pages/staff/StaffFloorplanPage";
import StaffFindDeskMapPage from "@/pages/staff/StaffFindDeskMapPage";
import StaffMyDataPage from "@/pages/staff/StaffMyDataPage";
import StaffPrivacyPage from "@/pages/staff/StaffPrivacyPage";
import ComplianceOverviewPage from "@/pages/dashboard/ComplianceOverviewPage";
import StaffPrivacyNoticePage from "@/pages/dashboard/StaffPrivacyNoticePage";
import WorkplaceMonitoringPolicyPage from "@/pages/dashboard/WorkplaceMonitoringPolicyPage";
import DataProcessingAgreementPage from "@/pages/dashboard/DataProcessingAgreementPage";
import DpiaSupportPage from "@/pages/dashboard/DpiaSupportPage";
import DataRetentionSettingsPage from "@/pages/dashboard/DataRetentionSettingsPage";
import TrackingControlsPage from "@/pages/dashboard/TrackingControlsPage";
import ClientAuditLogsPage from "@/pages/dashboard/ClientAuditLogsPage";
import StaffDataRequestsPage from "@/pages/dashboard/StaffDataRequestsPage";
import AdminAuditLogsPage from "@/pages/admin/AdminAuditLogsPage";
import AdminCompliancePage from "@/pages/admin/AdminCompliancePage";
import { DashboardPlaceholder, AdminPlaceholder } from "@/components/feature/PlaceholderPage";

const routes: RouteObject[] = [
  { path: "/", element: <Home /> },
  { path: "/features", element: <Features /> },
  { path: "/how-it-works", element: <HowItWorks /> },
  { path: "/pricing", element: <Pricing /> },
  { path: "/solutions", element: <Solutions /> },
  { path: "/security", element: <Security /> },
  { path: "/enterprise", element: <Enterprise /> },
  { path: "/book-demo", element: <BookDemo /> },
  { path: "/contact", element: <Contact /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/reset-password", element: <ResetPassword /> },
  { path: "/onboarding", element: <Onboarding /> },
  { path: "/accept-invite", element: <AcceptInvite /> },
  { path: "/staff", element: <StaffPortal /> },
  { path: "/staff/check-in", element: <StaffCheckIn /> },
  { path: "/staff/find-desk", element: <StaffFindDesk /> },
  { path: "/staff/current-desk", element: <StaffCurrentDesk /> },
  { path: "/staff/history", element: <DashboardPlaceholder title="Check-in History" description="View your past desk check-ins." icon="ri-history-line" /> },
  { path: "/staff/issues", element: <StaffIssuesPage /> },
  { path: "/staff/my-data", element: <StaffMyDataPage /> },
  { path: "/staff/floorplan", element: <StaffFloorplanPage /> },
  { path: "/staff/find-desk-map", element: <StaffFindDeskMapPage /> },
  { path: "/staff/privacy", element: <StaffPrivacyPage /> },
  { path: "/setup", element: <InstallerSetup /> },

  {
    path: "/dashboard",
    element: <DashboardShell />,
    children: [
      { index: true, element: <div></div> },
      { path: "sites", element: <SitesPage /> },
      { path: "buildings", element: <BuildingsPage /> },
      { path: "floors", element: <FloorsPage /> },
      { path: "areas", element: <HotDeskAreasPage /> },
      { path: "desks", element: <DesksPage /> },
      { path: "desks/new", element: <AddDeskPage /> },
      { path: "tags", element: <DeskTagsPage /> },
      { path: "live-status", element: <LiveStatusPage /> },
      { path: "issues", element: <IssuesDashboardPage /> },
      { path: "staff", element: <DashboardPlaceholder title="Staff" description="Invite and manage staff members." icon="ri-team-line" /> },
      { path: "check-ins", element: <CheckInsPage /> },
      { path: "floorplans", element: <FloorplansPage /> },
      { path: "floorplans/new", element: <UploadFloorplanPage /> },
      { path: "floorplans/:floorplanId", element: <FloorplanDetailPage /> },
      { path: "floorplans/:floorplanId/editor", element: <FloorplanEditorPage /> },
      { path: "floorplans/:floorplanId/live", element: <LiveFloorplanPage /> },
      { path: "reports", element: <DashboardPlaceholder title="Reports" description="View occupancy and usage reports." icon="ri-bar-chart-line" /> },
      { path: "billing", element: <Billing /> },
      { path: "ai-credits", element: <DashboardPlaceholder title="AI Credits" description="Manage your AI credit wallet and usage." icon="ri-brain-line" /> },
      { path: "compliance", element: <ComplianceOverviewPage /> },
      { path: "compliance/privacy-notices", element: <StaffPrivacyNoticePage /> },
      { path: "compliance/workplace-monitoring-policy", element: <WorkplaceMonitoringPolicyPage /> },
      { path: "compliance/data-processing-agreement", element: <DataProcessingAgreementPage /> },
      { path: "compliance/dpia", element: <DpiaSupportPage /> },
      { path: "compliance/data-retention", element: <DataRetentionSettingsPage /> },
      { path: "compliance/tracking-controls", element: <TrackingControlsPage /> },
      { path: "compliance/audit-logs", element: <ClientAuditLogsPage /> },
      { path: "compliance/staff-data-requests", element: <StaffDataRequestsPage /> },
      { path: "settings", element: <DashboardPlaceholder title="Settings" description="Configure your company account settings." icon="ri-settings-3-line" /> },
    ],
  },

  {
    path: "/admin",
    element: <AdminShell />,
    children: [
      { index: true, element: <div></div> },
      { path: "companies", element: <AdminPlaceholder title="Companies" description="Manage all client companies on the platform." icon="ri-building-line" /> },
      { path: "subscriptions", element: <AdminPlaceholder title="Subscriptions" description="View and manage all subscriptions." icon="ri-bank-card-line" /> },
      { path: "billing", element: <AdminBilling /> },
      { path: "ai-credits", element: <AdminPlaceholder title="AI Credits" description="Manage AI credit wallets across companies." icon="ri-brain-line" /> },
      { path: "entitlements", element: <AdminPlaceholder title="Entitlements" description="Manage feature entitlements and overrides." icon="ri-key-2-line" /> },
      { path: "users", element: <AdminPlaceholder title="Users" description="Manage platform users and roles." icon="ri-team-line" /> },
      { path: "support", element: <AdminPlaceholder title="Support" description="View and manage support requests." icon="ri-customer-service-line" /> },
      { path: "webhooks", element: <AdminPlaceholder title="Webhooks" description="Monitor Stripe and system webhook events." icon="ri-webhook-line" /> },
      { path: "system", element: <AdminPlaceholder title="System Health" description="Monitor platform health and performance." icon="ri-heart-pulse-line" /> },
      { path: "audit-logs", element: <AdminAuditLogsPage /> },
      { path: "compliance", element: <AdminCompliancePage /> },
      { path: "settings", element: <AdminPlaceholder title="Admin Settings" description="Configure platform settings." icon="ri-settings-3-line" /> },
    ],
  },

  { path: "/legal/privacy-policy", element: <PrivacyPolicy /> },
  { path: "/legal/terms", element: <Terms /> },
  { path: "/legal/workplace-monitoring", element: <WorkplaceMonitoring /> },
  { path: "/legal/data-processing", element: <DataProcessing /> },
  { path: "/legal/dpia", element: <Dpia /> },
  { path: "*", element: <NotFound /> },
];

export default routes;