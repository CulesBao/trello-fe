import type { BaseEntity } from './common'
import type { List } from './list'

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
  email: string
}
