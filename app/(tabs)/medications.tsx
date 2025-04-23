"use client"

import { useEffect, useRef, useState } from "react"
import { StyleSheet, FlatList, View, TouchableOpacity, Animated } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Calendar, Plus, Filter, X } from "lucide-react-native"
import ThemedView from "../../components/ThemedView"
import ThemedText from "../../components/ThemedText"
import { MedicationListItem } from "../../components/MedicationListItem"
import MedicationFilter, { type FilterOption } from "../../components/MedicationFilter"
import AddMedicationModal from "../../components/AddMedicationModal"
import { dummyMedications } from "../../data/dummyData"
import useThemeColor from "../../hooks/useThemeColor"

export default function MedicationsScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current
  const [showFilters, setShowFilters] = useState(false)
  const [filteredMedications, setFilteredMedications] = useState(dummyMedications)
  const [medications, setMedications] = useState(dummyMedications)
  const [showAddModal, setShowAddModal] = useState(false)

  // Filter states
  const [selectedStatusFilters, setSelectedStatusFilters] = useState<string[]>([])
  const [selectedTimeFilters, setSelectedTimeFilters] = useState<string[]>([])

  const primaryColor = useThemeColor({ light: "#3b82f6", dark: "#60a5fa" }, "tint")
  const subtleColor = useThemeColor({ light: "#64748b", dark: "#94a3b8" }, "text")
  const cardBgColor = useThemeColor({ light: "#ffffff", dark: "#1f2937" }, "background")

  const statusFilters: FilterOption[] = [
    { id: "taken", label: "Taken" },
    { id: "missed", label: "Missed" },
    { id: "upcoming", label: "Upcoming" },
  ]

  const timeFilters: FilterOption[] = [
    { id: "morning", label: "Morning" },
    { id: "afternoon", label: "Afternoon" },
    { id: "evening", label: "Evening" },
    { id: "night", label: "Night" },
  ]

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start()
  }, [])

  useEffect(() => {
    // Apply filters
    let filtered = [...medications]

    if (selectedStatusFilters.length > 0) {
      filtered = filtered.filter((med) => selectedStatusFilters.includes(med.status))
    }

    if (selectedTimeFilters.length > 0) {
      filtered = filtered.filter((med) => {
        const hour = Number.parseInt(med.time.split(":")[0])

        if (selectedTimeFilters.includes("morning") && hour >= 6 && hour < 12) {
          return true
        }
        if (selectedTimeFilters.includes("afternoon") && hour >= 12 && hour < 17) {
          return true
        }
        if (selectedTimeFilters.includes("evening") && hour >= 17 && hour < 21) {
          return true
        }
        if (selectedTimeFilters.includes("night") && (hour >= 21 || hour < 6)) {
          return true
        }

        return false
      })
    }

    setFilteredMedications(filtered)
  }, [selectedStatusFilters, selectedTimeFilters, medications])

  const handleStatusFilterChange = (filterId: string) => {
    setSelectedStatusFilters((prev) => {
      if (prev.includes(filterId)) {
        return prev.filter((id) => id !== filterId)
      } else {
        return [...prev, filterId]
      }
    })
  }

  const handleTimeFilterChange = (filterId: string) => {
    setSelectedTimeFilters((prev) => {
      if (prev.includes(filterId)) {
        return prev.filter((id) => id !== filterId)
      } else {
        return [...prev, filterId]
      }
    })
  }

  const resetFilters = () => {
    setSelectedStatusFilters([])
    setSelectedTimeFilters([])
  }

  const handleAddMedication = (newMedication) => {
    setMedications((prev) => [newMedication, ...prev])
  }

  const renderItem = ({ item, index }) => {
    return (
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [
            {
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0],
              }),
            },
          ],
        }}
      >
        <MedicationListItem medication={item} />
      </Animated.View>
    )
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ThemedView style={styles.header}>
        <View>
          <ThemedText style={styles.title}>Medications</ThemedText>
          <ThemedText style={styles.date} lightColor="#64748b" darkColor="#94a3b8">
            <Calendar size={14} color={subtleColor} /> {new Date().toLocaleDateString()}
          </ThemedText>
        </View>
        <TouchableOpacity
          style={[styles.filterButton, { backgroundColor: showFilters ? primaryColor : `${primaryColor}20` }]}
          onPress={() => setShowFilters(!showFilters)}
        >
          {showFilters ? <X size={20} color="#ffffff" /> : <Filter size={20} color={primaryColor} />}
        </TouchableOpacity>
      </ThemedView>

      {showFilters && (
        <View style={styles.filterContainer}>
          <MedicationFilter
            statusFilters={statusFilters}
            selectedStatusFilters={selectedStatusFilters}
            timeFilters={timeFilters}
            selectedTimeFilters={selectedTimeFilters}
            onStatusFilterChange={handleStatusFilterChange}
            onTimeFilterChange={handleTimeFilterChange}
            onReset={resetFilters}
          />
        </View>
      )}

      <ThemedView style={styles.statsContainer}>
        <ThemedView style={[styles.statCard, { backgroundColor: cardBgColor }]}>
          <ThemedText style={[styles.statNumber, { color: primaryColor }]}>
            {filteredMedications.filter((med) => med.status === "taken").length}
          </ThemedText>
          <ThemedText style={styles.statLabel} lightColor="#64748b" darkColor="#94a3b8">
            Taken
          </ThemedText>
        </ThemedView>
        <ThemedView style={[styles.statCard, { backgroundColor: cardBgColor }]}>
          <ThemedText style={[styles.statNumber, { color: primaryColor }]}>
            {filteredMedications.filter((med) => med.status === "upcoming").length}
          </ThemedText>
          <ThemedText style={styles.statLabel} lightColor="#64748b" darkColor="#94a3b8">
            Upcoming
          </ThemedText>
        </ThemedView>
        <ThemedView style={[styles.statCard, { backgroundColor: cardBgColor }]}>
          <ThemedText style={[styles.statNumber, { color: "#ef4444" }]}>
            {filteredMedications.filter((med) => med.status === "missed").length}
          </ThemedText>
          <ThemedText style={styles.statLabel} lightColor="#64748b" darkColor="#94a3b8">
            Missed
          </ThemedText>
        </ThemedView>
      </ThemedView>

      <View style={styles.listHeader}>
        <ThemedText style={styles.listTitle}>Medication Schedule</ThemedText>
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: `${primaryColor}20` }]}
          onPress={() => setShowAddModal(true)}
        >
          <Plus size={20} color={primaryColor} />
        </TouchableOpacity>
      </View>

      {filteredMedications.length === 0 ? (
        <View style={styles.emptyContainer}>
          <ThemedText style={styles.emptyText} lightColor="#64748b" darkColor="#94a3b8">
            No medications match your filters
          </ThemedText>
          {(selectedStatusFilters.length > 0 || selectedTimeFilters.length > 0) && (
            <TouchableOpacity onPress={resetFilters}>
              <ThemedText style={[styles.resetText, { color: primaryColor }]}>Reset Filters</ThemedText>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <FlatList
          data={filteredMedications}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}

      <TouchableOpacity
        style={[styles.floatingButton, { backgroundColor: primaryColor }]}
        onPress={() => setShowAddModal(true)}
      >
        <Plus size={24} color="#ffffff" />
      </TouchableOpacity>

      <AddMedicationModal visible={showAddModal} onClose={() => setShowAddModal(false)} onSave={handleAddMedication} />
    </SafeAreaView>
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
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  filterContainer: {
    paddingHorizontal: 20,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 16,
  },
  statCard: {
    borderRadius: 16,
    padding: 16,
    width: "31%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
  },
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 8,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 16,
  },
  resetText: {
    fontSize: 16,
    fontWeight: "500",
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
})
