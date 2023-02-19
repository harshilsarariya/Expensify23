import React, { useEffect, useState } from "react";
import { Alert, Image, Text, View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { updateName } from "../../api/user";
import CommonNav from "../../screens/Split/CommonNav";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GeneralNavbar from "../GeneralNavbar";

const config = {
  method: "PUT",
  headers: {
    "content-type": "application/json",
  },
};

const UpdateProfile = () => {
  const [name, setName] = useState("Harshil");
  const [userId, setUserId] = useState("");

  const handleUserId = async () => {
    setUserId(await AsyncStorage.getItem("userId"));
  };

  const handleSubmit = async () => {
    const obj = {
      name: name,
      id: userId,
    };

    const data = await updateName(userId, obj, config);
    if (data.data.name === name) {
      Alert.alert("Name updated successfully!");
    } else {
      Alert.alert("Some Error occured!");
    }
  };

  useEffect(() => {
    handleUserId();
  }, []);

  return (
    <>
      <GeneralNavbar title={"Update Profile"} navigationPath={"Settings"} />
      <View className="p-4 h-screen">
        <View className="flex items-center my-8">
          <Image
            className="h-32 w-32 rounded-full"
            source={require("../../assets/images/avatar2.png")}
          />
        </View>
        <View>
          <Text className="text-white font-medium text-lg">Name</Text>
          <TextInput
            className="bg-white rounded-lg px-4 py-2"
            value={name}
            onChangeText={setName}
          />
        </View>
        <TouchableOpacity
          onPress={handleSubmit}
          className="bg-[#5F68D1] py-2 rounded-lg mt-4"
        >
          <Text className="text-center text-lg uppercase text-white">Save</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default UpdateProfile;
