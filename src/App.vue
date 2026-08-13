<template>
  <main class="hello-world">
    <GlyphRain />
    <section class="content" aria-labelledby="page-title">
      <h1 id="page-title">Hello world</h1>
      <article class="readme" aria-live="polite">
        <p v-if="isLoading">Loading profile…</p>
        <div v-else-if="readmeHtml" v-html="readmeHtml" />
        <p v-else>
          I couldn’t load the profile right now.
          <a :href="readmeUrl" target="_blank" rel="noreferrer">Read it on GitHub</a>.
        </p>
      </article>
    </section>
  </main>
</template>

<script>
import DOMPurify from 'dompurify'
import { marked } from 'marked'
import GlyphRain from './components/GlyphRain.vue'

export default {
  components: { GlyphRain },
  data() {
    return {
      isLoading: true,
      readmeHtml: '',
      readmeUrl: 'https://github.com/Jcraft153/Jcraft153/blob/main/README.md',
    }
  },
  async mounted() {
    try {
      const response = await fetch('https://raw.githubusercontent.com/Jcraft153/Jcraft153/main/README.md')
      if (!response.ok) throw new Error(`GitHub returned ${response.status}`)
      const markdown = await response.text()
      this.readmeHtml = DOMPurify.sanitize(marked.parse(markdown))
    } catch (error) {
      console.warn('Unable to load GitHub profile README.', error)
    } finally {
      this.isLoading = false
    }
  },
}
</script>
