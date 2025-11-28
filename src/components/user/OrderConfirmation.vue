<template>
  <div class="max-w-4xl mx-auto">
    <!-- Breadcrumb - Responsive -->
    <nav class="mb-4 sm:mb-6 px-2">
      <ol class="breadcrumb flex flex-wrap items-center gap-1 sm:gap-2 text-sm">
        <li class="breadcrumb-item">
          <router-link 
            to="/user" 
            class="breadcrumb-link hover:opacity-75 transition duration-200 inline-block max-w-[120px] sm:max-w-none truncate"
            :style="{ color: 'var(--color-primary)' }"
          >
            {{ $t('nav.products') }}
          </router-link>
        </li>
        <li class="breadcrumb-separator flex-shrink-0" style="color: var(--color-text-secondary)">›</li>
        <li class="breadcrumb-item">
          <router-link 
            to="/cart" 
            class="breadcrumb-link hover:opacity-75 transition duration-200 inline-block max-w-[80px] sm:max-w-none truncate"
            :style="{ color: 'var(--color-primary)' }"
          >
            {{ $t('nav.cart') }}
          </router-link>
        </li>
        <li class="breadcrumb-separator flex-shrink-0" style="color: var(--color-text-secondary)">›</li>
        <li class="breadcrumb-item">
          <router-link 
            to="/checkout" 
            class="breadcrumb-link hover:opacity-75 transition duration-200 inline-block max-w-[100px] sm:max-w-none truncate"
            :style="{ color: 'var(--color-primary)' }"
          >
            {{ $t('nav.checkout') }}
          </router-link>
        </li>
        <li class="breadcrumb-separator flex-shrink-0" style="color: var(--color-text-secondary)">›</li>
        <li class="breadcrumb-item">
          <span class="breadcrumb-current inline-block max-w-[150px] sm:max-w-none truncate" style="color: var(--color-text-secondary)">
            {{ $t('order.orderConfirmed') }}
          </span>
        </li>
      </ol>
    </nav>

    <div class="card">
      <!-- Success Header -->
      <div class="p-6 sm:p-8 text-center" :style="{ backgroundColor: 'var(--color-success)', color: 'white' }">
        <div class="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
          <svg class="w-6 h-6 sm:w-8 sm:h-8" :style="{ color: 'var(--color-success)' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 class="text-2xl sm:text-3xl font-bold mb-2">{{ $t('order.orderConfirmed') }}</h1>
        <p class="text-base sm:text-lg opacity-90">{{ $t('order.thankYouPurchase') }}</p>
        <p class="mt-2 opacity-80 text-sm sm:text-base">Order #{{ orderId }}</p>
      </div>

      <!-- Order Summary -->
      <div class="p-4 sm:p-6 lg:p-8">
        <h2 class="text-xl sm:text-2xl font-bold mb-4 sm:mb-6" style="color: var(--color-text)">{{ $t('order.orderSummary') }}</h2>
        
        <!-- Order Items -->
        <div class="space-y-4 sm:space-y-6 mb-6">
          <div 
            v-for="item in orderItems" 
            :key="item.id"
            class="order-item border rounded-lg p-3 sm:p-4"
            :style="{
              borderColor: 'var(--color-border)',
              backgroundColor: 'var(--color-background)'
            }"
          >
            <!-- Desktop Layout -->
            <div class="hidden sm:flex items-center justify-between">
              <div class="flex items-center space-x-4 flex-1">
                <img 
                  :src="item.image" 
                  :alt="item.title"
                  class="w-16 h-16 object-contain bg-white rounded-lg p-2"
                  :style="{
                    border: '1px solid var(--color-border)'
                  }"
                />
                <div class="flex-1 min-w-0">
                  <h3 class="font-semibold text-lg mb-1 product-title" style="color: var(--color-text)">{{ item.title }}</h3>
                  <p class="text-sm product-description" style="color: var(--color-text-secondary)">{{ $t('cart.quantity') }}: {{ item.quantity }}</p>
                </div>
              </div>
              <div class="text-right">
                <p class="text-lg font-bold mb-1" style="color: var(--color-primary)">${{ (item.price * item.quantity).toFixed(2) }}</p>
                <p class="text-sm" style="color: var(--color-text-secondary)">${{ item.price }} × {{ item.quantity }}</p>
              </div>
            </div>

            <!-- Mobile Layout (di bawah 500px) -->
            <div class="sm:hidden space-y-3">
              <!-- Gambar dan Info Produk -->
              <div class="flex space-x-3">
                <img 
                  :src="item.image" 
                  :alt="item.title"
                  class="w-12 h-12 object-contain bg-white rounded-lg p-1 flex-shrink-0"
                  :style="{
                    border: '1px solid var(--color-border)'
                  }"
                />
                <div class="flex-1 min-w-0">
                  <h3 class="font-semibold text-sm mb-1 product-title" style="color: var(--color-text)">{{ item.title }}</h3>
                  <p class="text-xs product-description" style="color: var(--color-text-secondary)">{{ $t('cart.quantity') }}: {{ item.quantity }}</p>
                </div>
              </div>

              <!-- Harga - Pindah ke bawah di mobile -->
              <div class="flex justify-between items-center pt-2 border-t" :style="{ borderColor: 'var(--color-border)' }">
                <span class="text-xs" style="color: var(--color-text-secondary)">Unit Price: ${{ item.price }}</span>
                <p class="text-base font-bold" style="color: var(--color-primary)">${{ (item.price * item.quantity).toFixed(2) }}</p>
              </div>
            </div>
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
        <div class="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t" :style="{ borderColor: 'var(--color-border)' }">
          <h3 class="text-lg sm:text-xl font-bold mb-3 sm:mb-4" style="color: var(--color-text)">{{ $t('order.shippingInformation') }}</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
            <div>
              <span class="font-medium" style="color: var(--color-text-secondary)">{{ $t('checkout.firstName') }}:</span>
              <span class="ml-2 block sm:inline" style="color: var(--color-text)">{{ shippingInfo.firstName }} {{ shippingInfo.lastName }}</span>
            </div>
            <div>
              <span class="font-medium" style="color: var(--color-text-secondary)">{{ $t('checkout.address') }}:</span>
              <span class="ml-2 block sm:inline" style="color: var(--color-text)">{{ shippingInfo.address }}</span>
            </div>
            <div>
              <span class="font-medium" style="color: var(--color-text-secondary)">{{ $t('checkout.city') }}:</span>
              <span class="ml-2 block sm:inline" style="color: var(--color-text)">{{ shippingInfo.city }}</span>
            </div>
            <div>
              <span class="font-medium" style="color: var(--color-text-secondary)">{{ $t('checkout.zipCode') }}:</span>
              <span class="ml-2 block sm:inline" style="color: var(--color-text)">{{ shippingInfo.zipCode }}</span>
            </div>
          </div>
        </div>

        <!-- Next Steps -->
        <div class="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t" :style="{ borderColor: 'var(--color-border)' }">
          <h3 class="text-lg sm:text-xl font-bold mb-3 sm:mb-4" style="color: var(--color-text)">{{ $t('order.whatsNext') }}</h3>
          <div class="space-y-2 text-sm sm:text-base" style="color: var(--color-text-secondary)">
            <p class="flex items-start">
              <span class="mr-2">•</span>
              <span>{{ $t('order.youWillReceiveEmail') }}</span>
            </p>
            <p class="flex items-start">
              <span class="mr-2">•</span>
              <span>{{ $t('order.orderProcessed') }}</span>
            </p>
            <p class="flex items-start">
              <span class="mr-2">•</span>
              <span>{{ $t('order.expectedDelivery') }}</span>
            </p>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t" :style="{ borderColor: 'var(--color-border)' }">
          <div class="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <router-link 
              to="/user"
              class="flex-1 py-3 px-4 sm:px-6 rounded-lg text-center font-semibold transition duration-200 text-white hover:opacity-90 text-sm sm:text-base"
              :style="{
                backgroundColor: 'var(--color-primary)'
              }"
            >
              {{ $t('order.continueShopping') }}
            </router-link>
            <button 
              @click="printOrder"
              class="flex-1 py-3 px-4 sm:px-6 rounded-lg font-semibold transition duration-200 hover:opacity-90 text-sm sm:text-base"
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

/* Breadcrumb Responsive Styles */
.breadcrumb {
  word-break: break-word;
  overflow-wrap: break-word;
  line-height: 1.4;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
}

.breadcrumb-link,
.breadcrumb-current {
  word-break: break-word;
  overflow-wrap: break-word;
  max-width: 100%;
}

.breadcrumb-separator {
  flex-shrink: 0;
  margin: 0 0.25rem;
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
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .breadcrumb {
    font-size: 0.75rem;
    gap: 0.25rem;
  }
  
  .breadcrumb-link,
  .breadcrumb-current {
    max-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  .breadcrumb-separator {
    margin: 0 0.125rem;
  }
}

@media (max-width: 500px) {
  .order-item {
    padding: 0.75rem;
  }
  
  .product-title {
    font-size: 0.875rem;
    line-height: 1.3;
  }
  
  .product-description {
    font-size: 0.75rem;
    line-height: 1.3;
  }
  
  .breadcrumb-link,
  .breadcrumb-current {
    max-width: 80px;
  }
}

@media (max-width: 380px) {
  .breadcrumb {
    font-size: 0.7rem;
  }
  
  .breadcrumb-link,
  .breadcrumb-current {
    max-width: 60px;
  }
}

/* Print styles */
@media print {
  nav, button {
    display: none !important;
  }
  
  .card {
    box-shadow: none !important;
    border: 1px solid #000 !important;
  }
  
  .order-item {
    break-inside: avoid;
  }
}

/* Smooth transitions */
.order-item {
  transition: all 0.3s ease;
}

.order-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.breadcrumb-link:hover {
  opacity: 0.75;
}
</style>