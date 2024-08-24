import { NavigationContainer } from "@react-navigation/native";
import AppNavigation from "./src/UI/navigation/App/AppNavigation";
import "./gesture-handler.native";

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigation />
    </NavigationContainer>
  );
}
