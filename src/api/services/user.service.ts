import { $get } from '../axios.client'
import { API_ENDPOINTS } from '../constants/endpoints'
import type { UserProfile } from '../types/user'
import type { ApiResponse } from '../types/common'
import { useUserStore } from '@/stores/user'

export class UserService {
  static async getMyProfile(): Promise<UserProfile> {
    const response = await $get<ApiResponse<UserProfile>>(API_ENDPOINTS.USERS.DETAIL(''))
    const userStoreInstance = useUserStore()
    userStoreInstance.setUser(response.data.data)
    return response.data.data
  }
}

export default UserService
