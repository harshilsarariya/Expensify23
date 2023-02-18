import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import GeneralNavbar from "../GeneralNavbar";
// import { addBudget } from "../../api/user";
import AsyncStorage from "@react-native-async-storage/async-storage";

const config = {
  method: "PUT",
  headers: {
    "content-type": "application/json",
  },
};

const BudgetCycle = () => {
  const [budget, setBudget] = useState(0);
  const [userId, setUserId] = useState("");

  const obj = {
    budget: budget,
  };

  const handleUserId = async () => {
    setUserId(await AsyncStorage.getItem("userId"));
  };

  const handleBudget = async () => {
    // await addBudget(userId, obj, config);
    Alert.alert("Success", "Budget set successfully");
  };

  useEffect(() => {
    handleUserId();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 h-screen ">
          <GeneralNavbar navigationPath={"Settings"} title={"Set Budget"} />

          <View className="mx-5 mt-5">
            <Text className="text-[#A8A9AE] text-base ">
              What's your budget amount
            </Text>
            <TextInput
              value={budget}
              onChangeText={setBudget}
              placeholder="₹"
              placeholderTextColor={"white"}
              keyboardType="decimal-pad"
              className="bg-[#2A2E39] text-white p-2 rounded-lg "
            />
          </View>
          <TouchableOpacity
            className="bg-[#5F68D1] w-screen p-2 absolute bottom-10 items-center rounded-md"
            onPress={handleBudget}
          >
            <Text className="text-white tracking-widest text-base">
              SAVE BUDGET
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default BudgetCycle;
