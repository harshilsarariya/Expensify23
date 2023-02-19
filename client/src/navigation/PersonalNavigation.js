import React from "react";
import { StatusBar } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import PersonalScreen from "../screens/Personal/PersonalScreen";
import ExpenseSummaryScreen from "../screens/Personal/ExpenseSummaryScreen";
import PaymentDetails from "../components/Personal/PaymentDetails";
import { useEffect } from "react";
import AddExpense from "../components/Personal/AddExpense";
import { useIsFocused } from "@react-navigation/native";

const Stack = createStackNavigator();

const PersonalNavigation = ({ setTabShown, navigation }) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    setTabShown(true);
  }, [isFocused]);

  useEffect(() => {
    setTabShown(true);
  }, []);

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
