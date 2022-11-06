from flask import Flask, jsonify, request
from time import sleep
import requests
import pandas as pd
from io import StringIO
import ta
import numpy as np
from catboost import CatBoostClassifier
from binance.spot import Spot 

app = Flask(__name__)

tickers = ["BTCUSDT", "ETHUSDT", "BNBUSDT", "DOGEUSDT", "XRPUSDT", "BUSDUSDT", "ADAUSDT", "SOLUSDT", "MATICUSDT", "DOTUSDT"]

client = Spot()

@app.route("/predict", methods=["GET"])
def predict():
    model = CatBoostClassifier()
    model.load_model("kisu.cbm")

    closes = []
    preds = []
    for ticker in tickers:
        
        response = client.klines(ticker, "1m", limit=100)
        data = pd.DataFrame(response, columns=["Timestamp", "Open", "High", "Low", "Close", "Volume", *range(6)])
        data = data[["Open", "High", "Low", "Close", "Volume"]].astype(float)
        data["rsi"] = ta.momentum.rsi(data.Close)

        predict_data = np.array([data["rsi"].iloc[-1]])
        prediction = model.predict_proba(predict_data)

        preds.append(prediction)
        closes.append(data.Close.iloc[-1])

    result = [
        { "ticker": ticker,
          "close": close,
          "sell": prediction[0],
          "hold": prediction[1],
          "buy": prediction[2] } for ticker, close, prediction in zip(tickers, closes, preds)
    ]
    return jsonify(result)

if __name__ == "__main__":
    app.run(host="0.0.0.0")
