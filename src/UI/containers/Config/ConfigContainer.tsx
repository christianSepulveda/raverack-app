import { View, Text, Alert } from "react-native";
import React from "react";
import ConfigScreen from "../../screens/Config/ConfigScreen";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationProps } from "../../types/app/AppStackParamList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ConfigNavigationProps } from "../../types/config/ConfigParamList";

type Props = {};

const ConfigContainer = (props: Props) => {
  const appNavigation = useNavigation<AppNavigationProps>();
  const configNavigation = useNavigation<ConfigNavigationProps>();

  const goToCustomers = async () => configNavigation.navigate("Customers");

  const makeLogout = async () => {
    await AsyncStorage.removeItem("token");
    appNavigation.replace("Login");
  };

  const handleLogout = () => {
    Alert.alert("Cerrar Sesión", "¿Estás seguro que deseas cerrar sesión?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      { text: "Aceptar", onPress: makeLogout },
    ]);
  };

  return (
    <ConfigScreen handleLogout={handleLogout} goToCustomers={goToCustomers} />
  );
};

export default ConfigContainer;
