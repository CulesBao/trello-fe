import { createRouter, createWebHistory } from 'vue-router'
import { authMiddleware } from '@/middlewares/authMiddleware'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/Home.vue'),
      meta: { requireAuth: true },
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('@/components/workspace/MyWorkspaceLayout.vue'),
        },
        {
          path: 'workspaces/:id/boards',
          name: 'WorkspaceBoards',
          component: () => import('../views/workspace/BoardsView.vue'),
          meta: { title: 'Boards' },
        },
      ],
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/auth/LoginView.vue'),
      meta: {
        isAuthLayout: true,
      },
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/auth/RegisterView.vue'),
      meta: {
        isAuthLayout: true,
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'error',
      component: () => import('../views/Error.vue'),
      meta: {
        isErrorLayout: true,
      },
    },
  ],
})

router.beforeEach(authMiddleware)

export default router
