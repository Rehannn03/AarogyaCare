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
import { Link } from "expo-router"
import { Eye, EyeOff, Lock, Mail } from "lucide-react-native"
import ThemedView from "../../components/ThemedView"
import ThemedText from "../../components/ThemedText"
import useThemeColor from "../../hooks/useThemeColor"
import { useAuth } from "../../context/AuthContext"

export default function LoginScreen() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")

  const { signIn, isLoading } = useAuth()

  const primaryColor = useThemeColor({ light: "#3b82f6", dark: "#60a5fa" }, "tint")
  const subtleColor = useThemeColor({ light: "#64748b", dark: "#94a3b8" }, "text")
  const inputBgColor = useThemeColor({ light: "#ffffff", dark: "#1f2937" }, "background")
  const borderColor = useThemeColor({ light: "#e2e8f0", dark: "#334155" }, "border")

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

  const handleLogin = async () => {
    const isEmailValid = validateEmail(email)
    const isPasswordValid = validatePassword(password)

    if (!isEmailValid || !isPasswordValid) {
      return
    }

    try {
      await signIn(email, password)
    } catch (error) {
      Alert.alert("Login Failed", error instanceof Error ? error.message : "An unexpected error occurred")
    }
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ThemedView style={styles.container}>
          <View style={styles.logoContainer}>
            <Image source={require("../../assets/images/icon.png")} style={styles.logo} resizeMode="contain" />
          </View>

          <ThemedText style={styles.title}>Welcome Back</ThemedText>
          <ThemedText style={styles.subtitle} lightColor="#64748b" darkColor="#94a3b8">
            Sign in to your account to continue
          </ThemedText>

          <View style={styles.form}>
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
                  placeholder="Enter your password"
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

            <TouchableOpacity style={styles.forgotPassword}>
              <ThemedText style={styles.forgotPasswordText} lightColor={primaryColor} darkColor={primaryColor}>
                Forgot Password?
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.loginButton, { backgroundColor: primaryColor }]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <ThemedText style={styles.loginButtonText} lightColor="#ffffff" darkColor="#ffffff">
                  Sign In
                </ThemedText>
              )}
            </TouchableOpacity>

            <View style={styles.signupContainer}>
              <ThemedText style={styles.signupText} lightColor="#64748b" darkColor="#94a3b8">
                Don't have an account?
              </ThemedText>
              <Link href="/(auth)/register" asChild>
                <TouchableOpacity>
                  <ThemedText style={styles.signupLink} lightColor={primaryColor} darkColor={primaryColor}>
                    Sign Up
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
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
  },
  loginButton: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 24,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signupText: {
    fontSize: 14,
    marginRight: 4,
  },
  signupLink: {
    fontSize: 14,
    fontWeight: "600",
  },
})
