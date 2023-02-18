import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import GeneralNavbar from "../GeneralNavbar";
import {
  Ionicons,
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Setting = () => {
  const navigation = useNavigation();
  return (
    <View>
      <GeneralNavbar title={"Settings"} navigationPath={"Profile"} />
      <View className="mt-5">
        <View className="flex flex-row space-x-6 mx-auto my-2">
          <TouchableOpacity onPress={() => navigation.navigate("UpdateProfile")} className="bg-[#2A2E39] w-36 p-2 pl-3 rounded-lg">
            <FontAwesome name="user" size={24} color="#FBB567" />
            <Text className="text-white text-base mt-2">Personal Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-[#2A2E39] w-36 p-2 pl-3 rounded-lg"
            onPress={() => navigation.navigate("BudgetCycle")}
          >
            <Ionicons name="ios-wallet" size={24} color="#625C95" />
            <Text className="text-white text-base mt-2">Budget Cycle</Text>
          </TouchableOpacity>
        </View>
        <View className="flex flex-row space-x-6 mx-auto my-2">
          <TouchableOpacity className="bg-[#2A2E39] w-36 p-2 pl-3 rounded-lg">
            <MaterialIcons name="cloud-download" size={24} color="#43ab39" />
            <Text className="text-white text-base mt-2">Export Data</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-[#2A2E39] w-36 p-2 pl-3 rounded-lg">
            <MaterialCommunityIcons
              name="cloud-refresh"
              size={24}
              color="#F28300"
            />
            <Text className="text-white text-base mt-2">Reset Data</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Setting;
