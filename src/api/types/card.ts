import type { BaseEntity } from './common'
import type { User } from './user'
import type { List } from './board'

// Card Types
export interface Card extends BaseEntity {
  title: string
  description?: string
  position: number
  listId: string
  list?: List
  assignedMembers: CardMember[]
  dueDate?: string
  isCompleted: boolean
  priority: 'low' | 'medium' | 'high' | 'urgent'
  labels: CardLabel[]
  attachments: CardAttachment[]
  commentsCount: number
  coverImage?: string
}

export interface CardMember {
  userId: string
  user?: User
  assignedAt: string
  assignedBy: string
}

export interface CardLabel {
  id: string
  name: string
  color: string
}

export interface CardAttachment {
  id: string
  filename: string
  originalName: string
  mimeType: string
  size: number
  url: string
  uploadedAt: string
  uploadedBy: string
}

export interface CreateCardRequest {
  title: string
  description?: string
  listId: string
  position?: number
  dueDate?: string
  priority?: 'low' | 'medium' | 'high' | 'urgent'
  assignedUserIds?: string[]
  labelIds?: string[]
}

export interface UpdateCardRequest {
  title?: string
  description?: string
  dueDate?: string
  isCompleted?: boolean
  priority?: 'low' | 'medium' | 'high' | 'urgent'
  coverImage?: string
}

export interface MoveCardRequest {
  listId: string
  position: number
}

export interface AssignCardMemberRequest {
  userId: string
}

// Comment Types
export interface Comment extends BaseEntity {
  content: string
  cardId: string
  authorId: string
  author?: User
  isEdited: boolean
  editedAt?: string
}

export interface CreateCommentRequest {
  content: string
  cardId: string
}

export interface UpdateCommentRequest {
  content: string
}
