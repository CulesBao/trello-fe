import { $delete, $post } from '../axios.client'
import type { UploadAttachment } from '../types/attachment'

export class AttachmentService {
  static async uploadAttachment(uploadAttachment: UploadAttachment): Promise<void> {
    const formData = new FormData()
    formData.append('cardId', String(uploadAttachment.cardId))
    formData.append('file', uploadAttachment.file)
    await $post(`/attachments`, formData)
  }

  static async deleteAttachment(attachmentId: string): Promise<void> {
    await $delete(`/attachments/${attachmentId}`)
  }
}
