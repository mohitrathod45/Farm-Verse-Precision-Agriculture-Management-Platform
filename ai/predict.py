import joblib
import pandas as pd

# Load the trained model
model = joblib.load("ai/crop_recommendation_model.pkl")

# Example farmer input
input_data = pd.DataFrame([{
    "N": 90,
    "P": 53,
    "K": 60,
    "temperature": 31,
    "humidity": 76,
    "ph": 8,
    "rainfall": 21.4
}])

# Make prediction
prediction = model.predict(input_data)

print("Recommended Crop:", prediction[0])