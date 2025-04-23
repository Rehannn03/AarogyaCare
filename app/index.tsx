"use client"

import { Redirect } from "expo-router"
import { useAuth } from "../context/AuthContext"
import { View, ActivityIndicator } from "react-native"
import useThemeColor from "../hooks/useThemeColor"

export default function Index() {
  const { isLoading, userToken } = useAuth()
  const backgroundColor = useThemeColor({ light: "#f8fafc", dark: "#0f172a" }, "background")

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor }}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    )
  }

  // Redirect based on authentication status
  return userToken ? <Redirect href="/(tabs)" /> : <Redirect href="/(auth)/login" />
}
