import { $post } from '../axios.client'
import { API_ENDPOINTS } from '../constants/endpoints'
import type { LoginRequest, AuthResponse } from '../types/auth'
import type { ApiResponse } from '../types/common'

export class AuthService {
  static async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await $post<ApiResponse<AuthResponse>>(API_ENDPOINTS.AUTH.LOGIN, data)
    localStorage.setItem('accessToken', JSON.stringify(response.data.data.token))
    window.location.replace('/')
    return response.data.data
  }
}

export default AuthService
