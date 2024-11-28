import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'
import { plumeTheme } from 'vuepress-theme-plume'

export default defineUserConfig({
  base: '/',
  lang: 'zh-CN',
  title: 'Ajianxian的个人博客',
  description: '',

  bundler: viteBundler({
    viteOptions: {
      build: {
        rollupOptions: {
          output: {
            // 定义输出文件的命名规则
            assetFileNames: (assetInfo: any) => {
              // 如果文件是字体文件，则将其输出到 fonts 目录下
              if (assetInfo.name.endsWith('.ttf') || assetInfo.name.endsWith('.woff') || assetInfo.name.endsWith('.woff2')) {
                return 'fonts/[name][extname]';
              }
              // 其他文件按照默认规则输出
              return 'assets/[name][extname]';
            }
          }
        }
      }
    },
    vuePluginOptions: {},
  }),

  theme: plumeTheme({
    // 添加您的部署域名
    // hostname: 'https://your_site_url',

    profile: {
      name: 'Ajianxian',
      description: '『想要+做到=得到』',
      avatar: '/images/hero.png', // 头像路径
    },
    plugins: {
      /**
       * Shiki 代码高亮
       * @see https://theme-plume.vuejs.press/config/plugins/code-highlight/
       */
      // shiki: {
           // 强烈建议预设代码块高亮语言，插件默认加载所有语言会产生不必要的时间开销
      //   languages: ['shell', 'bash', 'typescript', 'javascript'],
      // },

      /**
       * markdown enhance
       * @see https://theme-plume.vuejs.press/config/plugins/markdown-enhance/
       */
      markdownEnhance: {
        demo: true,
      //   include: true,
      //   chart: true,
      //   echarts: true,
      //   mermaid: true,
      //   flowchart: true,
      },

      /**
       *  markdown power
       * @see https://theme-plume.vuejs.press/config/plugin/markdown-power/
       */
      // markdownPower: {
      //   pdf: true,
      //   caniuse: true,
      //   plot: true,
      //   bilibili: true,
      //   youtube: true,
      //   icons: true,
      //   codepen: true,
      //   replit: true,
      //   codeSandbox: true,
      //   jsfiddle: true,
      //   repl: {
      //     go: true,
      //     rust: true,
      //     kotlin: true,
      //   },
      // },

      /**
       * 评论 comments
       * @see https://theme-plume.vuejs.press/guide/features/comments/
       */
      // comment: {
      //   provider: '', // "Artalk" | "Giscus" | "Twikoo" | "Waline"
      //   comment: true,
      //   repo: '',
      //   repoId: '',
      //   categoryId: '',
      //   mapping: 'pathname',
      //   reactionsEnabled: true,
      //   inputPosition: 'top',
      // },
    },
    editLinkText: '在 GitHub 上编辑此页',
    footer: { copyright: 'MIT Licensed | Copyright © 2024 Ajianxian - All Rights Reserved' },
  }),
})
