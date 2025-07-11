### Relational Databases (SQL)

Structure: Data is organized in the tables, with relationship defined between tables using keys.

Strength: Strong consistency (ACID properties), efficient for complex queries, well suited for structured data.

Examples: MSSQL, PostgreSQL, MySql

Use Case: Financial System, inventory management, applications requiring high data integrity.

### NoSQL Databases

Structure: Flexible data models (key-value, document, graph, columnar), no need of structure and relationship.

Strength: Scalability, high write throughput, suited for unstructured or semi-structured.

Examples: MongoDB, DocumentDB, Cassandra, Redis

Use Case: Social media, real time data processing, CMS

### Time Series Databases

Structure: Optimized for storing timestamped data points.

Strength: Efficiently handles high volume of timestamped data, suitable for tracking trends and patterns over time.

Examples: InfluxDB, Prometheus

Use Case: Monitoring system, financial data analysis

### Graph Databases

Structure: Represents data as nodes and edges, allowing for efficient traversal of relationships.

Strength: Excellent for modelling and querying complex relationships.

Examples: Neo4j

Use Case: Social networks, recommendation engines, fraud detection.

### Document Databases

Structure: Stores data as documents, typically in JSON or BSON format.

Strength: Flexible schema, suitable for semi-structured data, easy to work with.

Examples: MongoDB, DocumentDB

Use Case: CMS, e-Commerce applications, mobile backend

### Columnar Databases

Structure: Stores data in columns rather than rows.

Strength: Optimized for analytical workloads and data warehousing, faster query performance for aggregations.

Examples: HBase, Cassandra

Use Case: Business Intelligence, Data warehousing, real-time analytics

### Key-Value Databases

Structure: Simplest NoSQL model, storing key-value pairs.

Strength: Very fast lookup, high write throughput, suitable for caching and session management.

Examples: Redis, Memcached

Use Case: Caching, Session management, User preferences.

### In-Memory Databases

Structure: Stores data primarily in RAM, rather than on disk.

Strength: Extremely fast read and write, low latency.

Examples: Redis, VoltDB

Use Case: Caching, high frequency trading, real time analytics.

## Redis

It's a in-memory & single threaded, key value data strucuture - which makes it very fast and easy.
Keys are string and Values can be any datastructure supported by Redis: binary data, sets, lists, hashes, sorted sets, geospatial indexes, time series etc.

Redis can run as a single node, with high availability replica, or as a cluster. When operating as a cluster, Redis clients caches a set of "hash slots", which maps to the node.

It's really fast and can handle O(100K) writes per second and read latency is often in microsecond range.

### Use-Cases

1. Cache - This is a most common scenario of using Redis. Its a good practice to employ a TTL on each key, that ensures stale data is not kept in the cache. Expiration policy such as LRU and other are used to manage the data within capacity.

2. Distributed Locks - In certain use-cases it might be required that resource is locked to maintain consistency (such as ticket booking etc.) - if database cannot gaurantee locks then Redis is a good option to lock the resource to bring high consistency. Locks can auto-expire and free up the resouce.

3. Leaderboards - Sorted sets can be maintained in the Redis, which can be queried in log time. For example - find the post which contain given keyword and which have the most likes. Periodically, low ranked items can be removed from the sorted sets.

4. Rate limiting - A variety of rate-limiting algorithms can be used in redis. Commonly used is fixed window limiter - where it guarantees number of requests should not exceed `N` over fixed window time `W`. Implementation is simple, use INCR to increment when request comes in and checks if its greater than `N` then drop request else proceed.

5. Proximity Search - Redis supports Geospatial indexes with commands like GEOADD and GEOSEARCH.

6. Event Sourcing (Stream) - Redis' streams are appended logs, similar to kafka. Add items to a log and distributed workers can consume itemds from the logs. Redis add log with XADD command and consumer groups can read and claim using XREADGROUP and XCLAIM. A simple example is a work queue, add items to the queue and have it processed.

7. Pub/Sub - It natively supports publish and subscribe messaging pattern, allowing to broadcast message to multiple subscribers in real time. Useful for building chat system, real time notifications. It's simple and fast, but not durable. It guarentees delivery of "at most once" - which means if the subscriber is offline then message is missed - for guarantee use streams or a dedicated message broker like kafka.
