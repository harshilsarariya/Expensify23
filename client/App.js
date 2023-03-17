import { StatusBar, Text, View } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { Alert } from "react-native";
import TabNavigation from "./src/navigation/TabNavigation";
import { useEffect, useState } from "react";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  projectId: "expensify-2323",
  storageBucket: "expensify-2323.appspot.com",
  appId: "1:119876665092:android:ce8d2133ee920df73f1a51",
  apiKey: "AIzaSyBZVTh9B3hU5pXDQKz7YvAiwSGTQDvvIEM",
  authDomain: "expensify-2323.firebaseapp.com",
  messagingSenderId: "119876665092",
};

firebase.initializeApp(firebaseConfig);

export default function App() {
  const [noInternet, setNoInternet] = useState(false);
  const netInfo = useNetInfo();

  StatusBar.setBackgroundColor("#1E2128");

  // Checking internet connection
  const fetchnetInfo = () => {
    const { isConnected, isInternetReachable } = netInfo;
    if (isConnected === false && isInternetReachable === false)
      setNoInternet(true);
    else setNoInternet(false);
  };

  useEffect(() => {
    fetchnetInfo();
  }, [netInfo]);

  if (noInternet) {
    Alert.alert("No Internet");
  }

  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer
        theme={{
          ...DefaultTheme,
          colors: { ...DefaultTheme.colors, background: "#1E2128" },
        }}
      >
        <TabNavigation />
      </NavigationContainer>
    </>
  );
}
