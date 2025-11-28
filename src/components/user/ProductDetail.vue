<template>
  <div class="max-w-6xl mx-auto">
    <!-- Breadcrumb -->
    <nav class="mb-6">
      <ol class="flex items-center space-x-2 text-sm" style="color: var(--color-text-secondary)">
        <li>
          <router-link 
            to="/user" 
            class="hover:opacity-75 transition duration-200"
            :style="{ color: 'var(--color-primary)' }"
          >
            {{ $t('nav.products') }}
          </router-link>
        </li>
        <li class="flex items-center">
          <span class="mx-2">›</span>
          <span>{{ $t('products.productDetails') }}</span>
        </li>
      </ol>
    </nav>

    <div v-if="product" class="card">
      <div class="md:flex">
        <!-- Product Image -->
        <div class="md:w-1/2 p-8" :style="{ backgroundColor: 'var(--color-background)' }">
          <img 
            :src="product.image" 
            :alt="product.title"
            class="w-full h-96 object-contain"
          />
        </div>
        
        <!-- Product Info -->
        <div class="md:w-1/2 p-8">
          <div class="mb-4">
            <span 
              class="text-sm px-3 py-1 rounded-full capitalize"
              :style="{
                backgroundColor: 'var(--color-primary)',
                color: 'white'
              }"
            >
              {{ product.category }}
            </span>
          </div>
          
          <h1 class="text-3xl font-bold mb-4" style="color: var(--color-text)">{{ product.title }}</h1>
          
          <div class="flex items-center mb-4">
            <div class="flex text-yellow-400 mr-2">
              <span v-for="star in 5" :key="star" class="text-xl">
                {{ star <= Math.round(product.rating?.rate) ? '★' : '☆' }}
              </span>
            </div>
            <span class="ml-2" style="color: var(--color-text-secondary)">
              {{ product.rating?.rate }} ({{ product.rating?.count }} {{ $t('common.reviews') }})
            </span>
          </div>
          
          <p class="text-lg mb-6 leading-relaxed" style="color: var(--color-text-secondary)">{{ product.description }}</p>
          
          <div class="flex items-center justify-between mb-6">
            <span class="text-4xl font-bold" style="color: var(--color-primary)">${{ product.price }}</span>
            <span class="font-semibold flex items-center" style="color: var(--color-success)">
              <svg class="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              {{ $t('products.inStock') }}
            </span>
          </div>
          
          <!-- Desktop Button Layout -->
          <div class="hidden sm:flex space-x-4">
            <button 
              @click="addToCart"
              class="flex-1 py-3 px-6 rounded-lg text-lg font-semibold transition duration-200 flex items-center justify-center text-white hover:opacity-90"
              :style="{
                backgroundColor: 'var(--color-primary)'
              }"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {{ $t('products.addToCart') }}
            </button>
            <router-link 
              to="/user"
              class="py-3 px-6 rounded-lg text-lg font-semibold transition duration-200 flex items-center justify-center hover:opacity-90"
              :style="{
                backgroundColor: 'var(--color-surface)',
                color: 'var(--color-text)',
                border: '2px solid var(--color-primary)'
              }"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              {{ $t('common.back') }}
            </router-link>
          </div>

          <!-- Mobile Button Layout (di bawah 450px) -->
          <div class="sm:hidden flex flex-col space-y-3">
            <!-- Tombol Add to Cart di ATAS untuk mobile -->
            <button 
              @click="addToCart"
              class="w-full py-4 px-6 rounded-lg text-lg font-semibold transition duration-200 flex items-center justify-center text-white hover:opacity-90"
              :style="{
                backgroundColor: 'var(--color-primary)'
              }"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {{ $t('products.addToCart') }}
            </button>
            
            <!-- Tombol Back di BAWAH untuk mobile -->
            <router-link 
              to="/user"
              class="w-full py-4 px-6 rounded-lg text-lg font-semibold transition duration-200 flex items-center justify-center hover:opacity-90"
              :style="{
                backgroundColor: 'var(--color-surface)',
                color: 'var(--color-text)',
                border: '2px solid var(--color-primary)'
              }"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              {{ $t('common.back') }}
            </router-link>
          </div>

          <!-- Additional Info -->
          <div class="mt-8 pt-6" :style="{ borderTop: '1px solid var(--color-border)' }">
            <h3 class="text-lg font-semibold mb-4" style="color: var(--color-text)">{{ $t('common.productInfo') }}</h3>
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span class="font-medium" style="color: var(--color-text-secondary)">{{ $t('products.category') }}:</span>
                <span class="ml-2 capitalize" style="color: var(--color-text)">{{ product.category }}</span>
              </div>
              <div>
                <span class="font-medium" style="color: var(--color-text-secondary)">{{ $t('products.rating') }}:</span>
                <span class="ml-2" style="color: var(--color-text)">{{ product.rating?.rate }}/5 ({{ product.rating?.count }} {{ $t('common.reviews') }})</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Loading State -->
    <div v-else-if="isLoading" class="card text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto" :style="{ borderColor: 'var(--color-primary)' }"></div>
      <p class="mt-4" style="color: var(--color-text-secondary)">{{ $t('common.loading') }}...</p>
    </div>
    
    <!-- Error State -->
    <div v-else class="card text-center py-12">
      <svg class="w-24 h-24 mx-auto mb-4" :style="{ color: 'var(--color-text-secondary)' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
      <h3 class="text-lg font-medium mb-2" style="color: var(--color-text)">{{ $t('products.productNotFound') }}</h3>
      <p class="mb-4" style="color: var(--color-text-secondary)">{{ $t('products.productNotExist') }}</p>
      <router-link 
        to="/user"
        class="inline-block py-2 px-4 rounded-lg font-semibold transition duration-200 text-white hover:opacity-90"
        :style="{
          backgroundColor: 'var(--color-primary)'
        }"
      >
        {{ $t('nav.products') }}
      </router-link>
    </div>

    <!-- Add to Cart Success Popup -->
    <div 
      v-if="showAddToCartPopup"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div 
        class="bg-white rounded-lg shadow-xl max-w-sm w-full p-6 transform transition-all duration-300"
        :style="{
          backgroundColor: 'var(--color-surface)',
          color: 'var(--color-text)',
          boxShadow: 'var(--shadow)'
        }"
      >
        <div class="text-center">
          <div 
            class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            :style="{ backgroundColor: 'var(--color-success)' }"
          >
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 class="text-xl font-bold mb-2" style="color: var(--color-text)">{{ $t('common.success') }}!</h3>
          <p class="mb-6" style="color: var(--color-text-secondary)">
            "{{ lastAddedProduct?.title }}" {{ $t('cart.itemAdded') }}
          </p>
          <div class="flex space-x-3 items-stretch min-h-[44px]">
            <button 
              @click="continueShopping"
              class="flex-1 py-3 px-4 rounded-lg font-semibold transition duration-200 hover:opacity-90 text-white flex items-center justify-center"
              :style="{
                backgroundColor: 'var(--color-primary)'
              }"
            >
              {{ $t('cart.continueShopping') }}
            </button>
            <router-link 
              to="/cart"
              @click="showAddToCartPopup = false"
              class="flex-1 py-3 px-4 rounded-lg font-semibold text-center transition duration-200 hover:opacity-90 text-white flex items-center justify-center"
              :style="{
                backgroundColor: 'var(--color-success)'
              }"
            >
              {{ $t('nav.cart') }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, getCurrentInstance } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { productsAPI } from '../../services/api'

export default {
  name: 'ProductDetail',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const { proxy } = getCurrentInstance()
    
    const product = ref(null)
    const isLoading = ref(true)
    const showAddToCartPopup = ref(false)
    const lastAddedProduct = ref(null)

    const loadProduct = async () => {
      try {
        isLoading.value = true
        const response = await productsAPI.getById(route.params.id)
        product.value = response.data
      } catch (error) {
        console.error('Error loading product:', error)
        product.value = null
      } finally {
        isLoading.value = false
      }
    }

    const addToCart = () => {
      if (product.value) {
        store.dispatch('addToCart', product.value)
        lastAddedProduct.value = product.value
        showAddToCartPopup.value = true
        
        if (window.showNotification) {
          const message = `"${product.value.title}" ${proxy.$t('cart.itemAdded')}`
          window.showNotification(message, 'success')
        }
      }
    }

    const continueShopping = () => {
      showAddToCartPopup.value = false
      lastAddedProduct.value = null
    }

    onMounted(() => {
      loadProduct()
    })

    return {
      product,
      isLoading,
      showAddToCartPopup,
      lastAddedProduct,
      addToCart,
      continueShopping
    }
  }
}
</script>

<style scoped>
.card {
  background-color: var(--color-surface);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  border: 1px solid var(--color-border);
}

/* Responsive adjustments untuk mobile kecil */
@media (max-width: 450px) {
  .p-8 {
    padding: 1rem;
  }
  
  h1.text-3xl {
    font-size: 1.5rem;
  }
  
  .text-4xl {
    font-size: 2rem;
  }
  
  .text-lg {
    font-size: 1rem;
  }
  
  .py-4 {
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
  }
  
  .px-6 {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>