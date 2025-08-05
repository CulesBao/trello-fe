import { $get, $post, $put, $delete } from '../axios.client';
import { API_ENDPOINTS } from '../constants/endpoints';
import type { Team, CreateTeamRequest, UpdateTeamRequest, AddTeamMemberRequest } from '../types/team';
import type { User } from '../types/user';
import type { Board } from '../types/board';
import type { ApiResponse } from '../types/common';

export class TeamService {
  /**
   * Lấy danh sách teams
   */
  static async getTeams(): Promise<Team[]> {
    const response = await $get<ApiResponse<Team[]>>(API_ENDPOINTS.TEAMS.LIST);
    return response.data.data;
  }

  /**
   * Lấy thông tin chi tiết team
   */
  static async getTeamById(id: string): Promise<Team> {
    const response = await $get<ApiResponse<Team>>(
      API_ENDPOINTS.TEAMS.DETAIL(id)
    );
    return response.data.data;
  }

  /**
   * Tạo team mới
   */
  static async createTeam(data: CreateTeamRequest): Promise<Team> {
    const response = await $post<ApiResponse<Team>>(
      API_ENDPOINTS.TEAMS.CREATE,
      data
    );
    return response.data.data;
  }

  /**
   * Cập nhật thông tin team
   */
  static async updateTeam(id: string, data: UpdateTeamRequest): Promise<Team> {
    const response = await $put<ApiResponse<Team>>(
      API_ENDPOINTS.TEAMS.UPDATE(id),
      data
    );
    return response.data.data;
  }

  /**
   * Xóa team
   */
  static async deleteTeam(id: string): Promise<void> {
    await $delete<ApiResponse<void>>(
      API_ENDPOINTS.TEAMS.DELETE(id)
    );
  }

  /**
   * Lấy danh sách thành viên của team
   */
  static async getTeamMembers(teamId: string): Promise<User[]> {
    const response = await $get<ApiResponse<User[]>>(
      API_ENDPOINTS.TEAMS.MEMBERS(teamId)
    );
    return response.data.data;
  }

  /**
   * Thêm thành viên vào team
   */
  static async addTeamMember(teamId: string, data: AddTeamMemberRequest): Promise<void> {
    await $post<ApiResponse<void>>(
      API_ENDPOINTS.TEAMS.ADD_MEMBER(teamId),
      data
    );
  }

  /**
   * Xóa thành viên khỏi team
   */
  static async removeTeamMember(teamId: string, userId: string): Promise<void> {
    await $delete<ApiResponse<void>>(
      API_ENDPOINTS.TEAMS.REMOVE_MEMBER(teamId, userId)
    );
  }

  /**
   * Lấy danh sách boards của team
   */
  static async getTeamBoards(teamId: string): Promise<Board[]> {
    const response = await $get<ApiResponse<Board[]>>(
      API_ENDPOINTS.TEAMS.BOARDS(teamId)
    );
    return response.data.data;
  }
}

export default TeamService;
