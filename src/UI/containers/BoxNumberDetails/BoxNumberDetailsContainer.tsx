import { useState, useEffect } from "react";
import BoxNumberDetailsScreen from "../../screens/BoxNumberDetails/BoxNumberDetailsScreen";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import {
  BoxNumbersNavigationProps,
  BoxNumbersParamList,
} from "../../types/boxNumbers/BoxNumbersParamList";
import { BoxNumbersController } from "../../../infraestucture/api/BoxNumbersController";
import { getBoxNumberDetails } from "../../../application/use-cases/BoxNumbers/getBoxNumberDetails";
import { BoxNumber } from "../../../domain/entities/BoxNumber";
import { Error } from "../../../domain/entities/Error";
import { Customer } from "../../../domain/entities/Customer";
import { updatedBox } from "../../types/boxNumbers/BoxNumberResponse";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { AppNavigationProps } from "../../types/app/AppStackParamList";

const BoxNumberDetailsContainer = () => {
  const rootNavigation = useNavigation<AppNavigationProps>();
  const navigation = useNavigation<BoxNumbersNavigationProps>();

  const boxNumberRepository = new BoxNumbersController();
  const boxNumberDetails = new getBoxNumberDetails(boxNumberRepository);
  const route = useRoute<RouteProp<BoxNumbersParamList, "BoxNumberDetail">>();

  const [boxNumber, setBoxNumber] = useState(route.params.boxNumber);
  const [customer, setCustomer] = useState<Customer>({} as Customer);
  const [error, setError] = useState<Error>({} as Error);

  const handleGetBoxNumberDetails = async () => {
    const formatedBoxNumber =
      route.params.boxNumber?.boxnumber.toString() ?? "";

    const response = (await boxNumberDetails.execute(
      formatedBoxNumber
    )) as BoxNumber[] & Error;

    if (response.status === 401) {
      await AsyncStorage.removeItem("token");
      Alert.alert("Sesión expirada", "Por favor inicie sesión nuevamente.");
      rootNavigation.replace("Login");
    }

    setBoxNumber(response[0]);
    setCustomer(response[0].customer ?? ({} as Customer));
  };

  const isValidCustomer = () => {
    if (!customer.fullname || !customer.rut) {
      setError({ error: true, message: "Debe completar todos los campos." });
      return false;
    }

    setError({ error: false, message: "" });
    return true;
  };

  const handleUpdateBox = async () => {
    const isValid = isValidCustomer();
    if (!isValid) return;

    const response = (await boxNumberRepository.updateBoxNumber(
      boxNumber?.boxnumber.toString() ?? "",
      customer.fullname,
      customer.rut
    )) as updatedBox[] & Error;

    if (response.status === 401) {
      await AsyncStorage.removeItem("token");
      Alert.alert("Sesión expirada", "Por favor inicie sesión nuevamente.");
      rootNavigation.replace("Login");
    }

    if (response.error) {
      setError({ error: true, message: response.message ?? "" });
      return;
    }

    navigation.goBack();
  };

  const onCancel = () => navigation.goBack();

  useEffect(() => {
    handleGetBoxNumberDetails();
  }, []);

  return (
    <BoxNumberDetailsScreen
      boxNumber={boxNumber ?? ({} as BoxNumber)}
      customer={customer}
      setCustomer={setCustomer}
      onCancel={onCancel}
      updateBox={handleUpdateBox}
      error={error}
    />
  );
};

export default BoxNumberDetailsContainer;
