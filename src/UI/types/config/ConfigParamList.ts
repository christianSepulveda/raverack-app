import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type ConfigParamList = {
  ConfigMenu: undefined;
  Customers: undefined;
  CreateTables: undefined;
};

export type ConfigNavigationProps = NativeStackNavigationProp<ConfigParamList>;
