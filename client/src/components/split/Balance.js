import { View,Text, TouchableOpacity, Modal, Image } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useState } from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const Balance = () => {
    const [ModalOpen,setModalOpen] = useState(false);
    return(
        <>
            <View className="flex flex-row justify-between p-4 h-32 rounded-xl border border-white bg-slate-700">
            <Modal animationType="slide"
          transparent={false}
          visible={ModalOpen}
          onRequestClose={() => setModalOpen(!ModalOpen)}>
                <View className="bg-slate-800 h-screen p-8">
                    <View className="flex flex-row justify-between">
                    <Text className="text-white text-2xl font-medium">Settle Balances</Text>
                    <TouchableOpacity onPress={() => setModalOpen(!ModalOpen)}><Text className="font-medium text-xl text-purple-400">Done</Text></TouchableOpacity>
                    </View>
                    <View className="my-4">
                        {
                            [...Array(8)].map((val,idx) => {
                                return(
                                    <>
                                        <View className="p-4 flex flex-row justify-between items-center">
                                        <BouncyCheckbox className="w-10" onPress={() => setUsers({...user,username:user[idx].username})} />
                                        <View className="flex flex-row basis-3/5 flex-1 space-x-4">
                                            <View>
                                                <Image className="w-12 h-12 rounded-full" source={require("../../assets/images/avatar2.png")} />
                                            </View>
                                            <View>
                                                <Text className="text-white font-medium">Rajan Patel</Text>
                                                <Text className="text-emerald-400 text-lg"><FontAwesome name="rupee" size={20} color="#34d399" /> 55.4</Text>
                                            </View>
                                        </View>
                                            <View className="bg-slate-700 basis-1/5 py-2 rounded-xl"><Text className="text-center text-white">Settle</Text></View>
                                        </View>
                                    </>
                                )
                            })
                        }
                        <TouchableOpacity><Text>Select All</Text></TouchableOpacity>
                        <View className="flex flex-row justify-between">
                            <Text className="text-white font-medium">Total</Text>
                            <Text className="text-emerald-400 text-2xl"><FontAwesome name="rupee" size={24} color="#34d399" /> 55.4</Text>
                        </View>
                    </View>
                </View>
            </Modal>
                <View className="flex justify-between">
                    <Text className="text-white">Balance with friends</Text>
                    <Text className="text-emerald-500 text-2xl font-medium"><FontAwesome name="rupee" size={24} color="#10b981" /> 3226.12</Text>
                    <TouchableOpacity onPress={() => setModalOpen(true)}><Text className="font-medium text-purple-400">Settle Up <AntDesign name="right" size={12} color="#c084fc" /></Text></TouchableOpacity>
                </View>
                <View className="flex justify-between items-end">
                    <View className="p-2 bg-green-700 rounded-xl">
                        <Text className="text-white font-medium">You'll get <FontAwesome name="rupee" size={16} color="#6ee7b7" /><Text className="text-emerald-300"> 3226.12</Text></Text>
                    </View>
                    <View className="bg-red-700 py-1 px-2 rounded-xl font-medium"><Text className="text-white">You'll pay <FontAwesome name="rupee" size={14} color="#fda4af" /><Text className="text-rose-300"> 0</Text></Text></View>
                </View>
            </View>
        </>
    )
}

export default Balance;