import { Alert } from "react-native";
import { removeSpecialCharacters } from "../utils/format-phone-number";

export async function sendPanicMessage() {
  const {
    emergencyContactName,
    emergencyContactPhone,
    emergencyContactMessage,
    currentUsername,
  } = [];

  try {
    const response = await fetch("http://localhost:3001/send-message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: `55${removeSpecialCharacters(emergencyContactPhone)}`,
        message: generatePanicMessage(
          emergencyContactName,
          currentUsername,
          emergencyContactMessage
        ),
      }),
    });

    const data = await response.json();
    if (data.success) {
      Alert.alert("Success", `Alerta enviado para ${emergencyContactName}`);
    } else {
      Alert.alert(
        "Error",
        `Falha no envio do alerta enviada para ${emergencyContactName}`
      );
    }
  } catch (error) {
    console.log("an unexpected error occurred.");
  }
}

const generatePanicMessage = (props) => {
  const { emergencyContactName, emergencyContactMessage, currentUsername } =
    props;

  return `🚨 *ALERTA URGENTE de ${currentUsername} para ${emergencyContactName}* 🚨

📍 *Detalhes:*

${emergencyContactMessage}
`;
};
