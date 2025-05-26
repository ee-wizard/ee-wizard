---
date: 2025-05-26
title: Paper-MPAD-A New Dimension-Reduction Method for Preserving Nearest Neighbors in High-Dimensional Vector Search
category: scholar
tags:
- scholar
- vector_search
description: 论文-高维空间降维方法
---

# 论文信息

[MPAD: A New Dimension-Reduction Method for Preserving Nearest Neighbors in High-Dimensional Vector Search（2025）](https://scholar.google.com/citations?view_op=view_citation&hl=en&user=eRaZHewAAAAJ&sortby=pubdate&citation_for_view=eRaZHewAAAAJ:jU7OWUQzBzMC)

Dimension Reduction(DR)

# 内容摘要

## 同类DR方法

> We present MPAD—Maximum Pairwise Absolute Difference, an unsupervised DR method that explicitly preserves approximate NN relations by maximizing the margin between 𝑘-NNs and non-𝑘-NNs under **a soft orthogonality constraint**. 

基于软正交约束

> Unlike traditional DR techniques that aim to preserve global variance or pairwise distances, MPAD explicitly targets approximate nearest neighbor (ANN) fidelity. It formulates an unsupervised optimization objective that **prioritizes the relative ordering of each vector’s true 𝑘-nearest neighbors over its non-neighbors in the low-dimensional space**. By encouraging margin-based separation between neighbors and distractors, MPAD ensures that ANN-sensitive geometry is preserved during projection.



### Principal Component Analysis(PCA)

> projecting high-dimensional data onto a subspace spanned by the top 𝑚 principal components

> Despite its widespread use, PCA is inherently a global method: it optimizes for directions that explain the largest variance across the entire dataset, without regard to local geometry or neighborhood preservation. This characteristic makes PCA ill-suited for tasks that rely on maintaining 𝑘-nearest neighbor (k-NN) relations—such as approximate nearest neighbor (ANN) search and information retrieval—since small distances between semantically similar points can be distorted during projection. In such contexts, **preserving local topology is often more important than capturing dominant global trends, which PCA overlooks.** (保持局部拓扑结构通常比捕捉 PCA 所忽略的主导全局趋势更为重要。)

PCA本质是找到整个数据集的最大方差方向，而不考虑局部集合和邻域保持，因此不利于维护k近邻关系

for that 语义相似点之间的小距离可能会在投影过程中扭曲

### Kernel PCA(K-PCA)

对PCA的扩展，通过非线性核函数将输入数据映射到高维特征空间，然后再变换后的空间中执行线性PCA

> This approach enables the discovery of non-linear patterns and manifold structures in the original data
> that standard PCA—restricted to linear projections—cannot capture.

能够捕捉原始数据中的非线性模式核流式结构

常用核函数有Gaussian (RBF) and polynomial kernels

缺点：计算成本大，需要构建N*N的核矩阵，然后特征值分解，不适用于大规模数据集

### Multidimensional Scaling(MDS)

将数据点投影到能够保持距离的低维空间

缺点：计算成本大

https://zhuanlan.zhihu.com/p/50715681

https://scikit-learn.org/stable/modules/generated/sklearn.manifold.MDS.html



### Random projections(RP)

> Their data-independence implies that the projection does not adapt to the structure or distribution of the input space, which can lead to suboptimal preservation of fine-grained geometric relationships—especially
> in datasets with strong clustering, anisotropic features, or manifold structure [7 ]. In particular, while inter-point distances may be roughly maintained, the relative neighborhood rankings—critical for retrieval performance—can be significantly distorted. 

尽管随机投影简单且具有理论保证，但在应用于近似最近邻 (ANN) 搜索等任务时，仍存在一些实际限制。其数据独立性意味着投影无法适应输入空间的结构或分布，这可能导致细粒度几何关系的保存效果不佳，尤其是在具有强聚类、各向异性特征或流形结构的数据集中 [7]。具体而言，虽然点间距离可以大致保持，但相对邻域排名（对检索性能至关重要）可能会发生显著扭曲。



## Maximum Pairwise Absolute Difference (MPAD)

定义$R^n -> R^m$的映射，最大化标量投影中的最小成对差异，同时通过软正交惩罚减小投影方向的冗余

> The core algorithm iteratively selects 𝑚 projection directions by optimizing a signed objective function 𝜙 that balances informativeness and orthogonality. 

核心算法通过优化平衡信息量和正交性的有符号目标函数𝜙来迭代选择𝑚投影方向

和PCA一样的思路，在多个维度中优先选择方差最大的维度，但是==PCA面临三个问题==

1. **Infomation trade-off**。即会损失细节
2. **Local versus Global Structure**
3. **Emphasis on Pairwise Differences**

> In light of these insights, our method selects the dimension that maximizes the average of the smallest 𝑏% of the pairwise absolute differences.

==高维空间的特性==

1. **Concentration of Measure**

> In high dimensions, pairwise distances tend to become nearly uniform, complicating the differentiation between close and distant points.
>
> 在高维度中，成对距离趋于变得几乎均匀，这使得近点和远点之间的区分变得复杂。

2. **Redundancy**

> Typically, only a few dimensions contain most of the discriminative information, while the remainder may contribute noise or redundancy.

3. **Dominance of Local Structure**

> The intrinsic organization of the data is frequently governed by local relationships rather than by global variance, **making it imperative to preserve the finer details of the nearest neighbor topology.**



### Algorithm

1. 随机生成1个n维单位向量w1作为初始投影向量

$$
f_{w_1}(x_i \in X) = proj_{w_1}(x_i) = <x_i,w_1> \cdot w_1 \\
$$

$$
d_{1,ij} = ||f_{w_1}(x_i)-f_{w_1}(x_j)|| \\
$$

$$
D_{1,b} = \{ d_{1,ij} | Smallest \ b\% \ of \ d_{1,ij} \} \\
$$

$$
\mu_{b}(w_1) = \frac{1}{|D_{1,b}|}\sum_{d \in D_{1,b}} d \\
$$

$$
argmax_{w_1}{\mu_{b}(w_1)} = armax_{w_1}{\frac{1}{|D_{1,b}|}\sum_{d \in D_{1,b}} d}
$$

2. 对于第2个基向量w2，对其施加一个正交性惩罚**orthogonality penalty**

这里与PCA不同，并不强制正交

> This is because we believe that in many real-life scenarios some directions indeed convey more information than others, and there is no reason to force them to be orthogonal. 

$$
P_{orth,2} = \alpha (w_1 \cdot w_2) ^2
$$

Generalized For
$$
P_{orth,k} = \alpha \sum_{i=1}^{k-1} (w_i \cdot w_k)^2
$$
然后使得
$$
argmax_{w_2} {(\mu_b (w_2) - P_{orth,2}})
$$
经过T次迭代，最终构造一个投影向量$w_k$