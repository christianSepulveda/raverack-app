import { useState, useEffect, useCallback } from "react";
import BoxNumberList from "../../screens/BoxNumbersList/BoxNumbersListScreen";
import { BoxNumber } from "../../../domain/entities/BoxNumber";
import { BoxNumbersController } from "../../../infraestucture/api/BoxNumbersController";
import { getAllBoxNumbers } from "../../../application/use-cases/BoxNumbers/getAllBoxNumbers";
import { BoxNumbersNavigationProps } from "../../types/boxNumbers/BoxNumbersParamList";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { Error } from "../../../domain/entities/Error";
import { AppNavigationProps } from "../../types/app/AppStackParamList";

type Props = {};

const BoxNumberListContainer = (props: Props) => {
  const boxNumberRepository = new BoxNumbersController();
  const getBoxNumbers = new getAllBoxNumbers(boxNumberRepository);

  const navigation = useNavigation<BoxNumbersNavigationProps>();
  const rootNavigation = useNavigation<AppNavigationProps>();

  const [search, setSearch] = useState("");
  const [boxNumbers, setBoxNumbers] = useState<BoxNumber[]>([]);
  const [filteredBoxNumbers, setFilteredBoxNumbers] = useState<BoxNumber[]>([]);
  const [loading, setLoading] = useState(true);

  const handleGetBoxNumbers = async () => {
    setLoading(true);
    const response = (await getBoxNumbers.execute()) as BoxNumber[] & Error;

    if (response.status === 401) {
      await AsyncStorage.removeItem("token");
      Alert.alert("Sesión expirada", "Por favor inicie sesión nuevamente.");
      rootNavigation.replace("Login");
    }

    setBoxNumbers(response as BoxNumber[]);
    setFilteredBoxNumbers(response as BoxNumber[]);
    setLoading(false);
  };

  const handleFilterBoxNumbers = () => {
    if (search === "") {
      setFilteredBoxNumbers(boxNumbers);
      return;
    }

    const filtered = boxNumbers.filter((boxNumber) =>
      boxNumber.boxnumber.toString().includes(search)
    );
    setFilteredBoxNumbers(filtered);
  };

  const handleOnItemPress = (boxNumber: BoxNumber) => {
    navigation.navigate("BoxNumberDetail", { boxNumber });
  };

  useFocusEffect(
    useCallback(() => {
      handleGetBoxNumbers();
    }, [])
  );

  useEffect(() => {
    handleGetBoxNumbers();
  }, []);

  useEffect(() => {
    handleFilterBoxNumbers();
  }, [search]);

  return (
    <BoxNumberList
      boxNumbers={filteredBoxNumbers}
      search={search}
      setSearch={setSearch}
      loading={loading}
      onSearch={handleFilterBoxNumbers}
      onRefresh={() => {
        setLoading(true);
        handleGetBoxNumbers();
      }}
      onItemPress={handleOnItemPress}
    />
  );
};

export default BoxNumberListContainer;
