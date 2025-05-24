import redis
import random
import json
import time
import csv
from datetime import datetime

r = redis.Redis(host="redis", port=6379, decode_responses=True)

realistic_prices = {
    "NSE:RELIANCE": 2800,
    "NSE:TCS": 3900,
    "NSE:INFY": 1400,
    "NSE:HDFCBANK": 1600,
    "NSE:ICICIBANK": 1150,
    "NSE:SBIN": 850,
    "NSE:AXISBANK": 1080,
    "NSE:BHARTIARTL": 1320,
    "NSE:BAJFINANCE": 7000,
    "NSE:LT": 3800,
    "NSE:ITC": 440,
    "NSE:KOTAKBANK": 1700,
    "NSE:ASIANPAINT": 3100,
    "NSE:MARUTI": 12200,
    "NSE:WIPRO": 480,
    "NSE:HCLTECH": 1550,
    "NSE:TECHM": 1250,
    "NSE:IDEA": 13,
    "NSE:ZEEL": 170,
    "NSE:TATAPOWER": 400
}


# Load instrument tokens from CSV
symbol_token_map = {}
with open("all_equities.csv", newline='') as f:
    reader = csv.DictReader(f)
    for row in reader:
        sym_key = f"{row['exchange']}:{row['tradingsymbol']}".upper()
        if sym_key in realistic_prices:
            symbol_token_map[sym_key] = int(row['instrument_token'])

price_map = realistic_prices.copy()

print("Starting mock ticks...")

try:
    while True:
        for symbol, token in symbol_token_map.items():  # symbol is "NSE:TCS"
            current_price = price_map[symbol]
            drift_pct = random.uniform(-0.3, 0.3)
            new_price = round(current_price * (1 + drift_pct / 100), 2)
            price_map[symbol] = new_price

            tick_data = {
                "instrument_token": token,
                "symbol": symbol,  # Added symbol
                "last_price": new_price,
                "timestamp": time.time()
            }
            r.publish('ticks', json.dumps(tick_data))
            print(f"[{datetime.utcnow()}] {symbol} → {new_price}")

        time.sleep(1)
except KeyboardInterrupt:
    print("Stopped.")