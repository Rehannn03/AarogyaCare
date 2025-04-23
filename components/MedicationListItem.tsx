"use client"
import { StyleSheet, View, Alert } from "react-native"
import { Check, X, MoreVertical, Edit, Trash2, Power } from "lucide-react-native"
import ThemedView from "./ThemedView"
import ThemedText from "./ThemedText"
import useThemeColor from "../hooks/useThemeColor"
import type { Medicine } from "../services/api"
import { Menu, MenuTrigger, MenuOptions, MenuOption } from "react-native-popup-menu"

interface MedicationListItemProps {
  medication: Medicine
  onEdit?: (medication: Medicine) => void
  onDelete?: (medicationId: string) => void
  onDeactivate?: (medicationId: string) => void
}

export function MedicationListItem({ medication, onEdit, onDelete, onDeactivate }: MedicationListItemProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "#22c55e"
      case "inactive":
        return "#64748b"
      default:
        return "#64748b"
    }
  }

  const StatusIcon = ({ status }) => {
    if (status === "active") {
      return <Check size={18} color="white" />
    } else {
      return <X size={18} color="white" />
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
  const primaryColor = useThemeColor({ light: "#3b82f6", dark: "#60a5fa" }, "tint")
  const subtleColor = useThemeColor({ light: "#64748b", dark: "#94a3b8" }, "text")
  const statusColor = getStatusColor(medication.status || "active")

  const handleDelete = () => {
    Alert.alert("Delete Medication", `Are you sure you want to delete ${medication.medicineName}?`, [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => onDelete && onDelete(medication._id || medication.id),
        style: "destructive",
      },
    ])
  }

  const handleDeactivate = () => {
    Alert.alert("Deactivate Medication", `Are you sure you want to deactivate ${medication.medicineName}?`, [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Deactivate",
        onPress: () => onDeactivate && onDeactivate(medication._id || medication.id),
      },
    ])
  }

  return (
    <ThemedView style={[styles.container, { backgroundColor: cardBgColor }]}>
      <View style={[styles.iconContainer, { backgroundColor: statusColor }]}>
        <StatusIcon status={medication.status || "active"} />
      </View>
      <View style={styles.content}>
        <ThemedText style={styles.name}>{medication.medicineName}</ThemedText>
        <ThemedText style={styles.dosage} lightColor="#64748b" darkColor="#94a3b8">
          {medication.dosage}
        </ThemedText>
        <ThemedText style={styles.notes} lightColor="#64748b" darkColor="#94a3b8" numberOfLines={1}>
          {medication.timing} {medication.notes ? `• ${medication.notes}` : ""}
        </ThemedText>
      </View>
      <View style={styles.timeContainer}>
        <ThemedText style={styles.time}>{formatFrequencyTime(medication.frequency)}</ThemedText>
        <ThemedText style={[styles.status, { color: statusColor }]}>
          {medication.status === "inactive" ? "Inactive" : "Active"}
        </ThemedText>
      </View>

      <Menu>
        <MenuTrigger>
          <View style={styles.menuButton}>
            <MoreVertical size={20} color={subtleColor} />
          </View>
        </MenuTrigger>
        <MenuOptions
          customStyles={{
            optionsContainer: {
              borderRadius: 10,
              padding: 5,
              backgroundColor: cardBgColor,
            },
          }}
        >
          <MenuOption onSelect={() => onEdit && onEdit(medication)}>
            <View style={styles.menuItem}>
              <Edit size={16} color={primaryColor} />
              <ThemedText style={[styles.menuText, { color: primaryColor }]}>Edit</ThemedText>
            </View>
          </MenuOption>
          <MenuOption onSelect={handleDeactivate}>
            <View style={styles.menuItem}>
              <Power size={16} color="#f59e0b" />
              <ThemedText style={[styles.menuText, { color: "#f59e0b" }]}>Deactivate</ThemedText>
            </View>
          </MenuOption>
          <MenuOption onSelect={handleDelete}>
            <View style={styles.menuItem}>
              <Trash2 size={16} color="#ef4444" />
              <ThemedText style={[styles.menuText, { color: "#ef4444" }]}>Delete</ThemedText>
            </View>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
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
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  dosage: {
    fontSize: 14,
    marginBottom: 2,
  },
  notes: {
    fontSize: 12,
    opacity: 0.8,
  },
  timeContainer: {
    alignItems: "flex-end",
    marginRight: 10,
  },
  time: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 4,
  },
  status: {
    fontSize: 12,
    fontWeight: "500",
  },
  menuButton: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  menuText: {
    fontSize: 14,
    marginLeft: 8,
  },
})
