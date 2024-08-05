import { Error } from "../entities/Error";

export interface UserRepository {
  login(username: string, password: string): Promise<string | Error>;
}
