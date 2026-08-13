import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'

// This repository is your account Pages site, so it is served from the domain root.
// For a project Pages site, change this to '/repository-name/'.
export default defineConfig({
  base: '/',
  plugins: [vue()],
})
