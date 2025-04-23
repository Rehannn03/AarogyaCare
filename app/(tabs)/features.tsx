"use client"

import { StyleSheet, ScrollView, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import ThemedView from "../../components/ThemedView"
import ThemedText from "../../components/ThemedText"
import SymptomTracker from "../../components/SymptomTracker"
import PharmacyLocator from "../../components/PharmacyLocator"
import MedicationScanner from "../../components/MedicationScanner"
import HealthArticles from "../../components/HealthArticles"
import AppointmentScheduler from "../../components/AppointmentScheduler"
import { ReportSummary } from "../../components/ReportSummary"
import { dummyLatestReport } from "../../data/dummyData"
import { useRouter } from "expo-router"

export default function FeaturesScreen() {
  const router = useRouter()

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ThemedView style={styles.header}>
        <ThemedText style={styles.title}>Health Features</ThemedText>
      </ThemedView>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        <View style={styles.section}>
          <SymptomTracker />
        </View>

        <View style={styles.section}>
          <PharmacyLocator />
        </View>

        <View style={styles.section}>
          <MedicationScanner />
        </View>

        <View style={styles.section}>
          <HealthArticles />
        </View>

        <View style={styles.section}>
          <AppointmentScheduler />
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Latest Medical Report</ThemedText>
          <ReportSummary
            report={dummyLatestReport}
            onPress={() => router.push(`/report-details/${dummyLatestReport.id}`)}
          />
        </View>

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
  scrollView: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  bottomPadding: {
    height: 100,
  },
})
