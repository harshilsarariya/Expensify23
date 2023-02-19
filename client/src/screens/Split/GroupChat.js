import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Text } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import GeneralNavbar from "../../components/GeneralNavbar";
import ChatCard from "../../components/split/ChatCard";
import CommonNav from "./CommonNav";

const GroupChat = () => {
  const route = useRoute();
  const { item } = route.params;

  const [chatData, setChatData] = useState(item.txs);

  return (
    <>
      <GeneralNavbar title={"Group Name"} navigationPath={"MainSplit"} />
      <View className="p-4 pb-28 h-screen">
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="flex flex-col">
            {chatData.map((chatItem, idx) => {
              return (
                <View>
                  <View className="my-2" key={idx}>
                    <ChatCard item={chatItem} />
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
        <TouchableOpacity className="bg-indigo-500 rounded-lg w-full mb-3">
          <Text className="font-medium uppercase py-2 text-center  text-white">
            Settle Up
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default GroupChat;
