import { Reservation } from "../entities/Reservation";
import { Error } from "../entities/Error";

export interface ReservationRepository {
  getAllReservations(): Promise<Reservation[] | Error>;
  getReservationById(id: string): Promise<Reservation | Error>;
  updateReservation(reservation: Reservation): Promise<Reservation | Error>;
}
