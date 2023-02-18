import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchLatestTransactions } from "../../api/user";

const LatestTransaction = ({ navigation }) => {
  const [transactions, setTransactions] = useState([]);
  const [userId, setUserId] = useState("");

  const handleTransaction = async () => {
    // const data = await fetchLatestTransactions(userId);
    const data = {
      transactions: [
        {
          From: "Harshil",
          To: "NULL",
          Description: "Food",
          Category: "Food",
          Amount: "500",
          Date: "2023-02-17T14:16:25+05:30",
          Split: "No",
        },
        {
          From: "Harshil",
          To: "NULL",
          Description: "Ice cream ",
          Category: "Food",
          Amount: "30",
          Date: "2023-02-16T18:34:01+05:30",
          Split: "No",
        },
        {
          From: "Devanshu",
          To: "Minecraft",
          Description: "Skin",
          Amount: "15000",
          Category: "Games",
          Split: "No",
          Date: 1676284941605,
        },
        {
          From: "Harshil",
          To: "NULL",
          Description: "pen and bottle",
          Amount: "3000",
          Category: "Shopping2",
          Split: "No",
          Date: 1676284941605,
        },
        {
          From: "Harshil",
          To: "NULL",
          Description: "pen and bottle",
          Amount: "2000",
          Category: "Shopping2",
          Split: "No",
          Date: 1676284941605,
        },
      ],
    };

    setTransactions(data.transactions);
  };

  const handleUserId = async () => {
    const id = await AsyncStorage.getItem("userId");
    setUserId(id);
  };

  useEffect(() => {
    handleUserId();
  }, []);

  useEffect(() => {
    handleTransaction();
  }, [userId]);

  return (
    <View className="my-5 mb-16">
      <Text className="text-white text-base">Latest Transaction</Text>
      {transactions.map !== undefined &&
        transactions.map((item, index) => (
          <Card key={index} navigation={navigation} item={item} />
        ))}
    </View>
  );
};

export default LatestTransaction;
