import { Reservation } from "../../../domain/entities/Reservation";
import { Error } from "../../../domain/entities/Error";
import { ReservationRepository } from "../../../domain/repositories/ReservationRepositories";

export class updateReservation {
  private reservationRepository: ReservationRepository;

  constructor(reservationRepository: ReservationRepository) {
    this.reservationRepository = reservationRepository;
  }

  isValidReservation(reservation: Reservation): boolean {
    if (reservation.id === undefined) return false;
    if (reservation.date === undefined) return false;
    if (reservation.time === undefined) return false;
    if (reservation.capacity === undefined) return false;
    if (reservation.customerId === undefined) return false;
    if (reservation.active === undefined) return false;
    return true;
  }

  async execute(reservation: Reservation): Promise<Reservation | Error> {
    if (!this.isValidReservation(reservation))
      return { message: "All fields are required", error: true };

    const updatedReservation =
      await this.reservationRepository.updateReservation(reservation);

    return updatedReservation;
  }
}
