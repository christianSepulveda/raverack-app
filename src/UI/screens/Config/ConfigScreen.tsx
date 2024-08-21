import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { ConfigMenuType } from "../../types/config/ConfigMenu";
import Ionicons from "react-native-vector-icons/Ionicons";
import COLORS from "../../styles/colors";
import AddBoxNumbersModal from "./AddBoxNumbers/AddBoxNumbersModal";

type Props = {
  handleLogout: () => void;
  goToCustomers: () => void;
  showAddBoxNumbersModal: boolean;
  setShowAddBoxNumbersModal: () => void;
  onAddBoxNumbers: (amount: number) => void;
};

const ConfigScreen = (props: Props) => {
  const ConfigMenuOptions: ConfigMenuType[] = [
    {
      id: "1",
      label: "Agregar Espacios",
      icon: () => (
        <Ionicons
          name="add-circle"
          size={24}
          color={COLORS.purple}
          style={{ flex: 1 }}
        />
      ),
      action: () => props.setShowAddBoxNumbersModal(),
    },
    {
      id: "2",
      label: "Ver Historico de Clientes",
      icon: () => (
        <Ionicons
          name="person"
          size={24}
          color={COLORS.purple}
          style={{ flex: 1 }}
        />
      ),
      action: props.goToCustomers,
    },
    {
      id: "4",
      label: "Cerrar Sesión",
      icon: () => (
        <Ionicons
          name="log-out"
          size={24}
          color={COLORS.purple}
          style={{ flex: 1 }}
        />
      ),
      action: props.handleLogout,
    },
  ];

  const MenuItem = ({ item }: { item: ConfigMenuType }) => {
    const Icon = item.icon;
    return (
      <TouchableOpacity
        style={{
          borderBottomColor: COLORS.gray,
          borderBottomWidth: 1,
          backgroundColor: COLORS.white,
          paddingHorizontal: 10,
          paddingVertical: 20,
          flexDirection: "row",
          alignItems: "center",
        }}
        onPress={item.action}
      >
        <Text style={{ flex: 16, fontSize: 18, fontWeight: "500" }}>
          {item.label}
        </Text>
        <Icon />
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={ConfigMenuOptions}
        renderItem={(item) => MenuItem(item)}
      />

      <AddBoxNumbersModal
        visibility={props.showAddBoxNumbersModal}
        onCancel={props.setShowAddBoxNumbersModal}
        onAddBoxNumbers={props.onAddBoxNumbers}
      />
    </View>
  );
};

export default ConfigScreen;
