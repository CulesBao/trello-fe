import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function authMiddleware(to: any, from: any, next: any) {
  const { isLoggedIn } = storeToRefs(useAuthStore())

  if (to.meta.requireAuth && !isLoggedIn.value) {
    return next('/login')
  }

  if (to.meta.isAuthLayout && isLoggedIn.value) {
    return next('/')
  }

  return next()
}
