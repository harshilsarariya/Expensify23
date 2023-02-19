import { TextInput, View } from "react-native";
import { Text, TouchableOpacity } from "react-native";
import CommonNav from "./CommonNav";
import { AntDesign } from "@expo/vector-icons";
import { Image } from "react-native";
import { Modal } from "react-native";
import { useState } from "react";
import ChatCard from "../../components/split/ChatCard";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import GeneralNavbar from "../../components/GeneralNavbar";

const NewGroup = () => {
    const user = [
        {
            id:1,
        username:"Harshil Sarariya"
    },
        {
            id:2,
        username:"Harshil Sarariya"
    },
        {
            id:3,
        username:"Harshil Sarariya"
    },
        {
            id:4,
        username:"Harshil Sarariya"
    },
        {
            id:5,
        username:"Harshil Sarariya"
    },
        {
            id:6,
        username:"Harshil Sarariya"
    },
        {
            id:7,
        username:"Harshil Sarariya"
    },
        {
            id:8,
        username:"Harshil Sarariya"
    },
]
    const [name,setName] = useState("");
  const [ModalOpen, setModalOpen] = useState(false);
  const [users, setUsers] = useState([{
    username:"harshil"
  }]);
  const [checked, setCHecked] = useState(false);
  return (
    <>
      <GeneralNavbar title={"Create Group"} navigationPath="MainSplit"/>
        {console.log(users)}
      <View className="my-20 px-4">
        <Modal
          animationType="slide"
          transparent={false}
          visible={ModalOpen}
          onRequestClose={() => setModalOpen(!ModalOpen)}
        >
          <View className="p-8 bg-slate-800 h-screen">
            <Text className="text-white text-2xl font-medium my-4">Select group members</Text>
            <View>
              {user.map((val, idx) => {
                return (
                  <>
                  <View key={idx} className="p-2 flex flex-row my-1 rounded-lg bg-slate-700">
                    <BouncyCheckbox onPress={(isChecked) => {console.log(isChecked);isChecked?  setUsers(() => [...users,user[idx]]) : users.splice(idx+1,1); setUsers(() => [...users])}} />
                    <Text className="text-white">{val.username}</Text>
                  </View>
                  </>
                );
              })}
            </View>
            <TouchableOpacity onPress={() => setModalOpen(!ModalOpen)} className="px-4 py-2 bg-violet-700 rounded-lg absolute bottom-6 left-6 w-full"><Text className="text-center text-white uppercase">Create Group</Text></TouchableOpacity>
          </View>
        </Modal>
        <View className="flex items-center">
          <Image
            className="rounded-full w-28 h-28"
            source={require("../../assets/images/avatar2.png")}
          />
        </View>
        <View className="mt-4">
          <Text className="mb-2 text-white">Group name</Text>
          <TextInput
            className="bg-white text-black rounded-lg mt-2 px-4 py-2"
            placeholder="Eg- flatname,goa trip, etc"
            onChangeText={(e) => setName(e)}
            value={name}
          />
          {console.log(name)}
        </View>
        <View className="mt-4">
          <Text className="mb-2 text-white">Add People</Text>
          <TouchableOpacity onPress={() => setModalOpen(true)}>
            <View className="bg-white flex flex-row justify-between py-2 px-4 rounded-lg">
              <Text>Add people in this group</Text>
              <AntDesign name="down" size={24} color="black" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default NewGroup;
