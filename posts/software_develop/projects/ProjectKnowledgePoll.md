---
date: 2025-05-02
title: 团队知识库SPS开发
category: project
tags:
- project
description: 谨以此纪录SPS项目的诞生
---

# Environments

- Tauri2.0
  - Vue3, Pinia,
- Spring Web / Node



# 开发计划

```mermaid
graph TD
    A[(σ_SALARY<3000)] --> B[EMPLOYEE]
    C[(π_ENAME, ESSN#, SALARY)] --> D[EMPLOYEE]
    E[(σ_PNO#='P1')] --> F[PROJECT]
    G[WORKS_ON] --> H[PROJECT]
    I[JOIN] --> B
    I --> H
    J[JOIN] --> D
    J --> I
```



