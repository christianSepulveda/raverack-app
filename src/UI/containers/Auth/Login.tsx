import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import LoginScreen from "../../screens/Auth/Login";
import { AppNavigationProps } from "../../types/app/AppStackParamList";
import { LoginUser } from "../../../application/use-cases/User/Login";
import { AuthController } from "../../../infraestucture/api/AuthController";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {};

const LoginContainer = (props: Props) => {
  const userRepository = new AuthController();
  const loginUser = new LoginUser(userRepository);

  const navigation = useNavigation<AppNavigationProps>();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onConfigPress = () => navigation.navigate("Server");
  const onLogin = async () => {
    const response = await loginUser.execute(username, password);

    if (typeof response !== "string") {
      setErrorMessage((response as any).message);
    }

    if (typeof response === "string") {
      await AsyncStorage.setItem("token", response);
      navigation.navigate("Menu");
    }
  };

  return (
    <LoginScreen
      username={username}
      onChangeUsername={setUsername}
      password={password}
      onChangePassword={setPassword}
      onConfigPress={onConfigPress}
      onLogin={onLogin}
      errorMessage={errorMessage}
    />
  );
};

export default LoginContainer;
