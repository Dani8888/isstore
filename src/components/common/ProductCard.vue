<template>
  <div class="product-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
    <img 
      :src="product.image" 
      :alt="product.title"
      class="w-full h-48 object-contain p-4 bg-white"
      @error="handleImageError"
    />
    <div class="p-4">
      <h3 class="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
        {{ product.title || 'No Title' }}
      </h3>
      <p class="text-gray-600 text-sm mb-3 line-clamp-2">{{ product.description || 'No description' }}</p>
      <div class="flex justify-between items-center mb-3">
        <span class="text-2xl font-bold text-blue-600">${{ product.price || 0 }}</span>
        <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full capitalize">
          {{ product.category || 'uncategorized' }}
        </span>
      </div>
      <div class="flex space-x-2">
        <button 
          v-if="showAddToCart"
          @click="addToCart"
          class="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition duration-200 flex items-center justify-center text-sm font-medium"
          style="min-height: 42px;"
        >
          {{ $t('products.addToCart') }}
        </button>
        <button 
          v-if="showEdit"
          @click="handleEdit"
          class="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded transition duration-200 flex items-center justify-center text-sm font-medium"
          style="min-height: 42px;"
        >
          {{ $t('common.edit') }}
        </button>
        <button 
          v-if="showDelete"
          @click="handleDelete"
          class="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition duration-200 flex items-center justify-center text-sm font-medium"
          style="min-height: 42px;"
        >
          {{ $t('common.delete') }}
        </button>
        <router-link 
          v-if="showDetail"
          :to="`/product/${product.id}`"
          class="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded text-center transition duration-200 flex items-center justify-center text-sm font-medium"
          style="min-height: 42px;"
        >
          {{ $t('common.detail') }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'

export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true,
      default: () => ({})
    },
    showAddToCart: {
      type: Boolean,
      default: false
    },
    showEdit: {
      type: Boolean,
      default: false
    },
    showDelete: {
      type: Boolean,
      default: false
    },
    showDetail: {
      type: Boolean,
      default: false
    }
  },
  emits: ['edit', 'delete'],
  setup(props, { emit }) {
    const store = useStore()

    const addToCart = () => {
      console.log('➕ Adding to cart:', props.product.title)
      // HANYA dispatch ke store, TIDAK emit event
      store.dispatch('addToCart', props.product)
      
      // Show notification langsung dari sini
      if (window.showNotification) {
        window.showNotification(`"${props.product.title}" added to cart!`, 'success')
      }
    }

    const handleEdit = () => {
      console.log('✏️ Editing product:', props.product.id)
      emit('edit', props.product)
    }

    const handleDelete = () => {
      console.log('🗑️ Deleting product:', props.product.id)
      emit('delete', props.product.id)
    }

    const handleImageError = (event) => {
      console.error('🖼️ Image failed to load:', props.product.image)
      event.target.src = 'https://via.placeholder.com/300x300?text=No+Image'
    }

    return {
      addToCart,
      handleEdit,
      handleDelete,
      handleImageError
    }
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-card {
  min-height: 400px;
}

/* Ensure all buttons have the same height and alignment */
.flex-1 {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>