---
date: 2025-05-18
title: 关于Cmake中Eigen3的配置
category: cpp
tags:
- cpp
- cmake
description: 关于Cmake中Eigen3的配置
---

## Config

```cmake
set(EIGEN3_INCLUDE_DIR "${CMAKE_SOURCE_DIR}/lib/eigen")
include_directories(${EIGEN3_INCLUDE_DIR})
message(STATUS "Using Eigen3 from: ${EIGEN3_INCLUDE_DIR}")
```



## Related

[GitLab: Eigen3,4](https://gitlab.com/libeigen/eigen/-/tree/3.4?ref_type=heads)

[Blog](https://blog.mangoeffect.net/eigen/use-eigen-in-cmake)