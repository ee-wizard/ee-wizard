---
date: 2025-06-09
title: Paper-Subspace Collision(An Efficient and Accurate Framework for High-dimensional Approximate Nearest Neighbor Search)
category: scholar
tags: 
- paper
- vector_search
description: ""
---

## 论文信息

**Subspace Collision: An Efficient and Accurate Framework for High-dimensional Approximate Nearest Neighbor Search**

JIUQI WEI, Institute of Computing Technology Chinese Academy of Sciences, University of Chinese Academy of Sciences, China
XIAODONG LEE, Institute of Computing Technology Chinese Academy of Sciences, Fuxi Institution, China
ZHENYU LIAO, Huazhong University of Science and Technology, China
THEMIS PALPANAS, LIPADE, Université Paris Cité, France
BOTAO PENG, Institute of Computing Technology Chinese Academy of Sciences, China

[Proceedings of the ACM on Management of Data](https://dl.acm.org/toc/pacmmod/2025/3/1)

## Abstract

Approximate Nearest Neighbor (ANN) search in high-dimensional Euclidean  spaces is a fundamental problem with a wide range of applications.  However, there is currently no ANN method that performs well in both  indexing and query answering performance, while providing rigorous  theoretical guarantees for the quality of the answers. In this paper, we first design SC-score, a metric that we show follows the Pareto  principle and can act as a proxy for the Euclidean distance between data points. Inspired by this, we propose a novel ANN search framework  called Subspace Collision (SC), which can provide theoretical guarantees on the quality of its results. We further propose SuCo, which achieves  efficient and accurate ANN search by designing a clustering-based  lightweight index and query strategies for our proposed subspace  collision framework. Extensive experiments on real-world datasets  demonstrate that both the indexing and query answering performance of  SuCo outperform state-of-the-art ANN methods that can provide  theoretical guarantees, performing 1-2 orders of magnitude faster query  answering with only up to one-tenth of the index memory footprint.  Moreover, SuCo achieves top performance (best for hard datasets) even  when compared to methods that do not provide theoretical guarantees.

> 高维欧几里得空间中的近似最近邻 （ANN） 搜索是一个应用广泛的基本问题。但是，目前还没有一种 ANN  方法在索引和查询应答性能方面都表现良好，同时为应答质量提供严格的理论保证。在本文中，我们首先设计了  SC-score，我们展示了一个遵循帕累托原理的指标，可以作为数据点之间欧几里得距离的代理。受此启发，我们提出了一种称为**子空间碰撞** （SC）  的新型 ANN 搜索框架，它可以为其结果质量提供理论保证。我们进一步提出了  SuCo，它通过为我们提出的子空间碰撞框架设计一个基于聚类的轻量级索引和查询策略，实现了高效和准确的 ANN  搜索。在真实数据集上的广泛实验表明，SuCo 的索引和查询应答性能都优于可以提供理论保证的最先进的 ANN 方法，将查询应答速度提高了 1-2  个数量级，而索引内存占用量仅为十分之一。此外，即使与不提供理论保证的方法相比，SuCo 也能实现最佳性能（最适合硬数据集）。

## Content

主流的索引方案： LSH， Tree-based, Graph-based

### 定义

**Definition 1** (Collision). Given a dataset D of 𝑛 data points in 𝑑-dimensional space, a query point 𝑞 ∈ R𝑑 , and a collision ratio 𝛼 ∈ (0, 1), if a data point 𝑜 ∈ D satisfies: ∥𝑜, 𝑞∥ is one of the minimum 𝛼 · 𝑛 distances between all 𝑛 data points and 𝑞, i.e., 𝑜 is one of the (𝛼 · 𝑛)-NNs of 𝑞 in D, we say that 𝑜 collides with 𝑞.

**Definition 2** (Subspace Collision). Given a dataset D of 𝑛 data points in 𝑑-dimensional space, a query 𝑞 ∈ R𝑑 , and a collision ratio 𝛼 ∈ (0, 1). We randomly select 𝑠 dimensions from all 𝑑 dimensions as a subspace R𝑠 (𝑠 < 𝑑). The dataset D, the data point 𝑜, and the query point 𝑞 in this subspace are denoted as D′, 𝑜′, and 𝑞′. If a point 𝑜 ∈ D satisfies: 𝑜′ is one of the (𝛼 · 𝑛)-NNs of 𝑞′ in D′, we say that 𝑜 collides with 𝑞 in the subspace R𝑠 .

**Definition 3** (Subspace Sampling). Given a dataset D of 𝑛 data points in 𝑑-dimensional space, we adopt a multi-round sampling strategy to obtain 𝑁𝑠 subspaces. In round 𝑖, a number of 𝑠 = ⌊ 𝑑 / 𝑁𝑠 ⌋ dimensions are uniformly sampled without replacement to form a subspace 𝑆𝑖 , 𝑖 = 1, 2, . . . , 𝑁𝑠 − 1. For the last subspace 𝑆𝑁𝑠 , it simply pick up all remaining dimensions.

**Definition 4** (SC-score). Given a dataset D of 𝑛 data points in 𝑑-dimensional space, a query 𝑞 ∈ R𝑑 , 𝑁𝑠  𝑠-dimensional subspaces, and a collision ratio 𝛼 ∈ (0, 1), probe collisions of 𝑞 in 𝑁𝑠 subspaces with the collision ratio 𝛼. For a data point 𝑜 ∈ D, its SC-score is the number of subspaces where it collides with 𝑞. Therefore, SC-score is an integer in [0, 𝑁𝑠 ].

**线性扫描，计算SC-score，然后rerank**

<img src="./../../../../../LocalResources/Pictures/Cache/Subspace%20Collision/20250609201959045.png" alt="image-20250609201950234" style="zoom:67%;" />

**workflow**

![image-20250609202448438](https://raw.githubusercontent.com/ee-wizard/ee-wizard/res/images/20250609202456756.png)

对于整个向量空间，划分为$N_s$个s维的子空间，在每个子空间下再划分为两个半空间，做K-Means聚类

**半空间划分**

![image-20250609203020352](https://raw.githubusercontent.com/ee-wizard/ee-wizard/res/images/20250609203021700.png)

**问题**：在子空间内直接进行 K-means 聚类时，若需生成 $K$ 个聚类中心，时间复杂度为 $O(K \cdot s \cdot n \cdot t)$（$s$ 为子空间维度，$t$ 为迭代次数）。当 $K$ 较大时（例如为达到高精度需大量聚类），计算开销极高。

**解决**：将子空间二次拆分为两个 $s/2$ 维的子空间（例如图4中拆分为X/Y轴），在每个低维子空间独立进行 K-means 聚类，只需生成 $\sqrt{K}$ 个聚类中心（而非 $K$ 个）。此时复杂度降至：

$O(2 \cdot \sqrt{K} \cdot \frac{s}{2} \cdot n \cdot t) = O(\sqrt{K} \cdot s \cdot n \cdot t)$

**效果**：计算复杂度从 $O(K)$ 降为 $O(\sqrt{K})$（如 $K=10^6$ 时，计算量从百万级降至千级）。

**索引建立算法**

<img src="https://raw.githubusercontent.com/ee-wizard/ee-wizard/res/images/20250609202942246.png" alt="image-20250609202939415" style="zoom:80%;" />

**Dynamic Activation algorithm**

多序列算法是结合IMI提出的，用于查询IMI并获取与查询接近的数据点[9]。然而，多序列算法使用优先级队列来保存候选簇。对于优先级队列，插入和弹出操作都需要对数时间复杂度，非常耗时。因此，我们设计了一种名为**动态激活**的新算法来支持无需优先级队列的IMI查询。动态激活算法返回的查询结果与多序列算法相同。5.2节中的实验结果表明，动态激活算法的效率比多序列算法高出40%。

> The smaller the distance sum of clusters in 𝐼𝑀𝐼 , the earlier they are retrieved. 

<img src="https://raw.githubusercontent.com/ee-wizard/ee-wizard/res/images/20250610142432483.png" alt="image-20250610142427970" style="zoom: 50%;" />



## References

[知乎-关于倒排多重索引](https://zhuanlan.zhihu.com/p/130792944)
