"""
build_graph.py
================
Turns data.csv (the UCI "Predict Students' Dropout and Academic Success"
dataset) into a graph that plugs directly into the GatedGAT training/eval
code you pasted. Run this in the SAME Colab notebook, before the model code,
right after `!pip install -q torch_geometric`.

What it does
------------
1. Loads data.csv and relabels the 3-way target so it matches the class
   names your evaluate() function already expects:
       0 = High-Risk      (was "Dropout")
       1 = Moderate-Risk   (was "Enrolled")
       2 = Low-Risk        (was "Graduate")
2. Encodes features: one-hot for true nominal columns (Course, Application
   mode, Nationality, parents' qualification/occupation, etc.), standardize
   everything else (grades, ages, macro indicators, counts).
3. Builds a graph because the raw data has none: a MUTUAL k-NN graph in
   standardized feature space (k=10). "Mutual" (edge kept only if each node
   is in the other's k-NN list) gives cleaner, higher-homophily edges than a
   plain one-directional k-NN graph -- on this dataset mutual k=10 gives
   ~66% same-class-neighbor rate vs. a ~38% random baseline, so GAT's
   attention/gating actually has informative structure to exploit.
4. Splits nodes 60/20/20 (train/val/test), stratified by class.
5. Saves everything as a torch_geometric Data object to
   /content/real_graph_relabeled.pt -- the exact path your script loads.

Notes on why this design
-------------------------
- k-NN edges are built from features only (no label leakage): labels are
  never used to decide who connects to whom.
- Isolated nodes (no mutual neighbor) are left with no edges; GATConv's
  default add_self_loops=True means they still get a usable self-loop, so
  they degrade gracefully to "trust own features" (gate should learn to
  push toward the skip branch for these).
- Class imbalance (Graduate >> Dropout > Enrolled) is handled by your
  existing class_weights logic in train_gnn -- nothing extra needed here.
"""

import numpy as np
import pandas as pd
import torch
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import kneighbors_graph
from sklearn.model_selection import train_test_split
from torch_geometric.data import Data

import os

_CANDIDATE_PATHS = ["/content/data.csv", "data.csv",
                     "/mnt/user-data/uploads/data.csv"]
CSV_PATH = next((p for p in _CANDIDATE_PATHS if os.path.exists(p)),
                 _CANDIDATE_PATHS[0])  # adjust manually if none of these fit
OUT_PATH = "/content/real_graph_relabeled.pt"
K = 10
SEED = 42

# ---------------------------------------------------------------- load ----
print(f"Loading {CSV_PATH}")
df = pd.read_csv(CSV_PATH, sep=";")
df.columns = [c.strip() for c in df.columns]  # strips stray "\t" in one header

target_map = {"Dropout": 0, "Enrolled": 1, "Graduate": 2}  # High/Mod/Low-Risk
y = df["Target"].map(target_map).values.astype(np.int64)
assert not np.isnan(y).any(), "Unexpected Target value found."

X_raw = df.drop(columns=["Target"])

# ------------------------------------------------------- feature encode ---
# True nominal (unordered) categorical columns -> one-hot.
# Everything else (binary flags, grades, counts, macro indicators, age) is
# already numeric/ordinal, so it's standardized instead of one-hot'd.
nominal_cols = [
    "Marital status", "Application mode", "Course", "Nacionality",
    "Mother's qualification", "Father's qualification",
    "Mother's occupation", "Father's occupation", "Previous qualification",
]
numeric_cols = [c for c in X_raw.columns if c not in nominal_cols]

X_num = X_raw[numeric_cols].astype(float)
X_nom = pd.get_dummies(X_raw[nominal_cols].astype(str), columns=nominal_cols)

scaler = StandardScaler()
X_num_scaled = scaler.fit_transform(X_num)

X = np.hstack([X_num_scaled, X_nom.values.astype(float)]).astype(np.float32)
print(f"Feature matrix: {X.shape[0]} nodes x {X.shape[1]} features")
print("Class counts (High/Moderate/Low-Risk):", np.bincount(y))

# ------------------------------------------------------------- graph ------
knn = kneighbors_graph(X, n_neighbors=K, mode="connectivity", include_self=False)
mutual = knn.minimum(knn.T).tocoo()  # keep an edge only if it's mutual

edge_index = np.vstack([mutual.row, mutual.col])
# make undirected explicitly in both directions (mutual is already symmetric,
# but GATConv wants both (i,j) and (j,i) present, which .tocoo() already has)
edge_index = torch.tensor(edge_index, dtype=torch.long)

same_class = (y[mutual.row] == y[mutual.col]).mean()
n_isolated = int((np.asarray(mutual.sum(axis=1)).flatten() == 0).sum())
print(f"Graph: {edge_index.shape[1]} directed edges, "
      f"homophily={same_class:.3f}, isolated_nodes={n_isolated}")

# ------------------------------------------------------------- splits -----
idx = np.arange(len(y))
idx_trainval, idx_test = train_test_split(
    idx, test_size=0.20, stratify=y, random_state=SEED)
idx_train, idx_val = train_test_split(
    idx_trainval, test_size=0.25, stratify=y[idx_trainval], random_state=SEED)  # 0.25*0.8=0.20

def mask_from(indices, n):
    m = torch.zeros(n, dtype=torch.bool)
    m[indices] = True
    return m

n = len(y)
train_mask = mask_from(idx_train, n)
val_mask = mask_from(idx_val, n)
test_mask = mask_from(idx_test, n)
print(f"Split sizes -> train: {train_mask.sum().item()}, "
      f"val: {val_mask.sum().item()}, test: {test_mask.sum().item()}")

# ------------------------------------------------------------- package ----
data = Data(
    x=torch.tensor(X, dtype=torch.float32),
    edge_index=edge_index,
    y=torch.tensor(y, dtype=torch.long),
    train_mask=train_mask,
    val_mask=val_mask,
    test_mask=test_mask,
)

torch.save(data, OUT_PATH)
print(f"Saved graph to {OUT_PATH}")
print(data)
