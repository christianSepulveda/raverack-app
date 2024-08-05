import { View, Text, KeyboardAvoidingView, Platform } from "react-native";
import * as Animatable from "react-native-animatable";

import COLORS from "../../styles/colors";
import { StatusBar } from "expo-status-bar";

type Props = {};

const VerifySession = (props: Props) => {
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
        <View style={{ marginVertical: "2%" }} />

        <Animatable.Text
          animation="pulse"
          easing="ease-out"
          iterationCount="infinite"
          style={{ color: COLORS.white, fontWeight: "600", fontSize: 20 }}
        >
          Espere un momento...
        </Animatable.Text>
      </KeyboardAvoidingView>
    </View>
  );
};

export default VerifySession;
