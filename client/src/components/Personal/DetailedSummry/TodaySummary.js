import { View, Text, Dimensions, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import * as Progress from "react-native-progress";
import { LineChart } from "react-native-chart-kit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Card from "../Card";
import { fetchTodaysTransactions } from "../../../api/user";
import { Picker } from "@react-native-picker/picker";
import moment from "moment";
const data = {
  labels: ["1", "2", "3", "4", "5", "6"],
  datasets: [
    {
      data: [160, 105, 142, 130, 209, 130],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
      strokeWidth: 2, // optional
    },
  ],
  //   legend: ["Rainy Days"], // optional
};

const TodaySummary = ({ navigation }) => {
  const [userId, setUserId] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [selectDay, setSelectDay] = useState();
  const [date, setDate] = useState(moment().subtract(0, "days"));

  const handleUserId = async () => {
    const id = await AsyncStorage.getItem("userId");
    setUserId(id);
  };

  const handleTransaction = async () => {
    const data = await fetchTodaysTransactions(userId, { date: date });
    setTransactions(data);
  };

  useEffect(() => {
    handleUserId();
  }, []);

  useEffect(() => {
    handleTransaction();
  }, [userId, date]);

  return (
    <ScrollView className="mx-3" showsVerticalScrollIndicator={false}>
      {/* drop down for selection of category and date */}
      <View className=" bg-[#2A2E39] rounded-lg w-40 h-12 mt-5">
        <Picker
          style={{ color: "#6561CE" }}
          selectedValue={selectDay}
          onValueChange={(itemValue, itemIndex) => {
            setSelectDay(itemValue);
            if (selectDay === "Today") {
              setDate(moment().subtract(0, "days"));
            } else if (selectDay === "Yesterday") {
              setDate(moment().subtract(1, "days"));
            }
          }}
        >
          <Picker.Item label="Yesterday" value="Today" />
          <Picker.Item label="Today" value="Yesterday" />
        </Picker>
      </View>
      {/* Berakdown - category wise */}
      <View className="mt-5 mb-24">
        <Text className="text-lg text-white">Transcations</Text>
        {transactions.map !== undefined &&
          transactions.map((item, index) => (
            <Card key={index} navigation={navigation} item={item} />
          ))}
      </View>
    </ScrollView>
  );
};

export default TodaySummary;
