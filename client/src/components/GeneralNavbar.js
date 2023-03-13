import { View, Text, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { grpDelete } from "../api/group";

const GeneralNavbar = (props) => {
  const navigation = useNavigation();

  const handleDelete = async () => {
    const data = await grpDelete(props.grpId);
    if (data?.success) {
      Alert.alert("Group Deleted Successfully!");
      navigation.navigate("MainSplit");
    } else {
      Alert.alert(data?.msg);
    }
  };

  return (
    <View>
      <View className="flex flex-row justify-between items-center mt-2 mx-4 pb-2">
        <View className="flex flex-row">
          <TouchableOpacity
            onPress={() => navigation.navigate(props.navigationPath)}
          >
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white ml-10 text-lg">{props.title}</Text>
        </View>
        {props?.grpId?.length > 1 && (
          <TouchableOpacity
            onPress={() => {
              handleDelete();
            }}
          >
            <MaterialIcons
              name="delete"
              size={20}
              color="gray"
              className=" absolute"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default GeneralNavbar;
