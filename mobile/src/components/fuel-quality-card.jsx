import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "../theme";

export function FuelQualityCard({ type, value }) {
  const { cardStyle, label, valueStyle, contentStyle } = getCardStyles(
    type,
    value
  );

  return (
    <View style={[styles.container, cardStyle]}>
      <View style={contentStyle}>
        <Text style={styles.label}>{label}</Text>
        <Text style={valueStyle}>{value}</Text>
      </View>
    </View>
  );
}

function getCardStyles(type, value) {
  switch (type) {
    case "quality":
      const qualityStyles = getQualityStyles(value);
      return {
        cardStyle: qualityStyles,
        label: "Qualidade do combustível",
        valueStyle: styles.qualityValue,
        contentStyle: styles.defaultContent,
      };
    case "brand":
      return {
        cardStyle: styles.defaultCard,
        label: "Marca do veículo",
        valueStyle: styles.defaultValue,
        contentStyle: styles.bottomContent,
      };
    case "model":
      return {
        cardStyle: styles.defaultCard,
        label: "Modelo do veículo",
        valueStyle: styles.defaultValue,
        contentStyle: styles.defaultContent,
      };
    case "year":
      return {
        cardStyle: styles.defaultCard,
        label: "Ano do veículo",
        valueStyle: styles.defaultValue,
        contentStyle: styles.bottomContent,
      };
    default:
      return {
        cardStyle: styles.defaultCard,
        label: "Desconhecido",
        valueStyle: styles.defaultValue,
        contentStyle: styles.defaultContent,
      };
  }
}

function getQualityStyles(value) {
  const numericValue = parseFloat(value);

  if (numericValue > 70) {
    return {
      backgroundColor: "#16a34a",
    };
  } else if (numericValue >= 50 && numericValue <= 69) {
    return {
      backgroundColor: "#eab308",
    };
  } else if (numericValue < 50) {
    return {
      backgroundColor: theme.colors["danger-600"],
    };
  } else {
    return {
      backgroundColor: theme.colors["main-900"],
    };
  }
}

const styles = StyleSheet.create({
  container: {
    width: "48%",
    height: "44%",
    padding: 8,
    borderRadius: 16,
    borderWidth: 2,
    backgroundColor: theme.colors["main-900"],
    borderColor: theme.colors["secondary-900"],
  },
  defaultCard: {
    backgroundColor: theme.colors["main-800"],
    borderColor: theme.colors["main-700"],
  },
  label: {
    fontSize: theme.fontSize["text-sm"],
    fontFamily: theme.fontFamily.medium,
    color: theme.colors["main-200"],
    marginBottom: 8,
  },
  qualityValue: {
    fontSize: theme.fontSize["text-xl"],
    fontFamily: theme.fontFamily.medium,
    color: theme.colors["text-dark"],
  },
  defaultValue: {
    fontSize: theme.fontSize["text-xl"],
    fontFamily: theme.fontFamily.regular,
    color: theme.colors["secondary-600"],
  },
  defaultContent: {
    justifyContent: "flex-start",
    flex: 1,
  },
  bottomContent: {
    justifyContent: "flex-end",
    flex: 1,
  },
});
