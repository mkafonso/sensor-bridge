import Feather from "@expo/vector-icons/Feather";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../theme";

export const NavigationButton = (props) => {
  const { title, onPress, icon, last = false, danger = false } = props;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.btn,
          last && {
            paddingBottom: 0,
          },
        ]}
      >
        <Feather
          name={icon}
          size={20}
          color={danger ? theme.colors["danger-600"] : theme.colors["main-200"]}
        />

        <Text
          style={{
            color: danger
              ? theme.colors["danger-600"]
              : theme.colors["main-200"],
            fontSize: 14,
          }}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  btn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 12,
  },
});
