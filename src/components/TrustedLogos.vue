<template>
  <!-- TrustedLogos: Replace image files in ./images to customise this logo strip. -->
  <section class="trusted-logos" aria-labelledby="trusted-logos-title">
    <h2 id="trusted-logos-title">Who I work with:</h2>
    <ul>
      <li v-for="logo in logos" :key="logo.name">
        <img :src="logo.source" :alt="logo.name" />
      </li>
    </ul>
  </section>
</template>

<script>
import logoOne from './images/logo-1.svg'
import logoTwo from './images/logo-2.svg'
import logoThree from './images/logo-3.svg'
import logoFour from './images/logo-4.svg'

export default {
  name: 'TrustedLogos',
  data() {
    return {
      // Change the image filenames here after adding your own image files to ./images.
      logos: [
        { name: 'Logo one', source: logoOne },
        { name: 'Logo two', source: logoTwo },
        { name: 'Logo three', source: logoThree },
        { name: 'Logo four', source: logoFour },
      ],
    }
  },
}
</script>

<style>
.trusted-logos { margin-top: 3.5rem; padding: 2.5rem 1rem; border-radius: 18px; background: rgba(241, 241, 244, .92); color: #341539; }.trusted-logos h2 { margin: 0; font-size: .78rem; font-weight: 800; letter-spacing: .11em; text-align: center; text-transform: uppercase; }.trusted-logos ul { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; padding: 0; margin: 1.75rem 0 0; list-style: none; }.trusted-logos li { display: grid; place-items: center; min-width: 150px; padding: .75rem 2.25rem; }.trusted-logos li + li { border-left: 1px solid rgba(52, 21, 57, .18); }.trusted-logos img { display: block; width: 112px; max-height: 48px; object-fit: contain; }@media (max-width: 680px) { .trusted-logos li + li { border-left: 0; }.trusted-logos li { min-width: 130px; padding: .75rem 1.25rem; } }
</style>
