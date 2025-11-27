<template>
  <div class="max-w-6xl mx-auto space-y-6">
    <!-- Header -->
    <div class="card">
      <h1 class="text-3xl font-bold" style="color: var(--color-text)">{{ $t('checkout.checkout') }}</h1>
      <p class="mt-2" style="color: var(--color-text-secondary)">{{ $t('checkout.completePurchase') }}</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Checkout Form -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Shipping Information -->
        <div class="card">
          <h2 class="text-xl font-bold mb-4" style="color: var(--color-text)">{{ $t('checkout.shippingInfo') }}</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1" style="color: var(--color-text)">{{ $t('checkout.firstName') }} *</label>
              <input 
                v-model="shippingInfo.firstName"
                type="text" 
                required
                class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 transition duration-200"
                :style="{
                  backgroundColor: 'var(--color-surface)',
                  color: 'var(--color-text)',
                  borderColor: 'var(--color-border)',
                  boxShadow: 'var(--shadow)'
                }"
                :placeholder="$t('checkout.firstName')"
              >
            </div>
            <div>
              <label class="block text-sm font-medium mb-1" style="color: var(--color-text)">{{ $t('checkout.lastName') }} *</label>
              <input 
                v-model="shippingInfo.lastName"
                type="text" 
                required
                class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 transition duration-200"
                :style="{
                  backgroundColor: 'var(--color-surface)',
                  color: 'var(--color-text)',
                  borderColor: 'var(--color-border)',
                  boxShadow: 'var(--shadow)'
                }"
                :placeholder="$t('checkout.lastName')"
              >
            </div>
            <div class="md:col-span-2">
              <label class="block text-sm font-medium mb-1" style="color: var(--color-text)">{{ $t('checkout.address') }} *</label>
              <input 
                v-model="shippingInfo.address"
                type="text" 
                required
                class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 transition duration-200"
                :style="{
                  backgroundColor: 'var(--color-surface)',
                  color: 'var(--color-text)',
                  borderColor: 'var(--color-border)',
                  boxShadow: 'var(--shadow)'
                }"
                :placeholder="$t('checkout.address')"
              >
            </div>
            <div>
              <label class="block text-sm font-medium mb-1" style="color: var(--color-text)">{{ $t('checkout.city') }} *</label>
              <input 
                v-model="shippingInfo.city"
                type="text" 
                required
                class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 transition duration-200"
                :style="{
                  backgroundColor: 'var(--color-surface)',
                  color: 'var(--color-text)',
                  borderColor: 'var(--color-border)',
                  boxShadow: 'var(--shadow)'
                }"
                :placeholder="$t('checkout.city')"
              >
            </div>
            <div>
              <label class="block text-sm font-medium mb-1" style="color: var(--color-text)">{{ $t('checkout.zipCode') }} *</label>
              <input 
                v-model="shippingInfo.zipCode"
                type="text" 
                required
                class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 transition duration-200"
                :style="{
                  backgroundColor: 'var(--color-surface)',
                  color: 'var(--color-text)',
                  borderColor: 'var(--color-border)',
                  boxShadow: 'var(--shadow)'
                }"
                :placeholder="$t('checkout.zipCode')"
              >
            </div>
          </div>
        </div>

        <!-- Payment Information -->
        <div class="card">
          <h2 class="text-xl font-bold mb-4" style="color: var(--color-text)">{{ $t('checkout.paymentInfo') }}</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-1" style="color: var(--color-text)">{{ $t('checkout.cardNumber') }} *</label>
              <input 
                v-model="paymentInfo.cardNumber"
                type="text" 
                :placeholder="$t('checkout.cardNumber')"
                required
                class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 transition duration-200"
                :style="{
                  backgroundColor: 'var(--color-surface)',
                  color: 'var(--color-text)',
                  borderColor: 'var(--color-border)',
                  boxShadow: 'var(--shadow)'
                }"
              >
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium mb-1" style="color: var(--color-text)">{{ $t('checkout.expiryDate') }} *</label>
                <input 
                  v-model="paymentInfo.expiryDate"
                  type="text" 
                  :placeholder="$t('checkout.expiryDate')"
                  required
                  class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 transition duration-200"
                  :style="{
                    backgroundColor: 'var(--color-surface)',
                    color: 'var(--color-text)',
                    borderColor: 'var(--color-border)',
                    boxShadow: 'var(--shadow)'
                  }"
                >
              </div>
              <div>
                <label class="block text-sm font-medium mb-1" style="color: var(--color-text)">{{ $t('checkout.cvv') }} *</label>
                <input 
                  v-model="paymentInfo.cvv"
                  type="text" 
                  :placeholder="$t('checkout.cvv')"
                  required
                  class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 transition duration-200"
                  :style="{
                    backgroundColor: 'var(--color-surface)',
                    color: 'var(--color-text)',
                    borderColor: 'var(--color-border)',
                    boxShadow: 'var(--shadow)'
                  }"
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Order Summary -->
      <div class="space-y-6">
        <div class="card">
          <h2 class="text-xl font-bold mb-4" style="color: var(--color-text)">{{ $t('checkout.orderSummary') }}</h2>
          <div class="space-y-3">
            <div 
              v-for="item in cartItems" 
              :key="item.id"
              class="flex justify-between items-center"
            >
              <div>
                <p class="text-sm font-medium" style="color: var(--color-text)">{{ item.title }}</p>
                <p class="text-xs" style="color: var(--color-text-secondary)">{{ $t('cart.quantity') }}: {{ item.quantity }}</p>
              </div>
              <span class="text-sm font-semibold" style="color: var(--color-text)">${{ (item.price * item.quantity).toFixed(2) }}</span>
            </div>
          </div>
          <div class="border-t mt-4 pt-4 space-y-2" :style="{ borderColor: 'var(--color-border)' }">
            <div class="flex justify-between">
              <span style="color: var(--color-text-secondary)">{{ $t('cart.subtotal') }}</span>
              <span style="color: var(--color-text)">${{ cartTotal.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between">
              <span style="color: var(--color-text-secondary)">{{ $t('cart.shipping') }}</span>
              <span style="color: var(--color-text)">${{ shippingCost.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between">
              <span style="color: var(--color-text-secondary)">{{ $t('cart.tax') }}</span>
              <span style="color: var(--color-text)">${{ tax.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between text-lg font-bold border-t pt-2" :style="{ borderColor: 'var(--color-border)' }">
              <span style="color: var(--color-text)">{{ $t('cart.total') }}</span>
              <span style="color: var(--color-primary)">${{ totalWithFees.toFixed(2) }}</span>
            </div>
          </div>
        </div>

        <button 
          @click="placeOrder"
          :disabled="isPlacingOrder"
          class="w-full py-3 px-6 rounded-lg font-semibold transition duration-200 disabled:opacity-50 text-white hover:opacity-90"
          :style="{
            backgroundColor: 'var(--color-primary)',
            boxShadow: 'var(--shadow)'
          }"
        >
          {{ isPlacingOrder ? $t('checkout.placingOrder') : $t('checkout.placeOrder') }}
        </button>

        <router-link 
          to="/cart"
          class="w-full py-3 px-6 rounded-lg font-semibold text-center block transition duration-200 hover:opacity-90"
          :style="{
            backgroundColor: 'var(--color-surface)',
            color: 'var(--color-text)',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow)'
          }"
        >
          {{ $t('common.back') }} {{ $t('nav.cart') }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'Checkout',
  setup() {
    const store = useStore()
    const router = useRouter()
    const isPlacingOrder = ref(false)

    const shippingInfo = ref({
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      zipCode: ''
    })

    const paymentInfo = ref({
      cardNumber: '',
      expiryDate: '',
      cvv: ''
    })

    const cartItems = computed(() => store.state.cart)
    const cartTotal = computed(() => store.getters.cartTotal)
    const shippingCost = computed(() => 5.99)
    const tax = computed(() => cartTotal.value * 0.1)
    const totalWithFees = computed(() => cartTotal.value + shippingCost.value + tax.value)

    const placeOrder = async () => {
      if (!shippingInfo.value.firstName || !shippingInfo.value.address || !paymentInfo.value.cardNumber) {
        alert('Please fill in all required fields')
        return
      }

      isPlacingOrder.value = true

      // Simulate API call
      setTimeout(() => {
        // Save order data for confirmation page
        const orderData = {
          items: [...cartItems.value],
          total: totalWithFees.value,
          shippingInfo: { ...shippingInfo.value },
          paymentInfo: { ...paymentInfo.value },
          timestamp: new Date().toISOString()
        }
        
        localStorage.setItem('lastOrder', JSON.stringify(orderData))
        
        // Clear cart
        store.dispatch('clearCart')
        
        // Redirect to confirmation
        router.push('/order-confirmation')
        
        isPlacingOrder.value = false
      }, 2000)
    }

    return {
      shippingInfo,
      paymentInfo,
      cartItems,
      cartTotal,
      shippingCost,
      tax,
      totalWithFees,
      isPlacingOrder,
      placeOrder
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
  padding: 1.5rem;
}

input::placeholder {
  color: var(--color-text-secondary);
  opacity: 0.7;
}
</style>