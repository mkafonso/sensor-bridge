import Feather from "@expo/vector-icons/Feather";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform, TouchableOpacity } from "react-native";
import { FuelQuality, Profile, Temperature, VehicleWeight } from "../screens";
import { theme } from "../theme";

const { Navigator, Screen } = createBottomTabNavigator();

export function MainNavigation() {
  const isAndroid = Platform.OS === "android";

  return (
    <Navigator
      screenOptions={() => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.colors["secondary-600"],
        tabBarInactiveTintColor: theme.colors["main-600"],
        tabBarStyle: {
          backgroundColor: theme.colors["main-900"],
          borderTopWidth: 1,
          paddingTop: isAndroid ? 0 : 16,
          borderTopColor: theme.colors["main-800"],
          marginBottom: 0,
          borderTopRightRadius: 16,
          borderTopLeftRadius: 16,
          height: 72,
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
        },
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarIconStyle: {
          justifyContent: "center",
          alignItems: "center",
        },
      })}
    >
      <Screen
        name="fuelQuality"
        component={FuelQuality}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="award" size={24} color={color} />
          ),
        }}
      />

      <Screen
        name="temperature"
        component={Temperature}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="sun" size={24} color={color} />
          ),
        }}
      />

      <Screen
        name="panic"
        component={FuelQuality}
        options={{
          tabBarIcon: ({ color }) => (
            <TouchableOpacity
              activeOpacity={0.6}
              delayLongPress={3000}
              style={{
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: theme.colors["secondary-700"],
                borderRadius: 36,
                marginBottom: 40,
                padding: 10,
                width: 68,
                height: 68,
              }}
            >
              <Feather
                name="target"
                size={32}
                color={theme.colors["main-200"]}
              />
            </TouchableOpacity>
          ),
        }}
      />

      <Screen
        name="vehicleWeight"
        component={VehicleWeight}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="package" size={24} color={color} />
          ),
        }}
      />

      <Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="user" size={24} color={color} />
          ),
        }}
      />
    </Navigator>
  );
}
