import { View, Text, TextInput, InputModeOptions } from "react-native";
import COLORS from "../../styles/colors";
import Ionicons from "react-native-vector-icons/Ionicons";

type Props = {
  inputType: InputModeOptions;
  onSubmitEditing: () => void;
  text: string;
  setText: (text: string) => void;
};

const SearchInput = (props: Props) => {
  return (
    <View
      style={{
        backgroundColor: COLORS.gray,
        margin: 10,
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#CCC",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <TextInput
        style={{
          flex: 10,
          padding: 10,
          color: COLORS.blueGrey,
          fontSize: 18,
        }}
        placeholder="Buscar"
        placeholderTextColor={"gray"}
        inputMode={props.inputType}
        onSubmitEditing={props.onSubmitEditing}
        value={props.text}
        onChangeText={props.setText}
      />

      <Ionicons
        name="search"
        size={20}
        color={"gray"}
        style={{ flex: 1, padding: 10 }}
      />
    </View>
  );
};

export default SearchInput;
