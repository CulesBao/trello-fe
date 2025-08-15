import type { BaseEntity } from './common'

export interface Card extends BaseEntity {
  title: string
  description: string
  order: number
  list: List
  comments: Comment[]
  checkLists: CheckList[]
  attachments: Attachment[]
}
interface List {
  id: number
  name: string
}
interface User {
  id: number
  name: string
}
export interface Comment {
  id: number
  content: string
  updateAt: Date
  createAt: Date
  user: User
}
export interface CheckList {
  id: number
  isDone: boolean
  content: string
}
export interface Attachment {
  id: number
  url: string
  user: User
}

export interface CreateCardRequest {
  title: string
  description?: string
  listId: string
  order: number
}

export interface UpdateCardRequest {
  title: string
  description: string
  order?: number
}
