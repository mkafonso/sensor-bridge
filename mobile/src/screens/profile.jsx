import { StyleSheet, Text, View } from "react-native";
import { Avatar, NavigationButton } from "../components";
import { theme } from "../theme";

export function Profile(props) {
  const { navigation } = props;

  const handleNavigation = (destination) => {
    navigation.navigate("profileAccount");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Avatar />
        <Text style={styles.name}>Olá, visitante</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Dados pessoais</Text>
        <NavigationButton
          title="Minha conta"
          icon="user"
          onPress={() => handleNavigation("profileAccount")}
        />
        <NavigationButton
          title="Meus contatos de emergência"
          icon="alert-triangle"
          onPress={() => handleNavigation("PersonalData")}
        />
        <NavigationButton
          title="Informações do veículo"
          icon="list"
          onPress={() => handleNavigation("PersonalData")}
          last
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Preferências</Text>
        <NavigationButton
          title="Excluir meus dados"
          icon="power"
          onPress={() => handleNavigation("PersonalData")}
          danger
        />
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
  section: {
    marginVertical: 32,
  },
  title: {
    color: theme.colors["main-500"],
    fontFamily: theme.fontFamily.medium,
    fontSize: theme.fontSize["text-xs"],
    textTransform: "uppercase",
    marginBottom: 12,
  },
});
