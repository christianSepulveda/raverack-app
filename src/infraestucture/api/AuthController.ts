import { Error } from "../../domain/entities/Error";
import { UserRepository } from "../../domain/repositories/UserRepositories";
import makeFetch from "../config/makeFetch";

export class AuthController implements UserRepository {
  async login(username: string, password: string): Promise<string | Error> {
    const body = { username, password };
    const response = await makeFetch("user/login", "POST", body);

    const error: Error = {
      error: true,
      message: "Usuario o contraseña incorrectos.",
      status: response.status,
    };

    if (response.status !== 200) return error;
    return response.data[0].token;
  }
}
