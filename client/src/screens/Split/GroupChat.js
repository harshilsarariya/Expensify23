import {
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import {
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Alert,
} from "react-native";
import { Text, Image } from "react-native";

import GeneralNavbar from "../../components/GeneralNavbar";
import ChatCard from "../../components/split/ChatCard";
import * as Linking from "expo-linking";
import { FontAwesome } from "@expo/vector-icons";
import { grpSettle, grpSettleExpense } from "../../api/group";
import AsyncStorage from "@react-native-async-storage/async-storage";
import bgImg from "../../assets/images/bg-dark.jpg";
import { getUserInfo } from "../../api/user";

const GroupChat = () => {
  const route = useRoute();
  const { item } = route.params;
  const [ModalOpen, setModalOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [chatData, setChatData] = useState(item.txs);
  const [userInfo, setUserInfo] = useState({});
  const navigation = useNavigation();
  const [settleMemberId, setSettleMemberId] = useState("");
  const [settleUpiId, setSettleUpiId] = useState("");
  const scrollViewRef = useRef();
  const handleUserId = async () => {
    setUserId(await AsyncStorage.getItem("userId"));
  };

  const handleOnLinkPress = async (url) => {
    try {
      const res = await Linking.canOpenURL(url);
      console.log(url);
      if (res) {
        Linking.openURL(url);
        await grpSettleExpense(item._id, userId, settleMemberId);
        handleName();
      } else {
        Alert.alert("Invalid URL", "Can't open broken link!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleName = async () => {
    let myArr = new Array();
    setUserInfo([]);
    item?.members?.map(async (val, idx) => {
      const data = await getUserInfo(val);
      let settleData = 0;
      if (idx) {
        settleData = await grpSettle(item._id, userId, val);
      }
      let flag = false,
        wuFlag = false;
      item?.txs.map((it) => {
        it.withUsers.forEach((wu) => {
          wuFlag = wu.userId === val;
          return;
        });
        if (wuFlag) {
          flag = it?.settledBy.includes(val);
        }
      });
      myArr.push({
        name: data.name,
        settleData: settleData,
        visible: !flag,
      });
    });
    setUserInfo(myArr);
  };

  useEffect(() => {
    handleUserId();
  }, []);

  useEffect(() => {
    handleName();
  }, [userId]);

  return (
    <>
      <GeneralNavbar
        title={item.name}
        grpId={item._id}
        showDeleteIcon={true}
        deleteHandle={"grpDelete"}
        navigationPath={"MainSplit"}
      />
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
          {/* Settle Modal */}
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
                {item.members.map((val, idx) => (
                  <View key={idx}>
                    {val !== userId && userInfo[idx]?.visible && (
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
                              {userInfo[idx]?.name}
                            </Text>
                            <Text className="text-emerald-400 text-base">
                              <FontAwesome
                                name="rupee"
                                size={14}
                                color="#34d399"
                              />
                              {userInfo[idx]?.settleData?.data}
                            </Text>
                          </View>
                        </View>
                        <TouchableOpacity
                          onPress={() => {
                            // setModalOpen(false);
                            setSettleMemberId(item.members[idx]);
                            setSettleUpiId(userInfo[idx].settleData.linkToPay);
                            setPaymentModalOpen(true);

                            // navigation.navigate("PaySettle");
                          }}
                          className="bg-[#2f3647] p-2 rounded-xl"
                        >
                          <Text className="text-center px-3 text-[#8885ea]">
                            Settle
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                ))}
              </View>
            </View>
          </Modal>

          {/* payment modal */}
          <Modal
            onRequestClose={() => setPaymentModalOpen(false)}
            visible={paymentModalOpen}
            animationType="side"
            transparent={true}
            style={{
              justifyContent: "center",
              alignItems: "center",
              margin: 5,
            }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: "rgba(52, 52, 52, 0.8)",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View className="px-5  space-y-5 absolute top-[550] ">
                <TouchableOpacity
                  className="bg-[#5F68D1] w-full p-2 mt-2 items-center rounded-md"
                  onPress={() => {
                    setPaymentModalOpen(false);
                    Alert.alert(
                      "Settle Expense",
                      "Are you sure you want to proceed?",
                      [
                        {
                          text: "Yes",
                          onPress: async () => {
                            await grpSettleExpense(
                              item._id,
                              userId,
                              settleMemberId
                            );
                            handleName();
                          },
                        },
                        { text: "Decline", style: "cancel" },
                      ]
                    );
                  }}
                >
                  <Text className="text-white tracking-widest text-base uppercase">
                    record as cash payment
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="bg-[#5F68D1] w-full p-2 mt-2 items-center rounded-md"
                  onPress={() => {
                    setPaymentModalOpen(false);
                    handleOnLinkPress(settleUpiId);
                  }}
                >
                  <Text className="text-white tracking-widest text-base uppercase">
                    make upi payment
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* expenses */}
          <ScrollView
            className="mt-3"
            ref={scrollViewRef}
            onContentSizeChange={() =>
              scrollViewRef.current.scrollToEnd({ animated: false })
            }
            showsVerticalScrollIndicator={false}
          >
            <View className="flex flex-col">
              {chatData.map((chatItem, idx) => {
                return (
                  <View className="my-2" key={idx}>
                    <ChatCard item={chatItem} grpId={item._id} />
                  </View>
                );
              })}
            </View>
          </ScrollView>

          {/* bottom buttons */}
          <View className="mb- flex flex-row space-x-5 mx-auto">
            <TouchableOpacity
              className="font-medium p-2 w-2/5 rounded-lg bg-[#6561D2] uppercase py-2 text-center"
              onPress={() => {
                setModalOpen(true);
              }}
            >
              <Text className="text-[#d6d9e3] text-base mx-auto">₹ Settle</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="font-medium rounded-lg p-2 w-2/5  bg-[#6561D2] uppercase py-2 text-center"
              onPress={() => {
                navigation.navigate("GrpAddExpense", { item });
              }}
            >
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
