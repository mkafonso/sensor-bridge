import { NavigationContainer } from "@react-navigation/native";
import { View } from "react-native";
import { theme } from "../theme";
import { MainNavigation } from "./main-navigation";

export function Navigation() {
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors["main-900"] }}>
      <NavigationContainer>
        <MainNavigation />
      </NavigationContainer>
    </View>
  );
}
