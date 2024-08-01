import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginContainer from "../../containers/Auth/Login";
import ServerContainer from "../../containers/Server/ServerContainer";
import BoxNumbersNavigation from "../BoxNumbers/BoxNumbersNavigation";

const AppStack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <AppStack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <AppStack.Screen name="Login" component={LoginContainer} />
      <AppStack.Screen name="BoxNumbers" component={BoxNumbersNavigation} />
      <AppStack.Screen name="Server" component={ServerContainer} />
    </AppStack.Navigator>
  );
};

export default AppNavigation;
