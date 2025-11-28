<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <!-- Header -->
    <div class="card">
      <div class="p-6 sm:p-8">
        <h1 class="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4" style="color: var(--color-text)">{{ $t('cart.shoppingCart') }}</h1>
        <p class="text-base sm:text-lg" style="color: var(--color-text-secondary)">{{ $t('cart.reviewItems') }}</p>
      </div>
    </div>

    <!-- Cart Items -->
    <div v-if="cartItems.length > 0" class="card">
      <div class="p-4 sm:p-6 lg:p-8">
        <div class="space-y-4 sm:space-y-6">
          <div 
            v-for="item in cartItems" 
            :key="item.id"
            class="cart-item border-b pb-4 sm:pb-6 last:border-0"
            :style="{ borderColor: 'var(--color-border)' }"
          >
            <!-- Desktop Layout -->
            <div class="hidden sm:flex items-center space-x-4 lg:space-x-6">
              <img 
                :src="item.image" 
                :alt="item.title"
                class="w-20 h-20 lg:w-24 lg:h-24 object-contain bg-white rounded-lg p-2"
                :style="{
                  border: '1px solid var(--color-border)'
                }"
              />
              <div class="flex-1 min-w-0">
                <h3 class="text-lg font-semibold mb-2 product-title" style="color: var(--color-text)">{{ item.title }}</h3>
                <p class="text-sm mb-3 product-description" style="color: var(--color-text-secondary)">{{ item.description }}</p>
                <p class="text-sm font-medium" style="color: var(--color-primary)">${{ item.price }} {{ $t('cart.each') }}</p>
              </div>
              <div class="flex items-center space-x-3 lg:space-x-4">
                <button 
                  @click="updateQuantity(item.id, item.quantity - 1)"
                  :disabled="item.quantity <= 1"
                  class="w-8 h-8 lg:w-10 lg:h-10 rounded-full border flex items-center justify-center hover:opacity-80 transition duration-200 disabled:opacity-50"
                  :style="{
                    backgroundColor: 'var(--color-surface)',
                    borderColor: 'var(--color-border)',
                    color: 'var(--color-text)'
                  }"
                >
                  -
                </button>
                <span 
                  class="w-8 lg:w-12 text-center font-semibold text-lg"
                  style="color: var(--color-text)"
                >
                  {{ item.quantity }}
                </span>
                <button 
                  @click="updateQuantity(item.id, item.quantity + 1)"
                  class="w-8 h-8 lg:w-10 lg:h-10 rounded-full border flex items-center justify-center hover:opacity-80 transition duration-200"
                  :style="{
                    backgroundColor: 'var(--color-surface)',
                    borderColor: 'var(--color-border)',
                    color: 'var(--color-text)'
                  }"
                >
                  +
                </button>
              </div>
              <div class="text-right min-w-24 lg:min-w-28">
                <p class="text-xl font-bold mb-1" style="color: var(--color-primary)">${{ (item.price * item.quantity).toFixed(2) }}</p>
                <p class="text-sm" style="color: var(--color-text-secondary)">{{ item.quantity }} × ${{ item.price }}</p>
              </div>
              <button 
                @click="removeFromCart(item.id)"
                class="p-2 lg:p-3 hover:opacity-70 transition duration-200 rounded-lg"
                :style="{ 
                  color: 'var(--color-error)',
                  backgroundColor: 'var(--color-background)'
                }"
              >
                <svg class="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>

            <!-- Mobile Layout (di bawah 600px) -->
            <div class="sm:hidden space-y-4">
              <!-- Gambar dan Info Produk -->
              <div class="flex space-x-4">
                <img 
                  :src="item.image" 
                  :alt="item.title"
                  class="w-16 h-16 object-contain bg-white rounded-lg p-2 flex-shrink-0"
                  :style="{
                    border: '1px solid var(--color-border)'
                  }"
                />
                <div class="flex-1 min-w-0">
                  <h3 class="text-base font-semibold mb-1 product-title" style="color: var(--color-text)">{{ item.title }}</h3>
                  <p class="text-xs mb-2 product-description" style="color: var(--color-text-secondary)">{{ item.description }}</p>
                  <p class="text-sm font-medium" style="color: var(--color-primary)">${{ item.price }} {{ $t('cart.each') }}</p>
                </div>
              </div>

              <!-- Controls Section -->
              <div class="flex items-center justify-between">
                <!-- Quantity Controls -->
                <div class="flex items-center space-x-3">
                  <button 
                    @click="updateQuantity(item.id, item.quantity - 1)"
                    :disabled="item.quantity <= 1"
                    class="w-8 h-8 rounded-full border flex items-center justify-center hover:opacity-80 transition duration-200 disabled:opacity-50"
                    :style="{
                      backgroundColor: 'var(--color-surface)',
                      borderColor: 'var(--color-border)',
                      color: 'var(--color-text)'
                    }"
                  >
                    -
                  </button>
                  <span 
                    class="w-8 text-center font-semibold text-base"
                    style="color: var(--color-text)"
                  >
                    {{ item.quantity }}
                  </span>
                  <button 
                    @click="updateQuantity(item.id, item.quantity + 1)"
                    class="w-8 h-8 rounded-full border flex items-center justify-center hover:opacity-80 transition duration-200"
                    :style="{
                      backgroundColor: 'var(--color-surface)',
                      borderColor: 'var(--color-border)',
                      color: 'var(--color-text)'
                    }"
                  >
                    +
                  </button>
                </div>

                <!-- Price and Delete -->
                <div class="flex items-center space-x-4">
                  <div class="text-right">
                    <p class="text-lg font-bold" style="color: var(--color-primary)">${{ (item.price * item.quantity).toFixed(2) }}</p>
                    <p class="text-xs" style="color: var(--color-text-secondary)">{{ item.quantity }} × ${{ item.price }}</p>
                  </div>
                  <button 
                    @click="removeFromCart(item.id)"
                    class="p-2 hover:opacity-70 transition duration-200 rounded-lg"
                    :style="{ 
                      color: 'var(--color-error)',
                      backgroundColor: 'var(--color-background)'
                    }"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Cart Summary -->
      <div class="border-t p-6 sm:p-8" :style="{ borderColor: 'var(--color-border)' }">
        <div class="flex justify-between items-center mb-4 sm:mb-6">
          <span class="text-xl font-semibold" style="color: var(--color-text)">{{ $t('cart.total') }}:</span>
          <span class="text-2xl font-bold" style="color: var(--color-primary)">${{ cartTotal.toFixed(2) }}</span>
        </div>
        <div class="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          <router-link 
            to="/user"
            class="py-3 px-6 rounded-lg text-center font-semibold transition duration-200 hover:opacity-90 border-2 text-base sm:text-lg"
            :style="{
              backgroundColor: 'var(--color-surface)',
              color: 'var(--color-primary)',
              borderColor: 'var(--color-primary)'
            }"
          >
            {{ $t('cart.continueShopping') }}
          </router-link>
          <router-link 
            to="/checkout"
            class="py-3 px-6 rounded-lg text-center font-semibold transition duration-200 hover:opacity-90 text-white text-base sm:text-lg"
            :style="{
              backgroundColor: 'var(--color-primary)'
            }"
          >
            {{ $t('cart.proceedCheckout') }}
          </router-link>
        </div>
      </div>
    </div>

    <!-- Empty Cart -->
    <div v-else class="card text-center">
      <div class="p-8 sm:p-12">
        <svg class="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6" :style="{ color: 'var(--color-text-secondary)' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <h2 class="text-xl sm:text-2xl font-bold mb-3 sm:mb-4" style="color: var(--color-text)">{{ $t('cart.emptyCart') }}</h2>
        <p class="text-base sm:text-lg mb-6 sm:mb-8" style="color: var(--color-text-secondary)">{{ $t('cart.addProducts') }}</p>
        <router-link 
          to="/user"
          class="inline-block py-3 px-6 sm:py-4 sm:px-8 rounded-lg font-semibold transition duration-200 hover:opacity-90 text-white text-base sm:text-lg"
          :style="{
            backgroundColor: 'var(--color-primary)'
          }"
        >
          {{ $t('cart.startShopping') }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'Cart',
  setup() {
    const store = useStore()

    const cartItems = computed(() => store.state.cart)
    const cartTotal = computed(() => store.getters.cartTotal)

    const removeFromCart = (productId) => {
      store.dispatch('removeFromCart', productId)
    }

    const updateQuantity = (productId, quantity) => {
      if (quantity > 0) {
        store.dispatch('updateCartQuantity', { productId, quantity })
      }
    }

    return {
      cartItems,
      cartTotal,
      removeFromCart,
      updateQuantity
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

/* Word break untuk judul dan deskripsi produk */
.product-title {
  word-break: break-word;
  overflow-wrap: break-word;
  line-height: 1.4;
}

.product-description {
  word-break: break-word;
  overflow-wrap: break-word;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .cart-item {
    padding-bottom: 1rem;
  }
  
  .product-title {
    font-size: 0.875rem;
    line-height: 1.3;
  }
  
  .product-description {
    font-size: 0.75rem;
    line-height: 1.3;
    -webkit-line-clamp: 2;
  }
}

/* Smooth transitions */
.cart-item {
  transition: all 0.3s ease;
}

/* Hover effects */
.cart-item:hover {
  background-color: var(--color-background);
  border-radius: 0.5rem;
  margin: 0 -0.5rem;
  padding: 0.5rem;
}
</style>