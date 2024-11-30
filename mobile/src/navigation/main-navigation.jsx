import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Platform, StyleSheet, TouchableOpacity } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import Feather from "react-native-vector-icons/Feather";
import { BackgroundSvg } from "../components/background-svg";
import {
  FuelQuality,
  Profile,
  ProfileAccount,
  ProfileEmergencyDetails,
  ProfileVehicleDetails,
  Temperature,
  VehicleWeight,
} from "../screens";
import { sendPanicMessage } from "../services/whatsapp";
import { useEmergencyContactStore } from "../store/emergency-contact";
import { useTemperature } from "../store/temperatura";
import { theme } from "../theme";

const { Navigator, Screen } = createBottomTabNavigator();

export function MainNavigation() {
  const insideTemperature = useTemperature((s) => s.insideTemperature);
  const emergency = useEmergencyContactStore((s) => s.emergencyContact);

  const isAndroid = Platform.OS === "android";

  const translateX = useSharedValue(0);

  const backgroundStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(translateX.value, {
            damping: 20,
            stiffness: 100,
          }),
        },
      ],
    };
  });

  // const setBackgroundPosition = (index) => {
  //   const width = 360;
  //   let position;

  //   if (index >= 5) {
  //     position = 500;
  //   } else {
  //     position =
  //       index === 0
  //         ? -width / 2
  //         : index === 4
  //         ? width / 2
  //         : (index - 2) * (width / 10);
  //   }

  //   translateX.value = position;
  // };

  const setBackgroundPosition = (index) => {
    const width = 360;
    let position;

    if (index >= 5) {
      position = 500;
    } else {
      position = index === 0 ? -width / 2 : index === 4 ? width / 2 : 0;
    }

    translateX.value = position;
  };

  return (
    <React.Fragment>
      <Animated.View
        style={[
          {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
            width: "100%",
            height: "100%",
          },
          backgroundStyle,
        ]}
      >
        <BackgroundSvg
          style={StyleSheet.absoluteFillObject}
          temperature={insideTemperature}
        />
      </Animated.View>

      <Navigator
        initialRouteName="profileAccount"
        screenOptions={() => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: theme.colors["secondary-600"],
          tabBarInactiveTintColor: theme.colors["main-600"],
          tabBarStyle: {
            backgroundColor: theme.colors["main-900"],
            borderTopWidth: 0.5,
            paddingTop: isAndroid ? 8 : 16,
            borderColor: theme.colors["main-700"],
            height: isAndroid ? 64 : 72,
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 10,
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
          name="temperature"
          component={Temperature}
          options={{
            tabBarIcon: ({ color }) => (
              <Feather name="sun" size={24} color={color} />
            ),
          }}
          listeners={({ navigation }) => ({
            focus: () => setBackgroundPosition(0),
          })}
        />

        <Screen
          name="fuelQuality"
          component={FuelQuality}
          options={{
            tabBarIcon: ({ color }) => (
              <Feather name="award" size={24} color={color} />
            ),
          }}
          listeners={({ navigation }) => ({
            focus: () => setBackgroundPosition(1),
          })}
        />

        <Screen
          name="panic"
          component={FuelQuality}
          options={{
            tabBarIcon: ({ color }) => (
              <TouchableOpacity
                activeOpacity={0.6}
                delayLongPress={1000}
                onLongPress={async () => await sendPanicMessage(emergency)}
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
          listeners={({ navigation }) => ({
            focus: () => setBackgroundPosition(2),
          })}
        />

        <Screen
          name="vehicleWeight"
          component={VehicleWeight}
          options={{
            tabBarIcon: ({ color }) => (
              <Feather name="package" size={24} color={color} />
            ),
          }}
          listeners={({ navigation }) => ({
            focus: () => setBackgroundPosition(3),
          })}
        />

        <Screen
          name="profile"
          component={Profile}
          options={{
            tabBarIcon: ({ color }) => (
              <Feather name="user" size={24} color={color} />
            ),
          }}
          listeners={({ navigation }) => ({
            focus: () => setBackgroundPosition(4),
          })}
        />

        <Screen
          name="profileAccount"
          component={ProfileAccount}
          options={{
            tabBarIconStyle: {
              display: "none",
              width: 0,
              padding: 0,
              margin: 0,
            },
            tabBarButton: () => null,
            tabBarVisible: false,
          }}
          listeners={({ navigation }) => ({
            focus: () => setBackgroundPosition(5),
          })}
        />

        <Screen
          name="profileEmergencyDetails"
          component={ProfileEmergencyDetails}
          options={{
            tabBarIconStyle: {
              display: "none",
              width: 0,
              padding: 0,
              margin: 0,
            },
            tabBarButton: () => null,
            tabBarVisible: false,
          }}
          listeners={({ navigation }) => ({
            focus: () => setBackgroundPosition(6),
          })}
        />

        <Screen
          name="profileVehicleDetails"
          component={ProfileVehicleDetails}
          options={{
            tabBarIconStyle: {
              display: "none",
              width: 0,
              padding: 0,
              margin: 0,
            },
            tabBarButton: () => null,
            tabBarVisible: false,
          }}
          listeners={({ navigation }) => ({
            focus: () => setBackgroundPosition(7),
          })}
        />
      </Navigator>
    </React.Fragment>
  );
}
