"use client"

import { useState } from "react"
import { StyleSheet, View, TouchableOpacity, TextInput, ScrollView } from "react-native"
import { Activity, Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react-native"
import ThemedView from "./ThemedView"
import ThemedText from "./ThemedText"
import useThemeColor from "../hooks/useThemeColor"

const SYMPTOM_OPTIONS = [
  "Headache",
  "Nausea",
  "Dizziness",
  "Fatigue",
  "Pain",
  "Rash",
  "Fever",
  "Cough",
  "Shortness of breath",
  "Stomach pain",
  "Vomiting",
  "Diarrhea",
  "Constipation",
  "Muscle ache",
  "Joint pain",
]

const SEVERITY_LEVELS = [
  { value: 1, label: "Mild", color: "#22c55e" },
  { value: 2, label: "Moderate", color: "#f59e0b" },
  { value: 3, label: "Severe", color: "#ef4444" },
]

export default function SymptomTracker() {
  const [symptoms, setSymptoms] = useState([
    { id: 1, name: "Headache", severity: 2, notes: "Frontal headache, started after lunch", date: "2023-05-15" },
    { id: 2, name: "Nausea", severity: 1, notes: "Mild nausea in the morning", date: "2023-05-14" },
  ])
  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedSymptom, setSelectedSymptom] = useState("")
  const [showSymptomDropdown, setShowSymptomDropdown] = useState(false)
  const [selectedSeverity, setSelectedSeverity] = useState(1)
  const [symptomNotes, setSymptomNotes] = useState("")
  const [customSymptom, setCustomSymptom] = useState("")

  const primaryColor = useThemeColor({ light: "#3b82f6", dark: "#60a5fa" }, "tint")
  const subtleColor = useThemeColor({ light: "#64748b", dark: "#94a3b8" }, "text")
  const cardBgColor = useThemeColor({ light: "#ffffff", dark: "#1f2937" }, "background")
  const inputBgColor = useThemeColor({ light: "#f8fafc", dark: "#1e293b" }, "background")

  const handleAddSymptom = () => {
    const symptomName = selectedSymptom || customSymptom
    if (!symptomName) return

    const newSymptom = {
      id: Date.now(),
      name: symptomName,
      severity: selectedSeverity,
      notes: symptomNotes,
      date: new Date().toISOString().split("T")[0],
    }

    setSymptoms([newSymptom, ...symptoms])
    resetForm()
  }

  const resetForm = () => {
    setSelectedSymptom("")
    setCustomSymptom("")
    setSelectedSeverity(1)
    setSymptomNotes("")
    setShowSymptomDropdown(false)
    setShowAddForm(false)
  }

  const handleDeleteSymptom = (id) => {
    setSymptoms(symptoms.filter((symptom) => symptom.id !== id))
  }

  const getSeverityColor = (severity) => {
    const level = SEVERITY_LEVELS.find((level) => level.value === severity)
    return level ? level.color : "#64748b"
  }

  const getSeverityLabel = (severity) => {
    const level = SEVERITY_LEVELS.find((level) => level.value === severity)
    return level ? level.label : "Unknown"
  }

  return (
    <ThemedView style={[styles.container, { backgroundColor: cardBgColor }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Activity size={20} color={primaryColor} />
          <ThemedText style={styles.headerTitle}>Symptom Tracker</ThemedText>
        </View>
        {!showAddForm && (
          <TouchableOpacity
            style={[styles.addButton, { backgroundColor: `${primaryColor}20` }]}
            onPress={() => setShowAddForm(true)}
          >
            <Plus size={16} color={primaryColor} />
            <ThemedText style={[styles.addButtonText, { color: primaryColor }]}>Add Symptom</ThemedText>
          </TouchableOpacity>
        )}
      </View>

      {showAddForm && (
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <ThemedText style={styles.inputLabel}>Symptom</ThemedText>
            <TouchableOpacity
              style={[styles.dropdownButton, { backgroundColor: inputBgColor }]}
              onPress={() => setShowSymptomDropdown(!showSymptomDropdown)}
            >
              <ThemedText style={selectedSymptom ? styles.dropdownSelectedText : styles.dropdownPlaceholder}>
                {selectedSymptom || "Select a symptom"}
              </ThemedText>
              {showSymptomDropdown ? (
                <ChevronUp size={16} color={subtleColor} />
              ) : (
                <ChevronDown size={16} color={subtleColor} />
              )}
            </TouchableOpacity>

            {showSymptomDropdown && (
              <ScrollView style={[styles.dropdownList, { backgroundColor: inputBgColor }]} nestedScrollEnabled={true}>
                {SYMPTOM_OPTIONS.map((symptom, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setSelectedSymptom(symptom)
                      setShowSymptomDropdown(false)
                    }}
                  >
                    <ThemedText
                      style={[
                        styles.dropdownItemText,
                        selectedSymptom === symptom && { color: primaryColor, fontWeight: "500" },
                      ]}
                    >
                      {symptom}
                    </ThemedText>
                  </TouchableOpacity>
                ))}
                <View style={styles.dropdownDivider} />
                <View style={styles.customSymptomContainer}>
                  <ThemedText style={styles.customSymptomLabel}>Or enter custom symptom:</ThemedText>
                  <TextInput
                    style={[styles.customSymptomInput, { color: subtleColor }]}
                    placeholder="Type here..."
                    placeholderTextColor={subtleColor}
                    value={customSymptom}
                    onChangeText={setCustomSymptom}
                    onSubmitEditing={() => {
                      if (customSymptom) {
                        setSelectedSymptom("")
                        setShowSymptomDropdown(false)
                      }
                    }}
                  />
                </View>
              </ScrollView>
            )}
          </View>

          <View style={styles.inputContainer}>
            <ThemedText style={styles.inputLabel}>Severity</ThemedText>
            <View style={styles.severityContainer}>
              {SEVERITY_LEVELS.map((level) => (
                <TouchableOpacity
                  key={level.value}
                  style={[
                    styles.severityButton,
                    {
                      backgroundColor: selectedSeverity === level.value ? `${level.color}20` : "transparent",
                      borderColor: selectedSeverity === level.value ? level.color : subtleColor,
                    },
                  ]}
                  onPress={() => setSelectedSeverity(level.value)}
                >
                  <ThemedText
                    style={[
                      styles.severityButtonText,
                      { color: selectedSeverity === level.value ? level.color : subtleColor },
                    ]}
                  >
                    {level.label}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputContainer}>
            <ThemedText style={styles.inputLabel}>Notes (Optional)</ThemedText>
            <TextInput
              style={[styles.notesInput, { backgroundColor: inputBgColor, color: subtleColor }]}
              placeholder="Add any additional details about your symptom"
              placeholderTextColor={subtleColor}
              value={symptomNotes}
              onChangeText={setSymptomNotes}
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
              onPress={handleAddSymptom}
              disabled={!selectedSymptom && !customSymptom}
            >
              <ThemedText style={styles.saveButtonText} lightColor="#ffffff" darkColor="#ffffff">
                Save
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {symptoms.length > 0 ? (
        <View style={styles.symptomsContainer}>
          {symptoms.map((symptom) => (
            <View key={symptom.id} style={styles.symptomItem}>
              <View style={styles.symptomHeader}>
                <ThemedText style={styles.symptomName}>{symptom.name}</ThemedText>
                <View
                  style={[
                    styles.severityBadge,
                    {
                      backgroundColor: `${getSeverityColor(symptom.severity)}20`,
                      borderColor: getSeverityColor(symptom.severity),
                    },
                  ]}
                >
                  <ThemedText style={[styles.severityText, { color: getSeverityColor(symptom.severity) }]}>
                    {getSeverityLabel(symptom.severity)}
                  </ThemedText>
                </View>
              </View>
              {symptom.notes && (
                <ThemedText style={styles.symptomNotes} lightColor="#334155" darkColor="#cbd5e1">
                  {symptom.notes}
                </ThemedText>
              )}
              <View style={styles.symptomFooter}>
                <ThemedText style={styles.symptomDate} lightColor="#64748b" darkColor="#94a3b8">
                  {new Date(symptom.date).toLocaleDateString()}
                </ThemedText>
                <TouchableOpacity
                  style={[styles.deleteButton, { backgroundColor: "#ef444420" }]}
                  onPress={() => handleDeleteSymptom(symptom.id)}
                >
                  <Trash2 size={14} color="#ef4444" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <ThemedText style={styles.emptyText} lightColor="#64748b" darkColor="#94a3b8">
            No symptoms recorded yet
          </ThemedText>
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
  dropdownButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  dropdownSelectedText: {
    fontSize: 14,
  },
  dropdownPlaceholder: {
    fontSize: 14,
    opacity: 0.6,
  },
  dropdownList: {
    maxHeight: 200,
    borderRadius: 12,
    marginTop: 4,
    paddingVertical: 8,
  },
  dropdownItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  dropdownItemText: {
    fontSize: 14,
  },
  dropdownDivider: {
    height: 1,
    backgroundColor: "rgba(0,0,0,0.05)",
    marginVertical: 8,
  },
  customSymptomContainer: {
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
  customSymptomLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  customSymptomInput: {
    fontSize: 14,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)",
  },
  severityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  severityButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    marginHorizontal: 4,
  },
  severityButtonText: {
    fontSize: 14,
    fontWeight: "500",
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
  symptomsContainer: {
    marginTop: 8,
  },
  symptomItem: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
    paddingVertical: 12,
  },
  symptomHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  symptomName: {
    fontSize: 15,
    fontWeight: "500",
  },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  severityText: {
    fontSize: 12,
    fontWeight: "500",
  },
  symptomNotes: {
    fontSize: 14,
    marginBottom: 8,
  },
  symptomFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  symptomDate: {
    fontSize: 12,
  },
  deleteButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    paddingVertical: 20,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 14,
  },
})
