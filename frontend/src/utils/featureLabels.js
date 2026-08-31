// Single place that maps a raw feature key (from feature_cols_final_PLACEHOLDER)
// to how it should be displayed. The backend only needs to send
// { key, value } pairs — it doesn't need to know about labels, units, or
// which features are "priority" for the UI. That's a frontend display
// concern, kept separate so the API contract stays minimal.
//
// ⚠️ Still PLACEHOLDER — keys must be updated once the real
// feature_cols_final list replaces the 19-column placeholder.
const FEATURE_LABELS = {
  School: { label: 'School', unit: '', displayPriority: false },
  Gender: { label: 'Gender', unit: '', displayPriority: false },
  'Class level': { label: 'Class Level', unit: '', displayPriority: false },
  'Parental educational level': { label: 'Parental Education Level', unit: '', displayPriority: false },
  attendance_mean: { label: 'Average Attendance', unit: '%', displayPriority: true },
  attendance_std: { label: 'Attendance Variability', unit: '', displayPriority: false },
  'Semester 1 average': { label: 'Semester 1 Average', unit: '%', displayPriority: true },
  'Semester 2 average': { label: 'Semester 2 Average', unit: '%', displayPriority: true },
  'Semester difference': { label: 'Semester-to-Semester Change', unit: '', displayPriority: true },
  'Household income level (standardized)': { label: 'Household Income Level', unit: '', displayPriority: false },
  'Family dropout history': { label: 'Family Dropout History', unit: '', displayPriority: false },
  'Child labor involvement': { label: 'Child Labor Involvement', unit: '', displayPriority: false },
  'Travel time to school (minutes)': { label: 'Travel Time to School', unit: 'min', displayPriority: false },
  'Mode of transport': { label: 'Mode of Transport', unit: '', displayPriority: false },
  'Teacher relationship quality': { label: 'Teacher Relationship Quality', unit: '', displayPriority: true },
  'Peer relationship quality': { label: 'Peer Relationship Quality', unit: '', displayPriority: true },
  'Extra-curricular activities': { label: 'Extra-Curricular Activities', unit: '', displayPriority: false },
  long_commute_flag: { label: 'Long Commute Flag', unit: '', displayPriority: false },
  long_walk_flag: { label: 'Long Walk Flag', unit: '', displayPriority: false },
};

// Takes the raw [{ key, value }] array from the API and attaches display
// metadata. Any key not in the mapping above falls back to showing the
// raw key as its own label — keeps the UI from crashing on an unmapped
// field once the real feature list lands with different column names.
export function enrichFeatures(rawFeatures) {
  return rawFeatures.map(({ key, value }) => ({
    key,
    value,
    ...(FEATURE_LABELS[key] ?? { label: key, unit: '', displayPriority: false }),
  }));
}
