import { mockSites, mockBuildings, mockFloors, mockAreas, mockDesks, mockDeskTags, mockCheckIns, mockIssues, liveStatusStats } from '@/mocks/workspaceData';
import { createAuditLog as auditLogCreate } from '@/services/auditService';

const mockCompanyId = 'comp_01HX9K8N3P';
const mockUserId = 'user_001';

function logPlaceholder(action: string, details: Record<string, unknown>) {
  auditLogCreate(mockCompanyId, mockUserId, action as never, details as Record<string, string | number | boolean>);
  console.log(`[WORKSPACE PLACEHOLDER] ${action}`, details);
}

export async function getSites() { logPlaceholder('get_sites', {}); return [...mockSites]; }
export async function getSite(id: string) { return mockSites.find(s => s.id === id) || null; }

export async function createSite(data: Record<string, unknown>) {
  logPlaceholder('site_created', { name: data.name as string });
  const newSite = { id: `site_${Date.now()}`, company_id: mockCompanyId, ...data, buildings: 0, floors: 0, desk_count: 0, active_checkins: 0 } as unknown as typeof mockSites[0];
  return newSite;
}

export async function updateSite(id: string, data: Record<string, unknown>) {
  logPlaceholder('site_updated', { id, ...data });
  return { success: true };
}

export async function archiveSite(id: string) {
  logPlaceholder('site_archived', { id });
  return { success: true };
}

export async function getBuildings(siteId?: string) {
  let filtered = [...mockBuildings];
  if (siteId) filtered = filtered.filter(b => b.site_id === siteId);
  return filtered;
}

export async function getBuilding(id: string) { return mockBuildings.find(b => b.id === id) || null; }

export async function createBuilding(data: Record<string, unknown>) {
  logPlaceholder('building_created', { name: data.name as string });
  return { success: true, id: `bld_${Date.now()}` };
}

export async function updateBuilding(id: string, data: Record<string, unknown>) {
  logPlaceholder('building_updated', { id, ...data });
  return { success: true };
}

export async function getFloors(siteId?: string, buildingId?: string) {
  let filtered = [...mockFloors];
  if (siteId) filtered = filtered.filter(f => f.site_id === siteId);
  if (buildingId) filtered = filtered.filter(f => f.building_id === buildingId);
  return filtered;
}

export async function getFloor(id: string) { return mockFloors.find(f => f.id === id) || null; }

export async function createFloor(data: Record<string, unknown>) {
  logPlaceholder('floor_created', { name: data.name as string });
  return { success: true, id: `flr_${Date.now()}` };
}

export async function getHotDeskAreas(siteId?: string, buildingId?: string, floorId?: string) {
  let filtered = [...mockAreas];
  if (siteId) filtered = filtered.filter(a => a.site_id === siteId);
  if (buildingId) filtered = filtered.filter(a => a.building_id === buildingId);
  if (floorId) filtered = filtered.filter(a => a.floor_id === floorId);
  return filtered;
}

export async function getArea(id: string) { return mockAreas.find(a => a.id === id) || null; }

export async function createHotDeskArea(data: Record<string, unknown>) {
  logPlaceholder('area_created', { name: data.name as string });
  return { success: true, id: `area_${Date.now()}` };
}

export async function updateArea(id: string, data: Record<string, unknown>) {
  logPlaceholder('area_updated', { id, ...data });
  return { success: true };
}

export async function getDesks(filters?: { siteId?: string; buildingId?: string; floorId?: string; areaId?: string; status?: string; type?: string }) {
  let filtered = [...mockDesks];
  if (filters?.siteId) filtered = filtered.filter(d => d.site_id === filters.siteId);
  if (filters?.buildingId) filtered = filtered.filter(d => d.building_id === filters.buildingId);
  if (filters?.floorId) filtered = filtered.filter(d => d.floor_id === filters.floorId);
  if (filters?.areaId) filtered = filtered.filter(d => d.area_id === filters.areaId);
  if (filters?.status) filtered = filtered.filter(d => d.status === filters.status);
  if (filters?.type) filtered = filtered.filter(d => d.type === filters.type);
  return filtered;
}

export async function getDesk(id: string) { return mockDesks.find(d => d.id === id) || null; }

export async function createDesk(data: Record<string, unknown>) {
  logPlaceholder('desk_created', { name: data.name as string });
  return { success: true, id: `dsk_${Date.now()}` };
}

export async function bulkCreateDesks(data: { prefix: string; startNumber: number; count: number; digitFormat: number } & Record<string, unknown>) {
  const { prefix, startNumber, count, digitFormat, ...rest } = data;
  const deskList: string[] = [];
  for (let i = 0; i < count; i++) {
    const num = String(startNumber + i).padStart(digitFormat, '0');
    deskList.push(`${prefix}-${num}`);
  }
  logPlaceholder('desks_bulk_created', { prefix, count, desks: deskList });
  return { success: true, count, desks: deskList };
}

export async function updateDesk(id: string, data: Record<string, unknown>) {
  logPlaceholder('desk_updated', { id, ...data });
  return { success: true };
}

export async function archiveDesk(id: string) {
  logPlaceholder('desk_archived', { id });
  return { success: true };
}

export async function getDeskTags() {
  return [...mockDeskTags];
}

export async function createDeskTag(data: { tag_type: string; tag_code: string; site_id: string }) {
  logPlaceholder('tag_created', { code: data.tag_code });
  return { success: true, id: `tag_${Date.now()}` };
}

export async function assignTagToDesk(tagId: string, deskId: string) {
  logPlaceholder('tag_assigned', { tagId, deskId });
  return { success: true };
}

export async function unassignTag(tagId: string) {
  logPlaceholder('tag_unassigned', { tagId });
  return { success: true };
}

export async function disableDeskTag(tagId: string) {
  logPlaceholder('tag_disabled', { tagId });
  return { success: true };
}

export async function replaceDeskTag(oldTagId: string, newTagCode: string) {
  logPlaceholder('tag_replaced', { oldTagId, newTagCode });
  return { success: true };
}

export async function checkInToDesk(deskId: string, userId: string, source: string = 'qr') {
  logPlaceholder('desk_checked_in', { deskId, userId, source });
  return { success: true, checkInId: `ci_${Date.now()}`, checkedInAt: new Date().toISOString() };
}

export async function checkOutFromDesk(checkInId: string) {
  logPlaceholder('desk_checked_out', { checkInId });
  return { success: true, checkedOutAt: new Date().toISOString() };
}

export async function manualCheckOut(deskId: string, adminId: string) {
  logPlaceholder('manual_checkout', { deskId, adminId });
  return { success: true };
}

export async function getCheckIns(filters?: { siteId?: string; buildingId?: string; floorId?: string; areaId?: string; userId?: string; deskId?: string; status?: string }) {
  let filtered = [...mockCheckIns];
  if (filters?.siteId) filtered = filtered.filter(c => c.site_id === filters.siteId);
  if (filters?.buildingId) filtered = filtered.filter(c => c.building_id === filters.buildingId);
  if (filters?.floorId) filtered = filtered.filter(c => c.floor_id === filters.floorId);
  if (filters?.areaId) filtered = filtered.filter(c => c.area_id === filters.areaId);
  if (filters?.userId) filtered = filtered.filter(c => c.user_id === filters.userId);
  if (filters?.deskId) filtered = filtered.filter(c => c.desk_id === filters.deskId);
  if (filters?.status) filtered = filtered.filter(c => c.status === filters.status);
  return filtered;
}

export async function getLiveDeskStatus(filters?: { siteId?: string; buildingId?: string; floorId?: string; areaId?: string }) {
  const desks = await getDesks(filters);
  const total = desks.length;
  const occupied = desks.filter(d => d.status === 'occupied').length;
  const available = desks.filter(d => d.status === 'available').length;
  const maintenance = desks.filter(d => d.status === 'maintenance').length;
  return { total, occupied, available, maintenance, ...liveStatusStats };
}

export async function reportDeskIssue(data: { desk_id: string; issue_type: string; description: string; priority: string; reported_by: string }) {
  logPlaceholder('issue_reported', data);
  return { success: true, id: `iss_${Date.now()}` };
}

export async function getDeskIssues(filters?: { siteId?: string; buildingId?: string; floorId?: string; status?: string }) {
  let filtered = [...mockIssues];
  if (filters?.siteId) filtered = filtered.filter(i => i.site_id === filters.siteId);
  if (filters?.buildingId) filtered = filtered.filter(i => i.building_id === filters.buildingId);
  if (filters?.floorId) filtered = filtered.filter(i => i.floor_id === filters.floorId);
  if (filters?.status) filtered = filtered.filter(i => i.status === filters.status);
  return filtered;
}

export async function updateDeskIssue(id: string, data: Record<string, unknown>) {
  logPlaceholder('issue_updated', { id, ...data });
  return { success: true };
}

export async function checkUserPermission(userRole: string, action: string, resourceId?: string): Promise<boolean> {
  const adminRoles = ['company_owner', 'company_admin', 'platform_admin'];
  if (adminRoles.includes(userRole)) return true;
  if (userRole === 'site_manager' && ['view_sites', 'manage_sites', 'view_desks', 'view_checkins'].includes(action)) return true;
  if (userRole === 'floor_manager' && ['view_floors', 'manage_floors', 'view_desks', 'view_checkins'].includes(action)) return true;
  if (userRole === 'staff_user' && ['checkin', 'checkout', 'find_desk', 'report_issue', 'view_own_data'].includes(action)) return true;
  if (userRole === 'installer' && ['assign_tags', 'setup_desks'].includes(action)) return true;
  if (userRole === 'auditor' && ['view_audit', 'view_privacy'].includes(action)) return true;
  return false;
}

export const WORKSPACE_SERVICE = {
  getSites, getSite, createSite, updateSite, archiveSite,
  getBuildings, getBuilding, createBuilding, updateBuilding,
  getFloors, getFloor, createFloor,
  getHotDeskAreas, getArea, createHotDeskArea, updateArea,
  getDesks, getDesk, createDesk, bulkCreateDesks, updateDesk, archiveDesk,
  getDeskTags, createDeskTag, assignTagToDesk, unassignTag, disableDeskTag, replaceDeskTag,
  checkInToDesk, checkOutFromDesk, manualCheckOut,
  getCheckIns, getLiveDeskStatus,
  reportDeskIssue, getDeskIssues, updateDeskIssue,
  checkUserPermission,
};