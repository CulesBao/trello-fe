import { $post, $put } from '../axios.client'
import { API_ENDPOINTS } from '../constants/endpoints'
import type { LoginRequest, RegisterRequest, AuthResponse } from '../types/auth'
import type { UserProfile } from '../types/user'
import type { ApiResponse } from '../types/common'

export class AuthService {
  static async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await $post<ApiResponse<AuthResponse>>(API_ENDPOINTS.AUTH.LOGIN, data)
    localStorage.setItem('accessToken', JSON.stringify(response.data.data.token))
    window.location.replace('/')
    return response.data.data
  }

  static async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await $post<ApiResponse<AuthResponse>>(API_ENDPOINTS.AUTH.REGISTER, data)
    return response.data.data
  }

  static async updateProfile(data: Partial<UserProfile>): Promise<UserProfile> {
    const response = await $put<ApiResponse<UserProfile>>(API_ENDPOINTS.AUTH.UPDATE_PROFILE, data)
    return response.data.data
  }
}

export default AuthService
