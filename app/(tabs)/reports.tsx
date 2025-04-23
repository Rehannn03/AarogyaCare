"use client"

import { useEffect, useRef } from "react"
import { StyleSheet, FlatList, TouchableOpacity, Animated } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useRouter } from "expo-router"
import { Filter } from "lucide-react-native"
import ThemedView from "../../components/ThemedView"
import ThemedText from "../../components/ThemedText"
import { ReportCard } from "../../components/ReportCard"
import { dummyReports } from "../../data/dummyData"
import useThemeColor from "../../hooks/useThemeColor"
import HealthArticles from "../../components/HealthArticles"

export default function ReportsScreen() {
  const router = useRouter()
  const fadeAnim = useRef(new Animated.Value(0)).current

  const primaryColor = useThemeColor({ light: "#3b82f6", dark: "#60a5fa" }, "tint")

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start()
  }, [])

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
        <ReportCard report={item} onPress={() => router.push(`/report-details/${item.id}`)} />
      </Animated.View>
    )
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ThemedView style={styles.header}>
        <ThemedText style={styles.title}>Medical Reports</ThemedText>
        <TouchableOpacity style={[styles.filterButton, { backgroundColor: `${primaryColor}20` }]}>
          <Filter size={20} color={primaryColor} />
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={styles.categoriesContainer}>
        <TouchableOpacity style={[styles.categoryButton, styles.categoryActive, { backgroundColor: primaryColor }]}>
          <ThemedText style={styles.categoryActiveText} lightColor="#ffffff" darkColor="#ffffff">
            All
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryButton}>
          <ThemedText style={styles.categoryText} lightColor="#64748b" darkColor="#94a3b8">
            Lab Tests
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryButton}>
          <ThemedText style={styles.categoryText} lightColor="#64748b" darkColor="#94a3b8">
            Imaging
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryButton}>
          <ThemedText style={styles.categoryText} lightColor="#64748b" darkColor="#94a3b8">
            Checkups
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>

      <FlatList
        data={dummyReports}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={() => (
          <ThemedView style={styles.articlesSection}>
            <HealthArticles />
          </ThemedView>
        )}
      />
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
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  categoriesContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  categoryActive: {
    backgroundColor: "#3b82f6",
  },
  categoryText: {
    fontWeight: "500",
  },
  categoryActiveText: {
    fontWeight: "500",
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  articlesSection: {
    marginTop: 20,
    marginBottom: 20,
  },
})
