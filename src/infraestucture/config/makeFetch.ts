import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { AppNavigationProps } from "../../UI/types/app/AppStackParamList";
import { Alert } from "react-native";

const makeFetch = async (
  endpoint: string,
  method: string,
  body?: any
): Promise<any> => {
  try {
    const serverIP = await AsyncStorage.getItem("serverIP");
    const token = await AsyncStorage.getItem("token");
    //const url = `http://${serverIP}/${endpoint}`;

    const url = "https://raverack-api-nodejs.onrender.com/" + endpoint;

    const configuration = {
      headers: {
        "Content-Type": "application/json",
        authorization: !token ? "" : token,
      },
    };

    console.log("------------------------------------------------------------------");
    console.log("METHOD: ", method);
    console.log("URL: ", url);
    console.log("BODY: ", JSON.stringify(body));
    console.log("HEADERS: ", configuration);

    if (method === "POST") {
      const response = await axios.post(url, JSON.stringify(body), {
        headers: configuration.headers,
      });
      return response;
    }

    if (method === "GET") {
      const response = await axios.get(url, {
        headers: configuration.headers,
      });
      return response;
    }

    if (method === "PUT") {
      const response = await axios.put(url, JSON.stringify(body), {
        headers: configuration.headers,
      });
      return response;
    }
  } catch (error: any) {
    console.log(error);

    const response = {
      status: error.response?.status || 500,
      data: error.response?.data || null,
      message: error.message || "Internal Server Error",
    };

    return response;
  }
};

export default makeFetch;
