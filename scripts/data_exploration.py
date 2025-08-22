"""
Data Exploration Script for Thyroid Cancer Dataset
Provides detailed analysis of the dataset structure and characteristics
"""

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

def explore_thyroid_data():
    """Comprehensive data exploration for thyroid dataset"""
    
    print("🔍 ThyroNet-XAI: Data Exploration")
    print("=" * 50)
    
    # Load data
    data_url = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/annthyroid_unsupervised_anomaly_detection%20%281%29-sjO68MzKaASs0l6gSA10YZXwFeJh45.csv"
    
    try:
        df = pd.read_csv(data_url, delimiter=';')
        print("✅ Data loaded successfully from URL")
    except Exception as e:
        print(f"❌ Error loading data: {e}")
        return
    
    # Basic dataset information
    print(f"\n📊 Dataset Overview:")
    print(f"Shape: {df.shape}")
    print(f"Columns: {df.columns.tolist()}")
    print(f"Memory usage: {df.memory_usage(deep=True).sum() / 1024**2:.2f} MB")
    
    # Data types and missing values
    print(f"\n📋 Data Quality:")
    print(f"Missing values: {df.isnull().sum().sum()}")
    print(f"Duplicate rows: {df.duplicated().sum()}")
    
    # Statistical summary
    print(f"\n📈 Statistical Summary:")
    print(df.describe())
    
    # Target variable analysis
    if 'Outlier_label' in df.columns:
        print(f"\n🎯 Target Variable Analysis:")
        target_counts = df['Outlier_label'].value_counts()
        print(target_counts)
        
        # Visualize target distribution
        plt.figure(figsize=(12, 4))
        
        plt.subplot(1, 2, 1)
        target_counts.plot(kind='bar', color=['#3498db', '#e74c3c'])
        plt.title('Target Variable Distribution')
        plt.xlabel('Class')
        plt.ylabel('Count')
        plt.xticks(rotation=0)
        
        plt.subplot(1, 2, 2)
        target_counts.plot(kind='pie', autopct='%1.1f%%', colors=['#3498db', '#e74c3c'])
        plt.title('Target Variable Percentage')
        plt.ylabel('')
        
        plt.tight_layout()
        plt.show()
    
    # Feature correlation analysis
    numeric_cols = df.select_dtypes(include=[np.number]).columns
    if len(numeric_cols) > 1:
        print(f"\n🔗 Correlation Analysis:")
        correlation_matrix = df[numeric_cols].corr()
        
        plt.figure(figsize=(12, 10))
        sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm', center=0,
                   square=True, fmt='.2f')
        plt.title('Feature Correlation Matrix')
        plt.tight_layout()
        plt.show()
        
        # High correlation pairs
        high_corr_pairs = []
        for i in range(len(correlation_matrix.columns)):
            for j in range(i+1, len(correlation_matrix.columns)):
                corr_val = correlation_matrix.iloc[i, j]
                if abs(corr_val) > 0.7:
                    high_corr_pairs.append((
                        correlation_matrix.columns[i],
                        correlation_matrix.columns[j],
                        corr_val
                    ))
        
        if high_corr_pairs:
            print(f"\n⚠️  High Correlation Pairs (|r| > 0.7):")
            for feat1, feat2, corr in high_corr_pairs:
                print(f"   {feat1} ↔ {feat2}: {corr:.3f}")
    
    print(f"\n✅ Data exploration complete!")

if __name__ == "__main__":
    explore_thyroid_data()
