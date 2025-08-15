import { $get, $post, $put, $delete } from '../axios.client'
import { API_ENDPOINTS } from '../constants/endpoints'
import type {
  Board,
  CreateBoardRequest,
  UpdateBoardRequest,
  AddBoardMemberRequest,
} from '../types/board'
import type { ApiResponse } from '../types/common'

export class BoardService {
  static async getBoards(): Promise<Board[]> {
    const response = await $get<ApiResponse<Board[]>>(API_ENDPOINTS.BOARDS.LIST)
    return response.data.data
  }

  static async getBoardById(id: string): Promise<Board> {
    const response = await $get<ApiResponse<Board>>(API_ENDPOINTS.BOARDS.DETAIL(id))
    return response.data.data
  }

  static async createBoard(data: CreateBoardRequest): Promise<Board> {
    const response = await $post<ApiResponse<Board>>(API_ENDPOINTS.BOARDS.CREATE, data)
    return response.data.data
  }

  static async updateBoard(id: string, data: UpdateBoardRequest): Promise<Board> {
    const response = await $put<ApiResponse<Board>>(API_ENDPOINTS.BOARDS.UPDATE(id), data)
    return response.data.data
  }

  static async deleteBoard(id: string): Promise<void> {
    await $delete<ApiResponse<void>>(API_ENDPOINTS.BOARDS.DELETE(id))
  }

  static async addBoardMember(boardId: string, data: AddBoardMemberRequest): Promise<void> {
    await $post<ApiResponse<void>>(API_ENDPOINTS.BOARDS.ADD_MEMBER(boardId), data)
  }

  static async removeBoardMember(boardId: string, userId: string): Promise<void> {
    await $delete<ApiResponse<void>>(API_ENDPOINTS.BOARDS.REMOVE_MEMBER(boardId, userId))
  }
}
export default BoardService
