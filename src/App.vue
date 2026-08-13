<template>
  <main class="hello-world">
    <!-- GlyphRain: animated canvas background. -->
    <GlyphRain />
    <section class="content" aria-labelledby="page-title">
      <!-- VariableProximity: pointer-responsive variable-font heading. -->
      <h1 id="page-title"><VariableProximity text="Hello world" /></h1>
      <!-- MagicBento: interactive card grid; the live README is its slot content. -->
      <MagicBento>
        <div class="readme" aria-live="polite">
        <p v-if="isLoading">Loading profile…</p>
        <div v-else-if="readmeHtml" v-html="readmeHtml" />
        <p v-else>
          I couldn’t load the profile right now.
          <a :href="readmeUrl" target="_blank" rel="noreferrer">Read it on GitHub</a>.
        </p>
        </div>
      </MagicBento>
    </section>
  </main>
</template>

<script>
import DOMPurify from 'dompurify'
import { marked } from 'marked'
// GlyphRain component: animated falling-glyph canvas background.
import GlyphRain from './components/GlyphRain.vue'
// MagicBento component: pointer-reactive profile card layout.
import MagicBento from './components/MagicBento.vue'
// VariableProximity component: letters react to pointer distance.
import VariableProximity from './components/VariableProximity.vue'

export default {
  components: { GlyphRain, MagicBento, VariableProximity },
  data() {
    return {
      isLoading: true,
      readmeHtml: '',
      readmeUrl: 'https://github.com/Jcraft153/Jcraft153/blob/main/README.md',
    }
  },
  async mounted() {
    // Dynamic GitHub README: copy this block to load and safely render another public README.
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
