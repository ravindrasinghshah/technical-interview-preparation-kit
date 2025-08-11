#### Q: The system should scale to support 1B shortened URLs and 100M DAU

```
Storage capacity: 1 row estimation = ~ 200 bytes (short code ~8 bytes, long url ~100 bytes, custom alias ~100 bytes, expiration ~8 bytes, creation ~8 bytes)
This can be rounded up to ~500 bytes.
For 1 billing urls: 1 * 10^9 * 500 = ~500 GB
```
