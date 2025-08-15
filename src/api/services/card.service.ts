import { $get, $post, $put, $delete } from '../axios.client'
import { API_ENDPOINTS } from '../constants/endpoints'
import type { Card, CreateCardRequest, UpdateCardRequest } from '../types/card'
import type { ApiResponse } from '../types/common'

export class CardService {
  static async getCardById(id: string): Promise<Card> {
    const response = await $get<ApiResponse<Card>>(API_ENDPOINTS.CARDS.DETAIL(id))
    return response.data.data
  }

  static async createCard(data: CreateCardRequest): Promise<Card> {
    const response = await $post<ApiResponse<Card>>(API_ENDPOINTS.CARDS.CREATE, data)
    return response.data.data
  }
  static async updateCard(id: string, data: UpdateCardRequest): Promise<Card> {
    const response = await $put<ApiResponse<Card>>(API_ENDPOINTS.CARDS.UPDATE(id), data)
    return response.data.data
  }

  static async deleteCard(id: string): Promise<void> {
    await $delete<ApiResponse<void>>(API_ENDPOINTS.CARDS.DELETE(id))
  }
}

export default CardService
