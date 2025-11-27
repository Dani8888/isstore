<template>
  <div class="template-switcher relative">
    <!-- Switcher Button -->
    <button 
      @click="showTemplates = !showTemplates"
      class="switcher-btn flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-all duration-300 hover:scale-105 shadow-lg"
      :style="{
        backgroundColor: currentTemplate.colors.surface,
        color: currentTemplate.colors.text,
        borderColor: currentTemplate.colors.primary,
        boxShadow: currentTemplate.styles.shadow
      }"
    >
      <span class="w-5 h-5 rounded-full flex items-center justify-center">
        <span class="w-3 h-3 rounded-full" :style="{ backgroundColor: currentTemplate.colors.primary }"></span>
      </span>
      <span class="font-semibold text-sm">{{ currentTemplate.name }}</span>
      <svg 
        class="w-4 h-4 transition-transform duration-200" 
        :class="{ 'rotate-180': showTemplates }"
        :style="{ color: currentTemplate.colors.text }"
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <!-- Templates Grid - DROPDOWN KE BAWAH UNTUK LOGIN -->
    <div 
      v-if="showTemplates"
      class="templates-grid absolute mt-2 p-4 rounded-xl border backdrop-blur-lg z-50 max-h-80 overflow-y-auto"
      :class="[dropdownDirection === 'down' ? 'top-full left-0' : 'bottom-full right-0']"
      :style="{
        backgroundColor: currentTemplate.colors.surface + 'EE',
        borderColor: currentTemplate.colors.primary,
        boxShadow: dropdownDirection === 'down' 
          ? '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 5px 10px -5px rgba(0, 0, 0, 0.04)'
          : '0 -10px 25px -5px rgba(0, 0, 0, 0.1), 0 -5px 10px -5px rgba(0, 0, 0, 0.04)'
      }"
    >
      <h3 class="text-sm font-bold mb-3 text-center" :style="{ color: currentTemplate.colors.text }">
        Choose Theme
      </h3>
      <div class="grid grid-cols-2 gap-3 min-w-72">
        <div
          v-for="template in templateList"
          :key="template.id"
          @click="switchTemplate(template.id)"
          class="template-card p-3 rounded-lg border-2 cursor-pointer transition-all duration-300 hover:scale-105 group"
          :class="{ 'ring-2 ring-offset-2': currentTemplate.id === template.id }"
          :style="getTemplateCardStyle(template)"
        >
          <div class="template-preview mb-2">
            <div 
              class="preview-header h-3 rounded mb-1 transition-all duration-300 group-hover:opacity-90"
              :style="{ backgroundColor: template.colors.primary }"
            ></div>
            <div class="preview-content space-y-1">
              <div 
                class="preview-item h-2 rounded transition-all duration-300 group-hover:opacity-90"
                :style="{ backgroundColor: template.colors.secondary }"
              ></div>
              <div 
                class="preview-item h-2 rounded w-3/4 transition-all duration-300 group-hover:opacity-90"
                :style="{ backgroundColor: template.colors.accent }"
              ></div>
            </div>
          </div>
          <div class="template-info">
            <p 
              class="template-name text-xs font-semibold truncate mb-1"
              :style="{ color: template.colors.text }"
            >
              {{ template.name }}
            </p>
            <p 
              class="template-desc text-xs truncate opacity-75"
              :style="{ color: template.colors.textSecondary }"
            >
              {{ template.description }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Backdrop -->
    <div 
      v-if="showTemplates"
      class="fixed inset-0 z-40"
      @click="showTemplates = false"
    ></div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import { templates } from '../../config/templates'

export default {
  name: 'TemplateSwitcher',
  props: {
    dropdownDirection: {
      type: String,
      default: 'up', // 'up' atau 'down'
      validator: (value) => ['up', 'down'].includes(value)
    }
  },
  setup(props) {
    const store = useStore()
    const showTemplates = ref(false)

    const currentTemplate = computed(() => {
      const templateId = store.state.template?.currentTemplate || 'modern'
      return templates[templateId] || templates.modern
    })

    const templateList = computed(() => Object.values(templates))

    const getTemplateCardStyle = (template) => {
      const isActive = currentTemplate.value.id === template.id
      return {
        backgroundColor: template.colors.surface,
        borderColor: isActive ? template.colors.primary : 'transparent',
        borderRadius: template.styles.borderRadius,
        boxShadow: isActive ? template.styles.shadow : 'none'
      }
    }

    const switchTemplate = (templateId) => {
      store.dispatch('template/switchTemplate', templateId)
      showTemplates.value = false
      
      // Show notification
      if (window.showNotification) {
        window.showNotification(`🎨 Theme changed to ${templates[templateId].name}`, 'success')
      }
    }

    const handleClickOutside = (event) => {
      if (!event.target.closest('.template-switcher')) {
        showTemplates.value = false
      }
    }

    onMounted(() => {
      document.addEventListener('click', handleClickOutside)
    })

    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside)
    })

    return {
      showTemplates,
      currentTemplate,
      templateList,
      switchTemplate,
      getTemplateCardStyle
    }
  }
}
</script>

<style scoped>
.templates-grid {
  scrollbar-width: thin;
  scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
}

.templates-grid::-webkit-scrollbar {
  width: 6px;
}

.templates-grid::-webkit-scrollbar-track {
  background: transparent;
}

.templates-grid::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 3px;
}

.template-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.template-card:hover {
  transform: translateY(-2px);
}

/* Animation for dropdown */
.templates-grid {
  animation: slideIn 0.2s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>