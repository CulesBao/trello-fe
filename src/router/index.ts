import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: {
      isAuthLayout: false,
      requireAuth: true
    }
  }, {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/LoginView.vue'),
    meta: {
      isAuthLayout: true
    }
  }, {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/auth/RegisterView.vue'),
    meta: {
      isAuthLayout: true
    }
  }],

})

export default router
