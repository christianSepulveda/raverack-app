import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ConfigContainer from "../../containers/Config/ConfigContainer";
import CustomersContainer from "../../containers/Config/Customers/CustomersContainer";
import CreateTablesContainer from "../../containers/Config/Tables/CreateTablesContainer";

type Props = {};

const ConfigNavigation = (props: Props) => {
  const ConfigStack = createNativeStackNavigator();

  return (
    <ConfigStack.Navigator
      initialRouteName="ConfigMenu"
      screenOptions={{ headerShown: false }}
    >
      <ConfigStack.Screen name="ConfigMenu" component={ConfigContainer} />
      <ConfigStack.Screen name="Customers" component={CustomersContainer} />
      <ConfigStack.Screen name="CreateTables" component={CreateTablesContainer} />
    </ConfigStack.Navigator>
  );
};

export default ConfigNavigation;
