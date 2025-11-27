import axios from 'axios'

const BASE_URL = 'https://fakestoreapi.com'

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
})

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
}

// Products API
export const productsAPI = {
  getAll: () => api.get('/products'),
  getById: (id) => api.get(`/products/${id}`),
  create: (product) => api.post('/products', product),
  update: (id, product) => api.put(`/products/${id}`, product),
  delete: (id) => api.delete(`/products/${id}`),
  getCategories: () => api.get('/products/categories'),
}

// Users API
export const usersAPI = {
	getAll: () => api.get('/products')
	  .then(response => {
		if (!response.data) {
		  throw new Error('No data received from API')
		}
		return response
	  })
	  .catch(error => {
		console.error('API Error:', error)
		throw error
	  }),
  getById: (id) => api.get(`/users/${id}`),
  create: (user) => api.post('/users', user),
  update: (id, user) => api.put(`/users/${id}`, user),
  delete: (id) => api.delete(`/users/${id}`),
}

// Carts API
export const cartsAPI = {
  getAll: () => api.get('/carts'),
  getById: (id) => api.get(`/carts/${id}`),
  create: (cart) => api.post('/carts', cart),
  update: (id, cart) => api.put(`/carts/${id}`, cart),
  delete: (id) => api.delete(`/carts/${id}`),
  getUserCart: (userId) => api.get(`/carts/user/${userId}`),
}

export default api