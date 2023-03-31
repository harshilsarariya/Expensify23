import React from "react";
import { View, Text, StatusBar, Image } from "react-native";
import AppIcon from "../../assets/images/AppIcon.jpg";

const SplashScreen = () => {
  return (
    <>
      <StatusBar backgroundColor="#5F68D1" barStyle="light-content" />
      <View className="h-16 bg-[#5F68D1] items-center">
        <Image
          style={{ width: 80, height: 80, borderRadius: 10, marginTop: 20 }}
          source={AppIcon}
        />
      </View>
      <View className=" h-screen bg-[#1E2128]">
        <View className="flex items-center justify-center mt-16">
          <Text className="text-white text-2xl font-medium">Welcome to</Text>
          <Text className="text-[#6a71b8] text-2xl font-extrabold tracking-wide">
            Expensify
          </Text>
        </View>
      </View>
    </>
  );
};

export default SplashScreen;
