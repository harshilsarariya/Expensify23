import {
  View,
  Text,
  TextInput,
  Switch,
  Modal,
  ScrollView,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  Fontisto,
  Foundation,
} from "@expo/vector-icons";
import moment from "moment";
import { useIsFocused, useRoute } from "@react-navigation/native";
import GeneralNavbar from "../GeneralNavbar";
import { addTransaction, getUserInfo } from "../../api/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";
import { Checkbox } from "react-native-paper";
import { addGrpTxs, getGrpInfo, updateGrpTxs } from "../../api/group";

const GrpAddExpense = (props) => {
  const route = useRoute();
  const { item, grpId, tag } = route.params;
  const [isEnabled, setIsEnabled] = useState(false);
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("General");
  const [userId, setUserId] = useState();
  const [active, setActive] = useState("");
  const [ModalOpen, setModalOpen] = useState(false);
  const [usersData, setUsersData] = useState([]);
  const [withUsers, setWithUsers] = useState([]);
  const [grpName, setGrpName] = useState("");

  const handleEditInfo = async () => {
    setUserId(item.paidBy);
    setCategory(item.category);
    setDescription(item.description);
    setAmount(item.amount);
    setWithUsers(item.withUsers);
  };
  const handleSaveExpense = async () => {
    const obj = {
      paidBy: userId,
      category: category,
      description: description,
      owe: 0,
      lent: amount / (item?.withUsers.length || item?.members.length),
      withUsers: withUsers,
      txDate: item?.txDate || moment(Date.now()).format(),
      amount: amount,
    };
    let data = { success: false };
    if (tag === "add") {
      data = await addGrpTxs(item._id, obj);
    } else if (tag === "edit") {
      data = await updateGrpTxs(grpId, item._id, obj);
    }
    console.log(data);
    if (data?.success) {
      props.navigation.goBack(null);
    } else {
      Alert.alert("Something went Wrong!");
    }
  };

  const handleUserId = async () => {
    await AsyncStorage.setItem("userId", "63f079bc145c6eb4ec252f67");
    const id = await AsyncStorage.getItem("userId");
    setUserId(id);

    // setting category
    setActive(item?.category);
    setCategory(item?.category);
  };

  const handleUsersData = async () => {
    setUsersData([]);
    // item.members.map(async (item) => {
    //   const { name } = await getUserInfo(item);
    //   setUsersData((prev) => [
    //     ...prev,
    //     { memberId: item, name: name, checked: false },
    //   ]);
    // });
  };

  const handleGrpName = async () => {
    const data = await getGrpInfo(grpId);
    setGrpName(data.name);
  };

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const handleChecked = (idx) => {
    let data = usersData;

    data[idx].checked = data[idx].checked ? false : true;
    setUsersData(data);
    if (usersData[idx].checked) {
      setWithUsers((prev) => [
        ...prev,
        {
          userId: usersData[idx].memberId,
          owe: amount / item.members.length,
        },
      ]);
    }
  };

  useEffect(() => {
    handleUserId();
    handleUsersData();
    handleGrpName();
    if (tag === "edit") {
      handleEditInfo();
    }
  }, []);

  return (
    <>
      <GeneralNavbar title={"Add Expense"} navigationPath={"Personal-Home"} />
      <View className="mx-3">
        {/* adjust split modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={ModalOpen}
          onRequestClose={() => setModalOpen(false)}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(53, 56, 63, 0.8)",
              justifyContent: "flex-end",
              bottom: 0,
            }}
          >
            <View className="bg-[#2A2E39] rounded-t-lg h-1/2 p-3">
              {/* modal  navbar */}
              <View className="flex flex-row items-center justify-between">
                <GeneralNavbar
                  navigationPath={"GrpAddExpense"}
                  title="Adjust Split"
                />
                <TouchableOpacity
                  onPress={() => {
                    setModalOpen(false);
                  }}
                >
                  <Text className="text-[#6662BB] text-lg mr-3">Done</Text>
                </TouchableOpacity>
              </View>

              <View>
                <View className="flex flex-row">
                  <Text className="text-[#6662BB] text-base mr-3 border-b-2 border-[#6662BB]">
                    Equally
                  </Text>
                </View>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  className="mt-3"
                >
                  {usersData.map((item, idx) => (
                    <View
                      className="flex flex-row items-center justify-between mt-2"
                      key={idx}
                    >
                      <View className="flex flex-row items-center space-x-2">
                        <Checkbox
                          status={"checked"}
                          onPress={() => {
                            handleChecked(idx);
                          }}
                        />
                        <View className="bg-gray-600 p-2 rounded-full">
                          <Feather name="user" size={18} color="white" />
                        </View>
                        <Text className="text-white text-base">
                          {item.name}
                        </Text>
                      </View>
                      <View className="bg-[#2A2B47] w-14 border-2 px-2 rounded-lg border-[#3F3B75]">
                        <TextInput
                          placeholderTextColor={"white"}
                          placeholder="$"
                          className={`text-base text-white `}
                          value={"" + amount / 2}
                        />
                      </View>
                    </View>
                  ))}
                </ScrollView>
              </View>
            </View>
          </View>
        </Modal>
        <View className="mt-5 items-center">
          <TextInput
            placeholder="₹ 0"
            value={"" + amount}
            className="text-[#C9CACD] text-3xl"
            placeholderTextColor="#C9CACD"
            onChangeText={setAmount}
            keyboardType="decimal-pad"
          />
          <TextInput
            placeholder="What was this expense for?"
            placeholderTextColor="#6c6d70"
            className="bg-[#2A2E39] mt-3 text-[#C9CACD] w-4/6 p-2 rounded-lg border-2 border-[#2B2D40]"
            onChangeText={setDescription}
            value={description}
          />
        </View>
        <View className="">
          <View className="flex flex-row justify-between mt-8">
            <Text className="text-[#BDBEC3]">Category</Text>
          </View>

          {/* category */}
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
          <View className="space-y-4 mt-5">
            <Text className=" text-[#BCBDC2]">
              You are splitting this expense.
            </Text>
            <View className="bg-[#262A35] border-2 border-[#2B2D40] p-2 rounded-lg">
              <Text className="text-[#BCBDC2] text-lg"> {grpName}</Text>
            </View>
          </View>

          <View className="flex flex-row mt-5 items-center mx-auto space-x-2">
            <Text className=" text-[#BCBDC2]">Paid by </Text>
            <TouchableOpacity className="bg-[#262A35] border-2 border-[#2B2D40] p-2 rounded-lg">
              <Text className="text-[#5C5B94] ">You</Text>
            </TouchableOpacity>
            <Text className=" text-[#BCBDC2]">and Split </Text>
            <TouchableOpacity
              onPress={() => {
                setModalOpen(true);
              }}
              className="bg-[#262A35] border-2 border-[#2B2D40] p-2 rounded-lg"
            >
              <Text className="text-[#5C5B94] ">Equally</Text>
            </TouchableOpacity>
          </View>
          <View className="items-center top-[180] ">
            <TouchableOpacity
              className="bg-[#5F68D1] w-full p-2 mt-2 items-center rounded-md"
              onPress={handleSaveExpense}
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

export default GrpAddExpense;
