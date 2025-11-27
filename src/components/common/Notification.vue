<template>
  <div v-if="show" class="fixed top-4 right-4 z-50 transition-all duration-300" :class="notificationClass">
    <div class="bg-white rounded-lg shadow-lg border-l-4 p-4 max-w-sm" :class="borderColor">
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5" :class="iconColor" fill="currentColor" viewBox="0 0 20 20">
            <path v-if="type === 'success'" fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            <path v-if="type === 'error'" fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            <path v-if="type === 'info'" fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <p class="text-sm font-medium text-gray-800">
            {{ message }}
          </p>
        </div>
        <div class="ml-auto pl-3">
          <button @click="close" class="inline-flex text-gray-400 hover:text-gray-500">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'

export default {
  name: 'Notification',
  props: {
    type: {
      type: String,
      default: 'success',
      validator: (value) => ['success', 'error', 'info', 'warning'].includes(value)
    },
    message: {
      type: String,
      required: true
    },
    duration: {
      type: Number,
      default: 3000
    }
  },
  emits: ['close'],
  setup(props, { emit }) {
    const show = ref(false)

    const notificationClass = computed(() => {
      return show.value ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    })

    const borderColor = computed(() => {
      const colors = {
        success: 'border-green-500',
        error: 'border-red-500',
        info: 'border-blue-500',
        warning: 'border-yellow-500'
      }
      return colors[props.type] || colors.success
    })

    const iconColor = computed(() => {
      const colors = {
        success: 'text-green-500',
        error: 'text-red-500',
        info: 'text-blue-500',
        warning: 'text-yellow-500'
      }
      return colors[props.type] || colors.success
    })

    const close = () => {
      show.value = false
      setTimeout(() => {
        emit('close')
      }, 300)
    }

    onMounted(() => {
      // Show notification
      setTimeout(() => {
        show.value = true
      }, 100)

      // Auto close after duration
      if (props.duration > 0) {
        setTimeout(() => {
          close()
        }, props.duration)
      }
    })

    return {
      show,
      notificationClass,
      borderColor,
      iconColor,
      close
    }
  }
}
</script>