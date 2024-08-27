import { useNavigation } from "@react-navigation/native";
import CreateTablesScreen from "../../../screens/Config/CreateTables/CreateTablesScreen";
import { BoxNumbersNavigationProps } from "../../../types/boxNumbers/BoxNumbersParamList";
import { useState } from "react";

type Props = {};

const CreateTablesContainer = (props: Props) => {
  const navigation = useNavigation<BoxNumbersNavigationProps>();
  const onCancel = () => navigation.goBack();

  const [numberOfTables, setNumberOfTables] = useState("");
  const [tablesCapacity, setTablesCapacity] = useState("");

  const handleCreateTables = () => {
    console.log(numberOfTables, tablesCapacity);
  };

  return (
    <CreateTablesScreen
      onCancel={onCancel}
      numberOfTables={numberOfTables}
      tablesCapacity={tablesCapacity}
      setNumberOfTables={(value) => setNumberOfTables(value)}
      setTablesCapacity={(value) => setTablesCapacity(value)}
      onCreateTables={handleCreateTables}
    />
  );
};

export default CreateTablesContainer;
