import { View, Text, TextInput, Switch } from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import {
  FontAwesome5,
  FontAwesome,
  MaterialCommunityIcons,
  Fontisto,
} from "@expo/vector-icons";
// import { addTransaction } from "../../api/user";
import moment from "moment";
import { useIsFocused } from "@react-navigation/native";
import GeneralNavbar from "../GeneralNavbar";

const config = {
  method: "POST",
  headers: {
    "content-type": "application/json",
  },
};

const AddExpense = ({ setTabShown, navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Food");
  const [split, setSplit] = useState("No");

  const isFocused = useIsFocused();
  const handleExpense = async () => {
    // const data = await addTransaction(userId, obj, config);
    // if (data.user.status.acknowledged) {
    navigation.goBack(null);
    // }
  };

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  useEffect(() => {
    setTabShown(false);
  }, []);

  useEffect(() => {
    setTabShown(true);
  }, [isFocused]);

  return (
    <>
      <GeneralNavbar title={"Add Expense"} navigationPath={"Personal-Home"} />
      <View className="mx-3">
        <View className="mt-5 items-center">
          <TextInput
            placeholder="₹ 0"
            className="text-[#C9CACD] text-xl"
            placeholderTextColor="#C9CACD"
            onChangeText={setAmount}
          />
          <TextInput
            placeholder="What was this expense for?"
            placeholderTextColor="#6c6d70"
            className="bg-[#2A2E39] mt-3 text-[#C9CACD] w-4/6 p-2 rounded-lg"
            onChangeText={setDescription}
          />
        </View>
        <View className="">
          <View className="flex flex-row justify-between mt-8">
            <Text className="text-[#BDBEC3]">Category</Text>
            <TouchableOpacity>
              <Text className="text-[#5651A0]">+ More Categories</Text>
            </TouchableOpacity>
          </View>
          <View className="flex flex-row space-x-5 mt-4">
            <View className="bg-[#2A2D3C] p-2 w-8 h-8 rounded-full items-center">
              <FontAwesome5 name="pizza-slice" size={15} color="#aaaaaa" />
            </View>

            <View className="bg-[#2A2D3C] p-2 rounded-full w-8 h-8">
              <FontAwesome5 name="shopping-cart" size={16} color="#aaaaaa" />
            </View>

            <View className="bg-[#2A2D3C] p-2 rounded-full w-8 h-8">
              <FontAwesome name="plane" size={20} color="#aaaaaa" />
            </View>
            <View className="bg-[#2A2D3C] p-2 rounded-full w-8 h-8">
              <MaterialCommunityIcons
                name="popcorn"
                size={19}
                color="#aaaaaa"
              />
            </View>
            <View className="bg-[#2A2D3C] p-2 rounded-full w-8 h-8">
              <Fontisto name="shopping-bag-1" size={19} color="#aaaaaa" />
            </View>
          </View>
          <View className="mt-5 flex flex-row justify-between items-center">
            <Text className="text-[#CFD0D6]">
              Are you splitting this expense?
            </Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled ? "#5F68D1" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
          <View className="items-center top-[420] ">
            <TouchableOpacity
              className="bg-[#5F68D1] w-full p-2 mt-2 items-center rounded-md"
              onPress={handleExpense}
            >
              <Text className="text-white tracking-widest text-base">
                SAVE EXPENSE
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default AddExpense;
