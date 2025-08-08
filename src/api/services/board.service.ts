import { $get, $post, $put, $delete } from '../axios.client';
import { API_ENDPOINTS } from '../constants/endpoints';
import type { Board, CreateBoardRequest, UpdateBoardRequest, AddBoardMemberRequest } from '../types/board';
import type { Activity } from '../types/misc';
import type { ApiResponse } from '../types/common';

export class BoardService {
  /**
   * Get user's boards
   */
  static async getBoards(): Promise<Board[]> {
    const response = await $get<ApiResponse<Board[]>>(
      API_ENDPOINTS.BOARDS.LIST
    );
    return response.data.data;
  }

  /**
   * Get board details
   */
  static async getBoardById(id: string): Promise<Board> {
    const response = await $get<ApiResponse<Board>>(
      API_ENDPOINTS.BOARDS.DETAIL(id)
    );
    return response.data.data;
  }

  /**
   * Create new board
   */
  static async createBoard(data: CreateBoardRequest): Promise<Board> {
    const response = await $post<ApiResponse<Board>>(
      API_ENDPOINTS.BOARDS.CREATE,
      data,
    );
    return response.data.data;
  }

  /**
   * Update board information
   */
  static async updateBoard(id: string, data: UpdateBoardRequest): Promise<Board> {
    const response = await $put<ApiResponse<Board>>(
      API_ENDPOINTS.BOARDS.UPDATE(id),
      data
    );
    return response.data.data;
  }

  /**
   * Delete board
   */
  static async deleteBoard(id: string): Promise<void> {
    await $delete<ApiResponse<void>>(
      API_ENDPOINTS.BOARDS.DELETE(id)
    );
  }

  /**
   * Add member to board
   */
  static async addBoardMember(boardId: string, data: AddBoardMemberRequest): Promise<void> {
    await $post<ApiResponse<void>>(
      API_ENDPOINTS.BOARDS.ADD_MEMBER(boardId),
      data,
    );
  }

  /**
   * Remove member from board
   */
  static async removeBoardMember(boardId: string, userId: string): Promise<void> {
    await $delete<ApiResponse<void>>(
      API_ENDPOINTS.BOARDS.REMOVE_MEMBER(boardId, userId)
    );
  }

  /**
   * Get board activities
   */
  static async getBoardActivities(boardId: string): Promise<Activity[]> {
    const response = await $get<ApiResponse<Activity[]>>(
      API_ENDPOINTS.ACTIVITIES.BY_BOARD(boardId)
    );
    return response.data.data;
  }

  /**
   * Toggle favorite board
   */
  static async toggleFavoriteBoard(id: string): Promise<Board> {
    const response = await $put<ApiResponse<Board>>(
      `${API_ENDPOINTS.BOARDS.DETAIL(id)}/favorite`
    );
    return response.data.data;
  }

  /**
   * Duplicate board
   */
  static async duplicateBoard(id: string, title: string): Promise<Board> {
    const response = await $post<ApiResponse<Board>>(
      `${API_ENDPOINTS.BOARDS.DETAIL(id)}/duplicate`,
      { title }
    );
    return response.data.data;
  }
}
export default BoardService;
