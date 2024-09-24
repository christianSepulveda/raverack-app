import AsyncStorage from "@react-native-async-storage/async-storage";

export const base64UrlToBase64 = (base64Url: string) => {
  let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4 !== 0) {
    base64 += "=";
  }
  return base64;
};

export const decodeToken = async (token: string) => {
  try {
    const payload = token.split(".")[1];
    const base64Payload = base64UrlToBase64(payload);
    return JSON.parse(atob(base64Payload));
  } catch (error) {
    console.log("Invalid token:", error);
    await AsyncStorage.removeItem("token");
    return "";
  }
};
