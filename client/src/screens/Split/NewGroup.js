import { TextInput, View } from "react-native";
import { Text, TouchableOpacity } from "react-native";
import CommonNav from "./CommonNav";
import { AntDesign } from "@expo/vector-icons";
import { Image } from "react-native";
import { Modal } from "react-native";
import { useState } from "react";
import ChatCard from "../../components/split/ChatCard";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const NewGroup = () => {
    const user = [
        {
        username:"Harshil Sarariya"
    },
        {
        username:"Harshil Sarariya"
    },
        {
        username:"Harshil Sarariya"
    },
        {
        username:"Harshil Sarariya"
    },
        {
        username:"Harshil Sarariya"
    },
        {
        username:"Harshil Sarariya"
    },
        {
        username:"Harshil Sarariya"
    },
        {
        username:"Harshil Sarariya"
    },
]
    const [name,setName] = useState("");
  const [ModalOpen, setModalOpen] = useState(false);
  const [users, setUsers] = useState([
    {
      username: "",
    },
  ]);
  const [checked, setCHecked] = useState(false);
  return (
    <>
      <CommonNav title={"Create Group"} />
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
                    <BouncyCheckbox onPress={() => setUsers({...user,username:user[idx].username})} />
                    <Text className="text-white">{val.username}</Text>
                  </View>
                  </>
                );
              })}
            </View>
            <TouchableOpacity className="px-4 py-2 bg-violet-700 rounded-lg absolute bottom-6 left-6 w-full"><Text className="text-center text-white uppercase">Create Group</Text></TouchableOpacity>
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

        {/* chatting card */}
        <ChatCard />
      </View>
    </>
  );
};

export default NewGroup;
