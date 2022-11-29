import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Markdown from '@pity/vite-plugin-react-markdown'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), 
    Markdown({
      // default options passed to markdown-it
      // see: https://markdown-it.github.io/markdown-it/
      markdownItOptions: {
        html: true,
        linkify: true,
        typographer: true,
      },
      // A function providing the Markdown It instance gets the ability to apply custom settings/plugins
      
      // Class names for the wrapper div
      wrapperClasses: 'markdown-body'
    })
  ]
})

