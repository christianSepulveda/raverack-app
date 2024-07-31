import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const makeFetch = async (
  endpoint: string,
  method: string,
  body?: any
): Promise<any> => {
  try {
    const serverIP = await AsyncStorage.getItem("serverIP");
    const token = await AsyncStorage.getItem("token");
    const url = `http://${serverIP}/${endpoint}`;

    const configuration = {
      headers: {
        "Content-Type": "application/json",
        Authorization: !token ? "" : token,
      },
    };

    if (method === "POST") {
      const response = await axios.post(url, JSON.stringify(body), {
        headers: configuration.headers,
      });
      return response;
    }
  } catch (error: any) {
    return {
      status: error.response?.status || 500,
      data: error.response?.data || null,
      message: error.message || "Internal Server Error",
    };
  }
};

export default makeFetch;
