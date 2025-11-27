<template>
  <div v-if="hasError" class="error-boundary">
    <div class="error-container">
      <svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
      <h2 class="error-title">Something went wrong</h2>
      <p class="error-message">{{ errorMessage }}</p>
      <div class="error-actions">
        <button @click="reloadPage" class="btn-primary">
          Reload Page
        </button>
        <button @click="goHome" class="btn-secondary">
          Go Home
        </button>
        <button v-if="showDetails" @click="showDetails = false" class="btn-secondary">
          Hide Details
        </button>
        <button v-else @click="showDetails = true" class="btn-secondary">
          Show Details
        </button>
      </div>
      <div v-if="showDetails" class="error-details">
        <h3>Error Details:</h3>
        <pre class="error-stack">{{ errorStack }}</pre>
      </div>
    </div>
  </div>
  <slot v-else></slot>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'ErrorBoundary',
  props: {
    fallback: {
      type: Function,
      default: null
    },
    maxRetries: {
      type: Number,
      default: 3
    }
  },
  setup(props, { slots }) {
    const hasError = ref(false)
    const error = ref(null)
    const showDetails = ref(false)
    const retryCount = ref(0)
    const router = useRouter()

    const errorMessage = ref('')
    const errorStack = ref('')

    const handleError = (err, info) => {
      console.error('Error caught by boundary:', err)
      
      hasError.value = true
      error.value = err
      errorMessage.value = err.message || 'An unexpected error occurred'
      errorStack.value = err.stack || 'No stack trace available'

      if (props.fallback) {
        props.fallback(err, info)
      }
    }

    const reloadPage = () => {
      window.location.reload()
    }

    const goHome = () => {
      router.push('/')
    }

    const retry = () => {
      if (retryCount.value < props.maxRetries) {
        retryCount.value++
        resetError()
      } else {
        alert('Maximum retry attempts reached. Please reload the page.')
      }
    }

    const resetError = () => {
      hasError.value = false
      error.value = null
      errorMessage.value = ''
      errorStack.value = ''
      showDetails.value = false
    }

    return {
      hasError,
      errorMessage,
      errorStack,
      showDetails,
      retryCount,
      handleError,
      reloadPage,
      goHome,
      retry,
      resetError
    }
  },
  errorCaptured(err, instance, info) {
    this.handleError(err, info)
    return false
  }
}
</script>

<style scoped>
.error-boundary {
  @apply min-h-screen bg-gray-50 flex items-center justify-center p-4;
}

.error-container {
  @apply bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full text-center;
}

.error-icon {
  @apply w-16 h-16 text-red-500 mx-auto mb-4;
}

.error-title {
  @apply text-2xl font-bold text-gray-800 mb-2;
}

.error-message {
  @apply text-gray-600 mb-6;
}

.error-actions {
  @apply flex flex-wrap gap-3 justify-center mb-6;
}

.btn-primary {
  @apply bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition duration-200;
}

.btn-secondary {
  @apply bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition duration-200;
}

.error-details {
  @apply mt-4 p-4 bg-gray-100 rounded text-left;
}

.error-details h3 {
  @apply font-semibold text-gray-800 mb-2;
}

.error-stack {
  @apply text-xs text-gray-600 whitespace-pre-wrap overflow-auto max-h-60;
}
</style>