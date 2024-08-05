import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BoxNumberListContainer from "../../containers/BoxNumbers/BoxNumbersListContainer";
import COLORS from "../../styles/colors";
import BoxNumberDetailsContainer from "../../containers/BoxNumberDetails/BoxNumberDetailsContainer";
import IonIcons from "react-native-vector-icons/Ionicons";
import { Alert, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationProps } from "../../types/app/AppStackParamList";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AppStack = createNativeStackNavigator();

const LogoutIcon = () => {
  const appNavigation = useNavigation<AppNavigationProps>();

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    appNavigation.replace("Login");
  };

  return (
    <TouchableOpacity
      onPress={() =>
        Alert.alert(
          "Cerrar sesión",
          "¿Estás seguro de que deseas cerrar sesión?",
          [
            {
              text: "Cerrar sesión",
              style: "destructive",
              isPreferred: true,
              onPress: handleLogout,
            },
            {
              text: "Cancelar",
            },
          ]
        )
      }
    >
      <IonIcons name="log-out-outline" size={30} color={COLORS.white} />
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
          headerLeft: () => <LogoutIcon />,
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
