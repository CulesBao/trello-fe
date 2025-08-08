// stores/user.ts
import { defineStore } from 'pinia'
import { type UserProfile } from '@/api/types/user'

export const useUserStore = defineStore('user', () => {
  const user: Ref<UserProfile | null> = ref(null)

  const setUser = (newUser: UserProfile) => {
    user.value = newUser
  }

  const getShortName = () => {
    if (!user.value || !user.value.name) {
      return 'AN'
    }
    const splitName: string[] = user.value.name.split(' ')
    return (
      splitName[0].charAt(0).toUpperCase() + splitName[splitName.length - 1].charAt(0).toUpperCase()
    )
  }

  return { user, setUser, getShortName }
})
