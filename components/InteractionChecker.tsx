"use client"

import { useState } from "react"
import { StyleSheet, View, TextInput, TouchableOpacity, ActivityIndicator } from "react-native"
import { AlertTriangle, Search, X } from "lucide-react-native"
import ThemedView from "./ThemedView"
import ThemedText from "./ThemedText"
import useThemeColor from "../hooks/useThemeColor"

export default function InteractionChecker() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const [selectedMedications, setSelectedMedications] = useState([])
  const [interactions, setInteractions] = useState([])

  const primaryColor = useThemeColor({ light: "#3b82f6", dark: "#60a5fa" }, "tint")
  const subtleColor = useThemeColor({ light: "#64748b", dark: "#94a3b8" }, "text")
  const cardBgColor = useThemeColor({ light: "#ffffff", dark: "#1f2937" }, "background")
  const inputBgColor = useThemeColor({ light: "#f8fafc", dark: "#1e293b" }, "background")
  const warningColor = "#f59e0b"
  const dangerColor = "#ef4444"

  // Mock medication database for search
  const mockMedications = [
    "Aspirin",
    "Lisinopril",
    "Atorvastatin",
    "Levothyroxine",
    "Metformin",
    "Amlodipine",
    "Metoprolol",
    "Omeprazole",
    "Simvastatin",
    "Losartan",
    "Albuterol",
    "Gabapentin",
    "Hydrochlorothiazide",
    "Sertraline",
    "Montelukast",
  ]

  // Mock interaction data
  const mockInteractions = {
    "Aspirin-Lisinopril": {
      severity: "moderate",
      description: "May reduce the blood pressure lowering effects of Lisinopril.",
    },
    "Aspirin-Metoprolol": {
      severity: "moderate",
      description: "May reduce the blood pressure lowering effects of Metoprolol.",
    },
    "Atorvastatin-Omeprazole": {
      severity: "mild",
      description: "Omeprazole may increase the levels of Atorvastatin in the blood.",
    },
    "Levothyroxine-Omeprazole": {
      severity: "moderate",
      description: "Omeprazole may decrease the absorption of Levothyroxine.",
    },
    "Sertraline-Aspirin": {
      severity: "severe",
      description: "Increased risk of bleeding when used together.",
    },
  }

  const handleSearch = () => {
    if (!searchQuery.trim()) return

    setIsSearching(true)

    // Simulate API call delay
    setTimeout(() => {
      const results = mockMedications.filter((med) => med.toLowerCase().includes(searchQuery.toLowerCase()))
      setSearchResults(results)
      setIsSearching(false)
    }, 1000)
  }

  const addMedication = (medication) => {
    if (!selectedMedications.includes(medication)) {
      const newSelectedMeds = [...selectedMedications, medication]
      setSelectedMedications(newSelectedMeds)
      checkInteractions(newSelectedMeds)
    }
    setSearchQuery("")
    setSearchResults([])
  }

  const removeMedication = (medication) => {
    const newSelectedMeds = selectedMedications.filter((med) => med !== medication)
    setSelectedMedications(newSelectedMeds)
    checkInteractions(newSelectedMeds)
  }

  const checkInteractions = (medications) => {
    const newInteractions = []

    // Check all possible pairs for interactions
    for (let i = 0; i < medications.length; i++) {
      for (let j = i + 1; j < medications.length; j++) {
        const pair1 = `${medications[i]}-${medications[j]}`
        const pair2 = `${medications[j]}-${medications[i]}`

        if (mockInteractions[pair1]) {
          newInteractions.push({
            medications: [medications[i], medications[j]],
            ...mockInteractions[pair1],
          })
        } else if (mockInteractions[pair2]) {
          newInteractions.push({
            medications: [medications[i], medications[j]],
            ...mockInteractions[pair2],
          })
        }
      }
    }

    setInteractions(newInteractions)
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "severe":
        return dangerColor
      case "moderate":
        return warningColor
      case "mild":
        return primaryColor
      default:
        return subtleColor
    }
  }

  return (
    <ThemedView style={[styles.container, { backgroundColor: cardBgColor }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <AlertTriangle size={20} color={primaryColor} />
          <ThemedText style={styles.headerTitle}>Interaction Checker</ThemedText>
        </View>
      </View>

      <ThemedText style={styles.description} lightColor="#64748b" darkColor="#94a3b8">
        Check for potential interactions between medications
      </ThemedText>

      <View style={styles.searchContainer}>
        <View style={[styles.searchInputContainer, { backgroundColor: inputBgColor }]}>
          <Search size={18} color={subtleColor} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search medications..."
            placeholderTextColor={subtleColor}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <X size={18} color={subtleColor} />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity style={[styles.searchButton, { backgroundColor: primaryColor }]} onPress={handleSearch}>
          <ThemedText style={styles.searchButtonText} lightColor="#ffffff" darkColor="#ffffff">
            Search
          </ThemedText>
        </TouchableOpacity>
      </View>

      {isSearching ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color={primaryColor} />
        </View>
      ) : searchResults.length > 0 ? (
        <View style={styles.resultsContainer}>
          {searchResults.map((medication, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.resultItem, { borderBottomColor: "rgba(0,0,0,0.05)" }]}
              onPress={() => addMedication(medication)}
            >
              <ThemedText style={styles.resultItemText}>{medication}</ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      ) : null}

      {selectedMedications.length > 0 && (
        <View style={styles.selectedContainer}>
          <ThemedText style={styles.sectionTitle}>Selected Medications</ThemedText>
          <View style={styles.pillsContainer}>
            {selectedMedications.map((medication, index) => (
              <View key={index} style={[styles.pill, { backgroundColor: `${primaryColor}20` }]}>
                <ThemedText style={[styles.pillText, { color: primaryColor }]}>{medication}</ThemedText>
                <TouchableOpacity style={styles.pillRemove} onPress={() => removeMedication(medication)}>
                  <X size={14} color={primaryColor} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      )}

      {interactions.length > 0 && (
        <View style={styles.interactionsContainer}>
          <ThemedText style={styles.sectionTitle}>Potential Interactions</ThemedText>
          {interactions.map((interaction, index) => (
            <View
              key={index}
              style={[styles.interactionItem, { borderLeftColor: getSeverityColor(interaction.severity) }]}
            >
              <View style={styles.interactionHeader}>
                <ThemedText style={styles.interactionMeds}>{interaction.medications.join(" + ")}</ThemedText>
                <View
                  style={[styles.severityBadge, { backgroundColor: `${getSeverityColor(interaction.severity)}20` }]}
                >
                  <ThemedText style={[styles.severityText, { color: getSeverityColor(interaction.severity) }]}>
                    {interaction.severity.charAt(0).toUpperCase() + interaction.severity.slice(1)}
                  </ThemedText>
                </View>
              </View>
              <ThemedText style={styles.interactionDescription} lightColor="#334155" darkColor="#cbd5e1">
                {interaction.description}
              </ThemedText>
            </View>
          ))}
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
    marginBottom: 8,
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
  description: {
    fontSize: 14,
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 14,
  },
  searchButton: {
    borderRadius: 12,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  searchButtonText: {
    fontSize: 14,
    fontWeight: "500",
  },
  loadingContainer: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  resultsContainer: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: "hidden",
  },
  resultItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  resultItemText: {
    fontSize: 14,
  },
  selectedContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 12,
  },
  pillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  pillText: {
    fontSize: 14,
    fontWeight: "500",
    marginRight: 4,
  },
  pillRemove: {
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  interactionsContainer: {
    marginBottom: 8,
  },
  interactionItem: {
    borderLeftWidth: 4,
    paddingLeft: 12,
    paddingVertical: 12,
    marginBottom: 12,
  },
  interactionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  interactionMeds: {
    fontSize: 14,
    fontWeight: "600",
  },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  severityText: {
    fontSize: 12,
    fontWeight: "500",
  },
  interactionDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
})
