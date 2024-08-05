import { View, TextInput, InputModeOptions } from "react-native";
import { useState } from "react";
import COLORS from "../../styles/colors";

type Props = {
  text: string;
  setText: (text: string) => void;
  placeholder: string;
  secuereTextEntry?: boolean;
  inputType?: InputModeOptions;
};

const RaveRackInput = (props: Props) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      style={{
        width: "100%",
        height: 50,
        backgroundColor: COLORS.opacityWhite,
        borderRadius: 10,
        paddingHorizontal: 15,
        justifyContent: "center",
        borderColor: isFocused ? COLORS.white : COLORS.purple,
        borderWidth: 2,
      }}
    >
      <TextInput
        style={{
          flex: 1,
          fontSize: 18,
          fontWeight: "500",
          color: COLORS.white,
        }}
        placeholderTextColor={COLORS.white}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        value={props.text}
        onChange={(e) => props.setText(e.nativeEvent.text)}
        placeholder={props.placeholder}
        secureTextEntry={props.secuereTextEntry}
        inputMode={props.inputType}
      />
    </View>
  );
};

export default RaveRackInput;
