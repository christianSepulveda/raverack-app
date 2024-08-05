import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import React from "react";
import COLORS from "../../styles/colors";
import { StatusBar } from "expo-status-bar";
import Ionicons from "react-native-vector-icons/Ionicons";

import RaveRackInput from "../../components/RaveRackInput";
import RaveRackButton from "../../components/RaveRackButton";

type Props = {
  serverIP: string;
  setServerIP: (text: string) => void;
  onArrowbackPress: () => void;
  onSaveIP: () => void;
};

const ServerScreen = (props: Props) => {
  const ReturnButton = () => (
    <TouchableOpacity
      style={{ position: "absolute", top: "5%", left: 5 }}
      onPress={props.onArrowbackPress}
    >
      <Ionicons name="arrow-back" size={30} color={COLORS.white} />
    </TouchableOpacity>
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.purple,
        padding: "5%",
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <ReturnButton />

        <StatusBar translucent style="light" backgroundColor="transparent" />
        <Text style={{ color: COLORS.white, fontWeight: "700", fontSize: 30 }}>
          Configurar Servidor
        </Text>

        <View style={{ marginVertical: "1%" }} />
        <Text
          style={{
            color: COLORS.white,
            fontWeight: "500",
            fontSize: 16,
            textAlign: "center",
          }}
        >
          En este apartado debes ingresar la dirección IP del servidor para
          poder iniciar la Aplicación.
        </Text>

        <View style={{ marginVertical: "4%" }} />
        <RaveRackInput
          text={props.serverIP}
          setText={props.setServerIP}
          placeholder="Dirección IP del Servidor"
          inputType="url"
        />

        <View style={{ marginVertical: "4%" }} />
        <RaveRackButton label="Aceptar" onPress={props.onSaveIP} />
      </KeyboardAvoidingView>
    </View>
  );
};

export default ServerScreen;
