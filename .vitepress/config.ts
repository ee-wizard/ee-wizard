import { defineConfig } from 'vitepress'
import { getPosts } from './theme/serverUtils'

//每页的文章数量
const pageSize = 10

const isProd = process.env.NODE_ENV === 'production'

export default defineConfig({
    title: 'Wizard Blog',
    base: '/ee-wizard/',
    cacheDir: './node_modules/vitepress_cache',
    description: 'vitepress,blog,blog-theme',
    ignoreDeadLinks: true,
    markdown: {
        math: true,
    },
    themeConfig: {
        posts: await getPosts(pageSize),
        website: 'https://github.com/airene/vitepress-blog-pure', //copyright link
        // 评论的仓库地址 https://giscus.app/ 请按照这个官方初始化后覆盖
        comment: {
            repo: 'ee-wizard/ee-wizard',
            repoId: 'R_kgDOOi5LPw',
            categoryId: 'DIC_kwDOOi5LP84Cpr06'
        },
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Category', link: '/pages/category' },
            { text: 'Archives', link: '/pages/archives' },
            { text: 'Tags', link: '/pages/tags' },
            { text: 'About', link: '/pages/about' }
            // { text: 'Airene', link: 'http://airene.net' }  -- External link test
        ],
        search: {
            provider: 'local'
        },
        outline: {
            label: '文章大纲',
            level: [1, 2, 3] // 文章大纲的标题级别
        },
        socialLinks: [{ icon: 'github', link: 'https://github.com/Wizard-NJUPT' }],
    } as any,

    srcExclude: isProd
        ? [
            '**/trash/**/*.md', // 排除所有 trash 目录
            '**/draft/**/*.md', // 递归排除子目录
            '**/private-notes/*.md', // 排除特定文件
            '**/private/*.md',
            'README.md'
        ]
        : ['README.md'],
    vite: {
        //build: { minify: false }
        server: { port: 5000 }
    }
    /*
      optimizeDeps: {
          keepNames: true
      }
      */

})
