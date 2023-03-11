import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import { Text, Image } from "react-native";

import GeneralNavbar from "../../components/GeneralNavbar";
import ChatCard from "../../components/split/ChatCard";
import * as Linking from "expo-linking";
import { FontAwesome } from "@expo/vector-icons";
import { grpSettle } from "../../api/group";
import AsyncStorage from "@react-native-async-storage/async-storage";
import bgImg from "../../assets/images/bg-dark.jpg";

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
    handleUserId();
  }, []);

  useEffect(() => {
    handleSettle();
  }, [userId]);

  return (
    <>
      <GeneralNavbar title={item.name} navigationPath={"MainSplit"} />
      <ImageBackground
        source={bgImg}
        resizeMode="cover"
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: "#8a3a3a",
        }}
      >
        <View className="p-4 pb-28 h-screen">
          <Modal
            animationType="slide"
            transparent={false}
            visible={ModalOpen}
            onRequestClose={() => setModalOpen(false)}
          >
            <View className="bg-[#2A2E39] h-screen p-4">
              <View className="flex flex-row justify-between">
                <Text className="text-white text-2xl font-medium">
                  Settle Balances
                </Text>
                <TouchableOpacity onPress={() => setModalOpen(false)}>
                  <Text className="font-medium text-xl text-[#8885ea]">
                    Done
                  </Text>
                </TouchableOpacity>
              </View>
              <View className="my-4">
                {item.members.map((val, idx) => {
                  return (
                    <>
                      <View className="p-4 flex flex-row justify-between items-center">
                        <View className="flex flex-row  flex-1 space-x-4 items-center">
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
                            <Text className="text-emerald-400 text-base">
                              <FontAwesome
                                name="rupee"
                                size={14}
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
                          className="bg-[#2f3647] p-2 rounded-xl"
                        >
                          <Text className="text-center px-3 text-[#8885ea]">
                            Settle
                          </Text>
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
          <ScrollView className="mt-3" showsVerticalScrollIndicator={false}>
            <View className="flex flex-col">
              {chatData.map((chatItem, idx) => {
                return (
                  <>
                    <View className="my-2" key={idx}>
                      <ChatCard item={chatItem} />
                    </View>
                  </>
                );
              })}
            </View>
          </ScrollView>
          <View className="mb- flex flex-row space-x-5 mx-auto">
            <TouchableOpacity
              className="font-medium p-2 w-2/5 rounded-lg bg-[#6561D2] uppercase py-2 text-center"
              onPress={() => {
                setModalOpen(true);
              }}
            >
              <Text className="text-[#d6d9e3] text-base mx-auto">₹ Settle</Text>
            </TouchableOpacity>
            <TouchableOpacity className="font-medium rounded-lg p-2 w-2/5  bg-[#6561D2] uppercase py-2 text-center">
              <Text className="text-[#d6d9e3] text-base mx-auto">
                + Expense
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </>
  );
};

export default GroupChat;
