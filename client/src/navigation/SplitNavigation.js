import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useIsFocused } from "@react-navigation/native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SplitHome from "../screen/Split/SplitHome";
import NewGroup from "../screen/Split/NewGroup";
import GroupChat from "../screen/Split/GroupChat";
import Navbar from "../components/personal/Navbar";
import TransDetails from "../components/split/ChatDetails";

const Stack = createStackNavigator();

const SplitNavigation = ({ setIsStartedFocus, navigation, setUserId }) => {
//   const isFocused = useIsFocused();
//   const [phoneNo, setPhoneNo] = useState("");

//   const handleUserPage = async () => {
//     try {
//       const data = await AsyncStorage.getItem("isNewUser");
//       if (data == "true") navigation.navigate("MobileNumber");
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   useEffect(() => {
//     handleUserPage();
//     setIsStartedFocus(isFocused);
//   }, []);

  return (
    <>
    <Stack.Navigator
      initialRouteName="MainSplit"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="MainSplit">
        {(props) => <SplitHome navigation={navigation} />}
      </Stack.Screen>
      <Stack.Screen name="GroupChat">
        {(props) => <GroupChat navigation={navigation} />}
      </Stack.Screen>
      <Stack.Screen name="CreateGroup">
        {(props) => 
          <NewGroup
            navigation={navigation}
          />
        }
      </Stack.Screen>
      <Stack.Screen name="TransDetails">
        {(props) => 
          <TransDetails
            navigation={navigation}
          />
        }
      </Stack.Screen>
    </Stack.Navigator>
    </>
  );
};

export default SplitNavigation;
