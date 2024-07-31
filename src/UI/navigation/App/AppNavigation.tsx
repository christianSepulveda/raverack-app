import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginContainer from "../../containers/Auth/Login";
import MenuContainer from "../../containers/Menu/MenuContainer";

const AppStack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <AppStack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <AppStack.Screen name="Login" component={LoginContainer} />
      <AppStack.Screen name="Menu" component={MenuContainer} />
    </AppStack.Navigator>
  );
};

export default AppNavigation;
