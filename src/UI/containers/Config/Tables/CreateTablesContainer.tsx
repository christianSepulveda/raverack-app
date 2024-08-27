import { useNavigation } from "@react-navigation/native";
import CreateTablesScreen from "../../../screens/Config/CreateTables/CreateTablesScreen";
import { BoxNumbersNavigationProps } from "../../../types/boxNumbers/BoxNumbersParamList";
import { useState } from "react";
import { TableController } from "../../../../infraestucture/api/TableController";
import { createTable } from "../../../../application/use-cases/Table/CreateTable";
import { Table } from "../../../../domain/entities/Table";
import { Error } from "../../../../domain/entities/Error";
import { ActivityIndicator, Alert } from "react-native";
import COLORS from "../../../styles/colors";
import { View } from "react-native-animatable";

type Props = {};

const CreateTablesContainer = (props: Props) => {
  const tableRepository = new TableController();
  const addTable = new createTable(tableRepository);

  const navigation = useNavigation<BoxNumbersNavigationProps>();
  const onCancel = () => navigation.goBack();

  const [numberOfTable, setNumberOfTable] = useState("");
  const [tablesCapacity, setTablesCapacity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreateTables = async () => {
    setLoading(true);

    let errorMessage = "";
    if (numberOfTable === "" || tablesCapacity === "") {
      setError("Debe completar todos los campos.");
      setLoading(false);
      return;
    }

    const response = (await addTable.execute(
      Number(numberOfTable),
      Number(tablesCapacity)
    )) as Table & Error;

    if (response.message) {
      if (response.message === "Table already exists")
        errorMessage = "La mesa ya existe.";

      if (response.status === 500) errorMessage = "Error al crear la mesa.";
      setError(errorMessage);
    }

    if (response.id) {
      setError("");
      setNumberOfTable("");
      setTablesCapacity("");
      Alert.alert("Mesa creada", "La mesa se ha creado correctamente.");
    }

    setLoading(false);
  };

  if (loading)
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color={COLORS.purple} />
      </View>
    );

  return (
    <CreateTablesScreen
      onCancel={onCancel}
      numberOfTable={numberOfTable}
      tablesCapacity={tablesCapacity}
      setNumberOfTable={(value) => setNumberOfTable(value)}
      setTablesCapacity={(value) => setTablesCapacity(value)}
      onCreateTables={handleCreateTables}
      error={error}
    />
  );
};

export default CreateTablesContainer;
