---
date: 2025-05-04
title: Paper-IGP Efficient Multi-Vector Retrieval via Proximity Graph Index
category: paper
tags:
- paper
- vector_set_search
description: 论文-使用概率邻近图的多向量检索
---

# Paper Information

Title: IGP Efficient Multi-Vector Retrieval via Proximity Graph Index

Author: Bian Zheng*, Man Lung Yiu, **Bo Tang**.

Publication: SIGIR 2025

Resources: None

# Personal Notes

> The existing methods for MVR (e.g., PLAID [ 41], DESSERT [ 8], EMVB [ 32 ], and MUVERA [ 13 ]) adopt the filter-and-refine frame-work as follows:
>
> (1) Candidate generation: exploit the index (or precomputed information) to compute a set of candidate documents, <br>
> (2) Candidate refinement: compute the exact score of each candidate, then return the top-𝑘 among candidates

之前的多向量检索方法需要大量的候选项以确保召回率，导致检索效率低下。本文提出了一种新的方法，IGP（Index Graph Proximity），通过构建概率邻近图来高效地进行多向量检索。

本文发现大部分的结果项集中在最近的5-10个聚类中

![image-20250619142658556](https://raw.githubusercontent.com/ee-wizard/ee-wizard/res/images/20250619142700505.png)

**incremental greedy probe**

<img src="https://raw.githubusercontent.com/ee-wizard/ee-wizard/res/images/20250619142904947.png" alt="image-20250619142903395" style="zoom:67%;" />

1. 是否可以看做，对于查询向量集合中的每一条向量，在数据湖中search topk个document。对于每个document，在filter阶段只计算一次

# References

[Bo Tang's Publications](https://acm.sustech.edu.cn/btang/pub.html)

[Github Repository](https://github.com/DBGroup-SUSTech/multi-vector-retrieval)

[‪Bo Tang‬ - ‪Google 学术搜索‬](https://scholar.google.com/citations?hl=zh-CN&user=og0Jsq4AAAAJ&view_op=list_works&sortby=pubdate)

[SIGIR 2025 Accepted Paper list](https://sigir2025.dei.unipd.it/accepted-papers.html)
