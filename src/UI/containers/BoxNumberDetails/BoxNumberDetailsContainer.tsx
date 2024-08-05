import { useState, useEffect } from "react";
import BoxNumberDetailsScreen from "../../screens/BoxNumberDetails/BoxNumberDetailsScreen";
import { useRoute, RouteProp } from "@react-navigation/native";
import { BoxNumbersParamList } from "../../types/boxNumbers/BoxNumbersParamList";
import { BoxNumbersController } from "../../../infraestucture/api/BoxNumbersController";
import { getBoxNumberDetails } from "../../../application/use-cases/BoxNumbers/getBoxNumberDetails";
import { BoxNumber } from "../../../domain/entities/BoxNumber";
import { Error } from "../../../domain/entities/Error";

const BoxNumberDetailsContainer = () => {
  const boxNumberRepository = new BoxNumbersController();
  const boxNumberDetails = new getBoxNumberDetails(boxNumberRepository);
  const route = useRoute<RouteProp<BoxNumbersParamList, "BoxNumberDetail">>();

  const [boxNumber, setBoxNumber] = useState(route.params.boxNumber);

  const handleGetBoxNumberDetails = async () => {
    const formatedBoxNumber =
      route.params.boxNumber?.boxnumber.toString() ?? "";

    const response = (await boxNumberDetails.execute(
      formatedBoxNumber
    )) as BoxNumber[] & Error;

    setBoxNumber(response[0]);
  };

  useEffect(() => {
    handleGetBoxNumberDetails();
  }, []);

  return <BoxNumberDetailsScreen boxNumber={boxNumber ?? ({} as BoxNumber)} />;
};

export default BoxNumberDetailsContainer;
