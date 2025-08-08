import { $get, $post, $put, $delete } from '../axios.client'
import { API_ENDPOINTS } from '../constants/endpoints'
import type { User, CreateUserRequest, UpdateUserRequest, UserProfile } from '../types/user'
import type { ApiResponse } from '../types/common'
import { useUserStore } from '@/stores/user'

export class UserService {
  /**
   * Lấy danh sách người dùng
   */
  static async getUsers(): Promise<User[]> {
    const response = await $get<ApiResponse<User[]>>(API_ENDPOINTS.USERS.LIST)
    return response.data.data
  }
  static async getMyProfile(): Promise<UserProfile> {
    const response = await $get<ApiResponse<UserProfile>>(API_ENDPOINTS.USERS.DETAIL(''))
    const userStoreInstance = useUserStore()
    userStoreInstance.setUser(response.data.data)
    return response.data.data
  }

  /**
   * Lấy thông tin chi tiết một người dùng
   */
  static async getUserById(id: string): Promise<User> {
    const response = await $get<ApiResponse<User>>(API_ENDPOINTS.USERS.DETAIL(id))
    return response.data.data
  }

  /**
   * Tạo người dùng mới
   */
  static async createUser(data: CreateUserRequest): Promise<User> {
    const response = await $post<ApiResponse<User>>(API_ENDPOINTS.USERS.CREATE, data)
    return response.data.data
  }

  /**
   * Cập nhật thông tin người dùng
   */
  static async updateUser(id: string, data: UpdateUserRequest): Promise<User> {
    const response = await $put<ApiResponse<User>>(API_ENDPOINTS.USERS.UPDATE(id), data)
    return response.data.data
  }

  /**
   * Xóa người dùng
   */
  static async deleteUser(id: string): Promise<void> {
    await $delete<ApiResponse<void>>(API_ENDPOINTS.USERS.DELETE(id))
  }

  /**
   * Tìm kiếm người dùng
   */
  static async searchUsers(params: {
    query: string
    limit?: number
    excludeIds?: string[]
  }): Promise<User[]> {
    const response = await $get<ApiResponse<User[]>>(API_ENDPOINTS.USERS.SEARCH, { params })
    return response.data.data
  }

  /**
   * Lấy danh sách người dùng theo IDs
   */
  static async getUsersByIds(ids: string[]): Promise<User[]> {
    const response = await $get<ApiResponse<User[]>>(API_ENDPOINTS.USERS.LIST, {
      params: { ids: ids.join(',') },
    })
    return response.data.data
  }

  /**
   * Kiểm tra email đã tồn tại
   */
  static async checkEmailExists(email: string): Promise<boolean> {
    try {
      const response = await $get<ApiResponse<{ exists: boolean }>>(
        `${API_ENDPOINTS.USERS.LIST}/check-email`,
        { params: { email } }
      )
      return response.data.data.exists
    } catch {
      return false
    }
  }

  /**
   * Kiểm tra username đã tồn tại
   */
  static async checkUsernameExists(username: string): Promise<boolean> {
    try {
      const response = await $get<ApiResponse<{ exists: boolean }>>(
        `${API_ENDPOINTS.USERS.LIST}/check-username`,
        { params: { username } }
      )
      return response.data.data.exists
    } catch {
      return false
    }
  }
}

export default UserService
