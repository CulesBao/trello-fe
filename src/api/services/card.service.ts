import { $get, $post, $put, $delete } from '../axios.client'
import { API_ENDPOINTS } from '../constants/endpoints'
import type {
  Card,
  CreateCardRequest,
  UpdateCardRequest,
  MoveCardRequest,
  AssignCardMemberRequest,
} from '../types/card'
import type { ApiResponse } from '../types/common'
import type { MiscComment, FileUploadResponse } from '../types/misc'

export class CardService {
  /**
   * Get all cards
   */
  static async getCards(): Promise<Card[]> {
    const response = await $get<ApiResponse<Card[]>>(API_ENDPOINTS.CARDS.LIST)
    return response.data.data
  }

  /**
   * Get cards in a list
   */
  static async getCardsByList(listId: string): Promise<Card[]> {
    const response = await $get<ApiResponse<Card[]>>(API_ENDPOINTS.CARDS.BY_LIST(listId))
    return response.data.data
  }

  /**
   * Lấy thông tin chi tiết card
   */
  static async getCardById(id: string): Promise<Card> {
    const response = await $get<ApiResponse<Card>>(API_ENDPOINTS.CARDS.DETAIL(id))
    return response.data.data
  }

  /**
   * Tạo card mới
   */
  static async createCard(data: CreateCardRequest): Promise<Card> {
    const response = await $post<ApiResponse<Card>>(API_ENDPOINTS.CARDS.CREATE, data)
    return response.data.data
  }

  /**
   * Cập nhật thông tin card
   */
  static async updateCard(id: string, data: UpdateCardRequest): Promise<Card> {
    const response = await $put<ApiResponse<Card>>(API_ENDPOINTS.CARDS.UPDATE(id), data)
    return response.data.data
  }

  /**
   * Xóa card
   */
  static async deleteCard(id: string): Promise<void> {
    await $delete<ApiResponse<void>>(API_ENDPOINTS.CARDS.DELETE(id))
  }

  /**
   * Di chuyển card
   */
  static async moveCard(id: string, data: MoveCardRequest): Promise<Card> {
    const response = await $put<ApiResponse<Card>>(API_ENDPOINTS.CARDS.MOVE(id), data)
    return response.data.data
  }

  /**
   * Gán thành viên cho card
   */
  static async assignMemberToCard(cardId: string, data: AssignCardMemberRequest): Promise<void> {
    await $post<ApiResponse<void>>(API_ENDPOINTS.CARDS.ASSIGN_MEMBER(cardId), data)
  }

  /**
   * Bỏ gán thành viên khỏi card
   */
  static async removeMemberFromCard(cardId: string, userId: string): Promise<void> {
    await $delete<ApiResponse<void>>(API_ENDPOINTS.CARDS.REMOVE_MEMBER(cardId, userId))
  }

  /**
   * Lấy danh sách Misccomments của card
   */
  static async getCardMiscComments(cardId: string): Promise<MiscComment[]> {
    const response = await $get<ApiResponse<MiscComment[]>>(API_ENDPOINTS.CARDS.COMMENTS(cardId))
    return response.data.data
  }

  static async uploadCardAttachment(cardId: string, file: File): Promise<FileUploadResponse> {
    const formData = new FormData()
    formData.append('file', file)
    const response = await $post<ApiResponse<FileUploadResponse>>(
      API_ENDPOINTS.CARDS.ATTACHMENTS(cardId),
      formData
    )
    return response.data.data
  }

  /**
   * Xóa file đính kèm của card
   */
  static async deleteCardAttachment(cardId: string, attachmentId: string): Promise<void> {
    await $delete<ApiResponse<void>>(`${API_ENDPOINTS.CARDS.ATTACHMENTS(cardId)}/${attachmentId}`)
  }
}

export default CardService
