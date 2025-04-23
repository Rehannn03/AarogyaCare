"use client"

import { useState } from "react"
import { StyleSheet, View, TouchableOpacity, Image, Alert } from "react-native"
import { Camera, Scan, Check, X, Info } from "lucide-react-native"
import ThemedView from "./ThemedView"
import ThemedText from "./ThemedText"
import useThemeColor from "../hooks/useThemeColor"

export default function MedicationScanner() {
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState(null)

  const primaryColor = useThemeColor({ light: "#3b82f6", dark: "#60a5fa" }, "tint")
  const subtleColor = useThemeColor({ light: "#64748b", dark: "#94a3b8" }, "text")
  const cardBgColor = useThemeColor({ light: "#ffffff", dark: "#1f2937" }, "background")

  // Mock medication data that would be returned from a real scan
  const mockMedicationData = {
    name: "Lisinopril",
    dosage: "10mg",
    description: "Used to treat high blood pressure and heart failure",
    manufacturer: "Zydus Pharmaceuticals",
    ndc: "68382-023-01",
    interactions: ["Potassium supplements", "NSAIDs", "Lithium"],
    sideEffects: ["Dizziness", "Headache", "Dry cough", "Fatigue"],
  }

  const handleStartScan = () => {
    setIsScanning(true)

    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false)
      setScanResult(mockMedicationData)
    }, 2000)
  }

  const handleAddMedication = () => {
    Alert.alert("Add Medication", "Would you like to add this medication to your list?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Add",
        onPress: () => {
          // This would add the medication to the user's list in a real app
          Alert.alert("Success", "Medication added to your list")
          setScanResult(null)
        },
      },
    ])
  }

  const handleCancel = () => {
    setScanResult(null)
  }

  return (
    <ThemedView style={[styles.container, { backgroundColor: cardBgColor }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Scan size={20} color={primaryColor} />
          <ThemedText style={styles.headerTitle}>Medication Scanner</ThemedText>
        </View>
      </View>

      <ThemedText style={styles.description} lightColor="#64748b" darkColor="#94a3b8">
        Scan medication barcodes or labels to quickly identify and add medications to your list
      </ThemedText>

      {!isScanning && !scanResult ? (
        <TouchableOpacity
          style={[styles.scanButton, { backgroundColor: `${primaryColor}20` }]}
          onPress={handleStartScan}
        >
          <Camera size={24} color={primaryColor} style={styles.scanIcon} />
          <ThemedText style={[styles.scanButtonText, { color: primaryColor }]}>Scan Medication</ThemedText>
        </TouchableOpacity>
      ) : isScanning ? (
        <View style={styles.scanningContainer}>
          <View style={styles.cameraPreview}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=2560&q=80",
              }}
              style={styles.cameraImage}
            />
            <View style={styles.scanOverlay}>
              <View style={[styles.scanCorner, styles.topLeft]} />
              <View style={[styles.scanCorner, styles.topRight]} />
              <View style={[styles.scanCorner, styles.bottomLeft]} />
              <View style={[styles.scanCorner, styles.bottomRight]} />
            </View>
          </View>
          <ThemedText style={styles.scanningText} lightColor="#64748b" darkColor="#94a3b8">
            Scanning... Position barcode within frame
          </ThemedText>
        </View>
      ) : scanResult ? (
        <View style={styles.resultContainer}>
          <View style={styles.resultHeader}>
            <ThemedText style={styles.resultTitle}>
              {scanResult.name} {scanResult.dosage}
            </ThemedText>
            <View style={styles.resultActions}>
              <TouchableOpacity style={[styles.resultAction, { backgroundColor: "#ef444420" }]} onPress={handleCancel}>
                <X size={20} color="#ef4444" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.resultAction, { backgroundColor: "#22c55e20" }]}
                onPress={handleAddMedication}
              >
                <Check size={20} color="#22c55e" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.resultInfo}>
            <ThemedText style={styles.resultInfoText}>{scanResult.description}</ThemedText>
            <ThemedText style={styles.resultInfoLabel}>Manufacturer</ThemedText>
            <ThemedText style={styles.resultInfoText}>{scanResult.manufacturer}</ThemedText>
            <ThemedText style={styles.resultInfoLabel}>NDC</ThemedText>
            <ThemedText style={styles.resultInfoText}>{scanResult.ndc}</ThemedText>
          </View>

          <View style={styles.warningSection}>
            <View style={styles.warningHeader}>
              <Info size={16} color="#f59e0b" />
              <ThemedText style={[styles.warningTitle, { color: "#f59e0b" }]}>Potential Interactions</ThemedText>
            </View>
            <View style={styles.warningList}>
              {scanResult.interactions.map((interaction, index) => (
                <ThemedText key={index} style={styles.warningItem} lightColor="#334155" darkColor="#cbd5e1">
                  • {interaction}
                </ThemedText>
              ))}
            </View>
          </View>

          <View style={styles.sideEffectsSection}>
            <ThemedText style={styles.sideEffectsTitle}>Common Side Effects</ThemedText>
            <View style={styles.sideEffectsList}>
              {scanResult.sideEffects.map((effect, index) => (
                <View key={index} style={[styles.sideEffectTag, { backgroundColor: `${primaryColor}20` }]}>
                  <ThemedText style={[styles.sideEffectText, { color: primaryColor }]}>{effect}</ThemedText>
                </View>
              ))}
            </View>
          </View>

          <TouchableOpacity style={[styles.addButton, { backgroundColor: primaryColor }]} onPress={handleAddMedication}>
            <ThemedText style={styles.addButtonText} lightColor="#ffffff" darkColor="#ffffff">
              Add to My Medications
            </ThemedText>
          </TouchableOpacity>
        </View>
      ) : null}

      <View style={styles.recentScans}>
        <ThemedText style={styles.recentScansTitle}>Recent Scans</ThemedText>
        <View style={styles.recentScansList}>
          <View style={styles.recentScanItem}>
            <ThemedText style={styles.recentScanName}>Metformin 500mg</ThemedText>
            <ThemedText style={styles.recentScanTime} lightColor="#64748b" darkColor="#94a3b8">
              2 days ago
            </ThemedText>
          </View>
          <View style={styles.recentScanItem}>
            <ThemedText style={styles.recentScanName}>Atorvastatin 20mg</ThemedText>
            <ThemedText style={styles.recentScanTime} lightColor="#64748b" darkColor="#94a3b8">
              5 days ago
            </ThemedText>
          </View>
        </View>
      </View>
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
  scanButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 20,
  },
  scanIcon: {
    marginRight: 8,
  },
  scanButtonText: {
    fontSize: 16,
    fontWeight: "500",
  },
  scanningContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  cameraPreview: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
    marginBottom: 12,
  },
  cameraImage: {
    width: "100%",
    height: "100%",
  },
  scanOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  scanCorner: {
    position: "absolute",
    width: 20,
    height: 20,
    borderColor: "#ffffff",
  },
  topLeft: {
    top: 20,
    left: 20,
    borderTopWidth: 2,
    borderLeftWidth: 2,
  },
  topRight: {
    top: 20,
    right: 20,
    borderTopWidth: 2,
    borderRightWidth: 2,
  },
  bottomLeft: {
    bottom: 20,
    left: 20,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
  },
  bottomRight: {
    bottom: 20,
    right: 20,
    borderBottomWidth: 2,
    borderRightWidth: 2,
  },
  scanningText: {
    fontSize: 14,
    textAlign: "center",
  },
  resultContainer: {
    marginBottom: 20,
  },
  resultHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  resultActions: {
    flexDirection: "row",
  },
  resultAction: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  resultInfo: {
    marginBottom: 16,
  },
  resultInfoLabel: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 8,
    marginBottom: 2,
  },
  resultInfoText: {
    fontSize: 14,
    lineHeight: 20,
  },
  warningSection: {
    backgroundColor: "#f59e0b10",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  warningHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  warningTitle: {
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 6,
  },
  warningList: {
    paddingLeft: 4,
  },
  warningItem: {
    fontSize: 14,
    marginBottom: 4,
  },
  sideEffectsSection: {
    marginBottom: 16,
  },
  sideEffectsTitle: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
  },
  sideEffectsList: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  sideEffectTag: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  sideEffectText: {
    fontSize: 12,
    fontWeight: "500",
  },
  addButton: {
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: "500",
  },
  recentScans: {
    marginTop: 8,
  },
  recentScansTitle: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
  },
  recentScansList: {},
  recentScanItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
  },
  recentScanName: {
    fontSize: 14,
  },
  recentScanTime: {
    fontSize: 12,
  },
})
