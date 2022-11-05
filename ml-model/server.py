from flask import Flask, jsonify, request
from time import sleep
import requests
import pandas as pd
from io import StringIO
import ta
import numpy as np
from catboost import CatBoostClassifier

app = Flask(__name__)

api_key = "XFDSGKBCYAWM4BX3"

tickers = ["BTC", "ETH", "BNB"]

@app.route("/predict", methods=["GET"])
def predict():
    model = CatBoostClassifier()
    model.load_model("kisu.cbm")

    closes = []
    preds = []
    for ticker in tickers:
        url = (f"https://www.alphavantage.co/query?function=CRYPTO_INTRADAY&symbol={ticker}&market=USD"
               f"&interval=1min&apikey={api_key}&datatype=csv")
        with requests.Session() as s:
            download = s.get(url)
            decoded_content = download.content.decode("utf-8")
            data = pd.read_csv(StringIO(decoded_content))
            data = data[::-1]

        data["rsi"] = ta.momentum.rsi(data.close)

        predict_data = np.array([data["rsi"][0]])

        prediction = model.predict_proba(predict_data)

        preds.append(prediction)
        closes.append(data.close[0])

        sleep(1)

    result = [
        { "ticker": ticker,
          "close": close,
          "SELL": prediction[0],
          "HOLD": prediction[1],
          "BUY": prediction[2] } for ticker, close, prediction in zip(tickers, closes, preds)
    ]
    return jsonify(result)

if __name__ == "__main__":
    app.run(host="0.0.0.0")
