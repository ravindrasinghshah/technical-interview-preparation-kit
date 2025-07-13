# Key Technologies

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

## DynamoDB

DynamoDB by default is highly available and scalable - which means consistency is eventual. It's possible to make it highly consistent but then that will increase the latency.
Just like relational database, data is organized in tables, where each table has multiple items as values. But certain distinct differences tailord for scalability and flexibility.
DynamoDB comes with built-in, in-memory cache called DAX (DynamoDB accelerator) - it simply needs to be enabled on tables.

### Partition Key and Sort Keys

DynamoDB tables are defined by a primary key, which consists of one or two attributes:
**Partition Key**: Its used to identify each record in the table. DB uses this key to identify the physical location of the item in the DB. The value is hashed to determine where the item is stored.
**Sort Key**: This is optional, but when combined with partition key then forms a composite primary key. The sort key is used to order items in the table.

`Primary Key = {Partition Key}:{Sort Key}`

```
Example: Chat table - chatId, messageId, userId, message etc...
partition key = chatId, sort key = messageId
primary key = chatId : messageId
```

### Secondary Index

If its required to query data by an attribute which is not a partition key, then use secondary index.
**Global Secondary Index (GSI)**: Secondary index can be created using other field which is not a primary partition key. Helps query data from table based on attribute which is other than partition key. Because GSI uses a different partition key, data is stored in an entirely different partition from the base table and replicated separately.

**Local Secondary Index (LSI)**: An index with a same partition key but different sort key. This enables sorting items within same partition. Since it uses same partition key, they are stored in a same partition.

When item is modified in the table then DynamoDB asyn updates the GSI - which means its eventually consistent.

### Streams

DynamoDB has built-in support for CDC (Change data capture) through DynamoDB Streams. Streams capture changes to the item and then make it available for processing in real-time. This means, any change in data will be captured in the stream and sent to downstream applications.
This can be used for use-cases like, trigger lambda based on change event, maintaining a replica of DB or real-time analytics dashboard.
If wants to build search functionality on top of DynamoDB, then streams can be used to keep elastic search in sync.

## API Gateway

It is popular choice for micro-services architecture. This can be put before services and then used for request validation, handling rate-limiting, routing, auth, load balancing etc.

API Gateway can be scaled horizontally and load balancer is used before it to distribute the traffic. API gateway can also perform load balancing to distribute the traffic to multiple instances of the service.

## Kafka

Its an open-source distributed event streaming platform that can be used for message queue or as a stream processing system. It's highly scalable, durable and performant - handles vast amount of data in real-time, ensuring no message is lost ever.

**Brokers**: Kafka cluster is made up of multiple brokers. They are individual servers - each broker is responsible for storing data and serving clients. More brokers can store more data and serve more clients.
**Partitions**: Each broker has number of partitions - each partition is an immutable sequence of message that is continually appended to. This is how kafka scales, as they allow for messages to be consumed in parallel.
**Topic**: Logical grouping of partitions is called topics - this is how you publish and subscribe to data in kafka. When you publish a message, its published in topic and when consumed, its consumed from topic.
**Producers**: Ones who writes data into the topic.
**Consumers**: Ones who reads data from the topic.

Each message in the partition is assigned a unique offset, which is a sequential identifier - indicating the position of the message in the partition. This is used by consumer to track of their progress in reading messages from the topic. Consumers periodically commit this offset back to kafka - this helps them resume reading from where they left off in case of failure or restart.

Kafka ensures is durability and availability through a robust replication mechanism - it uses leader-follower model for replication. A leader replica handling reads/writes and multiple follower replicas that passively replicate data, ensuring durability and availability even if brokers fail.

1 broker can store 1TB data and handle as many as 1M messages/second.

### When to use?

Consider using it when:

1. processing can be done async - good example is video transcoding.
2. ensures messages are processed in the order - good example is when queue managment is required in the feature.
3. decouple producer and consumer to scale independently - common pattern is in microservices, where we want to ensure one service can't take down other.

### More

In case we need more brokers then we can horizontally scale by adding more brokers in the cluster or partitioning. 
- To take advantage of more brokers, it is essential that topics have sufficient partitions.
- Partitioning strategy is important for scaling strategy. This can be done by chosing a key for partition and hashing the key.
`partition = hashFunc(key) % num_of_partitions`

In kafka, we usually wants to scale the topics rather than entire cluster. Some topics may get more traffic than other. To scale topic, increase the number of partitions, which allows to take the advantage of more brokers.

Batch messages can be done and message compression can be done to improve performance.
