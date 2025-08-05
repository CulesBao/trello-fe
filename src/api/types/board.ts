import type { BaseEntity } from './common';
import type { User } from './user';

// Board Types
export interface Board extends BaseEntity {
  title: string;
  description?: string;
  background?: string;
  isPublic: boolean;
  isFavorite: boolean;
  ownerId: string;
  owner?: User;
  members: BoardMember[];
  visibility: 'private' | 'team' | 'public';
  teamId?: string;
}

export interface BoardMember {
  userId: string;
  user?: User;
  role: 'owner' | 'admin' | 'member' | 'observer';
  joinedAt: string;
}

export interface CreateBoardRequest {
  title: string;
  description?: string;
  background?: string;
  isPublic?: boolean;
  visibility?: 'private' | 'team' | 'public';
  teamId?: string;
}

export interface UpdateBoardRequest {
  title?: string;
  description?: string;
  background?: string;
  isPublic?: boolean;
  visibility?: 'private' | 'team' | 'public';
}

export interface AddBoardMemberRequest {
  userId: string;
  role: 'admin' | 'member' | 'observer';
}

// List Types
export interface List extends BaseEntity {
  title: string;
  position: number;
  boardId: string;
  board?: Board;
  isArchived: boolean;
}

export interface CreateListRequest {
  title: string;
  boardId: string;
  position?: number;
}

export interface UpdateListRequest {
  title?: string;
  position?: number;
  isArchived?: boolean;
}

export interface ReorderListRequest {
  position: number;
  boardId: string;
}
