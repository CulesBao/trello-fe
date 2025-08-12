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
export interface List {
  id: number
  name: string
}
export interface CreateBoardRequest {
  name: string
  description?: string
  workspaceId: number
}

export interface UpdateBoardRequest {
  name: string
  description: string
}

export interface AddBoardMemberRequest {
  userId: string
}
