import React from "react";
import { View, StyleSheet, Image, Text, Button } from "react-native";
import Card from "../../Component/Card";

const MainDashboard = ({ navigation }: any) => {
  const hospital = "../../assets/hospital.png";
  const resturant = "../../assets/restaurant.png";
  const medical = "../../assets/healthcare.png";
  const bank = "../../assets/bank_2.png";
  const school = "../../assets/open-book.png";
  const flight = "../../assets/flight.png";
  return (
    <View style={styles.container}>
      <View style={styles.mainCard}>
        <Card
          name="Hospital"
          image={require(hospital)}
          click={() => navigation.navigate("dashboard", { route: "hospital" })}
        />
        <Card
          name="Resturant"
          image={require(resturant)}
          click={() =>
            navigation.navigate("dashboard", { route: "restaurant" })
          }
        />
        <Card
          name="Medical"
          image={require(medical)}
          click={() => navigation.navigate("dashboard", { route: "pharmacy" })}
        />
        <Card
          name="School"
          image={require(school)}
          click={() => navigation.navigate("dashboard", { route: "school" })}
        />
        <Card
          name="Airport"
          image={require(flight)}
          click={() => navigation.navigate("dashboard", { route: "airport" })}
        />
        <Card
          name="Bank"
          image={require(bank)}
          click={() => navigation.navigate("dashboard", { route: "bank" })}
        />
      </View>
      <View style={styles.button}>
        <Button title="Dectet Automatic Location" color="#7805"></Button>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainCard: {
    flex: 3,
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16,
    gap: 10,
  },
  button: {
    position: "relative",
    bottom: 10,
    margin: 16,
  },
});

export default MainDashboard;
