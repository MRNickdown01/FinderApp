import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, Button } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
const Dashboard = () => {
  const requestPermisson = async () => {
    const [location, setLocation] = useState<String | null>(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
      (async () => {
        debugger;
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          // setErrorMsg('Permission to access location was denied');
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        console.log(location);
      })();
    }, []);

    let text = "Waiting..";
    if (errorMsg) {
      text = errorMsg;
    } else if (location) {
      text = JSON.stringify(location);
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <MapView
        initialRegion={{
          latitude: 42.191586,
          longitude: -112.250801,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={styles?.map}
      />
      <Button title="Location" onPress={() => requestPermisson()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "50%",
  },
});
export default Dashboard;
