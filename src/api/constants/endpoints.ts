// API Endpoints Constants
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
  },

  USERS: {
    LIST: '/users',
    DETAIL: (id: string) => `/user/${id}`
  },

  BOARDS: {
    LIST: '/boards',
    DETAIL: (id: string) => `/boards/${id}`,
    CREATE: '/boards',
    UPDATE: (id: string) => `/boards/${id}`,
    DELETE: (id: string) => `/boards/${id}`,
    ADD_MEMBER: (id: string) => `/boards/${id}/members`,
    REMOVE_MEMBER: (boardId: string, userId: string) => `/boards/${boardId}/members/${userId}`,
  },

  LISTS: {
    CREATE: '/lists',
    UPDATE: (id: string) => `/lists/${id}`,
    DELETE: (id: string) => `/lists/${id}`,
  },

  CARDS: {
    DETAIL: (id: string) => `/cards/${id}`,
    CREATE: '/cards',
    UPDATE: (id: string) => `/cards/${id}`,
    DELETE: (id: string) => `/cards/${id}`,
  },

  COMMENTS: {
    CREATE: '/comments',
    UPDATE: (id: string) => `/comments/${id}`,
    DELETE: (id: string) => `/comments/${id}`,
  },

  WORKSPACES: {
    LIST: '/workspaces',
    DETAIL: (id: string) => `/workspaces/${id}`,
    CREATE: '/workspaces',
    UPDATE: (id: string) => `/workspaces/${id}`,
    DELETE: (id: string) => `/workspaces/${id}`,
    ADD_MEMBER: (id: string) => `/workspaces/${id}/members`,
    REMOVE_MEMBER: (workspaceId: string, userId: string) =>
      `/workspaces/${workspaceId}/members/${userId}`,
  },
} as const
