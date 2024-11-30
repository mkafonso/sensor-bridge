import { Alert } from "react-native";
import { removeSpecialCharacters } from "../utils/format-phone-number";

export async function sendPanicMessage(props) {
  const { name, phone, message } = props;

  if (!name || !phone || !message) {
    Alert.alert("Erro", "Precisa cadastrar contato de emergência");
  }

  try {
    const response = await fetch("http://localhost:3003/api/send-message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: `55${removeSpecialCharacters(phone)}`,
        message: generatePanicMessage(name, message),
      }),
    });

    const data = await response.json();
    if (data.success) {
      Alert.alert("Success", `Alerta enviado para ${name}`);
    } else {
      Alert.alert("Error", `Falha no envio do alerta enviada para ${name}`);
    }
  } catch (error) {
    console.log("an unexpected error occurred.");
  }
}

const generatePanicMessage = (props) => {
  const { emergencyContactName, emergencyContactMessage } = props;

  return `🚨 *ALERTA URGENTE para ${emergencyContactName}* 🚨

📍 *Detalhes:*

${emergencyContactMessage}
`;
};
