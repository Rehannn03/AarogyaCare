import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native"
import { Filter, Check } from "lucide-react-native"
import ThemedView from "./ThemedView"
import ThemedText from "./ThemedText"
import useThemeColor from "../hooks/useThemeColor"

export type FilterOption = {
  id: string
  label: string
}

type MedicationFilterProps = {
  statusFilters: FilterOption[]
  selectedStatusFilters: string[]
  timeFilters: FilterOption[]
  selectedTimeFilters: string[]
  onStatusFilterChange: (filterId: string) => void
  onTimeFilterChange: (filterId: string) => void
  onReset: () => void
}

export default function MedicationFilter({
  statusFilters,
  selectedStatusFilters,
  timeFilters,
  selectedTimeFilters,
  onStatusFilterChange,
  onTimeFilterChange,
  onReset,
}: MedicationFilterProps) {
  const primaryColor = useThemeColor({ light: "#3b82f6", dark: "#60a5fa" }, "tint")
  const subtleColor = useThemeColor({ light: "#64748b", dark: "#94a3b8" }, "text")
  const cardBgColor = useThemeColor({ light: "#ffffff", dark: "#1f2937" }, "background")
  const borderColor = useThemeColor({ light: "#e2e8f0", dark: "#334155" }, "border")

  const FilterChip = ({ filter, isSelected, onPress }) => (
    <TouchableOpacity
      style={[
        styles.filterChip,
        {
          backgroundColor: isSelected ? `${primaryColor}20` : "transparent",
          borderColor: isSelected ? primaryColor : borderColor,
        },
      ]}
      onPress={() => onPress(filter.id)}
    >
      {isSelected && <Check size={14} color={primaryColor} style={styles.checkIcon} />}
      <ThemedText style={[styles.filterChipText, { color: isSelected ? primaryColor : subtleColor }]}>
        {filter.label}
      </ThemedText>
    </TouchableOpacity>
  )

  return (
    <ThemedView style={[styles.container, { backgroundColor: cardBgColor }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Filter size={20} color={primaryColor} />
          <ThemedText style={styles.headerTitle}>Filter Medications</ThemedText>
        </View>
        <TouchableOpacity onPress={onReset}>
          <ThemedText style={[styles.resetText, { color: primaryColor }]}>Reset</ThemedText>
        </TouchableOpacity>
      </View>

      <View style={styles.filterSection}>
        <ThemedText style={styles.filterTitle}>Status</ThemedText>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersScroll}>
          <View style={styles.filtersRow}>
            {statusFilters.map((filter) => (
              <FilterChip
                key={filter.id}
                filter={filter}
                isSelected={selectedStatusFilters.includes(filter.id)}
                onPress={onStatusFilterChange}
              />
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.filterSection}>
        <ThemedText style={styles.filterTitle}>Time of Day</ThemedText>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersScroll}>
          <View style={styles.filtersRow}>
            {timeFilters.map((filter) => (
              <FilterChip
                key={filter.id}
                filter={filter}
                isSelected={selectedTimeFilters.includes(filter.id)}
                onPress={onTimeFilterChange}
              />
            ))}
          </View>
        </ScrollView>
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
  resetText: {
    fontSize: 14,
    fontWeight: "500",
  },
  filterSection: {
    marginBottom: 16,
  },
  filterTitle: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 12,
  },
  filtersScroll: {
    marginLeft: -4,
  },
  filtersRow: {
    flexDirection: "row",
    paddingLeft: 4,
  },
  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },
  checkIcon: {
    marginRight: 4,
  },
  filterChipText: {
    fontSize: 14,
  },
})
