import { StyleSheet, TouchableOpacity, View } from "react-native"
import { Clock } from "lucide-react-native"
import ThemedView from "../components/ThemedView"
import ThemedText from "../components/ThemedText"
import useThemeColor from "../hooks/useThemeColor"
import type { Medicine } from "../services/api"

interface MedicationCardProps {
  medication: Medicine
  onPress?: () => void
}

export function MedicationCard({ medication, onPress }: MedicationCardProps) {
  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "#22c55e"
      case "inactive":
        return "#64748b"
      default:
        return "#3b82f6"
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case "active":
        return "Active"
      case "inactive":
        return "Inactive"
      default:
        return "Unknown"
    }
  }

  // Format the time from frequency array
  const formatFrequencyTime = (frequency) => {
    if (!frequency || !Array.isArray(frequency) || frequency.length === 0) {
      return "No time set"
    }

    // Get the first frequency item
    const firstTime = frequency[0]

    // Format hour and minute to display time
    const hour = firstTime.hour.toString().padStart(2, "0")
    const minute = firstTime.minute.toString().padStart(2, "0")

    return `${hour}:${minute}`
  }

  const cardBgColor = useThemeColor({ light: "#ffffff", dark: "#1f2937" }, "background")
  const subtleColor = useThemeColor({ light: "#64748b", dark: "#94a3b8" }, "text")
  const statusColor = getStatusColor(medication.status)

  return (
    <TouchableOpacity onPress={onPress}>
      <ThemedView style={[styles.card, { backgroundColor: cardBgColor }]}>
        <View style={[styles.statusIndicator, { backgroundColor: statusColor }]} />
        <ThemedText style={styles.name}>{medication.medicineName}</ThemedText>
        <ThemedText style={styles.dosage} lightColor="#64748b" darkColor="#94a3b8">
          {medication.dosage}
        </ThemedText>
        <View style={styles.timeContainer}>
          <Clock size={14} color={subtleColor} />
          <ThemedText style={styles.time} lightColor="#64748b" darkColor="#94a3b8">
            {formatFrequencyTime(medication.frequency)}
          </ThemedText>
        </View>
        <View style={[styles.statusContainer, { backgroundColor: `${statusColor}20` }]}>
          <ThemedText style={[styles.statusText, { color: statusColor }]}>
            {getStatusText(medication.status)}
          </ThemedText>
        </View>
      </ThemedView>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    width: 150,
    marginRight: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    position: "relative",
    overflow: "hidden",
  },
  statusIndicator: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 4,
    height: "100%",
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    paddingLeft: 4,
  },
  dosage: {
    fontSize: 14,
    marginBottom: 12,
    paddingLeft: 4,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    paddingLeft: 4,
  },
  time: {
    fontSize: 14,
    marginLeft: 4,
  },
  statusContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginLeft: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
  },
})
