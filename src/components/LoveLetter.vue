<template>
  <section class="page">
    <h1 class="blinking-title">
      holi<br />
      <span class="alt-title">(¿Puedes tocar el corazón?..)</span>
    </h1>

    <div class="container">
      <div
        class="envelope-wrapper"
        :class="{
          opened: envelopeOpen,
          'disable-envelope': letterState === 'open'
        }"
        @click="onWrapperClick"
      >
        <div class="envelope">
          <!-- CARTA (misma clase .letter del demo) -->
          <div
            class="letter"
            :class="{
              'show-letter': letterState === 'preview',
              'opened-letter': letterState === 'open',
              'closing-letter': letterState === 'closing'
            }"
          >
            <div class="content" @click.stop="toggleLetter">
              <!-- TU CARTA: TAL CUAL -->
              <section class="letter-wrapper">
                <div class="letter-card">
                  <p>Hola Adri,</p>

                  <p>
                    Quería decirte que desde que empezamos a hablar no he dejado de sentirme feliz.
                    Estar contigo, ya sea en persona, por chat o por llamada, me da una tranquilidad
                    que no esperaba encontrar.
                  </p>

                  <p>
                    Sé que hace medio año ninguno de los dos habría imaginado que todo esto estaría
                    pasando, y aun así me alegra muchísimo que esté pasando contigo.
                  </p>

                  <p>
                    Esto no es una declaración formal, porque creo que ya lo sabes.
                    Pero igual quiero decirlo claro: <strong>estoy enamorado de ti.</strong>
                  </p>

                  <p>
                    No soy muy bueno haciendo manualidades, pero sí programando.
                    Así que decidí hacer esto a mi manera, escribiendo código,
                    para poder preguntarte algo importante.
                  </p>

                  <p class="question">
                    Would you be my Valentine? ❤️
                  </p>

                  <!-- BOTONES (como el demo) -->
                  <div class="yes-no-animation-wrap">
                    <div
                      class="yes-no-container"
                      id="buttons"
                      :style="{ opacity: buttonsOpacity, display: buttonsDisplay }"
                    >
                      <button type="button" class="yes-button" @click.stop="onYes">SÍ</button>
                      <button type="button" class="yes-button" id="no-btn" @click.stop="onNo">
                        NO
                      </button>
                    </div>

                    <div
                      id="no-error"
                      class="no-error"
                      :style="{ display: noErrorDisplay, opacity: noErrorOpacity }"
                    >
                      ERROR 404 (¡Opción NO no encontrada!)
                    </div>
                  </div>
                </div>
              </section>
              <!-- FIN TU CARTA -->
            </div>
          </div>
        </div>

        <!-- MISMAS PIEZAS DEL SOBRE -->
        <div class="heart" @click.stop="toggleEnvelope"></div>
        <div class="right-flap" @click.stop="toggleEnvelope"></div>
        <div class="left-flap" @click.stop="toggleEnvelope"></div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

type LetterState = 'hidden' | 'preview' | 'open' | 'closing'

const router = useRouter()

const envelopeOpen = ref(false)
const letterState = ref<LetterState>('hidden')

/** Animación NO (replica el demo: oculta botones, muestra error, vuelve) */
const buttonsOpacity = ref('1')
const buttonsDisplay = ref<'flex' | 'none'>('flex')
const noErrorDisplay = ref<'block' | 'none'>('none')
const noErrorOpacity = ref('0')

function toggleEnvelope() {
  // Como el demo: si la carta está abierta, bloquea el sobre
  if (letterState.value === 'open') return
  envelopeOpen.value = !envelopeOpen.value
}

function toggleLetter() {
  // Abre el sobre si estaba cerrado (se siente más natural)
  envelopeOpen.value = true

  if (letterState.value === 'hidden') {
    letterState.value = 'preview'
    window.setTimeout(() => {
      letterState.value = 'open'
    }, 500)
    return
  }

  if (letterState.value === 'open') {
    letterState.value = 'closing'
    window.setTimeout(() => {
      letterState.value = 'hidden'
    }, 500)
  }
}

function onWrapperClick(e: MouseEvent) {
  const target = e.target as HTMLElement

  // Si click cae dentro de la carta/contenido, NO togglear sobre aquí
  if (target.closest('.content')) return

  // Clicks “externos” del sobre: envelope/flaps/corazón
  if (
    target.closest('.heart') ||
    target.closest('.right-flap') ||
    target.closest('.left-flap') ||
    target.closest('.envelope')
  ) {
    toggleEnvelope()
  }
}

function onYes() {
  // Si tienes ruta /heart (recomendado), te manda ahí. Si no, no explota.
  router.push('/heart').catch(() => {
    // si no existe la ruta, al menos no se queda “sin hacer nada”
    // podrías mostrar un modal aquí si quieres
    alert('SÍ 💖')
  })
}

function onNo() {
  // Replica el timing del demo
  buttonsOpacity.value = '0'
  window.setTimeout(() => {
    buttonsDisplay.value = 'none'
    noErrorDisplay.value = 'block'
    noErrorOpacity.value = '1'

    window.setTimeout(() => {
      noErrorOpacity.value = '0'
      window.setTimeout(() => {
        noErrorDisplay.value = 'none'
        buttonsDisplay.value = 'flex'
        window.setTimeout(() => {
          buttonsOpacity.value = '1'
        }, 10)
      }, 350)
    }, 2100)
  }, 200)
}
</script>

<style scoped>
/* NOTA: body, :root, reset van a CSS global (te lo dejo abajo) */

.page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* CONTENEDOR */
.container {
  width: 400px;
}

/* SOBRE */
.envelope-wrapper {
  position: relative;
  background-color: var(--envelope-background);
  box-shadow: 0 0 40px var(--shadow);
  border-radius: 15px;
}

.envelope {
  position: relative;
  width: 400px;
  height: 300px;
}

/* flap superior (triángulo) */
.envelope::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 4;
  border-top: 180px solid var(--flap-background);
  border-right: 200px solid transparent;
  border-left: 200px solid transparent;
  transform-origin: top;
  transition: all 0.5s ease-in-out 0.7s;
  border-radius: 10px;
}

.right-flap {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  clip-path: polygon(100% 0, 0 100%, 100% 100%);
  background-color: var(--body-background);
  border-bottom-right-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
}

.left-flap {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  clip-path: polygon(0 0, 0 100%, 100% 100%);
  background-color: var(--body-background);
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

/* CARTA */
.letter {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #fff0f5, #ffe4e1);
  border-radius: 10px;
  box-shadow: 0 0 5px var(--shadow);
  text-align: center;
  padding: 20px;
  transition: transform 0.5s ease-in-out;
}

.letter:hover {
  transform: scale(1.02);
}

/* contenido scroll */
.content {
  font-family: 'Marck Script', cursive;
  font-size: 24px;
  color: #d6336c;
  line-height: 1.6;
  text-align: center;
  border: 3px dotted var(--text-color);
  padding: 10px;
  height: 100%;
  cursor: pointer;
  overflow-y: auto;
}

strong {
  font-size: 26px;
  color: #c9184a;
}

.question {
  margin-top: 1rem;
}

/* botones + error */
.yes-no-animation-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 48px;
  min-width: 240px;
  position: relative;
}

.yes-no-container {
  display: flex;
  justify-content: center;
  gap: 14px;
  margin-top: 15px;
  transition: opacity 0.2s;
}

.no-error {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-family: 'Poppins', sans-serif;
  font-size: 12px;
  color: #262223;
  font-weight: bold;
  letter-spacing: 1px;
  background: #fff4f8;
  border: 2px solid #ffb5cd;
  border-radius: 10px;
  box-shadow: 0 2px 10px #ff477e22;
  transition: opacity 0.3s;
  text-align: center;
  padding: 8px 12px;
  min-width: 140px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  animation: noBlinkSoft 0.7s linear 0s 3 alternate;
  z-index: 10;
}

@keyframes noBlinkSoft {
  0% { opacity: 0.2; }
  40% { opacity: 0.9; }
  70% { opacity: 0.15; }
  100% { opacity: 0.9; }
}

.yes-button {
  display: inline-block;
  padding: 7px 16px;
  background-color: var(--heart-color);
  color: white;
  font-weight: bold;
  border-radius: 18px;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.14);
  transition: background 0.3s ease;
  font-family: 'Poppins', sans-serif;
  font-size: 15px;
  min-width: 74px;
  border: none;
  cursor: pointer;
  margin: 0;
}

.yes-button:hover {
  background-color: #e0386b;
}

/* CORAZÓN */
.heart {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 30px;
  height: 30px;
  background-color: var(--heart-color);
  transform: translate(-50%, 0) rotate(45deg);
  transition: transform 0.5s ease-in-out 1s;
  z-index: 999;
  cursor: pointer;
}

.heart::before,
.heart::after {
  content: "";
  position: absolute;
  width: 30px;
  height: 30px;
  background-color: var(--heart-color);
  border-radius: 100%;
}

.heart::before { top: -15px; }
.heart::after { right: 15px; }

/* estados del demo */
.opened .envelope::before {
  transform: rotateX(180deg);
  z-index: 0;
}

.opened .heart {
  transform: rotate(90deg);
  transition-delay: 0.4s;
}

/* animación de carta (demo) */
.letter.show-letter {
  transform: translateY(-290px);
  transition: transform 0.5s ease-in-out;
}

/* aquí sí corregimos el cierre (en el demo estaba raro) */
.letter.closing-letter {
  transform: translateY(0);
  transition: transform 0.5s ease-in-out;
}

.letter.opened-letter {
  z-index: 10000;
}

/* bloquea flap superior */
.envelope-wrapper.disable-envelope .envelope::before {
  pointer-events: none;
}

/* responsive igual que demo */
@media screen and (max-width: 400px) {
  .container { width: 300px; }

  .envelope {
    width: 300px;
    height: 250px;
  }

  .envelope::before {
    border-top: 150px solid var(--flap-background);
    border-right: 150px solid transparent;
    border-left: 150px solid transparent;
  }

  .yes-no-container { gap: 9px; }

  .yes-button {
    padding: 5px 11px;
    font-size: 13px;
    min-width: 56px;
  }
}
</style>
