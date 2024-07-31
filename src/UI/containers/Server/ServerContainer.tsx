import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationProps } from "../../types/app/AppStackParamList";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ServerScreen from "../../screens/Server/ServerScreen";

type Props = {};

const ServerContainer = (props: Props) => {
  const [serverIP, setServerIP] = useState("");
  const navigation = useNavigation<AppNavigationProps>();

  const onArrowbackPress = () => navigation.goBack();

  const onSaveIP = async () => {
    await AsyncStorage.setItem("serverIP", serverIP);
    onArrowbackPress();
  };

  const getServerIP = async () => {
    const serverIP = await AsyncStorage.getItem("serverIP");
    setServerIP(serverIP ?? "");
  };

  useEffect(() => {
    getServerIP();
  }, []);

  return (
    <ServerScreen
      serverIP={serverIP}
      setServerIP={setServerIP}
      onArrowbackPress={onArrowbackPress}
      onSaveIP={onSaveIP}
    />
  );
};

export default ServerContainer;
