import { createStore } from 'vuex'
import { authAPI } from '../services/api'
import templateModule from './modules/template'

export default createStore({
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null,
	  token: localStorage.getItem('token') || null,
	  isLoading: false,
	  cart: JSON.parse(localStorage.getItem('cart')) || [],
	  language: localStorage.getItem('language') || 'en'
  },
  modules: {
    template: templateModule  // ADD THIS LINE
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
      localStorage.setItem('user', JSON.stringify(user)) // Save to localStorage
    },
    SET_TOKEN(state, token) {
      state.token = token
      localStorage.setItem('token', token)
    },
    SET_LOADING(state, isLoading) {
      state.isLoading = isLoading
    },
    CLEAR_AUTH(state) {
      state.user = null
      state.token = null
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    },
    ADD_TO_CART(state, product) {
	  console.log('🛒 Store - ADD_TO_CART mutation called for:', product.title)
	  const existingItem = state.cart.find(item => item.id === product.id)
	  if (existingItem) {
		existingItem.quantity += 1
		console.log('🛒 Updated quantity to:', existingItem.quantity)
	  } else {
		state.cart.push({ ...product, quantity: 1 })
		console.log('🛒 Added new item')
	  }
	  localStorage.setItem('cart', JSON.stringify(state.cart))
	},
    REMOVE_FROM_CART(state, productId) {
      state.cart = state.cart.filter(item => item.id !== productId)
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    UPDATE_CART_QUANTITY(state, { productId, quantity }) {
      const item = state.cart.find(item => item.id === productId)
      if (item) {
        item.quantity = quantity
        localStorage.setItem('cart', JSON.stringify(state.cart))
      }
    },
    CLEAR_CART(state) {
      state.cart = []
      localStorage.removeItem('cart')
    },
	  SET_LANGUAGE(state, language) {
		state.language = language
		localStorage.setItem('language', language)
	  }
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        commit('SET_LOADING', true)
        const response = await authAPI.login(credentials)
        
        // Simpan token dan user info
        commit('SET_TOKEN', response.data.token)
        commit('SET_USER', { 
          username: credentials.username,
          // Tambahkan field lain jika diperlukan
          isAdmin: credentials.username === 'johnd'
        })
        
        return response.data
      } catch (error) {
        throw error.response?.data || error
      } finally {
        commit('SET_LOADING', false)
      }
    },
    logout({ commit }) {
      commit('CLEAR_AUTH')
      commit('CLEAR_CART')
    },
    addToCart({ commit }, product) {
      commit('ADD_TO_CART', product)
    },
    removeFromCart({ commit }, productId) {
      commit('REMOVE_FROM_CART', productId)
    },
    updateCartQuantity({ commit }, payload) {
      commit('UPDATE_CART_QUANTITY', payload)
    },
    clearCart({ commit }) {
      commit('CLEAR_CART')
    },
	  setLanguage({ commit }, language) {
		commit('SET_LANGUAGE', language)
	  }
  },
  getters: {
    isAuthenticated: state => !!state.token,
    isAdmin: state => state.user?.username === 'johnd',
    cartTotal: state => state.cart.reduce((total, item) => total + (item.price * item.quantity), 0),
    cartItemCount: state => state.cart.reduce((count, item) => count + item.quantity, 0)
  }
})