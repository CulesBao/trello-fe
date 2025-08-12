import { defineStore } from 'pinia'

export interface NotificationLogItem {
  id: string
  message: string
  action?: string
  createdAt: number
}

interface State {
  items: NotificationLogItem[]
}

export const useNotificationLogStore = defineStore('notificationLog', {
  state: (): State => ({ items: [] }),
  getters: {
    recent: (s) => [...s.items].sort((a, b) => b.createdAt - a.createdAt),
  },
  actions: {
    add(message: string, action?: string) {
      const item: NotificationLogItem = {
        id: crypto.randomUUID(),
        message,
        action,
        createdAt: Date.now(),
      }
      this.items.unshift(item)
      if (this.items.length > 200) this.items.pop()
    },
    clear() {
      this.items = []
    },
  },
})
