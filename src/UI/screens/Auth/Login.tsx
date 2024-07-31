import { StatusBar } from "expo-status-bar";
import { View, Text, KeyboardAvoidingView, Platform } from "react-native";
import COLORS from "../../styles/colors";
import RaveRackInput from "../../components/RaveRackInput";

const LoginScreen = () => {
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
        <StatusBar translucent style="light" backgroundColor="transparent" />
        <Text style={{ color: COLORS.white, fontWeight: "700", fontSize: 40 }}>
          RaveRack
        </Text>

        <View style={{ marginVertical: "2.5%" }} />

        <RaveRackInput />
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;
