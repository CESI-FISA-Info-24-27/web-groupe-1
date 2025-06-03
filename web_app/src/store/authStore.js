import { create } from 'zustand'

const useAuthStore = create((set, get) => ({
  // État
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  // Actions
  login: (userData) => {
    set({ 
      user: userData, 
      isAuthenticated: true, 
      error: null 
    })
    localStorage.setItem('user', JSON.stringify(userData))
  },

  logout: () => {
    set({ 
      user: null, 
      isAuthenticated: false, 
      error: null 
    })
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  },

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  initializeAuth: () => {
    try {
      const storedUser = localStorage.getItem('user')
      const token = localStorage.getItem('token')
      
      if (storedUser && token) {
        set({ 
          user: JSON.parse(storedUser), 
          isAuthenticated: true 
        })
      }
    } catch (error) {
      console.error('Erreur lors de l\'initialisation auth:', error)
      get().logout()
    }
  }
}))

export default useAuthStore