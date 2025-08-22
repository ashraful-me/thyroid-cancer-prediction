"""
Install required packages for ThyroNet-XAI
Run this script first to install all dependencies
"""

import subprocess
import sys

def install_package(package):
    """Install a package using pip"""
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", package])
        print(f"✅ Successfully installed {package}")
    except subprocess.CalledProcessError:
        print(f"❌ Failed to install {package}")

# List of required packages
packages = [
    "pandas",
    "numpy", 
    "matplotlib",
    "seaborn",
    "scikit-learn",
    "tensorflow",
    "imbalanced-learn",
    "shap",
    "lime"
]

print("🔄 Installing required packages for ThyroNet-XAI...")
print("=" * 50)

for package in packages:
    install_package(package)

print("\n✅ All packages installed successfully!")
print("You can now run the main analysis script.")
