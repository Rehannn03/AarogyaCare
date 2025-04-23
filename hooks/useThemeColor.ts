import { useColorScheme } from "react-native"

export type ThemeProps = {
  light: string
  dark: string
}

export default function useThemeColor(props: ThemeProps, colorName: string): string {
  const theme = useColorScheme() || "light"
  const colorFromProps = props[theme]

  if (colorFromProps) {
    return colorFromProps
  } else {
    // Default colors
    const Colors = {
      light: {
        text: "#0f172a",
        background: "#f8fafc",
        tint: "#3b82f6",
        tabIconDefault: "#64748b",
        tabIconSelected: "#3b82f6",
        notification: "#ef4444",
      },
      dark: {
        text: "#f8fafc",
        background: "#0f172a",
        tint: "#60a5fa",
        tabIconDefault: "#94a3b8",
        tabIconSelected: "#60a5fa",
        notification: "#f87171",
      },
    }
    return Colors[theme][colorName]
  }
}
