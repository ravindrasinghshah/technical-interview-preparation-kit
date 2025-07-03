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
