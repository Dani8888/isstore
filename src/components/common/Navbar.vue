<template>
  <nav class="navbar sticky top-0 z-40" v-if="user">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center py-4">
        <div class="flex items-center space-x-4">
          <!-- Logo Istana Store -->
          <router-link to="/user" class="flex items-center space-x-3 no-underline">
            <div 
              class="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg border overflow-hidden"
              :style="{
                backgroundColor: 'var(--color-surface)',
                borderColor: 'var(--color-primary)',
                boxShadow: 'var(--shadow)'
              }"
            >
              <img 
                src="/images/istana-group-logo.png" 
                alt="Istana Store"
                class="w-10 h-10 object-contain"
                @error="handleImageError"
              />
            </div>
            <div class="hidden sm:block">
              <h1 
                class="text-xl font-bold bg-gradient-to-r from-current to-current bg-clip-text text-transparent"
                :style="{
                  backgroundImage: `linear-gradient(135deg, var(--color-primary), var(--color-accent))`
                }"
              >
                Istana Store
              </h1>
              <div 
                class="h-1 rounded-full mt-1"
                :style="{
                  background: `linear-gradient(90deg, var(--color-primary), var(--color-accent))`,
                  width: '60px'
                }"
              ></div>
            </div>
          </router-link>
          
          <!-- Navigation Links - Desktop Only -->
          <div v-if="isAdmin" class="hidden md:flex space-x-4 ml-6">
            <router-link 
              to="/admin" 
              class="nav-link"
              :class="{ 'active': $route.path === '/admin' }"
              :style="{
                backgroundColor: $route.path === '/admin' ? 'var(--color-primary)' : 'transparent',
                color: $route.path === '/admin' ? 'white' : 'var(--color-text)'
              }"
            >
              {{ $t('nav.dashboard') }}
            </router-link>
          </div>
          <div v-else class="hidden md:flex space-x-4 ml-6">
            <router-link 
              to="/user" 
              class="nav-link"
              :class="{ 'active': $route.path === '/user' }"
              :style="{
                backgroundColor: $route.path === '/user' ? 'var(--color-primary)' : 'transparent',
                color: $route.path === '/user' ? 'white' : 'var(--color-text)'
              }"
            >
              {{ $t('nav.products') }}
            </router-link>
          </div>
        </div>
        
        <!-- Desktop Right Section -->
        <div class="hidden md:flex items-center space-x-4">
          <!-- Cart Icon - Desktop Only -->
          <router-link 
            v-if="!isAdmin"
            to="/cart" 
            class="cart-icon relative p-2 rounded-lg transition duration-200 hover:opacity-80"
            :class="{ 'active': $route.path === '/cart' }"
            :style="{
              backgroundColor: $route.path === '/cart' ? 'var(--color-primary)' : 'var(--color-surface)',
              color: $route.path === '/cart' ? 'white' : 'var(--color-text)',
              border: '1px solid var(--color-border)'
            }"
            :title="$t('nav.cart')"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span 
              v-if="cartItemCount > 0" 
              class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold"
            >
              {{ cartItemCount }}
            </span>
          </router-link>

          <LanguageSwitcher />
          
          <span 
            class="hidden sm:inline font-medium text-sm"
            :style="{ color: 'var(--color-text)' }"
          >
            {{ $t('common.welcome') }}, <span class="font-semibold" :style="{ color: 'var(--color-primary)' }">{{ user.username }}</span>
          </span>
          
          <button 
            @click="logout" 
            class="logout-btn px-4 py-2 rounded-lg transition duration-200 text-sm font-medium"
            :style="{
              backgroundColor: 'var(--color-error)',
              color: 'white',
              boxShadow: 'var(--shadow)'
            }"
          >
            {{ $t('common.logout') }}
          </button>
        </div>

        <!-- Mobile Right Section (Logo dan Language Only) -->
        <div class="flex md:hidden items-center space-x-2">
          <LanguageSwitcher />
        </div>
      </div>

      <!-- Mobile Bottom Navigation -->
      <div v-if="!isAdmin" class="md:hidden border-t" :style="{ borderColor: 'var(--color-border)' }">
        <div class="flex justify-between items-center py-2">
          <!-- Products Link -->
          <router-link 
            to="/user" 
            class="mobile-nav-link flex flex-col items-center flex-1"
            :class="{ 'active': $route.path === '/user' }"
            :style="{
              color: $route.path === '/user' ? 'var(--color-primary)' : 'var(--color-text-secondary)'
            }"
          >
            <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span class="text-xs font-medium">{{ $t('nav.products') }}</span>
          </router-link>

          <!-- Cart Link -->
          <router-link 
            to="/cart" 
            class="mobile-nav-link flex flex-col items-center flex-1 relative"
            :class="{ 'active': $route.path === '/cart' }"
            :style="{
              color: $route.path === '/cart' ? 'var(--color-primary)' : 'var(--color-text-secondary)'
            }"
          >
            <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span class="text-xs font-medium">{{ $t('nav.cart') }}</span>
            <span 
              v-if="cartItemCount > 0" 
              class="absolute top-0 right-4 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold"
            >
              {{ cartItemCount }}
            </span>
          </router-link>

          <!-- Logout Button -->
          <button 
            @click="logout" 
            class="mobile-nav-link flex flex-col items-center flex-1"
            :style="{
              color: 'var(--color-error)'
            }"
          >
            <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span class="text-xs font-medium">{{ $t('common.logout') }}</span>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import LanguageSwitcher from './LanguageSwitcher.vue'

export default {
  name: 'Navbar',
  components: {
    LanguageSwitcher
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()

    const logout = () => {
      store.dispatch('logout')
      router.push('/')
    }

    const handleImageError = (event) => {
      console.error('Failed to load logo image')
      event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiByeD0iMTIiIGZpbGw9IiMzQjgyRjYiLz4KPHN2ZyB4PSIxNiIgeT0iMTYiIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+CjxwYXRoIGQ9Ik0zIDNoMnYuNE03IDEzaDEwbDQtOEg1LjRNNyAxM0w1LjQgNU03IDEzbC0yLjI5MyAyLjI5M2MtLjYzLjYzLS4xODQgMS43MDcuNzA3IDEuNzA3SDE3bTAgMGEyIDIgMCAxMDAgNGEyIDIgMCAwMDAtNHptLTggMmEyIDIgMCAxMS00IDBhMiAyIDAgMDE0IDB6Ii8+Cjwvc3ZnPgo8L3N2Zz4K'
    }

    const user = computed(() => store.state.user)
    const isAdmin = computed(() => store.getters.isAdmin)
    const cartItemCount = computed(() => store.getters.cartItemCount)

    return {
      user,
      isAdmin,
      cartItemCount,
      logout,
      handleImageError,
      $route: route
    }
  }
}
</script>

<style scoped>
.navbar {
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  box-shadow: var(--shadow);
}

.no-underline {
  text-decoration: none;
}

.nav-link {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
  text-decoration: none;
}

.nav-link:hover {
  background-color: var(--color-primary);
  color: white !important;
}

.cart-icon {
  transition: all 0.3s ease;
}

.cart-icon:hover {
  transform: scale(1.05);
  background-color: var(--color-primary) !important;
  color: white !important;
}

.cart-icon.active {
  background-color: var(--color-primary) !important;
  color: white !important;
}

.mobile-nav-link {
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.mobile-nav-link.active {
  background-color: var(--color-background);
}

.mobile-nav-link:hover {
  background-color: var(--color-background);
}

.logout-btn:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

/* Animation for cart badge */
@keyframes bounce {
  0%, 20%, 60%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-5px);
  }
  80% {
    transform: translateY(-2px);
  }
}

.bg-red-500 {
  animation: bounce 0.5s ease;
}

/* Mobile responsive adjustments */
@media (max-width: 767px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  .mobile-nav-link {
    padding: 0.75rem 0.5rem;
  }
}
</style>