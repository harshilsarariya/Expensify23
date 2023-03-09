import { View, Text, TextInput, Switch } from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  Fontisto,
  Foundation,
} from "@expo/vector-icons";
// import { addTransaction } from "../../api/user";
import moment from "moment";
import { useIsFocused } from "@react-navigation/native";
import GeneralNavbar from "../GeneralNavbar";
import { addTransaction } from "../../api/user";
import AsyncStorage from "@react-native-async-storage/async-storage";

const config = {
  method: "PUT",
  headers: {
    "content-type": "application/json",
  },
};

const AddExpense = ({ setTabShown, navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("General");
  const [userId, setUserId] = useState("");
  const [active, setActive] = useState("");

  const isFocused = useIsFocused();
  const handleExpense = async () => {
    const obj = {
      amount: amount,
      category: category,
      description: description,
      owe: 0,
      lent: 0,
      withUser: userId,
      id: userId,
      txDate: moment(Date.now()).format(),
    };

    const data = await addTransaction(obj, config);
    if (data.success) {
      navigation.goBack(null);
    }
  };

  const handleUserId = async () => {
    await AsyncStorage.setItem("userId", "63f079bc145c6eb4ec252f67");
    const id = await AsyncStorage.getItem("userId");
    setUserId(id);
  };

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  useEffect(() => {
    setTabShown(false);
    handleUserId();
  }, []);

  useEffect(() => {
    setTabShown(false);
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
            keyboardType="decimal-pad"
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
          </View>
          <View className="flex flex-row space-x-5 mt-4">
            <TouchableOpacity
              onPress={() => {
                setActive("Food");
                setCategory("Food");
              }}
              className="bg-[#2A2D3C] p-2 w-8 h-8 rounded-full items-center"
            >
              <FontAwesome5
                name="pizza-slice"
                size={15}
                color={active === "Food" ? "#ec8b8b" : "#aaaaaa"}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setActive("Grocery");
                setCategory("Grocery");
              }}
              className="bg-[#2A2D3C] p-2 rounded-full w-8 h-8"
            >
              <FontAwesome5
                name="shopping-cart"
                size={16}
                color={active === "Grocery" ? "#bc8eb9" : "#aaaaaa"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setActive("Ticket");
                setCategory("Ticket");
              }}
              className="bg-[#2A2D3C] p-2 rounded-full w-8 h-8"
            >
              <Foundation
                name="ticket"
                size={17}
                color={active === "Ticket" ? "#d5ec8b" : "#aaaaaa"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setActive("Shopping");
                setCategory("Shopping");
              }}
              className="bg-[#2A2D3C] p-2 rounded-full w-8 h-8"
            >
              <Fontisto
                name="shopping-bag-1"
                size={19}
                color={active === "Shopping" ? "#8bec9e" : "#aaaaaa"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setActive("Bills");
                setCategory("Bills");
              }}
              className="bg-[#2A2D3C] p-2 rounded-full w-8 h-8"
            >
              <FontAwesome5
                name="money-bill-wave-alt"
                size={15}
                color={active === "Bills" ? "#ecb78b" : "#aaaaaa"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setActive("Fuel");
                setCategory("Fuel");
              }}
              className="bg-[#2A2D3C] p-2 rounded-full w-8 h-8"
            >
              <MaterialCommunityIcons
                name="fuel"
                size={19}
                color={active === "Fuel" ? "#9b8bec" : "#aaaaaa"}
              />
            </TouchableOpacity>
          </View>
          {/* <View className="mt-5 flex flex-row justify-between items-center">
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
          </View> */}
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
