import { NavigationContainer } from "@react-navigation/native";
import { BottomTabNavigator } from "./bottom-tab-navigator";

export function Navigation() {
  return (
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>
  );
}
