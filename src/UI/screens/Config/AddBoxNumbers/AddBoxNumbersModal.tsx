import {
  StyleSheet,
  View,
  Modal,
  Text,
  TextInput,
  ActivityIndicator,
} from "react-native";
import COLORS from "../../../styles/colors";
import RaveRackButton from "../../../components/RaveRackButton";
import { useEffect, useState } from "react";

interface Props {
  visibility: boolean;
  onCancel: () => void;
  onAddBoxNumbers: (amount: number) => void;
  loading: boolean;
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    paddingTop: "20%",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
});

const AddBoxNumbersModal = (props: Props) => {
  const [amount, setAmount] = useState<string>("");

  useEffect(() => {
    if (!props.visibility) setAmount("");
  }, [props.visibility]);

  return (
    <Modal animationType="slide" transparent={true} visible={props.visibility}>
      <View style={styles.center}>
        <View
          style={{
            width: "95%",
            height: 320,
            backgroundColor: COLORS.white,
            borderRadius: 5,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{ fontSize: 20, fontWeight: "500" }}
          >{`¿Cuántos espacios deseas agregar?`}</Text>

          <View style={{ margin: 15 }} />

          {props.loading ? (
            <ActivityIndicator size={"large"} color={COLORS.purple} />
          ) : (
            <TextInput
              placeholder="N°"
              keyboardType="number-pad"
              style={{
                backgroundColor: COLORS.gray,
                width: "20%",
                padding: 20,
                textAlign: "center",
                fontSize: 30,
                fontWeight: "500",
                borderRadius: 5,
              }}
              value={amount}
              maxLength={2}
              onChangeText={(text) => {
                const formatedText =
                  text === "" ? "" : text.replace(/[^0-9]/g, "");
                setAmount(formatedText);
              }}
            />
          )}

          <View style={{ margin: 15 }} />

          <View style={{ flexDirection: "row", width: "80%" }}>
            <View style={{ flex: 6, marginEnd: 5 }}>
              <RaveRackButton
                label={"Agregar"}
                onPress={() => {
                  props.onAddBoxNumbers(parseInt(amount));
                }}
                loading={false}
                mode="dark"
              />
            </View>

            <View style={{ flex: 6, marginStart: 5 }}>
              <RaveRackButton
                label="Cancelar"
                onPress={() => {
                  props.onCancel();
                }}
                loading={false}
                mode="dark"
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddBoxNumbersModal;
