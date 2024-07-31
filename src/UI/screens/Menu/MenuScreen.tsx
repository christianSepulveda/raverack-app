import { StatusBar } from "expo-status-bar";
import { View, Text, KeyboardAvoidingView, Platform } from "react-native";
import COLORS from "../../styles/colors";

const MenuScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        padding: "5%",
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <StatusBar style="light" translucent={true} />
        <Text>MenuScreen</Text>
      </KeyboardAvoidingView>
    </View>
  );
};

export default MenuScreen;
