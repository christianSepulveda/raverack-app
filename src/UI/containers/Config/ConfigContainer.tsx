import { Alert } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import ConfigScreen from "../../screens/Config/ConfigScreen";

import { BoxNumbersController } from "../../../infraestucture/api/BoxNumbersController";
import { addBoxNumbers } from "../../../application/use-cases/BoxNumbers/addBoxNumbers";

import { Error } from "../../../domain/entities/Error";
import { type AppNavigationProps } from "../../types/app/AppStackParamList";
import { type ConfigNavigationProps } from "../../types/config/ConfigParamList";
import { type createdBoxNumbers } from "../../types/boxNumbers/BoxNumberResponse";

type Props = {};

const ConfigContainer = (props: Props) => {
  const appNavigation = useNavigation<AppNavigationProps>();
  const configNavigation = useNavigation<ConfigNavigationProps>();

  const boxNumberRepository = new BoxNumbersController();
  const createBoxNumbers = new addBoxNumbers(boxNumberRepository);

  const [showAddBoxNumbersModal, setShowAddBoxNumbersModal] = useState(false);
  const [loadingAmount, setLoadingAmount] = useState(false);

  const goToCustomers = async () => configNavigation.navigate("Customers");

  const makeLogout = async () => {
    await AsyncStorage.removeItem("token");
    appNavigation.replace("Login");
  };

  const makeAddBoxNumbers = async (amount: number) => {
    setLoadingAmount(true);
    const response = (await createBoxNumbers.execute(
      amount
    )) as createdBoxNumbers & Error;
    setShowAddBoxNumbersModal(false);

    if (response.error) Alert.alert("Error", response.message);
    else Alert.alert("Éxito", "Se han agregado los espacios correctamente");
    setLoadingAmount(false);
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

  const handleAddBoxNumbers = (amount: number) => {
    Alert.alert(
      "Agregar Espacios",
      `¿Estás seguro de agregar ${amount} espacios?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        { text: "Aceptar", onPress: () => makeAddBoxNumbers(amount) },
      ]
    );
  };

  return (
    <ConfigScreen
      handleLogout={handleLogout}
      goToCustomers={goToCustomers}
      onAddBoxNumbers={handleAddBoxNumbers}
      showAddBoxNumbersModal={showAddBoxNumbersModal}
      setShowAddBoxNumbersModal={() =>
        setShowAddBoxNumbersModal(!showAddBoxNumbersModal)
      }
      loadingAmount={loadingAmount}
    />
  );
};

export default ConfigContainer;
