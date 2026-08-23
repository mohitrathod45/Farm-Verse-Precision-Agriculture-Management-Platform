from flask import Flask, request, jsonify
import joblib
import pandas as pd

app = Flask(__name__)

# Load the trained AI model
model = joblib.load("ai/crop_recommendation_model.pkl")


@app.route("/predict", methods=["POST"])
def predict_crop():

    data = request.get_json()

    print("Received data:", data)

    # Prepare input data
    input_data = pd.DataFrame([{
        "N": data["N"],
        "P": data["P"],
        "K": data["K"],
        "temperature": data["temperature"],
        "humidity": data["humidity"],
        "ph": data["ph"],
        "rainfall": data["rainfall"]
    }])

    # -----------------------------------------
    # 1. Get the best crop
    # -----------------------------------------

    prediction = model.predict(input_data)

    recommended_crop = prediction[0]

    # -----------------------------------------
    # 2. Get probabilities for all crops
    # -----------------------------------------

    probabilities = model.predict_proba(input_data)[0]

    # Get crop names from the trained model
    crop_names = model.classes_

    # -----------------------------------------
    # 3. Combine crop names and probabilities
    # -----------------------------------------

    crop_probabilities = list(
        zip(crop_names, probabilities)
    )

    # Sort from highest probability to lowest
    crop_probabilities.sort(
        key=lambda x: x[1],
        reverse=True
    )

    # -----------------------------------------
    # 4. Get Top 3 crops
    # -----------------------------------------

    top_3 = crop_probabilities[:3]

    top_3_crops = []

    for crop, probability in top_3:

        top_3_crops.append({
            "crop": crop,
            "score": round(float(probability * 100), 2)
        })

    # -----------------------------------------
    # 5. Return result
    # -----------------------------------------

    response = {
        "recommended_crop": recommended_crop,
        "top_3_crops": top_3_crops
    }

    print("Recommendation:", response)

    return jsonify(response)


@app.route("/", methods=["GET"])
def home():

    return "FarmVerse AI Crop Recommendation API is running!"


if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )