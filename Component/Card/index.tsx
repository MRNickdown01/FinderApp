import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";

const Card = ({ name, image, click }: any) => {
  return (
    <TouchableOpacity onPress={click}>
      <View style={[styles.card, styles.shadowProp]}>
        <Image source={image} style={styles.image}></Image>
        <Text
          style={{
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
    width: 110,
    height: 110,
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  image: {
    width: "80%",
    height: "80%",
  },
});

export default Card;
