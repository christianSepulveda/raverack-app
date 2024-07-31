import { Error } from "../entities/Error";
import { User } from "../entities/Users";

export interface UserRepository {
  login(username: string, password: string): Promise<string | Error>;
}
