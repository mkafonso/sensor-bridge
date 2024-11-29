import { StyleSheet, Text, View } from "react-native";
import { Avatar } from "../components";
import { theme } from "../theme";

export function ProfileAccount() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Avatar />
        <Text style={styles.name}>Olá, visitante</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors["main-900"],
    paddingHorizontal: 16,
  },
  header: {
    alignItems: "center",
    gap: 16,
    marginVertical: 24,
  },
  name: {
    color: theme.colors["main-100"],
    fontFamily: theme.fontFamily.medium,
    fontSize: theme.fontSize["text-lg"],
  },
});
