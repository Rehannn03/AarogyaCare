import { StyleSheet, TouchableOpacity, View } from "react-native"
import { Calendar, ArrowRight } from "lucide-react-native"
import ThemedView from "../components/ThemedView"
import ThemedText from "../components/ThemedText"
import useThemeColor from "../hooks/useThemeColor"

export function ReportSummary({ report, onPress }) {
  const primaryColor = useThemeColor({ light: "#3b82f6", dark: "#60a5fa" }, "tint")
  const subtleColor = useThemeColor({ light: "#64748b", dark: "#94a3b8" }, "text")
  const cardBgColor = useThemeColor({ light: "#ffffff", dark: "#1f2937" }, "background")

  return (
    <TouchableOpacity onPress={onPress}>
      <ThemedView style={[styles.container, { backgroundColor: cardBgColor }]}>
        <View style={styles.header}>
          <ThemedText style={styles.title}>{report.title}</ThemedText>
          <ThemedText style={styles.date} lightColor="#64748b" darkColor="#94a3b8">
            <Calendar size={14} color={subtleColor} /> {report.date}
          </ThemedText>
        </View>

        <ThemedText style={styles.summary} lightColor="#334155" darkColor="#cbd5e1" numberOfLines={2}>
          {report.summary}
        </ThemedText>

        <View style={styles.footer}>
          <ThemedText style={styles.doctor} lightColor="#64748b" darkColor="#94a3b8">
            Dr. {report.doctor}
          </ThemedText>
          <View style={styles.viewButton}>
            <ThemedText style={[styles.viewButtonText, { color: primaryColor }]}>View details</ThemedText>
            <ArrowRight size={16} color={primaryColor} />
          </View>
        </View>
      </ThemedView>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
  },
  summary: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.05)",
    paddingTop: 12,
  },
  doctor: {
    fontSize: 14,
  },
  viewButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewButtonText: {
    fontSize: 14,
    marginRight: 4,
  },
})
