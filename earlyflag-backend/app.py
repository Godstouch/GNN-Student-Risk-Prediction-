"""
EarlyFlag backend — Flask API skeleton.

STATUS: Serving MOCK data in the real API contract shape. No trained model
is loaded yet — model_loader.py has a clearly marked TODO for exactly where
to plug in the real GAT/Gated GAT weights once training is finalized.

Why build this now, before the model is ready:
  - The frontend can start making REAL network requests (not just JS mocks),
    testing actual fetch/CORS/offline-caching behavior.
  - The API contract (endpoint shapes, field names) gets battle-tested
    against a real server before the model exists, so fewer surprises
    when the real inference logic gets dropped in.
  - Swapping mock -> real inference should only require changes inside
    model_loader.py and predict.py — nothing in the routes below.
"""

from flask import Flask, jsonify
from flask_cors import CORS
from app.mock_data import (
    get_mock_meta,
    get_mock_student_summaries,
    get_mock_student_detail,
    get_mock_explanation,
)

app = Flask(__name__)
# CORS wide open for now (dev + Vercel-hosted frontend testing). Tighten
# this to the specific frontend origin(s) before any real deployment.
CORS(app)


@app.route("/api/health")
def health():
    return jsonify({"status": "ok"})


@app.route("/api/meta")
def meta():
    return jsonify(get_mock_meta())


@app.route("/api/students")
def students():
    return jsonify(get_mock_student_summaries())


@app.route("/api/students/<student_id>")
def student_detail(student_id):
    detail = get_mock_student_detail(student_id)
    if detail is None:
        return jsonify({"error": "student not found"}), 404
    return jsonify(detail)


@app.route("/api/students/<student_id>/explanation")
def student_explanation(student_id):
    explanation = get_mock_explanation(student_id)
    if explanation is None:
        return jsonify({"error": "student not found"}), 404
    return jsonify(explanation)


if __name__ == "__main__":
    # host="0.0.0.0" so it's reachable from other devices on the same
    # WiFi network — matters later for testing from a phone against a
    # laptop or eventually a Raspberry Pi, not just localhost.
    app.run(host="0.0.0.0", port=5000, debug=True)
