import { Text } from "react-native";
import { View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GeneralNavbar from "../GeneralNavbar";
import moment from "moment";
import { useEffect, useId, useState } from "react";

const ChatCard = ({ item }) => {
  const navigation = useNavigation();
  const [userId, setUserId] = useState("");

  const handleUserId = async () => {
    setUserId(await AsyncStorage.getItem("userId"));
  };

  let letUserMe;
  item?.withUsers.forEach((wu) => {
    console.log(wu);
    if (wu.userId === userId) {
      letUserMe = wu;
    }
  });
  console.log("letmeuse", letUserMe);

  useEffect(() => {
    handleUserId();
  }, []);

  return (
    <>
      <TouchableOpacity
        onPress={() => navigation.navigate("TransDetails", { item })}
        className={`rounded-2xl overflow-hidden w-60 bg-[#2A2E39] ${
          item?.paidBy === userId ? "self-end" : "self-start"
        }`}
      >
        <View className="border border-white mt-2 ml-2 rounded-full w-24 p-1 px-4">
          <Text className="text-sm text-white">
            {moment(item?.txDate).format("DD/MM/YY")}
          </Text>
        </View>
        <View className="flex flex-col">
          {/* item?.paidBy === userId */}
          {!letUserMe ? (
            <>
              <View className="h-24 flex items-center justify-center ">
                <Text className="text-[#b9fda4] text-3xl">
                  <FontAwesome name="rupee" size={28} color="#b9fda4" />{" "}
                  {item.lent}
                </Text>
              </View>
              <View className="bg-[#2E3442] p-4">
                <Text className="text-center text-white">You'll get for</Text>
                <Text className="text-center text-white">
                  Jay Maharaj Lunch
                </Text>
              </View>
            </>
          ) : (
            <>
              <View className="h-24 justify-center flex items-center">
                <Text className="text-rose-300 text-3xl">
                  <FontAwesome name="rupee" size={28} color="#fda4af" />{" "}
                  {letUserMe.owe}
                </Text>
              </View>
              <View className="bg-[#2E3442] p-4">
                <Text className="text-center text-white">You'll pay for</Text>
                <Text className="text-center text-white">
                  {item.description}
                </Text>
              </View>
            </>
          )}
        </View>
      </TouchableOpacity>
    </>
  );
};

export default ChatCard;
