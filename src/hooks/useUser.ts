import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useUserStore } from '@/store/useUserStore'

export const useUser = () => {
  const { data: session, status } = useSession()
  const { 
    user, 
    isLoading, 
    isAuthenticated, 
    setUser, 
    setLoading 
  } = useUserStore()

  useEffect(() => {
    const fetchUserData = async () => {
      if (status === 'loading') {
        setLoading(true)
        return
      }

      if (status === 'unauthenticated') {
        setUser(null)
        setLoading(false)
        return
      }

      if (session?.user?.email) {
        try {
          setLoading(true)
          const response = await fetch('/api/auth/me')
          
          if (response.ok) {
            const userData = await response.json()
            setUser(userData)
          } else {
            setUser(null)
          }
        } catch (error) {
          console.error('Error fetching user data:', error)
          setUser(null)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchUserData()
  }, [session, status, setUser, setLoading])

  return {
    user,
    isLoading: isLoading || status === 'loading',
    isAuthenticated,
    session
  }
}
