---
title: Paper-Reducing the Footprint of Multi-Vector Retrieval with Minimal Performance Impact via Token Pooling
date: 2025-05-03
tags:
- paper
description: 论文-基于聚类的Token Pooling
---

# Paper Infomation

Title: Reducing the Footprint of Multi-Vector Retrieval with Minimal Performance Impact via Token Pooling

Author: Benjamin Clavié， Antoine Chaffin， Griffin Adams

Resources: [Arxiv](https://arxiv.org/abs/2409.14683#:~:text=In this paper%2C we introduce a simple clustering-based,number of vectors that need to be stored.)



# Personal Notes

**Motivation**

> [2] Daniel Bolya, Cheng-Yang Fu, Xiaoliang Dai, Peizhao Zhang, Christoph  Feichtenhofer, and Judy Hoffman. 2022. Token merging: Your vit but  faster. arXiv preprint arXiv:2210.09461 (2022).

这是CV领域的一篇文章， averaging the representation of multiple tokens into a single vector.

**Token Pooling**

引入pooling factor (pf)

- Baseline: 对于所有token按顺序排列，每pf个token聚在一起

> inspired by the common intuition that the individual meaning of words is greatly influenced by its direct neighbours
>
> 受到普遍直觉的启发，即单词的个别含义在很大程度上受到其直接邻居的影响
> > [!note]
> >
> > 说实话有点抽象
>

- K-Means based pooling

cluster count = token count / pf + 1

- Hierarchical clustering based pooling

> This method uses hierarchical clustering [21], again based on the cosine distance between vectors. We use Ward’s method [31] to produce our clusters, which intuitively would be well-suited for this task, as it would seek to minimize the distance between the original vector and the pooled outputs. Additionally, it has generally been observed to perform well for text data [12, 25].

> [!note]
>
> 选择分层聚类的原因是它会最小化原始向量和池化向量的距离(Loss?)
>
> [31] Joe H Ward Jr. 1963. Hierarchical grouping to optimize an  objective function. Journal of the American statistical association 58,  301 (1963), 236–244.
>
> [25] Niyaz M Salih and Karwan Jacksi. 2020. Semantic Document  Clustering using K-means algorithm and Ward’s Method. In 2020  International Conference on Advanced Science and Engineering (ICOASE).  IEEE, 1–6.

## 实验

使用ColBertv2模型，English MS-Marco模型

所有的聚类算法基于现有库，使用Scipy进行分成聚类，pytorch-based kmeans

搜索索引采样PLAID+2-bit量化，HNSW

未量化的实验结果

<img src="https://raw.githubusercontent.com/ee-wizard/ee-wizard/res/images/20250503113756964.png" alt="Unquantized Results" style="zoom: 50%;" />

<img src="https://raw.githubusercontent.com/ee-wizard/ee-wizard/res/images/20250503114204656.png" alt="image-20250503114203003" style="zoom: 80%;" />

量化后的结果

<img src="https://raw.githubusercontent.com/ee-wizard/ee-wizard/res/images/20250503114108388.png" alt="image-20250503114102252" style="zoom: 80%;" />

<img src="https://raw.githubusercontent.com/ee-wizard/ee-wizard/res/images/20250503114241970.png" alt="image-20250503114239764" style="zoom: 67%;" />

# Related Papers

> [15] Jinhyuk Lee, Zhuyun Dai, Sai Meher Karthik Duddu, Tao Lei, Iftekhar  Naim, Ming-Wei Chang, and Vincent Zhao. 2024. Rethinking the role of  token retrieval in multi-vector retrieval. Advances in Neural  Information Processing Systems 36 (2024).
>
> Token Merge
>
> [2] Daniel Bolya, Cheng-Yang Fu, Xiaoliang Dai, Peizhao Zhang, Christoph  Feichtenhofer, and Judy Hoffman. 2022. Token merging: Your vit but  faster. arXiv preprint arXiv:2210.09461 (2022).