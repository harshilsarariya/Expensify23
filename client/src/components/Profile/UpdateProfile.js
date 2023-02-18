import { useState } from "react";
import { Image,Text,View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import CommonNav from "../../screens/Split/CommonNav";

const UpdateProfile = () => {
    const [name,setName] = useState("Harshil Sarariya");
    return(
        <>
            <CommonNav title={"Update Profile"} navigationPath={"Settings"}/>
            <View className="p-4 h-screen">
                <View className="flex items-center my-8">
                    <Image className="h-32 w-32 rounded-full" source={require("../../assets/images/avatar2.png")} />
                </View>
                <View>
                    <Text className="text-white font-medium text-lg">Name</Text>
                    <TextInput className="bg-white rounded-lg px-4 py-2" value={name} onChangeText={(te) => setName(te)}/>
                </View>
            <TouchableOpacity className="bg-blue-700 py-2 rounded-lg mt-4"><Text className="text-center text-lg uppercase text-white">Save</Text></TouchableOpacity>
            </View>
        </>
    )
}

export default UpdateProfile;