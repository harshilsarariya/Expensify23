import { View, Text } from "react-native";
import React from "react";
import Balance from "../../components/split/Balance";
import GroupChat from "./GroupChat";
import GroupList from "../../components/split/GroupList";
import { ScrollView } from "react-native";
import GeneralNavbar from "../../components/GeneralNavbar";
import { useIsFocused } from "@react-navigation/native";

const SplitHome = ({ navigation }) => {
  return (
    <>
      <GeneralNavbar title={"Split Expense"} navigationPath={"Personal"} />
      <View className="p-4 mb-24">
        <Balance />
        <GroupList />
      </View>
    </>
  );
};

export default SplitHome;
