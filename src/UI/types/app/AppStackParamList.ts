import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type AppStackParamList = {
  Login: undefined;
  BoxNumbers: undefined;
  Server: undefined;
};

export type AppNavigationProps = NativeStackNavigationProp<AppStackParamList>;
