import { TouchableOpacity, Text, ActivityIndicator } from "react-native";
import COLORS from "../../styles/colors";

type Props = {
  label: string;
  onPress: () => void;
  loading?: boolean;
  mode?: "light" | "dark";
};

const RaveRackButton = (props: Props) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: props.mode === "dark" ? COLORS.purple : COLORS.white,
        width: "100%",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
      }}
      onPress={props.onPress}
      disabled={props.loading}
    >
      {props.loading ? (
        <ActivityIndicator
          color={props.mode === "dark" ? COLORS.white : COLORS.purple}
          size={20}
        />
      ) : (
        <Text
          style={{
            color: props.mode === "dark" ? COLORS.white : COLORS.purple,
            fontWeight: "600",
            fontSize: 20,
          }}
        >
          {props.label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default RaveRackButton;
