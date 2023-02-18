import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SimpleLineIcons, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Navbar = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("User");

  const handleUserName = async () => {
    // API - fetch User name
    setName(await AsyncStorage.getItem("name"));
  };

  useEffect(() => {
    handleUserName();
  }, []);

  return (
    <View className="my-2">
      <View className="flex flex-row items-center">
        <TouchableOpacity
          onPress={() => navigation.navigate("ProfileNavigation")}
        >
          <FontAwesome name="user" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-lg mx-2 ml-5">Hi {name} </Text>
        <SimpleLineIcons name="badge" size={20} color="white" />
      </View>
    </View>
  );
};

export default Navbar;
