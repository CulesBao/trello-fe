// Common API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean
  data: T
  message?: string
  errors?: string[]
}

export interface ApiError {
  message: string
  code: string
  details?: Record<string, unknown>
}

// Base Entity
export interface BaseEntity {
  id: number
  createdAt: Date
  updatedAt: Date
}
