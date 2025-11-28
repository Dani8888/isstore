<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="card">
      <h1 class="text-3xl font-bold" style="color: var(--color-text)">{{ $t('products.ourProducts') }}</h1>
      <p class="mt-2" style="color: var(--color-text-secondary)">{{ $t('products.discoverProducts') }}</p>
    </div>

    <!-- Search and Filter -->
    <div class="card">
      <div class="flex flex-col md:flex-row gap-4 mb-4">
        <div class="flex-1">
          <input 
            v-model="searchQuery"
            type="text" 
            :placeholder="$t('common.search')"
            class="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 transition duration-200"
            :style="{
              backgroundColor: 'var(--color-surface)',
              color: 'var(--color-text)',
              borderColor: 'var(--color-border)',
              boxShadow: 'var(--shadow)'
            }"
          >
        </div>
        <select 
          v-model="selectedCategory"
          class="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 transition duration-200"
          :style="{
            backgroundColor: 'var(--color-surface)',
            color: 'var(--color-text)',
            borderColor: 'var(--color-border)',
            boxShadow: 'var(--shadow)'
          }"
        >
          <option value="">{{ $t('products.allCategories') }}</option>
          <option v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
        <select 
          v-model="sortBy"
          class="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 transition duration-200"
          :style="{
            backgroundColor: 'var(--color-surface)',
            color: 'var(--color-text)',
            borderColor: 'var(--color-border)',
            boxShadow: 'var(--shadow)'
          }"
        >
          <option value="title">{{ $t('products.sortByName') }}</option>
          <option value="price">{{ $t('products.sortByPrice') }}</option>
          <option value="rating">{{ $t('products.sortByRating') }}</option>
        </select>
      </div>
      
      <!-- Results Info -->
      <div class="text-sm" style="color: var(--color-text-secondary)">
        {{ $t('common.showing') }} {{ safeDisplayedProducts.length }} {{ $t('common.of') }} {{ safeFilteredProducts.length }} {{ $t('products.title') }}
        <span v-if="selectedCategory"> {{ $t('common.in') }} {{ selectedCategory }}</span>
        <span v-if="searchQuery"> {{ $t('common.matching') }} "{{ searchQuery }}"</span>
      </div>
    </div>

    <!-- Products Grid -->
    <div v-if="!isLoading && safeDisplayedProducts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <ProductCard 
        v-for="product in safeDisplayedProducts" 
        :key="product.id"
        :product="product"
        :show-add-to-cart="true"
        :show-detail="true"
      />
    </div>

    <!-- Loading State -->
    <div v-else-if="isLoading" class="text-center py-12 card">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto" :style="{ borderColor: 'var(--color-primary)' }"></div>
      <p class="mt-4" style="color: var(--color-text-secondary)">{{ $t('common.loading') }}</p>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-12 card">
      <svg class="w-24 h-24 mx-auto mb-4" :style="{ color: 'var(--color-text-secondary)' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h3 class="text-lg font-medium mb-2" style="color: var(--color-text)">{{ $t('products.noProducts') }}</h3>
      <p class="mb-4" style="color: var(--color-text-secondary)">{{ $t('products.adjustSearch') }}</p>
      <button 
        @click="clearFilters"
        class="px-4 py-2 rounded-lg font-semibold transition duration-200 mr-2 text-white hover:opacity-90"
        :style="{
          backgroundColor: 'var(--color-primary)'
        }"
      >
        {{ $t('common.clear') }} {{ $t('common.filters') }}
      </button>
      <button 
        @click="loadProducts"
        class="px-4 py-2 rounded-lg font-semibold transition duration-200 text-white hover:opacity-90"
        :style="{
          backgroundColor: 'var(--color-success)'
        }"
      >
        {{ $t('common.reload') }} {{ $t('products.products') }}
      </button>
    </div>

    <!-- Pagination -->
    <div v-if="!isLoading && safeFilteredProducts.length > 0" class="flex justify-center items-center space-x-4">
      <button 
        @click="currentPage--"
        :disabled="currentPage === 1"
        class="px-4 py-2 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
        :style="{
          backgroundColor: 'var(--color-surface)',
          color: 'var(--color-text)',
          border: '1px solid var(--color-border)'
        }"
      >
        {{ $t('common.previous') }}
      </button>
      
      <span class="text-sm" style="color: var(--color-text-secondary)">
        {{ $t('common.page') }} {{ currentPage }} {{ $t('common.of') }} {{ safeTotalPages }}
      </span>
      
      <button 
        @click="currentPage++"
        :disabled="currentPage === safeTotalPages"
        class="px-4 py-2 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
        :style="{
          backgroundColor: 'var(--color-surface)',
          color: 'var(--color-text)',
          border: '1px solid var(--color-border)'
        }"
      >
        {{ $t('common.next') }}
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import { productsAPI } from '../../services/api'
import ProductCard from '../common/ProductCard.vue'

export default {
  name: 'ProductList',
  components: {
    ProductCard
  },
  setup() {
    const store = useStore()
    const { t } = useI18n()
    
    const allProducts = ref([])
    const categories = ref([])
    const isLoading = ref(true)
    const searchQuery = ref('')
    const selectedCategory = ref('')
    const sortBy = ref('title')
    const currentPage = ref(1)
    const itemsPerPage = 12

    const loadProducts = async () => {
      try {
        isLoading.value = true
        console.log('🔄 Loading products...')
        
        const [productsResponse, categoriesResponse] = await Promise.all([
          productsAPI.getAll(),
          productsAPI.getCategories()
        ])
        
        allProducts.value = productsResponse.data || []
        categories.value = categoriesResponse.data || []

        console.log('✅ Products loaded:', allProducts.value.length)
        console.log('✅ Categories loaded:', categories.value.length)

      } catch (error) {
        console.error('❌ Error loading products:', error)
        allProducts.value = []
        categories.value = []
      } finally {
        isLoading.value = false
      }
    }

    // Safe computed properties dengan null checks
    const safeFilteredProducts = computed(() => {
      try {
        if (!allProducts.value || !Array.isArray(allProducts.value)) {
          return []
        }

        let filtered = [...allProducts.value]

        // Filter by search query
        if (searchQuery.value) {
          const query = searchQuery.value.toLowerCase()
          filtered = filtered.filter(product => {
            const title = product?.title?.toLowerCase() || ''
            const description = product?.description?.toLowerCase() || ''
            const category = product?.category?.toLowerCase() || ''
            return title.includes(query) || description.includes(query) || category.includes(query)
          })
        }

        // Filter by category
        if (selectedCategory.value) {
          filtered = filtered.filter(product => 
            product?.category === selectedCategory.value
          )
        }

        // Sort products
        filtered = filtered.sort((a, b) => {
          if (sortBy.value === 'price') {
            return (a?.price || 0) - (b?.price || 0)
          } else if (sortBy.value === 'rating') {
            return (b?.rating?.rate || 0) - (a?.rating?.rate || 0)
          } else {
            return (a?.title || '').localeCompare(b?.title || '')
          }
        })

        return filtered
      } catch (error) {
        console.error('Error in filteredProducts:', error)
        return []
      }
    })

    const safeDisplayedProducts = computed(() => {
      try {
        if (!safeFilteredProducts.value || safeFilteredProducts.value.length === 0) {
          return []
        }
        const start = (currentPage.value - 1) * itemsPerPage
        const end = start + itemsPerPage
        return safeFilteredProducts.value.slice(start, end)
      } catch (error) {
        console.error('Error in displayedProducts:', error)
        return []
      }
    })

    const safeTotalPages = computed(() => {
      try {
        if (!safeFilteredProducts.value || safeFilteredProducts.value.length === 0) {
          return 0
        }
        return Math.ceil(safeFilteredProducts.value.length / itemsPerPage)
      } catch (error) {
        console.error('Error in totalPages:', error)
        return 0
      }
    })

    const clearFilters = () => {
      searchQuery.value = ''
      selectedCategory.value = ''
      sortBy.value = 'title'
      currentPage.value = 1
    }

    // Reset to page 1 when filters change
    watch([searchQuery, selectedCategory, sortBy], () => {
      currentPage.value = 1
    })

    onMounted(() => {
      console.log('🚀 ProductList mounted')
      loadProducts()
    })

    return {
      safeDisplayedProducts,
      safeFilteredProducts,
      safeTotalPages,
      allProducts,
      categories,
      isLoading,
      searchQuery,
      selectedCategory,
      sortBy,
      currentPage,
      clearFilters,
      loadProducts
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
</style>