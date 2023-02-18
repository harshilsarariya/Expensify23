import { Text } from "react-native";
import { TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { View } from "react-native";

const CommonNav = ({title, navigationPath}) => {
    return(
        <>
            <View className="flex flex-row items-center mt-2 ml-4">
        <TouchableOpacity onPress={() => navigation.navigate(navigationPath)}>
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white ml-10 text-lg">{title}</Text>
      </View>
        </>
    )
}

export default CommonNav;