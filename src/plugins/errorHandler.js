// Global error handler
export const errorHandler = {
  install(app) {
    // Global error handler for Vue
    app.config.errorHandler = (err, instance, info) => {
      console.error('Global Vue error handler:', err)
      console.error('Component instance:', instance)
      console.error('Error info:', info)
      
      // You can send errors to logging service here
      // logErrorToService(err, instance, info)
    }

    // Global unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled promise rejection:', event.reason)
      event.preventDefault()
    })

    // Global error handler for window
    window.addEventListener('error', (event) => {
      console.error('Global error:', event.error)
    })
  }
}