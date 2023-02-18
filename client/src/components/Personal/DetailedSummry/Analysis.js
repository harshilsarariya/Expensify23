import {
  View,
  Text,
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import * as Progress from "react-native-progress";
import { BarChart } from "react-native-chart-kit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CardCategory from "./CardCategory";
// import {
//   fetchCategories,
//   fetchCurrentMonthTransactions,
// } from "../../../api/user";
import moment from "moment";

const Analysis = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [userId, setUserId] = useState("");
  const [visible, setVisible] = useState(false);

  const data = {
    labels: ["1-5", "6-10", "11-15", "16-20", "21-25", "25-28"],
    datasets: [
      {
        data: [20, 45, 28, 80, 56, 15],
      },
    ],
  };

  const toggleDropdown = () => {
    setVisible(!visible);
  };

  const handleCategory = async () => {
    // const data = await fetchCategories(userId);
    const data = [
      {
        category: "Food",
        expense: 8,
        total: 19567,
      },
      {
        category: "Shopping",
        expense: 1,
        total: 2000,
      },
      {
        category: "Shopping2",
        expense: 2,
        total: 5000,
      },
      {
        category: "Games",
        expense: 1,
        total: 15000,
      },
    ];
    setCategories(data);
  };

  const handleUserId = async () => {
    setUserId(await AsyncStorage.getItem("userId"));
  };

  const handleGraphData = () => {
    // const data = fetchCurrentMonthTransactions(userId);
    // let daysArr = new Array();

    // for (
    //   let index = 0;
    //   index < moment().endOf("month").format("MM");
    //   index++
    // ) {}
  };

  useEffect(() => {
    handleUserId();
  }, []);

  useEffect(() => {
    handleCategory();
  }, [userId]);

  return (
    <ScrollView className="mx-3" showsVerticalScrollIndicator={false}>
      {/* Navbar */}

      {/* drop down for selection of category and date */}
      <View className="flex flex-row mt-5">
        <View className="flex flex-col bg-[#2A2E39] p-2 rounded-lg items-center mr-4">
          <TouchableOpacity className="flex-row " onPress={toggleDropdown}>
            <Text className="text-[#6561CE]">All Expenses</Text>
            <AntDesign name="down" size={15} color="#6561CE" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity className="flex flex-row bg-[#2A2E39] p-2 rounded-lg items-center">
          <Text className="text-[#6561CE]">
            {moment().startOf("month").format("DD")} {moment().format("MMM")} -{" "}
            {moment().endOf("month").format("DD")} {moment().format("MMM")}{" "}
          </Text>
          <AntDesign name="down" size={15} color="#6561CE" />
        </TouchableOpacity>
      </View>

      {/* spent of month in numbers */}
      <View className="bg-[#2A2E39] mt-4  p-3 rounded-xl">
        <View className="flex justify-between flex-row">
          <View className="">
            <Text className="text-[#C8CACF]">
              Spends in {moment().startOf("month").format("DD")}{" "}
              {moment().format("MMM")} - {moment().endOf("month").format("DD")}{" "}
              {moment().format("MMM")}{" "}
            </Text>
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
          <BarChart
            // style={graphStyle}
            data={data}
            width={Dimensions.get("window").width - [48]}
            height={220}
            yAxisLabel="₹"
            chartConfig={{
              backgroundColor: "#706cc9",
              backgroundGradientFrom: "#353c4d",
              backgroundGradientTo: "#353c4d",
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              strokeWidth: 2,
              barPercentage: 0.7,
              useShadowColorFromDataset: false,
              decimalPlaces: 1,
            }}
            verticalLabelRotation={0}
          />
        </View>
      </View>

      {/* Berakdown - category wise */}

      <View className="mt-5 mb-24">
        <Text className="text-lg text-white">Categories Breakdown</Text>

        {categories !== undefined &&
          categories.length > 0 &&
          Array.isArray(categories) &&
          categories.map((item, index) => (
            <CardCategory navigation={navigation} key={index} item={item} />
          ))}
      </View>
    </ScrollView>
  );
};

export default Analysis;

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#efefef",
    height: 50,
    width: "90%",
    paddingHorizontal: 10,
    zIndex: 1,
  },
  buttonText: {
    flex: 1,
    textAlign: "center",
  },
  dropdown: {
    position: "absolute",
    backgroundColor: "#fff",
    top: 50,
  },
});
