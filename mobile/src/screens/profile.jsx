import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Avatar, NavigationButton } from "../components";
import { useUserStore } from "../store/account";
import { useEmergencyContactStore } from "../store/emergency-contact";
import { useVehicleStore } from "../store/vehicle";
import { theme } from "../theme";
import BottomSheet from "@gorhom/bottom-sheet";
import { useMemo } from "react";
import { ProfileAccount } from "./profile-account";

export function Profile(props) {
  const { navigation } = props;
  const name = useUserStore((s) => s.name);
  const snapPoints = useMemo(() => ["25%", "50%"], []);
  const bottomSheetRef = useRef(null);

  const confirmAndClearUserData = () => {
    Alert.alert(
      "Confirmação",
      "Você tem certeza que deseja excluir todos os seus dados? Esta ação não pode ser desfeita.",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              await AsyncStorage.clear();

              // Reset all Zustand stores
              useUserStore.getState().resetUser();
              useEmergencyContactStore.getState().resetEmergencyContact();
              useVehicleStore.getState().resetVehicle();

              Alert.alert("Sucesso", "Todos os seus dados foram excluídos.");
              navigation.reset({ index: 0, routes: [{ name: "temperature" }] });
            } catch (error) {
              Alert.alert("Erro", "Não foi possível excluir seus dados.");
              console.error("Error clearing AsyncStorage:", error);
            }
          },
        },
      ]
    );
  };

  const handleNavigation = (destination) => {
    navigation.navigate(destination);
  };

  const handleOpenBottomSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Avatar />
        <Text style={styles.name}>{name || "Olá, visitante"}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Dados pessoais</Text>
        <NavigationButton
          title="Minha conta"
          icon="user"
          onPress={handleOpenBottomSheet}
        />
        <NavigationButton
          title="Meus contatos de emergência"
          icon="alert-triangle"
          onPress={() => handleNavigation("profileEmergencyDetails")}
        />
        <NavigationButton
          title="Informações do veículo"
          icon="list"
          onPress={() => handleNavigation("profileVehicleDetails")}
          last
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Preferências</Text>
        <NavigationButton
          title="Excluir meus dados"
          icon="power"
          onPress={confirmAndClearUserData}
          danger
        />
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        backgroundStyle={styles.bottomSheetBackground}
      >
        <ProfileAccount />
      </BottomSheet>
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
