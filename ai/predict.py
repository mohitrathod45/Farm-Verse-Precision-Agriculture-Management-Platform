import joblib
import pandas as pd

# Load the trained model
model = joblib.load("ai/crop_recommendation_model.pkl")

# Example farmer input
input_data = pd.DataFrame([{
    "N": 90,
    "P": 42,
    "K": 43,
    "temperature": 25,
    "humidity": 80,
    "ph": 6.5,
    "rainfall": 200
}])

# Make prediction
prediction = model.predict(input_data)

print("Recommended Crop:", prediction[0])