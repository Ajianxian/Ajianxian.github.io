import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress/cli'
import { viteBundler } from '@vuepress/bundler-vite'
import { plumeTheme } from 'vuepress-theme-plume'

export default defineUserConfig({
  lang: 'zh-CN',

  title: 'Ajianxian',
  description: '『想要+做到=得到』',

  head: [['link', { rel: 'icon', href: '/images/hero.png' }]],
  theme: defaultTheme({
    logo: '/images/hero.png',
    theme: plumeTheme({
      notes: {
        dir: '/notes/', // 声明所有笔记的目录
        link: '/', // 声明所有笔记默认的链接前缀， 默认为 '/'
        notes: [
          {
            dir: '1.前端', // 声明笔记的目录，相对于 `notes.dir`
            link: '/1.前端/', // 声明笔记的链接前缀
            sidebar: [ // 配置侧边栏
              {
                text: '网页',
                icon: 'mdi:language-typescript', // 侧边栏图标
                items: ['1.网页'] // 简化写法，主题会自动补全为 `foo.md`
              }
            ]
          },
          {
            dir: '2.后端',
            link: '/2.后端/',
            sidebar: [
              { text: '后端', items: ['2.后端'] }
            ]
          }
        ]
      }
    }),
    navbar: [
      {
        text: '指南',
        link: '/',
      },
      {
        text: '博客地址',
        // link: '/get-started',
        // prefix: '',
        children: [
          { text: 'Github', link: 'https://github.com/Ajianxian/Ajianxian.github.io' },
          { text: '掘金', link: 'https://juejin.cn/user/4432878729435085' }
        ]
      }
    ]
  }),
  bundler: viteBundler(),
})
