import { useState, useEffect } from "react";
import MenuScreen from "../../screens/Menu/MenuScreen";
import { BoxNumber } from "../../../domain/entities/BoxNumber";
import { BoxNumbersController } from "../../../infraestucture/api/BoxNumbersController";
import { getAllBoxNumbers } from "../../../application/use-cases/BoxNumbers/getAllBoxNumbers";

type Props = {};

const MenuContainer = (props: Props) => {
  const boxNumberRepository = new BoxNumbersController();
  const getBoxNumbers = new getAllBoxNumbers(boxNumberRepository);

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

  useEffect(() => {
    handleGetBoxNumbers();
  }, []);

  useEffect(() => {
    handleFilterBoxNumbers();
  }, [search]);

  return (
    <MenuScreen
      boxNumbers={filteredBoxNumbers}
      search={search}
      setSearch={setSearch}
      loading={loading}
      onSearch={handleFilterBoxNumbers}
      onRefresh={() => {
        setLoading(true);
        handleGetBoxNumbers();
      }}
    />
  );
};

export default MenuContainer;
