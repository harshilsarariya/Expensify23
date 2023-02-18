import { Text } from "react-native";
import { View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import GeneralNavbar from "../GeneralNavbar";

const ChatCard = () => {
    const navigation = useNavigation();
  return (
    <>
      <TouchableOpacity onPress={() => navigation.navigate("TransDetails")} className="rounded-2xl overflow-hidden w-60 bg-[#2A2E39]">
        <View className="border border-white mt-2 ml-2 rounded-full w-24 p-1 px-4">
          <Text className="text-sm text-white">📅 4 Oct</Text>
        </View>
        <View className="h-24 justify-center flex items-center">
          <Text className="text-rose-300 text-3xl">
            <FontAwesome name="rupee" size={28} color="#fda4af" /> 50
          </Text>
        </View>
        <View className="bg-[#2E3442] p-4">
          <Text className="text-center text-white">You'll pay for</Text>
          <Text className="text-center text-white">Jay Maharaj Lunch</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default ChatCard;
