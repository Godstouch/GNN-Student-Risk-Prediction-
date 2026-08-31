"""
Mock data matching the real API contract shape — feature keys mirror
feature_cols_final_PLACEHOLDER (19 columns, provisional pending the real
post-feature-engineering list). Swap this whole module out once real
inference exists; routes in app.py should not need to change.
"""

from datetime import datetime, timezone

MODEL_VERSION = "gated-gat-v2-PLACEHOLDER"
PREDICTED_AT = "2026-08-01T00:00:00Z"

_STUDENTS = {
    "stu-001": {
        "id": "stu-001",
        "name": "Ama Serwaa",
        "riskTier": "high",
        "riskProbabilities": {"low": 0.04, "medium": 0.09, "high": 0.87},
        "features": {
            "School": "Osei Tutu JHS",
            "Gender": "Female",
            "Class level": "JHS 2",
            "Parental educational level": "Primary",
            "attendance_mean": 0.42,
            "attendance_std": 0.18,
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
            "long_commute_flag": 1,
            "long_walk_flag": 1,
        },
        "explanationGraph": {
            "nodes": [
                {"id": "stu-001", "name": "Ama Serwaa", "isTarget": True},
                {"id": "stu-014", "name": "Peer: Kojo A."},
                {"id": "stu-027", "name": "Peer: Abena T."},
                {"id": "stu-033", "name": "Peer: Nana K."},
            ],
            "edges": [
                {"source": "stu-001", "target": "stu-014", "attentionWeight": 0.81},
                {"source": "stu-001", "target": "stu-027", "attentionWeight": 0.63},
                {"source": "stu-001", "target": "stu-033", "attentionWeight": 0.22},
            ],
        },
    },
    "stu-002": {
        "id": "stu-002",
        "name": "Kwame Boateng",
        "riskTier": "medium",
        "riskProbabilities": {"low": 0.25, "medium": 0.54, "high": 0.21},
        "features": {
            "School": "Osei Tutu JHS",
            "Gender": "Male",
            "Class level": "JHS 1",
            "Parental educational level": "JHS",
            "attendance_mean": 0.68,
            "attendance_std": 0.15,
            "Semester 1 average": 0.61,
            "Semester 2 average": 0.57,
            "Semester difference": -0.04,
            "Household income level (standardized)": -0.10,
            "Family dropout history": 0,
            "Child labor involvement": 0,
            "Travel time to school (minutes)": 20,
            "Mode of transport": "Bicycle",
            "Teacher relationship quality": 0.55,
            "Peer relationship quality": 0.60,
            "Extra-curricular activities": 1,
            "long_commute_flag": 0,
            "long_walk_flag": 0,
        },
        "explanationGraph": {
            "nodes": [
                {"id": "stu-002", "name": "Kwame Boateng", "isTarget": True},
                {"id": "stu-001", "name": "Peer: Ama S."},
            ],
            "edges": [
                {"source": "stu-002", "target": "stu-001", "attentionWeight": 0.40},
            ],
        },
    },
    "stu-003": {
        "id": "stu-003",
        "name": "Efua Mensah",
        "riskTier": "low",
        "riskProbabilities": {"low": 0.81, "medium": 0.14, "high": 0.05},
        "features": {
            "School": "Osei Tutu JHS",
            "Gender": "Female",
            "Class level": "JHS 3",
            "Parental educational level": "SHS",
            "attendance_mean": 0.92,
            "attendance_std": 0.06,
            "Semester 1 average": 0.88,
            "Semester 2 average": 0.90,
            "Semester difference": 0.02,
            "Household income level (standardized)": 0.35,
            "Family dropout history": 0,
            "Child labor involvement": 0,
            "Travel time to school (minutes)": 10,
            "Mode of transport": "Private vehicle",
            "Teacher relationship quality": 0.78,
            "Peer relationship quality": 0.82,
            "Extra-curricular activities": 1,
            "long_commute_flag": 0,
            "long_walk_flag": 0,
        },
        "explanationGraph": {
            "nodes": [{"id": "stu-003", "name": "Efua Mensah", "isTarget": True}],
            "edges": [],
        },
    },
    "stu-004": {
        "id": "stu-004",
        "name": "Yaw Owusu",
        "riskTier": "high",
        "riskProbabilities": {"low": 0.06, "medium": 0.15, "high": 0.79},
        "features": {
            "School": "Osei Tutu JHS",
            "Gender": "Male",
            "Class level": "JHS 3",
            "Parental educational level": "None",
            "attendance_mean": 0.51,
            "attendance_std": 0.22,
            "Semester 1 average": 0.49,
            "Semester 2 average": 0.44,
            "Semester difference": -0.05,
            "Household income level (standardized)": -0.38,
            "Family dropout history": 0,
            "Child labor involvement": 1,
            "Travel time to school (minutes)": 30,
            "Mode of transport": "Bicycle",
            "Teacher relationship quality": 0.40,
            "Peer relationship quality": 0.35,
            "Extra-curricular activities": 0,
            "long_commute_flag": 0,
            "long_walk_flag": 0,
        },
        "explanationGraph": {
            "nodes": [
                {"id": "stu-004", "name": "Yaw Owusu", "isTarget": True},
                {"id": "stu-002", "name": "Peer: Kwame B."},
                {"id": "stu-019", "name": "Peer: Efua A."},
            ],
            "edges": [
                {"source": "stu-004", "target": "stu-002", "attentionWeight": 0.71},
                {"source": "stu-004", "target": "stu-019", "attentionWeight": 0.45},
            ],
        },
    },
    "stu-005": {
        "id": "stu-005",
        "name": "Adjoa Darko",
        "riskTier": "medium",
        "riskProbabilities": {"low": 0.30, "medium": 0.46, "high": 0.24},
        "features": {
            "School": "Osei Tutu JHS",
            "Gender": "Female",
            "Class level": "JHS 2",
            "Parental educational level": "Primary",
            "attendance_mean": 0.70,
            "attendance_std": 0.14,
            "Semester 1 average": 0.63,
            "Semester 2 average": 0.60,
            "Semester difference": -0.03,
            "Household income level (standardized)": -0.15,
            "Family dropout history": 0,
            "Child labor involvement": 0,
            "Travel time to school (minutes)": 25,
            "Mode of transport": "Walking",
            "Teacher relationship quality": 0.50,
            "Peer relationship quality": 0.52,
            "Extra-curricular activities": 0,
            "long_commute_flag": 0,
            "long_walk_flag": 0,
        },
        "explanationGraph": {
            "nodes": [{"id": "stu-005", "name": "Adjoa Darko", "isTarget": True}],
            "edges": [],
        },
    },
}


def get_mock_meta():
    return {
        "modelVersion": MODEL_VERSION,
        "lastComputedAt": PREDICTED_AT,
        "featureList": list(next(iter(_STUDENTS.values()))["features"].keys()),
        "generatedAt": datetime.now(timezone.utc).isoformat(),
    }


def get_mock_student_summaries():
    return [
        {
            "id": s["id"],
            "name": s["name"],
            "riskTier": s["riskTier"],
            "riskScore": s["riskProbabilities"][s["riskTier"]],
        }
        for s in _STUDENTS.values()
    ]


def get_mock_student_detail(student_id):
    student = _STUDENTS.get(student_id)
    if student is None:
        return None
    return {
        "id": student["id"],
        "name": student["name"],
        "riskTier": student["riskTier"],
        "riskProbabilities": student["riskProbabilities"],
        "modelVersion": MODEL_VERSION,
        "predictedAt": PREDICTED_AT,
        "features": [
            {"key": k, "value": v} for k, v in student["features"].items()
        ],
        "explanationGraph": student["explanationGraph"],
    }


def get_mock_explanation(student_id):
    student = _STUDENTS.get(student_id)
    if student is None:
        return None
    return student["explanationGraph"]
