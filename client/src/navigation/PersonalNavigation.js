import React, { useRef, useState } from "react";
import { StatusBar } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import PersonalScreen from "../screens/Personal/PersonalScreen";
import ExpenseSummaryScreen from "../screens/Personal/ExpenseSummaryScreen";
import PaymentDetails from "../components/Personal/PaymentDetails";
import { useEffect } from "react";
import AddExpense from "../components/Personal/AddExpense";
import { useIsFocused } from "@react-navigation/native";
import { saveExpoToken } from "../api/user";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Stack = createStackNavigator();

const PersonalNavigation = ({ setTabShown, navigation }) => {
  const isFocused = useIsFocused();
  const responseListener = useRef();
  const notificationListener = useRef();
  const [userId, setUserId] = useState("");

  // creating expo push token for notification
  const registerForPushNotificationsAsync = async () => {
    let token;
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();

    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get device push token for push notification!");

      return;
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
    return token;
  };

  useEffect(() => {
    setTabShown(true);
  }, [isFocused]);

  useEffect(() => {
    setTabShown(true);
    handleUserId();
  }, []);

  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
      }),
    });
    registerForPushNotificationsAsync().then((token) =>
      // saveExpoToken(token, userId)
      console.log(token)
    );
    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        // console.log("--- notification received ---");
        // console.log(notification);
        // console.log("------");
      });
    // Works when app is foregrounded, backgrounded, or killed
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        // console.log("--- notification tapped ---");
        // console.log(response);
        // console.log("------");
      });
    // Unsubscribe from events
    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const handleUserId = async () => {
    await AsyncStorage.setItem("userId", "63f079bc145c6eb4ec252f67");
    const id = await AsyncStorage.getItem("userId");
    setUserId(id);
  };

  return (
    <>
      <StatusBar backgroundColor="#1E2128" barStyle="" />
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Personal-Home"
      >
        <Stack.Screen name="Personal-Home">
          {(props) => (
            <PersonalScreen setTabShown={setTabShown} navigation={navigation} />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="Personal-ExpenseSummary"
          component={ExpenseSummaryScreen}
        />
        <Stack.Screen
          name="Personal-PaymentDetails"
          component={PaymentDetails}
        />
        <Stack.Screen name="Personal-AddExpense">
          {(props) => (
            <AddExpense navigation={navigation} setTabShown={setTabShown} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </>
  );
};

export default PersonalNavigation;
