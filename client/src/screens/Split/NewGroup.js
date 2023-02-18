import { TextInput, View } from "react-native";
import { Text ,TouchableOpacity} from "react-native";
import CommonNav from "./CommonNav";
import { AntDesign } from '@expo/vector-icons';
import { Image } from "react-native";
import { Modal } from "react-native";
import { useState } from "react";
import ChatCard from "../../components/split/ChatCard";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const NewGroup = () => {
    const [ModalOpen, setModalOpen] = useState(false);
    const [users, setUsers] = useState([{
        username:"",
    }]); 
    const [checked,setCHecked] = useState(false);
    return(
        <>
        <CommonNav title={"Create Group"}/>

            <View className="my-20 px-4">
            <Modal animationType="slide" transparent={false} visible={ModalOpen} onRequestClose={() => setModalOpen(!ModalOpen)}>
            <View className="h-32 w-28 bg-white"><Text className="">mndgh</Text></View>
            <BouncyCheckbox onPress={() => setCHecked(!checked)} />
        </Modal>
            <View className="flex items-center">
                <Image className="rounded-full w-28 h-28" source={require("../../assets/images/avatar2.png")} />
            </View>
            <View className="mt-4">
                <Text className="mb-2 text-white">Group name</Text>
                <TextInput className="bg-white rounded-lg placeholder:text-white mt-2 px-4 py-2" placeholder="Eg- flatname,goa trip, etc"/>
            </View>
            <View className="mt-4">
                <Text className="mb-2 text-white">Add People</Text>
                <TouchableOpacity onPress={() => setModalOpen(true)}><View className="bg-white flex flex-row justify-between py-2 px-4 rounded-lg">
                    <Text>Add people in this group</Text>
                    <AntDesign name="down" size={24} color="black" />
                </View></TouchableOpacity>
            </View>


            {/* chatting card */}
            <ChatCard/>
            </View>
        </>
    )
}

export default NewGroup;