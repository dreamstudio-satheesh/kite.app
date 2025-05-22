FROM python:3.11-slim

WORKDIR /app
COPY . .

RUN pip install redis kiteconnect

CMD ["python", "tick_streamer.py"]
