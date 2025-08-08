import { $get, $post, $put, $delete } from '../axios.client'
import { API_ENDPOINTS } from '../constants/endpoints'
import type {
  Workspace,
  CreateWorkspaceRequest,
  UpdateWorkspaceRequest,
  AddWorkspaceMemberRequest,
} from '../types/workspace'
import type { User } from '../types/user'
import type { Board } from '../types/board'
import type { ApiResponse } from '../types/common'

export class WorkspaceService {
  /**
   * Get list of workspaces
   */
  static async getWorkspaces(): Promise<Workspace[]> {
    const response = await $get<ApiResponse<Workspace[]>>(API_ENDPOINTS.WORKSPACES.LIST)
    return response.data.data
  }

  /**
   * Get workspace details
   */
  static async getWorkspaceById(id: string): Promise<Workspace> {
    const response = await $get<ApiResponse<Workspace>>(API_ENDPOINTS.WORKSPACES.DETAIL(id))
    return response.data.data
  }

  /**
   * Create new workspace
   */
  static async createWorkspace(data: CreateWorkspaceRequest): Promise<Workspace> {
    const response = await $post<ApiResponse<Workspace>>(API_ENDPOINTS.WORKSPACES.CREATE, data)
    return response.data.data
  }

  /**
   * Update workspace information
   */
  static async updateWorkspace(id: string, data: UpdateWorkspaceRequest): Promise<Workspace> {
    const response = await $put<ApiResponse<Workspace>>(API_ENDPOINTS.WORKSPACES.UPDATE(id), data)
    return response.data.data
  }

  /**
   * Delete workspace
   */
  static async deleteWorkspace(id: string): Promise<void> {
    await $delete<ApiResponse<void>>(API_ENDPOINTS.WORKSPACES.DELETE(id))
  }

  /**
   * Get workspace members
   */
  static async getWorkspaceMembers(workspaceId: string): Promise<User[]> {
    const response = await $get<ApiResponse<User[]>>(API_ENDPOINTS.WORKSPACES.MEMBERS(workspaceId))
    return response.data.data
  }

  /**
   * Add member to workspace
   */
  static async addWorkspaceMember(
    workspaceId: string,
    data: AddWorkspaceMemberRequest
  ): Promise<void> {
    await $post<ApiResponse<void>>(API_ENDPOINTS.WORKSPACES.ADD_MEMBER(workspaceId), data)
  }

  /**
   * Remove member from workspace
   */
  static async removeWorkspaceMember(workspaceId: string, userId: string): Promise<void> {
    await $delete<ApiResponse<void>>(API_ENDPOINTS.WORKSPACES.REMOVE_MEMBER(workspaceId, userId))
  }

  /**
   * Get workspace boards
   */
  static async getWorkspaceBoards(workspaceId: string): Promise<Board[]> {
    const response = await $get<ApiResponse<Board[]>>(API_ENDPOINTS.WORKSPACES.BOARDS(workspaceId))
    return response.data.data
  }
}

export default WorkspaceService
