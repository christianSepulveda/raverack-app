import { View, Text, KeyboardAvoidingView, Platform } from "react-native";
import React from "react";
import { BoxNumber } from "../../../domain/entities/BoxNumber";
import COLORS from "../../styles/colors";

type Props = {
  boxNumber: BoxNumber;
};

const BoxNumberDetailsScreen = (props: Props) => {
  const DescriptionLabels = ({
    label,
    value,
  }: {
    label: string;
    value: string;
  }) => (
    <Text>
      {label} : <Text>{value}</Text>
    </Text>
  );

  return (
    <View
      style={{
        flex: 1,
        padding: "5%",
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <DescriptionLabels
          label="Número de Casilla"
          value={props.boxNumber.boxnumber.toString()}
        />

        <DescriptionLabels
          label="Estado"
          value={props.boxNumber.available ? "Disponible" : "Ocupado"}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default BoxNumberDetailsScreen;
