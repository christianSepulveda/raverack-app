import { useState, useEffect } from "react";
import BoxNumberList from "../../screens/BoxNumbersList/BoxNumbersListScreen";
import { BoxNumber } from "../../../domain/entities/BoxNumber";
import { BoxNumbersController } from "../../../infraestucture/api/BoxNumbersController";
import { getAllBoxNumbers } from "../../../application/use-cases/BoxNumbers/getAllBoxNumbers";
import { BoxNumbersNavigationProps } from "../../types/boxNumbers/BoxNumbersParamList";
import { useNavigation } from "@react-navigation/native";

type Props = {};

const BoxNumberListContainer = (props: Props) => {
  const boxNumberRepository = new BoxNumbersController();
  const getBoxNumbers = new getAllBoxNumbers(boxNumberRepository);
  const navigation = useNavigation<BoxNumbersNavigationProps>();

  const [search, setSearch] = useState("");
  const [boxNumbers, setBoxNumbers] = useState<BoxNumber[]>([]);
  const [filteredBoxNumbers, setFilteredBoxNumbers] = useState<BoxNumber[]>([]);
  const [loading, setLoading] = useState(true);

  const handleGetBoxNumbers = async () => {
    const response = await getBoxNumbers.execute();
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
    console.log(boxNumber);
    navigation.navigate("BoxNumberDetail", { boxNumber });
  };

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
