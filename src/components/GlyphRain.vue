<template>
  <!-- GlyphRain: Canvas-based animated glyph background. -->
  <canvas ref="canvas" class="glyph-rain" aria-hidden="true" />
</template>

<script>
const GLYPHS = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789Z*+-<>¦=:. '

export default {
  name: 'GlyphRain',
  data() {
    return {
      animationFrame: null,
      columns: [],
      pointer: { x: -1000, y: -1000 },
      lastFrame: 0,
      reducedMotion: false,
    }
  },
  mounted() {
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    this.resize()
    window.addEventListener('resize', this.resize)
    window.addEventListener('pointermove', this.movePointer)

    if (this.reducedMotion) {
      this.draw(0)
    } else {
      this.animationFrame = requestAnimationFrame(this.animate)
    }
  },
  beforeDestroy() {
    cancelAnimationFrame(this.animationFrame)
    window.removeEventListener('resize', this.resize)
    window.removeEventListener('pointermove', this.movePointer)
  },
  methods: {
    resize() {
      const canvas = this.$refs.canvas
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * ratio
      canvas.height = window.innerHeight * ratio
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      const cell = this.cellSize()
      const count = Math.ceil(window.innerWidth / cell) + 1
      this.columns = Array.from({ length: count }, (_, index) => ({
        x: index * cell,
        y: Math.random() * window.innerHeight - window.innerHeight,
        speed: 38 + Math.random() * 74,
        length: 7 + Math.floor(Math.random() * 20),
        phase: Math.random() * 100,
      }))
      this.draw(0)
    },
    cellSize() {
      return Math.max(15, Math.min(22, Math.round(window.innerWidth / 65)))
    },
    movePointer(event) {
      this.pointer.x = event.clientX
      this.pointer.y = event.clientY
    },
    animate(time) {
      const elapsed = Math.min((time - this.lastFrame) / 1000 || 0, 0.05)
      this.lastFrame = time
      this.draw(elapsed)
      this.animationFrame = requestAnimationFrame(this.animate)
    },
    draw(elapsed) {
      const canvas = this.$refs.canvas
      const context = canvas.getContext('2d')
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      const width = canvas.width / ratio
      const height = canvas.height / ratio
      const cell = this.cellSize()

      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      context.clearRect(0, 0, width, height)
      context.font = `600 ${cell}px ui-monospace, SFMono-Regular, Menlo, monospace`
      context.textAlign = 'center'
      context.textBaseline = 'middle'

      this.columns.forEach((column) => {
        const distance = Math.abs(this.pointer.x - column.x)
        const stirred = Math.max(0, 1 - distance / 240)
        const speed = column.speed * (1 + stirred * 1.4)
        column.y += speed * elapsed
        if (column.y - column.length * cell > height) {
          column.y = -Math.random() * height * 0.35 - cell
          column.length = 7 + Math.floor(Math.random() * 20)
        }

        for (let trailIndex = 0; trailIndex < column.length; trailIndex += 1) {
          const y = column.y - trailIndex * cell
          if (y < -cell || y > height + cell) continue
          const isHead = trailIndex === 0
          const alpha = isHead ? 0.95 : Math.max(0.025, 0.3 * (1 - trailIndex / column.length))
          const glow = isHead ? 14 + stirred * 18 : 0
          context.shadowBlur = glow
          context.shadowColor = 'rgba(68, 153, 255, 0.9)'
          context.fillStyle = isHead
            ? `rgba(216, 238, 255, ${alpha})`
            : `rgba(68, 153, 255, ${alpha})`
          const glyphProgress = Math.floor(column.phase + trailIndex * 13 + column.y / cell)
          const glyphIndex = ((glyphProgress % GLYPHS.length) + GLYPHS.length) % GLYPHS.length
          context.fillText(GLYPHS[glyphIndex], column.x + cell / 2, y)
        }
      })
      context.shadowBlur = 0
    },
  },
}
</script>
