"use client"

import { useState } from "react"
import { StyleSheet, View, TouchableOpacity, TextInput, ScrollView } from "react-native"
import { Calendar as CalendarIcon, Clock, MapPin, Plus, Trash2 } from "lucide-react-native"
import DateTimePicker from "@react-native-community/datetimepicker"
import ThemedView from "./ThemedView"
import ThemedText from "./ThemedText"
import useThemeColor from "../hooks/useThemeColor"

export default function AppointmentScheduler() {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      doctorName: "Dr. Emily Johnson",
      specialty: "Cardiologist",
      date: "2023-05-20",
      time: "10:30 AM",
      location: "Heart Care Center, 123 Medical Blvd",
      notes: "Bring recent test results and medication list",
    },
    {
      id: 2,
      doctorName: "Dr. Michael Chen",
      specialty: "Primary Care",
      date: "2023-06-05",
      time: "2:15 PM",
      location: "Community Health Clinic, 456 Wellness Ave",
      notes: "Annual physical examination",
    },
  ])
  const [showAddForm, setShowAddForm] = useState(false)
  const [doctorName, setDoctorName] = useState("")
  const [specialty, setSpecialty] = useState("")
  const [appointmentDate, setAppointmentDate] = useState(new Date())
  const [appointmentTime, setAppointmentTime] = useState(new Date())
  const [location, setLocation] = useState("")
  const [notes, setNotes] = useState("")
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showTimePicker, setShowTimePicker] = useState(false)

  const primaryColor = useThemeColor({ light: "#3b82f6", dark: "#60a5fa" }, "tint")
  const subtleColor = useThemeColor({ light: "#64748b", dark: "#94a3b8" }, "text")
  const cardBgColor = useThemeColor({ light: "#ffffff", dark: "#1f2937" }, "background")
  const inputBgColor = useThemeColor({ light: "#f8fafc", dark: "#1e293b" }, "background")

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false)
    if (selectedDate) {
      setAppointmentDate(selectedDate)
    }
  }

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false)
    if (selectedTime) {
      setAppointmentTime(selectedTime)
    }
  }

  const handleAddAppointment = () => {
    if (!doctorName || !location) {
      alert("Doctor name and location are required")
      return
    }

    const formattedTime = appointmentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    const formattedDate = appointmentDate.toISOString().split("T")[0]

    const newAppointment = {
      id: Date.now(),
      doctorName,
      specialty,
      date: formattedDate,
      time: formattedTime,
      location,
      notes,
    }

    setAppointments([...appointments, newAppointment])
    resetForm()
  }

  const resetForm = () => {
    setDoctorName("")
    setSpecialty("")
    setAppointmentDate(new Date())
    setAppointmentTime(new Date())
    setLocation("")
    setNotes("")
    setShowAddForm(false)
  }

  const handleDeleteAppointment = (id) => {
    setAppointments(appointments.filter((appointment) => appointment.id !== id))
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <ThemedView style={[styles.container, { backgroundColor: cardBgColor }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <CalendarIcon size={20} color={primaryColor} />
          <ThemedText style={styles.headerTitle}>Appointment Scheduler</ThemedText>
        </View>
        {!showAddForm && (
          <TouchableOpacity
            style={[styles.addButton, { backgroundColor: `${primaryColor}20` }]}
            onPress={() => setShowAddForm(true)}
          >
            <Plus size={16} color={primaryColor} />
            <ThemedText style={[styles.addButtonText, { color: primaryColor }]}>Add</ThemedText>
          </TouchableOpacity>
        )}
      </View>

      {showAddForm ? (
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <ThemedText style={styles.inputLabel}>Doctor Name</ThemedText>
            <TextInput
              style={[styles.input, { backgroundColor: inputBgColor, color: subtleColor }]}
              placeholder="Enter doctor's name"
              placeholderTextColor={subtleColor}
              value={doctorName}
              onChangeText={setDoctorName}
            />
          </View>

          <View style={styles.inputContainer}>
            <ThemedText style={styles.inputLabel}>Specialty (Optional)</ThemedText>
            <TextInput
              style={[styles.input, { backgroundColor: inputBgColor, color: subtleColor }]}
              placeholder="Enter specialty"
              placeholderTextColor={subtleColor}
              value={specialty}
              onChangeText={setSpecialty}
            />
          </View>

          <View style={styles.dateTimeContainer}>
            <View style={styles.dateContainer}>
              <ThemedText style={styles.inputLabel}>Date</ThemedText>
              <TouchableOpacity
                style={[styles.dateTimeButton, { backgroundColor: inputBgColor }]}
                onPress={() => setShowDatePicker(true)}
              >
                <CalendarIcon size={16} color={subtleColor} style={styles.dateTimeIcon} />
                <ThemedText style={styles.dateTimeText}>{appointmentDate.toLocaleDateString()}</ThemedText>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={appointmentDate}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                  minimumDate={new Date()}
                />
              )}
            </View>

            <View style={styles.timeContainer}>
              <ThemedText style={styles.inputLabel}>Time</ThemedText>
              <TouchableOpacity
                style={[styles.dateTimeButton, { backgroundColor: inputBgColor }]}
                onPress={() => setShowTimePicker(true)}
              >
                <Clock size={16} color={subtleColor} style={styles.dateTimeIcon} />
                <ThemedText style={styles.dateTimeText}>
                  {appointmentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </ThemedText>
              </TouchableOpacity>
              {showTimePicker && (
                <DateTimePicker value={appointmentTime} mode="time" display="default" onChange={handleTimeChange} />
              )}
            </View>
          </View>

          <View style={styles.inputContainer}>
            <ThemedText style={styles.inputLabel}>Location</ThemedText>
            <TextInput
              style={[styles.input, { backgroundColor: inputBgColor, color: subtleColor }]}
              placeholder="Enter location"
              placeholderTextColor={subtleColor}
              value={location}
              onChangeText={setLocation}
            />
          </View>

          <View style={styles.inputContainer}>
            <ThemedText style={styles.inputLabel}>Notes (Optional)</ThemedText>
            <TextInput
              style={[styles.notesInput, { backgroundColor: inputBgColor, color: subtleColor }]}
              placeholder="Add any notes about this appointment"
              placeholderTextColor={subtleColor}
              value={notes}
              onChangeText={setNotes}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
          </View>

          <View style={styles.formButtons}>
            <TouchableOpacity style={[styles.cancelButton, { borderColor: subtleColor }]} onPress={resetForm}>
              <ThemedText style={styles.cancelButtonText}>Cancel</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.saveButton, { backgroundColor: primaryColor }]}
              onPress={handleAddAppointment}
            >
              <ThemedText style={styles.saveButtonText} lightColor="#ffffff" darkColor="#ffffff">
                Save
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      ) : appointments.length > 0 ? (
        <ScrollView style={styles.appointmentsList} showsVerticalScrollIndicator={false}>
          {appointments.map((appointment) => (
            <View key={appointment.id} style={styles.appointmentItem}>
              <View style={styles.appointmentHeader}>
                <ThemedText style={styles.doctorName}>{appointment.doctorName}</ThemedText>
                <TouchableOpacity
                  style={[styles.deleteButton, { backgroundColor: "#ef444420" }]}
                  onPress={() => handleDeleteAppointment(appointment.id)}
                >
                  <Trash2 size={14} color="#ef4444" />
                </TouchableOpacity>
              </View>
              {appointment.specialty && (
                <ThemedText style={styles.specialty} lightColor="#64748b" darkColor="#94a3b8">
                  {appointment.specialty}
                </ThemedText>
              )}
              <View style={styles.appointmentDetail}>
                <CalendarIcon size={14} color={subtleColor} style={styles.detailIcon} />
                <ThemedText style={styles.detailText} lightColor="#334155" darkColor="#cbd5e1">
                  {formatDate(appointment.date)} at {appointment.time}
                </ThemedText>
              </View>
              <View style={styles.appointmentDetail}>
                <MapPin size={14} color={subtleColor} style={styles.detailIcon} />
                <ThemedText style={styles.detailText} lightColor="#334155" darkColor="#cbd5e1">
                  {appointment.location}
                </ThemedText>
              </View>
              {appointment.notes && (
                <ThemedText style={styles.notes} lightColor="#64748b" darkColor="#94a3b8">
                  Note: {appointment.notes}
                </ThemedText>
              )}
              <View style={styles.appointmentActions}>
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: `${primaryColor}20` }]}
                  onPress={() => alert("This would add a reminder in a real app")}
                >
                  <ThemedText style={[styles.actionButtonText, { color: primaryColor }]}>Set Reminder</ThemedText>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      ) : (
        <View style={styles.emptyContainer}>
          <ThemedText style={styles.emptyText} lightColor="#64748b" darkColor="#94a3b8">
            No appointments scheduled
          </ThemedText>
          <TouchableOpacity
            style={[styles.emptyButton, { backgroundColor: `${primaryColor}20` }]}
            onPress={() => setShowAddForm(true)}
          >
            <ThemedText style={[styles.emptyButtonText, { color: primaryColor }]}>Schedule Appointment</ThemedText>
          </TouchableOpacity>
        </View>
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
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 4,
  },
  formContainer: {
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 6,
  },
  input: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
  dateTimeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  dateContainer: {
    width: "48%",
  },
  timeContainer: {
    width: "48%",
  },
  dateTimeButton: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  dateTimeIcon: {
    marginRight: 8,
  },
  dateTimeText: {
    fontSize: 14,
  },
  notesInput: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    minHeight: 80,
  },
  formButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 8,
  },
  cancelButton: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
  },
  cancelButtonText: {
    fontSize: 14,
  },
  saveButton: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  saveButtonText: {
    fontSize: 14,
    fontWeight: "500",
  },
  appointmentsList: {
    maxHeight: 400,
  },
  appointmentItem: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
    paddingBottom: 16,
  },
  appointmentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: "600",
  },
  deleteButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  specialty: {
    fontSize: 14,
    marginBottom: 8,
  },
  appointmentDetail: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  detailIcon: {
    marginRight: 8,
  },
  detailText: {
    fontSize: 14,
  },
  notes: {
    fontSize: 14,
    marginTop: 4,
    marginBottom: 12,
  },
  appointmentActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  actionButton: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: "500",
  },
  emptyContainer: {
    paddingVertical: 20,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 14,
    marginBottom: 12,
  },
  emptyButton: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  emptyButtonText: {
    fontSize: 14,
    fontWeight: "500",
  },
})
