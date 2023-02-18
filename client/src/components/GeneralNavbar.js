import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const GeneralNavbar = ({ title, navigationPath }) => {
  const navigation = useNavigation();

  return (
    <View>
      <View className="flex flex-row items-center mt-2 ml-4">
        <TouchableOpacity onPress={() => navigation.navigate(navigationPath)}>
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white ml-10 text-lg">{title}</Text>
      </View>
    </View>
  );
};

export default GeneralNavbar;
