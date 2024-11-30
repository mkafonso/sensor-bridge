import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Alert, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useUserStore } from "../store/account";
import { theme } from "../theme";

export function Avatar() {
  const avatarUri = useUserStore((s) => s.avatarUri);
  const setUser = useUserStore((s) => s.setUser);

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("Permissão Negada", "Precisamos de acesso às suas fotos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets?.length) {
      const uri = result.assets[0].uri;
      setUser("", uri);
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={pickImage}>
      <Image
        source={
          avatarUri ? { uri: avatarUri } : require("../assets/avatar.png")
        }
        style={styles.image}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: theme.colors["main-500"],
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "100%",
    width: "100%",
    borderRadius: 50,
    objectFit: "contain",
    borderWidth: 1,
    borderColor: theme.colors["secondary-600"],
  },
});
