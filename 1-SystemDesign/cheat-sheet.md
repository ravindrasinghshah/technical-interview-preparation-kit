## Common Number Conversions

| Unit | Value                 | Bytes Equivalent    |
| ---- | --------------------- | ------------------- |
| 1K   | 1,000                 | ~10^3               |
| 1M   | 1,000,000             | ~10^6               |
| 1B   | 1,000,000,000         | ~10^9               |
| 1 KB | 1024 bytes            | 10^3 bytes (approx) |
| 1 MB | 1024 KB = 1,048,576 B | 10^6 bytes (approx) |
| 1 GB | 1024 MB = 10^9 bytes  | 10^9 bytes          |
| 1 TB | 1024 GB = 10^12 bytes | 10^12 bytes         |
| 1 PB | 1024 TB = 10^15 bytes | 10^15 bytes         |

## Traffic Estimates

#### Requests per Second (RPS/QPS)

Seconds per day => 24 \* 60 \* 60 = 86400

RPS = Total requests per day / (24 \* 60 \* 60)

### Data Size

Data per request \* RPS \* seconds per day

### Storage Estimation

Total Storage = Users \* Items per user \* Size per item \* Retention time

---

## 1. Throughput

**Definition:** Requests/events per second.

**Formula:**
Throughput = (Daily Active Users × Requests per User per Day) / 86,400

**Example:**

- 5M users × 20 requests/day = 100M req/day
- `100M / 86400 ≈ ~1157 req/sec`

---

## 2. Latency

**Definition:** Time taken to process a request (in milliseconds).

**Typical Targets:**

- p50 (median): ~100 ms
- p95: ~300 ms
- p99: ~500 ms

**Latency Budget Example:**

| Component   | Budget (ms) |
| ----------- | ----------- |
| Frontend    | 50          |
| Network     | 50          |
| Backend API | 50          |
| Database    | 50          |
| **Total**   | **200 ms**  |

---

## 3. Storage Estimation

**Formula:** Total Storage = Size per Item × Items per Day × Retention Days

**Example:**

- 1M images/day × 500KB × 180 days
- `Storage ≈ 90 TB`

---

## 4. Traffic Estimation

**Formula:**
Traffic/sec = Throughput × Payload Size

**Example:**

- 1000 req/sec × 100 KB
- `= 100 MB/sec bandwidth`

---

## 5. Server Capacity

**Formula:**
Required Servers = Peak QPS / QPS per Server

**Example:**

- 10K peak QPS, 1K/server
- `= 10 servers (plus redundancy)`

---

## 6. Availability (SLA)

| SLA Level | Max Downtime per Year |
| --------- | --------------------- |
| 99%       | 3.65 days             |
| 99.9%     | 8.76 hours            |
| 99.99%    | 52.6 minutes          |
| 99.999%   | 5.26 minutes          |

**Techniques:**

- Load balancing
- Multi-AZ / multi-region deployments
- Failover and retries

---

## 7. Read vs Write Ratio

**Use Case:**

- Guides DB choice, caching, and replication.
- Read-heavy apps: typically 80% read / 20% write

---

## 8. Consistency & Durability

**Consistency Models:**

- **Strong:** Read reflects latest write
- **Eventual:** Eventually reflects write

**Durability Measures:**

- Replication (e.g., 3x)
- Backups
- WAL (Write-Ahead Logging)

---

## 9. Security & Compliance

**Security Best Practices:**

- TLS for in-transit
- AES for at-rest encryption
- JWT or OAuth2 for authentication

**Compliance Considerations:**

- GDPR, HIPAA → data minimization, audit logs, retention policies

---

## Handy Reference Values

| Metric               | Value      |
| -------------------- | ---------- |
| 1 byte               | 8 bits     |
| 1 KB                 | 1024 bytes |
| 1 MB                 | 1024 KB    |
| 1 GB                 | 1024 MB    |
| Seconds per day      | 86400      |
| Monthly active users | DAU × 30   |
| Disk IOPS (SSD)      | ~10,000    |
| Disk IOPS (HDD)      | ~100       |

---

| Zeros    | Traffic    | Storage |
| -------- | ---------- | ------- |
| 3 zeros  | thousand   | KB      |
| 6 zeros  | million    | MB      |
| 9 zeros  | billion    | GB      |
| 12 zeros | trillion   | TB      |
| 15 zeros | quadrilion | PB      |

ASCII = 1 byte
Unicode = 2 bytes
Char = 2 bytes
Long / Double = 8 bytes
Image = ~100 KB - 500 KB(compressed) - for social media ~500 KB
Video = 1 min video is ~5 MB - 10 MB (compressed)
1 hour video is ~1-2 GB
`bitrate formula to estimate video size: 2 Megabits × 120 seconds = 240 megabits / 8 bits = 30 MB per video`
