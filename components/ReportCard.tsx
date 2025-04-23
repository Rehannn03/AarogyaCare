import { StyleSheet, TouchableOpacity, View } from "react-native"
import { Calendar, FileText } from "lucide-react-native"
import ThemedView from "../components/ThemedView"
import ThemedText from "../components/ThemedText"
import useThemeColor from "../hooks/useThemeColor"

export function ReportCard({ report, onPress }) {
  const primaryColor = useThemeColor({ light: "#3b82f6", dark: "#60a5fa" }, "tint")
  const subtleColor = useThemeColor({ light: "#64748b", dark: "#94a3b8" }, "text")
  const cardBgColor = useThemeColor({ light: "#ffffff", dark: "#1f2937" }, "background")

  return (
    <TouchableOpacity onPress={onPress}>
      <ThemedView style={[styles.container, { backgroundColor: cardBgColor }]}>
        <View style={[styles.iconContainer, { backgroundColor: `${primaryColor}20` }]}>
          <FileText size={24} color={primaryColor} />
        </View>
        <View style={styles.content}>
          <ThemedText style={styles.title}>{report.title}</ThemedText>
          <ThemedText style={styles.date} lightColor="#64748b" darkColor="#94a3b8">
            <Calendar size={14} color={subtleColor} /> {report.date}
          </ThemedText>
          <ThemedText style={styles.doctor} lightColor="#64748b" darkColor="#94a3b8">
            Dr. {report.doctor}
          </ThemedText>
        </View>
      </ThemedView>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    marginBottom: 4,
  },
  doctor: {
    fontSize: 14,
  },
})
