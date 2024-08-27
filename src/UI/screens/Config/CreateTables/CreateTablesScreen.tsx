import { View, Text } from "react-native";
import FormInput from "../../../components/FormInput";
import React from "react";
import RaveRackButton from "../../../components/RaveRackButton";
import COLORS from "../../../styles/colors";

type Props = {
  onCancel: () => void;
  numberOfTable: string;
  tablesCapacity: string;
  setNumberOfTable: (value: string) => void;
  setTablesCapacity: (value: string) => void;
  onCreateTables: () => void;
  error: string;
};

const CreateTablesScreen = (props: Props) => {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontWeight: "500", fontSize: 16 }}>Número de Mesa</Text>
      <FormInput
        label="N° de Mesa"
        value={props.numberOfTable}
        setValue={props.setNumberOfTable}
        keyboardType="number-pad"
      />
      <View style={{ marginVertical: 10 }} />

      <Text style={{ fontWeight: "500", fontSize: 16 }}>
        Capacidad de la Mesa
      </Text>
      <FormInput
        label="Capacidad"
        value={props.tablesCapacity}
        setValue={props.setTablesCapacity}
        keyboardType="number-pad"
      />
      <View style={{ marginVertical: 10 }} />

      {props.error !== "" && (
        <Text style={{ color: COLORS.red, fontSize: 16, fontWeight: "700" }}>
          {props.error}
        </Text>
      )}

      <View style={{ marginVertical: 10 }} />

      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 6, marginStart: 5 }}>
          <RaveRackButton
            label="Agregar"
            onPress={props.onCreateTables}
            loading={false}
            mode="dark"
          />
        </View>

        <View style={{ flex: 6, marginStart: 5 }}>
          <RaveRackButton
            label="Cancelar"
            onPress={props.onCancel}
            loading={false}
            mode="dark"
          />
        </View>
      </View>
    </View>
  );
};

export default CreateTablesScreen;
