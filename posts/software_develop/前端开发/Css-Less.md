---
date: 2025-05-16
title: 关于Less的学习
category: 前端
tags:
- 前端
- css
description: md我怎么会学前端啊
---

## Vite项目中引入Less

[Vite对与css-pre-processors的支持](https://vite.dev/guide/features.html#css-pre-processors)

```shell
npm install less less-loader
```

### Global Vars

```less
// test.less
@blue:#1CC0FF;
```

我们在其他文件使用这个变量，必须引入这个文件才可以

```less
<style scoped lang="less">
@import "./test.less";
.wrap{
  line-height: 1080 / 108vh;
  height: 1080 / 108vh;
  background: red;
  color: @blue;
}
</style>
```

如果这个变量的使用非常频繁，频繁引入会让人崩溃。less的globalVars配置项则可以完美解决这个问题。

配置如下：

```javascript
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    // 预处理器配置项
    preprocessorOptions: {
      less: {
        math: "always",
        globalVars:{
          blue:"#1CC0FF"
        }
      },
    },
  },
});
```

此时，我们可以全局使用这个参数了

```less
<style scoped lang="less">
.wrap{
  line-height: 1080 / 108vh;
  height: 1080 / 108vh;
  background: red;
  color: @blue;
}
</style>
```



