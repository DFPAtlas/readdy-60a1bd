export const mockSites = [
  { id: 'site_001', company_id: 'comp_01HX9K8N3P', name: 'London HQ', code: 'LON-HQ', address: '45 King William Street', postcode: 'EC4R 9AN', country: 'UK', timezone: 'Europe/London', contact_name: 'Alex Morgan', contact_email: 'alex@acmecorp.com', contact_phone: '+44 20 7946 0123', manager_id: 'user_001', manager_name: 'Alex Morgan', status: 'active', buildings: 2, floors: 4, desk_count: 35, active_checkins: 24 },
  { id: 'site_002', company_id: 'comp_01HX9K8N3P', name: 'Manchester Office', code: 'MAN-OF', address: '12 St Peter\'s Square', postcode: 'M2 3AF', country: 'UK', timezone: 'Europe/London', contact_name: 'James Wright', contact_email: 'james@acmecorp.com', contact_phone: '+44 16 1496 0456', manager_id: 'user_002', manager_name: 'James Wright', status: 'active', buildings: 1, floors: 2, desk_count: 25, active_checkins: 15 },
  { id: 'site_003', company_id: 'comp_01HX9K8N3P', name: 'Edinburgh Hub', code: 'EDI-HB', address: '88 Princes Street', postcode: 'EH2 2ER', country: 'UK', timezone: 'Europe/London', contact_name: 'Claire MacLeod', contact_email: 'claire@acmecorp.com', contact_phone: '+44 13 1226 0789', manager_id: 'user_003', manager_name: 'Claire MacLeod', status: 'draft', buildings: 0, floors: 0, desk_count: 0, active_checkins: 0 },
];

export const mockBuildings = [
  { id: 'bld_001', company_id: 'comp_01HX9K8N3P', site_id: 'site_001', site_name: 'London HQ', name: 'King William House', code: 'KWH', address_override: null, number_of_floors: 3, manager_id: 'user_001', manager_name: 'Alex Morgan', status: 'active', floors: 3, desk_count: 20, active_checkins: 14 },
  { id: 'bld_002', company_id: 'comp_01HX9K8N3P', site_id: 'site_001', site_name: 'London HQ', name: 'East Wing', code: 'EW', address_override: '47 King William Street', number_of_floors: 2, manager_id: 'user_004', manager_name: 'Priya Patel', status: 'active', floors: 2, desk_count: 15, active_checkins: 10 },
  { id: 'bld_003', company_id: 'comp_01HX9K8N3P', site_id: 'site_002', site_name: 'Manchester Office', name: 'St Peter\'s Tower', code: 'SPT', address_override: null, number_of_floors: 2, manager_id: 'user_002', manager_name: 'James Wright', status: 'active', floors: 2, desk_count: 25, active_checkins: 15 },
];

export const mockFloors = [
  { id: 'flr_001', company_id: 'comp_01HX9K8N3P', site_id: 'site_001', site_name: 'London HQ', building_id: 'bld_001', building_name: 'King William House', name: 'Ground Floor', code: 'KWH-G', level_number: 0, description: 'Main reception and visitor hot desks', status: 'active', hot_desk_areas: 2, desk_count: 12, active_checkins: 9 },
  { id: 'flr_002', company_id: 'comp_01HX9K8N3P', site_id: 'site_001', site_name: 'London HQ', building_id: 'bld_001', building_name: 'King William House', name: 'First Floor', code: 'KWH-1', level_number: 1, description: 'Engineering and product teams', status: 'active', hot_desk_areas: 3, desk_count: 8, active_checkins: 5 },
  { id: 'flr_003', company_id: 'comp_01HX9K8N3P', site_id: 'site_001', site_name: 'London HQ', building_id: 'bld_002', building_name: 'East Wing', name: 'Ground Floor', code: 'EW-G', level_number: 0, description: 'Sales and marketing zone', status: 'active', hot_desk_areas: 2, desk_count: 10, active_checkins: 7 },
  { id: 'flr_004', company_id: 'comp_01HX9K8N3P', site_id: 'site_001', site_name: 'London HQ', building_id: 'bld_002', building_name: 'East Wing', name: 'First Floor', code: 'EW-1', level_number: 1, description: 'Finance and legal', status: 'active', hot_desk_areas: 1, desk_count: 5, active_checkins: 3 },
  { id: 'flr_005', company_id: 'comp_01HX9K8N3P', site_id: 'site_002', site_name: 'Manchester Office', building_id: 'bld_003', building_name: 'St Peter\'s Tower', name: 'Ground Floor', code: 'SPT-G', level_number: 0, description: 'Operations and support', status: 'active', hot_desk_areas: 2, desk_count: 15, active_checkins: 10 },
  { id: 'flr_006', company_id: 'comp_01HX9K8N3P', site_id: 'site_002', site_name: 'Manchester Office', building_id: 'bld_003', building_name: 'St Peter\'s Tower', name: 'First Floor', code: 'SPT-1', level_number: 1, description: 'Management and HR', status: 'active', hot_desk_areas: 1, desk_count: 10, active_checkins: 5 },
];

export const mockAreas = [
  { id: 'area_001', company_id: 'comp_01HX9K8N3P', site_id: 'site_001', site_name: 'London HQ', building_id: 'bld_001', building_name: 'King William House', floor_id: 'flr_001', floor_name: 'Ground Floor', name: 'Visitor Hot Desks', code: 'VHD', description: 'Drop-in desks for visiting staff and guests', capacity: 8, manager_id: 'user_004', manager_name: 'Priya Patel', access_rules: 'Open access, staff badge required', status: 'active', desk_count: 8, available_desks: 3, occupied_desks: 5 },
  { id: 'area_002', company_id: 'comp_01HX9K8N3P', site_id: 'site_001', site_name: 'London HQ', building_id: 'bld_001', building_name: 'King William House', floor_id: 'flr_001', floor_name: 'Ground Floor', name: 'Quiet Work Area', code: 'QWA', description: 'Quiet desks for focused individual work', capacity: 4, manager_id: 'user_001', manager_name: 'Alex Morgan', access_rules: 'No phone calls, headphones only', status: 'active', desk_count: 4, available_desks: 0, occupied_desks: 4 },
  { id: 'area_003', company_id: 'comp_01HX9K8N3P', site_id: 'site_001', site_name: 'London HQ', building_id: 'bld_001', building_name: 'King William House', floor_id: 'flr_002', floor_name: 'First Floor', name: 'Engineering Zone', code: 'ENG-Z', description: 'Engineering team hot desks', capacity: 6, manager_id: 'user_005', manager_name: 'Tom Chen', status: 'active', desk_count: 6, available_desks: 2, occupied_desks: 4 },
  { id: 'area_004', company_id: 'comp_01HX9K8N3P', site_id: 'site_001', site_name: 'London HQ', building_id: 'bld_002', building_name: 'East Wing', floor_id: 'flr_003', floor_name: 'Ground Floor', name: 'Sales Zone', code: 'SAL-Z', description: 'Sales team collaborative area', capacity: 6, manager_id: 'user_006', manager_name: 'Lisa Brown', status: 'active', desk_count: 6, available_desks: 3, occupied_desks: 3 },
  { id: 'area_005', company_id: 'comp_01HX9K8N3P', site_id: 'site_001', site_name: 'London HQ', building_id: 'bld_002', building_name: 'East Wing', floor_id: 'flr_003', floor_name: 'Ground Floor', name: 'Marketing Hub', code: 'MKT-H', description: 'Marketing team flex desks', capacity: 4, manager_id: 'user_007', manager_name: 'Ravi Singh', status: 'active', desk_count: 4, available_desks: 1, occupied_desks: 3 },
  { id: 'area_006', company_id: 'comp_01HX9K8N3P', site_id: 'site_001', site_name: 'London HQ', building_id: 'bld_002', building_name: 'East Wing', floor_id: 'flr_004', floor_name: 'First Floor', name: 'Finance & Legal', code: 'FIN-L', description: 'Finance and legal team desks', capacity: 5, manager_id: 'user_001', manager_name: 'Alex Morgan', access_rules: 'Restricted access — badge required', status: 'active', desk_count: 5, available_desks: 2, occupied_desks: 3 },
  { id: 'area_007', company_id: 'comp_01HX9K8N3P', site_id: 'site_002', site_name: 'Manchester Office', building_id: 'bld_003', building_name: 'St Peter\'s Tower', floor_id: 'flr_005', floor_name: 'Ground Floor', name: 'Ops Zone', code: 'OPS-Z', description: 'Operations and support team desks', capacity: 10, manager_id: 'user_002', manager_name: 'James Wright', status: 'active', desk_count: 10, available_desks: 4, occupied_desks: 6 },
  { id: 'area_008', company_id: 'comp_01HX9K8N3P', site_id: 'site_002', site_name: 'Manchester Office', building_id: 'bld_003', building_name: 'St Peter\'s Tower', floor_id: 'flr_005', floor_name: 'Ground Floor', name: 'Training Room', code: 'TRN-R', description: 'Training and onboarding hot desks', capacity: 5, manager_id: 'user_008', manager_name: 'Emma Wilson', status: 'active', desk_count: 5, available_desks: 3, occupied_desks: 2 },
  { id: 'area_009', company_id: 'comp_01HX9K8N3P', site_id: 'site_002', site_name: 'Manchester Office', building_id: 'bld_003', building_name: 'St Peter\'s Tower', floor_id: 'flr_006', floor_name: 'First Floor', name: 'Management Suite', code: 'MGT-S', description: 'Senior management and HR desks', capacity: 10, manager_id: 'user_002', manager_name: 'James Wright', status: 'active', desk_count: 10, available_desks: 3, occupied_desks: 7 },
];

const deskNames = [
  { id: 'dsk_001', name: 'A-001', code: 'A-001', site_id: 'site_001', site_name: 'London HQ', building_id: 'bld_001', floor_id: 'flr_001', floor_name: 'Ground Floor', area_id: 'area_001', area_name: 'Visitor Hot Desks', type: 'visitor desk', status: 'occupied', tag_id: 'tag_001', tag_status: 'active', current_user: 'Sarah Jones', current_user_id: 'user_stf_01', last_checkin: '2026-07-09T08:15:00Z' },
  { id: 'dsk_002', name: 'A-002', code: 'A-002', site_id: 'site_001', site_name: 'London HQ', building_id: 'bld_001', floor_id: 'flr_001', floor_name: 'Ground Floor', area_id: 'area_001', area_name: 'Visitor Hot Desks', type: 'visitor desk', status: 'occupied', tag_id: 'tag_002', tag_status: 'active', current_user: 'Mike Davis', current_user_id: 'user_stf_02', last_checkin: '2026-07-09T09:00:00Z' },
  { id: 'dsk_003', name: 'A-003', code: 'A-003', site_id: 'site_001', site_name: 'London HQ', building_id: 'bld_001', floor_id: 'flr_001', floor_name: 'Ground Floor', area_id: 'area_001', area_name: 'Visitor Hot Desks', type: 'standard desk', status: 'available', tag_id: 'tag_003', tag_status: 'active', current_user: null, current_user_id: null, last_checkin: '2026-07-08T16:30:00Z' },
  { id: 'dsk_004', name: 'A-004', code: 'A-004', site_id: 'site_001', site_name: 'London HQ', building_id: 'bld_001', floor_id: 'flr_001', floor_name: 'Ground Floor', area_id: 'area_001', area_name: 'Visitor Hot Desks', type: 'standing desk', status: 'available', tag_id: 'tag_004', tag_status: 'active', current_user: null, current_user_id: null, last_checkin: '2026-07-08T17:00:00Z' },
  { id: 'dsk_005', name: 'A-005', code: 'A-005', site_id: 'site_001', site_name: 'London HQ', building_id: 'bld_001', floor_id: 'flr_001', floor_name: 'Ground Floor', area_id: 'area_001', area_name: 'Visitor Hot Desks', type: 'accessible desk', status: 'occupied', tag_id: 'tag_005', tag_status: 'active', current_user: 'Jenny Park', current_user_id: 'user_stf_03', last_checkin: '2026-07-09T08:45:00Z' },
  { id: 'dsk_006', name: 'A-006', code: 'A-006', site_id: 'site_001', site_name: 'London HQ', building_id: 'bld_001', floor_id: 'flr_001', floor_name: 'Ground Floor', area_id: 'area_001', area_name: 'Visitor Hot Desks', type: 'dual monitor desk', status: 'maintenance', tag_id: 'tag_006', tag_status: 'disabled', current_user: null, current_user_id: null, last_checkin: '2026-07-07T10:00:00Z' },
  { id: 'dsk_007', name: 'A-007', code: 'A-007', site_id: 'site_001', site_name: 'London HQ', building_id: 'bld_001', floor_id: 'flr_001', floor_name: 'Ground Floor', area_id: 'area_001', area_name: 'Visitor Hot Desks', type: 'standard desk', status: 'occupied', tag_id: 'tag_007', tag_status: 'active', current_user: 'Dan Miller', current_user_id: 'user_stf_04', last_checkin: '2026-07-09T09:15:00Z' },
  { id: 'dsk_008', name: 'A-008', code: 'A-008', site_id: 'site_001', site_name: 'London HQ', building_id: 'bld_001', floor_id: 'flr_001', floor_name: 'Ground Floor', area_id: 'area_001', area_name: 'Visitor Hot Desks', type: 'standard desk', status: 'occupied', tag_id: 'tag_008', tag_status: 'active', current_user: 'Anna White', current_user_id: 'user_stf_05', last_checkin: '2026-07-09T08:30:00Z' },
  { id: 'dsk_009', name: 'B-001', code: 'B-001', site_id: 'site_001', site_name: 'London HQ', building_id: 'bld_001', floor_id: 'flr_001', floor_name: 'Ground Floor', area_id: 'area_002', area_name: 'Quiet Work Area', type: 'quiet desk', status: 'occupied', tag_id: 'tag_009', tag_status: 'active', current_user: 'Chris Nolan', current_user_id: 'user_stf_06', last_checkin: '2026-07-09T07:50:00Z' },
  { id: 'dsk_010', name: 'B-002', code: 'B-002', site_id: 'site_001', site_name: 'London HQ', building_id: 'bld_001', floor_id: 'flr_001', floor_name: 'Ground Floor', area_id: 'area_002', area_name: 'Quiet Work Area', type: 'quiet desk', status: 'occupied', tag_id: 'tag_010', tag_status: 'active', current_user: 'Sam Taylor', current_user_id: 'user_stf_07', last_checkin: '2026-07-09T08:10:00Z' },
  { id: 'dsk_011', name: 'C-001', code: 'C-001', site_id: 'site_001', site_name: 'London HQ', building_id: 'bld_001', floor_id: 'flr_002', floor_name: 'First Floor', area_id: 'area_003', area_name: 'Engineering Zone', type: 'dual monitor desk', status: 'occupied', tag_id: 'tag_011', tag_status: 'active', current_user: 'Tom Chen', current_user_id: 'user_005', last_checkin: '2026-07-09T07:30:00Z' },
  { id: 'dsk_012', name: 'C-002', code: 'C-002', site_id: 'site_001', site_name: 'London HQ', building_id: 'bld_001', floor_id: 'flr_002', floor_name: 'First Floor', area_id: 'area_003', area_name: 'Engineering Zone', type: 'standing desk', status: 'occupied', tag_id: 'tag_012', tag_status: 'active', current_user: 'Nina Gupta', current_user_id: 'user_stf_08', last_checkin: '2026-07-09T08:00:00Z' },
  { id: 'dsk_013', name: 'C-003', code: 'C-003', site_id: 'site_001', site_name: 'London HQ', building_id: 'bld_001', floor_id: 'flr_002', floor_name: 'First Floor', area_id: 'area_003', area_name: 'Engineering Zone', type: 'standard desk', status: 'available', tag_id: 'tag_013', tag_status: 'active', current_user: null, current_user_id: null, last_checkin: '2026-07-08T18:00:00Z' },
  { id: 'dsk_014', name: 'D-001', code: 'D-001', site_id: 'site_001', site_name: 'London HQ', building_id: 'bld_002', floor_id: 'flr_003', floor_name: 'Ground Floor', area_id: 'area_004', area_name: 'Sales Zone', type: 'team desk', status: 'occupied', tag_id: 'tag_014', tag_status: 'active', current_user: 'Lisa Brown', current_user_id: 'user_006', last_checkin: '2026-07-09T08:05:00Z' },
  { id: 'dsk_015', name: 'D-002', code: 'D-002', site_id: 'site_001', site_name: 'London HQ', building_id: 'bld_002', floor_id: 'flr_003', floor_name: 'Ground Floor', area_id: 'area_004', area_name: 'Sales Zone', type: 'standard desk', status: 'available', tag_id: 'tag_015', tag_status: 'active', current_user: null, current_user_id: null, last_checkin: '2026-07-08T17:30:00Z' },
  { id: 'dsk_016', name: 'D-003', code: 'D-003', site_id: 'site_001', site_name: 'London HQ', building_id: 'bld_002', floor_id: 'flr_003', floor_name: 'Ground Floor', area_id: 'area_004', area_name: 'Sales Zone', type: 'standard desk', status: 'available', tag_id: 'tag_016', tag_status: 'unassigned', current_user: null, current_user_id: null, last_checkin: null },
  { id: 'dsk_017', name: 'E-001', code: 'E-001', site_id: 'site_001', site_name: 'London HQ', building_id: 'bld_002', floor_id: 'flr_003', floor_name: 'Ground Floor', area_id: 'area_005', area_name: 'Marketing Hub', type: 'standard desk', status: 'occupied', tag_id: 'tag_017', tag_status: 'active', current_user: 'Ravi Singh', current_user_id: 'user_007', last_checkin: '2026-07-09T08:20:00Z' },
  { id: 'dsk_018', name: 'E-002', code: 'E-002', site_id: 'site_001', site_name: 'London HQ', building_id: 'bld_002', floor_id: 'flr_003', floor_name: 'Ground Floor', area_id: 'area_005', area_name: 'Marketing Hub', type: 'standard desk', status: 'available', tag_id: 'tag_018', tag_status: 'active', current_user: null, current_user_id: null, last_checkin: '2026-07-08T16:45:00Z' },
  { id: 'dsk_019', name: 'F-001', code: 'F-001', site_id: 'site_001', site_name: 'London HQ', building_id: 'bld_002', floor_id: 'flr_004', floor_name: 'First Floor', area_id: 'area_006', area_name: 'Finance & Legal', type: 'manager desk', status: 'occupied', tag_id: 'tag_019', tag_status: 'active', current_user: 'Helen Gray', current_user_id: 'user_stf_09', last_checkin: '2026-07-09T07:45:00Z' },
  { id: 'dsk_020', name: 'F-002', code: 'F-002', site_id: 'site_001', site_name: 'London HQ', building_id: 'bld_002', floor_id: 'flr_004', floor_name: 'First Floor', area_id: 'area_006', area_name: 'Finance & Legal', type: 'standard desk', status: 'available', tag_id: 'tag_020', tag_status: 'active', current_user: null, current_user_id: null, last_checkin: '2026-07-08T17:00:00Z' },
];

export const mockDesks = deskNames;

export const mockDeskTags = [
  { id: 'tag_001', company_id: 'comp_01HX9K8N3P', desk_id: 'dsk_001', desk_name: 'A-001', site_id: 'site_001', site_name: 'London HQ', tag_type: 'QR code', tag_code: 'HDH-LON-001', tag_url: '/staff/check-in?desk=A-001', status: 'active', created_at: '2026-06-01T00:00:00Z', last_scanned_at: '2026-07-09T08:15:00Z' },
  { id: 'tag_002', company_id: 'comp_01HX9K8N3P', desk_id: 'dsk_002', desk_name: 'A-002', site_id: 'site_001', site_name: 'London HQ', tag_type: 'NFC tag', tag_code: 'HDH-LON-002', tag_url: '/staff/check-in?desk=A-002', status: 'active', created_at: '2026-06-01T00:00:00Z', last_scanned_at: '2026-07-09T09:00:00Z' },
  { id: 'tag_003', company_id: 'comp_01HX9K8N3P', desk_id: 'dsk_003', desk_name: 'A-003', site_id: 'site_001', site_name: 'London HQ', tag_type: 'QR + NFC', tag_code: 'HDH-LON-003', tag_url: '/staff/check-in?desk=A-003', status: 'active', created_at: '2026-06-01T00:00:00Z', last_scanned_at: '2026-07-08T16:30:00Z' },
  { id: 'tag_004', company_id: 'comp_01HX9K8N3P', desk_id: 'dsk_004', desk_name: 'A-004', site_id: 'site_001', site_name: 'London HQ', tag_type: 'QR code', tag_code: 'HDH-LON-004', tag_url: '/staff/check-in?desk=A-004', status: 'active', created_at: '2026-06-01T00:00:00Z', last_scanned_at: '2026-07-08T17:00:00Z' },
  { id: 'tag_005', company_id: 'comp_01HX9K8N3P', desk_id: 'dsk_005', desk_name: 'A-005', site_id: 'site_001', site_name: 'London HQ', tag_type: 'QR code', tag_code: 'HDH-LON-005', tag_url: '/staff/check-in?desk=A-005', status: 'active', created_at: '2026-06-01T00:00:00Z', last_scanned_at: '2026-07-09T08:45:00Z' },
  { id: 'tag_006', company_id: 'comp_01HX9K8N3P', desk_id: 'dsk_006', desk_name: 'A-006', site_id: 'site_001', site_name: 'London HQ', tag_type: 'QR code', tag_code: 'HDH-LON-006', tag_url: '/staff/check-in?desk=A-006', status: 'disabled', created_at: '2026-06-01T00:00:00Z', last_scanned_at: '2026-07-07T10:00:00Z' },
  { id: 'tag_007', company_id: 'comp_01HX9K8N3P', desk_id: 'dsk_007', desk_name: 'A-007', site_id: 'site_001', site_name: 'London HQ', tag_type: 'NFC tag', tag_code: 'HDH-LON-007', tag_url: '/staff/check-in?desk=A-007', status: 'active', created_at: '2026-06-01T00:00:00Z', last_scanned_at: '2026-07-09T09:15:00Z' },
  { id: 'tag_008', company_id: 'comp_01HX9K8N3P', desk_id: 'dsk_008', desk_name: 'A-008', site_id: 'site_001', site_name: 'London HQ', tag_type: 'QR + NFC', tag_code: 'HDH-LON-008', tag_url: '/staff/check-in?desk=A-008', status: 'active', created_at: '2026-06-01T00:00:00Z', last_scanned_at: '2026-07-09T08:30:00Z' },
  { id: 'tag_016', company_id: 'comp_01HX9K8N3P', desk_id: null, desk_name: null, site_id: 'site_001', site_name: 'London HQ', tag_type: 'QR code', tag_code: 'HDH-LON-016', tag_url: '/staff/check-in?tag=HDH-LON-016', status: 'unassigned', created_at: '2026-06-15T00:00:00Z', last_scanned_at: null },
  { id: 'tag_021', company_id: 'comp_01HX9K8N3P', desk_id: null, desk_name: null, site_id: 'site_002', site_name: 'Manchester Office', tag_type: 'QR code', tag_code: 'HDH-MAN-021', tag_url: '/staff/check-in?tag=HDH-MAN-021', status: 'unassigned', created_at: '2026-06-20T00:00:00Z', last_scanned_at: null },
  { id: 'tag_022', company_id: 'comp_01HX9K8N3P', desk_id: 'dsk_011', desk_name: 'C-001', site_id: 'site_001', site_name: 'London HQ', tag_type: 'QR + NFC', tag_code: 'HDH-LON-011', tag_url: '/staff/check-in?desk=C-001', status: 'lost', created_at: '2026-06-01T00:00:00Z', last_scanned_at: '2026-07-05T00:00:00Z' },
];

export const mockCheckIns = [
  { id: 'ci_001', company_id: 'comp_01HX9K8N3P', desk_id: 'dsk_001', desk_name: 'A-001', user_id: 'user_stf_01', user_name: 'Sarah Jones', site_id: 'site_001', site_name: 'London HQ', building_id: 'bld_001', building_name: 'King William House', floor_id: 'flr_001', floor_name: 'Ground Floor', area_id: 'area_001', area_name: 'Visitor Hot Desks', checked_in_at: '2026-07-09T08:15:00Z', checked_out_at: null, duration_minutes: null, status: 'active', source: 'nfc' },
  { id: 'ci_002', company_id: 'comp_01HX9K8N3P', desk_id: 'dsk_002', desk_name: 'A-002', user_id: 'user_stf_02', user_name: 'Mike Davis', site_id: 'site_001', site_name: 'London HQ', building_id: 'bld_001', building_name: 'King William House', floor_id: 'flr_001', floor_name: 'Ground Floor', area_id: 'area_001', area_name: 'Visitor Hot Desks', checked_in_at: '2026-07-09T09:00:00Z', checked_out_at: null, duration_minutes: null, status: 'active', source: 'qr' },
  { id: 'ci_003', company_id: 'comp_01HX9K8N3P', desk_id: 'dsk_005', desk_name: 'A-005', user_id: 'user_stf_03', user_name: 'Jenny Park', site_id: 'site_001', site_name: 'London HQ', building_id: 'bld_001', building_name: 'King William House', floor_id: 'flr_001', floor_name: 'Ground Floor', area_id: 'area_001', area_name: 'Visitor Hot Desks', checked_in_at: '2026-07-09T08:45:00Z', checked_out_at: null, duration_minutes: null, status: 'active', source: 'qr' },
  { id: 'ci_004', company_id: 'comp_01HX9K8N3P', desk_id: 'dsk_009', desk_name: 'B-001', user_id: 'user_stf_06', user_name: 'Chris Nolan', site_id: 'site_001', site_name: 'London HQ', building_id: 'bld_001', building_name: 'King William House', floor_id: 'flr_001', floor_name: 'Ground Floor', area_id: 'area_002', area_name: 'Quiet Work Area', checked_in_at: '2026-07-09T07:50:00Z', checked_out_at: null, duration_minutes: null, status: 'active', source: 'nfc' },
  { id: 'ci_005', company_id: 'comp_01HX9K8N3P', desk_id: 'dsk_011', desk_name: 'C-001', user_id: 'user_005', user_name: 'Tom Chen', site_id: 'site_001', site_name: 'London HQ', building_id: 'bld_001', building_name: 'King William House', floor_id: 'flr_002', floor_name: 'First Floor', area_id: 'area_003', area_name: 'Engineering Zone', checked_in_at: '2026-07-09T07:30:00Z', checked_out_at: null, duration_minutes: null, status: 'active', source: 'nfc' },
  { id: 'ci_006', company_id: 'comp_01HX9K8N3P', desk_id: 'dsk_003', desk_name: 'A-003', user_id: 'user_stf_10', user_name: 'Oliver Reed', site_id: 'site_001', site_name: 'London HQ', building_id: 'bld_001', building_name: 'King William House', floor_id: 'flr_001', floor_name: 'Ground Floor', area_id: 'area_001', area_name: 'Visitor Hot Desks', checked_in_at: '2026-07-08T09:00:00Z', checked_out_at: '2026-07-08T16:30:00Z', duration_minutes: 450, status: 'completed', source: 'qr' },
  { id: 'ci_007', company_id: 'comp_01HX9K8N3P', desk_id: 'dsk_004', desk_name: 'A-004', user_id: 'user_stf_01', user_name: 'Sarah Jones', site_id: 'site_001', site_name: 'London HQ', building_id: 'bld_001', building_name: 'King William House', floor_id: 'flr_001', floor_name: 'Ground Floor', area_id: 'area_001', area_name: 'Visitor Hot Desks', checked_in_at: '2026-07-08T08:30:00Z', checked_out_at: '2026-07-08T17:00:00Z', duration_minutes: 510, status: 'completed', source: 'nfc' },
  { id: 'ci_008', company_id: 'comp_01HX9K8N3P', desk_id: 'dsk_013', desk_name: 'C-003', user_id: 'user_stf_08', user_name: 'Nina Gupta', site_id: 'site_001', site_name: 'London HQ', building_id: 'bld_001', building_name: 'King William House', floor_id: 'flr_002', floor_name: 'First Floor', area_id: 'area_003', area_name: 'Engineering Zone', checked_in_at: '2026-07-08T09:15:00Z', checked_out_at: '2026-07-08T18:00:00Z', duration_minutes: 525, status: 'completed', source: 'qr' },
];

export const mockIssues = [
  { id: 'iss_001', company_id: 'comp_01HX9K8N3P', desk_id: 'dsk_006', desk_name: 'A-006', site_id: 'site_001', site_name: 'London HQ', building_id: 'bld_001', building_name: 'King William House', floor_id: 'flr_001', floor_name: 'Ground Floor', area_id: 'area_001', area_name: 'Visitor Hot Desks', reported_by: 'user_stf_02', reporter_name: 'Mike Davis', issue_type: 'monitor issue', description: 'Monitor flickers and occasionally goes black for a few seconds.', priority: 'medium', status: 'in progress', assigned_to: 'user_004', assigned_to_name: 'Priya Patel', created_at: '2026-07-07T10:00:00Z' },
  { id: 'iss_002', company_id: 'comp_01HX9K8N3P', desk_id: 'dsk_009', desk_name: 'B-001', site_id: 'site_001', site_name: 'London HQ', building_id: 'bld_001', building_name: 'King William House', floor_id: 'flr_001', floor_name: 'Ground Floor', area_id: 'area_002', area_name: 'Quiet Work Area', reported_by: 'user_stf_06', reporter_name: 'Chris Nolan', issue_type: 'desk damage', description: 'Desk surface has a deep scratch and the edge trim is peeling.', priority: 'low', status: 'open', assigned_to: null, assigned_to_name: null, created_at: '2026-07-08T14:00:00Z' },
  { id: 'iss_003', company_id: 'comp_01HX9K8N3P', desk_id: 'dsk_012', desk_name: 'C-002', site_id: 'site_001', site_name: 'London HQ', building_id: 'bld_001', building_name: 'King William House', floor_id: 'flr_002', floor_name: 'First Floor', area_id: 'area_003', area_name: 'Engineering Zone', reported_by: 'user_stf_08', reporter_name: 'Nina Gupta', issue_type: 'power issue', description: 'Power socket on the desk is not working. Tested with multiple devices.', priority: 'high', status: 'open', assigned_to: null, assigned_to_name: null, created_at: '2026-07-09T08:00:00Z' },
  { id: 'iss_004', company_id: 'comp_01HX9K8N3P', desk_id: 'dsk_015', desk_name: 'D-002', site_id: 'site_001', site_name: 'London HQ', building_id: 'bld_002', building_name: 'East Wing', floor_id: 'flr_003', floor_name: 'Ground Floor', area_id: 'area_004', area_name: 'Sales Zone', reported_by: 'user_006', reporter_name: 'Lisa Brown', issue_type: 'cleaning needed', description: 'Desk area needs a deep clean — coffee stains and crumbs.', priority: 'low', status: 'resolved', assigned_to: 'user_004', assigned_to_name: 'Priya Patel', created_at: '2026-07-06T11:00:00Z' },
];

export const siteStatuses = ['draft', 'active', 'inactive', 'archived'];
export const buildingStatuses = ['draft', 'active', 'inactive', 'archived'];
export const floorStatuses = ['draft', 'active', 'inactive', 'archived'];
export const areaStatuses = ['draft', 'active', 'inactive', 'archived'];

export const allDeskTypes = [
  'standard desk',
  'standing desk',
  'quiet desk',
  'accessible desk',
  'dual monitor desk',
  'visitor desk',
  'team desk',
  'manager desk',
  'training desk',
];

export const allDeskStatuses = [
  'draft',
  'active',
  'available',
  'occupied',
  'booked',
  'maintenance',
  'inactive',
  'archived',
];

export const tagTypes = ['QR code', 'NFC tag', 'QR + NFC'];
export const tagStatuses = ['unassigned', 'assigned', 'active', 'disabled', 'lost', 'replaced'];

export const issueTypes = [
  'broken chair',
  'monitor issue',
  'desk damage',
  'power issue',
  'cleaning needed',
  'accessibility issue',
  'other',
];

export const issuePriorities = ['low', 'medium', 'high', 'urgent'];
export const issueStatuses = ['open', 'in progress', 'resolved', 'closed'];

export const checkInSources = ['qr', 'nfc', 'manual'];
export const checkInStatuses = ['active', 'completed', 'cancelled'];

export const liveStatusStats = {
  total_active_desks: 60,
  available_desks: 18,
  occupied_desks: 32,
  booked_desks: 0,
  maintenance_desks: 3,
  inactive_desks: 7,
  active_checkins: 32,
  desks_with_issues: 4,
};

export const countryOptions = ['UK', 'US', 'Canada', 'Australia', 'Germany', 'France', 'Netherlands', 'Ireland', 'Singapore', 'UAE'];

export const timezoneOptions = [
  'Europe/London',
  'Europe/Paris',
  'Europe/Berlin',
  'America/New_York',
  'America/Chicago',
  'America/Los_Angeles',
  'America/Toronto',
  'Australia/Sydney',
  'Asia/Singapore',
  'Asia/Dubai',
];