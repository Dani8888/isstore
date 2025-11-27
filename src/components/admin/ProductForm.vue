<template>
  <form @submit.prevent="$emit('save', formData)" class="space-y-4">
    <div>
      <label class="block text-sm font-medium mb-1" :style="{ color: 'var(--color-text)' }">{{ $t('products.title') }}</label>
      <input 
        v-model="formData.title"
        type="text" 
        required
        class="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 transition duration-200"
        :style="{
          backgroundColor: 'var(--color-surface)',
          color: 'var(--color-text)',
          borderColor: 'var(--color-border)',
          boxShadow: 'var(--shadow)'
        }"
        :placeholder="$t('products.enterTitle')"
      >
    </div>

    <div>
      <label class="block text-sm font-medium mb-1" :style="{ color: 'var(--color-text)' }">{{ $t('products.description') }}</label>
      <textarea 
        v-model="formData.description"
        rows="3"
        required
        class="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 transition duration-200"
        :style="{
          backgroundColor: 'var(--color-surface)',
          color: 'var(--color-text)',
          borderColor: 'var(--color-border)',
          boxShadow: 'var(--shadow)'
        }"
        :placeholder="$t('products.enterDescription')"
      ></textarea>
    </div>

    <div>
      <label class="block text-sm font-medium mb-1" :style="{ color: 'var(--color-text)' }">{{ $t('products.price') }}</label>
      <input 
        v-model.number="formData.price"
        type="number" 
        step="0.01"
        required
        class="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 transition duration-200"
        :style="{
          backgroundColor: 'var(--color-surface)',
          color: 'var(--color-text)',
          borderColor: 'var(--color-border)',
          boxShadow: 'var(--shadow)'
        }"
        :placeholder="$t('products.enterPrice')"
      >
    </div>

    <div>
      <label class="block text-sm font-medium mb-1" :style="{ color: 'var(--color-text)' }">{{ $t('products.category') }}</label>
      <select 
        v-model="formData.category"
        required
        class="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 transition duration-200"
        :style="{
          backgroundColor: 'var(--color-surface)',
          color: 'var(--color-text)',
          borderColor: 'var(--color-border)',
          boxShadow: 'var(--shadow)'
        }"
      >
        <option value="" :style="{ color: 'var(--color-text-secondary)' }">{{ $t('products.selectCategory') }}</option>
        <option 
          v-for="category in categories" 
          :key="category" 
          :value="category"
          :style="{ color: 'var(--color-text)' }"
        >
          {{ category }}
        </option>
      </select>
    </div>

    <div>
      <label class="block text-sm font-medium mb-1" :style="{ color: 'var(--color-text)' }">{{ $t('products.imageUrl') }}</label>
      <input 
        v-model="formData.image"
        type="url" 
        required
        class="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 transition duration-200"
        :style="{
          backgroundColor: 'var(--color-surface)',
          color: 'var(--color-text)',
          borderColor: 'var(--color-border)',
          boxShadow: 'var(--shadow)'
        }"
        :placeholder="$t('products.enterImageUrl')"
      >
    </div>

    <div class="flex justify-end space-x-3 pt-4">
      <button 
        type="button" 
        @click="$emit('cancel')"
        class="px-4 py-2 rounded transition duration-200 border font-medium"
        :style="{
          backgroundColor: 'var(--color-surface)',
          color: 'var(--color-text)',
          borderColor: 'var(--color-border)',
          boxShadow: 'var(--shadow)'
        }"
      >
        {{ $t('common.cancel') }}
      </button>
      <button 
        type="submit"
        class="px-4 py-2 rounded transition duration-200 text-white font-medium hover:opacity-90"
        :style="{
          backgroundColor: 'var(--color-primary)',
          boxShadow: 'var(--shadow)'
        }"
      >
        {{ formData.id ? $t('common.update') : $t('common.create') }} {{ $t('products.title') }}
      </button>
    </div>
  </form>
</template>

<script>
import { ref, watch, onMounted } from 'vue'
import { productsAPI } from '../../services/api'

export default {
  name: 'ProductForm',
  props: {
    product: {
      type: Object,
      default: null
    }
  },
  emits: ['save', 'cancel'],
  setup(props, { emit }) {
    const formData = ref({
      title: '',
      description: '',
      price: 0,
      category: '',
      image: ''
    })
    const categories = ref([])

    watch(() => props.product, (newProduct) => {
      if (newProduct) {
        formData.value = { ...newProduct }
      } else {
        // Reset form
        formData.value = {
          title: '',
          description: '',
          price: 0,
          category: '',
          image: ''
        }
      }
    }, { immediate: true })

    const loadCategories = async () => {
      try {
        const response = await productsAPI.getCategories()
        categories.value = response.data
      } catch (error) {
        console.error('Error loading categories:', error)
      }
    }

    onMounted(() => {
      loadCategories()
    })

    return {
      formData,
      categories
    }
  }
}
</script>