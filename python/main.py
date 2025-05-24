import csv
import json
import time
import redis
import requests
from kiteconnect import KiteTicker

api_key = "fwl8jd4xcan3r27d"
access_token = "WeaP2sLqLqG29hk73vHvKZWyo02wlFols"

# Redis for tick publishing
r = redis.Redis(host='redis', port=6379, decode_responses=True)

# Load symbol-token mapping
def load_token_map(csv_path="all_equities.csv"):
    mapping = {}
    with open(csv_path, newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            key = f"{row['exchange'].upper()}:{row['tradingsymbol'].upper()}"
            mapping[key] = int(row['instrument_token'])
    return mapping

# Get watched symbols via HTTP from Laravel
def get_symbols_from_http():
    try:
        response = requests.get("http://php:8010/watchlist-symbols", timeout=5)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        print("Error fetching symbols:", e)
        return []

# Convert symbols → tokens
def get_tokens():
    token_map = load_token_map()
    # Create reverse mapping (token → symbol)
    global token_symbol_map
    token_symbol_map = {v: k for k, v in token_map.items()}
    symbols = get_symbols_from_http()
    tokens = []
    for sym in symbols:
        token = token_map.get(sym.upper())
        if token:
            tokens.append(token)
        else:
            print(f"[WARN] Token not found for symbol: {sym}")
    return tokens

# Get tokens at startup
tokens = get_tokens()
print(f"Subscribing to tokens: {tokens}")

kws = KiteTicker(api_key, access_token)

def on_ticks(ws, ticks):
    for tick in ticks:
        symbol = token_symbol_map.get(tick['instrument_token'], "UNKNOWN")
        data = {
            "instrument_token": tick['instrument_token'],
            "symbol": symbol,
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