<script setup>
defineProps({
  title: { type: String, required: true },
  text: { type: String, required: true },
})
</script>

<template>
  <article class="card">
    <span class="card-mark" aria-hidden="true">↗</span>
    <h3>{{ title }}</h3>
    <p>{{ text }}</p>
    <a href="#about">Learn more <span aria-hidden="true">→</span></a>
  </article>
</template>
