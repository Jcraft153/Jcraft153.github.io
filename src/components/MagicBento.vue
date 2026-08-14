<template>
  <!-- MagicBento: Interactive card grid with spotlight and tilt effects. -->
  <section class="magic-bento" aria-label="Profile overview">
    <article class="bento-card bento-card--repositories" @mousemove="tiltCard" @mouseleave="resetCard">
      <p class="bento-label">My public repos:</p>
      <p v-if="repositoriesLoading">Loading repositories…</p>
      <ul v-else-if="repositories.length" class="repository-list">
        <!-- Repository description popover: opens on hover and keyboard focus. -->
        <li
          v-for="repository in repositories"
          :key="repository.id"
          class="repository-item"
          @mouseenter="showRepositoryPopover(repository, $event)"
          @mouseleave="hideRepositoryPopover"
        >
          <a
            :href="repository.url"
            target="_blank"
            rel="noreferrer"
            :aria-describedby="repository.description ? `repository-tooltip-${repository.id}` : null"
            @focus="showRepositoryPopover(repository, $event)"
            @blur="hideRepositoryPopover"
          >
            {{ repository.name }} <span aria-hidden="true">↗</span>
          </a>
        </li>
      </ul>
      <p v-else>Repositories are currently unavailable.</p>
    </article>

    <article class="bento-card bento-card--readme" @mousemove="tiltCard" @mouseleave="resetCard">
      <p class="bento-label">About me:</p>
      <slot />
    </article>

    <a class="bento-card bento-card--link" href="https://github.com/Jcraft153" target="_blank" rel="noreferrer" @mousemove="tiltCard" @mouseleave="resetCard">
      <span class="bento-label">Explore:</span>
      <strong>Visit my GitHub <span aria-hidden="true">↗</span></strong>
    </a>

    <!-- Repository description popover: a top-level layer so bento-card clipping cannot cut it off. -->
    <span
      v-if="activeRepository && activeRepository.description"
      :id="`repository-tooltip-${activeRepository.id}`"
      class="repository-popover"
      :style="repositoryPopoverStyle"
      role="tooltip"
    >{{ activeRepository.description }}</span>
  </section>
</template>

<script>
export default {
  name: 'MagicBento',
  props: {
    repositories: { type: Array, default: () => [] },
    repositoriesLoading: { type: Boolean, default: false },
  },
  data() {
    return {
      motionReduced: false,
      activeRepository: null,
      repositoryPopoverStyle: {},
    }
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
    showRepositoryPopover(repository, event) {
      if (!repository.description) return
      const rect = event.currentTarget.getBoundingClientRect()
      const popoverWidth = 280
      this.activeRepository = repository
      this.repositoryPopoverStyle = {
        left: `${Math.max(12, Math.min(rect.left, window.innerWidth - popoverWidth - 12))}px`,
        top: `${rect.bottom + 8}px`,
      }
    },
    hideRepositoryPopover() {
      this.activeRepository = null
    },
  },
}
</script>

<style>
.magic-bento { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; }.bento-card { --glow-x: 50%; --glow-y: 50%; position: relative; min-width: 0; min-height: 180px; padding: 1.5rem; overflow: hidden; border: 1px solid rgba(235, 231, 239, .38); border-radius: 18px; background: rgba(112, 45, 123, .9); box-shadow: 0 14px 45px rgba(24, 5, 42, .34); color: #f0eff3; transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease; transform-style: preserve-3d; }.bento-card::before { position: absolute; inset: -1px; content: ''; pointer-events: none; background: radial-gradient(280px circle at var(--glow-x) var(--glow-y), rgba(212, 163, 250, .32), transparent 62%); opacity: .9; }.bento-card:hover { border-color: rgba(249, 247, 251, .9); box-shadow: 0 18px 58px rgba(24, 5, 42, .5), 0 0 26px rgba(208, 143, 255, .35); }.bento-card > * { position: relative; }.bento-card--repositories { grid-column: span 1; }.bento-card--readme { grid-column: span 3; min-height: 280px; }.bento-card--link { display: flex; flex-direction: column; justify-content: space-between; grid-column: span 4; min-height: 110px; color: #f4f3f6; text-decoration: none; }.bento-card--link strong { font-size: clamp(1.45rem, 3vw, 2.1rem); }.bento-card h2 { margin: .35rem 0; font-size: 2rem; }.bento-card p { margin: 0; line-height: 1.6; }.bento-label { color: #dfc5f5; font-size: .75rem; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; }.repository-list { max-height: 230px; padding: 0; margin: 1rem 0 0; overflow-x: hidden; overflow-y: auto; list-style: none; }.repository-item { min-width: 0; }.repository-item + .repository-item { margin-top: .65rem; }.repository-list a { display: block; color: #f1ecf5; overflow-wrap: anywhere; text-decoration: none; }.repository-list a:hover { color: #dfc5f5; text-decoration: underline; }.repository-popover { position: fixed; z-index: 1000; width: 280px; max-width: calc(100vw - 24px); padding: .55rem .7rem; border: 1px solid rgba(235, 231, 239, .45); border-radius: 8px; background: #321338; box-shadow: 0 8px 24px rgba(24, 5, 42, .45); color: #f4f3f6; font-size: .82rem; line-height: 1.4; overflow-wrap: anywhere; pointer-events: none; }@media (max-width: 620px) { .magic-bento { grid-template-columns: 1fr; }.bento-card--repositories, .bento-card--readme, .bento-card--link { grid-column: span 1; }.bento-card--readme { min-height: 0; } }
</style>
