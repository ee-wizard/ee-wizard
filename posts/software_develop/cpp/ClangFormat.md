---
date: 2025-06-27
title: Clang-Format配置
category: cpp
tags:
- cpp
description: Clang-Format配置
---

.clang-format配置文件

```yaml
---
Language: Cpp
BasedOnStyle: LLVM
BraceWrapping:
  AfterClass: false
  AfterControlStatement: false
  AfterEnum: false
  AfterFunction: false
  AfterNamespace: false
  AfterStruct: false
  AfterUnion: false
  BeforeCatch: false
  BeforeElse: false
  IndentBraces: false
  SplitEmptyFunction: false
  SplitEmptyRecord: false
  SplitEmptyNamespace: false
BreakBeforeBraces: Attach
AllowShortIfStatementsOnASingleLine: true
AllowShortLoopsOnASingleLine: true
AllowShortFunctionsOnASingleLine: All
IndentWidth: 4
TabWidth: 4
UseTab: Never
ColumnLimit: 100
```

