import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type AppStackParamList = {
  Login: undefined;
  DrawerMenu: undefined;
  Server: undefined;
};

export type AppNavigationProps = NativeStackNavigationProp<AppStackParamList>;
