import { $delete, $post, $put } from '../axios.client'
import { type ApiResponse } from '../types'
import type { CreateCheckList, UpdateCheckList } from '../types/checkLists'

export class CheckListService {
  static async createCheckList(createCheckList: CreateCheckList) {
    await $post<ApiResponse<void>>(`/checklists`, createCheckList)
  }

  static async updateCheckList(id: number, updateCheckList: UpdateCheckList) {
    await $put<ApiResponse<void>>(`/checklists/${id}`, updateCheckList)
  }

  static async deleteCheckList(id: number) {
    await $delete<ApiResponse<void>>(`/checklists/${id}`)
  }
}
