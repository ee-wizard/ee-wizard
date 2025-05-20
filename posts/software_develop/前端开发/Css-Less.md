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

![Cover Image of moz-extension://59e5538d-fc46-4dd2-807e-bb4b0f948b44/viewer.html?file=https%3A%2F%2Fcsdl-downloads.ieeecomputer.org%2Fproceedings%2Ficde%2F2025%2F3603%2F00%2F360300d043.pdf%3FExpires%3D1747704017%26Policy%3DeyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9jc2RsLWRvd25sb2Fkcy5pZWVlY29tcHV0ZXIub3JnL3Byb2NlZWRpbmdzL2ljZGUvMjAyNS8zNjAzLzAwLzM2MDMwMGQwNDMucGRmIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzQ3NzA0MDE3fX19XX0_%26Signature%3DgR2i1OprvXAUtdZvaMINDvtsS54NeLqKEUP7BAFad4OK3AcU1uhBoKnQhCLULqhyRCP0StnMp6NDofzJyCVKJG7cB0sbd7ezuQoW4mpxqo40Pvf3NTD1Dnwbh-TIq8F59F1THRUA8mE~6DifYKzoOGQIonR-4CkffjhD4gX3rYr~pfubnNmFDLOKKqWGSAubrLQPWZRGllUp8wJnVEXjpSYa8LGDIw3mH1uswDutzt4Iv1Qv397W1PTpbu8c~N-MJKl-rPVYY4~7wusDJBpZagu65vxOz8oKQktKh3jzTfZ2XYPy6N-dgVvK9YdGkjjfbH6sXtVzV-wY5tT6YvWs5Q__%26Key-Pair-Id%3DK12PMWTCQBDMDT](https://web-highlights.com/images/fallback-image.png?auto=format&w=600&fm=auto)

# Timestamp Approximate Nearest Neighbor Search over High-Dimensional Vector Data - 360300d043.pdf

🌐 moz-extension://59e5538d-fc46-4dd2-807e-bb4b0f948b44/viewer.html?file=https%3A%2F%2Fcsdl-downloads.ieeecomputer.org%2Fproceedings%2Ficde%2F2025%2F3603%2F00%2F360300d043.pdf%3FExpires%3D1747704017%26Policy%3DeyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9jc2RsLWRvd25sb2Fkcy5pZWVlY29tcHV0ZXIub3JnL3Byb2NlZWRpbmdzL2ljZGUvMjAyNS8zNjAzLzAwLzM2MDMwMGQwNDMucGRmIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzQ3NzA0MDE3fX19XX0_%26Signature%3DgR2i1OprvXAUtdZvaMINDvtsS54NeLqKEUP7BAFad4OK3AcU1uhBoKnQhCLULqhyRCP0StnMp6NDofzJyCVKJG7cB0sbd7ezuQoW4mpxqo40Pvf3NTD1Dnwbh-TIq8F59F1THRUA8mE~6DifYKzoOGQIonR-4CkffjhD4gX3rYr~pfubnNmFDLOKKqWGSAubrLQPWZRGllUp8wJnVEXjpSYa8LGDIw3mH1uswDutzt4Iv1Qv397W1PTpbu8c~N-MJKl-rPVYY4~7wusDJBpZagu65vxOz8oKQktKh3jzTfZ2XYPy6N-dgVvK9YdGkjjfbH6sXtVzV-wY5tT6YvWs5Q__%26Key-Pair-Id%3DK12PMWTCQBDMDT
🔗 https://app.web-highlights.com/page/682bd9345d3cfce924fb271b

**Tags**: -

**Highlights & Notes**

> However, they are unfit for
> TANNS because they implicitly assume attributes with pre-
> determined values, whereas the expiration timestamp of a
> vector is typically unknown when it is added to the database.

