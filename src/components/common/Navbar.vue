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
            <div>
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
          
          <!-- Navigation Links -->
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
            <router-link 
              to="/cart" 
              class="nav-link relative"
              :class="{ 'active': $route.path === '/cart' }"
              :style="{
                backgroundColor: $route.path === '/cart' ? 'var(--color-primary)' : 'transparent',
                color: $route.path === '/cart' ? 'white' : 'var(--color-text)'
              }"
            >
              {{ $t('nav.cart') }}
              <span v-if="cartItemCount > 0" class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                {{ cartItemCount }}
              </span>
            </router-link>
          </div>
        </div>
        
        <div class="flex items-center space-x-4">
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

.logout-btn:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}
</style>