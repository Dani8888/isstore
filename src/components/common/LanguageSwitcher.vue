<template>
  <div class="language-switcher">
    <button 
      @click="toggleLanguage"
      class="flex items-center space-x-2 px-3 py-2 rounded-lg border transition duration-200 hover:scale-105"
      :style="{
        backgroundColor: 'var(--color-surface)',
        color: 'var(--color-text)',
        borderColor: 'var(--color-primary)'
      }"
      :title="currentLanguage === 'en' ? 'Switch to Indonesian' : 'Switch to English'"
    >
      <span class="text-sm font-medium">{{ currentLanguage === 'en' ? '🇺🇸 EN' : '🇮🇩 ID' }}</span>
      <svg 
        class="w-4 h-4" 
        :style="{ color: 'var(--color-text-secondary)' }"
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  </div>
</template>

<script>
import { useI18n } from 'vue-i18n'

export default {
  name: 'LanguageSwitcher',
  setup() {
    const { locale } = useI18n()

    const toggleLanguage = () => {
      const newLocale = locale.value === 'en' ? 'id' : 'en'
      locale.value = newLocale
      localStorage.setItem('language', newLocale)
    }

    return {
      currentLanguage: locale,
      toggleLanguage
    }
  }
}
</script>