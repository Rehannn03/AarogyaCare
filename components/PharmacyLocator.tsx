"use client"

import { useState } from "react"
import { StyleSheet, View, TouchableOpacity, TextInput, ScrollView, Image } from "react-native"
import { MapPin, Search, Navigation, Phone, Clock, Star, ChevronRight } from "lucide-react-native"
import ThemedView from "./ThemedView"
import ThemedText from "./ThemedText"
import useThemeColor from "../hooks/useThemeColor"

// Mock pharmacy data
const MOCK_PHARMACIES = [
  {
    id: 1,
    name: "MedPlus Pharmacy",
    address: "123 Main Street, Cityville",
    distance: 0.8,
    rating: 4.7,
    hours: "8:00 AM - 10:00 PM",
    phone: "(555) 123-4567",
    image:
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-4.0.3&auto=format&fit=crop&w=2669&q=80",
  },
  {
    id: 2,
    name: "HealthMart Pharmacy",
    address: "456 Oak Avenue, Townsburg",
    distance: 1.2,
    rating: 4.5,
    hours: "9:00 AM - 9:00 PM",
    phone: "(555) 987-6543",
    image:
      "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixlib=rb-4.0.3&auto=format&fit=crop&w=2670&q=80",
  },
  {
    id: 3,
    name: "QuickRx Pharmacy",
    address: "789 Pine Road, Villageton",
    distance: 2.5,
    rating: 4.2,
    hours: "8:30 AM - 8:30 PM",
    phone: "(555) 456-7890",
    image:
      "https://images.unsplash.com/photo-1563453392212-326f5e854473?ixlib=rb-4.0.3&auto=format&fit=crop&w=2670&q=80",
  },
]

export default function PharmacyLocator() {
  const [searchQuery, setSearchQuery] = useState("")
  const [pharmacies, setPharmacies] = useState(MOCK_PHARMACIES)
  const [selectedPharmacy, setSelectedPharmacy] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const primaryColor = useThemeColor({ light: "#3b82f6", dark: "#60a5fa" }, "tint")
  const subtleColor = useThemeColor({ light: "#64748b", dark: "#94a3b8" }, "text")
  const cardBgColor = useThemeColor({ light: "#ffffff", dark: "#1f2937" }, "background")
  const inputBgColor = useThemeColor({ light: "#f8fafc", dark: "#1e293b" }, "background")

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setPharmacies(MOCK_PHARMACIES)
      return
    }

    setIsLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      const filtered = MOCK_PHARMACIES.filter(
        (pharmacy) =>
          pharmacy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          pharmacy.address.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setPharmacies(filtered)
      setIsLoading(false)
    }, 1000)
  }

  const handlePharmacySelect = (pharmacy) => {
    setSelectedPharmacy(pharmacy)
  }

  const handleBackToList = () => {
    setSelectedPharmacy(null)
  }

  const handleGetDirections = (pharmacy) => {
    // In a real app, this would open maps with directions
    alert(`Getting directions to ${pharmacy.name}`)
  }

  const handleCallPharmacy = (pharmacy) => {
    // In a real app, this would initiate a phone call
    alert(`Calling ${pharmacy.phone}`)
  }

  return (
    <ThemedView style={[styles.container, { backgroundColor: cardBgColor }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <MapPin size={20} color={primaryColor} />
          <ThemedText style={styles.headerTitle}>Pharmacy Locator</ThemedText>
        </View>
      </View>

      {!selectedPharmacy ? (
        <>
          <View style={styles.searchContainer}>
            <View style={[styles.searchInputContainer, { backgroundColor: inputBgColor }]}>
              <Search size={18} color={subtleColor} style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search by name or location"
                placeholderTextColor={subtleColor}
                value={searchQuery}
                onChangeText={setSearchQuery}
                onSubmitEditing={handleSearch}
              />
            </View>
            <TouchableOpacity style={[styles.searchButton, { backgroundColor: primaryColor }]} onPress={handleSearch}>
              <ThemedText style={styles.searchButtonText} lightColor="#ffffff" darkColor="#ffffff">
                Search
              </ThemedText>
            </TouchableOpacity>
          </View>

          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ThemedText style={styles.loadingText} lightColor="#64748b" darkColor="#94a3b8">
                Searching for pharmacies...
              </ThemedText>
            </View>
          ) : pharmacies.length > 0 ? (
            <ScrollView style={styles.pharmacyList} showsVerticalScrollIndicator={false}>
              {pharmacies.map((pharmacy) => (
                <TouchableOpacity
                  key={pharmacy.id}
                  style={styles.pharmacyItem}
                  onPress={() => handlePharmacySelect(pharmacy)}
                >
                  <Image source={{ uri: pharmacy.image }} style={styles.pharmacyImage} />
                  <View style={styles.pharmacyInfo}>
                    <ThemedText style={styles.pharmacyName}>{pharmacy.name}</ThemedText>
                    <View style={styles.pharmacyRating}>
                      <Star size={14} color="#f59e0b" fill="#f59e0b" />
                      <ThemedText style={styles.ratingText}>{pharmacy.rating}</ThemedText>
                    </View>
                    <ThemedText style={styles.pharmacyAddress} lightColor="#64748b" darkColor="#94a3b8">
                      {pharmacy.address}
                    </ThemedText>
                    <View style={styles.pharmacyMeta}>
                      <ThemedText style={styles.pharmacyDistance} lightColor="#64748b" darkColor="#94a3b8">
                        {pharmacy.distance} miles away
                      </ThemedText>
                      <ChevronRight size={16} color={subtleColor} />
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          ) : (
            <View style={styles.emptyContainer}>
              <ThemedText style={styles.emptyText} lightColor="#64748b" darkColor="#94a3b8">
                No pharmacies found matching your search
              </ThemedText>
            </View>
          )}
        </>
      ) : (
        <View style={styles.pharmacyDetailContainer}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackToList}>
            <ThemedText style={[styles.backButtonText, { color: primaryColor }]}>← Back to list</ThemedText>
          </TouchableOpacity>

          <Image source={{ uri: selectedPharmacy.image }} style={styles.detailImage} />

          <View style={styles.detailHeader}>
            <ThemedText style={styles.detailName}>{selectedPharmacy.name}</ThemedText>
            <View style={styles.detailRating}>
              <Star size={16} color="#f59e0b" fill="#f59e0b" />
              <ThemedText style={styles.detailRatingText}>{selectedPharmacy.rating}</ThemedText>
            </View>
          </View>

          <View style={styles.detailInfo}>
            <View style={styles.detailItem}>
              <MapPin size={18} color={subtleColor} style={styles.detailIcon} />
              <ThemedText style={styles.detailText}>{selectedPharmacy.address}</ThemedText>
            </View>
            <View style={styles.detailItem}>
              <Phone size={18} color={subtleColor} style={styles.detailIcon} />
              <ThemedText style={styles.detailText}>{selectedPharmacy.phone}</ThemedText>
            </View>
            <View style={styles.detailItem}>
              <Clock size={18} color={subtleColor} style={styles.detailIcon} />
              <ThemedText style={styles.detailText}>Hours: {selectedPharmacy.hours}</ThemedText>
            </View>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: `${primaryColor}20` }]}
              onPress={() => handleCallPharmacy(selectedPharmacy)}
            >
              <Phone size={20} color={primaryColor} />
              <ThemedText style={[styles.actionButtonText, { color: primaryColor }]}>Call</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: primaryColor }]}
              onPress={() => handleGetDirections(selectedPharmacy)}
            >
              <Navigation size={20} color="#ffffff" />
              <ThemedText style={styles.actionButtonText} lightColor="#ffffff" darkColor="#ffffff">
                Get Directions
              </ThemedText>
            </TouchableOpacity>
          </View>

          <View style={styles.refillSection}>
            <ThemedText style={styles.refillTitle}>Refill Tracking</ThemedText>
            <ThemedText style={styles.refillDescription} lightColor="#64748b" darkColor="#94a3b8">
              You have 2 medications ready for refill at this pharmacy
            </ThemedText>
            <TouchableOpacity
              style={[styles.refillButton, { backgroundColor: primaryColor }]}
              onPress={() => alert("This would initiate a refill request in a real app")}
            >
              <ThemedText style={styles.refillButtonText} lightColor="#ffffff" darkColor="#ffffff">
                Request Refill
              </ThemedText>
            </TouchableOpacity>
          </View>
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
    paddingVertical: 20,
    alignItems: "center",
  },
  loadingText: {
    fontSize: 14,
  },
  pharmacyList: {
    maxHeight: 400,
  },
  pharmacyItem: {
    flexDirection: "row",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
    paddingBottom: 16,
  },
  pharmacyImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  pharmacyInfo: {
    flex: 1,
  },
  pharmacyName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  pharmacyRating: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  ratingText: {
    fontSize: 14,
    marginLeft: 4,
  },
  pharmacyAddress: {
    fontSize: 14,
    marginBottom: 4,
  },
  pharmacyMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pharmacyDistance: {
    fontSize: 13,
  },
  emptyContainer: {
    paddingVertical: 20,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 14,
  },
  pharmacyDetailContainer: {
    paddingTop: 8,
  },
  backButton: {
    marginBottom: 16,
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: "500",
  },
  detailImage: {
    width: "100%",
    height: 150,
    borderRadius: 12,
    marginBottom: 16,
  },
  detailHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  detailName: {
    fontSize: 18,
    fontWeight: "600",
  },
  detailRating: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailRatingText: {
    fontSize: 16,
    marginLeft: 4,
  },
  detailInfo: {
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  detailIcon: {
    marginRight: 8,
  },
  detailText: {
    fontSize: 14,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flex: 1,
    marginHorizontal: 4,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 8,
  },
  refillSection: {
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.05)",
    paddingTop: 16,
  },
  refillTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  refillDescription: {
    fontSize: 14,
    marginBottom: 12,
  },
  refillButton: {
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  refillButtonText: {
    fontSize: 14,
    fontWeight: "500",
  },
})
