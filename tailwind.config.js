module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary, #3B82F6)',
        secondary: 'var(--color-secondary, #1E40AF)',
        accent: 'var(--color-accent, #6366F1)',
        background: 'var(--color-background, #F8FAFC)',
        surface: 'var(--color-surface, #FFFFFF)',
        text: 'var(--color-text, #1F2937)',
        'text-secondary': 'var(--color-text-secondary, #6B7280)',
        border: 'var(--color-border, #E5E7EB)',
        success: 'var(--color-success, #10B981)',
        error: 'var(--color-error, #EF4444)',
        warning: 'var(--color-warning, #F59E0B)',
      },
      borderRadius: {
        'custom': 'var(--border-radius, 0.75rem)',
      },
      boxShadow: {
        'custom': 'var(--shadow, 0 10px 15px -3px rgba(0, 0, 0, 0.1))',
      },
      borderColor: {
        custom: 'var(--color-border, #E5E7EB)',
      }
    },
  },
  plugins: [],
}