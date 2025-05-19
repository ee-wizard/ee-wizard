---
date: 2025-05-19
title: python中各种文件格式向cpp转换
category: cpp
tags:
- cpp
description: 最近想把项目迁移到cpp，折腾一下吧
---

## numpy2vector in cpp

借助开源库[cnpy](https://link.zhihu.com/?target=https%3A//github.com/rogersce/cnpy)可以完成利用c++读取python产生的npy文件里的数据。

```shell
git clone https://github.com/rogersce/cnpy.git
cd cnpy
mkdir build 
cd build
cmake .. 
make -j2
sudo make install
```

