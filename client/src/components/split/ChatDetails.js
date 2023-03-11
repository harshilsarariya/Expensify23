import { Text } from "react-native";
import { View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Image } from "react-native";
import GeneralNavbar from "../GeneralNavbar";
import { useRoute } from "@react-navigation/native";
import moment from "moment";

const TransDetails = () => {
  const route = useRoute();
  const { item } = route.params;

  return (
    <>
      <GeneralNavbar title={"Details"} navigationPath={"GroupChat"} />

      <View className="p-4">
        <View className="flex items-center my-6">
          <Text className="text-white text-3xl font-semibold">
            <FontAwesome name="rupee" size={28} color="white" /> {item.amount}
          </Text>
          <Text className="text-white text-2xl">{item.description}</Text>
        </View>
        <Text className="text-gray-200">
          Created by You on {moment(item.txDate).format("DD-MM-YYYY")}
        </Text>
        <View className="flex flex-row space-x-2 mt-4">
          <View className="px-4 py-2  bg-[#2E3442] rounded-full">
            <Text className="text-sm text-white">{item.category}</Text>
          </View>
        </View>
        <View className="mt-4">
          <Text className="text-white text-lg font-medium">Split Details</Text>
          <View className="mt-2 rounded-xl bg-[#2A2E39] overflow-hidden">
            <Text className="bg-[#2A2B47] text-white py-2 px-4">Paid By</Text>
            <View className="p-4 flex flex-row justify-between items-center">
              <View className="basis-1/5">
                <Image
                  className="h-10 w-10 rounded-full"
                  source={require("../../assets/images/avatar2.png")}
                />
              </View>
              <Text className="text-white text-sm basis-3/5">
                {item.paidBy.substr(15)}
              </Text>
              <Text className="text-white basis-1/5 items-center">
                <FontAwesome name="rupee" size={13} color="white" />{" "}
                {item.amount}
              </Text>
            </View>
            <Text className="bg-[#2A2B47] text-white py-2 px-4">
              Shared With
            </Text>
            {item?.withUsers.map((wu, idx) => {
              return (
                <>
                  <View className="p-4 flex flex-row justify-between items-center">
                    <View className="basis-1/5">
                      <Image
                        className="h-10 w-10 rounded-full"
                        source={require("../../assets/images/avatar2.png")}
                      />
                    </View>
                    <Text className="text-white text-sm basis-3/5">
                      {wu.userId.substr(15)}
                    </Text>
                    <Text className="text-white basis-1/5">
                      <FontAwesome name="rupee" size={13} color="white" />{" "}
                      {wu.owe}
                    </Text>
                  </View>
                </>
              );
            })}
          </View>
        </View>
      </View>
    </>
  );
};

export default TransDetails;
