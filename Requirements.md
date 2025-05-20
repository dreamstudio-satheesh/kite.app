**Zerodha Admin Panel - Complete Requirements Document**

---

### **Overview**

This document defines the full requirements for a Zerodha Trading Admin Panel designed for internal use. It supports real-time market monitoring, order automation, GTT handling, and admin-level management across multiple Zerodha accounts.

The stack includes:

* **Backend**: Laravel 11
* **WebSocket Engine**: Python + Redis (for tick streaming)
* **Database**: MySQL
* **Frontend**: Blade (Velzon theme)
* **Server**: Docker + Caddy

---

### **Core Features**

#### **1. User Management**

* Admin login (username + password only)
* Single-user access model (no roles or permissions)

#### **2. Zerodha Accounts Management**

* Add/update up to 5 Zerodha accounts
* Fields:

  * Name
  * API Key
  * API Secret
  * Access Token
  * Status: Active / Inactive

#### **3. Admin Settings**

* Global settings (one row):

  * Buy Logic: `fixed_percent`, `offset_ltp`
  * Buy %
  * Stoploss %
  * Auto-sell before trade closing time

#### **4. Orders Management**

##### **Pending Orders Upload**

* Upload Excel with:

  * Zerodha Account ID
  * Symbol
  * Target Percent
* Calculate `ltp`, `target_price`, `stoploss_price` at upload
* Store as `pending` status

##### **Order Monitor**

* Background task checks Redis for latest LTP
* If `ltp <= target_price` → place regular order
* Log execution in `order_logs`
* Schedule `sell` or `SL` if needed

##### **Order Fields**

* symbol, qty, target\_percent
* ltp\_at\_upload, target\_price, stoploss\_price
* status: pending / executed / failed / cancelled
* reason, executed\_price, executed\_at, stoploss\_triggered\_at

#### **5. Order Logs**

* Linked to pending order
* Type: BUY / SELL / STOPLOSS
* Product: MIS / CNC
* Notes / message

#### **6. GTT Orders (Optional)**

* Upload and manage GTT orders
* Sync status with Zerodha every 30–60 seconds
* Mark as triggered/cancelled

#### **7. Positions & Holdings**

* Synced live via WebSocket → Redis
* Laravel reads Redis on demand (no DB table required)
* Alternatively: store positions/holdings periodically for history tracking

#### **8. Cron Logs**

* Track all background commands:

  * sync\:positions
  * sync\:gtt
  * monitor\:orders
* Fields: command, status, message, timestamp

---

### **WebSocket Integration**

#### **Python Zerodha Ticker Service**

* Subscribes to 1000–3000 tokens via WebSocket
* Receives ticks with `instrument_token`, `last_price`, `timestamp`
* Publishes ticks to Redis:

  * Key: `tick:<token>`
  * Value: JSON `{ltp, time}`

#### **Laravel Consumption**

* Reads Redis `tick:<token>`
* Uses to compare `target_price`
* Triggers order when condition met

---

### **Deployment**

* All services in Docker containers:

  * backend (Laravel)
  * python (WebSocket client)
  * redis
  * mysql
  * phpmyadmin
  * caddy

Caddy reverse proxies:

* `/api/*` → backend
* `/ws/*` → python
* `/phpmyadmin` → phpmyadmin

---

### **Additional Enhancements**

* Time windows: restrict order placing to 9:30–3:20
* Retry logic for failed orders
* Export logs to CSV
* Dynamic watchlist selection

---

### **Optional Tables (For History)**

* `positions`
* `holdings`
* Use only if you want offline access or trend analytics

---

Let me know when to start building the Laravel migrations, seeders, or Artisan commands.
