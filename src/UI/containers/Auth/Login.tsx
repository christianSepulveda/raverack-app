import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import { AppNavigationProps } from "../../types/app/AppStackParamList";
import { LoginUser } from "../../../application/use-cases/User/Login";
import { AuthController } from "../../../infraestucture/api/AuthController";

import AsyncStorage from "@react-native-async-storage/async-storage";

import VerifySession from "../../screens/Auth/VerifySession";
import LoginScreen from "../../screens/Auth/Login";

const LoginContainer = () => {
  const userRepository = new AuthController();
  const loginUser = new LoginUser(userRepository);

  const navigation = useNavigation<AppNavigationProps>();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingSession, setLoadingSession] = useState(true);

  const onConfigPress = () => navigation.navigate("Server");

  const onLogin = async () => {
    try {
      const response = await loginUser.execute(username, password);

      if (typeof response !== "string") {
        setErrorMessage((response as any).message);
      }

      if (typeof response === "string") {
        await AsyncStorage.setItem("token", response);
        navigation.replace("Menu");
      }
    } catch (error) {
      setErrorMessage("Ocurrió un error, intente de nuevo");
      setLoading(false);
      return;
    }
  };

  const checkSession = async () => {
    const token = await AsyncStorage.getItem("token");
    const decodedToken = token ? JSON.parse(atob(token.split(".")[1])) : null;

    const isValid =
      decodedToken && decodedToken.exp && decodedToken.exp > Date.now() / 1000;

    if (isValid) {
      setTimeout(() => {
        navigation.replace("Menu");
        setLoadingSession(false);
      }, 3000);
      return;
    }

    await AsyncStorage.removeItem("token");
    setTimeout(() => setLoadingSession(false), 3000);
  };

  useEffect(() => {
    checkSession();
  }, []);

  return loadingSession ? (
    <VerifySession />
  ) : (
    <LoginScreen
      username={username}
      password={password}
      loading={loading}
      errorMessage={errorMessage}
      onChangeUsername={(text) => setUsername(text.toLowerCase())}
      onChangePassword={(text) => setPassword(text.toLowerCase())}
      onConfigPress={onConfigPress}
      onLogin={() => {
        setLoading(true);
        onLogin();
      }}
    />
  );
};

export default LoginContainer;
