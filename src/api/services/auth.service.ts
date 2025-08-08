import { $post, $put } from '../axios.client'
import { API_ENDPOINTS } from '../constants/endpoints'
import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  ForgotPasswordRequest,
  ResetPasswordRequest,
} from '../types/auth'
import type { UserProfile, ChangePasswordRequest } from '../types/user'
import type { ApiResponse } from '../types/common'

export class AuthService {
  /**
   * Đăng nhập người dùng
   */
  static async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await $post<ApiResponse<AuthResponse>>(API_ENDPOINTS.AUTH.LOGIN, data)
    localStorage.setItem('accessToken', JSON.stringify(response.data.data.token))
    window.location.replace('/')
    return response.data.data
  }

  /**
   * Đăng ký tài khoản mới
   */
  static async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await $post<ApiResponse<AuthResponse>>(API_ENDPOINTS.AUTH.REGISTER, data)
    return response.data.data
  }

  /**
   * Cập nhật thông tin profile
   */
  static async updateProfile(data: Partial<UserProfile>): Promise<UserProfile> {
    const response = await $put<ApiResponse<UserProfile>>(API_ENDPOINTS.AUTH.UPDATE_PROFILE, data)
    return response.data.data
  }

  /**
   * Đổi mật khẩu
   */
  static async changePassword(data: ChangePasswordRequest): Promise<void> {
    await $put<ApiResponse<void>>(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, data)
  }

  /**
   * Quên mật khẩu
   */
  static async forgotPassword(data: ForgotPasswordRequest): Promise<void> {
    await $post<ApiResponse<void>>(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, data)
  }

  /**
   * Đặt lại mật khẩu
   */
  static async resetPassword(data: ResetPasswordRequest): Promise<void> {
    await $post<ApiResponse<void>>(API_ENDPOINTS.AUTH.RESET_PASSWORD, data)
  }
}

export default AuthService
