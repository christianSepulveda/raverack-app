import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import COLORS from "../../styles/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../../../domain/entities/Users";
import { decodeToken } from "../../../infraestucture/config/tokenHandler";

type Props = {
  DrawerProps: DrawerContentComponentProps;
};

const DrawerMenuScreen = ({ DrawerProps }: Props) => {
  const [user, setUser] = useState<User>();

  const getUser = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      const decodedUser = (await decodeToken(token)) as User;
      setUser(decodedUser);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <DrawerContentScrollView
      {...DrawerProps}
      contentContainerStyle={{ flex: 1, marginTop: "-20%" }}
    >
      <View
        style={{
          flex: 2,
          backgroundColor: COLORS.purple,
        }}
      >
        <View style={{ position: "absolute", bottom: 16, left: 16 }}>
          <Text
            style={{ fontSize: 20, fontWeight: "600", color: COLORS.white }}
          >
            RaveRack App
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "400",
              color: COLORS.white,
              marginTop: 5,
            }}
          >
            {user ? user.username : ""}
          </Text>
        </View>
      </View>
      <View style={{ flex: 10, marginTop: 10 }}>
        <DrawerItemList {...DrawerProps} />
      </View>
    </DrawerContentScrollView>
  );
};

export default DrawerMenuScreen;
