import { View, Text, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import ReservationListScreen from "../../screens/ReservationList/ReservationListScreen";
import { ReservationController } from "../../../infraestucture/api/ReservationController";
import { getAllReservations } from "../../../application/use-cases/Reservation/GetAllReservations";
import { getReservation } from "../../../application/use-cases/Reservation/GetReservation";
import { Reservation } from "../../../domain/entities/Reservation";
import { updateReservation } from "../../../application/use-cases/Reservation/UpdateReservation";

type Props = {};

const ReservationListContainer = (props: Props) => {
  const reservationRepository = new ReservationController();
  const getReservations = new getAllReservations(reservationRepository);
  const update = new updateReservation(reservationRepository);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [filteredReservations, setFilteredReservations] = useState<
    Reservation[]
  >([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);

  const onSearch = () => {
    if (search === "") {
      setFilteredReservations(reservations);
      return;
    }

    const filtered = reservations.filter((reservation) =>
      reservation.customer.rut.includes(search)
    );
    setFilteredReservations(filtered);
  };

  const fetchReservations = async () => {
    setLoading(true);
    const response = await getReservations.execute();

    if (Array.isArray(response) && response.length > 0) {
      let reservationList: Reservation[] = [];

      response.map((item) => {
        const date = new Date(item.date);
        const currentDate = new Date();

        if (date < currentDate && item.active) {
          reservationList.push(item);
          return;
        }

        if (date.toDateString() === currentDate.toDateString()) {
          reservationList.push(item);
          return;
        }
      });

      setReservations(reservationList);
      setFilteredReservations(reservationList);
      setLoading(false);
      return;
    }

    if ("message" in response) {
      console.log(response.message);
    }
    setLoading(false);
  };

  const onItemPress = async (reservation: Reservation) => {
    const response = await update.execute({
      ...reservation,
      active: !reservation.active,
    });

    if ("id" in response) {
      let newList = [] as Reservation[];
      reservations.map((item) => {
        if (item.id === response.id) {
          newList.push({ ...item, active: !item.active });
        } else {
          newList.push(item);
        }
      });

      setFilteredReservations(newList);
      setReservations(newList);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  return (
    <ReservationListScreen
      loading={loading}
      onSearch={onSearch}
      search={search}
      setSearch={setSearch}
      reservations={filteredReservations}
      onRefresh={fetchReservations}
      onItemPress={(reservation) => {
        Alert.alert(
          reservation.active ? "Registrar Llegada" : "Revertir Regristo",
          reservation.active
            ? "¿Deseas registrar la llegada de esta reserva?"
            : "¿Deseas revertir la llegada de esta reserva?",
          [
            { isPreferred: true, text: "Cancelar" },
            { text: "Aceptar", onPress: () => onItemPress(reservation) },
          ]
        );
      }}
    />
  );
};

export default ReservationListContainer;
