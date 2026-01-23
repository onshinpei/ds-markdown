import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: <span>ds-markdown</span>,
  project: {
    link: 'https://github.com/onshinpei/ds-markdown',
  },
  chat: {
    link: 'https://github.com/onshinpei/ds-markdown',
  },
  docsRepositoryBase: 'https://github.com/onshinpei/ds-markdown/tree/main/nextra-docs',
  footer: {
    text: 'ds-markdown Documentation',
  },
  useNextSeoProps() {
    return {
      titleTemplate: '%s – ds-markdown'
    }
  },
  primaryHue: 220,
  primarySaturation: 100,
}

export default config

