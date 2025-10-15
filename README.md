🌿 Provisional Detection of Medicinal Plant Disease through Deep Learning
📘 Project Overview

This project focuses on the detection of diseases in medicinal plants using Deep Learning techniques.
The goal is to build an intelligent system that identifies plant diseases at an early stage, helping farmers and researchers maintain healthy crops, enhance medicinal value, and improve yield quality.

By using AI and computer vision, this system can analyze plant leaf images and predict whether a plant is healthy or diseased, along with the type of disease detected.

🎯 Objectives

To develop an AI-based system for automatic detection of medicinal plant diseases.

To train a Deep Learning model using image datasets of medicinal plant leaves.

To classify leaves as healthy or infected based on visual symptoms.

To provide an early disease diagnosis that can assist farmers and researchers.

To deploy the model in a user-friendly interface for real-time testing.

💡 Problem Statement

Medicinal plants are vital for the pharmaceutical and herbal industries.
However, their productivity and medicinal quality are affected by various fungal, bacterial, and viral diseases. Manual detection is time-consuming, error-prone, and requires expertise.
Hence, there is a need for an AI-powered automated detection system that can efficiently and accurately identify plant diseases using image data.

🧠 Methodology
1. Data Collection

Collected datasets of medicinal plant leaves (both healthy and diseased).

Data sources: Kaggle, PlantVillage dataset, and custom field images.

2. Data Preprocessing

Image resizing and normalization.

Augmentation (rotation, flipping, zooming) to improve model robustness.

Label encoding for different disease categories.

3. Model Development

Used Convolutional Neural Networks (CNNs) for image classification.

Frameworks used: TensorFlow / Keras / PyTorch.

Trained the model using training and validation datasets.

4. Model Evaluation

Metrics used: Accuracy, Precision, Recall, F1-Score.

Evaluated performance using a confusion matrix.

5. Deployment

Implemented a Flask / Streamlit web interface.

User uploads an image → Model predicts disease → Displays result with confidence score.

⚙️ Technologies Used
Category	Tools / Libraries
Programming Language	Python
Deep Learning Framework	TensorFlow / Keras / PyTorch
Image Processing	OpenCV, NumPy, Pillow
Visualization	Matplotlib, Seaborn
Web Framework (optional)	Flask / Streamlit
Dataset	PlantVillage / Custom Medicinal Plant Dataset
IDE	Jupyter Notebook / VS Code
📊 System Architecture
User Input (Leaf Image)
        ↓
Image Preprocessing
        ↓
Feature Extraction using CNN
        ↓
Disease Classification
        ↓
Result Display (Healthy / Diseased + Disease Name)

🧪 Model Training Summary

Dataset size: ~5000 images (varies with dataset used)

Model: CNN (3–5 convolutional layers)

Epochs: 25–50

Optimizer: Adam

Loss Function: Categorical Cross Entropy

Training Accuracy: ~95%

Validation Accuracy: ~92%

🖥️ How to Run the Project
1. Clone the Repository
git clone https://github.com/username/Provisional-detection-of-Medicinal-Plant-disease-through-deep-learning.git

2. Navigate to Project Folder
cd Provisional-detection-of-Medicinal-Plant-disease-through-deep-learning

3. Install Dependencies
pip install -r requirements.txt

4. Run the Model (Jupyter Notebook)
jupyter notebook plant_disease_detection.ipynb

5. Run the Web App (Optional)
python app.py

📁 Folder Structure
📂 Provisional-detection-of-Medicinal-Plant-disease-through-deep-learning
│
├── 📁 dataset
│   ├── healthy/
│   └── diseased/
│
├── 📁 models
│   └── plant_disease_model.h5
│
├── 📁 static
│   └── style.css
│
├── 📁 templates
│   └── index.html
│
├── app.py
├── requirements.txt
├── plant_disease_detection.ipynb
└── README.md

🚀 Expected Outcomes

Accurate detection of plant diseases from leaf images.

Reduced dependency on manual inspection.

Improved crop health monitoring for medicinal plants.

Scalable system for different plant species.

🔮 Future Scope

Extend the model to detect more plant species and disease types.

Integrate with IoT sensors for environmental condition monitoring.

Deploy as a mobile application for real-time field use.

Add disease treatment recommendations using AI.

📚 References

PlantVillage Dataset - Kaggle

Research papers on plant disease detection using CNN.

TensorFlow and Keras documentation.

Developed By: Akshay Gupta

Department: Computer Science & Engineering

Institution: GL BAJAJ INSTITUTE OF TECNOLOGY AND MANAGEMENT

