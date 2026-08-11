from flask import Flask, request, jsonify
import joblib
import pandas as pd

app = Flask(__name__)

# Load the trained AI model
model = joblib.load("ai/crop_recommendation_model.pkl")


@app.route("/predict", methods=["POST"])
def predict_crop():

    data = request.get_json()

    input_data = pd.DataFrame([{
        "N": data["N"],
        "P": data["P"],
        "K": data["K"],
        "temperature": data["temperature"],
        "humidity": data["humidity"],
        "ph": data["ph"],
        "rainfall": data["rainfall"]
    }])

    prediction = model.predict(input_data)

    return jsonify({
        "recommended_crop": prediction[0]
    })


@app.route("/", methods=["GET"])
def home():
    return "FarmVerse AI Crop Recommendation API is running!"


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)