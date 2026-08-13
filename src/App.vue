<script setup>
import { ref } from 'vue'
import SiteCard from './components/SiteCard.vue'

const isMenuOpen = ref(false)

const projects = [
  { title: 'Project one', text: 'Use this space to introduce something you are building.' },
  { title: 'Project two', text: 'Each card is a reusable Vue component with props.' },
  { title: 'Project three', text: 'Replace this starter content with your own work.' },
]
</script>

<template>
  <header class="site-header">
    <a class="brand" href="#top" aria-label="Home">JC</a>
    <button class="menu-button" type="button" :aria-expanded="isMenuOpen" aria-controls="navigation" @click="isMenuOpen = !isMenuOpen">
      Menu
    </button>
    <nav id="navigation" :class="{ open: isMenuOpen }" aria-label="Main navigation">
      <a href="#work" @click="isMenuOpen = false">Work</a>
      <a href="#about" @click="isMenuOpen = false">About</a>
      <a href="https://github.com/Jcraft153" target="_blank" rel="noreferrer">GitHub</a>
    </nav>
  </header>

  <main id="top">
    <section class="hero">
      <p class="eyebrow">Vue · GitHub Pages</p>
      <h1>Build a little, learn a lot.</h1>
      <p class="intro">A starter home for your projects, made with Vue components and ready to publish from GitHub.</p>
      <a class="button" href="#work">See my work</a>
    </section>

    <section id="work" class="section">
      <div class="section-heading">
        <p class="eyebrow">Selected work</p>
        <h2>Projects in progress</h2>
      </div>
      <div class="cards">
        <SiteCard v-for="project in projects" :key="project.title" v-bind="project" />
      </div>
    </section>

    <section id="about" class="section about">
      <p class="eyebrow">About this site</p>
      <h2>A low-pressure place to practise Vue.</h2>
      <p>Try changing the project data, create another component, or add a page as you learn. Push a change to GitHub and the site deploys automatically.</p>
    </section>
  </main>

  <footer>Built with Vue and hosted on GitHub Pages.</footer>
</template>
