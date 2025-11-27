import { ref } from 'vue'

const notifications = ref([])

export function useNotification() {
  const showNotification = (message, type = 'success', duration = 3000) => {
    const id = Date.now() + Math.random()
    const notification = {
      id,
      message,
      type,
      duration
    }
    
    notifications.value.push(notification)
    
    // Auto remove after duration
    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id)
      }, duration)
    }
    
    return id
  }

  const removeNotification = (id) => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index !== -1) {
      notifications.value.splice(index, 1)
    }
  }

  return {
    notifications,
    showNotification,
    removeNotification
  }
}