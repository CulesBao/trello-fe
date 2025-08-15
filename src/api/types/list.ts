import type { BaseEntity } from './common'

export interface List extends BaseEntity {
  name: string
  order?: number
  cards: CardForList[]
}
export interface CardForList {
  id: number
  title: string
  description: string
  order: number
}
export interface CreateListRequest {
  name: string
  boardId: string | number
  order?: number
}

export interface UpdateListRequest {
  name: string
  order?: number
}
