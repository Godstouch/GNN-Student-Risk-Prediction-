# EarlyFlag Backend — Setup

## Status
Serving **mock predictions** matching the real API contract shape. No
trained model is wired in yet — see `models/model_loader.py` for the
exact TODO list of what's needed once training is finalized.

## Run it

```bash
pip install -r requirements.txt
python app.py
```

Server runs at `http://localhost:5000` (and `http://<your-local-ip>:5000`
from other devices on the same WiFi — useful for testing from a phone).

## Endpoints

```
GET /api/health
GET /api/meta
GET /api/students
GET /api/students/<id>
GET /api/students/<id>/explanation
```

## Connecting the frontend

In the React app, point fetch calls at `http://localhost:5000/api/...`
during local dev. Once this runs on the Raspberry Pi in a real
deployment, that becomes the Pi's local IP instead.

## What's needed to make this real

See the TODO comments in `models/model_loader.py` and `predict.py` for
the full list. Short version:
1. Final model choice (plain GAT / Gated GAT / a baseline)
2. Trained weights (PyTorch checkpoint or ONNX export)
3. Real `feature_cols_final` list + any fitted encoders/scalers
4. Graph construction logic (how edges get built from raw student data)
5. A decision on where "live" student data lives for the batch job to
   read from — currently the frontend only writes to each device's local
   IndexedDB, which the backend has no access to yet.
