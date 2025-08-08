import { $get, $post, $put, $delete } from '../axios.client'
import { API_ENDPOINTS } from '../constants/endpoints'
import type { MiscComment, MiscCreateCommentRequest, MiscUpdateCommentRequest } from '../types/misc'
import type { ApiResponse } from '../types/common'

export class CommentService {
  /**
   * Lấy comment theo id
   */
  static async getCommentById(id: string): Promise<Comment> {
    const response = await $get<ApiResponse<Comment>>(API_ENDPOINTS.COMMENTS.DETAIL(id))
    return response.data.data
  }

  /**
   * Tạo comment mới
   */
  static async createComment(data: MiscCreateCommentRequest): Promise<MiscComment> {
    const response = await $post<ApiResponse<MiscComment>>(API_ENDPOINTS.COMMENTS.CREATE, data)
    return response.data.data
  }

  /**
   * Cập nhật comment
   */
  static async updateComment(id: string, data: MiscUpdateCommentRequest): Promise<MiscComment> {
    const response = await $put<ApiResponse<MiscComment>>(API_ENDPOINTS.COMMENTS.UPDATE(id), data)
    return response.data.data
  }

  /**
   * Xóa comment
   */
  static async deleteComment(id: string): Promise<void> {
    await $delete<ApiResponse<void>>(API_ENDPOINTS.COMMENTS.DELETE(id))
  }
}

export default CommentService
