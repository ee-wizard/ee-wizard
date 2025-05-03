---
date: 2025-05-03
title: Paper-Efficient Constant-Space Multi-Vector Retrieval
category: paper
tags:
- paper
- vector_set_search
description: 论文-恒定大小的多向量检索。ECIR:2025
---

# Paper Information

Title: Efficient Constant-Space Multi-Vector Retrieval

Author: Sean MacAvaney, Antonio Mallia, and Nicola Tonellotto

Conference: [ECIR 2025]([47th EUROPEAN CONFERENCE ON INFORMATION RETRIEVAL – 47th EUROPEAN CONFERENCE ON INFORMATION RETRIEVAL](https://ecir2025.eu/))

Resources: [Arxiv](https://arxiv.org/abs/2504.01818)

# Personal Notes

**前置Paper**

ColBertV2，PLAID，

MUVERA，缺陷是需要存储近乎几十倍的高维向量

XTR，训练模型，选择优先级较高的token

**Contributions**

引入池化，固定向量集的大小

**Personal Conclusion**

关于Token Pooling的另一篇文章：Reducing the Footprint of Multi-Vector Retrieval with Minimal Performance Impact via Token Pooling(2024)

> Over the last few years, multi-vector retrieval methods, spearheaded by ColBERT, have become an increasingly popular approach to Neural IR. By storing representations at the token level rather than at the document level, these methods have demonstrated very strong retrieval performance, especially in out-of-domain settings. However, the storage and memory requirements necessary to store the large number of associated vectors remain an important drawback, hindering practical adoption. In this paper, we introduce a simple clustering-based token pooling approach to aggressively reduce the number of vectors that need to be stored. This method can reduce the space & memory footprint of ColBERT indexes by 50% with virtually no retrieval performance degradation. This method also allows for further reductions, reducing the vector count by 66%to-75% , with degradation remaining below 5% on a vast majority of datasets. Importantly, this approach requires no architectural change nor query-time processing, and can be used as a simple drop-in during indexation with any ColBERT-like model.

> [!NOTE]
>
> 在过去的几年里，以 ColBERT 为首的多向量检索方法已成为一种越来越流行的神经 IR 方法。通过在 token 级别而不是文档级别存储表示，这些方法已经展示了非常强大的检索性能，尤其是在域外设置中。然而，存储大量相关向量所需的存储和内存要求仍然是一个重要的缺点，阻碍了实际采用。在本文中，我们介绍了**一种简单的基于聚类的令牌池方法**，以积极减少需要存储的向量数量。这种方法可以将ColBERT索引的空间和内存占用减少50%，而检索性能几乎没有下降。此方法还允许进一步减少，将向量计数减少 66% 到 75% ，在绝大多数数据集上，降级保持在 5% 以下。重要的是，这种方法不需要架构更改或查询时处理，并且可以在索引期间使用任何类似 ColBERT 的模型用作简单的插入。

所以这篇论文似乎是使用模型训练代替了基于聚类的池化方法



# Related Papers

>ColBertv2
>
>[21] Keshav Santhanam, Omar Khattab, Jon Saad-Falcon, Christopher  Potts, and Matei Zaharia. Colbertv2: Effective and efficient retrieval  via lightweight late interaction. CoRR, abs/2112.01488, 2021.
>
>PLAID
>
>[22] Keshav Santhanam, Omar Khattab, Christopher Potts, and Matei  Zaharia. Plaid: an efficient engine for late interaction retrieval. In  Proceedings of the 31st ACM International Conference on Information  & Knowledge Management, pages 1747–1756, 2022.
>
>XTR
>
>[15] Jinhyuk Lee, Zhuyun Dai, Sai Meher Karthik Duddu, Tao Lei,  Iftekhar Naim, Ming-Wei Chang, and Vincent Zhao. Rethinking the role of  token retrieval in multi-vector retrieval. Advances in Neural  Information Processing Systems, 36, 2024.
>
>MUVERA
>
>[8] Laxman Dhulipala, Majid Hadian, Rajesh Jayaram, Jason Lee, and Vahab Mirrokni. Muvera: Multi-vector retrieval via fixed dimensional  encodings. arXiv preprint arXiv:2405.19504, 2024.
>
>Token Pooling
>
>[4] Benjamin Clavié, Antoine Chaffin, and Griffin Adams. Reducing the footprint of multi-vector retrieval with minimal performance impact via token pooling. arXiv preprint arXiv:2409.14683, 2024.