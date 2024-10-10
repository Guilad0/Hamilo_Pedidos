import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
// import UsuariosView from '@/views/UsuariosView.vue'
import UsuariosView from '@/views/UsuariosView.vue'
import PedidosView from '@/views/PedidosView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/usuarios',
      name: 'usuarios',
      component: UsuariosView
    },
    {
      path: '/usuarios',
      name: 'usuarios',
      component: UsuariosView1
    },
    {
      path: '/pedidos',
      name: 'pedidos',
      component: PedidosView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
