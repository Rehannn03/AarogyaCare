"use client"

import { useState, useEffect } from "react"
import {
  StyleSheet,
  View,
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Switch,
} from "react-native"
import { X, Clock, Check, Calendar } from "lucide-react-native"
import DateTimePicker from "@react-native-community/datetimepicker"
import ThemedView from "./ThemedView"
import ThemedText from "./ThemedText"
import useThemeColor from "../hooks/useThemeColor"
import type { Medicine } from "../services/api"

type EditMedicationModalProps = {
  visible: boolean
  medication: Medicine
  onClose: () => void
  onSave: (medication: any) => void
}

export default function EditMedicationModal({ visible, medication, onClose, onSave }: EditMedicationModalProps) {
  const [medicineName, setMedicineName] = useState("")
  const [dosage, setDosage] = useState("")
  const [notes, setNotes] = useState("")
  const [time, setTime] = useState(new Date())
  const [showTimePicker, setShowTimePicker] = useState(false)
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [showStartDatePicker, setShowStartDatePicker] = useState(false)
  const [showEndDatePicker, setShowEndDatePicker] = useState(false)
  const [days, setDays] = useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  })
  const [reminders, setReminders] = useState(true)

  const primaryColor = useThemeColor({ light: "#3b82f6", dark: "#60a5fa" }, "tint")
  const subtleColor = useThemeColor({ light: "#64748b", dark: "#94a3b8" }, "text")
  const inputBgColor = useThemeColor({ light: "#ffffff", dark: "#1f2937" }, "background")
  const borderColor = useThemeColor({ light: "#e2e8f0", dark: "#334155" }, "border")
  const modalBgColor = useThemeColor({ light: "#f8fafc", dark: "#0f172a" }, "background")

  // Initialize form with medication data
  useEffect(() => {
    if (medication) {
      setMedicineName(medication.medicineName || "")
      setDosage(medication.dosage || "")
      setNotes(medication.notes || "")

      // Parse time from frequency array
      if (medication.frequency && Array.isArray(medication.frequency) && medication.frequency.length > 0) {
        const firstFreq = medication.frequency[0]
        const timeDate = new Date()
        timeDate.setHours(firstFreq.hour, firstFreq.minute)
        setTime(timeDate)
      }

      // Parse dates
      if (medication.startDate) {
        setStartDate(new Date(medication.startDate))
      }

      if (medication.endDate) {
        setEndDate(new Date(medication.endDate))
      }

      // Set all days to true for now (we don't have day-specific data in the API)
      const newDays = { ...days }
      Object.keys(newDays).forEach((day) => (newDays[day] = true))
      setDays(newDays)
    }
  }, [medication])

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false)
    if (selectedTime) {
      setTime(selectedTime)
    }
  }

  const handleStartDateChange = (event, selectedDate) => {
    setShowStartDatePicker(false)
    if (selectedDate) {
      setStartDate(selectedDate)
    }
  }

  const handleEndDateChange = (event, selectedDate) => {
    setShowEndDatePicker(false)
    if (selectedDate) {
      setEndDate(selectedDate)
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

  const formatDate = (date) => {
    return date.toLocaleDateString()
  }

  const handleSave = () => {
    if (!medicineName.trim()) {
      alert("Please enter a medication name")
      return
    }

    if (!dosage.trim()) {
      alert("Please enter a dosage")
      return
    }

    // Create the medication object in the format expected by our hook
    const updatedMedication = {
      medicineName,
      dosage,
      timing: time.toISOString(),
      frequency: "daily", // We'll convert this in the API service
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      notes,
    }

    onSave(updatedMedication)
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
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ThemedView style={[styles.container, { backgroundColor: modalBgColor }]}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <X size={24} color={subtleColor} />
            </TouchableOpacity>
            <ThemedText style={styles.headerTitle}>Edit Medication</ThemedText>
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
                    value={medicineName}
                    onChangeText={setMedicineName}
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

              <View style={styles.dateContainer}>
                <View style={styles.dateInputContainer}>
                  <ThemedText style={styles.label}>Start Date</ThemedText>
                  <TouchableOpacity
                    style={[styles.inputWrapper, { backgroundColor: inputBgColor, borderColor: borderColor }]}
                    onPress={() => setShowStartDatePicker(true)}
                  >
                    <Calendar size={20} color={subtleColor} style={styles.inputIcon} />
                    <ThemedText style={styles.timeText}>{formatDate(startDate)}</ThemedText>
                  </TouchableOpacity>
                  {showStartDatePicker && (
                    <DateTimePicker value={startDate} mode="date" display="default" onChange={handleStartDateChange} />
                  )}
                </View>

                <View style={styles.dateInputContainer}>
                  <ThemedText style={styles.label}>End Date</ThemedText>
                  <TouchableOpacity
                    style={[styles.inputWrapper, { backgroundColor: inputBgColor, borderColor: borderColor }]}
                    onPress={() => setShowEndDatePicker(true)}
                  >
                    <Calendar size={20} color={subtleColor} style={styles.inputIcon} />
                    <ThemedText style={styles.timeText}>{formatDate(endDate)}</ThemedText>
                  </TouchableOpacity>
                  {showEndDatePicker && (
                    <DateTimePicker
                      value={endDate}
                      mode="date"
                      display="default"
                      onChange={handleEndDateChange}
                      minimumDate={startDate}
                    />
                  )}
                </View>
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
                <ThemedText style={styles.label}>Notes</ThemedText>
                <View style={[styles.textAreaWrapper, { backgroundColor: inputBgColor, borderColor: borderColor }]}>
                  <TextInput
                    style={[styles.textArea, { color: subtleColor }]}
                    placeholder="e.g., Take with food, Take before bed"
                    placeholderTextColor={subtleColor}
                    value={notes}
                    onChangeText={setNotes}
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
    </Modal>
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
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  dateInputContainer: {
    width: "48%",
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
