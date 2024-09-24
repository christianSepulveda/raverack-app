import React from "react";
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
import IonIcons from "react-native-vector-icons/Ionicons";

import COLORS from "../../styles/colors";
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

type ReservationItemProps = {
  reservation: Reservation;
  onPress: (reservation: Reservation) => void;
};

const ReservationItem = ({ reservation, onPress }: ReservationItemProps) => {
  const formattedDate = reservation.date
    ? new Date(reservation.date).toISOString().split("T")[0]
    : "";
  const formattedTime = new Date(
    `${formattedDate} ${reservation.time}`
  ).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <TouchableOpacity
      style={styles.reservationItem}
      onPress={() => onPress(reservation)}
    >
      <Text style={styles.reservationItemDate}>
        {formattedDate.split("-").reverse().slice(0, 2).join("/")}{" "}
        {formattedTime}
      </Text>
      <Text style={styles.reservationItemName} numberOfLines={1}>
        {reservation.customer.fullname}
      </Text>
      <Text style={styles.reservationItemCapacity} numberOfLines={1}>
        {reservation.capacity}
      </Text>
      <IonIcons
        name={reservation.active ? "time-sharp" : "checkmark-circle"}
        color={reservation.active ? COLORS.orange : COLORS.green}
        size={25}
        style={styles.reservationItemIcon}
      />
    </TouchableOpacity>
  );
};

const ReservationListScreen = ({
  search,
  loading,
  onSearch,
  onRefresh,
  reservations,
  setSearch,
  onItemPress,
}: Props) => {
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <StatusBar style="light" translucent />

        <View>
          <SearchInput
            inputType="numeric"
            onSubmitEditing={onSearch}
            text={search}
            setText={(text) => {
              setSearch(text);
              onSearch();
            }}
            editable={!loading}
          />
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.headerRow}>
            <Text style={styles.headerDate}>Fecha</Text>
            <Text style={styles.headerName}>Cliente</Text>
            <Text style={styles.headerCapacity}>Personas</Text>
          </View>

          {reservations.length === 0 ? (
            <Text style={styles.noReservationsText}>
              No hay reservas por el momento...
            </Text>
          ) : (
            <FlatList
              data={reservations}
              keyExtractor={(item, index) =>
                item.id?.toString() ?? index.toString()
              }
              renderItem={({ item }) => (
                <ReservationItem reservation={item} onPress={onItemPress} />
              )}
              onRefresh={onRefresh}
              refreshing={loading}
              style={{ flex: 1 }}
            />
          )}
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
  contentContainer: {
    padding: 10,
    flex: 1,
  },
  headerRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
    alignItems: "center",
    padding: 10,
  },
  headerDate: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
  },
  headerName: {
    flex: 3,
    fontSize: 16,
    fontWeight: "500",
  },
  headerCapacity: {
    flex: 2,
    fontSize: 16,
    fontWeight: "500",
  },
  noReservationsText: {
    margin: 16,
    marginTop: "10%",
    fontSize: 18,
    fontWeight: "600",
    color: "gray",
    alignSelf: "center",
  },
  reservationItem: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
    alignItems: "center",
    padding: 10,
    paddingVertical: 20,
  },
  reservationItemDate: {
    flex: 1,
    fontSize: 16,
    color: "gray",
  },
  reservationItemName: {
    flex: 3,
    fontSize: 18,
    fontWeight: "500",
  },
  reservationItemCapacity: {
    flex: 0.8,
    fontSize: 18,
    fontWeight: "500",
  },
  reservationItemIcon: {
    flex: 1,
  },
});

export default ReservationListScreen;
