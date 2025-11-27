<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="bg-white rounded-lg shadow p-6">
      <h1 class="text-3xl font-bold text-gray-800">{{ $t('admin.adminDashboard') }}</h1>
      <p class="text-gray-600 mt-2">{{ $t('admin.manageProductsUsers') }}</p>
    </div>

    <!-- Tabs -->
    <div class="bg-white rounded-lg shadow">
      <div class="border-b border-gray-200">
        <nav class="flex -mb-px">
          <button 
            v-for="tab in tabs" 
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'px-6 py-4 text-sm font-medium border-b-2 transition duration-200',
              activeTab === tab.id 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            {{ $t(tab.nameKey) }}
          </button>
        </nav>
      </div>

      <div class="p-6">
        <!-- Products Tab -->
        <div v-if="activeTab === 'products'">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-gray-800">{{ $t('admin.productsManagement') }}</h2>
            <button 
              @click="showProductForm = true"
              class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-200"
            >
              {{ $t('admin.addNewProduct') }}
            </button>
          </div>

          <!-- Products Grid -->
          <div v-if="products.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <ProductCard 
              v-for="product in products" 
              :key="product.id"
              :product="product"
              :show-edit="true"
              :show-delete="true"
              @edit="editProduct"
              @delete="deleteProduct"
            />
          </div>
          <div v-else class="text-center py-12">
            <p class="text-gray-500 text-lg">{{ $t('products.noProducts') }}</p>
          </div>
        </div>

        <!-- Users Tab -->
        <div v-else-if="activeTab === 'users'">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-gray-800">{{ $t('admin.usersManagement') }}</h2>
            <div class="flex items-center space-x-4">
              <span class="text-sm text-gray-600">{{ $t('common.total') }}: {{ users.length }} {{ $t('admin.user') }}</span>
              <button 
                @click="loadUsers"
                class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition duration-200"
              >
                {{ $t('admin.refreshUsers') }}
              </button>
              <button 
                @click="showUserForm = true"
                class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-200"
              >
                {{ $t('admin.addNewUser') }}
              </button>
            </div>
          </div>

          <!-- Loading State -->
          <div v-if="usersLoading" class="text-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p class="text-gray-500 mt-4">{{ $t('common.loading') }}</p>
          </div>

          <!-- Users Table -->
          <div v-else-if="users.length > 0" class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{ $t('admin.user') }}</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{ $t('admin.email') }}</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{ $t('admin.phone') }}</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{ $t('common.address') }}</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{ $t('admin.actions') }}</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="user in users" :key="user.id">
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ user.id }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-10 w-10">
                        <div class="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                          <span class="text-white font-medium text-sm">
                            {{ getUserInitial(user) }}
                          </span>
                        </div>
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">
                          {{ getFullName(user) }}
                        </div>
                        <div class="text-sm text-gray-500">
                          {{ getUsername(user) }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ getEmail(user) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ getPhone(user) }}
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-500">
                    {{ getAddress(user) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      @click="editUser(user)" 
                      class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs mr-2 transition duration-200"
                    >
                      {{ $t('common.edit') }}
                    </button>
                    <button 
                      @click="deleteUser(user.id)" 
                      class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs transition duration-200"
                    >
                      {{ $t('common.delete') }}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Empty State -->
          <div v-else class="text-center py-12 bg-white rounded-lg shadow">
            <svg class="w-24 h-24 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
            <h3 class="text-lg font-medium text-gray-900 mb-2">{{ $t('admin.noUsers') }}</h3>
            <p class="text-gray-500 mb-4">{{ $t('admin.noUsersDisplay') }}</p>
            <button 
              @click="loadUsers"
              class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-200"
            >
              {{ $t('admin.loadUsers') }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Product Form Modal -->
    <Modal 
      :show="showProductForm" 
      :title="editingProduct ? $t('admin.editProduct') : $t('admin.addNewProduct')"
      type="form"
      @close="closeProductForm"
    >
      <ProductForm 
        :product="editingProduct"
        @save="saveProduct"
        @cancel="closeProductForm"
      />
    </Modal>

    <!-- User Form Modal -->
    <Modal 
      :show="showUserForm" 
      :title="editingUser ? $t('admin.editUser') : $t('admin.addNewUser')"
      type="form"
      @close="closeUserForm"
    >
      <UserForm 
        :user="editingUser"
        @save="saveUser"
        @cancel="closeUserForm"
      />
    </Modal>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { productsAPI, usersAPI } from '../../services/api'
import ProductCard from '../common/ProductCard.vue'
import Modal from '../common/Modal.vue'
import ProductForm from './ProductForm.vue'
import UserForm from './UserForm.vue'

export default {
  name: 'AdminDashboard',
  components: {
    ProductCard,
    Modal,
    ProductForm,
    UserForm
  },
  setup() {
    const activeTab = ref('products')
    const products = ref([])
    const users = ref([])
    const showProductForm = ref(false)
    const showUserForm = ref(false)
    const editingProduct = ref(null)
    const editingUser = ref(null)
    const usersLoading = ref(false)

    const tabs = [
      { id: 'products', nameKey: 'nav.products' },
      { id: 'users', nameKey: 'admin.user' }
    ]

    // User Data Methods
    const getUserInitial = (user) => {
      if (!user) return '?'
      
      if (user.name) {
        if (typeof user.name === 'object') {
          const first = user.name.firstname || user.name.firstName || ''
          const last = user.name.lastname || user.name.lastName || ''
          return (first.charAt(0) + last.charAt(0)).toUpperCase() || '?'
        } else if (typeof user.name === 'string') {
          return user.name.charAt(0).toUpperCase()
        }
      }
      
      const first = user.firstname || user.firstName || ''
      const last = user.lastname || user.lastName || ''
      const initials = (first.charAt(0) + last.charAt(0)).toUpperCase()
      return initials || '?'
    }

    const getFullName = (user) => {
      if (!user) return 'No Name'
      
      if (user.name) {
        if (typeof user.name === 'object') {
          const first = user.name.firstname || user.name.firstName || ''
          const last = user.name.lastname || user.name.lastName || ''
          return `${first} ${last}`.trim() || 'No Name'
        } else if (typeof user.name === 'string') {
          return user.name
        }
      }
      
      const first = user.firstname || user.firstName || ''
      const last = user.lastname || user.lastName || ''
      const fullName = `${first} ${last}`.trim()
      return fullName || 'No Name'
    }

    const getUsername = (user) => {
      if (!user) return 'No Username'
      return user.username ? `@${user.username}` : 'No Username'
    }

    const getEmail = (user) => {
      if (!user) return 'No Email'
      return user.email || 'No Email'
    }

    const getPhone = (user) => {
      if (!user) return 'No Phone'
      return user.phone || user.phoneNumber || 'No Phone'
    }

    const getAddress = (user) => {
      if (!user) return 'No Address'
      
      if (user.address) {
        if (typeof user.address === 'object') {
          const city = user.address.city || ''
          const street = user.address.street || user.address.streetAddress || ''
          const zipcode = user.address.zipcode || user.address.zipCode || ''
          
          if (city && street) {
            return `${street}, ${city} ${zipcode}`.trim()
          } else if (city) {
            return city
          } else if (street) {
            return street
          }
        } else if (typeof user.address === 'string') {
          return user.address
        }
      }
      return 'No Address'
    }

    // Products Management
    const loadProducts = async () => {
      try {
        const response = await productsAPI.getAll()
        products.value = response.data
        console.log('✅ Products loaded:', products.value.length)
      } catch (error) {
        console.error('Error loading products:', error)
      }
    }

    const editProduct = (product) => {
      editingProduct.value = { ...product }
      showProductForm.value = true
    }

    const deleteProduct = async (productId) => {
      if (confirm('Are you sure you want to delete this product?')) {
        try {
          await productsAPI.delete(productId)
          products.value = products.value.filter(p => p.id !== productId)
        } catch (error) {
          console.error('Error deleting product:', error)
        }
      }
    }

    const saveProduct = async (productData) => {
      try {
        if (productData.id) {
          // Update existing product
          await productsAPI.update(productData.id, productData)
          const index = products.value.findIndex(p => p.id === productData.id)
          if (index !== -1) {
            products.value[index] = productData
          }
        } else {
          // CREATE NEW PRODUCT - Add to TOP of list
          const response = await productsAPI.create(productData)
          const newProduct = response.data
          
          // Add new product to the BEGINNING of the array
          products.value.unshift(newProduct)
          
          console.log('✅ New product added to top of list:', newProduct.title)
        }
        closeProductForm()
      } catch (error) {
        console.error('Error saving product:', error)
      }
    }

    const closeProductForm = () => {
      showProductForm.value = false
      editingProduct.value = null
    }

    // Users Management
    const loadUsers = async () => {
      try {
        usersLoading.value = true
        console.log('🔄 Loading users from API...')
        
        const response = await fetch('https://fakestoreapi.com/users')
        const usersData = await response.json()
        
        console.log('📋 RAW USERS DATA:', usersData)
        
        if (Array.isArray(usersData) && usersData.length > 0) {
          users.value = usersData
          console.log('✅ Users loaded successfully:', users.value.length)
        } else {
          console.warn('⚠️ No users data received')
          users.value = []
        }
        
      } catch (error) {
        console.error('❌ Error loading users:', error)
        users.value = []
      } finally {
        usersLoading.value = false
      }
    }

    const saveUser = async (userData) => {
      try {
        console.log('💾 SAVE USER STARTED - Raw data:', userData)
        
        if (!userData) {
          console.error('❌ userData is undefined in saveUser!')
          alert('Error: User data is missing')
          return
        }
        
        if (userData.id) {
          // UPDATE EXISTING USER
          console.log('🔄 Updating existing user:', userData.id)
          
          try {
            const response = await usersAPI.update(userData.id, userData)
            console.log('Update API response:', response.data)
          } catch (apiError) {
            console.log('API update failed, using local state:', apiError)
          }
          
          // Update local state
          const index = users.value.findIndex(u => u.id === userData.id)
          if (index !== -1) {
            users.value[index] = { ...userData }
            console.log('✅ User updated locally')
          }
          
        } else {
          // CREATE NEW USER - Add to TOP of list
          console.log('🆕 Creating new user')
          
          const newUser = {
            id: Date.now(), // Generate unique ID
            email: userData.email || 'No Email',
            username: userData.username || 'No Username', 
            phone: userData.phone || 'No Phone',
            name: {
              firstname: userData.name?.firstname || 'No',
              lastname: userData.name?.lastname || 'Name'
            },
            address: {
              city: userData.address?.city || '',
              street: userData.address?.street || '',
              zipcode: userData.address?.zipcode || '',
              number: userData.address?.number || 1,
              geolocation: {
                lat: '0',
                long: '0'
              }
            }
          }
          
          console.log('👤 New user object:', newUser)
          
          try {
            const response = await usersAPI.create(newUser)
            console.log('Create user API response:', response.data)
          } catch (apiError) {
            console.log('API create failed, using local state:', apiError)
          }
          
          // Tambahkan ke AWAL array (TOP of list)
          users.value.unshift(newUser)
          console.log('✅ User added to TOP of list. Total users:', users.value.length)
        }
        
        // Tutup modal
        closeUserForm()
        
        // Show success message
        if (window.showNotification) {
          window.showNotification('User saved successfully!', 'success')
        } else {
          alert('User saved successfully!')
        }
        
      } catch (error) {
        console.error('❌ Error in saveUser:', error)
        if (window.showNotification) {
          window.showNotification('Error saving user: ' + error.message, 'error')
        } else {
          alert('Error saving user: ' + error.message)
        }
      }
    }

    const editUser = (user) => {
      editingUser.value = { ...user }
      showUserForm.value = true
    }

    const deleteUser = async (userId) => {
      if (confirm('Are you sure you want to delete this user?')) {
        try {
          await usersAPI.delete(userId)
          users.value = users.value.filter(u => u.id !== userId)
        } catch (error) {
          console.error('Error deleting user:', error)
        }
      }
    }

    const closeUserForm = () => {
      showUserForm.value = false
      editingUser.value = null
    }

    onMounted(() => {
      loadProducts()
      loadUsers()
    })

    return {
      activeTab,
      tabs,
      products,
      users,
      showProductForm,
      showUserForm,
      editingProduct,
      editingUser,
      usersLoading,
      getUserInitial,
      getFullName,
      getUsername,
      getEmail,
      getPhone,
      getAddress,
      editProduct,
      deleteProduct,
      saveProduct,
      closeProductForm,
      editUser,
      deleteUser,
      saveUser,
      closeUserForm,
      loadUsers
    }
  }
}
</script>