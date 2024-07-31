import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type AppStackParamList = {
  Login: undefined;
  Menu: undefined;
  Server: undefined;
};

export type AppNavigationProps = NativeStackNavigationProp<AppStackParamList>;
