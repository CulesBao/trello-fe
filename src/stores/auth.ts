import { defineStore } from 'pinia'
import { jwtDecode } from 'jwt-decode'
import router from '@/router'

export const useAuthStore = defineStore('auth', () => {
  const JSONToken = JSON.parse(localStorage.getItem('accessToken') || 'null')
  const token = ref(JSONToken || '')
  const userId = ref(typeof JSONToken === 'string' ? jwtDecode(JSONToken).id : '')


  const isLoggedIn = computed(() => Boolean(token.value))

  function logout() {
    token.value = ''
    userId.value = ''
    localStorage.removeItem('accessToken')
    router.push('/login')
  }

  return { token, userId, isLoggedIn, logout }
})
