<template>
    <Layout>
        <template #doc-before>
            <div style="padding-top:20px;" class='post-info' v-if="!$frontmatter.page">
                {{ $frontmatter.date?.substring(0, 10) }} &nbsp;&nbsp; <span v-for="item in $frontmatter.tags"><a
                        :href="withBase(`/pages/tags.html?tag=${item}`)"> {{ item }}</a></span>
            </div>
        </template>
        <template #doc-after>
            <div style="margin-top: 24px">
                <Giscus :key="page.filePath" repo="ee-wizard/ee-wizard" repo-id="R_kgDOOi5LPw" category="Announcements"
                    category-id="DIC_kwDOOi5LP84Cpr06" mapping="pathname" strict="0" reactions-enabled="1"
                    emit-metadata="1" input-position="top" lang="zh-CN" loading="lazy"
                    crossorigin="anonymous" :theme="isDark ? 'dark' : 'light'" async>
                </Giscus>
            </div>
        </template>
        <template #doc-bottom>
            <Comment />
        </template>
    </Layout>
    <Copyright />
</template>
<script setup>
import DefaultTheme from 'vitepress/theme'
import Copyright from './Copyright.vue'
import { withBase } from "vitepress";
import Giscus from "@giscus/vue";
const { Layout } = DefaultTheme
const { isDark, page } = useData();
import { inBrowser, useData } from "vitepress";
import { watch } from "vue";

watch(isDark, (dark) => {
    if (!inBrowser) return;

    const iframe = document
        .querySelector("giscus-widget")
        ?.shadowRoot?.querySelector("iframe");

    iframe?.contentWindow?.postMessage(
        { giscus: { setConfig: { theme: dark ? "dark" : "light" } } },
        "https://giscus.app"
    );
});
</script>
