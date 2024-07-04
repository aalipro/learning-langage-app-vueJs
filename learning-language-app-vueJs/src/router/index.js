
/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router'
import ChoixLangue from '@/views/ChoixLangue.vue';
import Anglais from '@/views/Anglais.vue';
import Portugais from '@/views/Portugais.vue';
const routes = [
  {
    path: '/',
    name: 'ChoixLangue',
    component: ChoixLangue,
  },
  {
    path: '/anglais',
    name: 'Anglais',
    component: Anglais,
  },
  {
    path: '/portugais',
    name: 'Portugais',
    component: Portugais,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
