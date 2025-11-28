<template>
  <div 
    class="min-h-screen flex items-center justify-center relative overflow-hidden template-transition"
    :style="{ 
      backgroundColor: 'var(--color-background)', 
      color: 'var(--color-text)'
    }"
  >
    <!-- Header dengan Template Switcher dan Language Switcher -->
    <div class="absolute top-0 left-0 right-0 z-20">
      <div class="container mx-auto px-4 py-4">
        <div class="flex justify-between items-center">
          <!-- Template Switcher di kiri -->
          <div class="flex items-center space-x-4">
            <TemplateSwitcher dropdown-direction="down" />
          </div>
          
          <!-- Language Switcher di kanan -->
          <div class="language-switcher-login">
            <button 
              @click="toggleLanguage"
              class="flex items-center space-x-2 px-4 py-2 rounded-2xl border transition duration-300 hover:scale-105 shadow-lg backdrop-blur-lg"
              :style="{
                backgroundColor: 'var(--color-surface)',
                color: 'var(--color-text)',
                borderColor: 'var(--color-primary)',
                boxShadow: 'var(--shadow)'
              }"
            >
              <span class="font-medium text-sm">{{ currentLanguage === 'en' ? '🇺🇸 EN' : '🇮🇩 ID' }}</span>
              <svg 
                class="w-4 h-4 transform transition duration-200" 
                :class="{ 'rotate-180': showLanguageDropdown }"
                :style="{ color: 'var(--color-text)' }"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- Language Dropdown -->
            <div 
              v-if="showLanguageDropdown"
              class="absolute top-full right-0 mt-2 py-2 rounded-2xl border backdrop-blur-lg shadow-2xl min-w-32 z-30"
              :style="{
                backgroundColor: 'var(--color-surface)',
                borderColor: 'var(--color-primary)',
                boxShadow: 'var(--shadow)'
              }"
            >
              <button 
                @click="switchLanguage('en')"
                class="flex items-center space-x-2 w-full px-4 py-2 transition duration-200"
                :style="{
                  color: currentLanguage === 'en' ? 'white' : 'var(--color-text)',
                  backgroundColor: currentLanguage === 'en' ? 'var(--color-primary)' : 'transparent'
                }"
              >
                <span class="text-base">🇺🇸</span>
                <span class="font-medium">English</span>
              </button>
              <button 
                @click="switchLanguage('id')"
                class="flex items-center space-x-2 w-full px-4 py-2 transition duration-200"
                :style="{
                  color: currentLanguage === 'id' ? 'white' : 'var(--color-text)',
                  backgroundColor: currentLanguage === 'id' ? 'var(--color-primary)' : 'transparent'
                }"
              >
                <span class="text-base">🇮🇩</span>
                <span class="font-medium">Indonesia</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Backdrop for Language Dropdown -->
    <div 
      v-if="showLanguageDropdown"
      class="fixed inset-0 z-10"
      @click="showLanguageDropdown = false"
    ></div>

    <!-- Dynamic Background Pattern -->
    <div class="absolute inset-0 z-0">
      <!-- Base Gradient -->
      <div 
        class="absolute inset-0 transition-all duration-1000"
        :style="{ 
          background: `linear-gradient(135deg, ${getGradientColors()})`
        }"
      ></div>
      
      <!-- Wide Grid Pattern -->
      <div 
        class="absolute inset-0 opacity-15"
        :style="{ 
          backgroundImage: `
            linear-gradient(var(--color-primary) 1px, transparent 1px),
            linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          backgroundPosition: 'center center'
        }"
      ></div>
      
      <!-- Animated Floating Squares -->
      <div 
        class="absolute top-1/4 left-1/6 w-32 h-32 rounded-2xl mix-blend-overlay filter blur-sm opacity-30 animate-float"
        :style="{ 
          backgroundColor: 'var(--color-primary)',
          animationDelay: '0s'
        }"
      ></div>
      <div 
        class="absolute top-1/3 right-1/5 w-40 h-40 rounded-2xl mix-blend-overlay filter blur-sm opacity-25 animate-float"
        :style="{ 
          backgroundColor: 'var(--color-accent)',
          animationDelay: '2s'
        }"
      ></div>
      <div 
        class="absolute bottom-1/4 left-1/3 w-36 h-36 rounded-2xl mix-blend-overlay filter blur-sm opacity-20 animate-float"
        :style="{ 
          backgroundColor: 'var(--color-secondary)',
          animationDelay: '4s'
        }"
      ></div>
    </div>

    <!-- Main Content -->
    <div class="relative z-10 w-full max-w-6xl mx-4 xs:mt-12 xs:mb-12">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        <!-- Left Side - Branding -->
        <div class="text-center lg:text-left space-y-8 mt-20">
          <div class="space-y-6">
            <div class="flex items-center justify-center lg:justify-start space-x-4">
              <!-- Logo Istana Group -->
              <div 
                class="w-20 h-20 rounded-2xl flex items-center justify-center shadow-2xl backdrop-blur-lg border overflow-hidden"
                :style="{
                  backgroundColor: 'var(--color-surface)',
                  borderColor: 'var(--color-primary)',
                  boxShadow: 'var(--shadow)'
                }"
              >
                <img 
                  src="/images/istana-group-logo.png" 
                  alt="Istana Group"
                  class="w-16 h-16 object-contain"
                  @error="handleImageError"
                />
              </div>
              <div>
                <h1 
                  class="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-current to-current bg-clip-text text-transparent"
                  :style="{
                    backgroundImage: `linear-gradient(135deg, var(--color-primary), var(--color-accent))`
                  }"
                >
                  Istana Store
                </h1>
                <div 
                  class="h-1 rounded-full mt-2"
                  :style="{
                    background: `linear-gradient(90deg, var(--color-primary), var(--color-accent))`,
                    width: '100px'
                  }"
                ></div>
              </div>
            </div>
            <p 
              class="text-xl opacity-90 max-w-lg mx-auto lg:mx-0 leading-relaxed"
              :style="{ color: 'var(--color-text-secondary)' }"
            >
              {{ $t('auth.welcomeMessage') }}
            </p>
          </div>

          <!-- Features List -->
			<div class="space-y-4 hidden lg:block">
			  <div 
				v-for="feature in features" 
				:key="feature.id" 
				class="flex items-center space-x-4 p-4 rounded-2xl backdrop-blur-sm border transition duration-300 hover:scale-105"
				:style="{
				  backgroundColor: 'var(--color-surface)',
				  borderColor: 'var(--color-border)',
				  boxShadow: 'var(--shadow)'
				}"
			  >
				<div 
				  class="w-10 h-10 rounded-xl flex items-center justify-center"
				  :style="{
					backgroundColor: 'var(--color-primary)',
					boxShadow: 'var(--shadow)'
				  }"
				>
				  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
				  </svg>
				</div>
				<span 
				  class="text-lg font-medium"
				  :style="{ color: 'var(--color-text)' }"
				>
				  {{ $t(`auth.features.${feature.key}`) }}
				</span>
			  </div>
			</div>
		  
        </div>

        <!-- Right Side - Login Form -->
        <div 
          class="rounded-3xl shadow-2xl border p-8 lg:p-10 backdrop-blur-xl mt-8 xs:mb-12"
          :style="{
            backgroundColor: 'var(--color-surface)',
            borderColor: 'var(--color-primary)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            borderWidth: '2px'
          }"
        >
          <div class="text-center mb-8">
            <h2 
              class="text-3xl font-bold mb-3"
              :style="{ color: 'var(--color-text)' }"
            >
              {{ $t('common.welcome') }}
            </h2>
            <p 
              class="text-lg"
              :style="{ color: 'var(--color-text-secondary)' }"
            >
              {{ $t('auth.signIn') }}
            </p>
          </div>

          <!-- Demo Credentials Box -->
          <div 
            class="mb-6 p-4 rounded-2xl border backdrop-blur-lg transition duration-300 hover:scale-105"
            :style="{
              backgroundColor: 'var(--color-background)',
              borderColor: 'var(--color-primary)',
              boxShadow: 'var(--shadow)'
            }"
          >
            <div class="flex items-center space-x-3 mb-3">
              <svg 
                class="w-5 h-5"
                :style="{ color: 'var(--color-warning)' }"
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
              </svg>
              <p 
                class="text-md font-semibold"
                :style="{ color: 'var(--color-text)' }"
              >
                {{ $t('auth.demoCredentials') }}
              </p>
            </div>
            
            <div class="space-y-3">
              <!-- Admin Account -->
              <div>
                <p 
                  class="font-bold mb-1 text-sm"
                  :style="{ color: 'var(--color-warning)' }"
                >
                  {{ $t('auth.adminAccount') }}:
                </p>
                <div class="flex flex-col sm:flex-row gap-2">
                  <div class="relative flex-1">
                    <code 
                      class="w-full px-3 py-2 rounded-xl text-xs font-mono flex items-center justify-between cursor-pointer transition duration-200 hover:opacity-90"
                      :style="{
                        backgroundColor: 'var(--color-primary)',
                        color: 'white',
                        boxShadow: 'var(--shadow)'
                      }"
                      @click="copyToClipboard('johnd', 'admin-username')"
                    >
                      <span>
                        <span class="opacity-80">{{ $t('auth.username') }}:</span> johnd
                      </span>
                      <svg class="w-3 h-3 text-white opacity-70 hover:opacity-100 transition duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </code>
                  </div>
                  
                  <div class="relative flex-1">
                    <code 
                      class="w-full px-3 py-2 rounded-xl text-xs font-mono flex items-center justify-between cursor-pointer transition duration-200 hover:opacity-90"
                      :style="{
                        backgroundColor: 'var(--color-primary)',
                        color: 'white',
                        boxShadow: 'var(--shadow)'
                      }"
                      @click="copyToClipboard('m38rmF$', 'admin-password')"
                    >
                      <span>
                        <span class="opacity-80">{{ $t('auth.password') }}:</span> m38rmF$
                      </span>
                      <svg class="w-3 h-3 text-white opacity-70 hover:opacity-100 transition duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </code>
                  </div>
                </div>
              </div>
              
              <!-- User Accounts -->
              <div>
                <p 
                  class="font-bold mb-1 text-sm"
                  :style="{ color: 'var(--color-warning)' }"
                >
                  {{ $t('auth.userAccounts') }}:
                </p>
                <div class="flex flex-col sm:flex-row gap-2">
                  <div class="relative flex-1">
                    <code 
                      class="w-full px-3 py-2 rounded-xl text-xs font-mono flex items-center justify-between cursor-pointer transition duration-200 hover:opacity-90"
                      :style="{
                        backgroundColor: 'var(--color-primary)',
                        color: 'white',
                        boxShadow: 'var(--shadow)'
                      }"
                      @click="copyToClipboard('mor_2314', 'user-username')"
                    >
                      <span>
                        <span class="opacity-80">{{ $t('auth.username') }}:</span> mor_2314
                      </span>
                      <svg class="w-3 h-3 text-white opacity-70 hover:opacity-100 transition duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </code>
                  </div>
                  
                  <div class="relative flex-1">
                    <code 
                      class="w-full px-3 py-2 rounded-xl text-xs font-mono flex items-center justify-between cursor-pointer transition duration-200 hover:opacity-90"
                      :style="{
                        backgroundColor: 'var(--color-primary)',
                        color: 'white',
                        boxShadow: 'var(--shadow)'
                      }"
                      @click="copyToClipboard('83r5^_', 'user-password')"
                    >
                      <span>
                        <span class="opacity-80">{{ $t('auth.password') }}:</span> 83r5^_
                      </span>
                      <svg class="w-3 h-3 text-white opacity-70 hover:opacity-100 transition duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Login Form -->
          <form class="space-y-4" @submit.prevent="login">
            <div class="space-y-3">
              <!-- Username Field -->
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg 
                    class="h-5 w-5"
                    :style="{ color: 'var(--color-text-secondary)' }"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input 
                  id="username" 
                  v-model="credentials.username"
                  name="username" 
                  type="text" 
                  required 
                  class="block w-full pl-10 pr-4 py-3 rounded-2xl placeholder-opacity-70 focus:outline-none focus:ring-2 focus:border-transparent transition duration-300 backdrop-blur-lg"
                  :style="{
                    backgroundColor: 'var(--color-background)',
                    color: 'var(--color-text)',
                    borderColor: 'var(--color-border)',
                    boxShadow: 'var(--shadow)',
                    borderWidth: '2px'
                  }"
                  :placeholder="$t('auth.username')"
                >
              </div>

              <!-- Password Field -->
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg 
                    class="h-5 w-5"
                    :style="{ color: 'var(--color-text-secondary)' }"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input 
                  id="password" 
                  v-model="credentials.password"
                  name="password" 
                  type="password" 
                  required 
                  class="block w-full pl-10 pr-4 py-3 rounded-2xl placeholder-opacity-70 focus:outline-none focus:ring-2 focus:border-transparent transition duration-300 backdrop-blur-lg"
                  :style="{
                    backgroundColor: 'var(--color-background)',
                    color: 'var(--color-text)',
                    borderColor: 'var(--color-border)',
                    boxShadow: 'var(--shadow)',
                    borderWidth: '2px'
                  }"
                  :placeholder="$t('auth.password')"
                >
              </div>
            </div>

            <!-- Error Message -->
            <div 
              v-if="error" 
              class="rounded-2xl p-3 backdrop-blur-lg border"
              :style="{
                backgroundColor: 'var(--color-error)',
                borderColor: 'var(--color-error)',
                opacity: 0.9
              }"
            >
              <div class="flex items-center">
                <svg class="h-5 w-5 text-white mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
                <p class="text-white text-sm font-medium">{{ error }}</p>
              </div>
            </div>

            <!-- Login Button -->
            <button 
              type="submit" 
              :disabled="isLoading"
              class="group relative w-full py-3 px-6 border border-transparent font-bold rounded-2xl text-white focus:outline-none focus:ring-2 transition duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl"
              :style="{
                background: `linear-gradient(135deg, var(--color-primary), var(--color-accent))`,
                boxShadow: '0 10px 25px -5px var(--color-primary)'
              }"
            >
              <span v-if="isLoading" class="absolute left-0 inset-y-0 flex items-center pl-3">
                <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              </span>
              <span v-if="isLoading" class="opacity-90">{{ $t('auth.signingIn') }}</span>
              <span v-else class="flex items-center justify-center space-x-2">
                <span>{{ $t('common.login') }}</span>
                <svg class="w-5 h-5 transform group-hover:translate-x-1 transition duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
          </form>

          <!-- Additional Info -->
          <div class="mt-6 text-center">
            <p 
              class="text-sm opacity-80"
              :style="{ color: 'var(--color-text-secondary)' }"
            >
              {{ $t('auth.secureLogin') }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 xs:bottom-16">
      <p 
        class="text-sm opacity-70 text-center backdrop-blur-lg rounded-2xl px-4 py-2 border"
        :style="{
          color: 'var(--color-text-secondary)',
          backgroundColor: 'var(--color-surface)',
          borderColor: 'var(--color-border)'
        }"
      >
        {{ $t('auth.copyright') }}
      </p>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted, getCurrentInstance } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import TemplateSwitcher from '../components/common/TemplateSwitcher.vue'

export default {
  name: 'Login',
  components: {
    TemplateSwitcher
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const { locale } = useI18n()
    const { proxy } = getCurrentInstance()

    const credentials = ref({
      username: '',
      password: ''
    })
    const error = ref('')
    const showLanguageDropdown = ref(false)
    const showCopyTooltip = ref('')

    const isLoading = computed(() => store.state.isLoading)
    const currentLanguage = computed(() => locale.value)

    // Features list for the left side
    const features = [
	  { id: 1, key: 'premiumCollection' },
	  { id: 2, key: 'secureCheckout' },
	  { id: 3, key: 'customerSupport' },
	  { id: 4, key: 'memberBenefits' }
	]

    // Function to generate gradient colors based on template
    const getGradientColors = () => {
      const primary = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim() || '#3B82F6'
      const secondary = getComputedStyle(document.documentElement).getPropertyValue('--color-secondary').trim() || '#1E40AF'
      const accent = getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim() || '#6366F1'
      
      return `${primary}99, ${secondary}99, ${accent}99`
    }

    // Function to copy text to clipboard
    const copyToClipboard = async (text, type) => {
      try {
        await navigator.clipboard.writeText(text)
        showCopyTooltip.value = type
        
        // Hide tooltip after 2 seconds
        setTimeout(() => {
          showCopyTooltip.value = ''
        }, 2000)
        
        // Show notification menggunakan proxy.$t
        if (window.showNotification) {
          const message = proxy.$t('auth.copiedToClipboard')
          window.showNotification(message, 'success')
        }
      } catch (err) {
        console.error('Failed to copy text: ', err)
        if (window.showNotification) {
          const message = proxy.$t('auth.failedToCopy')
          window.showNotification(message, 'error')
        }
      }
    }

    // Handle image error
    const handleImageError = (event) => {
      console.error('Failed to load logo image')
      event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiByeD0iMTIiIGZpbGw9IiMzQjgyRjYiLz4KPHN2ZyB4PSIxNiIgeT0iMTYiIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+CjxwYXRoIGQ9Ik0zIDNoMnYuNE03IDEzaDEwbDQtOEg1LjRNNyAxM0w1LjQgNU03IDEzbC0yLjI5MyAyLjI5M2MtLjYzLjYzLS4xODQgMS43MDcuNzA3IDEuNzA3SDE3bTAgMGEyIDIgMCAxMDAgNGEyIDIgMCAwMDAtNHptLTggMmEyIDIgMCAxMS00IDBhMiAyIDAgMDE0IDB6Ii8+Cjwvc3ZnPgo8L3N2Zz4K'
    }

    const toggleLanguage = () => {
      showLanguageDropdown.value = !showLanguageDropdown.value
    }

    const switchLanguage = (lang) => {
      locale.value = lang
      localStorage.setItem('language', lang)
      showLanguageDropdown.value = false
    }

    const login = async () => {
      try {
        error.value = ''
        await store.dispatch('login', credentials.value)
        
        const isAdmin = store.getters.isAdmin
        router.push(isAdmin ? '/admin' : '/user')
      } catch (err) {
        error.value = err.message || proxy.$t('auth.loginFailed')
      }
    }

    const handleClickOutside = (event) => {
      if (!event.target.closest('.language-switcher-login')) {
        showLanguageDropdown.value = false
      }
    }

    onMounted(() => {
      document.addEventListener('click', handleClickOutside)
    })

    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside)
    })

    return {
      credentials,
      error,
      isLoading,
      features,
      showLanguageDropdown,
      showCopyTooltip,
      currentLanguage,
      getGradientColors,
      copyToClipboard,
      handleImageError,
      toggleLanguage,
      switchLanguage,
      login
    }
  }
}
</script>

<style scoped>
/* Custom breakpoint untuk layar sangat kecil (di bawah 400px) */
@media (max-width: 400px) {
  .xs\:mt-12 {
    margin-top: 3rem !important; /* 48px */
  }
  
  .xs\:mb-12 {
    margin-bottom: 3rem !important; /* 48px */
  }
}

/* Custom animations */
@keyframes float {
  0%, 100% { 
    transform: translateY(0px) rotate(0deg); 
  }
  33% { 
    transform: translateY(-20px) rotate(120deg); 
  }
  66% { 
    transform: translateY(10px) rotate(240deg); 
  }
}

.animate-float {
  animation: float 8s ease-in-out infinite;
}

/* Smooth transitions for all interactive elements */
.template-transition * {
  transition: all 0.3s ease;
}

/* Language Switcher Animations */
.language-switcher-login {
  position: relative;
}

.language-switcher-login .absolute {
  animation: slideDown 0.2s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  .text-4xl {
    font-size: 2rem;
  }
  
  .text-5xl {
    font-size: 2.5rem;
  }
}

/* Glass morphism effect enhancement */
.backdrop-blur-lg {
  backdrop-filter: blur(20px);
}

.backdrop-blur-xl {
  backdrop-filter: blur(40px);
}
.login-template-switcher .templates-grid {
  top: 100% !important;
  bottom: auto !important;
  left: 0 !important;
  right: auto !important;
  margin-top: 0.5rem !important;
  margin-bottom: 0 !important;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 5px 10px -5px rgba(0, 0, 0, 0.04) !important;
}
</style>