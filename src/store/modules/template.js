import { templates } from '../../config/templates'

const state = {
  currentTemplate: localStorage.getItem('template') || 'modern',
  templates: templates
}

const mutations = {
  SET_TEMPLATE(state, templateKey) {
    state.currentTemplate = templateKey
    localStorage.setItem('template', templateKey)
  }
}

const actions = {
  switchTemplate({ commit, state }, templateKey) {
    if (state.templates[templateKey]) {
      commit('SET_TEMPLATE', templateKey)
      applyTemplateStyles(state.templates[templateKey])
    }
  },
  
  initializeTemplate({ state }) {
    const savedTemplate = localStorage.getItem('template') || 'modern'
    const template = state.templates[savedTemplate] || state.templates.modern
    applyTemplateStyles(template)
  }
}

const getters = {
  currentTemplate: (state) => state.templates[state.currentTemplate] || state.templates.modern,
  availableTemplates: (state) => Object.values(state.templates)
}

// Utility function to apply CSS variables
function applyTemplateStyles(template) {
  const root = document.documentElement
  
  // Apply all color variables
  Object.entries(template.colors).forEach(([key, value]) => {
    root.style.setProperty(`--color-${key}`, value)
  })
  
  // Apply style variables
  root.style.setProperty('--border-radius', template.styles.borderRadius)
  root.style.setProperty('--shadow', template.styles.shadow)
  
  // Update meta theme color for mobile browsers
  const metaThemeColor = document.querySelector('meta[name="theme-color"]')
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', template.colors.primary)
  }
  
  // Force re-render for all components
  document.body.style.display = 'none'
  document.body.offsetHeight // Trigger reflow
  document.body.style.display = ''
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}