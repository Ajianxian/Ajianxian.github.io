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
    navbar: [
      {
        text: '指南',
        link: '/guide',
      },
      {
        text: '随笔',
        link: '/essays',
      },
      {
        text: '归档',
        link: '/archived',
      },
      {
        text: 'IDEA',
        link: '/idea',
      },
      {
        text: '技能',
        link: '/skills',
      },
      {
        text: '关于',
        children: [
          { text: '作者', link: '/about' },
          { text: 'Github', link: 'https://github.com/Ajianxian/Ajianxian.github.io' },
          { text: '掘金', link: 'https://juejin.cn/user/4432878729435085' }
        ]
      }
    ]
  }),
  bundler: viteBundler(),
})
