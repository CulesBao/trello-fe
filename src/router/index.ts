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
          component: () => import('@/features/workspace/components/MyWorkspaceLayout.vue'),
        },
        {
          path: 'w/:id/boards',
          name: 'WorkspaceBoards',
          component: () => import('@/features/workspace/views/BoardsView.vue'),
          meta: { title: 'Boards' },
        },
        {
          path: 'w/:id/members',
          name: 'WorkspaceMembers',
          component: () => import('@/features/workspace/views/MemberView.vue'),
          meta: { title: 'Members' },
        },
        {
          path: 'w/:id/settings',
          name: 'WorkspaceSettings',
          component: () => import('@/features/workspace/views/WorkspaceSettingsView.vue'),
          meta: { title: 'Settings' },
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
      path: '/b/:id/:name',
      name: 'Board',
      component: () => import('@/features/board/views/BoardView.vue'),
      meta: {
        title: 'Board',
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
