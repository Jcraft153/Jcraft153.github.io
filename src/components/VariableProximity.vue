<template>
  <!-- VariableProximity: Makes each letter respond to the nearby pointer. -->
  <span class="variable-proximity" :aria-label="text">
    <span
      v-for="(letter, index) in letters"
      :key="`${letter}-${index}`"
      class="variable-proximity__letter"
      :style="letterStyle(index)"
      aria-hidden="true"
    >{{ letter === ' ' ? '\u00a0' : letter }}</span>
  </span>
</template>

<script>
export default {
  name: 'VariableProximity',
  props: {
    text: { type: String, required: true },
    radius: { type: Number, default: 140 },
  },
  data() {
    return {
      pointer: { x: -1000, y: -1000 },
      strengths: [],
      frame: null,
      motionReduced: false,
    }
  },
  computed: {
    letters() {
      return Array.from(this.text)
    },
  },
  mounted() {
    this.motionReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.addEventListener('pointermove', this.handlePointer)
  },
  beforeDestroy() {
    window.removeEventListener('pointermove', this.handlePointer)
    cancelAnimationFrame(this.frame)
  },
  methods: {
    handlePointer(event) {
      if (this.motionReduced) return
      this.pointer = { x: event.clientX, y: event.clientY }
      cancelAnimationFrame(this.frame)
      this.frame = requestAnimationFrame(this.updateStrengths)
    },
    updateStrengths() {
      const letterNodes = this.$el.querySelectorAll('.variable-proximity__letter')
      this.strengths = Array.from(letterNodes, (node) => {
        const rect = node.getBoundingClientRect()
        const distance = Math.hypot(this.pointer.x - (rect.left + rect.width / 2), this.pointer.y - (rect.top + rect.height / 2))
        return Math.max(0, 1 - distance / this.radius) ** 2
      })
    },
    letterStyle(index) {
      const strength = this.strengths[index] || 0
      return {
        fontVariationSettings: `'wght' ${400 + strength * 550}, 'wdth' ${100 + strength * 35}`,
        transform: `translateY(${-strength * 8}px) scale(${1 + strength * 0.08})`,
        textShadow: strength ? `0 0 ${12 + strength * 18}px rgba(145, 203, 255, ${strength * 0.9})` : 'none',
      }
    },
  },
}
</script>

<style>
.variable-proximity { display: inline-block; font-family: 'Roboto Flex', Arial, sans-serif; }
.variable-proximity__letter { display: inline-block; transition: transform 100ms linear, text-shadow 100ms linear, font-variation-settings 100ms linear; }
</style>
