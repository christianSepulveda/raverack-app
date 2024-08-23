import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React from "react";
import COLORS from "../../../styles/colors";
import { Customer } from "../../../../domain/entities/Customer";
import { Error } from "../../../../domain/entities/Error";
import SearchInput from "../../../components/SearchInput";

type Props = {
  customers: Customer[];
  error: Error;
  search: string;
  setSearch: (search: string) => void;
  loading: boolean;
};

const CustomersScreen = (props: Props) => {
  const TableLabel = ({
    text,
    isID,
    flex,
  }: {
    text: string;
    isID?: boolean;
    flex?: number;
  }) => (
    <Text
      style={{
        flex,
        fontSize: 18,
        fontWeight: "500",
        color: isID ? COLORS.darkGray : "#000",
      }}
      numberOfLines={1}
    >
      {text}
    </Text>
  );

  const RenderItem = (item: Customer, index: number) => (
    <View
      style={{
        flexDirection: "row",
        paddingHorizontal: 16,
        paddingVertical: 20,
        borderBottomColor: COLORS.gray,
        borderBottomWidth: 1,
        borderTopColor: index === 0 ? COLORS.gray : "transparent",
        borderTopWidth: index === 0 ? 1 : 0,
      }}
    >
      <TableLabel text={`${index + 1}`} isID flex={1} />
      <TableLabel text={item.fullname} flex={6} />
      <TableLabel text={item.rut} flex={3} />
    </View>
  );

  return (
    <View style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <SearchInput
        inputType="text"
        text={props.search}
        setText={props.setSearch}
        onSubmitEditing={() => {}}
      />

      {props.loading ? (
        <>
          <View style={{ marginTop: 20 }} />
          <ActivityIndicator size="large" color={COLORS.purple} />
        </>
      ) : (
        <FlatList
          data={props.customers}
          renderItem={(item) => RenderItem(item.item, item.index)}
        />
      )}
    </View>
  );
};

export default CustomersScreen;
