<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div 
      class="rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto"
      :style="{
        backgroundColor: 'var(--color-surface)',
        color: 'var(--color-text)',
        boxShadow: 'var(--shadow)',
        border: '1px solid var(--color-border)'
      }"
    >
      <div class="flex justify-between items-center p-6 border-b" :style="{ borderColor: 'var(--color-border)' }">
        <h2 class="text-xl font-semibold" :style="{ color: 'var(--color-text)' }">{{ title }}</h2>
        <button 
          @click="$emit('close')" 
          :style="{ color: 'var(--color-text-secondary)' }"
          class="hover:opacity-70 transition duration-200"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <!-- Konten Modal -->
      <div class="p-6">
        <slot></slot>
      </div>

      <!-- Tombol Actions Hanya untuk Modal Konfirmasi -->
      <div v-if="type === 'confirm'" class="flex justify-end space-x-3 p-6 border-t" :style="{ borderColor: 'var(--color-border)' }">
        <button 
          @click="$emit('close')" 
          class="px-4 py-2 rounded transition duration-200 border font-medium"
          :style="{
            backgroundColor: 'var(--color-surface)',
            color: 'var(--color-text)',
            borderColor: 'var(--color-border)'
          }"
        >
          {{ $t('common.cancel') }}
        </button>
        <button 
          @click="$emit('confirm')" 
          class="px-4 py-2 rounded transition duration-200 text-white font-medium hover:opacity-90"
          :style="{
            backgroundColor: 'var(--color-primary)'
          }"
        >
          {{ confirmText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'Modal Title'
    },
    type: {
      type: String,
      default: 'form',
      validator: (value) => ['form', 'confirm'].includes(value)
    },
    confirmText: {
      type: String,
      default: 'Confirm'
    }
  },
  emits: ['close', 'confirm']
}
</script>