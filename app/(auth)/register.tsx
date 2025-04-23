"use client"

import { useState } from "react"
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native"
import { Link, useRouter } from "expo-router"
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react-native"
import ThemedView from "../../components/ThemedView"
import ThemedText from "../../components/ThemedText"
import useThemeColor from "../../hooks/useThemeColor"

export default function RegisterScreen() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [nameError, setNameError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [confirmPasswordError, setConfirmPasswordError] = useState("")

  const primaryColor = useThemeColor({ light: "#3b82f6", dark: "#60a5fa" }, "tint")
  const subtleColor = useThemeColor({ light: "#64748b", dark: "#94a3b8" }, "text")
  const inputBgColor = useThemeColor({ light: "#ffffff", dark: "#1f2937" }, "background")
  const borderColor = useThemeColor({ light: "#e2e8f0", dark: "#334155" }, "border")

  const validateName = (name: string) => {
    if (!name) {
      setNameError("Name is required")
      return false
    }
    setNameError("")
    return true
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) {
      setEmailError("Email is required")
      return false
    } else if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email")
      return false
    }
    setEmailError("")
    return true
  }

  const validatePassword = (password: string) => {
    if (!password) {
      setPasswordError("Password is required")
      return false
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters")
      return false
    }
    setPasswordError("")
    return true
  }

  const validateConfirmPassword = (confirmPassword: string) => {
    if (!confirmPassword) {
      setConfirmPasswordError("Please confirm your password")
      return false
    } else if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match")
      return false
    }
    setConfirmPasswordError("")
    return true
  }

  const handleRegister = async () => {
    const isNameValid = validateName(name)
    const isEmailValid = validateEmail(email)
    const isPasswordValid = validatePassword(password)
    const isConfirmPasswordValid = validateConfirmPassword(confirmPassword)

    if (!isNameValid || !isEmailValid || !isPasswordValid || !isConfirmPasswordValid) {
      return
    }

    setIsLoading(true)

    try {
      // For demo purposes, we'll just simulate a successful registration
      await new Promise((resolve) => setTimeout(resolve, 1500))

      Alert.alert("Registration Successful", "Your account has been created successfully. Please login to continue.", [
        {
          text: "OK",
          onPress: () => router.replace("/(auth)/login"),
        },
      ])
    } catch (error) {
      Alert.alert("Registration Failed", error instanceof Error ? error.message : "An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ThemedView style={styles.container}>
          <View style={styles.logoContainer}>
            <Image source={require("../../assets/images/icon.png")} style={styles.logo} resizeMode="contain" />
          </View>

          <ThemedText style={styles.title}>Create Account</ThemedText>
          <ThemedText style={styles.subtitle} lightColor="#64748b" darkColor="#94a3b8">
            Sign up to get started with the app
          </ThemedText>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <ThemedText style={styles.label}>Name</ThemedText>
              <View
                style={[
                  styles.inputWrapper,
                  { backgroundColor: inputBgColor, borderColor: nameError ? "#ef4444" : borderColor },
                ]}
              >
                <User size={20} color={subtleColor} />
                <TextInput
                  style={[styles.input, { color: subtleColor }]}
                  placeholder="Enter your name"
                  placeholderTextColor={subtleColor}
                  value={name}
                  onChangeText={(text) => {
                    setName(text)
                    if (nameError) validateName(text)
                  }}
                />
              </View>
              {nameError ? (
                <ThemedText style={styles.errorText} lightColor="#ef4444" darkColor="#f87171">
                  {nameError}
                </ThemedText>
              ) : null}
            </View>

            <View style={styles.inputContainer}>
              <ThemedText style={styles.label}>Email</ThemedText>
              <View
                style={[
                  styles.inputWrapper,
                  { backgroundColor: inputBgColor, borderColor: emailError ? "#ef4444" : borderColor },
                ]}
              >
                <Mail size={20} color={subtleColor} />
                <TextInput
                  style={[styles.input, { color: subtleColor }]}
                  placeholder="Enter your email"
                  placeholderTextColor={subtleColor}
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text)
                    if (emailError) validateEmail(text)
                  }}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>
              {emailError ? (
                <ThemedText style={styles.errorText} lightColor="#ef4444" darkColor="#f87171">
                  {emailError}
                </ThemedText>
              ) : null}
            </View>

            <View style={styles.inputContainer}>
              <ThemedText style={styles.label}>Password</ThemedText>
              <View
                style={[
                  styles.inputWrapper,
                  { backgroundColor: inputBgColor, borderColor: passwordError ? "#ef4444" : borderColor },
                ]}
              >
                <Lock size={20} color={subtleColor} />
                <TextInput
                  style={[styles.input, { color: subtleColor }]}
                  placeholder="Create a password"
                  placeholderTextColor={subtleColor}
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text)
                    if (passwordError) validatePassword(text)
                  }}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={20} color={subtleColor} /> : <Eye size={20} color={subtleColor} />}
                </TouchableOpacity>
              </View>
              {passwordError ? (
                <ThemedText style={styles.errorText} lightColor="#ef4444" darkColor="#f87171">
                  {passwordError}
                </ThemedText>
              ) : null}
            </View>

            <View style={styles.inputContainer}>
              <ThemedText style={styles.label}>Confirm Password</ThemedText>
              <View
                style={[
                  styles.inputWrapper,
                  { backgroundColor: inputBgColor, borderColor: confirmPasswordError ? "#ef4444" : borderColor },
                ]}
              >
                <Lock size={20} color={subtleColor} />
                <TextInput
                  style={[styles.input, { color: subtleColor }]}
                  placeholder="Confirm your password"
                  placeholderTextColor={subtleColor}
                  value={confirmPassword}
                  onChangeText={(text) => {
                    setConfirmPassword(text)
                    if (confirmPasswordError) validateConfirmPassword(text)
                  }}
                  secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? (
                    <EyeOff size={20} color={subtleColor} />
                  ) : (
                    <Eye size={20} color={subtleColor} />
                  )}
                </TouchableOpacity>
              </View>
              {confirmPasswordError ? (
                <ThemedText style={styles.errorText} lightColor="#ef4444" darkColor="#f87171">
                  {confirmPasswordError}
                </ThemedText>
              ) : null}
            </View>

            <TouchableOpacity
              style={[styles.registerButton, { backgroundColor: primaryColor }]}
              onPress={handleRegister}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <ThemedText style={styles.registerButtonText} lightColor="#ffffff" darkColor="#ffffff">
                  Sign Up
                </ThemedText>
              )}
            </TouchableOpacity>

            <View style={styles.loginContainer}>
              <ThemedText style={styles.loginText} lightColor="#64748b" darkColor="#94a3b8">
                Already have an account?
              </ThemedText>
              <Link href="/(auth)/login" asChild>
                <TouchableOpacity>
                  <ThemedText style={styles.loginLink} lightColor={primaryColor} darkColor={primaryColor}>
                    Sign In
                  </ThemedText>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </ThemedView>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
    textAlign: "center",
  },
  form: {
    width: "100%",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
  },
  registerButton: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 24,
  },
  registerButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    fontSize: 14,
    marginRight: 4,
  },
  loginLink: {
    fontSize: 14,
    fontWeight: "600",
  },
})
