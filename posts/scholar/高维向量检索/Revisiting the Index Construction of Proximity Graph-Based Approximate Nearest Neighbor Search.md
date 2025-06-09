---
date: 2025-05-16
title: Paper-Revisiting the Index Construction of Proximity Graph-Based Approximate Nearest Neighbor Search.
category: scholar
tags:
- paper
- vector_search
description: 论文-重新审视基于邻近图的近似最近邻搜索的索引构建
---



## 论文信息

Shuo Yang#, Jiadong Xie#, **Yingfan Liu\***, Jeffrey Xu Yu, Xiyue Gao, Qianru Wang, Yanguo Peng, Jiangtao Cui.  Revisiting the Index Construction of Proximity Graph-Based Approximate  Nearest Neighbor Search. ***Accepted by VLDB 2025***.



## 摘阅

> Although PG-based approaches have superior search performance, they still suffer from a significantly higher cost in terms of index construction than other methods.

> [!note]
>
> 即现有的基于KNNG，NSWG，RNG的向量索引的构建代价较高

### 主流PG索引的构建

<img src="https://raw.githubusercontent.com/ee-wizard/ee-wizard/res/images/20250516161801528.png" alt="image-20250516161745728" style="zoom:67%;" />

**RNG(Relative Neighborhood Graph)**

1. Initialization Phase: 将所有结点v加入PG图G，并连接最接近的$k_0$个结点
2. Search Phase: 为每一个结点u执行K-ANN Search,获取C(u)，作为待refine的候选结点集合
3. Refinement Phase: 

<img src="https://raw.githubusercontent.com/ee-wizard/ee-wizard/res/images/20250516162622767.png" alt="image-20250516162620129" style="zoom:67%;" />

**NSWG(Navigable Small World Graph)**

HNSW构建算法如下（此处不再分析）

<img src="https://raw.githubusercontent.com/ee-wizard/ee-wizard/res/images/20250516191312072.png" alt="image-20250516191252766" style="zoom:67%;" />

### **PG索引的构建问题**

以上索引构建中都需要进行k-CNA(size-k candidate neighbor set acquisition)，然后通过refinement phase选择最终的连接边。

**The Importance of 𝑘-CNA Quality:** 从efficiency和quality两方面指出了RNG和NSWG的问题

RNG有efficiency问题，因为需要全量计算距离；而NSWG有quality问题，因为他是增量计算



### Refinement Before Search

$\alpha-pruning$: An edge (𝑢, 𝑣) exists in the graph only if there is no edge (𝑢, 𝑤) in the graph where 𝑑𝑖𝑠𝑡 (𝑢, 𝑤) < 𝑑𝑖𝑠𝑡 (𝑢, 𝑣), 𝑑𝑖𝑠𝑡 (𝑣, 𝑤) <𝑑𝑖𝑠𝑡 (𝑢, 𝑣), and ∠𝑢𝑤𝑣 > 𝛼.



### 新的PG构建方法

**Optimized k-CNA Approach**

<img src="https://raw.githubusercontent.com/ee-wizard/ee-wizard/res/images/20250516195904467.png" alt="image-20250516195901674" style="zoom:67%;" />

> Compared with the RNG construction, our method can be seen as **a reversal of search** **and** **refinement**. However, OptKCNA is more efficient due to the **smaller node out-degrees** and **keeps the 𝑘-CNA quality with a high probability**.
TODO: 4.2

**RNG自迭代构建**

Difficulty of Tuning Parameters in Search Phase: 需要根据数据集使用Grid Search调节L参数(pool width)

引入==Quality Examination==和==iterative refinement==

> The former determines the termination condition of our framework, while the latter defines the behaviour in each iteration. Again, we use the NSG as the representative RNG to illustrate the details.

1. Quality Examination

> we utilize the 𝑘-CNA quality to assess the quality of the derived NSG.
>
> However, computing the 𝑘-CNA quality can be time-consuming, as it requires brute-force computation of the ground truth (exact 𝑘-nearest neighbors of each node).
>
> To address this issue, we estimate the 𝑘-CNA quality via sampling. Specifically, we employ a random selection process to choose a specific number 𝑛𝑠 of nodes (we will discuss later) and then compute the average recall over the 𝑘-CNA results of those sampled nodes as an estimator for the average recall over all nodes, i.e., the 𝑘-CNA quality.

2. Iterative Refinement

<img src="https://raw.githubusercontent.com/ee-wizard/ee-wizard/res/images/20250516202314850.png" alt="image-20250516202313565" style="zoom: 80%;" />

P2K: from 𝛼-PG to KNNG



K2P: from KNNG to 𝛼-PG



## Related Resources

[作者刘英帆 Papers](https://web.xidian.edu.cn/liuyingfan/paper.html)

[Wiki: Delaunay triangulation](https://en.wikipedia.org/wiki/Delaunay_triangulation)