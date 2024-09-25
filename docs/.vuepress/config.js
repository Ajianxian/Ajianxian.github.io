import { defineUserConfig } from 'vuepress/cli'
import { viteBundler } from '@vuepress/bundler-vite'
import { plumeTheme } from 'vuepress-theme-plume'

export default defineUserConfig({
  lang: 'zh-CN',

  title: 'Ajianxian的个人博客',

  head: [['link', { rel: 'icon', href: '/images/hero.png' }]],
  theme: plumeTheme({
    profile: {
      name: 'Ajianxian',
      description: '『想要+做到=得到』',
      avatar: '/images/hero.png', // 头像路径
    },
    navbar: [
      {
        text: '博客',
        link: '/blog/',
      },
      {
        text: '随笔',
        link: '/essays',
      },
      {
        text: '归档',
        link: '/blog/archives/',
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
        items: [
          { text: '作者', link: '/about' },
          { text: 'Github', link: 'https://github.com/Ajianxian' },
          { text: '掘金', link: 'https://juejin.cn/user/4432878729435085' }
        ]
      }
    ],
    editLinkText: '在 GitHub 上编辑此页',
    footer: { copyright: 'MIT Licensed | Copyright © 2024 Ajianxian - All Rights Reserved' },
    externalLinkIcon: false
  }),
  bundler: viteBundler(),
})
