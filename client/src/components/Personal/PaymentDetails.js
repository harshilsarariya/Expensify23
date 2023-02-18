import { View, Text } from "react-native";
import React from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

const PaymentDetails = ({ navigation }) => {
  const route = useRoute();
  const { item } = route.params;

  return (
    <>
      {/* Back navigation */}
      <View className="flex flex-row items-center m-3">
        <Ionicons
          name="chevron-back-outline"
          style={{ marginRight: 10 }}
          size={22}
          color="white"
          onPress={navigation.goBack}
        />
        <Text className="text-white text-lg ">Your Payment</Text>
      </View>

      <View className="m-3 p-3 bg-[#2A2E39] rounded-xl ">
        <View className=" flex flex-row justify-between">
          <View>
            <Text className="text-[#B2B2B6] text-base">
              Your {item.Description} Share
            </Text>
            <Text className="text-white mt-2 text-lg"> ₹ {item.Amount}</Text>
          </View>
          <View className="items-center">
            <Text className="text-[#9c93d4] text-base"></Text>
            <View className="p-3 bg-[#abbda7] rounded-full w-12 h-12 mt-2">
              <MaterialIcons name="done" size={24} color="green" />
            </View>
          </View>
        </View>
        <Text className="text-gray-400 my-5">
          - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        </Text>

        <View>
          <Text className="text-white font-bold text-base">Rent Details</Text>

          <View className="flex flex-row justify-between mt-2">
            <Text className="text-[#C0BFC0]">Total Amount</Text>
            <Text className="text-[#e4e3ea]">₹ {item.Amount}</Text>
          </View>
          <View className="flex flex-row justify-between mt-2">
            <Text className="text-[#C0BFC0]">Owner's Name</Text>
            <Text className="text-[#e4e3ea]">{item.From}</Text>
          </View>
          <View className="flex flex-row justify-between mt-2">
            <Text className="text-[#C0BFC0]">Owner's Mobile No</Text>
            <Text className="text-[#e4e3ea]">9510142642</Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default PaymentDetails;
