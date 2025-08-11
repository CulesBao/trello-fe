import { defineStore } from 'pinia'

export interface AppNotification {
  id: string
  message: string
  type?: 'info' | 'success' | 'warning' | 'error'
  createdAt: number
  ttl?: number
}

interface State {
  items: AppNotification[]
}

export const useNotificationStore = defineStore('notifications', {
  state: (): State => ({ items: [] }),
  getters: {
    ordered: (s) => [...s.items].sort((a, b) => b.createdAt - a.createdAt),
  },
  actions: {
    push(message: string, type: AppNotification['type'] = 'info', ttl = 5000) {
      const id = crypto.randomUUID()
      const n: AppNotification = { id, message, type, createdAt: Date.now(), ttl }
      this.items.push(n)
      if (ttl > 0) {
        setTimeout(() => this.remove(id), ttl)
      }
      return id
    },
    remove(id: string) {
      this.items = this.items.filter((n) => n.id !== id)
    },
    clear() {
      this.items = []
    },
  },
})
