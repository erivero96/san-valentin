
<template>
  <section class="intro">
    <h1>Hola Adri</h1>
    <p>Desliza un poco…</p>
  </section>

  <section class="scroll-space">
    <p>↓</p>
  </section>

  <LoveLetter />
</template>

<style scoped>
  .intro {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: Georgia, serif;
  }

  .scroll-space {
    height: 60vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    opacity: 0.4;
  }
</style>

<script setup lang="ts">
  import LoveLetter from '@/components/LoveLetter.vue'
</script>
