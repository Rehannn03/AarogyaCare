import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { StatusBar } from "expo-status-bar"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { Home, Pill, User, Calendar, Layers } from "lucide-react-native"
import useColorScheme  from "./hooks/useColorScheme"
import Colors from "./constants/Colors"

// Import screens
import HomeScreen from "./screens/Home"
import MedicationsScreen from "./screens/Medications"
import ReportsScreen from "./screens/Reports"
import ProfileScreen from "./screens/Profile"
import ReportDetailsScreen from "./screens/ReportDetails"
import AddMedicationScreen from "./screens/AddMedication"
import FeaturesScreen from "./screens/Features"

// Create navigators
const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

// Main tab navigator
function TabNavigator() {
  const colorScheme = useColorScheme()

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarInactiveTintColor: Colors[colorScheme].tabIconDefault,
        tabBarStyle: {
          position: "absolute",
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          height: 85,
          paddingBottom: 20,
          backgroundColor: colorScheme === "dark" ? "#0f172a" : "#ffffff",
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Medications"
        component={MedicationsScreen}
        options={{
          tabBarIcon: ({ color }) => <Pill size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={ReportsScreen}
        options={{
          tabBarIcon: ({ color }) => <Calendar size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Features"
        component={FeaturesScreen}
        options={{
          tabBarIcon: ({ color }) => <Layers size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => <User size={24} color={color} />,
        }}
      />
    </Tab.Navigator>
  )
}

// Root navigator
export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Main" component={TabNavigator} />
          <Stack.Screen
            name="ReportDetails"
            component={ReportDetailsScreen}
            options={{
              presentation: "card",
              animation: "slide_from_right",
            }}
          />
          <Stack.Screen
            name="AddMedication"
            component={AddMedicationScreen}
            options={{
              presentation: "modal",
              animation: "slide_from_bottom",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  )
}
