---
date: 2025-05-05
title: 关于多向量检索的死磕历程
category: scholar
tags:
- scholar
- vector_set_search
description: 关于多向量检索的一些思考
---

# Multi Vector Search

## Papers

**Milvus: A Purpose-Built Vector Data Management System**（2021）

**Plaid: an efficient engine for late interaction retrieval.**（2023）

**DESSERT: An efficient algorithm for vector set search with vector set queries**（2023）

**[Bio-Based] Approximate vector set search: A bio-inspired approach for high-dimensional spaces**（2025）

- **[FlyHash] A neural algorithm for a fundamental computing problem**（2016）

**MUVERA: Multi-Vector Retrieval via Fixed Dimensional Encodings**（2024）

**IGP Efficient Multi-Vector Retrieval via Proximity Graph Index**（2025 未公开）

## Related Discussion

[Multi-attribute search with vector embeddings | VectorHub by Superlinked](https://superlinked.com/vectorhub/articles/multi-attribute-semantic-search)

关于以上Paper和Blog，在此不再分析（好吧，其实是原来的笔记太烂了，以后再整理吧~）



## Thinking

最早的Plaid提出四阶段剪枝方案，它与其他方案走的方向不同，也开放了多向量检索的另一条研究道路（如何更好的剪枝）

Dessert使用LSH将向量进行降维，BioVectorSearch使用FlyHash将向量集映射为二进制码和Count编码，Muvera使用聚类算法将向量集进行alignment

除了Plaid，虽然面向的相似度模型不同，方法不同，其实本质上都在做聚类，然后alignment

- 从Dessert开始，LSH可以规定L个哈希函数，每个哈希函数对应m个table，那么整个向量集其实相当于在L个“子空间”上做了聚类。因为这里的Hash Function类似或者说就是随机投影，在投影之后做聚类
- 然后是Muvera，这个不用说，明着做聚类，不过它在聚类之后再多次投影，而它的recall就是多次投影带来的，（似乎）消解了dimensional curse的影响
- BioVss利用FlyHash对向量进行“投影”，而FlyHash最早也是应用于聚类。它的特性是产生了二进制编码，由此来进行过滤。
  - 现在来看，它与Dessert or Muvera好像具有通性？FlyHash需要超参数**L**（二进制编码长度）和**m**（WTA策略，1-bit的位数），LSH需要**L**个Hash Function和**m**个Hash Table，~emmm….



## **Related Codes**

[Github: Colbert V2](https://github.com/stanford-futuredata/ColBERT)

[ColbertV2封装库](https://github.com/AnswerDotAI/RAGatouille)