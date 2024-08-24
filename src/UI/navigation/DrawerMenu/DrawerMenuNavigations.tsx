import {
  createDrawerNavigator,
  DrawerNavigationOptions,
} from "@react-navigation/drawer";
import BoxNumbersNavigation from "../BoxNumbers/BoxNumbersNavigation";
import ConfigNavigation from "../Config/ConfigNavigation";
import COLORS from "../../styles/colors";
import DrawerMenuScreen from "../../screens/DrawerMenu/DrawerMenuScreen";
import IonIcons from "react-native-vector-icons/Ionicons";

const Drawer = createDrawerNavigator();

const DrawerProps: DrawerNavigationOptions = {
  headerTitleAlign: "center",
  headerStyle: { backgroundColor: COLORS.purple },
  headerTitleStyle: { color: COLORS.white, fontWeight: "bold" },
  headerTintColor: COLORS.white,
  drawerItemStyle: {
    borderBottomColor: COLORS.gray,
    borderBottomWidth: 1,
  },
  drawerLabelStyle: { fontSize: 18, fontWeight: "600", marginStart: -20 },
  drawerActiveBackgroundColor: COLORS.purple,
  drawerActiveTintColor: COLORS.white,
  drawerInactiveTintColor: "gray",
};

function DrawerMenu() {
  return (
    <Drawer.Navigator
      initialRouteName="BoxNumbers"
      drawerContent={(props) => <DrawerMenuScreen DrawerProps={props} />}
      screenOptions={{ ...DrawerProps }}
    >
      <Drawer.Screen
        name="BoxNumbers"
        component={BoxNumbersNavigation}
        options={{
          headerTitle: "Custodia",
          drawerLabel: "Custodia",
          drawerIcon: ({ focused }) => (
            <IonIcons
              name="file-tray-stacked"
              size={20}
              color={focused ? COLORS.white : "gray"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Config"
        component={ConfigNavigation}
        options={{
          headerTitle: "Opciones",
          drawerLabel: "Opciones",
          drawerIcon: ({ focused }) => (
            <IonIcons
              name="build"
              size={20}
              color={focused ? COLORS.white : "gray"}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default DrawerMenu;
