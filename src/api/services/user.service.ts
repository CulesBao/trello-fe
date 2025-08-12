import { $get, $put, $delete } from '../axios.client'
import { API_ENDPOINTS } from '../constants/endpoints'
import type { User, UpdateUserRequest, UserProfile } from '../types/user'
import type { ApiResponse } from '../types/common'
import { useUserStore } from '@/stores/user'

export class UserService {
  static async getMyProfile(): Promise<UserProfile> {
    const response = await $get<ApiResponse<UserProfile>>(API_ENDPOINTS.USERS.DETAIL(''))
    const userStoreInstance = useUserStore()
    userStoreInstance.setUser(response.data.data)
    return response.data.data
  }

  static async updateUser(id: string, data: UpdateUserRequest): Promise<User> {
    const response = await $put<ApiResponse<User>>(API_ENDPOINTS.USERS.UPDATE(id), data)
    return response.data.data
  }

  static async deleteUser(id: string): Promise<void> {
    await $delete<ApiResponse<void>>(API_ENDPOINTS.USERS.DELETE(id))
  }
}

export default UserService
