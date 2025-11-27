<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium mb-1" :style="{ color: 'var(--color-text)' }">{{ $t('user.firstName') }} *</label>
        <input 
          v-model="formData.name.firstname"
          type="text" 
          required
          class="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 transition duration-200"
          :style="{
            backgroundColor: 'var(--color-surface)',
            color: 'var(--color-text)',
            borderColor: 'var(--color-border)',
            boxShadow: 'var(--shadow)'
          }"
          :placeholder="$t('user.enterFirstName')"
        >
      </div>
      <div>
        <label class="block text-sm font-medium mb-1" :style="{ color: 'var(--color-text)' }">{{ $t('user.lastName') }} *</label>
        <input 
          v-model="formData.name.lastname"
          type="text" 
          required
          class="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 transition duration-200"
          :style="{
            backgroundColor: 'var(--color-surface)',
            color: 'var(--color-text)',
            borderColor: 'var(--color-border)',
            boxShadow: 'var(--shadow)'
          }"
          :placeholder="$t('user.enterLastName')"
        >
      </div>
    </div>

    <div>
      <label class="block text-sm font-medium mb-1" :style="{ color: 'var(--color-text)' }">{{ $t('user.username') }} *</label>
      <input 
        v-model="formData.username"
        type="text" 
        required
        class="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 transition duration-200"
        :style="{
          backgroundColor: 'var(--color-surface)',
          color: 'var(--color-text)',
          borderColor: 'var(--color-border)',
          boxShadow: 'var(--shadow)'
        }"
        :placeholder="$t('user.enterUsername')"
      >
    </div>

    <div>
      <label class="block text-sm font-medium mb-1" :style="{ color: 'var(--color-text)' }">{{ $t('user.email') }} *</label>
      <input 
        v-model="formData.email"
        type="email" 
        required
        class="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 transition duration-200"
        :style="{
          backgroundColor: 'var(--color-surface)',
          color: 'var(--color-text)',
          borderColor: 'var(--color-border)',
          boxShadow: 'var(--shadow)'
        }"
        :placeholder="$t('user.enterEmail')"
      >
    </div>

    <div v-if="!editingMode">
      <label class="block text-sm font-medium mb-1" :style="{ color: 'var(--color-text)' }">{{ $t('user.password') }} *</label>
      <input 
        v-model="formData.password"
        type="password" 
        required
        class="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 transition duration-200"
        :style="{
          backgroundColor: 'var(--color-surface)',
          color: 'var(--color-text)',
          borderColor: 'var(--color-border)',
          boxShadow: 'var(--shadow)'
        }"
        :placeholder="$t('user.enterPassword')"
      >
      <p class="text-xs mt-1" :style="{ color: 'var(--color-text-secondary)' }">{{ $t('user.defaultPassword') }}</p>
    </div>

    <div>
      <label class="block text-sm font-medium mb-1" :style="{ color: 'var(--color-text)' }">{{ $t('user.phone') }} *</label>
      <input 
        v-model="formData.phone"
        type="tel" 
        required
        class="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 transition duration-200"
        :style="{
          backgroundColor: 'var(--color-surface)',
          color: 'var(--color-text)',
          borderColor: 'var(--color-border)',
          boxShadow: 'var(--shadow)'
        }"
        :placeholder="$t('user.enterPhone')"
      >
    </div>

    <div class="border-t pt-4" :style="{ borderColor: 'var(--color-border)' }">
      <label class="block text-sm font-medium mb-2" :style="{ color: 'var(--color-text)' }">{{ $t('user.address') }}</label>
      <div class="grid grid-cols-2 gap-4">
        <div class="col-span-2">
          <input 
            v-model="formData.address.street"
            type="text" 
            class="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 transition duration-200"
            :style="{
              backgroundColor: 'var(--color-surface)',
              color: 'var(--color-text)',
              borderColor: 'var(--color-border)',
              boxShadow: 'var(--shadow)'
            }"
            :placeholder="$t('user.street')"
          >
        </div>
        <div>
          <input 
            v-model="formData.address.city"
            type="text" 
            class="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 transition duration-200"
            :style="{
              backgroundColor: 'var(--color-surface)',
              color: 'var(--color-text)',
              borderColor: 'var(--color-border)',
              boxShadow: 'var(--shadow)'
            }"
            :placeholder="$t('user.city')"
          >
        </div>
        <div>
          <input 
            v-model="formData.address.zipcode"
            type="text" 
            class="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 transition duration-200"
            :style="{
              backgroundColor: 'var(--color-surface)',
              color: 'var(--color-text)',
              borderColor: 'var(--color-border)',
              boxShadow: 'var(--shadow)'
            }"
            :placeholder="$t('user.zipCode')"
          >
        </div>
      </div>
    </div>

    <div class="flex justify-end space-x-3 pt-6 border-t" :style="{ borderColor: 'var(--color-border)' }">
      <button 
        type="button" 
        @click="$emit('cancel')"
        class="px-4 py-2 rounded transition duration-200 border font-medium"
        :style="{
          backgroundColor: 'var(--color-surface)',
          color: 'var(--color-text)',
          borderColor: 'var(--color-border)',
          boxShadow: 'var(--shadow)'
        }"
      >
        {{ $t('common.cancel') }}
      </button>
      <button 
        type="submit"
        :disabled="isSubmitting"
        class="px-4 py-2 rounded transition duration-200 text-white font-medium hover:opacity-90 disabled:opacity-50"
        :style="{
          backgroundColor: 'var(--color-primary)',
          boxShadow: 'var(--shadow)'
        }"
      >
        <span v-if="isSubmitting">{{ $t('common.saving') }}...</span>
        <span v-else>{{ editingMode ? $t('common.update') : $t('common.create') }} {{ $t('user.user') }}</span>
      </button>
    </div>
  </form>
</template>

<script>
import { ref, watch, computed, getCurrentInstance } from 'vue'

export default {
  name: 'UserForm',
  props: {
    user: {
      type: Object,
      default: null
    }
  },
  emits: ['save', 'cancel'],
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance()
    const isSubmitting = ref(false)
    const formData = ref({
      email: '',
      username: '',
      password: 'm38rmF$',
      name: {
        firstname: '',
        lastname: ''
      },
      address: {
        city: '',
        street: '',
        zipcode: '',
        geolocation: {
          lat: '',
          long: ''
        }
      },
      phone: ''
    })

    // Computed property untuk cek mode edit
    const editingMode = computed(() => !!props.user?.id)

    const handleSubmit = async () => {
      try {
        isSubmitting.value = true
        
        // Validasi form
        if (!formData.value.name.firstname || !formData.value.name.lastname) {
          alert(proxy.$t('user.fillFirstNameLastName'))
          return
        }
        
        if (!formData.value.username || !formData.value.email) {
          alert(proxy.$t('user.fillUsernameEmail'))
          return
        }
        
        if (!editingMode.value && !formData.value.password) {
          alert(proxy.$t('user.enterPassword'))
          return
        }

        // Siapkan data untuk dikirim
        const userToSave = { 
          ...formData.value,
          address: {
            ...formData.value.address,
            number: formData.value.address.number || 1,
            geolocation: {
              lat: formData.value.address.geolocation?.lat || '0',
              long: formData.value.address.geolocation?.long || '0'
            }
          }
        }

        console.log('💾 Saving user data:', userToSave)
        emit('save', userToSave)
        
      } catch (error) {
        console.error('Form error:', error)
        alert(proxy.$t('user.errorSaving') + error.message)
      } finally {
        isSubmitting.value = false
      }
    }

    watch(() => props.user, (newUser) => {
      if (newUser) {
        // Edit mode
        console.log('✏️ Editing user data:', newUser)
        formData.value = { 
          ...newUser,
          name: newUser.name || { firstname: '', lastname: '' },
          address: newUser.address || { 
            city: '', 
            street: '', 
            zipcode: '',
            geolocation: { lat: '', long: '' }
          },
          password: 'm38rmF$'
        }
      } else {
        // Create mode - reset form
        console.log('🆕 Creating new user')
        formData.value = {
          email: '',
          username: '',
          password: 'm38rmF$',
          name: {
            firstname: '',
            lastname: ''
          },
          address: {
            city: '',
            street: '',
            zipcode: '',
            geolocation: {
              lat: '',
              long: ''
            }
          },
          phone: ''
        }
      }
    }, { immediate: true })

    return {
      formData,
      isSubmitting,
      editingMode,
      handleSubmit
    }
  }
}
</script>