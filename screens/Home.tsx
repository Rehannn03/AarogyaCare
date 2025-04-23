"use client"

import { useEffect, useRef } from "react"
import { StyleSheet, ScrollView, View, TouchableOpacity, Animated } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Bell, Calendar, ArrowRight, Plus, Layers } from "lucide-react-native"
import ThemedView from "../components/ThemedView"
import ThemedText from "../components/ThemedText"
import { MedicationCard } from "../components/MedicationCard"
import { ReportSummary } from "../components/ReportSummary"
import { HealthMetrics } from "../components/HealthMetrics"
import { dummyMedications, dummyLatestReport } from "../data/dummyData"
import useThemeColor from "../hooks/useThemeColor"
import { userName } from "../config/constants"
import ReminderSettings from "../components/ReminderSettings"
import InteractionChecker from "../components/InteractionChecker"

export default function HomeScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(50)).current

  const primaryColor = useThemeColor({ light: "#3b82f6", dark: "#60a5fa" }, "tint")
  const subtleColor = useThemeColor({ light: "#64748b", dark: "#94a3b8" }, "text")
  const badgeColor = useThemeColor({ light: "#ef4444", dark: "#f87171" }, "notification")

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <ThemedText style={styles.greeting}>Hello, {userName.split(" ")[0]}</ThemedText>
            <ThemedText style={styles.date} lightColor="#64748b" darkColor="#94a3b8">
              <Calendar size={14} color={subtleColor} /> Today, {new Date().toLocaleDateString()}
            </ThemedText>
          </View>
          <TouchableOpacity style={[styles.notificationButton, { backgroundColor: `${primaryColor}20` }]}>
            <Bell size={24} color={primaryColor} />
            <View style={[styles.notificationBadge, { backgroundColor: badgeColor }]}>
              <ThemedText style={styles.notificationText} lightColor="#ffffff" darkColor="#ffffff">
                3
              </ThemedText>
            </View>
          </TouchableOpacity>
        </View>

        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          <ThemedView style={styles.section}>
            <View style={styles.sectionHeader}>
              <ThemedText style={styles.sectionTitle}>Today's Medications</ThemedText>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity
                  style={[styles.quickAddButton, { backgroundColor: `${primaryColor}20` }]}
                  onPress={() => navigation.navigate("AddMedication")}
                >
                  <Plus size={16} color={primaryColor} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.seeAllButton} onPress={() => navigation.navigate("Medications")}>
                  <ThemedText style={styles.seeAllText} lightColor={primaryColor} darkColor={primaryColor}>
                    See all
                  </ThemedText>
                  <ArrowRight size={16} color={primaryColor} />
                </TouchableOpacity>
              </View>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.medicationsScroll}>
              {dummyMedications.slice(0, 3).map((med, index) => (
                <MedicationCard key={index} medication={med} />
              ))}
            </ScrollView>
          </ThemedView>
        </Animated.View>

        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          <ThemedView style={styles.section}>
            <ReminderSettings />
          </ThemedView>
        </Animated.View>

        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          <ThemedView style={styles.section}>
            <InteractionChecker />
          </ThemedView>
        </Animated.View>

        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          <ThemedView style={styles.section}>
            <View style={styles.sectionHeader}>
              <ThemedText style={styles.sectionTitle}>Health Metrics</ThemedText>
            </View>

            <HealthMetrics />
          </ThemedView>
        </Animated.View>

        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          <ThemedView style={styles.section}>
            <View style={styles.sectionHeader}>
              <ThemedText style={styles.sectionTitle}>Latest Medical Report</ThemedText>
            </View>

            <ReportSummary
              report={dummyLatestReport}
              onPress={() => navigation.navigate("ReportDetails", { reportId: dummyLatestReport.id })}
            />
          </ThemedView>
        </Animated.View>

        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          <ThemedView style={styles.section}>
            <View style={styles.sectionHeader}>
              <ThemedText style={styles.sectionTitle}>Advanced Features</ThemedText>
              <TouchableOpacity style={styles.seeAllButton} onPress={() => navigation.navigate("Features")}>
                <ThemedText style={styles.seeAllText} lightColor={primaryColor} darkColor={primaryColor}>
                  See all
                </ThemedText>
                <ArrowRight size={16} color={primaryColor} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.featuresButton, { backgroundColor: `${primaryColor}10` }]}
              onPress={() => navigation.navigate("Features")}
            >
              <Layers size={24} color={primaryColor} style={styles.featuresIcon} />
              <ThemedText style={styles.featuresText}>
                Access all health features including Symptom Tracker, Pharmacy Locator, and more
              </ThemedText>
              <ArrowRight size={16} color={primaryColor} />
            </TouchableOpacity>
          </ThemedView>
        </Animated.View>

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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  greeting: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
  },
  notificationButton: {
    position: "relative",
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationText: {
    fontSize: 10,
    fontWeight: "bold",
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  seeAllButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  seeAllText: {
    fontSize: 14,
    marginRight: 4,
  },
  medicationsScroll: {
    marginLeft: -8,
    paddingLeft: 8,
  },
  bottomPadding: {
    height: 100,
  },
  quickAddButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  featuresButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  featuresIcon: {
    marginRight: 12,
  },
  featuresText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    marginRight: 8,
  },
})
