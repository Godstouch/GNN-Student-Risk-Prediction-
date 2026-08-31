"""
Batch inference — NOT YET IMPLEMENTED. This is meant to run periodically
(nightly/weekly, per your proposal's Section 7.2 retraining discussion) —
NOT per-request, since GAT inference needs the whole graph, and a
Raspberry Pi Zero can't afford to re-run full-graph inference on every
API call.

Planned flow once model_loader.py is real:
  1. Pull current student data (from wherever it ends up living — see
     open question about syncing app-entered data to the backend).
  2. Build the peer graph (same construction logic as training).
  3. Run the model once over the whole graph.
  4. Run GNNExplainer over the output to get per-student explanation
     subgraphs.
  5. Write results to wherever app.py's routes read from (replacing
     mock_data.py's fixed dictionary with real computed results,
     cached until the next batch run).
  6. Record modelVersion + a real timestamp for the /api/meta endpoint,
     replacing the hardcoded PREDICTED_AT placeholder.

This stub exists so the file/function names are settled now — filling in
the body is what changes once the model is ready.
"""

from models.model_loader import load_model


def run_batch_inference():
    model = load_model()  # will raise NotImplementedError for now
    raise NotImplementedError("Batch inference pipeline not yet implemented.")
