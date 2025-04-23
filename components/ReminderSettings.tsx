"use client"

import { useState } from "react"
import { StyleSheet, View, Switch, TouchableOpacity } from "react-native"
import { Bell, Clock, Volume2, VibrateIcon } from "lucide-react-native"
import ThemedView from "./ThemedView"
import ThemedText from "./ThemedText"
import useThemeColor from "../hooks/useThemeColor"

export default function ReminderSettings() {
  const [remindersEnabled, setRemindersEnabled] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [vibrationEnabled, setVibrationEnabled] = useState(true)
  const [reminderTimes, setReminderTimes] = useState([
    { id: 1, enabled: true, time: "At scheduled time" },
    { id: 2, enabled: false, time: "5 minutes before" },
    { id: 3, enabled: true, time: "15 minutes before" },
  ])

  const primaryColor = useThemeColor({ light: "#3b82f6", dark: "#60a5fa" }, "tint")
  const subtleColor = useThemeColor({ light: "#64748b", dark: "#94a3b8" }, "text")
  const cardBgColor = useThemeColor({ light: "#ffffff", dark: "#1f2937" }, "background")

  const toggleReminderTime = (id) => {
    setReminderTimes(reminderTimes.map((item) => (item.id === id ? { ...item, enabled: !item.enabled } : item)))
  }

  return (
    <ThemedView style={[styles.container, { backgroundColor: cardBgColor }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Bell size={20} color={primaryColor} />
          <ThemedText style={styles.headerTitle}>Reminder Settings</ThemedText>
        </View>
        <Switch
          value={remindersEnabled}
          onValueChange={setRemindersEnabled}
          trackColor={{ false: "#cbd5e1", true: `${primaryColor}80` }}
          thumbColor={remindersEnabled ? primaryColor : "#f1f5f9"}
        />
      </View>

      {remindersEnabled && (
        <>
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Reminder Times</ThemedText>
            {reminderTimes.map((item) => (
              <View key={item.id} style={styles.reminderTimeItem}>
                <View style={styles.reminderTimeLeft}>
                  <Clock size={16} color={subtleColor} style={styles.reminderTimeIcon} />
                  <ThemedText style={styles.reminderTimeText}>{item.time}</ThemedText>
                </View>
                <Switch
                  value={item.enabled}
                  onValueChange={() => toggleReminderTime(item.id)}
                  trackColor={{ false: "#cbd5e1", true: `${primaryColor}80` }}
                  thumbColor={item.enabled ? primaryColor : "#f1f5f9"}
                />
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Notification Settings</ThemedText>
            <View style={styles.notificationItem}>
              <View style={styles.notificationLeft}>
                <Volume2 size={16} color={subtleColor} style={styles.notificationIcon} />
                <ThemedText style={styles.notificationText}>Sound</ThemedText>
              </View>
              <Switch
                value={soundEnabled}
                onValueChange={setSoundEnabled}
                trackColor={{ false: "#cbd5e1", true: `${primaryColor}80` }}
                thumbColor={soundEnabled ? primaryColor : "#f1f5f9"}
              />
            </View>
            <View style={styles.notificationItem}>
              <View style={styles.notificationLeft}>
                <VibrateIcon size={16} color={subtleColor} style={styles.notificationIcon} />
                <ThemedText style={styles.notificationText}>Vibration</ThemedText>
              </View>
              <Switch
                value={vibrationEnabled}
                onValueChange={setVibrationEnabled}
                trackColor={{ false: "#cbd5e1", true: `${primaryColor}80` }}
                thumbColor={vibrationEnabled ? primaryColor : "#f1f5f9"}
              />
            </View>
          </View>

          <TouchableOpacity
            style={[styles.customizeButton, { borderColor: primaryColor }]}
            onPress={() => {
              // This would open a more detailed settings screen in a real app
              alert("This would open detailed reminder settings in a real app")
            }}
          >
            <ThemedText style={[styles.customizeButtonText, { color: primaryColor }]}>
              Customize Reminder Schedule
            </ThemedText>
          </TouchableOpacity>
        </>
      )}
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 12,
  },
  reminderTimeItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  reminderTimeLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  reminderTimeIcon: {
    marginRight: 8,
  },
  reminderTimeText: {
    fontSize: 14,
  },
  notificationItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  notificationLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  notificationIcon: {
    marginRight: 8,
  },
  notificationText: {
    fontSize: 14,
  },
  customizeButton: {
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 8,
  },
  customizeButtonText: {
    fontSize: 14,
    fontWeight: "500",
  },
})
