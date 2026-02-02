
<template>
  <section class="intro">
    <h1>Hola Adri</h1>
    <p>Desliza un poco…</p>
  </section>

  <section class="scroll-space">
    <p>↓</p>
    
    <!-- STICKERS CONTAINER -->
    <div class="stickers-container">
      <img 
        v-for="sticker in displayedStickers" 
        :key="sticker.id"
        :src="sticker.url" 
        class="sticker"
        :style="sticker.style"
      />
    </div>
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
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    position: relative; /* Contexto para stickers */
  }

  .scroll-space p {
    opacity: 0.4;
  }

  .stickers-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
  }

  .sticker {
    position: absolute;
    width: 80px; 
    height: auto;
    opacity: 1 !important; /* Force visibility overrides parent opacity if needed, though parent opacity affects children */
    filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.2));
  }
  
  /* Reset opacity for stickers since parent .scroll-space has 0.4 */
  .scroll-space > .stickers-container {
    opacity: 1;
  }

</style>

<script setup lang="ts">
  import LoveLetter from '@/components/LoveLetter.vue'
  import { computed } from 'vue'

  // --- STICKERS LOGIC ---
  const stickersGlob = import.meta.glob('@/assets/stickers/*.(png|jpg|jpeg|svg|gif)', { eager: true, as: 'url' })
  const stickerUrls = Object.values(stickersGlob)

  interface Sticker {
    id: number
    url: string
    style: Record<string, string>
  }

  // Posiciones en COLUMNAS con espacio vertical asegurado
  // AÚN MÁS AL CENTRO para evitar que se corten en pantallas estrechas
  const POSITIONS = [
    // --- COLUMNA IZQUIERDA (Left: ~15-20%) ---
    { top: '5%', left: '15%' },
    { top: '30%', left: '22%' }, 
    { top: '55%', left: '12%' },
    { top: '80%', left: '18%' },

    // --- COLUMNA DERECHA (Left: ~70-75% - recordad que width sticker es ~80px) ---
    { top: '15%', left: '70%' }, 
    { top: '40%', left: '78%' },
    { top: '65%', left: '68%' },
    { top: '90%', left: '75%' },
  ]

  const displayedStickers = computed<Sticker[]>(() => {
    const result: Sticker[] = []
    
    if (stickerUrls.length === 0) return []

    // Recorremos CADA posición disponible para asegurar que hay 1 sticker por hueco
    POSITIONS.forEach((pos, index) => {
       // Elegir imagen cíclicamente
       const url = stickerUrls[index % stickerUrls.length] || ''
       if (!url) return 

       // Rotación pseudo-aleatoria pero fija para esa posición
       const rotation = (index * 33) % 40 - 20 

       result.push({
         id: index,
         url,
         style: {
           top: pos.top,
           left: pos.left,
           transform: `rotate(${rotation}deg)`,
         }
       })
    })

    return result
  })
</script>
