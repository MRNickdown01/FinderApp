import React, { FC, useEffect, useState } from "react";
import { Button, LogBox, View, StyleSheet } from "react-native";
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
        source={require("../../assets/atrology_animation.json")}
        autoPlay
      />
      <Button title="Play Sound" onPress={() => playSound()} />
      <Button title="Route" onPress={() => navigation.navigate("dashboard")} />
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
});

export default LottieFiles;
