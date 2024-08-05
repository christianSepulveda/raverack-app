import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BoxNumberListContainer from "../../containers/BoxNumbers/BoxNumbersListContainer";
import COLORS from "../../styles/colors";
import BoxNumberDetailsContainer from "../../containers/BoxNumberDetails/BoxNumberDetailsContainer";
import { BoxNumbersNavigationProps } from "../../types/boxNumbers/BoxNumbersParamList";
import { BoxNumber } from "../../../domain/entities/BoxNumber";

const AppStack = createNativeStackNavigator();

const BoxNumbersNavigation = () => {
  return (
    <AppStack.Navigator
      initialRouteName="BoxNumberList"
      screenOptions={{ headerShown: false }}
    >
      <AppStack.Screen
        name="BoxNumberList"
        options={{
          headerShown: true,
          headerTitle: "Custodia",
          headerTitleAlign: "center",
          headerLeft: () => <></>,
          headerStyle: { backgroundColor: COLORS.purple },
          headerTitleStyle: { color: COLORS.white, fontWeight: "bold" },
        }}
        component={BoxNumberListContainer}
      />
      <AppStack.Screen
        name="BoxNumberDetail"
        options={{
          headerShown: true,
          headerTitle: "Detalle de Custodia",
          headerTitleAlign: "center",
          headerLeft: () => <></>,
          headerStyle: { backgroundColor: COLORS.purple },
          headerTitleStyle: { color: COLORS.white, fontWeight: "bold" },
        }}
        component={BoxNumberDetailsContainer}
      />
    </AppStack.Navigator>
  );
};

export default BoxNumbersNavigation;
