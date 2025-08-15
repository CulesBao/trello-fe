import { $post, $put, $delete } from '../axios.client'
import { API_ENDPOINTS } from '../constants/endpoints'
import type { ApiResponse } from '../types/common'
import type { List } from '../types/list'
import type { CreateListRequest, UpdateListRequest } from '../types/list'

export class ListService {
  static async createList(data: CreateListRequest): Promise<List> {
    const response = await $post<ApiResponse<List>>(API_ENDPOINTS.LISTS.CREATE, data)
    return response.data.data
  }

  static async updateList(id: string, data: UpdateListRequest): Promise<List> {
    const response = await $put<ApiResponse<List>>(API_ENDPOINTS.LISTS.UPDATE(id), data)
    return response.data.data
  }

  static async deleteList(id: string): Promise<void> {
    await $delete<ApiResponse<void>>(API_ENDPOINTS.LISTS.DELETE(id))
  }
}

export default ListService
