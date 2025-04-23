"use client"

import type React from "react"

import { createContext, useState, useEffect, useContext } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useRouter, useSegments } from "expo-router"

// Define the shape of the auth context
type AuthContextType = {
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  isLoading: boolean
  userToken: string | null
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  signIn: async () => {},
  signOut: async () => {},
  isLoading: true,
  userToken: null,
})

// Provider component that wraps the app
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [userToken, setUserToken] = useState<string | null>(null)
  const segments = useSegments()
  const router = useRouter()

  // Check if the user is authenticated on mount
  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken")
        setUserToken(token)
      } catch (error) {
        console.error("Failed to load token:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadToken()
  }, [])

  // Handle routing based on authentication state
  useEffect(() => {
    if (isLoading) return

    const inAuthGroup = segments[0] === "(auth)"

    if (!userToken && !inAuthGroup) {
      // Redirect to the login screen if not authenticated
      router.replace("/(auth)/login")
    } else if (userToken && inAuthGroup) {
      // Redirect to the main app if authenticated
      router.replace("/(tabs)")
    }
  }, [userToken, segments, isLoading])

  // Sign in function
  const signIn = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // In a real app, you would validate credentials with your backend
      // For demo purposes, we'll just simulate a successful login
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Store the token
      const token = "demo-token-" + Date.now()
      await AsyncStorage.setItem("authToken", token)
      await AsyncStorage.setItem("userEmail", email)

      setUserToken(token)
    } catch (error) {
      console.error("Sign in error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Sign out function
  const signOut = async () => {
    setIsLoading(true)
    try {
      await AsyncStorage.removeItem("authToken")
      await AsyncStorage.removeItem("userEmail")
      setUserToken(null)
    } catch (error) {
      console.error("Sign out error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return <AuthContext.Provider value={{ signIn, signOut, isLoading, userToken }}>{children}</AuthContext.Provider>
}

// Custom hook to use the auth context
export function useAuth() {
  return useContext(AuthContext)
}
