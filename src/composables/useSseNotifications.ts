import { onMounted, onBeforeUnmount } from 'vue'
import { toast } from 'vue3-toastify'
import { useNotificationLogStore } from '@/stores/notificationLog'

interface RawEvent {
  action?: string
  user?: { name?: string }
  workspace?: { name?: string }
  board?: { name?: string }
  list?: { name?: string }
  card?: { title?: string }
  comment?: { content?: string }
  checkList?: { content?: string }
  affectedUser?: { name?: string }
  createAt?: string
  [k: string]: unknown
}

function buildMessage(o: RawEvent): string {
  const actor = o.user?.name || 'Someone'
  const at = o.createAt ? ` at ${new Date(o.createAt).toLocaleString()}` : ''
  switch (o.action) {
    case 'create workspace':
      return `${actor} created workspace ${o.workspace?.name}${at}`
    case 'delete workspace':
      return `${actor} deleted workspace ${o.workspace?.name}${at}`
    case 'update workspace':
      return `${actor} updated workspace ${o.workspace?.name}${at}`
    case 'create board':
      return `${actor} created board ${o.board?.name}${at}`
    case 'delete board':
      return `${actor} deleted board ${o.board?.name}${at}`
    case 'update board':
      return `${actor} updated board ${o.board?.name}${at}`
    case 'create list':
      return `${actor} created list ${o.list?.name}${at}`
    case 'delete list':
      return `${actor} deleted list${at}`
    case 'update list':
      return `${actor} updated list ${o.list?.name}${at}`
    case 'create card':
      return `${actor} created card ${o.card?.title} in list ${o.list?.name}${at}`
    case 'delete card':
      return `${actor} deleted card from list ${o.list?.name}${at}`
    case 'update card':
      return `${actor} updated card ${o.card?.title}${at}`
    case 'create comment':
      return `${actor} commented ${o.comment?.content} on card ${o.card?.title}${at}`
    case 'delete comment':
      return `${actor} deleted comment on card ${o.card?.title}${at}`
    case 'update comment':
      return `${actor} updated comment on card ${o.card?.title}${at}`
    case 'create checklist':
      return `${actor} created checklist ${o.checkList?.content} on card ${o.card?.title}${at}`
    case 'delete checklist':
      return `${actor} deleted checklist from card ${o.card?.title}${at}`
    case 'update checklist':
      return `${actor} updated checklist on card ${o.card?.title}${at}`
    case 'create attachment':
      return `${actor} added attachment to card ${o.card?.title}${at}`
    case 'delete attachment':
      return `${actor} deleted attachment from card ${o.card?.title}${at}`
    case 'add new member':
      return `${actor} added ${o.affectedUser?.name} to board${at}`
    case 'remove member':
      return `${actor} removed ${o.affectedUser?.name} from board${at}`
    case 'add admin':
      return `${actor} added ${o.affectedUser?.name} as admin${at}`
    case 'remove admin':
      return `${actor} removed ${o.affectedUser?.name} as admin${at}`
    default:
      return 'Connected to notification stream'
  }
}

export function useSseNotifications(url?: string) {
  const logStore = useNotificationLogStore()
  let es: EventSource | null = null

  const connect = () => {
    if (es) return
    try {
      const urlParams = new URLSearchParams(window.location.search)
      const token1 = urlParams.get('token')
      const token2 = JSON.parse(localStorage.getItem('accessToken') || '')
      const token = token1 || token2
      if (!token) throw new Error('Token not found')
      const target = url || `http://localhost:3000/api/notifications/${token}`
      es = new EventSource(target)
      es.onmessage = (event) => {
        try {
          const data: RawEvent = JSON.parse(event.data)
          const message = buildMessage(data)
          toast.info(message)
          logStore.add(message, data.action)
        } catch {
          toast.error('Failed to parse notification')
        }
      }
      es.onerror = () => {
        toast.error('Notification stream error')
        es?.close()
        es = null
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Notification init failed'
      toast.error(message)
    }
  }

  onMounted(connect)
  onBeforeUnmount(() => es?.close())

  return { connect }
}
