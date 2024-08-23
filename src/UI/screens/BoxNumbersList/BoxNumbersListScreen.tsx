import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import COLORS from "../../styles/colors";
import { BoxNumber } from "../../../domain/entities/BoxNumber";
import SearchInput from "../../components/SearchInput";

type Props = {
  boxNumbers: BoxNumber[];
  loading: boolean;
  search: string;
  setSearch: (search: string) => void;
  onRefresh: () => void;
  onSearch: () => void;
  onItemPress: (boxNumber: BoxNumber) => void;
};

const BoxNumberList = (props: Props) => {
  const BoxNumberItem = (boxNumber: BoxNumber) => {
    return (
      <TouchableOpacity
        style={[
          styles.boxItem,
          {
            backgroundColor: boxNumber.available ? COLORS.white : COLORS.purple,
          },
        ]}
        onPress={() => props.onItemPress(boxNumber)}
      >
        <Text
          style={[
            styles.boxItemText,
            { color: boxNumber.available ? "#000" : COLORS.white },
          ]}
        >
          {boxNumber.boxnumber}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <StatusBar style="light" translucent={true} />

        <View>
          <SearchInput
            inputType="numeric"
            onSubmitEditing={props.onSearch}
            text={props.search}
            setText={props.setSearch}
            editable={!props.loading}
          />
        </View>

        {props.loading && props.boxNumbers.length === 0 ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size="large" color={COLORS.purple} />
          </View>
        ) : (
          <FlatList
            data={
              props.boxNumbers && props.boxNumbers.length > 0
                ? [...props.boxNumbers].sort(
                    (a, b) => a.boxnumber - b.boxnumber
                  )
                : []
            }
            renderItem={({ item }) => BoxNumberItem(item)}
            contentContainerStyle={styles.flatListContentContainer}
            numColumns={4}
            onRefresh={props.onRefresh}
            refreshing={props.loading}
          />
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  flatListContentContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  boxItem: {
    width: 80,
    height: 80,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 10,
    margin: 10,
  },
  boxItemText: {
    fontSize: 20,
    fontWeight: "600",
  },
});

export default BoxNumberList;
