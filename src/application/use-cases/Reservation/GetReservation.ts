import { Reservation } from "../../../domain/entities/Reservation";
import { Error } from "../../../domain/entities/Error";
import { ReservationRepository } from "../../../domain/repositories/ReservationRepositories";

export class getReservation {
  private reservationRepository: ReservationRepository;

  constructor(reservationRepository: ReservationRepository) {
    this.reservationRepository = reservationRepository;
  }

  async execute(id: string): Promise<Reservation | Error> {
    const reservation = await this.reservationRepository.getReservationById(id);
    return reservation;
  }
}
