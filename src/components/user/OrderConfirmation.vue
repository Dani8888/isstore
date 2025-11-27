<template>
  <div class="max-w-4xl mx-auto">
    <!-- Breadcrumb -->
    <nav class="mb-6">
      <ol class="flex items-center space-x-2 text-sm" style="color: var(--color-text-secondary)">
        <li>
          <router-link to="/user" class="hover:opacity-75 transition duration-200" :style="{ color: 'var(--color-primary)' }">
            {{ $t('nav.products') }}
          </router-link>
        </li>
        <li class="flex items-center">
          <span class="mx-2">›</span>
          <router-link to="/cart" class="hover:opacity-75 transition duration-200" :style="{ color: 'var(--color-primary)' }">
            {{ $t('nav.cart') }}
          </router-link>
        </li>
        <li class="flex items-center">
          <span class="mx-2">›</span>
          <router-link to="/checkout" class="hover:opacity-75 transition duration-200" :style="{ color: 'var(--color-primary)' }">
            {{ $t('nav.checkout') }}
          </router-link>
        </li>
        <li class="flex items-center">
          <span class="mx-2">›</span>
          <span style="color: var(--color-text-secondary)">{{ $t('order.orderConfirmed') }}</span>
        </li>
      </ol>
    </nav>

    <div class="card">
      <!-- Success Header -->
      <div class="p-8 text-center" :style="{ backgroundColor: 'var(--color-success)', color: 'white' }">
        <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8" :style="{ color: 'var(--color-success)' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 class="text-3xl font-bold mb-2">{{ $t('order.orderConfirmed') }}</h1>
        <p class="text-lg opacity-90">{{ $t('order.thankYouPurchase') }}</p>
        <p class="mt-2 opacity-80">Order #{{ orderId }}</p>
      </div>

      <!-- Order Summary -->
      <div class="p-8">
        <h2 class="text-2xl font-bold mb-6" style="color: var(--color-text)">{{ $t('order.orderSummary') }}</h2>
        
        <!-- Order Items -->
        <div class="space-y-4 mb-6">
          <div 
            v-for="item in orderItems" 
            :key="item.id"
            class="flex items-center justify-between p-4 rounded-lg"
            :style="{
              border: '1px solid var(--color-border)',
              backgroundColor: 'var(--color-background)'
            }"
          >
            <div class="flex items-center space-x-4">
              <img 
                :src="item.image" 
                :alt="item.title"
                class="w-16 h-16 object-contain"
              />
              <div>
                <h3 class="font-semibold" style="color: var(--color-text)">{{ item.title }}</h3>
                <p class="text-sm" style="color: var(--color-text-secondary)">{{ $t('cart.quantity') }}: {{ item.quantity }}</p>
              </div>
            </div>
            <span class="text-lg font-semibold" style="color: var(--color-text)">
              ${{ (item.price * item.quantity).toFixed(2) }}
            </span>
          </div>
        </div>

        <!-- Order Total -->
        <div class="border-t pt-4 space-y-2" :style="{ borderColor: 'var(--color-border)' }">
          <div class="flex justify-between text-lg">
            <span class="font-semibold" style="color: var(--color-text)">{{ $t('order.totalAmount') }}:</span>
            <span class="font-bold" style="color: var(--color-primary)">${{ orderTotal.toFixed(2) }}</span>
          </div>
        </div>

        <!-- Shipping Info -->
        <div class="mt-8 pt-6 border-t" :style="{ borderColor: 'var(--color-border)' }">
          <h3 class="text-xl font-bold mb-4" style="color: var(--color-text)">{{ $t('order.shippingInformation') }}</h3>
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span class="font-medium" style="color: var(--color-text-secondary)">{{ $t('checkout.firstName') }}:</span>
              <span class="ml-2" style="color: var(--color-text)">{{ shippingInfo.firstName }} {{ shippingInfo.lastName }}</span>
            </div>
            <div>
              <span class="font-medium" style="color: var(--color-text-secondary)">{{ $t('checkout.address') }}:</span>
              <span class="ml-2" style="color: var(--color-text)">{{ shippingInfo.address }}</span>
            </div>
            <div>
              <span class="font-medium" style="color: var(--color-text-secondary)">{{ $t('checkout.city') }}:</span>
              <span class="ml-2" style="color: var(--color-text)">{{ shippingInfo.city }}</span>
            </div>
            <div>
              <span class="font-medium" style="color: var(--color-text-secondary)">{{ $t('checkout.zipCode') }}:</span>
              <span class="ml-2" style="color: var(--color-text)">{{ shippingInfo.zipCode }}</span>
            </div>
          </div>
        </div>

        <!-- Next Steps -->
        <div class="mt-8 pt-6 border-t" :style="{ borderColor: 'var(--color-border)' }">
          <h3 class="text-xl font-bold mb-4" style="color: var(--color-text)">{{ $t('order.whatsNext') }}</h3>
          <div class="space-y-2" style="color: var(--color-text-secondary)">
            <p>• {{ $t('order.expectedDelivery') }}</p>
            <p>• {{ $t('order.youWillReceiveEmail') }}</p>
            <p>• {{ $t('order.orderProcessed') }}</p>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex space-x-4 mt-8 pt-6 border-t" :style="{ borderColor: 'var(--color-border)' }">
          <router-link 
            to="/user"
            class="flex-1 py-3 px-6 rounded-lg text-center font-semibold transition duration-200 text-white hover:opacity-90"
            :style="{
              backgroundColor: 'var(--color-primary)'
            }"
          >
            {{ $t('order.continueShopping') }}
          </router-link>
          <button 
            @click="printOrder"
            class="flex-1 py-3 px-6 rounded-lg font-semibold transition duration-200 hover:opacity-90"
            :style="{
              backgroundColor: 'var(--color-surface)',
              color: 'var(--color-text)',
              border: '1px solid var(--color-border)'
            }"
          >
            {{ $t('order.printReceipt') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'OrderConfirmation',
  setup() {
    const router = useRouter()
    const orderId = ref('')
    const orderItems = ref([])
    const orderTotal = ref(0)
    const shippingInfo = ref({})

    const generateOrderId = () => {
      return 'ORD-' + Date.now().toString().slice(-8)
    }

    const printOrder = () => {
      window.print()
    }

    onMounted(() => {
      // Generate order ID
      orderId.value = generateOrderId()
      
      // Get order data from localStorage or route query
      const orderData = JSON.parse(localStorage.getItem('lastOrder') || '{}')
      
      if (orderData.items && orderData.shippingInfo) {
        orderItems.value = orderData.items
        orderTotal.value = orderData.total
        shippingInfo.value = orderData.shippingInfo
      } else {
        // Redirect to products if no order data
        router.push('/user')
      }
    })

    return {
      orderId,
      orderItems,
      orderTotal,
      shippingInfo,
      printOrder
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
  overflow: hidden;
}

@media print {
  nav, button {
    display: none !important;
  }
}
</style>