// Authentication Types
export interface LoginRequest {
  email: string
  password: string
  rememberMe?: boolean
}

export interface AuthResponse {
  user: {
    id: string
    email: string
    username: string
    firstName: string
    lastName: string
    avatar?: string
    role: string
  }
  token: string
}
