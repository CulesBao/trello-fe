import type { BaseEntity } from './common'

// User Types
export interface User extends BaseEntity {
  email: string
  username: string
  firstName: string
  lastName: string
  avatar?: string
  isActive: boolean
  role: 'admin' | 'user' | 'moderator'
  lastLoginAt?: string
}

export interface UserProfile {
  id: string
  name: string
  email: string
  phoneNumber?: string
  birthdate?: string
  createdAt?: Date
  updatedAt?: Date
}
