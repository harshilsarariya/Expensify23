import { Image, Text } from "react-native";
import { View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { TouchableWithoutFeedback, TouchableOpacity} from "react-native";


const GroupList = () => {
    const navigator = useNavigation();
    return(
        <>
            <View className="flex flex-row justify-between mt-4">
                <Text className="text-white font-medium text-xl">Groups</Text>
                <TouchableWithoutFeedback onPress={() => navigator.navigate("CreateGroup")}><Text className="text-purple-400 font-medium"><AntDesign name="plus" size={16} color="#c084fc" /> Create Group</Text></TouchableWithoutFeedback>
            </View>
                <View className="flex space-y-4 my-4">
                    {
                        [...Array(8)].map((val,idx) => {
                            return(
                                <>
                                <TouchableOpacity onPress={() => navigator.navigate("GroupChat")} key={idx}>
                                  <GroupCard/>
                                </TouchableOpacity>
                                </>
                            )
                        })
                    }
                </View>
        </>
    )
}

const GroupCard = () => {
    return(
        <>
            <View className="flex flex-row justify-between items-center p-2">
                <View className="basis-1/4">
                    <Image className="h-16 w-16 rounded-full" source={require("../../assets/images/avatar2.png")} />
                </View>
                <View className="basis-3/4">
                    <Text className="text-white text-lg font-medium">Hostel Boys</Text>
                </View>
            </View>
        </>
    )
}

export default GroupList;