import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib

# -----------------------------------
# 1. Load the crop recommendation dataset
# -----------------------------------

data = pd.read_csv("ai/Crop_recommendation.csv")

print("Dataset loaded successfully!")
print("Number of records:", len(data))
print("Columns:", list(data.columns))


# -----------------------------------
# 2. Select input features and target
# -----------------------------------

X = data[
    [
        "N",
        "P",
        "K",
        "temperature",
        "humidity",
        "ph",
        "rainfall"
    ]
]

y = data["label"]


# -----------------------------------
# 3. Split data into training and testing
# -----------------------------------

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y
)


# -----------------------------------
# 4. Create the Random Forest model
# -----------------------------------

model = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)


# -----------------------------------
# 5. Train the model
# -----------------------------------

model.fit(X_train, y_train)

print("Model training completed!")


# -----------------------------------
# 6. Test the model
# -----------------------------------

y_pred = model.predict(X_test)

accuracy = accuracy_score(y_test, y_pred)

print("Model Accuracy:", round(accuracy * 100, 2), "%")


# -----------------------------------
# 7. Save the trained model
# -----------------------------------

joblib.dump(model, "ai/crop_recommendation_model.pkl")

print("Model saved successfully!")
print("File: ai/crop_recommendation_model.pkl")