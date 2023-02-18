import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { fetchCategoryWiseExpense } from "../../../api/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import Card from "../Card";

const CategoryWiseExpense = ({}) => {
  const route = useRoute();
  const navigation = useNavigation();
  const { category } = route.params;

  const [userId, setUserId] = useState("");
  const [expenseData, setExpenseData] = useState([]);

  const handleExpenses = async () => {
    const data = await fetchCategoryWiseExpense(userId, category);
    setExpenseData(data);
  };

  const handleUserId = async () => {
    setUserId(await AsyncStorage.getItem("userId"));
  };

  useEffect(() => {
    handleUserId();
  }, []);

  useEffect(() => {
    handleExpenses();
  }, [userId]);

  return (
    <View className="m-3">
      {expenseData.map !== undefined &&
        expenseData.length > 0 &&
        expenseData.map((item, index) => (
          <Card key={index} navigation={navigation} item={item} />
        ))}
    </View>
  );
};

export default CategoryWiseExpense;
