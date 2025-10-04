import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  email: string
  name?: string
  image?: string
  points: number
  badges: any[]
  completed_products: string[] // Changed from completed_weeks
  purchased_product_ids: string[]
  progress: Record<string, number>
}

interface UserState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  
  // Actions
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  updateUserProgress: (productId: string, progress: number) => void
  completeProduct: (productId: string) => void
  addPurchase: (productId: string) => void
  
  // Access control helpers
  hasAccessToProduct: (productId: string) => boolean
  hasAccessToLesson: (lesson: { product_id: string }) => boolean
  getAccessibleProducts: () => string[]
  getCompletedProducts: () => string[]
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      isAuthenticated: false,

      setUser: (user) => set({ 
        user, 
        isAuthenticated: !!user 
      }),

      setLoading: (isLoading) => set({ isLoading }),

      updateUserProgress: (productId, progress) => {
        const state = get()
        if (!state.user) return
        
        set({
          user: {
            ...state.user,
            progress: {
              ...state.user.progress,
              [productId]: progress
            }
          }
        })
      },

      completeProduct: (productId) => {
        const state = get()
        if (!state.user) return
        
        const completedProducts = [...(state.user.completed_products || [])]
        if (!completedProducts.includes(productId)) {
          completedProducts.push(productId)
        }
        
        set({
          user: {
            ...state.user,
            completed_products: completedProducts,
            points: state.user.points + 100 // Award points for completion
          }
        })
      },

      addPurchase: (productId) => {
        const state = get()
        if (!state.user) return
        
        const purchasedProducts = [...(state.user.purchased_product_ids || [])]
        if (!purchasedProducts.includes(productId)) {
          purchasedProducts.push(productId)
        }
        
        set({
          user: {
            ...state.user,
            purchased_product_ids: purchasedProducts
          }
        })
      },

      // Access control methods
      hasAccessToProduct: (productId) => {
        const state = get()
        if (!state.user) return false
        
        return state.user.purchased_product_ids?.includes(productId) || 
               state.user.purchased_product_ids?.includes('complete_bundle')
      },

      hasAccessToLesson: (lesson) => {
        const state = get()
        if (!state.user) return false
        
        return state.user.purchased_product_ids?.includes(lesson.product_id) ||
               state.user.purchased_product_ids?.includes('complete_bundle')
      },

      getAccessibleProducts: () => {
        const state = get()
        if (!state.user) return []
        
        return state.user.purchased_product_ids || []
      },

      getCompletedProducts: () => {
        const state = get()
        if (!state.user) return []
        
        return state.user.completed_products || []
      }
    }),
    {
      name: 'user-store',
      partialize: (state) => ({ 
        user: state.user,
        isAuthenticated: state.isAuthenticated 
      })
    }
  )
)
