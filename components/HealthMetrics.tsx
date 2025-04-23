import { StyleSheet, View } from "react-native"
import { Heart, Activity, Droplets, Zap } from "lucide-react-native"
import ThemedView from "../components/ThemedView"
import ThemedText from "../components/ThemedText"
import useThemeColor from "../hooks/useThemeColor"

export function HealthMetrics() {
  const cardBgColor = useThemeColor({ light: "#ffffff", dark: "#1f2937" }, "background")

  const metrics = [
    {
      icon: <Heart size={20} color="#ef4444" />,
      name: "Heart Rate",
      value: "72",
      unit: "bpm",
      color: "#ef4444",
      bgColor: "#fee2e2",
    },
    {
      icon: <Activity size={20} color="#3b82f6" />,
      name: "Blood Pressure",
      value: "120/80",
      unit: "mmHg",
      color: "#3b82f6",
      bgColor: "#dbeafe",
    },
    {
      icon: <Droplets size={20} color="#f59e0b" />,
      name: "Glucose",
      value: "95",
      unit: "mg/dL",
      color: "#f59e0b",
      bgColor: "#fef3c7",
    },
    {
      icon: <Zap size={20} color="#10b981" />,
      name: "Activity",
      value: "8,543",
      unit: "steps",
      color: "#10b981",
      bgColor: "#d1fae5",
    },
  ]

  return (
    <View style={styles.container}>
      {metrics.map((metric, index) => (
        <ThemedView key={index} style={[styles.metricCard, { backgroundColor: cardBgColor }]}>
          <View style={[styles.iconContainer, { backgroundColor: metric.bgColor }]}>{metric.icon}</View>
          <ThemedText style={styles.metricName}>{metric.name}</ThemedText>
          <View style={styles.valueContainer}>
            <ThemedText style={[styles.metricValue, { color: metric.color }]}>{metric.value}</ThemedText>
            <ThemedText style={styles.metricUnit} lightColor="#64748b" darkColor="#94a3b8">
              {metric.unit}
            </ThemedText>
          </View>
        </ThemedView>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  metricCard: {
    width: "48%",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  metricName: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 4,
  },
  valueContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  metricValue: {
    fontSize: 20,
    fontWeight: "700",
    marginRight: 4,
  },
  metricUnit: {
    fontSize: 12,
  },
})
