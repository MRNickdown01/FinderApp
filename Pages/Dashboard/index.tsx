import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  Button,
  ScrollView,
  Image,
} from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import * as Location from "expo-location";
import { PlacesAPIResponse } from "../../type";
import Ionicons from "@expo/vector-icons/Ionicons";

const Dashboard: React.FC = ({ navigation }: any) => {
  const [location, setLocation] = useState<Location.LocationObject>();
  const [errorMsg, setErrorMsg] = useState<String | null>(null);
  const [resturants, setResturants] = useState<PlacesAPIResponse["results"]>(
    []
  );

  const requestPermisson = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    if (location !== undefined) {
      setLocation(location);
    }
    console.log(location?.coords?.latitude);
  };
  useEffect(() => {
    requestPermisson();
  }, []);

  let text: any = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
    console.log(text?.coords);
  }
  console.log(location?.coords?.latitude);
  console.log(location?.coords?.longitude);

  const getResturant = () => {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location?.coords?.latitude}%2C${location?.coords?.longitude}&radius=3000&type=restaurant&key=AIzaSyBO7_HNRR37vNAkKNy92vsIZ5rEjQFoHUQ`;

    fetch(url)
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((res: PlacesAPIResponse) => {
        console.log(res?.results);
        setResturants(res?.results);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };
  const getResturantDetail = (resturant: PlacesAPIResponse["results"][0]) => {};

  console.log(resturants);
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {location && (
        <MapView
          initialRegion={{
            latitude: location?.coords?.latitude!,
            longitude: location?.coords?.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
          showsUserLocation
          showsMyLocationButton
          userLocationPriority="high"
          moveOnMarkerPress
          showsScale
          style={styles?.map}
        >
          {resturants?.map((resturant, i) => (
            <Marker
              key={i}
              coordinate={{
                latitude: resturant?.geometry?.location?.lat,
                longitude: resturant?.geometry?.location?.lng,
              }}
              title={resturant?.name}
            >
              <Callout onPress={() => getResturantDetail(resturant)}></Callout>
            </Marker>
          ))}
        </MapView>
      )}

      <Button title="Resturant" onPress={() => getResturant()} />
      <ScrollView>
        {resturants?.map((i, id) => (
          <View style={styles.cardMain} key={id}>
            <View style={[styles.card, styles.shadowProp]}>
              <View>
                <Text style={styles.heading}>{i?.name}</Text>
              </View>
              <Text>{i?.vicinity}</Text>
              <View>
                <Text>{i?.rating}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      <Image src={"../../assets/star.png"} style={{ width: 50, height: 50 }} />
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
  cardMain: {
    margin: 16,
  },
  heading: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 13,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 25,
    width: "100%",
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  image: {
    width: 300,
  },
});
export default Dashboard;
