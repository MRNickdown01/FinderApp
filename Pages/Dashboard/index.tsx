import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  Button,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import * as Location from "expo-location";
import { PlacesAPIResponse } from "../../type";
import Ionicons from "@expo/vector-icons/Ionicons";
import { GMAP_API_KEY } from "@env";

const Dashboard: React.FC = ({ route }: any) => {
  const star = "../../assets/star_1.png";
  const [location, setLocation] = useState<Location.LocationObject>();
  const [errorMsg, setErrorMsg] = useState<String | null>(null);
  const [loading, setLoading] = useState(true);
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
      await getResturant(location);
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
  console.log(route?.params?.route);
  console.log(location?.coords?.longitude);

  const getResturant = (location: Location.LocationObject) => {
    setLoading(true);
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location?.coords?.latitude}%2C${location?.coords?.longitude}&radius=3000&type=${route?.params?.route}&key=${GMAP_API_KEY}`;

    fetch(url)
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((res: PlacesAPIResponse) => {
        console.log(res?.results);
        setResturants(res?.results);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      })
      .catch((err: any) => {
        console.log(err);
        setLoading(false);
      });
  };
  const getResturantDetail = (resturant: PlacesAPIResponse["results"][0]) => {};

  console.log(resturants);
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {location && (
        <View style={styles.map_parent}>
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
            style={styles.map}
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
                <Callout
                  onPress={() => getResturantDetail(resturant)}
                ></Callout>
              </Marker>
            ))}
          </MapView>
        </View>
      )}
      <ScrollView>
        {resturants?.map((i, id) => (
          <View style={styles.cardMain} key={id}>
            <View style={[styles.card, styles.shadowProp]}>
              <View>
                <Text style={styles.heading}>{i?.name}</Text>
              </View>
              <Text>{i?.vicinity}</Text>
              {i?.rating !== undefined && (
                <View style={styles.rating}>
                  <Image source={require(star)} style={styles.icon}></Image>
                  <Image source={require(star)} style={styles.icon}></Image>
                  <Image source={require(star)} style={styles.icon}></Image>
                  <Text>{i?.rating}</Text>
                </View>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map_parent: {
    width: "100%",
    height: "50%",
  },
  map: {
    width: "100%",
    height: "100%",
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
  rating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  image: {
    width: 300,
  },
  icon: {
    width: 15,
    height: 15,
  },
  loader: {
    position: "relative",
    top: "50%",
  },
});
export default Dashboard;
