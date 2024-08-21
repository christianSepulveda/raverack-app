import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
} from "react-native";
import React from "react";
import { BoxNumber } from "../../../domain/entities/BoxNumber";
import COLORS from "../../styles/colors";
import FormInput from "../../components/FormInput";
import { Customer } from "../../../domain/entities/Customer";
import RaveRackButton from "../../components/RaveRackButton";
import { Error } from "../../../domain/entities/Error";

type Props = {
  boxNumber: BoxNumber;
  customer: Customer;
  setCustomer: (customer: Customer) => void;
  onCancel: () => void;
  updateBox: () => void;
  error: Error;
};

const BoxNumberDetailsScreen = (props: Props) => {
  const customer = props.customer;

  const handleUpdateBox = () => {
    Alert.alert(
      "Atención",
      `Desea ${
        props.boxNumber.available ? "asignar" : "liberar"
      } este espacio?`,
      [
        {
          isPreferred: true,
          text: props.boxNumber.available ? "Asignar" : "Liberar",
          onPress: props.updateBox,
        },
        { text: "Cancelar" },
      ]
    );
  };

  const handleSetRut = (text: string) => {
    const rut = text.replace(/[^0-9kK]/g, "").toUpperCase();
    props.setCustomer({ ...customer, rut });
  };

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
        <View style={{ flexDirection: "row" }}>
          <FormInput
            label="Número"
            value={
              props.boxNumber.boxnumber
                ? props.boxNumber.boxnumber.toString()
                : ""
            }
            active={false}
            flex={4}
          />

          <View style={{ marginHorizontal: 10 }} />

          <FormInput
            label="Estado"
            value={props.boxNumber.available ? "Disponible" : "Ocupado"}
            active={false}
            flex={8}
          />
        </View>

        <View style={{ flexDirection: "row", marginTop: 20 }}>
          <FormInput
            label="Nombre"
            value={customer.fullname ?? ""}
            active={props.boxNumber.available ? true : false}
            setValue={(text) =>
              props.setCustomer({
                ...customer,
                fullname: text.replace(/[^a-zA-Z ]/g, "").toUpperCase(),
              })
            }
            flex={6}
          />
        </View>

        <View style={{ flexDirection: "row", marginTop: 20 }}>
          <FormInput
            label="RUT"
            value={customer.rut ?? ""}
            active={props.boxNumber.available ? true : false}
            setValue={(text) => handleSetRut(text)}
            flex={6}
          />
        </View>

        {props.error.error && (
          <Text style={{ color: COLORS.red, marginTop: 10, fontWeight: "600" }}>
            {props.error.message}
          </Text>
        )}

        <View style={{ flexDirection: "row", marginTop: 40 }}>
          <View style={{ flex: 6, marginEnd: 5 }}>
            <RaveRackButton
              label={props.boxNumber.available ? "Asignar" : "Liberar"}
              onPress={() => handleUpdateBox()}
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
      </KeyboardAvoidingView>
    </View>
  );
};

export default BoxNumberDetailsScreen;
