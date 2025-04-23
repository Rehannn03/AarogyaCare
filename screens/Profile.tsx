import { StyleSheet, View, TouchableOpacity, Image, ScrollView, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Settings, ChevronRight, Bell, Shield, HelpCircle, LogOut } from "lucide-react-native"
import ThemedView from "../components/ThemedView"
import ThemedText from "../components/ThemedText"
import useThemeColor from "../hooks/useThemeColor"
import { userName, userEmail } from "../config/constants"

export default function ProfileScreen({ navigation }) {
  const primaryColor = useThemeColor({ light: "#3b82f6", dark: "#60a5fa" }, "tint")
  const subtleColor = useThemeColor({ light: "#64748b", dark: "#94a3b8" }, "text")
  const cardBgColor = useThemeColor({ light: "#ffffff", dark: "#1f2937" }, "background")

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: () => {
          // In a real app, this would clear auth state
          Alert.alert("Logged Out", "You have been logged out successfully.")
        },
      },
    ])
  }

  const MenuItem = ({ icon, title, subtitle, onPress }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={[styles.menuIconContainer, { backgroundColor: `${primaryColor}15` }]}>{icon}</View>
      <View style={styles.menuContent}>
        <ThemedText style={styles.menuTitle}>{title}</ThemedText>
        {subtitle && (
          <ThemedText style={styles.menuSubtitle} lightColor="#64748b" darkColor="#94a3b8">
            {subtitle}
          </ThemedText>
        )}
      </View>
      <ChevronRight size={20} color={subtleColor} />
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ThemedView style={styles.header}>
        <ThemedText style={styles.title}>Profile</ThemedText>
        <TouchableOpacity style={[styles.settingsButton, { backgroundColor: `${primaryColor}20` }]}>
          <Settings size={20} color={primaryColor} />
        </TouchableOpacity>
      </ThemedView>

      <ScrollView showsVerticalScrollIndicator={false}>
        <ThemedView style={styles.profileSection}>
          <Image source={{ uri: "https://randomuser.me/api/portraits/women/44.jpg" }} style={styles.profileImage} />
          <View style={styles.profileInfo}>
            <ThemedText style={styles.profileName}>{userName}</ThemedText>
            <ThemedText style={styles.profileEmail} lightColor="#64748b" darkColor="#94a3b8">
              {userEmail}
            </ThemedText>
          </View>
          <TouchableOpacity style={[styles.editButton, { borderColor: primaryColor }]}>
            <ThemedText style={[styles.editButtonText, { color: primaryColor }]}>Edit</ThemedText>
          </TouchableOpacity>
        </ThemedView>

        <ThemedView style={styles.menuSection}>
          <ThemedText style={styles.menuSectionTitle} lightColor="#64748b" darkColor="#94a3b8">
            ACCOUNT
          </ThemedText>

          <ThemedView style={[styles.menuCard, { backgroundColor: cardBgColor }]}>
            <MenuItem
              icon={<Bell size={20} color={primaryColor} />}
              title="Notifications"
              subtitle="Configure your alerts"
              onPress={() => {}}
            />
            <View style={styles.menuDivider} />
            <MenuItem
              icon={<Shield size={20} color={primaryColor} />}
              title="Privacy & Security"
              subtitle="Manage your data and permissions"
              onPress={() => {}}
            />
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.menuSection}>
          <ThemedText style={styles.menuSectionTitle} lightColor="#64748b" darkColor="#94a3b8">
            SUPPORT
          </ThemedText>

          <ThemedView style={[styles.menuCard, { backgroundColor: cardBgColor }]}>
            <MenuItem
              icon={<HelpCircle size={20} color={primaryColor} />}
              title="Help & Support"
              subtitle="Get assistance and FAQs"
              onPress={() => {}}
            />
          </ThemedView>
        </ThemedView>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={20} color="#ef4444" />
          <ThemedText style={styles.logoutText} lightColor="#ef4444" darkColor="#f87171">
            Log Out
          </ThemedText>
        </TouchableOpacity>

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
  title: {
    fontSize: 28,
    fontWeight: "700",
  },
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
  },
  editButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: "500",
  },
  menuSection: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  menuSectionTitle: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  menuCard: {
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 13,
  },
  menuDivider: {
    height: 1,
    marginHorizontal: 16,
    backgroundColor: "rgba(0,0,0,0.05)",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    paddingVertical: 12,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 8,
  },
  bottomPadding: {
    height: 100,
  },
})
