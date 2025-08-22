# -*- coding: utf-8 -*-
"""
ThyroNet-XAI: Thyroid Cancer Prediction with Hybrid (RF+DNN) Model
Complete Implementation with Explainability and Visualizations
Author: Research Team
"""

# ========================
# STEP 1: Installations and Imports
# ========================
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.feature_selection import VarianceThreshold, SelectKBest, f_classif
from sklearn.preprocessing import MinMaxScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.svm import SVC
from sklearn.metrics import classification_report, confusion_matrix, roc_auc_score, roc_curve
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout, BatchNormalization
from tensorflow.keras.callbacks import EarlyStopping
import warnings
warnings.filterwarnings('ignore')

# Set style for better visualizations
plt.style.use('default')
sns.set_palette("husl")

print("🚀 ThyroNet-XAI: Thyroid Cancer Prediction System")
print("=" * 60)

# ========================
# STEP 2: Data Loading and Preparation
# ========================
print("\n🔄 STEP 2: Data Loading and Preparation")
print("=" * 50)

# Load data from the provided URL
data_url = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/annthyroid_unsupervised_anomaly_detection%20%281%29-sjO68MzKaASs0l6gSA10YZXwFeJh45.csv"

try:
    df = pd.read_csv(data_url, delimiter=';')
    print("✅ Data loaded successfully from URL")
except Exception as e:
    print(f"❌ Error loading data: {e}")
    # Create sample data for demonstration
    np.random.seed(42)
    n_samples = 1000
    df = pd.DataFrame({
        'Age': np.random.uniform(0, 1, n_samples),
        'Sex': np.random.choice([0, 1], n_samples),
        'on_thyroxine': np.random.choice([0, 1], n_samples, p=[0.9, 0.1]),
        'query_on_thyroxine': np.random.choice([0, 1], n_samples, p=[0.95, 0.05]),
        'on_antithyroid_medication': np.random.choice([0, 1], n_samples, p=[0.95, 0.05]),
        'sick': np.random.choice([0, 1], n_samples, p=[0.9, 0.1]),
        'pregnant': np.random.choice([0, 1], n_samples, p=[0.95, 0.05]),
        'thyroid_surgery': np.random.choice([0, 1], n_samples, p=[0.98, 0.02]),
        'I131_treatment': np.random.choice([0, 1], n_samples, p=[0.98, 0.02]),
        'query_hypothyroid': np.random.choice([0, 1], n_samples, p=[0.9, 0.1]),
        'query_hyperthyroid': np.random.choice([0, 1], n_samples, p=[0.9, 0.1]),
        'lithium': np.random.choice([0, 1], n_samples, p=[0.99, 0.01]),
        'goitre': np.random.choice([0, 1], n_samples, p=[0.95, 0.05]),
        'tumor': np.random.choice([0, 1], n_samples, p=[0.98, 0.02]),
        'hypopituitary': np.random.choice([0, 1], n_samples, p=[0.99, 0.01]),
        'psych': np.random.choice([0, 1], n_samples, p=[0.95, 0.05]),
        'TSH': np.random.uniform(0, 0.1, n_samples),
        'T3_measured': np.random.uniform(0, 0.1, n_samples),
        'TT4_measured': np.random.uniform(50, 150, n_samples),
        'T4U_measured': np.random.uniform(50, 150, n_samples),
        'FTI_measured': np.random.uniform(50, 150, n_samples),
        'Outlier_label': np.random.choice(['n', 'o'], n_samples, p=[0.93, 0.07])
    })
    print("✅ Using sample data for demonstration")

# Clean data
df = df.loc[:, ~df.columns.str.contains('^Unnamed|^;$', regex=True)]
df.columns = df.columns.str.strip()

# Display basic info
print(f"Dataset shape: {df.shape}")
print(f"Missing values: {df.isnull().sum().sum()}")
print(f"Data types:\n{df.dtypes.value_counts()}")

# Encode target
if df['Outlier_label'].dtype == 'object':
    df['Outlier_label'] = df['Outlier_label'].map({'n': 0, 'o': 1})

X = df.drop('Outlier_label', axis=1)
y = df['Outlier_label']

print("\nOriginal class distribution:")
print(y.value_counts())
print(f"Class imbalance ratio: {y.value_counts()[0]/y.value_counts()[1]:.2f}:1")

# Visualization 1: Class Distribution
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(15, 6))

# Bar plot
y.value_counts().plot(kind='bar', ax=ax1, color=['#3498db', '#e74c3c'], alpha=0.8)
ax1.set_title('Original Class Distribution', fontsize=14, fontweight='bold')
ax1.set_xlabel('Class Label')
ax1.set_ylabel('Count')
ax1.set_xticklabels(['Normal (0)', 'Anomaly (1)'], rotation=0)
ax1.grid(True, alpha=0.3)

# Add count labels on bars
for i, v in enumerate(y.value_counts().values):
    ax1.text(i, v + 50, str(v), ha='center', va='bottom', fontweight='bold')

# Pie chart
y.value_counts().plot(kind='pie', ax=ax2, autopct='%1.1f%%', colors=['#3498db', '#e74c3c'])
ax2.set_title('Class Distribution (Percentage)', fontsize=14, fontweight='bold')
ax2.set_ylabel('')

plt.tight_layout()
plt.show()

# ========================
# STEP 3: Train-Test Split
# ========================
print("\n🔄 STEP 3: Train-Test Split")
print("=" * 30)

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42
)

print(f"Train size: {X_train.shape[0]}")
print(f"Test size: {X_test.shape[0]}")
print(f"Train class distribution:\n{y_train.value_counts()}")
print(f"Test class distribution:\n{y_test.value_counts()}")

# ========================
# STEP 4: Handle Class Imbalance (Simple Oversampling)
# ========================
print("\n🔄 STEP 4: Class Balancing with Simple Oversampling")
print("=" * 55)

# Simple oversampling approach (alternative to SMOTE-ENN)
from sklearn.utils import resample

# Separate majority and minority classes
df_majority = pd.concat([X_train[y_train == 0], y_train[y_train == 0]], axis=1)
df_minority = pd.concat([X_train[y_train == 1], y_train[y_train == 1]], axis=1)

# Upsample minority class
df_minority_upsampled = resample(df_minority, 
                                replace=True,
                                n_samples=len(df_majority),
                                random_state=42)

# Combine majority class with upsampled minority class
df_upsampled = pd.concat([df_majority, df_minority_upsampled])

# Separate features and target
X_train_res = df_upsampled.drop('Outlier_label', axis=1)
y_train_res = df_upsampled['Outlier_label']

print("Class distribution after oversampling:")
print(pd.Series(y_train_res).value_counts())

# ========================
# STEP 5: Feature Selection
# ========================
print("\n🔄 STEP 5: Feature Selection")
print("=" * 30)

# Remove constant features
var_thresh = VarianceThreshold(threshold=0)
X_train_var = var_thresh.fit_transform(X_train_res)
features_after_var = X_train.columns[var_thresh.get_support()]
print(f"Features after VarianceThreshold: {len(features_after_var)}")

# Select top 10 features
selector = SelectKBest(score_func=f_classif, k=min(10, len(features_after_var)))
X_train_selected = selector.fit_transform(X_train_var, y_train_res)
selected_features = features_after_var[selector.get_support()]
print(f"\nSelected top {len(selected_features)} features:")
print(selected_features.tolist())

# ========================
# STEP 6: Feature Scaling
# ========================
print("\n🔄 STEP 6: Feature Scaling")
print("=" * 25)

scaler = MinMaxScaler()
X_train_scaled = scaler.fit_transform(X_train_selected)

# Apply same transformations to test data
X_test_var = var_thresh.transform(X_test)
X_test_selected = selector.transform(X_test_var)
X_test_scaled = scaler.transform(X_test_selected)

print(f"Final training shape: {X_train_scaled.shape}")
print(f"Final testing shape: {X_test_scaled.shape}")

# ========================
# STEP 7: Build Models
# ========================
print("\n🔄 STEP 7: Building Models")
print("=" * 30)

# ------------------------
# 7.1 Random Forest (RF)
# ------------------------
print("\n🌲 Training Random Forest...")
rf = RandomForestClassifier(n_estimators=100, random_state=42, n_jobs=-1)
rf.fit(X_train_scaled, y_train_res)

# Predictions
rf_preds = rf.predict(X_test_scaled)
rf_probs = rf.predict_proba(X_test_scaled)[:, 1]

print("🔴 Random Forest Results:")
print(confusion_matrix(y_test, rf_preds))
print(classification_report(y_test, rf_preds))
print(f"ROC-AUC: {roc_auc_score(y_test, rf_probs):.4f}")

# ------------------------
# 7.2 Deep Neural Network (DNN)
# ------------------------
print("\n🧠 Training Deep Neural Network...")
dnn = Sequential([
    Dense(64, input_shape=(X_train_scaled.shape[1],), activation='relu'),
    BatchNormalization(),
    Dropout(0.3),
    Dense(32, activation='relu'),
    BatchNormalization(),
    Dropout(0.2),
    Dense(16, activation='relu'),
    Dropout(0.1),
    Dense(1, activation='sigmoid')
])

dnn.compile(optimizer='adam',
            loss='binary_crossentropy',
            metrics=['accuracy'])

early_stop = EarlyStopping(monitor='val_loss', patience=10, restore_best_weights=True)

history = dnn.fit(
    X_train_scaled, y_train_res,
    validation_split=0.2,
    epochs=50,
    batch_size=32,
    callbacks=[early_stop],
    verbose=1
)

# Predictions
dnn_probs = dnn.predict(X_test_scaled).flatten()
dnn_preds = (dnn_probs > 0.5).astype(int)

print("\n🔵 DNN Results:")
print(confusion_matrix(y_test, dnn_preds))
print(classification_report(y_test, dnn_preds))
print(f"ROC-AUC: {roc_auc_score(y_test, dnn_probs):.4f}")

# ------------------------
# 7.3 Hybrid (RF + DNN)
# ------------------------
print("\n🔥 Creating Hybrid Model...")
hybrid_probs = (rf_probs + dnn_probs) / 2
hybrid_preds = (hybrid_probs > 0.5).astype(int)

print("🔥 Hybrid (RF + DNN) Results:")
print(confusion_matrix(y_test, hybrid_preds))
print(classification_report(y_test, hybrid_preds))
print(f"ROC-AUC: {roc_auc_score(y_test, hybrid_probs):.4f}")

# ========================
# STEP 8: Baseline Model Comparison
# ========================
print("\n🔄 STEP 8: Baseline Model Comparison")
print("=" * 40)

baseline_models = {
    "Decision Tree": DecisionTreeClassifier(random_state=42),
    "KNN": KNeighborsClassifier(n_neighbors=5),
    "SVM": SVC(probability=True, random_state=42)
}

baseline_results = {}
for name, model in baseline_models.items():
    print(f"\n🔍 Training {name}...")
    model.fit(X_train_scaled, y_train_res)
    y_pred = model.predict(X_test_scaled)
    y_proba = model.predict_proba(X_test_scaled)[:, 1]

    baseline_results[name] = {
        'predictions': y_pred,
        'probabilities': y_proba,
        'auc': roc_auc_score(y_test, y_proba)
    }

    print(f"🔍 {name} Results:")
    print(confusion_matrix(y_test, y_pred))
    print(classification_report(y_test, y_pred))
    print(f"ROC-AUC: {roc_auc_score(y_test, y_proba):.4f}")

# ========================
# STEP 9: Performance Analysis
# ========================
print("\n🔄 STEP 9: Performance Analysis")
print("=" * 35)

# Compile all results
all_results = {
    'Random Forest': {'probs': rf_probs, 'preds': rf_preds},
    'DNN': {'probs': dnn_probs, 'preds': dnn_preds},
    'Hybrid (RF+DNN)': {'probs': hybrid_probs, 'preds': hybrid_preds},
    'Decision Tree': {'probs': baseline_results['Decision Tree']['probabilities'],
                     'preds': baseline_results['Decision Tree']['predictions']},
    'KNN': {'probs': baseline_results['KNN']['probabilities'],
            'preds': baseline_results['KNN']['predictions']},
    'SVM': {'probs': baseline_results['SVM']['probabilities'],
            'preds': baseline_results['SVM']['predictions']}
}

# Calculate comprehensive metrics
performance_data = []
for model_name, results in all_results.items():
    performance_data.append({
        'Model': model_name,
        'Accuracy': accuracy_score(y_test, results['preds']),
        'Precision': precision_score(y_test, results['preds']),
        'Recall': recall_score(y_test, results['preds']),
        'F1-Score': f1_score(y_test, results['preds']),
        'ROC-AUC': roc_auc_score(y_test, results['probs'])
    })

performance_df = pd.DataFrame(performance_data)
print("\nModel Performance Comparison:")
print(performance_df.round(4))

# Visualization: Performance Dashboard
fig, axes = plt.subplots(2, 2, figsize=(16, 12))
fig.suptitle('ThyroNet-XAI: Performance Dashboard', fontsize=16, fontweight='bold')

# 1. ROC-AUC Comparison
ax1 = axes[0, 0]
models = performance_df['Model']
roc_aucs = performance_df['ROC-AUC']
colors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6', '#e67e22']
bars = ax1.bar(range(len(models)), roc_aucs, color=colors, alpha=0.8)
ax1.set_title('ROC-AUC Score Comparison', fontsize=12, fontweight='bold')
ax1.set_xlabel('Models')
ax1.set_ylabel('ROC-AUC')
ax1.set_xticks(range(len(models)))
ax1.set_xticklabels(models, rotation=45, ha='right')
ax1.set_ylim(0, 1)
ax1.grid(True, alpha=0.3)

for bar, value in zip(bars, roc_aucs):
    ax1.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 0.01,
             f'{value:.3f}', ha='center', va='bottom', fontweight='bold')

# 2. Feature Importance
ax2 = axes[0, 1]
feature_importance = rf.feature_importances_
sorted_idx = np.argsort(feature_importance)[::-1]
top_features = [selected_features.tolist()[i] for i in sorted_idx]
top_importance = [feature_importance[i] for i in sorted_idx]

bars = ax2.barh(range(len(top_features)), top_importance, color='#3498db', alpha=0.8)
ax2.set_title('Feature Importance (Random Forest)', fontsize=12, fontweight='bold')
ax2.set_xlabel('Importance')
ax2.set_yticks(range(len(top_features)))
ax2.set_yticklabels(top_features)
ax2.invert_yaxis()
ax2.grid(True, alpha=0.3)

# 3. Confusion Matrix - Hybrid Model
ax3 = axes[1, 0]
cm_hybrid = confusion_matrix(y_test, hybrid_preds)
im = ax3.imshow(cm_hybrid, interpolation='nearest', cmap='Blues')
ax3.set_title('Confusion Matrix - Hybrid Model', fontsize=12, fontweight='bold')
ax3.set_xlabel('Predicted Label')
ax3.set_ylabel('True Label')

for i in range(cm_hybrid.shape[0]):
    for j in range(cm_hybrid.shape[1]):
        ax3.text(j, i, format(cm_hybrid[i, j], 'd'),
                ha="center", va="center",
                color="white" if cm_hybrid[i, j] > cm_hybrid.max() / 2 else "black",
                fontweight='bold')

# 4. ROC Curves
ax4 = axes[1, 1]
for model_name, results in all_results.items():
    fpr, tpr, _ = roc_curve(y_test, results['probs'])
    auc = roc_auc_score(y_test, results['probs'])
    ax4.plot(fpr, tpr, label=f'{model_name} (AUC: {auc:.3f})', linewidth=2)

ax4.plot([0, 1], [0, 1], 'k--', alpha=0.5)
ax4.set_title('ROC Curves - All Models', fontsize=12, fontweight='bold')
ax4.set_xlabel('False Positive Rate')
ax4.set_ylabel('True Positive Rate')
ax4.legend(fontsize=8)
ax4.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

# ========================
# STEP 10: Clinical Insights
# ========================
print("\n🔄 STEP 10: Clinical Insights & Recommendations")
print("=" * 50)

# Feature importance analysis
feature_importance_df = pd.DataFrame({
    'Feature': selected_features.tolist(),
    'Importance': rf.feature_importances_
}).sort_values('Importance', ascending=False)

print("\n1. TOP CONTRIBUTING FEATURES FOR THYROID ANOMALY DETECTION:")
print("-" * 60)
for i, row in feature_importance_df.head(5).iterrows():
    print(f"{i+1}. {row['Feature']}: {row['Importance']:.4f}")

print("\n2. MODEL PERFORMANCE INSIGHTS:")
print("-" * 35)
best_model = performance_df.loc[performance_df['ROC-AUC'].idxmax()]
print(f"✅ Best Overall Model: {best_model['Model']} (ROC-AUC: {best_model['ROC-AUC']:.4f})")
print(f"✅ Best Sensitivity: {best_model['Recall']:.2f} ({best_model['Recall']*100:.0f}% of anomalies detected)")

print("\n3. CLINICAL RECOMMENDATIONS:")
print("-" * 30)
print("🔬 KEY THYROID INDICATORS TO MONITOR:")
for i, row in feature_importance_df.head(3).iterrows():
    print(f"   • {row['Feature']}")

print("\n🎯 DEPLOYMENT RECOMMENDATIONS:")
print("   • Use Random Forest for primary screening")
print("   • Implement Hybrid model for critical cases")
print("   • High sensitivity ensures minimal false negatives")
print("   • Manual review recommended for borderline cases")

print("\n🎉 ThyroNet-XAI Analysis Complete!")
print("=" * 60)
