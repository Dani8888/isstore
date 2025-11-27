<template>
  <ErrorBoundary>
     <div id="app" class="min-h-screen template-transition" :style="{ backgroundColor: 'var(--color-background)', color: 'var(--color-text)' }">
      <Navbar v-if="isAuthenticated && user" />
      
      <!-- ADD TEMPLATE SWITCHER TO NAVBAR -->
      <div v-if="isAuthenticated" class="fixed bottom-4 right-4 z-40">
        <TemplateSwitcher />
      </div>
	  
      <main :class="['container mx-auto px-4', isAuthenticated ? 'py-8' : 'py-0']">
        <router-view />
      </main>
      <LoadingSpinner v-if="isLoading" />
      
      <!-- Global Notifications -->
      <div class="fixed top-4 right-4 z-50 space-y-2">
        <div 
          v-for="notification in notifications" 
          :key="notification.id"
          class="bg-white rounded-lg shadow-lg border-l-4 p-4 max-w-sm transform transition-all duration-300"
          :class="[
            notification.type === 'success' ? 'border-green-500' :
            notification.type === 'error' ? 'border-red-500' :
            notification.type === 'warning' ? 'border-yellow-500' : 'border-blue-500',
            notification.visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
          ]"
        >
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg 
                class="h-5 w-5" 
                :class="[
                  notification.type === 'success' ? 'text-green-500' :
                  notification.type === 'error' ? 'text-red-500' :
                  notification.type === 'warning' ? 'text-yellow-500' : 'text-blue-500'
                ]" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path 
                  v-if="notification.type === 'success'" 
                  fill-rule="evenodd" 
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                  clip-rule="evenodd" 
                />
                <path 
                  v-if="notification.type === 'error'" 
                  fill-rule="evenodd" 
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" 
                  clip-rule="evenodd" 
                />
                <path 
                  v-if="notification.type === 'info' || notification.type === 'warning'" 
                  fill-rule="evenodd" 
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" 
                  clip-rule="evenodd" 
                />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-gray-800">
                {{ notification.message }}
              </p>
            </div>
            <div class="ml-auto pl-3">
              <button 
                @click="removeNotification(notification.id)" 
                class="inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ErrorBoundary>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import Navbar from './components/common/Navbar.vue'
import LoadingSpinner from './components/common/LoadingSpinner.vue'
import ErrorBoundary from './components/common/ErrorBoundary.vue'
import TemplateSwitcher from './components/common/TemplateSwitcher.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    LoadingSpinner,
    ErrorBoundary,
    TemplateSwitcher  
  },
  setup() {
    const store = useStore()
    const notifications = ref([])

    // Function to show notification
    const showNotification = (message, type = 'success', duration = 3000) => {
      const id = Date.now() + Math.random()
      const notification = {
        id,
        message,
        type,
        duration,
        visible: false
      }
      
      notifications.value.push(notification)
      
      // Show animation
      setTimeout(() => {
        const notifIndex = notifications.value.findIndex(n => n.id === id)
        if (notifIndex !== -1) {
          notifications.value[notifIndex].visible = true
        }
      }, 100)
      
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
        // Trigger hide animation
        notifications.value[index].visible = false
        
        // Remove from array after animation
        setTimeout(() => {
          const newIndex = notifications.value.findIndex(n => n.id === id)
          if (newIndex !== -1) {
            notifications.value.splice(newIndex, 1)
          }
        }, 300)
      }
    }

    // Global event listener for notifications
    const handleNotificationEvent = (event) => {
      const { message, type, duration } = event.detail
      showNotification(message, type, duration)
    }

    // Make showNotification available globally
    onMounted(() => {
      // Add to window object so components can access it
      window.showNotification = showNotification
      
      // Add event listener for custom events
      window.addEventListener('show-notification', handleNotificationEvent)
    })

    onUnmounted(() => {
      // Cleanup
      window.removeEventListener('show-notification', handleNotificationEvent)
      delete window.showNotification
    })

    return {
      isLoading: computed(() => store.state.isLoading),
      isAuthenticated: computed(() => store.getters.isAuthenticated),
      user: computed(() => store.state.user),
      notifications,
      showNotification,
      removeNotification
    }
  }
}
</script>