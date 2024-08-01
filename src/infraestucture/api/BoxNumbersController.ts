import { BoxNumber } from "../../domain/entities/BoxNumber";
import { Error } from "../../domain/entities/Error";
import { BoxNumberRepository } from "../../domain/repositories/BoxNumberRepositories";
import makeFetch from "../config/makeFetch";

export class BoxNumbersController implements BoxNumberRepository {
  async getAllBoxNumbers(): Promise<BoxNumber[] | Error> {
    const response = await makeFetch("boxnumber/get", "POST", {});

    const error: Error = {
      error: true,
      message: "No se pudieron obtener los espacios.",
    };

    if (response.status !== 200) return error;
    return response.data;
  }
  async getBoxNumberDetails(boxNumber: string): Promise<BoxNumber[] | Error> {
    const response = await makeFetch(`boxnumber/get`, "POST", {
      boxNumber,
    });

    const error: Error = {
      error: true,
      message: "No se pudieron obtener el detalle del espacio solicitado.",
    };

    if (response.status !== 200) return error;
    return response.data;
  }
}
