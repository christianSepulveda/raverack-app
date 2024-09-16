import { Reservation } from "../../domain/entities/Reservation";
import { Error } from "../../domain/entities/Error";
import { ReservationRepository } from "../../domain/repositories/ReservationRepositories";

import makeFetch from "../config/makeFetch";
import getUser from "../config/getUser";

export class ReservationController implements ReservationRepository {
  async getAllReservations(): Promise<Reservation[] | Error> {
    const user = await getUser();
    const response = await makeFetch("reservation/get", "POST", {
      companyid: user.companyid,
    });

    const error: Error = {
      error: true,
      message: "No se pudieron obtener los clientes.",
      status: response.status,
    };

    if (response.status !== 200) return error;
    return response.data;
  }

  async getReservationById(id: string): Promise<Reservation | Error> {
    const user = await getUser();
    const response = await makeFetch("reservation/get", "POST", {
      companyid: user.companyid,
      id,
    });

    const error: Error = {
      error: true,
      message: "No se pudieron obtener los clientes.",
      status: response.status,
    };

    if (response.status !== 200) return error;
    return response.data;
  }

  async updateReservation(
    reservation: Reservation
  ): Promise<Reservation | Error> {
    const response = await makeFetch("reservation/update", "PUT", {
      reservation,
    });

    const error: Error = {
      error: true,
      message: "No se pudo actualizar la reserva.",
      status: response.status,
    };

    if (response.status !== 200) return error;
    return response.data;
  }
}
