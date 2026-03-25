#  Student Dropout Prediction using Graph Attention Networks (GAT) + GNNExplainer

## Overview

This project implements an **early-warning system** for predicting student dropout risk in resource-constrained Ghanaian secondary schools.

The system uses a **Graph Attention Network (GAT)** to model peer relationships between students and **GNNExplainer** to generate human-understandable explanations of predictions.

The solution is designed for:

* **Low-resource environments** (≤ 512MB RAM)
* **Offline deployment**
* **Teacher-friendly explanations**


## Key Features

* Graph-based modelling of peer influence
* Attention-weighted relationships (GATConv)
* Explainable predictions using GNNExplainer
* Synthetic dataset generation (CTGAN)
* Baseline comparison (Logistic Regression, Random Forest)
* Deployment-ready (ONNX + Flask API)

---

## Reproducibility

### Random Seed

All experiments use a fixed random seed for reproducibility:

```python
import random
import numpy as np
import torch

random.seed(42)
np.random.seed(42)
torch.manual_seed(42)
```

### Dependencies

All required libraries are pinned in `requirements.txt`.

---

# 5-Step Reproduction Guide

Follow these steps to reproduce the results:

 1. Clone the repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2. Install dependencies

```bash
pip install -r requirements.txt
```

### 3. Generate / Prepare Data

Generate the synthetic dataset or preprocess EdNet data:

```bash
python generate_data.py
```

### 4. Train the Model

Train the Graph Attention Network:

```bash
python train.py
```

### 5. Evaluate Results

Evaluate performance and generate outputs:

```bash
python evaluate.py
```

## Features Used

The model is trained on six sparse longitudinal indicators:

* Weekly Attendance Rate
* Grade Trajectory Slope
* Assignment Completion Ratio
* Consecutive Absence Count
* Late Arrival Frequency
* Peer Comparison Index


## Model Architecture

* **Graph Neural Network**: GATConv (PyTorch Geometric)
* **Explanation Method**: GNNExplainer
* **Baselines**: Logistic Regression, Random Forest, LightGBM, GraphSAGE


## Outputs

After running the pipeline, results are stored in `/results`:

* Model performance metrics (Macro-F1, Recall)
* Confusion matrix and ROC curves
* GNNExplainer subgraphs
* Attention weight visualisations


## Deployment

* Model exported to **ONNX format**
* Lightweight **Flask API** for inference
* Target device: **Raspberry Pi Zero (512MB RAM)**


## Notes

* All experiments follow the pipeline:
  **clone → install → generate → train → evaluate**
* The system is designed for **offline use in Ghanaian schools**
* This repository supports **reproducible research**


## License

This project is for academic and research purposes.
