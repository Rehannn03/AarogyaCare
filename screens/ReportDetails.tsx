"use client"

import { useEffect, useRef } from "react"
import { StyleSheet, ScrollView, View, TouchableOpacity, Animated } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Calendar, Download, Share2, ChevronLeft } from "lucide-react-native"
import ThemedView from "../components/ThemedView"
import ThemedText from "../components/ThemedText"
import { dummyReports } from "../data/dummyData"
import useThemeColor from "../hooks/useThemeColor"

export default function ReportDetailsScreen({ route, navigation }) {
  const { reportId } = route.params
  const report = dummyReports.find((r) => r.id === reportId)

  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(50)).current

  const primaryColor = useThemeColor({ light: "#3b82f6", dark: "#60a5fa" }, "tint")
  const subtleColor = useThemeColor({ light: "#64748b", dark: "#94a3b8" }, "text")
  const cardBgColor = useThemeColor({ light: "#ffffff", dark: "#1f2937" }, "background")

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

  if (!report) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <ThemedView style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <ChevronLeft size={24} color={primaryColor} />
          </TouchableOpacity>
          <ThemedText style={styles.errorText} lightColor="#ef4444" darkColor="#f87171">
            Report not found
          </ThemedText>
        </ThemedView>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ThemedView style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <ChevronLeft size={24} color={primaryColor} />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Report Details</ThemedText>
        <View style={styles.headerRight} />
      </ThemedView>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Animated.View
          style={[
            styles.reportHeader,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }], backgroundColor: cardBgColor },
          ]}
        >
          <ThemedText style={styles.reportTitle}>{report.title}</ThemedText>
          <ThemedText style={styles.reportDate} lightColor="#64748b" darkColor="#94a3b8">
            <Calendar size={14} color={subtleColor} /> {report.date}
          </ThemedText>
          <ThemedText style={styles.reportDoctor} lightColor="#64748b" darkColor="#94a3b8">
            Dr. {report.doctor}
          </ThemedText>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton}>
              <Download size={20} color={primaryColor} />
              <ThemedText style={[styles.actionText, { color: primaryColor }]}>Download</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Share2 size={20} color={primaryColor} />
              <ThemedText style={[styles.actionText, { color: primaryColor }]}>Share</ThemedText>
            </TouchableOpacity>
          </View>
        </Animated.View>

        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          <ThemedView style={[styles.section, { backgroundColor: cardBgColor }]}>
            <ThemedText style={styles.sectionTitle}>Summary</ThemedText>
            <ThemedText style={styles.sectionContent} lightColor="#334155" darkColor="#cbd5e1">
              {report.summary}
            </ThemedText>
          </ThemedView>

          <ThemedView style={[styles.section, { backgroundColor: cardBgColor }]}>
            <ThemedText style={styles.sectionTitle}>Key Findings</ThemedText>
            {report.findings.map((finding, index) => (
              <View key={index} style={styles.findingItem}>
                <View
                  style={[styles.findingDot, { backgroundColor: finding.status === "normal" ? "#22c55e" : "#f59e0b" }]}
                />
                <View style={styles.findingContent}>
                  <ThemedText style={styles.findingTitle}>{finding.name}</ThemedText>
                  <ThemedText style={styles.findingValue} lightColor="#334155" darkColor="#cbd5e1">
                    {finding.value} {finding.unit}
                  </ThemedText>
                  <ThemedText
                    style={[styles.findingStatus, { color: finding.status === "normal" ? "#22c55e" : "#f59e0b" }]}
                  >
                    {finding.status === "normal" ? "Normal" : "Attention needed"}
                  </ThemedText>
                </View>
              </View>
            ))}
          </ThemedView>

          <ThemedView style={[styles.section, { backgroundColor: cardBgColor }]}>
            <ThemedText style={styles.sectionTitle}>Recommendations</ThemedText>
            {report.recommendations.map((rec, index) => (
              <ThemedText key={index} style={styles.recommendationItem} lightColor="#334155" darkColor="#cbd5e1">
                • {rec}
              </ThemedText>
            ))}
          </ThemedView>

          <ThemedView style={[styles.section, { backgroundColor: cardBgColor }]}>
            <ThemedText style={styles.sectionTitle}>Next Steps</ThemedText>
            <ThemedText style={styles.sectionContent} lightColor="#334155" darkColor="#cbd5e1">
              {report.nextSteps}
            </ThemedText>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  headerRight: {
    width: 40,
  },
  errorText: {
    fontSize: 16,
    textAlign: "center",
    flex: 1,
  },
  reportHeader: {
    padding: 20,
    borderRadius: 16,
    marginHorizontal: 20,
    marginTop: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  reportTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
  },
  reportDate: {
    fontSize: 14,
    marginBottom: 4,
  },
  reportDoctor: {
    fontSize: 14,
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.05)",
    paddingTop: 16,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 24,
  },
  actionText: {
    fontSize: 14,
    marginLeft: 6,
  },
  section: {
    padding: 20,
    borderRadius: 16,
    marginHorizontal: 20,
    marginTop: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  sectionContent: {
    fontSize: 15,
    lineHeight: 22,
  },
  findingItem: {
    flexDirection: "row",
    marginBottom: 16,
    alignItems: "flex-start",
  },
  findingDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: 4,
    marginRight: 12,
  },
  findingContent: {
    flex: 1,
  },
  findingTitle: {
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 2,
  },
  findingValue: {
    fontSize: 14,
    marginBottom: 2,
  },
  findingStatus: {
    fontSize: 13,
    fontWeight: "500",
  },
  recommendationItem: {
    fontSize: 15,
    marginBottom: 8,
    lineHeight: 22,
  },
  bottomPadding: {
    height: 100,
  },
})
