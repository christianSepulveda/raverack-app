import { BoxNumber } from "../entities/BoxNumber";
import { Error } from "../entities/Error";

export interface BoxNumberRepository {
  getAllBoxNumbers(): Promise<BoxNumber[] | Error>;
}
