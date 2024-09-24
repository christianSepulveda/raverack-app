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
        component={BoxNumberListContainer}
      />
      <AppStack.Screen
        name="BoxNumberDetail"
        component={BoxNumberDetailsContainer}
      />
    </AppStack.Navigator>
  );
};

export default BoxNumbersNavigation;
