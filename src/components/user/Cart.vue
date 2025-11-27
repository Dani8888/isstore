<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <!-- Header -->
    <div class="card p-6">
      <h1 class="text-3xl font-bold" style="color: var(--color-text)">{{ $t('cart.shoppingCart') }}</h1>
      <p class="mt-2" style="color: var(--color-text-secondary)">{{ $t('cart.reviewItems') }}</p>
    </div>

    <!-- Cart Items -->
    <div v-if="cartItems.length > 0" class="card">
      <div class="p-6">
        <div class="space-y-4">
          <div 
            v-for="item in cartItems" 
            :key="item.id"
            class="flex items-center space-x-4 border-b pb-4 last:border-0"
            :style="{ borderColor: 'var(--color-border)' }"
          >
            <img 
              :src="item.image" 
              :alt="item.title"
              class="w-20 h-20 object-contain"
            />
            <div class="flex-1">
              <h3 class="text-lg font-semibold" style="color: var(--color-text)">{{ item.title }}</h3>
              <p class="text-sm line-clamp-2" style="color: var(--color-text-secondary)">{{ item.description }}</p>
            </div>
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
                class="w-8 text-center font-semibold"
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
            <div class="text-right">
              <p class="text-xl font-bold" style="color: var(--color-primary)">${{ (item.price * item.quantity).toFixed(2) }}</p>
              <p class="text-sm" style="color: var(--color-text-secondary)">${{ item.price }} {{ $t('cart.each') }}</p>
            </div>
            <button 
              @click="removeFromCart(item.id)"
              class="p-2 hover:opacity-70 transition duration-200"
              :style="{ color: 'var(--color-error)' }"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Cart Summary -->
      <div class="border-t p-6" :style="{ borderColor: 'var(--color-border)' }">
        <div class="flex justify-between items-center mb-4">
          <span class="text-xl font-semibold" style="color: var(--color-text)">{{ $t('cart.total') }}:</span>
          <span class="text-2xl font-bold" style="color: var(--color-primary)">${{ cartTotal.toFixed(2) }}</span>
        </div>
        <div class="flex space-x-4">
          <router-link 
            to="/user"
            class="flex-1 py-3 px-6 rounded-lg text-center font-semibold transition duration-200 hover:opacity-90 border-2"
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
            class="flex-1 py-3 px-6 rounded-lg text-center font-semibold transition duration-200 hover:opacity-90 text-white"
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
    <div v-else class="card text-center py-12">
      <svg class="w-24 h-24 mx-auto mb-4" :style="{ color: 'var(--color-text-secondary)' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      <h2 class="text-2xl font-bold mb-2" style="color: var(--color-text)">{{ $t('cart.emptyCart') }}</h2>
      <p class="mb-6" style="color: var(--color-text-secondary)">{{ $t('cart.addProducts') }}</p>
      <router-link 
        to="/user"
        class="inline-block py-3 px-6 rounded-lg font-semibold transition duration-200 hover:opacity-90 text-white"
        :style="{
          backgroundColor: 'var(--color-primary)'
        }"
      >
        {{ $t('cart.startShopping') }}
      </router-link>
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
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card {
  background-color: var(--color-surface);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  border: 1px solid var(--color-border);
}
</style>