import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import COLORS from "../../styles/colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import RaveRackInput from "../../components/RaveRackInput";
import RaveRackButton from "../../components/RaveRackButton";

type Props = {
  username: string;
  password: string;
  onChangeUsername: (text: string) => void;
  onChangePassword: (text: string) => void;
  onConfigPress: () => void;
  onLogin: () => void;
  errorMessage: string;
};
const LoginScreen = (props: Props) => {
  const ConfigButton = () => (
    <TouchableOpacity
      style={{ position: "absolute", top: "5%", right: 5 }}
      onPress={props.onConfigPress}
    >
      <Ionicons name="settings" size={30} color={COLORS.white} />
    </TouchableOpacity>
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.purple,
        padding: "5%",
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <ConfigButton />

        <StatusBar translucent style="light" backgroundColor="transparent" />
        <Text style={{ color: COLORS.white, fontWeight: "700", fontSize: 40 }}>
          RaveRack
        </Text>

        <View style={{ marginVertical: "2%" }} />
        <RaveRackInput
          text={props.username}
          setText={props.onChangeUsername}
          placeholder="Nombre de Usuario"
        />

        <View style={{ marginVertical: "2.5%" }} />
        <RaveRackInput
          text={props.password}
          setText={props.onChangePassword}
          placeholder="Contraseña"
        />

        {props.errorMessage !== "" && (
          <Text
            style={{
              color: COLORS.white,
              fontSize: 15,
              fontWeight: "bold",
              marginVertical: "2%",
            }}
          >
            {props.errorMessage}
          </Text>
        )}

        <View style={{ marginVertical: "5%" }} />
        <RaveRackButton label="Iniciar Sesión" onPress={props.onLogin} />
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;
