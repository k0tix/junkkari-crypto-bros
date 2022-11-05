from flask import Flask, jsonify, request
import joblib
import requests
import pandas as pd
from io import StringIO
import ta
import numpy as np
from catboost import CatBoostClassifier

app = Flask(__name__)

api_key = "XFDSGKBCYAWM4BX3"

@app.route("/predict", methods=["GET"])
def predict():
    url = (f"https://www.alphavantage.co/query?function=CRYPTO_INTRADAY&symbol=BTC&market=USD"
           f"&interval=1min&apikey={api_key}&datatype=csv")
    
    with requests.Session() as s:
        download = s.get(url)
        decoded_content = download.content.decode("utf-8")
        data = pd.read_csv(StringIO(decoded_content))
        data = data[::-1]
        
    data["rsi"] = ta.momentum.rsi(data.close)
    
    predict_data = np.array([data["rsi"][0]])

    model = CatBoostClassifier()
    model.load_model("kisu.cbm")

    prediction = model.predict(predict_data)[0]

    result = {"Prediction": prediction}
    return jsonify(result)

if __name__ == "__main__":
    app.run(host="0.0.0.0")
