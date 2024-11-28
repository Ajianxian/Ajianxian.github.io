import { defineThemeConfig } from 'vuepress-theme-plume'
import { navbar } from './navbar'
import { notes } from './notes'

/**
 * @see https://theme-plume.vuejs.press/config/basic/
 */
export default defineThemeConfig({
  logo: '/images/hero.png',
  // your git repo url
  docsRepo:'',
  // docsRepo: 'https://github.com/Ajianxian/Ajianxian.github.io/edit/docs/docs/XXX',
  docsDir: 'docs',

  appearance: true,

  profile: {
    avatar: '/images/hero.png',
    name: 'Ajianxian',
    description: '『想要+做到=得到』',
    circle: true,
    location: 'HangZhou',
    // organization: '',
  },

  navbar,
  notes,
  social: [
    { icon: 'github', link: 'https://github.com/Ajianxian' },
    { icon: 'juejin', link: 'https://juejin.cn/user/4432878729435085' },
  ],

})
