"""
Model loading — NOT YET IMPLEMENTED. This is the single file that should
change once training is finalized; app.py and mock_data.py should not need
to change when this becomes real.

TODO once weights + feature list are ready:
  1. Confirm final architecture: plain GAT vs Gated GAT vs best baseline
     (currently undecided per team discussion).
  2. Load the model:
       - If PyTorch checkpoint: reconstruct the nn.Module class, then
         model.load_state_dict(torch.load(CHECKPOINT_PATH)); model.eval()
       - If ONNX export: onnxruntime.InferenceSession(ONNX_PATH)
  3. Load the real feature_cols_final list (replacing
     feature_cols_final_PLACEHOLDER) and whatever encoders/scalers were
     fit during training (e.g. a saved sklearn StandardScaler or
     OneHotEncoder) — these must be applied identically at inference time.
  4. Implement graph construction: given raw student rows, build the same
     edge_index structure (classroom/dormitory/extracurricular adjacency)
     used during training. This likely needs a saved edge-construction
     function or rule set carried over from the training notebook.
  5. Implement the actual batch inference function (see predict.py stub)
     that takes the full current dataset, builds the graph, runs the
     model, and returns per-student predictions + GNNExplainer output.

Until all of the above exists, app.py serves mock_data.py's fixed
responses instead of calling anything in this file.
"""


def load_model():
    raise NotImplementedError(
        "Model not yet finalized — team still training/selecting between "
        "plain GAT, Gated GAT, and baselines. See TODO list above."
    )
