import Feather from "@expo/vector-icons/Feather";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "../theme";

export function TemperatureStatus(props) {
  const { temperature, presence } = props;
  const isTooHot = temperature > 37;
  const isIdeal = temperature >= 18 && temperature <= 38;

  const status = isTooHot
    ? {
        icon: "alert-triangle",
        text: `Recomendamos abrir as janelas ou ligar o ar condicionado. ${
          presence != "false" ? "Detectei movimento dentro do veículo" : ""
        }`,
        color: theme.colors["danger-600"],
      }
    : isIdeal
    ? {
        icon: "check-circle",
        text: `Temperatura ideal! Aproveite o clima agradável. ${
          presence != "false" ? "Detectei movimento dentro do veículo" : ""
        }`,
        color: theme.colors["secondary-600"],
      }
    : {
        icon: "info",
        text: `Está frio, mantenha-se aquecido. ${
          presence != "false" ? "Detectei movimento dentro do veículo" : ""
        }`,
        color: theme.colors["main-600"],
      };

  return (
    <View
      style={{
        borderWidth: 1,
        borderStyle: "dashed",
        borderColor: status.color,
        height: "50%",
        marginBottom: "auto",
        borderRadius: 4,
        padding: 8,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Feather name={status.icon} size={24} color={status.color} />
      <Text
        style={[
          styles.title,
          {
            color: status.color,
            fontSize: theme.fontSize["text-sm"],
            marginTop: 16,
            textAlign: "center",
          },
        ]}
      >
        {status.text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: theme.colors["secondary-600"],
    fontSize: theme.fontSize["text-base"],
  },
});
