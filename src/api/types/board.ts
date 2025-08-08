import type { BaseEntity } from './common'

// Board Types
export interface Board extends BaseEntity {
  name: string
  description: string
  workspaceId: number
  admin: User
  users: User[]
  lists: List[]
}
interface User {
  id: number
  name: string
  email: string
}
interface List {
  id: number
  name: string
}
export interface CreateBoardRequest {
  name: string
  description?: string
  workspaceId: number
}

export interface UpdateBoardRequest {
  title?: string
  description?: string
  background?: string
  isPublic?: boolean
  visibility?: 'private' | 'team' | 'public'
}

export interface AddBoardMemberRequest {
  userId: string
  role: 'admin' | 'member' | 'observer'
}
