import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BoxNumber } from "../../../domain/entities/BoxNumber";

export type BoxNumbersParamList = {
  BoxNumberList: undefined;
  BoxNumberDetail: { boxNumber?: BoxNumber };
  Config: undefined;
};

export type BoxNumbersNavigationProps =
  NativeStackNavigationProp<BoxNumbersParamList>;
