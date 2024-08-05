import { updatedBox } from "../../UI/types/boxNumbers/BoxNumberResponse";
import { BoxNumber } from "../entities/BoxNumber";
import { Error } from "../entities/Error";

export interface BoxNumberRepository {
  getAllBoxNumbers(): Promise<BoxNumber[] | Error>;
  getBoxNumberDetails(boxNumber: string): Promise<BoxNumber[] | Error>;
  updateBoxNumber(
    boxNumber: string,
    customerName: string | null,
    customerRut: string | null
  ): Promise<updatedBox[] | Error>;
}
