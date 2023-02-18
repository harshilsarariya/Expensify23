import { View, Text, Dimensions, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import * as Progress from "react-native-progress";
import { LineChart } from "react-native-chart-kit";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { fetchTodaysTransactions } from "../../../api/user";
import Card from "../Card";

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

  const handleUserId = async () => {
    const id = await AsyncStorage.getItem("userId");
    setUserId(id);
  };

  const handleTransaction = async () => {
    // const data = await fetchTodaysTransactions(userId);
    // setTransactions(data);
  };

  useEffect(() => {
    handleUserId();
  }, []);

  useEffect(() => {
    handleTransaction();
  }, [userId]);

  return (
    <ScrollView className="mx-3" showsVerticalScrollIndicator={false}>
      {/* Navbar */}

      {/* drop down for selection of category and date */}
      <View className="flex flex-row mt-5">
        <View className="flex flex-row bg-[#2A2E39] p-2 rounded-lg items-center mr-4">
          <Text className="text-[#90909a]">All Expenses </Text>
          {/* <AntDesign name="down" size={15} color="#6561CE" /> */}
        </View>
        <View className="flex flex-row bg-[#2A2E39] p-2 rounded-lg items-center">
          <Text className="text-[#6561CE]">Today </Text>
          <AntDesign name="down" size={15} color="#6561CE" />
        </View>
      </View>

      {/* spent of month in numbers */}
      <View className="bg-[#2A2E39] mt-4 p-3 rounded-xl">
        <View className="flex justify-between flex-row">
          <View className="">
            <Text className="text-[#C8CACF]">Spends in 01 Oct - 31Oct</Text>
            <View className=" mt-3 flex flex-row">
              <Text className="text-white">₹1,105.14</Text>
              <Text className="text-gray-300 text-xs"> / ₹5,500</Text>
            </View>
          </View>
          <View>
            <Text className="text-[#C8CACF]">20% budget used</Text>
            <View className="items-end mt-3">
              <Progress.Pie progress={0.4} size={25} />
            </View>
          </View>
        </View>

        {/* Chart for representing monthly expense */}
        <View className="mt-3">
          <LineChart
            data={data}
            width={Dimensions.get("window").width - [48]}
            height={256}
            chartConfig={{
              backgroundColor: "#706cc9",
              backgroundGradientFrom: "#353c4d",
              backgroundGradientTo: "#353c4d",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              propsForDots: {
                r: "4",
                strokeWidth: "1",
                stroke: "#ffa726",
              },
            }}
            bezier
            style={{ borderRadius: 10 }}
          />
        </View>
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
