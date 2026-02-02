import { createRouter, createWebHistory } from 'vue-router'
import InvitationView from '../views/InvitationView.vue'

const router = createRouter({
  history: createWebHistory('/san-valentin/'),
  routes: [
    { path: '/', name: 'Invitation', component: InvitationView },
  ],
})

export default router
