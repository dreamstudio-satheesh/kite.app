import csv
import json
import time
import redis
from kiteconnect import KiteTicker

api_key = "your_api_key"
access_token = "your_access_token"

# Redis
r = redis.Redis(host='redis', port=6379, decode_responses=True)

# Load symbol-token mapping
def load_token_map(csv_path="all_equities.csv"):
    mapping = {}
    with open(csv_path, newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            mapping[row['tradingsymbol'].upper()] = int(row['instrument_token'])
    return mapping

# Get watched symbols from Redis (Laravel stores only symbols)
def get_symbols_from_redis():
    return r.smembers("watchlist:symbols")  # Set of symbols like RELIANCE, TCS, etc.

# Convert symbols → tokens
def get_tokens():
    token_map = load_token_map()
    symbols = get_symbols_from_redis()
    tokens = []
    for sym in symbols:
        token = token_map.get(sym.upper())
        if token:
            tokens.append(token)
    return tokens

tokens = get_tokens()
print(f"Subscribing to tokens: {tokens}")

kws = KiteTicker(api_key, access_token)

def on_ticks(ws, ticks):
    for tick in ticks:
        data = {
            "instrument_token": tick['instrument_token'],
            "last_price": tick.get('last_price'),
            "timestamp": tick.get('timestamp', time.time())
        }
        r.publish('ticks', json.dumps(data))
        print(data)

def on_connect(ws, response):
    print("Connected. Subscribing...")
    kws.subscribe(tokens)

def on_close(ws, code, reason):
    print("Closed:", reason)

kws.on_ticks = on_ticks
kws.on_connect = on_connect
kws.on_close = on_close

try:
    kws.connect(threaded=True)
    while True:
        time.sleep(1)
except KeyboardInterrupt:
    print("Shutting down.")
