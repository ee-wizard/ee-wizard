---
date: 2025-05-22
title: 关于子空间聚类的探索
category: 聚类算法
tags:
- 聚类
- 子空间聚类
description: 子空间聚类算法的研究进展
---

## Introduction

1. 为什么需要子空间聚类

> Traditional clustering algorithms consider all of the dimensions of an input dataset in an attempt to learn as much as possible about each ob-
> ject described. In high dimensional data, **however, many of the dimensions are often irrelevant**.

> Another reason that many clustering algorithms struggle with high dimensional data is the curse of dimensionality

2. 高维空间聚类算法分类

> Techniques for clustering high dimensional data have included both feature transformation and feature selection techniques. 

高维空间的聚类包括**feature transformation**和**feature selection**

> Feature selection methods select only the most relevant of the dimensions from a dataset to reveal groups of objects that are similar on only a subset of their attributes. 

> [!note]
>
> PCA属于feature transformation
>
> > 3.1 Motivation
> >
> > As we have discussed, using feature transformation techniques such as principle component analysis does not help in this instance, since relative distances are preserved and the effects of the irrelevant dimension remain.

## subspace cluster theory

> Subspace clustering is an extension of feature selection that attempts to find clusters in different subspaces of the same dataset

子空间聚类属于feature selection的拓展，并且需要a **search method** and **an evaluation criteria**

## 子空间聚类算法

### Bottom-Up Subspace Search Methods

> The bottom-up search method take advantage of the **downward closure property of density** to reduce the search space, using an APRIORI style approach. 

> Algorithms first create a histogram for each dimension and selecting those bins with densities above a given threshold. 

> [!note]
>
> 先为每个维度建立直方图，然后选择密度高于阈值的维度

==暂时无法理解这句话==

> The nature of the bottom-up approach leads to overlapping clusters, where one instance can be in zero or more clusters. 

#### CLIQUE

[8] R. Agrawal, J. Gehrke, D. Gunopulos, and P. Ragha-van. Automatic subspace clustering of high dimensional data for data mining applications. In Proceedings of the1998 ACM SIGMOD international conference on Management of data, pages 94–105. ACM Press, 1998.

> the algorithm combines **density** and **grid based clustering** and uses **an APRIORI style technique** to find clusterable subspaces. 

#### ENCLUS

[17] C.-H. Cheng, A. W. Fu, and Y. Zhang. Entropy-based subspace clustering for mining numerical data. In Pro-
ceedings of the fifth ACM SIGKDD international conference on Knowledge discovery and data mining, pages 84–93. ACM Press, 1999.

> ENCLUS does not measure density or coverage directly, but instead measures **entropy.**

## 相关Paper

- Subspace Clustering for High Dimensional Data: A Review

