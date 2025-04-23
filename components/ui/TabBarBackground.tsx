import { View, StyleSheet } from "react-native"
import { useColorScheme } from "react-native"

export function TabBarBackground() {
  const colorScheme = useColorScheme()
  const backgroundColor = colorScheme === "dark" ? "#0f172a" : "#ffffff"

  return <View style={[styles.background, { backgroundColor }]} />
}

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 5,
  },
})
