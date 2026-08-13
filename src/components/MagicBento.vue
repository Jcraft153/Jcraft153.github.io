<template>
  <!-- MagicBento: Interactive card grid with spotlight and tilt effects. -->
  <section class="magic-bento" aria-label="Profile overview">
    <article class="bento-card bento-card--intro" @mousemove="tiltCard" @mouseleave="resetCard">
      <p class="bento-label">GitHub profile</p>
      <h2>Jcraft153</h2>
      <p>A live snapshot of the profile README.</p>
    </article>

    <article class="bento-card bento-card--readme" @mousemove="tiltCard" @mouseleave="resetCard">
      <p class="bento-label">About</p>
      <slot />
    </article>

    <a class="bento-card bento-card--link" href="https://github.com/Jcraft153" target="_blank" rel="noreferrer" @mousemove="tiltCard" @mouseleave="resetCard">
      <span class="bento-label">Explore</span>
      <strong>Visit GitHub <span aria-hidden="true">↗</span></strong>
    </a>
  </section>
</template>

<script>
export default {
  name: 'MagicBento',
  data() {
    return { motionReduced: false }
  },
  mounted() {
    this.motionReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  },
  methods: {
    tiltCard(event) {
      if (this.motionReduced) return
      const card = event.currentTarget
      const rect = card.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width
      const y = (event.clientY - rect.top) / rect.height
      card.style.setProperty('--glow-x', `${x * 100}%`)
      card.style.setProperty('--glow-y', `${y * 100}%`)
      card.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 5}deg) rotateY(${(x - 0.5) * 5}deg) translateY(-3px)`
    },
    resetCard(event) {
      event.currentTarget.style.transform = ''
    },
  },
}
</script>

<style>
.magic-bento { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }.bento-card { --glow-x: 50%; --glow-y: 50%; position: relative; min-height: 180px; padding: 1.5rem; overflow: hidden; border: 1px solid rgba(148, 203, 255, .28); border-radius: 18px; background: rgba(5, 16, 29, .78); box-shadow: 0 14px 45px rgba(0, 0, 0, .25); color: #d9ebfb; transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease; transform-style: preserve-3d; }.bento-card::before { position: absolute; inset: -1px; content: ''; pointer-events: none; background: radial-gradient(280px circle at var(--glow-x) var(--glow-y), rgba(96, 184, 255, .24), transparent 62%); opacity: .9; }.bento-card:hover { border-color: rgba(178, 224, 255, .8); box-shadow: 0 18px 58px rgba(0, 0, 0, .42), 0 0 26px rgba(79, 166, 255, .2); }.bento-card > * { position: relative; }.bento-card--intro { grid-column: span 1; }.bento-card--readme { grid-column: span 3; min-height: 280px; }.bento-card--link { display: flex; flex-direction: column; justify-content: space-between; grid-column: span 4; min-height: 110px; color: #e9f6ff; text-decoration: none; }.bento-card--link strong { font-size: clamp(1.45rem, 3vw, 2.1rem); }.bento-card h2 { margin: .35rem 0; font-size: 2rem; }.bento-card p { margin: 0; line-height: 1.6; }.bento-label { color: #95cbff; font-size: .75rem; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; }@media (max-width: 620px) { .magic-bento { grid-template-columns: 1fr; }.bento-card--intro, .bento-card--readme, .bento-card--link { grid-column: span 1; }.bento-card--readme { min-height: 0; } }
</style>
