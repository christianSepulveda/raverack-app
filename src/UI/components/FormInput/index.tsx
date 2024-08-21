import { View, Text, TextInput, KeyboardTypeOptions } from "react-native";
import React from "react";
import COLORS from "../../styles/colors";

type Props = {
  label: string;
  value: string;
  setValue?: (value: string) => void;
  active?: boolean;
  flex?: number;
  keyboardType?: KeyboardTypeOptions;
};

const index = (props: Props) => {
  return (
    <View
      style={{
        flex: props.flex,
        backgroundColor: COLORS.white,
        borderRadius: 5,
      }}
    >
      <TextInput
        style={{
          fontSize: 20,
          margin: 16,
          fontWeight: "600",
          color:
            props.value === "Disponible"
              ? COLORS.green
              : props.value === "Ocupado"
              ? COLORS.red
              : "#000",
        }}
        value={props.value}
        onChangeText={props.setValue}
        editable={props.active}
        placeholder={props.label}
        keyboardType={props.keyboardType ?? "default"}
      />
    </View>
  );
};

export default index;
