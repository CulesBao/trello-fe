import type { BaseEntity } from './common'
import type { User } from './user'
import type { Card } from './card'

// Activity Types
export interface Activity extends BaseEntity {
  type:
    | 'card_created'
    | 'card_updated'
    | 'card_moved'
    | 'card_deleted'
    | 'list_created'
    | 'list_updated'
    | 'list_deleted'
    | 'board_created'
    | 'board_updated'
    | 'board_deleted'
    | 'member_added'
    | 'member_removed'
    | 'comment_added'
    | 'comment_updated'
  entityType: 'card' | 'list' | 'board' | 'comment'
  entityId: string
  userId: string
  user?: User
  description: string
  metadata?: Record<string, unknown>
  boardId?: string
}

// Notification Types
export interface Notification extends BaseEntity {
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  userId: string
  user?: User
  isRead: boolean
  readAt?: string
  entityType?: 'card' | 'list' | 'board' | 'comment'
  entityId?: string
  actionUrl?: string
}

// Team Types
export interface Team extends BaseEntity {
  name: string
  description?: string
  avatar?: string
  isPublic: boolean
  ownerId: string
  owner?: User
  members: TeamMember[]
  boardsCount: number
}

export interface TeamMember {
  userId: string
  user?: User
  role: 'owner' | 'admin' | 'member'
  joinedAt: string
}

export interface CreateTeamRequest {
  name: string
  description?: string
  avatar?: string
  isPublic?: boolean
}

export interface UpdateTeamRequest {
  name?: string
  description?: string
  avatar?: string
  isPublic?: boolean
}

export interface AddTeamMemberRequest {
  userId: string
  role: 'admin' | 'member'
}

// File Upload Types
export interface FileUploadResponse {
  id: string
  filename: string
  originalName: string
  mimeType: string
  size: number
  url: string
  uploadedAt: string
}

// Comment Types
export interface MiscComment extends BaseEntity {
  content: string
  userId: string
  user?: User
  cardId: string
  card?: Card
}

export interface MiscCreateCommentRequest {
  content: string
  cardId: string
}

export interface MiscUpdateCommentRequest {
  content?: string
}
