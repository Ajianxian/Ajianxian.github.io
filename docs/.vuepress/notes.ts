import { defineNoteConfig, defineNotesConfig } from 'vuepress-theme-plume'

const demoNote = defineNoteConfig({
  dir: 'demo',
  link: '/demo',
  sidebar: ['', 'foo', 'bar', 'markdown'],
})
// 随笔
const essaysNote = defineNoteConfig({
  dir: 'essays',
  link: '/essays',
  sidebar: ['', 'foo', 'bar', 'markdown'],
})

export const notes = defineNotesConfig({
  dir: 'notes',
  link: '/',
  notes: [demoNote, essaysNote],
})
