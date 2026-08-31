// ⚠️ PROVISIONAL CONTRACT — built against feature_cols_final_PLACEHOLDER
// (19 columns, teammate confirmed this is short of the ~32 target and may
// be pre-encoding). DO NOT treat `key` values below as final — once the
// real feature_cols_final lands, this file (and only this file, plus
// FeatureBreakdown's displayPriority filter) should need updating —
// no component should need to change shape.
//
// Changes from the earlier mock, per contract review:
//   - riskScore (single float) replaced with riskProbabilities (full softmax)
//   - riskTier is now lowercase, derived from argmax of riskProbabilities
//   - added modelVersion + predictedAt — predictions are BATCH-computed
//     (GAT needs full graph context, can't do live per-student inference
//     on a Pi Zero), so the UI needs to show staleness, not pretend "live"
//   - feature keys now match feature_cols_final_PLACEHOLDER instead of
//     invented names like gradeSlope/peerComparison
//   - displayPriority flag lets the UI curate a top-N view without the
//     backend needing to change every time the UI wants to surface
//     a different feature

/*const FEATURE_LABELS = {
  School: { label: "School", unit: "", displayPriority: false },
  Gender: { label: "Gender", unit: "", displayPriority: false },
  "Class level": { label: "Class Level", unit: "", displayPriority: false },
  "Parental educational level": {
    label: "Parental Education Level",
    unit: "",
    displayPriority: false,
  },
  attendance_mean: {
    label: "Average Attendance",
    unit: "%",
    displayPriority: true,
  },
  attendance_std: {
    label: "Attendance Variability",
    unit: "",
    displayPriority: false,
  },
  "Semester 1 average": {
    label: "Semester 1 Average",
    unit: "%",
    displayPriority: true,
  },
  "Semester 2 average": {
    label: "Semester 2 Average",
    unit: "%",
    displayPriority: true,
  },
  "Semester difference": {
    label: "Semester-to-Semester Change",
    unit: "",
    displayPriority: true,
  },
  "Household income level (standardized)": {
    label: "Household Income Level",
    unit: "",
    displayPriority: false,
  },
  "Family dropout history": {
    label: "Family Dropout History",
    unit: "",
    displayPriority: false,
  },
  "Child labor involvement": {
    label: "Child Labor Involvement",
    unit: "",
    displayPriority: false,
  },
  "Travel time to school (minutes)": {
    label: "Travel Time to School",
    unit: "min",
    displayPriority: false,
  },
  "Mode of transport": {
    label: "Mode of Transport",
    unit: "",
    displayPriority: false,
  },
  "Teacher relationship quality": {
    label: "Teacher Relationship Quality",
    unit: "",
    displayPriority: true,
  },
  "Peer relationship quality": {
    label: "Peer Relationship Quality",
    unit: "",
    displayPriority: true,
  },
  "Extra-curricular activities": {
    label: "Extra-Curricular Activities",
    unit: "",
    displayPriority: false,
  },
  long_commute_flag: {
    label: "Long Commute Flag",
    unit: "",
    displayPriority: false,
  },
  long_walk_flag: { label: "Long Walk Flag", unit: "", displayPriority: false },
};

import { mockStudents } from "./mockStudents";

function buildFeatures(values) {
  return Object.entries(values).map(([key, value]) => ({
    key,
    value,
    ...(FEATURE_LABELS[key] ?? {
      label: key,
      unit: "",
      displayPriority: false,
    }),
  }));
}

export const mockStudentDetails = {
  "stu-001": {
    id: "stu-001",
    name: "Ama Serwaa",
    riskTier: "high",
    riskProbabilities: { low: 0.04, medium: 0.09, high: 0.87 },
    modelVersion: "gated-gat-v2-PLACEHOLDER",
    predictedAt: "2026-08-01T00:00:00Z",
    features: buildFeatures({
      School: "Osei Tutu JHS",
      Gender: "Female",
      "Class level": "JHS 2",
      "Parental educational level": "Primary",
      attendance_mean: 0.42,
      attendance_std: 0.18,
      "Semester 1 average": 0.58,
      "Semester 2 average": 0.41,
      "Semester difference": -0.17,
      "Household income level (standardized)": -0.62,
      "Family dropout history": 1,
      "Child labor involvement": 1,
      "Travel time to school (minutes)": 55,
      "Mode of transport": "Walking",
      "Teacher relationship quality": 0.31,
      "Peer relationship quality": 0.28,
      "Extra-curricular activities": 0,
      long_commute_flag: 1,
      long_walk_flag: 1,
    }),
    explanationGraph: {
      nodes: [
        { id: "stu-001", name: "Ama Serwaa", isTarget: true },
        { id: "stu-014", name: "Peer: Kojo A." },
        { id: "stu-027", name: "Peer: Abena T." },
        { id: "stu-033", name: "Peer: Nana K." },
      ],
      edges: [
        { source: "stu-001", target: "stu-014", attentionWeight: 0.81 },
        { source: "stu-001", target: "stu-027", attentionWeight: 0.63 },
        { source: "stu-001", target: "stu-033", attentionWeight: 0.22 },
      ],
    },
  },
  "stu-004": {
    id: "stu-004",
    name: "Yaw Owusu",
    riskTier: "high",
    riskProbabilities: { low: 0.06, medium: 0.15, high: 0.79 },
    modelVersion: "gated-gat-v2-PLACEHOLDER",
    predictedAt: "2026-08-01T00:00:00Z",
    features: buildFeatures({
      School: "Osei Tutu JHS",
      Gender: "Male",
      "Class level": "JHS 3",
      "Parental educational level": "None",
      attendance_mean: 0.51,
      attendance_std: 0.22,
      "Semester 1 average": 0.49,
      "Semester 2 average": 0.44,
      "Semester difference": -0.05,
      "Household income level (standardized)": -0.38,
      "Family dropout history": 0,
      "Child labor involvement": 1,
      "Travel time to school (minutes)": 30,
      "Mode of transport": "Bicycle",
      "Teacher relationship quality": 0.4,
      "Peer relationship quality": 0.35,
      "Extra-curricular activities": 0,
      long_commute_flag: 0,
      long_walk_flag: 0,
    }),
    explanationGraph: {
      nodes: [
        { id: "stu-004", name: "Yaw Owusu", isTarget: true },
        { id: "stu-002", name: "Peer: Kwame B." },
        { id: "stu-019", name: "Peer: Efua A." },
      ],
      edges: [
        { source: "stu-004", target: "stu-002", attentionWeight: 0.71 },
        { source: "stu-004", target: "stu-019", attentionWeight: 0.45 },
      ],
    },
  },
};

// Riskscore-to-probability mapping for fallback students — approximates a
// softmax shape around whatever tier/score the dashboard mock assigned,
// so the fallback detail page stays visually consistent with the roster.
function fallbackProbabilities(tier, score) {
  if (tier === "high")
    return { low: (1 - score) * 0.3, medium: (1 - score) * 0.7, high: score };
  if (tier === "medium")
    return { low: (1 - score) * 0.5, medium: score, high: (1 - score) * 0.5 };
  return { low: 1 - score, medium: score * 0.6, high: score * 0.4 };
}

export function getMockStudentDetail(id) {
  if (mockStudentDetails[id]) return mockStudentDetails[id];

  // Fall back to the dashboard's roster entry so name/tier stay consistent
  // instead of showing a generic "Unknown Student" for anyone who doesn't
  // yet have full detail data in mockStudentDetails above.
  const rosterEntry = mockStudents.find((s) => s.id === id);
  const name = rosterEntry?.name ?? "Unknown Student";
  const riskTier = rosterEntry?.riskTier ?? "low";
  const riskScore = rosterEntry?.riskScore ?? 0.15;

  return {
    id,
    name,
    riskTier,
    riskProbabilities: fallbackProbabilities(riskTier, riskScore),
    modelVersion: "gated-gat-v2-PLACEHOLDER",
    predictedAt: "2026-08-01T00:00:00Z",
    features: buildFeatures({
      attendance_mean: 1 - riskScore * 0.6,
      "Semester 1 average": 1 - riskScore * 0.5,
      "Semester 2 average": 1 - riskScore * 0.55,
      "Semester difference": -riskScore * 0.2,
      "Teacher relationship quality": 1 - riskScore * 0.5,
      "Peer relationship quality": 1 - riskScore * 0.5,
    }),
    explanationGraph: {
      nodes: [{ id, name, isTarget: true }],
      edges: [],
    },
  };
}*/
