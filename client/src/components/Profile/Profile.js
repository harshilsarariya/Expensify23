import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import GeneralNavbar from "../GeneralNavbar";
import { FontAwesome, SimpleLineIcons, AntDesign } from "@expo/vector-icons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = ({ setTabShown }) => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const isFocused = useIsFocused();

  const handleName = async () => {
    setName(await AsyncStorage.getItem("name"));
    setPhoneNumber(await AsyncStorage.getItem("phoneNumber"));
  };

  useEffect(() => {
    handleName();
  }, []);

  useEffect(() => {
    setTabShown(false);
  }, [isFocused]);

  return (
    <View>
      <GeneralNavbar title={"Profile"} navigationPath={"Personal"} />
      <View className="mx-5 mt-8">
        <View className="flex flex-row ">
          <View className="p-2 bg-[#9BE4D9] rounded-full w-16 items-center">
            <FontAwesome name="user-o" size={42} color="white" />
          </View>

          <View className="ml-8">
            <View className="flex flex-row justify-between w-9/12 items-center">
              <Text className="text-white text-xl">{name}</Text>
              <TouchableOpacity>
                <AntDesign name="edit" size={22} color="#4E4C8E" />
              </TouchableOpacity>
            </View>
            <Text className="text-white text-base">{phoneNumber}</Text>
          </View>
        </View>
        <View className="w-11/12 border-b-2 border-[#43424F] my-5 ml-8" />
        <TouchableOpacity
          className="flex flex-row items-center space-x-5 ml-3"
          onPress={() => navigation.navigate("Settings")}
        >
          <SimpleLineIcons name="settings" size={18} color="#737184" />
          <Text className="text-[#D7D8DD] text-base">Settings</Text>
        </TouchableOpacity>
        <View className="w-11/12 border-b-2 border-[#43424F] my-5 ml-8" />
        <TouchableOpacity className="flex flex-row items-center space-x-5 ml-3">
          <SimpleLineIcons name="logout" size={18} color="#737184" />
          <Text className="text-[#D7D8DD] text-base">Log out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;
