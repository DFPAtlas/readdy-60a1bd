import { mockFloorplans, mockDeskPositions, allUnplacedDesks, mockFloorplanVersions } from '@/mocks/floorplanData';
import { mockDesks } from '@/mocks/workspaceData';
import { createAuditLog as auditLogCreate } from '@/services/auditService';

const mockCompanyId = 'comp_01HX9K8N3P';
const mockUserId = 'user_001';

function logPlaceholder(action: string, details: Record<string, unknown>) {
  auditLogCreate(mockCompanyId, mockUserId, action as never, details as Record<string, string | number | boolean>);
  console.log(`[FLOORPLAN PLACEHOLDER] ${action}`, details);
}

export async function getFloorplans(filters?: { siteId?: string; buildingId?: string; floorId?: string; status?: string }) {
  let filtered = [...mockFloorplans];
  if (filters?.siteId) filtered = filtered.filter(fp => fp.site_id === filters.siteId);
  if (filters?.buildingId) filtered = filtered.filter(fp => fp.building_id === filters.buildingId);
  if (filters?.floorId) filtered = filtered.filter(fp => fp.floor_id === filters.floorId);
  if (filters?.status) filtered = filtered.filter(fp => fp.status === filters.status);
  return filtered;
}

export async function getFloorplanById(id: string) {
  return mockFloorplans.find(fp => fp.id === id) || null;
}

export async function createFloorplan(data: {
  name: string;
  site_id: string;
  site_name: string;
  building_id: string;
  building_name: string;
  floor_id: string;
  floor_name: string;
  description?: string;
  file_name: string;
  file_type: string;
  view_permission: string;
}) {
  logPlaceholder('floorplan_uploaded', { name: data.name, floor: data.floor_name });
  const newFloorplan = {
    id: `fp_${Date.now()}`,
    company_id: mockCompanyId,
    ...data,
    status: 'active',
    version: 1,
    uploaded_by: mockUserId,
    uploaded_by_name: 'Current User',
    placed_desks: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  return newFloorplan;
}

export async function uploadFloorplan(file: File, metadata: Record<string, string>) {
  logPlaceholder('floorplan_file_uploaded', { fileName: file.name, ...metadata });
  return { success: true, fileUrl: `/uploads/floorplans/${Date.now()}_${file.name}`, fileName: file.name, fileType: file.type };
}

export async function updateFloorplan(id: string, data: Record<string, unknown>) {
  logPlaceholder('floorplan_updated', { id, ...data });
  return { success: true };
}

export async function archiveFloorplan(id: string) {
  logPlaceholder('floorplan_archived', { id });
  return { success: true };
}

export async function getUnplacedDesks(floorId: string) {
  return allUnplacedDesks.filter(d => d.floor_id === floorId);
}

export async function getPlacedDesks(floorplanId: string) {
  const positions = mockDeskPositions[floorplanId] || [];
  const placedDeskIds = new Set(positions.map(p => p.desk_id));
  const placed = [];
  for (const pos of positions) {
    const desk = mockDesks.find(d => d.id === pos.desk_id);
    if (desk) {
      placed.push({ ...pos, desk_status: desk.status, current_user: desk.current_user });
    } else {
      placed.push(pos);
    }
  }
  return { positions: placed, placedDeskIds };
}

export async function placeDeskOnFloorplan(floorplanId: string, deskId: string, x: number, y: number) {
  logPlaceholder('desk_placed_on_floorplan', { floorplanId, deskId, x, y });
  const desk = mockDesks.find(d => d.id === deskId);
  if (!desk) return { success: false, error: 'Desk not found' };
  const newPosition = {
    id: `pos_${Date.now()}`,
    floorplan_id: floorplanId,
    desk_id: deskId,
    desk_name: desk.name,
    desk_code: desk.code,
    desk_type: desk.type,
    desk_status: desk.status,
    area_id: desk.area_id,
    area_name: desk.area_name,
    current_user: desk.current_user,
    x_position: x,
    y_position: y,
    width: 72,
    height: 56,
    rotation: 0,
    show_label: true,
    staff_visible: true,
  };
  return { success: true, position: newPosition };
}

export async function moveDeskOnFloorplan(floorplanId: string, positionId: string, x: number, y: number) {
  logPlaceholder('desk_moved_on_floorplan', { floorplanId, positionId, x, y });
  return { success: true };
}

export async function resizeDeskOnFloorplan(floorplanId: string, positionId: string, width: number, height: number) {
  logPlaceholder('desk_resized_on_floorplan', { floorplanId, positionId, width, height });
  return { success: true };
}

export async function rotateDeskOnFloorplan(floorplanId: string, positionId: string, rotation: number) {
  logPlaceholder('desk_rotated_on_floorplan', { floorplanId, positionId, rotation });
  return { success: true };
}

export async function removeDeskFromFloorplan(floorplanId: string, positionId: string) {
  logPlaceholder('desk_removed_from_floorplan', { floorplanId, positionId });
  return { success: true };
}

export async function updateDeskPosition(floorplanId: string, positionId: string, data: { show_label?: boolean; staff_visible?: boolean; rotation?: number }) {
  logPlaceholder('desk_position_updated', { floorplanId, positionId, ...data });
  return { success: true };
}

export async function saveFloorplanLayout(floorplanId: string, positions: unknown[]) {
  logPlaceholder('floorplan_layout_saved', { floorplanId, count: positions.length });
  return { success: true };
}

export async function getLiveFloorplanStatus(floorplanId: string) {
  const positions = mockDeskPositions[floorplanId] || [];
  const occupied = positions.filter(p => {
    const desk = mockDesks.find(d => d.id === p.desk_id);
    return desk && desk.status === 'occupied';
  });
  const available = positions.filter(p => {
    const desk = mockDesks.find(d => d.id === p.desk_id);
    return desk && desk.status === 'available';
  });
  const maintenance = positions.filter(p => {
    const desk = mockDesks.find(d => d.id === p.desk_id);
    return desk && desk.status === 'maintenance';
  });
  return {
    floorplanId,
    total: positions.length,
    occupied: occupied.length,
    available: available.length,
    maintenance: maintenance.length,
    positions: positions.map(p => {
      const desk = mockDesks.find(d => d.id === p.desk_id);
      return { ...p, desk_status: desk?.status || 'unknown', current_user: desk?.current_user || null };
    }),
  };
}

export async function getStaffFloorplanView(siteId: string, floorId: string) {
  const floorplans = await getFloorplans({ siteId, floorId, status: 'active' });
  const viewable = floorplans.filter(fp => fp.view_permission === 'staff_can_view' || fp.view_permission === 'staff_available_only');
  if (viewable.length === 0) return null;
  const fp = viewable[0];
  const { positions } = await getPlacedDesks(fp.id);
  return { floorplan: fp, positions };
}

export async function getFloorplanVersions(floorplanId: string) {
  return mockFloorplanVersions.filter(v => v.floorplan_id === floorplanId);
}

export async function checkFloorplanEntitlement(companyPlan: string): Promise<{ allowed: boolean; limit: number; used: number; message: string | null }> {
  const planLimits: Record<string, number> = { basic: 0, professional: 1, intelligence: 10, enterprise: 999 };
  const limit = planLimits[companyPlan] ?? 0;
  const used = mockFloorplans.length;
  if (used >= limit && limit > 0) {
    return { allowed: false, limit, used, message: 'You have reached your floorplan limit. Upgrade your plan or remove an unused floorplan.' };
  }
  if (limit === 0) {
    return { allowed: false, limit: 0, used, message: 'Floorplans are not included in your plan. Upgrade to Professional, Intelligence, or Enterprise to use this feature.' };
  }
  return { allowed: true, limit, used, message: null };
}

export async function checkUserFloorplanPermission(userRole: string, action: string): Promise<boolean> {
  const adminRoles = ['company_owner', 'company_admin', 'platform_admin'];
  if (adminRoles.includes(userRole)) return true;
  if (userRole === 'site_manager' && ['view_floorplans', 'manage_floorplans', 'edit_floorplan'].includes(action)) return true;
  if (userRole === 'floor_manager' && ['view_floorplans', 'view_assigned'].includes(action)) return true;
  if (userRole === 'installer' && ['place_desks', 'assign_tags'].includes(action)) return true;
  if (userRole === 'staff_user' && ['view_staff_floorplan'].includes(action)) return true;
  if (userRole === 'auditor' && ['view_floorplan_logs'].includes(action)) return true;
  return false;
}

export const FLOORPLAN_SERVICE = {
  getFloorplans, getFloorplanById, createFloorplan, uploadFloorplan, updateFloorplan, archiveFloorplan,
  getUnplacedDesks, getPlacedDesks,
  placeDeskOnFloorplan, moveDeskOnFloorplan, resizeDeskOnFloorplan, rotateDeskOnFloorplan,
  removeDeskFromFloorplan, updateDeskPosition, saveFloorplanLayout,
  getLiveFloorplanStatus, getStaffFloorplanView, getFloorplanVersions,
  checkFloorplanEntitlement, checkUserFloorplanPermission,
};