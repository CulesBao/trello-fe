import type { BaseEntity } from './common';
import type { User } from './user';

export interface Team extends BaseEntity {
  name: string;
  description?: string;
  ownerId: string;
  owner?: User;
  members: TeamMember[];
}

export interface TeamMember {
  userId: string;
  user?: User;
  role: 'admin' | 'member';
  joinedAt: string;
}

export interface CreateTeamRequest {
  name: string;
  description?: string;
}

export interface UpdateTeamRequest {
  name?: string;
  description?: string;
}

export interface AddTeamMemberRequest {
  userId: string;
  role: 'admin' | 'member';
}
