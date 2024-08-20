import { createNativeStackNavigator } from "@react-navigation/native-stack";
import COLORS from "../../styles/colors";
import ConfigContainer from "../../containers/Config/ConfigContainer";
import CustomersContainer from "../../containers/Config/Customers/CustomersContainer";

type Props = {};

const ConfigNavigation = (props: Props) => {
  const ConfigStack = createNativeStackNavigator();

  return (
    <ConfigStack.Navigator
      initialRouteName="ConfigMenu"
      screenOptions={{ headerShown: false }}
    >
      <ConfigStack.Screen
        name="ConfigMenu"
        options={{
          headerShown: true,
          headerTitle: "Opciones",
          headerTitleAlign: "center",
          headerLeft: () => <></>,
          headerStyle: { backgroundColor: COLORS.purple },
          headerTitleStyle: { color: COLORS.white, fontWeight: "bold" },
        }}
        component={ConfigContainer}
      />
      <ConfigStack.Screen
        name="Customers"
        options={{
          headerShown: true,
          headerTitle: "Historico de Clientes",
          headerTitleAlign: "center",
          headerLeft: () => <></>,
          headerStyle: { backgroundColor: COLORS.purple },
          headerTitleStyle: { color: COLORS.white, fontWeight: "bold" },
        }}
        component={CustomersContainer}
      />
    </ConfigStack.Navigator>
  );
};

export default ConfigNavigation;
