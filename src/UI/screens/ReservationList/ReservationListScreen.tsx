import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";

import COLORS from "../../styles/colors";
import IonIcons from "react-native-vector-icons/Ionicons";

import { Reservation } from "../../../domain/entities/Reservation";
import SearchInput from "../../components/SearchInput";

type Props = {
  search: string;
  loading: boolean;
  onSearch: () => void;
  onRefresh: () => void;
  reservations: Reservation[];
  setSearch: (search: string) => void;
  onItemPress: (reservation: Reservation) => void;
};

const ReservationListScreen = (props: Props) => {
  const ReservationItemList = (item: Reservation) => {
    const itemDate = item.date
      ? new Date(item.date).toISOString().split("T")[0]
      : "";

    const itemTime = new Date(`${itemDate} ${item.time}`).toLocaleTimeString(
      [],
      {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }
    );

    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          borderBottomWidth: 1,
          borderBottomColor: COLORS.gray,
          alignItems: "center",
          padding: 10,
          paddingVertical: 20,
        }}
        onPress={() => props.onItemPress(item)}
      >
        <Text style={{ flex: 1, fontSize: 16, color: "gray" }}>
          {itemDate.split("-").reverse().slice(0, 2).join("/")} {itemTime}
        </Text>

        <Text
          style={{ flex: 3, fontSize: 18, fontWeight: "500" }}
          numberOfLines={1}
        >
          {item.customer.fullname}
        </Text>
        <Text
          style={{ flex: 1, fontSize: 18, fontWeight: "500" }}
          numberOfLines={1}
        >
          {item.capacity}
        </Text>

        <IonIcons
          name={item.active ? "time-sharp" : "checkmark-circle"}
          color={item.active ? COLORS.orange : COLORS.green}
          size={25}
          style={{ flex: 1 }}
        />
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
            setText={(text) => {
              props.setSearch(text);
              props.onSearch();
            }}
            editable={!props.loading}
          />
        </View>

        <View style={{ padding: 10 }}>
          <View
            style={{
              flexDirection: "row",
              borderBottomWidth: 1,
              borderBottomColor: COLORS.gray,
              alignItems: "center",
              padding: 10,
            }}
          >
            <Text style={{ flex: 1, fontSize: 16, fontWeight: "500" }}>
              Fecha
            </Text>

            <Text style={{ flex: 3, fontSize: 16, fontWeight: "500" }}>
              Cliente
            </Text>
            <Text style={{ flex: 2, fontSize: 16, fontWeight: "500" }}>
              Personas
            </Text>
          </View>

          {props.reservations.length === 0 && (
            <Text
              style={{
                margin: 16,
                marginTop: "10%",
                fontSize: 18,
                fontWeight: "600",
                color: "gray",
                alignSelf: "center",
              }}
            >
              No hay reservas por el momento...
            </Text>
          )}

          <FlatList
            data={props.reservations}
            keyExtractor={(item, index) => item.id ?? index.toString()}
            renderItem={({ item }) => ReservationItemList(item)}
            onRefresh={props.onRefresh}
            refreshing={props.loading}
            style={{ height: "80%" }}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});

export default ReservationListScreen;
