import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BoxNumberListContainer from "../../containers/BoxNumbers/BoxNumbersListContainer";
import COLORS from "../../styles/colors";
import BoxNumberDetailsContainer from "../../containers/BoxNumberDetails/BoxNumberDetailsContainer";
import IonIcons from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ConfigNavigation from "../Config/ConfigNavigation";
import { BoxNumbersNavigationProps } from "../../types/boxNumbers/BoxNumbersParamList";

const AppStack = createNativeStackNavigator();

const MenuIcon = () => {
  const configNavigation = useNavigation<BoxNumbersNavigationProps>();
  const goToConfig = async () => configNavigation.navigate("Config");

  return (
    <TouchableOpacity onPress={goToConfig}>
      <IonIcons name="menu" size={30} color={COLORS.white} />
    </TouchableOpacity>
  );
};

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
          headerRight: () => <MenuIcon />,
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
      <AppStack.Screen name="Config" component={ConfigNavigation} />
    </AppStack.Navigator>
  );
};

export default BoxNumbersNavigation;
