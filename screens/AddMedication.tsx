"use client"

import { useState } from "react"
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Switch,
} from "react-native"
import { X, Clock, Check } from "lucide-react-native"
import DateTimePicker from "@react-native-community/datetimepicker"
import ThemedView from "../components/ThemedView"
import ThemedText from "../components/ThemedText"
import useThemeColor from "../hooks/useThemeColor"

export default function AddMedicationScreen({ navigation }) {
  const [name, setName] = useState("")
  const [dosage, setDosage] = useState("")
  const [instructions, setInstructions] = useState("")
  const [time, setTime] = useState(new Date())
  const [showTimePicker, setShowTimePicker] = useState(false)
  const [days, setDays] = useState({
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: true,
    sunday: true,
  })
  const [reminders, setReminders] = useState(true)

  const primaryColor = useThemeColor({ light: "#3b82f6", dark: "#60a5fa" }, "tint")
  const subtleColor = useThemeColor({ light: "#64748b", dark: "#94a3b8" }, "text")
  const inputBgColor = useThemeColor({ light: "#ffffff", dark: "#1f2937" }, "background")
  const borderColor = useThemeColor({ light: "#e2e8f0", dark: "#334155" }, "border")

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false)
    if (selectedTime) {
      setTime(selectedTime)
    }
  }

  const toggleDay = (day) => {
    setDays((prevDays) => ({
      ...prevDays,
      [day]: !prevDays[day],
    }))
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const handleSave = () => {
    // In a real app, you would save this to your backend or local storage
    navigation.goBack()
  }

  const DayButton = ({ day, label }) => (
    <TouchableOpacity
      style={[
        styles.dayButton,
        {
          backgroundColor: days[day] ? `${primaryColor}20` : "transparent",
          borderColor: days[day] ? primaryColor : borderColor,
        },
      ]}
      onPress={() => toggleDay(day)}
    >
      <ThemedText style={[styles.dayButtonText, { color: days[day] ? primaryColor : subtleColor }]}>{label}</ThemedText>
    </TouchableOpacity>
  )

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ThemedView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
            <X size={24} color={subtleColor} />
          </TouchableOpacity>
          <ThemedText style={styles.headerTitle}>Add Medication</ThemedText>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Check size={24} color={primaryColor} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <ThemedText style={styles.label}>Medication Name</ThemedText>
              <View style={[styles.inputWrapper, { backgroundColor: inputBgColor, borderColor: borderColor }]}>
                <TextInput
                  style={[styles.input, { color: subtleColor }]}
                  placeholder="Enter medication name"
                  placeholderTextColor={subtleColor}
                  value={name}
                  onChangeText={setName}
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <ThemedText style={styles.label}>Dosage</ThemedText>
              <View style={[styles.inputWrapper, { backgroundColor: inputBgColor, borderColor: borderColor }]}>
                <TextInput
                  style={[styles.input, { color: subtleColor }]}
                  placeholder="e.g., 10mg, 1 pill"
                  placeholderTextColor={subtleColor}
                  value={dosage}
                  onChangeText={setDosage}
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <ThemedText style={styles.label}>Time</ThemedText>
              <TouchableOpacity
                style={[styles.inputWrapper, { backgroundColor: inputBgColor, borderColor: borderColor }]}
                onPress={() => setShowTimePicker(true)}
              >
                <Clock size={20} color={subtleColor} style={styles.inputIcon} />
                <ThemedText style={styles.timeText}>{formatTime(time)}</ThemedText>
              </TouchableOpacity>
              {showTimePicker && (
                <DateTimePicker
                  value={time}
                  mode="time"
                  is24Hour={false}
                  display="default"
                  onChange={handleTimeChange}
                />
              )}
            </View>

            <View style={styles.inputContainer}>
              <ThemedText style={styles.label}>Schedule</ThemedText>
              <ThemedText style={styles.sublabel} lightColor="#64748b" darkColor="#94a3b8">
                Select days to take this medication
              </ThemedText>
              <View style={styles.daysContainer}>
                <DayButton day="monday" label="M" />
                <DayButton day="tuesday" label="T" />
                <DayButton day="wednesday" label="W" />
                <DayButton day="thursday" label="T" />
                <DayButton day="friday" label="F" />
                <DayButton day="saturday" label="S" />
                <DayButton day="sunday" label="S" />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <ThemedText style={styles.label}>Instructions</ThemedText>
              <View style={[styles.textAreaWrapper, { backgroundColor: inputBgColor, borderColor: borderColor }]}>
                <TextInput
                  style={[styles.textArea, { color: subtleColor }]}
                  placeholder="e.g., Take with food, Take before bed"
                  placeholderTextColor={subtleColor}
                  value={instructions}
                  onChangeText={setInstructions}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </View>
            </View>

            <View style={styles.switchContainer}>
              <View>
                <ThemedText style={styles.switchLabel}>Reminders</ThemedText>
                <ThemedText style={styles.switchSubLabel} lightColor="#64748b" darkColor="#94a3b8">
                  Get notified when it's time to take your medication
                </ThemedText>
              </View>
              <Switch
                value={reminders}
                onValueChange={setReminders}
                trackColor={{ false: "#cbd5e1", true: `${primaryColor}80` }}
                thumbColor={reminders ? primaryColor : "#f1f5f9"}
              />
            </View>
          </View>
        </ScrollView>
      </ThemedView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  saveButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    flex: 1,
  },
  form: {
    padding: 20,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  sublabel: {
    fontSize: 14,
    marginBottom: 12,
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
    fontSize: 16,
  },
  inputIcon: {
    marginRight: 10,
  },
  timeText: {
    fontSize: 16,
  },
  textAreaWrapper: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  textArea: {
    fontSize: 16,
    height: 100,
  },
  daysContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dayButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dayButtonText: {
    fontSize: 14,
    fontWeight: "500",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  switchSubLabel: {
    fontSize: 14,
    maxWidth: 250,
  },
})
