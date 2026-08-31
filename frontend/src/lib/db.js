import Dexie from 'dexie';

// IndexedDB-backed storage via Dexie. Real persistence, not mock data —
// student profiles and metric updates are things teachers genuinely enter
// and need to survive a closed tab, dropped connection, or device reboot.
export const db = new Dexie('earlyflagDB');

// Bumped to version 2: added `students` and `metricsUpdates` tables
// alongside the existing `interventions` table from before. Dexie handles
// this upgrade automatically — no migration script needed since we're only
// adding tables, not changing existing ones.
db.version(2).stores({
  interventions: '++id, studentId, createdAt, synced',

  // One row per student, entered once when they join the roster.
  // Holds the STATIC fields — things that rarely change (household
  // income, family history, travel time, etc.) per feature_cols_final_PLACEHOLDER.
  students: 'id, name, createdAt, synced',

  // One row per periodic check-in. A student accumulates many of these
  // over time — this is what lets risk actually change as new attendance/
  // grade data comes in. Holds the RECURRING fields (attendance, semester
  // averages, relationship quality, etc.)
  metricsUpdates: '++id, studentId, recordedAt, synced',
});

export const INTERVENTION_TYPES = [
  'Parent/guardian contact',
  'One-on-one conversation',
  'Referred to counselor',
  'Attendance follow-up',
  'Academic support arranged',
  'Other',
];

// ---- Interventions (existing) ----

export async function addIntervention({ studentId, studentName, type, note }) {
  return db.interventions.add({
    studentId,
    studentName,
    type,
    note,
    createdAt: new Date().toISOString(),
    synced: false,
  });
}

export function getInterventionsForStudent(studentId) {
  return db.interventions.where('studentId').equals(studentId).reverse().sortBy('createdAt');
}

export function getAllInterventions() {
  return db.interventions.orderBy('createdAt').reverse().toArray();
}

// ---- Students (new) ----

export const PARENTAL_EDUCATION_LEVELS = ['None', 'Primary', 'JHS', 'SHS', 'Tertiary'];
export const TRANSPORT_MODES = ['Walking', 'Bicycle', 'Public transport', 'Private vehicle', 'Other'];

function generateStudentId() {
  return `stu-local-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

export async function addStudent(profile) {
  const id = generateStudentId();
  await db.students.add({
    id,
    ...profile,
    createdAt: new Date().toISOString(),
    synced: false,
  });
  return id;
}

export function getAllLocalStudents() {
  return db.students.orderBy('createdAt').reverse().toArray();
}

export function getStudent(id) {
  return db.students.get(id);
}

// ---- Metrics updates (new) ----

export async function addMetricsUpdate({ studentId, ...metrics }) {
  return db.metricsUpdates.add({
    studentId,
    ...metrics,
    recordedAt: new Date().toISOString(),
    synced: false,
  });
}

export function getMetricsHistoryForStudent(studentId) {
  return db.metricsUpdates.where('studentId').equals(studentId).reverse().sortBy('recordedAt');
}

export async function getLatestMetricsForStudent(studentId) {
  const history = await getMetricsHistoryForStudent(studentId);
  return history[0] ?? null;
}
