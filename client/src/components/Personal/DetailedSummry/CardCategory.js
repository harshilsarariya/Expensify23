import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

const CardCategory = ({ navigation, item }) => {
  return (
    <TouchableOpacity
      className="flex flex-row bg-[#2e3138] rounded-xl p-3 my-2 items-center"
      onPress={() => {
        navigation.navigate("CategoryWiseExpense", {
          category: item?.category,
        });
      }}
    >
      <View className="bg-[#353c4c] rounded-full p-3">
        <Ionicons name="ios-pizza-outline" size={24} color="orange" />
      </View>
      <View className="flex flex-row justify-between ml-5 w-[65vw]">
        <View>
          <Text className="text-[#AFB0B4] text-xs">{item?.category}</Text>
          <Text className="text-white mt-2">{item?.expense} Expense</Text>
        </View>
        <View className="items-end">
          <Text className="text-[#AFB0B4] text-xs ">Your Share</Text>
          <Text className="text-white mt-2">₹ {item?.total}</Text>
        </View>
        <View className="mt-2">
          <AntDesign name="right" size={24} color="#6561CE" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardCategory;
