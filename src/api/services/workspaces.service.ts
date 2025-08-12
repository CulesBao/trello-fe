import { $get, $post, $put, $delete } from '../axios.client'
import { API_ENDPOINTS } from '../constants/endpoints'
import type {
  Workspace,
  CreateWorkspaceRequest,
  UpdateWorkspaceRequest,
  AddWorkspaceMemberRequest,
} from '../types/workspace'
import type { ApiResponse } from '../types/common'

export class WorkspaceService {
  static async getWorkspaces(): Promise<Workspace[]> {
    const response = await $get<ApiResponse<Workspace[]>>(API_ENDPOINTS.WORKSPACES.LIST)
    return response.data.data
  }

  static async getWorkspaceById(id: string): Promise<Workspace> {
    const response = await $get<ApiResponse<Workspace>>(API_ENDPOINTS.WORKSPACES.DETAIL(id))
    return response.data.data
  }

  static async createWorkspace(data: CreateWorkspaceRequest): Promise<Workspace> {
    const response = await $post<ApiResponse<Workspace>>(API_ENDPOINTS.WORKSPACES.CREATE, data)
    return response.data.data
  }

  static async updateWorkspace(id: string, data: UpdateWorkspaceRequest): Promise<Workspace> {
    const response = await $put<ApiResponse<Workspace>>(API_ENDPOINTS.WORKSPACES.UPDATE(id), data)
    return response.data.data
  }

  static async deleteWorkspace(id: string): Promise<void> {
    await $delete<ApiResponse<void>>(API_ENDPOINTS.WORKSPACES.DELETE(id))
  }

  static async addWorkspaceMember(
    workspaceId: string,
    data: AddWorkspaceMemberRequest
  ): Promise<void> {
    await $post<ApiResponse<void>>(API_ENDPOINTS.WORKSPACES.ADD_MEMBER(workspaceId), data)
  }
  static async removeWorkspaceMember(workspaceId: string, userId: string): Promise<void> {
    await $delete<ApiResponse<void>>(API_ENDPOINTS.WORKSPACES.REMOVE_MEMBER(workspaceId, userId))
  }
}

export default WorkspaceService
