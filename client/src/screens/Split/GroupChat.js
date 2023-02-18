import { View } from "react-native";
import { Text } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import GeneralNavbar from "../../components/GeneralNavbar";
import ChatCard from "../../components/split/ChatCard";
import CommonNav from "./CommonNav";

const GroupChat = () => {
    return(
        <>
        <GeneralNavbar title={"Group Name"} navigationPath={"MainSplit"}/>
            <View className="p-4 pb-28 h-screen">
            <ScrollView>
                <View className="flex self-end">
                    {[...Array(8)].map((val,idx) => {
                        return(
                            <>
                            <View className="my-2" key={idx}>
                                <ChatCard/>
                            </View>
                            </>
                        )
                    })}
                </View>
                </ScrollView>
                <TouchableOpacity className="bg-indigo-500 rounded-lg w-full"><Text className="font-medium uppercase py-2 text-center text-white">Settle Up</Text></TouchableOpacity>
            </View> 
        </>
    )
}

export default GroupChat;