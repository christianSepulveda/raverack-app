import { View, Text } from "react-native";
import FormInput from "../../../components/FormInput";
import React from "react";
import RaveRackButton from "../../../components/RaveRackButton";

type Props = {
  onCancel: () => void;
  numberOfTables: string;
  tablesCapacity: string;
  setNumberOfTables: (value: string) => void;
  setTablesCapacity: (value: string) => void;
  onCreateTables: () => void;
};

const CreateTablesScreen = (props: Props) => {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FormInput
        label="N° de Mesas"
        value={props.numberOfTables}
        setValue={props.setNumberOfTables}
        keyboardType="number-pad"
      />
      <View style={{ marginVertical: 10 }} />

      <FormInput
        label="Capacidad"
        value={props.tablesCapacity}
        setValue={props.setTablesCapacity}
        keyboardType="number-pad"
      />
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
