import LottieView from "lottie-react-native";
import { useState, useEffect } from "react";
import { StyleSheet, View, Text, LogBox, Button } from "react-native";
import { Audio } from "expo-av";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LottieFiles from "./Pages/LottieFiles";
import Dashboard from "./Pages/Dashboard";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="lottiefiles"
          component={LottieFiles}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="dashboard"
          component={Dashboard}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
