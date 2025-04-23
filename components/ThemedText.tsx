import { Text, type TextProps } from "react-native"
import useThemeColor from "../hooks/useThemeColor"

interface ThemedTextProps extends TextProps {
  lightColor?: string
  darkColor?: string
}

export default function ThemedText(props: ThemedTextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text")

  return <Text style={[{ color }, style]} {...otherProps} />
}
