"use client"

import { useState, useEffect } from "react"
import { StyleSheet, View, ScrollView, ActivityIndicator } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Calendar as CalendarComponent, LocaleConfig } from "react-native-calendars"
import { ChevronLeft, ChevronRight, Check, X } from "lucide-react-native"
import ThemedView from "../../components/ThemedView"
import ThemedText from "../../components/ThemedText"
import useThemeColor from "../../hooks/useThemeColor"
import { useMedicines } from "../../hooks/useMedicines"
import MedicationScanner from "../../components/MedicationScanner"

// Configure the calendar locale
LocaleConfig.locales["en"] = {
  monthNames: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
}
LocaleConfig.defaultLocale = "en"

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [markedDates, setMarkedDates] = useState({})
  const [adherenceData, setAdherenceData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const { medicines } = useMedicines()

  const primaryColor = useThemeColor({ light: "#3b82f6", dark: "#60a5fa" }, "tint")
  const subtleColor = useThemeColor({ light: "#64748b", dark: "#94a3b8" }, "text")
  const cardBgColor = useThemeColor({ light: "#ffffff", dark: "#1f2937" }, "background")
  const calendarBgColor = useThemeColor({ light: "#f8fafc", dark: "#0f172a" }, "background")
  const textColor = useThemeColor({ light: "#0f172a", dark: "#f8fafc" }, "text")

  // Generate mock adherence data for the past 30 days
  useEffect(() => {
    if (medicines.length > 0) {
      const today = new Date()
      const dates = {}
      const adherence = []

      // Generate data for the past 30 days
      for (let i = 0; i < 30; i++) {
        const date = new Date()
        date.setDate(today.getDate() - i)
        const dateString = date.toISOString().split("T")[0]

        // For each medicine, randomly determine if it was taken
        const dayMedicines = medicines.map((med) => {
          const status = Math.random() > 0.2 ? "taken" : "missed" // 80% chance of taking medicine
          return {
            ...med,
            adherenceStatus: status,
            adherenceTime:
              status === "taken"
                ? `${Math.floor(Math.random() * 12 + 1)}:${Math.floor(Math.random() * 60)
                    .toString()
                    .padStart(2, "0")} ${Math.random() > 0.5 ? "AM" : "PM"}`
                : null,
          }
        })

        // Mark the date based on adherence
        const allTaken = dayMedicines.every((med) => med.adherenceStatus === "taken")
        const someMissed = dayMedicines.some((med) => med.adherenceStatus === "missed")

        let dotColor
        if (allTaken)
          dotColor = "#22c55e" // green
        else if (someMissed)
          dotColor = "#ef4444" // red
        else dotColor = "#3b82f6" // blue

        dates[dateString] = {
          marked: true,
          dotColor: dotColor,
          selected: dateString === selectedDate,
          selectedColor: primaryColor + "40",
        }

        adherence.push({
          date: dateString,
          medicines: dayMedicines,
        })
      }

      setMarkedDates(dates)
      setAdherenceData(adherence)
      setIsLoading(false)
    }
  }, [medicines, selectedDate, primaryColor])

  // Get adherence data for the selected date
  const getSelectedDateData = () => {
    return adherenceData.find((item) => item.date === selectedDate)?.medicines || []
  }

  // Calculate adherence percentage
  const calculateAdherence = () => {
    if (adherenceData.length === 0) return 0

    let totalMeds = 0
    let takenMeds = 0

    adherenceData.forEach((day) => {
      day.medicines.forEach((med) => {
        totalMeds++
        if (med.adherenceStatus === "taken") takenMeds++
      })
    })

    return Math.round((takenMeds / totalMeds) * 100)
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ThemedView style={styles.header}>
        <ThemedText style={styles.title}>Medication Calendar</ThemedText>
      </ThemedView>

      <ScrollView showsVerticalScrollIndicator={false}>
        <ThemedView style={styles.calendarContainer}>
          <CalendarComponent
            current={selectedDate}
            onDayPress={(day) => setSelectedDate(day.dateString)}
            markedDates={markedDates}
            renderArrow={(direction) =>
              direction === "left" ? (
                <ChevronLeft size={20} color={primaryColor} />
              ) : (
                <ChevronRight size={20} color={primaryColor} />
              )
            }
            theme={{
              backgroundColor: calendarBgColor,
              calendarBackground: calendarBgColor,
              textSectionTitleColor: subtleColor,
              selectedDayBackgroundColor: primaryColor,
              selectedDayTextColor: "#ffffff",
              todayTextColor: primaryColor,
              dayTextColor: textColor,
              textDisabledColor: subtleColor + "80",
              monthTextColor: textColor,
              arrowColor: primaryColor,
              indicatorColor: primaryColor,
            }}
          />
        </ThemedView>

        <ThemedView style={styles.statsContainer}>
          <ThemedView style={[styles.statCard, { backgroundColor: cardBgColor }]}>
            <ThemedText style={styles.statValue}>{calculateAdherence()}%</ThemedText>
            <ThemedText style={styles.statLabel} lightColor="#64748b" darkColor="#94a3b8">
              Adherence
            </ThemedText>
          </ThemedView>
          <ThemedView style={[styles.statCard, { backgroundColor: cardBgColor }]}>
            <ThemedText style={styles.statValue}>{medicines.length}</ThemedText>
            <ThemedText style={styles.statLabel} lightColor="#64748b" darkColor="#94a3b8">
              Medications
            </ThemedText>
          </ThemedView>
          <ThemedView style={[styles.statCard, { backgroundColor: cardBgColor }]}>
            <ThemedText style={styles.statValue}>{adherenceData.length}</ThemedText>
            <ThemedText style={styles.statLabel} lightColor="#64748b" darkColor="#94a3b8">
              Days Tracked
            </ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.section}>
          <MedicationScanner />
        </ThemedView>

        <ThemedView style={styles.sectionHeader}>
          <ThemedText style={styles.sectionTitle}>
            Medications for {new Date(selectedDate).toLocaleDateString()}
          </ThemedText>
        </ThemedView>

        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={primaryColor} />
          </View>
        ) : getSelectedDateData().length > 0 ? (
          getSelectedDateData().map((med, index) => (
            <ThemedView key={index} style={[styles.medicationCard, { backgroundColor: cardBgColor }]}>
              <View style={styles.medicationHeader}>
                <ThemedText style={styles.medicationName}>{med.medicineName}</ThemedText>
                <View
                  style={[
                    styles.statusBadge,
                    {
                      backgroundColor: med.adherenceStatus === "taken" ? "#22c55e20" : "#ef444420",
                      borderColor: med.adherenceStatus === "taken" ? "#22c55e" : "#ef4444",
                    },
                  ]}
                >
                  {med.adherenceStatus === "taken" ? (
                    <Check size={14} color="#22c55e" style={styles.statusIcon} />
                  ) : (
                    <X size={14} color="#ef4444" style={styles.statusIcon} />
                  )}
                  <ThemedText
                    style={[styles.statusText, { color: med.adherenceStatus === "taken" ? "#22c55e" : "#ef4444" }]}
                  >
                    {med.adherenceStatus === "taken" ? "Taken" : "Missed"}
                  </ThemedText>
                </View>
              </View>
              <ThemedText style={styles.medicationDosage}>{med.dosage}</ThemedText>
              {med.adherenceStatus === "taken" && med.adherenceTime && (
                <ThemedText style={styles.medicationTime} lightColor="#64748b" darkColor="#94a3b8">
                  Taken at {med.adherenceTime}
                </ThemedText>
              )}
            </ThemedView>
          ))
        ) : (
          <ThemedView style={[styles.emptyContainer, { backgroundColor: cardBgColor }]}>
            <ThemedText style={styles.emptyText} lightColor="#64748b" darkColor="#94a3b8">
              No medication data for this date
            </ThemedText>
          </ThemedView>
        )}

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
  },
  calendarContainer: {
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 24,
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
  statValue: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textAlign: "center",
  },
  section: {
    marginHorizontal: 20,
    marginTop: 24,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  medicationCard: {
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  medicationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  medicationName: {
    fontSize: 16,
    fontWeight: "600",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  statusIcon: {
    marginRight: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
  },
  medicationDosage: {
    fontSize: 14,
    marginBottom: 4,
  },
  medicationTime: {
    fontSize: 12,
  },
  emptyContainer: {
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  emptyText: {
    fontSize: 14,
    textAlign: "center",
  },
  loadingContainer: {
    padding: 40,
    alignItems: "center",
  },
  bottomPadding: {
    height: 100,
  },
})
