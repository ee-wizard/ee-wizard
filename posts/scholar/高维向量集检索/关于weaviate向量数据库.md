---
date: 2025-06-15
title: 关于Weaviate向量数据库
category: scholar
tags:
- scholar
- vector_set_search
description: 关于Weaviate向量数据库的使用
---

# Configuation

```bash
docker run -p 8080:8080 -p 50051:50051 cr.weaviate.io/semitechnologies/weaviate:1.31.1
```

The command sets the following default [environment variables](https://weaviate.io/developers/weaviate/installation/docker-compose?docker-compose=anonymous#environment-variables) in the container:

- `PERSISTENCE_DATA_PATH` defaults to `./data`
- `AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED` defaults to `true`.
- `QUERY_DEFAULTS_LIMIT` defaults to `10`.



# Weaviate & Muvera

在Weaviate 1.30.0版本中，Weaviate内置了Muvera

https://weaviate.io/blog/muvera#costs-recall--query-throughput

Thanks for your reply, I picked a chunk on the Lotte dataset and ran your implementation of Muvera, but found that the recall rate was only 30%-40%. Recently [Weaviate](https://weaviate.io/blog/muvera#costs-recall--query-throughput) also implemented Muvera, and with the same parameters, Weaviate can achieve a recall rate of 80%.

Due to experimental environment limitations, it is not possible to test  the entire dataset for the time being, I would like to know if you have  tested Muvera in its entirety in your paper.