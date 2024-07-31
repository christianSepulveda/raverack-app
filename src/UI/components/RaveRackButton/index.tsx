import { TouchableOpacity, Text } from "react-native";
import COLORS from "../../styles/colors";

type Props = {
  label: string;
  onPress: () => void;
};

const RaveRackButton = (props: Props) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: COLORS.white,
        width: "100%",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
      }}
      onPress={props.onPress}
    >
      <Text style={{ color: COLORS.purple, fontWeight: "600", fontSize: 20 }}>
        {props.label}
      </Text>
    </TouchableOpacity>
  );
};

export default RaveRackButton;
