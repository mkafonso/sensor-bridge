import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import { StyleSheet, Text, View } from "react-native";
import { Loading } from "./src/components";

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
  });

  if (fontsLoaded) {
    return <Loading />;
  }

  return (
    <View styles={styles.container}>
      <Text>Hello, world</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 500,
    backgroundColor: "red",
  },
});
