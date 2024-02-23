import React, { FC, useEffect, useState } from "react";
import { Button, LogBox, View, StyleSheet, Text } from "react-native";
import { Audio } from "expo-av";
import LottieView from "lottie-react-native";

const LottieFiles: FC = ({ navigation }: any) => {
  LogBox.ignoreLogs(["new NativeEventEmitter"]);
  LogBox.ignoreAllLogs();
  const [sound, setSound]: any = useState();

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/Audio/UPI_mogo_1_sec.mp3")
    );
    setSound(sound);
    console.log("Playing sound");
    await sound.playAsync();

    setTimeout(() => {
      navigation.navigate("dashboard");
    }, 2000);
  };

  useEffect(() => {
    return sound
      ? () => {
          console.log("unloading sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);
  return (
    <View style={styles.container}>
      <LottieView
        style={styles.lottie}
        source={require("../../assets/walking.json")}
        autoPlay
      />
      <Text style={styles.text}> You can find out anything</Text>
      <Button title="Play Sound" onPress={() => playSound()} />
      <Button
        title="Route"
        onPress={() => navigation.navigate("main-dashboard")}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lottie: {
    flex: 1,
  },
  text: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "600",
    position: "relative",
    bottom: 80,
    color: "#7073D7",
  },
});

export default LottieFiles;
