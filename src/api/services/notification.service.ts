import { $get, $put, $delete } from '../axios.client';
import { API_ENDPOINTS } from '../constants/endpoints';
import type { Notification } from '../types/misc';
import type { ApiResponse } from '../types/common';

export class NotificationService {
  /**
   * Lấy danh sách thông báo
   */
  static async getNotifications(): Promise<Notification[]> {
    const response = await $get<ApiResponse<Notification[]>>(
      API_ENDPOINTS.NOTIFICATIONS.LIST
    );
    return response.data.data;
  }

  /**
   * Đánh dấu thông báo đã đọc
   */
  static async markNotificationAsRead(id: string): Promise<void> {
    await $put<ApiResponse<void>>(
      API_ENDPOINTS.NOTIFICATIONS.MARK_READ(id)
    );
  }

  /**
   * Đánh dấu tất cả thông báo đã đọc
   */
  static async markAllNotificationsAsRead(): Promise<void> {
    await $put<ApiResponse<void>>(
      API_ENDPOINTS.NOTIFICATIONS.MARK_ALL_READ
    );
  }

  /**
   * Xóa thông báo
   */
  static async deleteNotification(id: string): Promise<void> {
    await $delete<ApiResponse<void>>(
      API_ENDPOINTS.NOTIFICATIONS.DELETE(id)
    );
  }

  /**
   * Lấy số lượng thông báo chưa đọc
   */
  static async getUnreadNotificationCount(): Promise<number> {
    const response = await $get<ApiResponse<{ count: number }>>(
      `${API_ENDPOINTS.NOTIFICATIONS.LIST}/unread-count`
    );
    return response.data.data.count;
  }

  /**
   * Lấy thông báo realtime (WebSocket hoặc Server-Sent Events)
   */
  static async subscribeToNotifications(): Promise<EventSource> {
    // Implement SSE or WebSocket connection
    const eventSource = new EventSource(`${API_ENDPOINTS.NOTIFICATIONS.LIST}/stream`);
    return eventSource;
  }
}

export default NotificationService;
