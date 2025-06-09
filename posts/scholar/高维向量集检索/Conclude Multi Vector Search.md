---
date: 2025-05-05
title: 关于多向量检索的死磕历程
category: scholar
tags:
- 
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
  
- 这样看，其实subspace-cluster也与Dessert的思路完全吻合，只是subspace-cluster不再是随机投影，而是通过迭代，获取尽可能使投影空间正交的多个投影矩阵，在各投影空间上进行聚类
  - But, Desset使用的L个Hash函数，每个hash函数h将$v(vector) \in R^d --> R$，而每个h又可以看作d维向量，L个hash函数组合成一个$L \times d$的投影矩阵M，进而$v\cdot M^T \in R^L$，然后由LSH的局部敏感特性，将靠的近的hash值聚成bucket（也就是m = table num）
  - 而，subspace-cluster是使用多个正交（ideal）$d \times m$的投影矩阵M，使$v\times M^T \in R^m$，在投影空间进行聚类增设label
  - Then, 此时再看BioVss，其实FlyHash也属于LSH，但是Random-Project-LSH得出的hash val的性质是差值越近，则向量越接近；而FlyHash得出的hash val的性质是hamming distance越近则向量越近
  

### About Dessert

Dessert内部没有使用MaxSim作rerank，在Lotte数据集上的测试结果并不理想

### About Muvera

参数：d_proj, r, B

1. 空间聚类划分为B个聚簇，将每个向量集放入对应的聚簇并作均值聚合 -> B  * d
2. 对每个聚簇中的向量投影r次: B  * d -> B * d_proj * r



### About SubSpace Cluster

1. 使用m个软正交投影向量，将向量集合投影到低维向量空间，分别做聚类
2. 使用子空间聚类，迭代出m个投影向量和聚簇中心集

## **Related Codes**

[Github: Colbert V2](https://github.com/stanford-futuredata/ColBERT)

[ColbertV2封装库](https://github.com/AnswerDotAI/RAGatouille)

[Github: ThirdAIResearch/Dessert](https://github.com/ThirdAIResearch/Dessert)

