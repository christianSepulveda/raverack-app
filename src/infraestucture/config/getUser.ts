import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../../domain/entities/Users";

export default async function getUser() {
  const stringUser = await AsyncStorage.getItem("user");
  const user = JSON.parse(stringUser || "{}") as User;
  return user;
}
