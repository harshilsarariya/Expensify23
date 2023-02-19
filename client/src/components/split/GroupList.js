import { Image, Text } from "react-native";
import { View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { getAllGrp } from "../../api/group";
import { useEffect, useState } from "react";

const GroupList = () => {
  const navigator = useNavigation();
  const [grpData, setGrpData] = useState([]);
  const isFocus = useIsFocused();

  const handleGrpInfo = async () => {
    const data = await getAllGrp();
    setGrpData(data);
  };

  useEffect(() => {
    handleGrpInfo();
  }, []);

  useEffect(() => {
    handleGrpInfo();
  }, [isFocus]);

  return (
    <>
      <View className="flex flex-row justify-between my-4">
        <Text className="text-white font-medium text-xl">Groups</Text>
        <TouchableWithoutFeedback
          onPress={() => navigator.navigate("CreateGroup")}
        >
          <Text className="text-indigo-600 font-medium">
            <AntDesign name="plus" size={16} color="#6366f1" /> Create Group
          </Text>
        </TouchableWithoutFeedback>
      </View>
      <ScrollView className="mb-48" showsVerticalScrollIndicator={false}>
        <View className="flex space-y-4 mb-4">
          {grpData.map((item, idx) => {
            return (
              <TouchableOpacity
                onPress={() => navigator.navigate("GroupChat", { item })}
                key={idx}
              >
                <GroupCard item={item} />
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </>
  );
};

const GroupCard = ({ item }) => {
  return (
    <>
      <View className="flex flex-row justify-between items-center p-2">
        <View className="bg-gray-100 flex rounded-full">
          {/* <Image className="h-16 w-16 rounded-full" source={require("../../assets/images/avatar2.png")} /> */}
          <Text className="text-3xl font-bold px-4 py-2 text-center text-blue-900">
            {item.name[0]}
          </Text>
        </View>
        <View className="basis-3/4">
          <Text className="text-white text-lg font-medium">{item.name}</Text>
        </View>
      </View>
    </>
  );
};

export default GroupList;
