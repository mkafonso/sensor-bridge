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
import { theme } from "../theme";
import { useUserStore } from "../store/account";
import { useState } from "react";

export function ProfileAccount() {
  const insets = useSafeAreaInsets();
  const setUser = useUserStore((s) => s.setUser);
  const [name, setName] = useState("");

  const handleSave = async () => {
    if (name.trim()) {
      await setUser(name, "");
      Alert.alert("Sucesso", "Configurações salvas com sucesso!");
    } else {
      Alert.alert("Erro", "Preencha todos os campos antes de salvar.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>Minha conta</Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ ...styles.container, paddingTop: insets.top }}
      >
        <ScrollView>
          <Text style={styles.label}>Seu nome</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor={theme.colors["main-400"]}
            autoCorrect={false}
            value={name}
            onChangeText={setName}
            placeholder="Digite seu nome"
            autoComplete="off"
            keyboardType="default"
          />

          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Salvar Configurações</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
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
  label: {
    fontFamily: theme.fontFamily["medium"],
    color: theme.colors["main-400"],
    fontSize: theme.fontSize["text-xs"],
    marginVertical: 12,
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
