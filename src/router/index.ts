import { createRouter, createWebHistory } from 'vue-router'
import InvitationView from '../views/InvitationView.vue'

const routes = [
  {
    path: '/',
    name: 'Invitation',
    component: InvitationView
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
