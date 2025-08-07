import type { BaseEntity } from './common';

export interface Workspace extends BaseEntity {
  name: string;
  description?: string;
  admin: WorkspaceMember[];
  users: WorkspaceMember[];
  boards: Board[];
}

export interface WorkspaceMember {
  id: number;
  email: string;
}
interface Board {
  id: number;
  name: string;
}

export interface CreateWorkspaceRequest {
  name: string;
  description?: string;
}

export interface UpdateWorkspaceRequest {
  name?: string;
  description?: string;
}

export interface AddWorkspaceMemberRequest {
  userId: string;
  role: 'admin' | 'member';
}
