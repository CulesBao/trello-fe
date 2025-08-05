import { $get, $post, $put, $delete } from '../axios.client';
import { API_ENDPOINTS } from '../constants/endpoints';
import type { Board, CreateBoardRequest, UpdateBoardRequest, AddBoardMemberRequest, List, CreateListRequest, UpdateListRequest, ReorderListRequest } from '../types/board';
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
   * Get board members
   */
  static async getBoardMembers(id: string): Promise<Board['members']> {
    const response = await $get<ApiResponse<Board['members']>>(
      API_ENDPOINTS.BOARDS.MEMBERS(id)
    );
    return response.data.data;
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

export class ListService {
  /**
   * Get lists of a board
   */
  static async getListsByBoard(boardId: string): Promise<List[]> {
    const response = await $get<ApiResponse<List[]>>(
      API_ENDPOINTS.LISTS.BY_BOARD(boardId)
    );
    return response.data.data;
  }

  /**
   * Get list details
   */
  static async getListById(id: string): Promise<List> {
    const response = await $get<ApiResponse<List>>(
      API_ENDPOINTS.LISTS.DETAIL(id)
    );
    return response.data.data;
  }

  /**
   * Create new list
   */
  static async createList(data: CreateListRequest): Promise<List> {
    const response = await $post<ApiResponse<List>>(
      API_ENDPOINTS.LISTS.CREATE,
      data,
    );
    return response.data.data;
  }

  /**
   * Update list information
   */
  static async updateList(id: string, data: UpdateListRequest): Promise<List> {
    const response = await $put<ApiResponse<List>>(
      API_ENDPOINTS.LISTS.UPDATE(id),
      data
    );
    return response.data.data;
  }

  /**
   * Delete list
   */
  static async deleteList(id: string): Promise<void> {
    await $delete<ApiResponse<void>>(
      API_ENDPOINTS.LISTS.DELETE(id)
    );
  }

  /**
   * Reorder list
   */
  static async reorderList(id: string, data: ReorderListRequest): Promise<List> {
    const response = await $put<ApiResponse<List>>(
      API_ENDPOINTS.LISTS.REORDER(id),
      data
    );
    return response.data.data;
  }

  /**
   * Archive/Unarchive list
   */
  static async archiveList(id: string, isArchived: boolean): Promise<List> {
    const response = await $put<ApiResponse<List>>(
      `${API_ENDPOINTS.LISTS.DETAIL(id)}/archive`,
      { isArchived }
    );
    return response.data.data;
  }
}

export default BoardService;
