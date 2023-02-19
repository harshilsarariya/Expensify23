import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View, Modal, TouchableOpacity, ScrollView } from "react-native";
import { Text, Image } from "react-native";

import GeneralNavbar from "../../components/GeneralNavbar";
import ChatCard from "../../components/split/ChatCard";
import * as Linking from "expo-linking";
import CommonNav from "./CommonNav";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { grpSettle } from "../../api/group";
import AsyncStorage from "@react-native-async-storage/async-storage";
const GroupChat = () => {
  const route = useRoute();
  const { item } = route.params;
  const [ModalOpen, setModalOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [withuserId, setWithuserId] = useState();
  const [settleData, setSettleData] = useState("");
  const [chatData, setChatData] = useState(item.txs);
  const navigation = useNavigation();

  const handleUserId = async () => {
    setUserId(await AsyncStorage.getItem("userId"));
  };

  useEffect(() => {
    handleUserId();
  }, []);

  const handleSettle = async () => {
    const { data, linkToPay } = await grpSettle(
      item._id,
      userId,
      item.members[1]
    );

    setSettleData({ data, linkToPay });
  };

  const handleOnLinkPress = async (url) => {
    try {
      const res = await Linking.canOpenURL(url);
      if (res) {
        Linking.openURL(url);
      } else {
        Alert.alert("Invalid URL", "Can't open broken link!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleSettle();
  }, [userId]);

  return (
    <>
      <GeneralNavbar title={"Group Name"} navigationPath={"MainSplit"} />
      <View className="p-4 pb-28 h-screen">
        <Modal
          animationType="slide"
          transparent={false}
          visible={ModalOpen}
          onRequestClose={() => setModalOpen(false)}
        >
          <View className="bg-slate-800 h-screen p-8">
            <View className="flex flex-row justify-between">
              <Text className="text-white text-2xl font-medium">
                Settle Balances
              </Text>
              <TouchableOpacity onPress={() => setModalOpen(false)}>
                <Text className="font-medium text-xl text-purple-400">
                  Done
                </Text>
              </TouchableOpacity>
            </View>
            <View className="my-4">
              {item.members.map((val, idx) => {
                return (
                  <>
                    <View className="p-4 flex flex-row justify-between items-center">
                      <View className="flex flex-row  flex-1 space-x-4">
                        <View>
                          <Image
                            className="w-12 h-12 rounded-full"
                            source={require("../../assets/images/avatar2.png")}
                          />
                        </View>
                        <View>
                          <Text className="text-white font-medium">
                            {val.substr(15)}
                          </Text>
                          <Text className="text-emerald-400 text-lg">
                            <FontAwesome
                              name="rupee"
                              size={20}
                              color="#34d399"
                            />{" "}
                            {settleData.data}
                          </Text>
                        </View>
                      </View>
                      <TouchableOpacity
                        onPress={() => {
                          handleOnLinkPress(settleData.linkToPay);
                          setModalOpen(false);
                          navigation.navigate("PaySettle");
                        }}
                        className="bg-slate-700 p-2 rounded-xl"
                      >
                        <Text className="text-center text-white">Settle</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                );
              })}
              {/* <View className="flex flex-row justify-between">
                <Text className="text-white font-medium">Total</Text>
                <Text className="text-emerald-400 text-2xl">
                  <FontAwesome name="rupee" size={24} color="#34d399" /> 55.4
                </Text>
              </View> */}
            </View>
          </View>
        </Modal>
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
        <TouchableOpacity
          onPress={() => {
            setModalOpen(true);
            console.log("asdns");
          }}
          className="bg-indigo-500 rounded-lg w-full mb-3"
        >
          <Text className="font-medium uppercase py-2 text-center  text-white">
            Settle Up
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default GroupChat;
