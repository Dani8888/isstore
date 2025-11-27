import { templates } from '../config/templates'

export const templateUtils = {
  // Apply template styles to document
  applyTemplate(templateKey) {
    const template = templates[templateKey] || templates.modern
    this.applyTemplateStyles(template)
  },

  // Get current template
  getCurrentTemplate() {
    const saved = localStorage.getItem('template')
    return templates[saved] || templates.modern
  },

  // Generate CSS variables for a template
  generateCSSVariables(template) {
    return `
      :root {
        --color-primary: ${template.colors.primary};
        --color-secondary: ${template.colors.secondary};
        --color-accent: ${template.colors.accent};
        --color-background: ${template.colors.background};
        --color-surface: ${template.colors.surface};
        --color-text: ${template.colors.text};
        --color-text-secondary: ${template.colors.textSecondary};
        --border-radius: ${template.styles.borderRadius};
        --shadow: ${template.styles.shadow};
        --border: ${template.styles.border};
      }
    `
  },

  // Create style element for template
  createStyleElement() {
    let styleElement = document.getElementById('dynamic-template-styles')
    if (!styleElement) {
      styleElement = document.createElement('style')
      styleElement.id = 'dynamic-template-styles'
      document.head.appendChild(styleElement)
    }
    return styleElement
  }
}