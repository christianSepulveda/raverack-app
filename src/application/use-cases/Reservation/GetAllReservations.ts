import { Reservation } from "../../../domain/entities/Reservation";
import { Error } from "../../../domain/entities/Error";
import { ReservationRepository } from "../../../domain/repositories/ReservationRepositories";

export class getAllReservations {
  private reservationRepository: ReservationRepository;

  constructor(reservationRepository: ReservationRepository) {
    this.reservationRepository = reservationRepository;
  }

  async execute(): Promise<Reservation[] | Error> {
    const reservations = await this.reservationRepository.getAllReservations();
    return reservations;
  }
}
