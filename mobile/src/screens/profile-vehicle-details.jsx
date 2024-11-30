import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useVehicleStore } from "../store/vehicle";
import { theme } from "../theme";

export function ProfileVehicleDetails() {
  const insets = useSafeAreaInsets();
  const setVehicle = useVehicleStore((s) => s.setVehicle);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");

  const handleSave = async () => {
    if (brand.trim() && model.trim() && year.trim()) {
      await setVehicle(brand, model, year);
      Alert.alert("Sucesso", "Configurações salvas com sucesso!");
    } else {
      Alert.alert("Erro", "Preencha todos os campos antes de salvar.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>Informações do veículo</Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ ...styles.container, paddingTop: insets.top }}
      >
        <View>
          <Text style={styles.label}>Marca</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor={theme.colors["main-400"]}
            autoCorrect={false}
            value={brand}
            onChangeText={setBrand}
            placeholder="Marca do veículo"
            autoComplete="off"
            keyboardType="default"
          />

          <Text style={styles.label}>Modelo</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor={theme.colors["main-400"]}
            autoCorrect={false}
            value={model}
            onChangeText={setModel}
            placeholder="Modelo do veículo"
            autoComplete="off"
            keyboardType="default"
          />

          <Text style={styles.label}>Ano</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor={theme.colors["main-400"]}
            autoCorrect={false}
            value={year}
            onChangeText={setYear}
            placeholder="Ano do veículo"
            autoComplete="off"
            keyboardType="default"
          />

          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Salvar Configurações</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
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
  label: {
    fontFamily: theme.fontFamily["medium"],
    color: theme.colors["main-400"],
    fontSize: theme.fontSize["text-xs"],
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors["main-600"],
    color: theme.colors["main-200"],
    borderRadius: 5,
    marginBottom: 15,
    height: 44,
    padding: 12,
  },
  textArea: {
    borderWidth: 1,
    color: theme.colors["main-200"],
    fontSize: theme.fontSize["text-xs"],
    borderColor: theme.colors["main-600"],
    borderRadius: 5,
    padding: 12,
    textAlignVertical: "top",
    marginBottom: 15,
    height: 110,
  },
  button: {
    backgroundColor: theme.colors["secondary-600"],
    height: 44,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: theme.colors["main-200"],
    fontFamily: theme.fontFamily.medium,
  },
});
