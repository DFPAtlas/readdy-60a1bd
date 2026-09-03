export const mockFloorplans = [
  {
    id: 'fp_001',
    company_id: 'comp_01HX9K8N3P',
    site_id: 'site_001',
    site_name: 'London HQ',
    building_id: 'bld_001',
    building_name: 'King William House',
    floor_id: 'flr_001',
    floor_name: 'Ground Floor',
    name: 'KWH Ground Floor Plan',
    description: 'Main ground floor layout with visitor hot desks and quiet work area.',
    file_name: 'kwh-ground-floor.png',
    file_type: 'image/png',
    status: 'active',
    view_permission: 'staff_can_view',
    version: 1,
    uploaded_by: 'user_001',
    uploaded_by_name: 'Alex Morgan',
    placed_desks: 12,
    created_at: '2026-06-15T00:00:00Z',
    updated_at: '2026-07-08T00:00:00Z',
  },
  {
    id: 'fp_002',
    company_id: 'comp_01HX9K8N3P',
    site_id: 'site_001',
    site_name: 'London HQ',
    building_id: 'bld_001',
    building_name: 'King William House',
    floor_id: 'flr_002',
    floor_name: 'First Floor',
    name: 'KWH First Floor — Engineering',
    description: 'First floor layout for engineering and product teams.',
    file_name: 'kwh-first-floor.png',
    file_type: 'image/png',
    status: 'active',
    view_permission: 'managers_only',
    version: 1,
    uploaded_by: 'user_001',
    uploaded_by_name: 'Alex Morgan',
    placed_desks: 6,
    created_at: '2026-06-18T00:00:00Z',
    updated_at: '2026-07-05T00:00:00Z',
  },
  {
    id: 'fp_003',
    company_id: 'comp_01HX9K8N3P',
    site_id: 'site_001',
    site_name: 'London HQ',
    building_id: 'bld_002',
    building_name: 'East Wing',
    floor_id: 'flr_003',
    floor_name: 'Ground Floor',
    name: 'East Wing Ground — Sales & Marketing',
    description: 'Ground floor layout with sales zone and marketing hub areas.',
    file_name: 'east-wing-ground.png',
    file_type: 'image/png',
    status: 'draft',
    view_permission: 'admin_only',
    version: 1,
    uploaded_by: 'user_004',
    uploaded_by_name: 'Priya Patel',
    placed_desks: 0,
    created_at: '2026-07-01T00:00:00Z',
    updated_at: '2026-07-01T00:00:00Z',
  },
  {
    id: 'fp_004',
    company_id: 'comp_01HX9K8N3P',
    site_id: 'site_002',
    site_name: 'Manchester Office',
    building_id: 'bld_003',
    building_name: "St Peter's Tower",
    floor_id: 'flr_005',
    floor_name: 'Ground Floor',
    name: 'SPT Ground Floor — Operations',
    description: 'Ground floor layout with ops zone and training room.',
    file_name: 'spt-ground-floor.png',
    file_type: 'image/png',
    status: 'active',
    view_permission: 'staff_can_view',
    version: 1,
    uploaded_by: 'user_002',
    uploaded_by_name: 'James Wright',
    placed_desks: 15,
    created_at: '2026-06-22T00:00:00Z',
    updated_at: '2026-07-09T00:00:00Z',
  },
];

export const mockDeskPositions: Record<string, Array<{
  id: string;
  floorplan_id: string;
  desk_id: string;
  desk_name: string;
  desk_code: string;
  desk_type: string;
  desk_status: string;
  area_id: string;
  area_name: string;
  current_user: string | null;
  x_position: number;
  y_position: number;
  width: number;
  height: number;
  rotation: number;
  show_label: boolean;
  staff_visible: boolean;
}>> = {
  fp_001: [
    { id: 'pos_001', floorplan_id: 'fp_001', desk_id: 'dsk_001', desk_name: 'A-001', desk_code: 'A-001', desk_type: 'visitor desk', desk_status: 'occupied', area_id: 'area_001', area_name: 'Visitor Hot Desks', current_user: 'Sarah Jones', x_position: 80, y_position: 120, width: 72, height: 56, rotation: 0, show_label: true, staff_visible: true },
    { id: 'pos_002', floorplan_id: 'fp_001', desk_id: 'dsk_002', desk_name: 'A-002', desk_code: 'A-002', desk_type: 'visitor desk', desk_status: 'occupied', area_id: 'area_001', area_name: 'Visitor Hot Desks', current_user: 'Mike Davis', x_position: 180, y_position: 120, width: 72, height: 56, rotation: 0, show_label: true, staff_visible: true },
    { id: 'pos_003', floorplan_id: 'fp_001', desk_id: 'dsk_003', desk_name: 'A-003', desk_code: 'A-003', desk_type: 'standard desk', desk_status: 'available', area_id: 'area_001', area_name: 'Visitor Hot Desks', current_user: null, x_position: 280, y_position: 120, width: 72, height: 56, rotation: 0, show_label: true, staff_visible: true },
    { id: 'pos_004', floorplan_id: 'fp_001', desk_id: 'dsk_004', desk_name: 'A-004', desk_code: 'A-004', desk_type: 'standing desk', desk_status: 'available', area_id: 'area_001', area_name: 'Visitor Hot Desks', current_user: null, x_position: 380, y_position: 120, width: 72, height: 56, rotation: 0, show_label: true, staff_visible: true },
    { id: 'pos_005', floorplan_id: 'fp_001', desk_id: 'dsk_005', desk_name: 'A-005', desk_code: 'A-005', desk_type: 'accessible desk', desk_status: 'occupied', area_id: 'area_001', area_name: 'Visitor Hot Desks', current_user: 'Jenny Park', x_position: 80, y_position: 220, width: 72, height: 56, rotation: 0, show_label: true, staff_visible: true },
    { id: 'pos_006', floorplan_id: 'fp_001', desk_id: 'dsk_006', desk_name: 'A-006', desk_code: 'A-006', desk_type: 'dual monitor desk', desk_status: 'maintenance', area_id: 'area_001', area_name: 'Visitor Hot Desks', current_user: null, x_position: 180, y_position: 220, width: 72, height: 56, rotation: 0, show_label: true, staff_visible: true },
    { id: 'pos_007', floorplan_id: 'fp_001', desk_id: 'dsk_007', desk_name: 'A-007', desk_code: 'A-007', desk_type: 'standard desk', desk_status: 'occupied', area_id: 'area_001', area_name: 'Visitor Hot Desks', current_user: 'Dan Miller', x_position: 280, y_position: 220, width: 72, height: 56, rotation: 0, show_label: true, staff_visible: true },
    { id: 'pos_008', floorplan_id: 'fp_001', desk_id: 'dsk_008', desk_name: 'A-008', desk_code: 'A-008', desk_type: 'standard desk', desk_status: 'occupied', area_id: 'area_001', area_name: 'Visitor Hot Desks', current_user: 'Anna White', x_position: 380, y_position: 220, width: 72, height: 56, rotation: 0, show_label: true, staff_visible: true },
    { id: 'pos_009', floorplan_id: 'fp_001', desk_id: 'dsk_009', desk_name: 'B-001', desk_code: 'B-001', desk_type: 'quiet desk', desk_status: 'occupied', area_id: 'area_002', area_name: 'Quiet Work Area', current_user: 'Chris Nolan', x_position: 560, y_position: 120, width: 72, height: 56, rotation: 0, show_label: true, staff_visible: true },
    { id: 'pos_010', floorplan_id: 'fp_001', desk_id: 'dsk_010', desk_name: 'B-002', desk_code: 'B-002', desk_type: 'quiet desk', desk_status: 'occupied', area_id: 'area_002', area_name: 'Quiet Work Area', current_user: 'Sam Taylor', x_position: 660, y_position: 120, width: 72, height: 56, rotation: 0, show_label: true, staff_visible: true },
    { id: 'pos_011', floorplan_id: 'fp_001', desk_id: 'dsk_011', desk_name: 'C-001', desk_code: 'C-001', desk_type: 'dual monitor desk', desk_status: 'occupied', area_id: 'area_003', area_name: 'Engineering Zone', current_user: 'Tom Chen', x_position: 560, y_position: 240, width: 72, height: 56, rotation: 0, show_label: true, staff_visible: true },
    { id: 'pos_012', floorplan_id: 'fp_001', desk_id: 'dsk_013', desk_name: 'C-003', desk_code: 'C-003', desk_type: 'standard desk', desk_status: 'available', area_id: 'area_003', area_name: 'Engineering Zone', current_user: null, x_position: 660, y_position: 240, width: 72, height: 56, rotation: 0, show_label: true, staff_visible: true },
  ],
  fp_002: [
    { id: 'pos_201', floorplan_id: 'fp_002', desk_id: 'dsk_011', desk_name: 'C-001', desk_code: 'C-001', desk_type: 'dual monitor desk', desk_status: 'occupied', area_id: 'area_003', area_name: 'Engineering Zone', current_user: 'Tom Chen', x_position: 100, y_position: 150, width: 72, height: 56, rotation: 0, show_label: true, staff_visible: true },
    { id: 'pos_202', floorplan_id: 'fp_002', desk_id: 'dsk_012', desk_name: 'C-002', desk_code: 'C-002', desk_type: 'standing desk', desk_status: 'occupied', area_id: 'area_003', area_name: 'Engineering Zone', current_user: 'Nina Gupta', x_position: 200, y_position: 150, width: 72, height: 56, rotation: 0, show_label: true, staff_visible: true },
    { id: 'pos_203', floorplan_id: 'fp_002', desk_id: 'dsk_013', desk_name: 'C-003', desk_code: 'C-003', desk_type: 'standard desk', desk_status: 'available', area_id: 'area_003', area_name: 'Engineering Zone', current_user: null, x_position: 300, y_position: 150, width: 72, height: 56, rotation: 0, show_label: true, staff_visible: true },
    { id: 'pos_204', floorplan_id: 'fp_002', desk_id: 'dsk_019', desk_name: 'F-001', desk_code: 'F-001', desk_type: 'manager desk', desk_status: 'occupied', area_id: 'area_006', area_name: 'Finance & Legal', current_user: 'Helen Gray', x_position: 100, y_position: 280, width: 72, height: 56, rotation: 0, show_label: true, staff_visible: true },
    { id: 'pos_205', floorplan_id: 'fp_002', desk_id: 'dsk_020', desk_name: 'F-002', desk_code: 'F-002', desk_type: 'standard desk', desk_status: 'available', area_id: 'area_006', area_name: 'Finance & Legal', current_user: null, x_position: 200, y_position: 280, width: 72, height: 56, rotation: 0, show_label: true, staff_visible: true },
    { id: 'pos_206', floorplan_id: 'fp_002', desk_id: 'dsk_014', desk_name: 'D-001', desk_code: 'D-001', desk_type: 'team desk', desk_status: 'occupied', area_id: 'area_004', area_name: 'Sales Zone', current_user: 'Lisa Brown', x_position: 450, y_position: 150, width: 72, height: 56, rotation: 0, show_label: true, staff_visible: true },
  ],
  fp_004: [
    { id: 'pos_401', floorplan_id: 'fp_004', desk_id: 'dsk_017', desk_name: 'E-001', desk_code: 'E-001', desk_type: 'standard desk', desk_status: 'occupied', area_id: 'area_005', area_name: 'Marketing Hub', current_user: 'Ravi Singh', x_position: 120, y_position: 100, width: 72, height: 56, rotation: 0, show_label: true, staff_visible: true },
    { id: 'pos_402', floorplan_id: 'fp_004', desk_id: 'dsk_018', desk_name: 'E-002', desk_code: 'E-002', desk_type: 'standard desk', desk_status: 'available', area_id: 'area_005', area_name: 'Marketing Hub', current_user: null, x_position: 220, y_position: 100, width: 72, height: 56, rotation: 0, show_label: true, staff_visible: true },
    { id: 'pos_403', floorplan_id: 'fp_004', desk_id: 'dsk_015', desk_name: 'D-002', desk_code: 'D-002', desk_type: 'standard desk', desk_status: 'available', area_id: 'area_004', area_name: 'Sales Zone', current_user: null, x_position: 120, y_position: 220, width: 72, height: 56, rotation: 0, show_label: true, staff_visible: true },
    { id: 'pos_404', floorplan_id: 'fp_004', desk_id: 'dsk_016', desk_name: 'D-003', desk_code: 'D-003', desk_type: 'standard desk', desk_status: 'available', area_id: 'area_004', area_name: 'Sales Zone', current_user: null, x_position: 220, y_position: 220, width: 72, height: 56, rotation: 0, show_label: true, staff_visible: true },
  ],
};

export const allUnplacedDesks = [
  { id: 'dsk_014', name: 'D-001', code: 'D-001', type: 'team desk', area_name: 'Sales Zone', status: 'occupied', tag_status: 'active', floor_id: 'flr_003' },
  { id: 'dsk_015', name: 'D-002', code: 'D-002', type: 'standard desk', area_name: 'Sales Zone', status: 'available', tag_status: 'active', floor_id: 'flr_003' },
  { id: 'dsk_016', name: 'D-003', code: 'D-003', type: 'standard desk', area_name: 'Sales Zone', status: 'available', tag_status: 'unassigned', floor_id: 'flr_003' },
  { id: 'dsk_017', name: 'E-001', code: 'E-001', type: 'standard desk', area_name: 'Marketing Hub', status: 'occupied', tag_status: 'active', floor_id: 'flr_003' },
  { id: 'dsk_018', name: 'E-002', code: 'E-002', type: 'standard desk', area_name: 'Marketing Hub', status: 'available', tag_status: 'active', floor_id: 'flr_003' },
  { id: 'dsk_012', name: 'C-002', code: 'C-002', type: 'standing desk', area_name: 'Engineering Zone', status: 'occupied', tag_status: 'active', floor_id: 'flr_002' },
];

export const mockFloorplanVersions = [
  { id: 'fv_001', floorplan_id: 'fp_001', version_number: 1, file_name: 'kwh-ground-floor-v1.png', uploaded_by: 'user_001', uploaded_by_name: 'Alex Morgan', notes: 'Initial upload — ground floor layout', created_at: '2026-06-15T00:00:00Z' },
];

export const floorplanStatuses = ['draft', 'active', 'inactive', 'archived'];
export const viewPermissionOptions = [
  { value: 'admin_only', label: 'Admin only' },
  { value: 'managers_only', label: 'Managers only' },
  { value: 'staff_can_view', label: 'Staff can view' },
  { value: 'staff_available_only', label: 'Staff can view available desks only' },
];

export const acceptedFileTypes = ['PNG', 'JPG', 'PDF placeholder', 'SVG placeholder', 'CAD/DWG placeholder (future)'];

export const floorplanLiveStats = {
  fp_001: {
    total_desks: 12,
    placed_desks: 12,
    available_desks: 3,
    occupied_desks: 8,
    booked_desks: 0,
    maintenance_desks: 1,
    desks_with_issues: 1,
  },
  fp_002: {
    total_desks: 8,
    placed_desks: 6,
    available_desks: 2,
    occupied_desks: 4,
    booked_desks: 0,
    maintenance_desks: 0,
    desks_with_issues: 0,
  },
  fp_004: {
    total_desks: 15,
    placed_desks: 4,
    available_desks: 3,
    occupied_desks: 1,
    booked_desks: 0,
    maintenance_desks: 0,
    desks_with_issues: 0,
  },
};