import { BoxNumber } from "../../domain/entities/BoxNumber";
import { Error } from "../../domain/entities/Error";
import { BoxNumberRepository } from "../../domain/repositories/BoxNumberRepositories";
import {
  createdBoxNumbers,
  updatedBox,
} from "../../UI/types/boxNumbers/BoxNumberResponse";
import makeFetch from "../config/makeFetch";
import getUser from "../config/getUser";

export class BoxNumbersController implements BoxNumberRepository {
  async getAllBoxNumbers(): Promise<BoxNumber[] | Error> {
    const user = await getUser();

    const response = await makeFetch("boxnumber/get", "POST", {
      companyid: user.companyid,
    });

    const error: Error = {
      error: true,
      message: "No se pudieron obtener los espacios.",
      status: response.status,
    };

    if (response.status !== 200) return error;
    return response.data;
  }
  async getBoxNumberDetails(boxnumberid: string): Promise<BoxNumber[] | Error> {
    const response = await makeFetch(`boxnumber/get`, "POST", {
      boxnumberid,
    });

    const error: Error = {
      error: true,
      message: "No se pudieron obtener el detalle del espacio solicitado.",
      status: response.status,
    };

    if (response.status !== 200) return error;
    return response.data;
  }
  async updateBoxNumber(
    boxnumberid: string,
    customerName: string | null,
    customerRut: string | null
  ): Promise<updatedBox[] | Error> {
    const user = await getUser();

    const response = await makeFetch(`boxnumber/update`, "PUT", {
      boxnumberid,
      fullname: customerName,
      rut: customerRut,
      companyid: user.companyid,
    });

    const error: Error = {
      error: true,
      message: "No se pudo actualizar el registro.",
      status: response.status,
    };

    if (response.status !== 200) return error;
    return response.data;
  }

  async addBoxNumbers(amount: number): Promise<createdBoxNumbers | Error> {
    const user = await getUser();

    const response = await makeFetch(`boxnumber/create`, "POST", {
      numberOfBoxes: amount,
      companyid: user.companyid,
    });

    const error: Error = {
      error: true,
      message: "No se pudo actualizar el registro.",
      status: response.status,
    };

    if (response.status !== 200) return error;
    return response.data;
  }
}
