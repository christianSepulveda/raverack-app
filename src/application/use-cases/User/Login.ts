import { Error } from "../../../domain/entities/Error";
import { UserRepository } from "../../../domain/repositories/UserRepositories";

export class LoginUser {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  isValid(username: string, password: string): Error {
    if (!username || username.length === 0) {
      return {
        error: true,
        message: "Debe ingresar un usuario para continuar.",
      };
    }

    if (!password || password.length === 0) {
      return {
        error: true,
        message: "Debe ingresar una contraseña para continuar.",
      };
    }

    return { error: false };
  }

  async execute(username: string, password: string): Promise<string | Error> {
    const valid = this.isValid(username, password);
    if (valid.error) return valid;

    const token = await this.userRepository.login(username, password);
    return token;
  }
}
