import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginContainer from "../../containers/Auth/Login";
import MenuContainer from "../../containers/Menu/MenuContainer";
import ServerContainer from "../../containers/Server/ServerContainer";
import COLORS from "../../styles/colors";

const AppStack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <AppStack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <AppStack.Screen name="Login" component={LoginContainer} />
      <AppStack.Screen
        name="Menu"
        options={{
          headerShown: true,
          headerTitle: "Custodia",
          headerTitleAlign: "center",
          headerLeft: () => <></>,
          headerStyle: { backgroundColor: COLORS.purple },
          headerTitleStyle: { color: COLORS.white, fontWeight: "bold" },
        }}
        component={MenuContainer}
      />
      <AppStack.Screen name="Server" component={ServerContainer} />
    </AppStack.Navigator>
  );
};

export default AppNavigation;
