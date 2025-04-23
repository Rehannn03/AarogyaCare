"use client"

import { Stack } from "expo-router"
import { AuthProvider } from "../context/AuthContext"
import { useEffect } from "react"
import { LogBox } from "react-native"
import { MenuProvider } from "react-native-popup-menu"

export default function RootLayout() {
  // Ignore specific warnings
  useEffect(() => {
    LogBox.ignoreLogs([
      'Unsupported top level event type "topInsetsChange" dispatched',
      "Linking requires a build-time setting",
      "React Native's New Architecture",
    ])
  }, [])

  return (
    <MenuProvider>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="report-details/[id]"
            options={{
              presentation: "card",
            }}
          />
          <Stack.Screen
            name="add-medication"
            options={{
              presentation: "modal",
            }}
          />
        </Stack>
      </AuthProvider>
    </MenuProvider>
  )
}
