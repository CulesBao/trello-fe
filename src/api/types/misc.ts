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
  content: string
}
