// API Endpoints Constants
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    UPDATE_PROFILE: '/auth/profile',
    CHANGE_PASSWORD: '/auth/change-password',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },

  // User Management
  USERS: {
    LIST: '/users',
    DETAIL: (id: string) => `/user/${id}`,
    CREATE: '/users',
    UPDATE: (id: string) => `/users/${id}`,
    DELETE: (id: string) => `/users/${id}`,
    SEARCH: '/users/search',
  },

  // Board Management
  BOARDS: {
    LIST: '/boards',
    DETAIL: (id: string) => `/boards/${id}`,
    CREATE: '/boards',
    UPDATE: (id: string) => `/boards/${id}`,
    DELETE: (id: string) => `/boards/${id}`,
    MEMBERS: (id: string) => `/boards/${id}/members`,
    ADD_MEMBER: (id: string) => `/boards/${id}/members`,
    REMOVE_MEMBER: (boardId: string, userId: string) => `/boards/${boardId}/members/${userId}`,
  },

  // List Management
  LISTS: {
    LIST: '/lists',
    DETAIL: (id: string) => `/lists/${id}`,
    CREATE: '/lists',
    UPDATE: (id: string) => `/lists/${id}`,
    DELETE: (id: string) => `/lists/${id}`,
    BY_BOARD: (boardId: string) => `/boards/${boardId}/lists`,
    REORDER: (id: string) => `/lists/${id}/reorder`,
  },

  // Card Management
  CARDS: {
    LIST: '/cards',
    DETAIL: (id: string) => `/cards/${id}`,
    CREATE: '/cards',
    UPDATE: (id: string) => `/cards/${id}`,
    DELETE: (id: string) => `/cards/${id}`,
    BY_LIST: (listId: string) => `/lists/${listId}/cards`,
    MOVE: (id: string) => `/cards/${id}/move`,
    ASSIGN_MEMBER: (id: string) => `/cards/${id}/members`,
    REMOVE_MEMBER: (cardId: string, userId: string) => `/cards/${cardId}/members/${userId}`,
    COMMENTS: (id: string) => `/cards/${id}/comments`,
    ATTACHMENTS: (id: string) => `/cards/${id}/attachments`,
  },

  // Comment Management
  COMMENTS: {
    LIST: '/comments',
    DETAIL: (id: string) => `/comments/${id}`,
    CREATE: '/comments',
    UPDATE: (id: string) => `/comments/${id}`,
    DELETE: (id: string) => `/comments/${id}`,
  },

  // File/Attachment Management
  FILES: {
    UPLOAD: '/files/upload',
    DOWNLOAD: (id: string) => `/files/${id}/download`,
    DELETE: (id: string) => `/files/${id}`,
  },

  // Activity/History
  ACTIVITIES: {
    LIST: '/activities',
    BY_BOARD: (boardId: string) => `/boards/${boardId}/activities`,
    BY_CARD: (cardId: string) => `/cards/${cardId}/activities`,
  },

  // Notifications
  NOTIFICATIONS: {
    LIST: '/notifications',
    MARK_READ: (id: string) => `/notifications/${id}/read`,
    MARK_ALL_READ: '/notifications/read-all',
    DELETE: (id: string) => `/notifications/${id}`,
  },

  WORKSPACES: {
    LIST: '/workspaces',
    DETAIL: (id: string) => `/workspaces/${id}`,
    CREATE: '/workspaces',
    UPDATE: (id: string) => `/workspaces/${id}`,
    DELETE: (id: string) => `/workspaces/${id}`,
    MEMBERS: (id: string) => `/workspaces/${id}/members`,
    ADD_MEMBER: (id: string) => `/workspaces/${id}/members`,
    REMOVE_MEMBER: (workspaceId: string, userId: string) =>
      `/workspaces/${workspaceId}/members/${userId}`,
    BOARDS: (id: string) => `/workspaces/${id}/boards`,
  },
} as const
