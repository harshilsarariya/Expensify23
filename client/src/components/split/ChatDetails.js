import { Text } from "react-native"
import { View } from "react-native"
import { FontAwesome } from '@expo/vector-icons';
import { Image } from "react-native";

const TransDetails = () => {
    return(
        <>
            <View className="p-4">
                <View className="flex items-center my-6">
                    <Text className="text-white text-2xl"><FontAwesome name="rupee" size={24} color="white" /> 500</Text>
                    <Text className="text-white text-2xl">Jay Maharaj Lunch</Text>
                </View>
                <Text className="text-white">Created by You on 6th Oct</Text>
                <View className="flex flex-row space-x-4 mt-4">
                    <View className="px-2 py-1 border border-white rounded-full"><Text className="text-sm text-white">📅 6 Oct</Text></View>
                    <View className="px-2 py-1 border border-white rounded-full"><Text className="text-sm text-white">Hostel Boys</Text></View>
                    <View className="px-2 py-1 border border-white rounded-full"><Text className="text-sm text-white">Food and drinks</Text></View>
                </View>
                <View className="mt-4">
                    <Text className="text-white text-lg font-medium">Split Details</Text>
                    <View className="mt-2 rounded-3xl bg-gray-700 overflow-hidden">
                        <Text className="bg-indigo-900 text-white py-2 px-4">Paid By</Text>
                        <View className="p-4 flex flex-row justify-between items-center">
                            <View className="basis-1/5">
                                <Image className="h-10 w-10 rounded-full" source={require("../../assets/images/avatar2.png")} />
                            </View>
                            <Text className="text-white basis-3/5">You</Text>
                            <Text className="text-white basis-1/5"><FontAwesome name="rupee" size={16} color="white" /> 500</Text>
                        </View>
                        <Text className="bg-indigo-900 text-white py-2 px-4">Shared With</Text>
                        {[...Array(3)].map((val,idx) => {
                            return(
                                <>
                                <View className="p-4 flex flex-row justify-between items-center">
                            <View className="basis-1/5">
                                <Image className="h-10 w-10 rounded-full" source={require("../../assets/images/avatar2.png")} />
                            </View>
                            <Text className="text-white basis-3/5">You</Text>
                            <Text className="text-white basis-1/5"><FontAwesome name="rupee" size={16} color="white" /> 500</Text>
                        </View>  
                                </>
                            )
                        })}
                    </View>
                </View>
            </View>
        </>
    )
}

export default TransDetails;