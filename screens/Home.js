import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";
import { Button } from "react-native-paper";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import CardComponent from "../components/CardComponent";
import watches from "../assets/watches";

export default function Home() {
  const navigation = useNavigation();
  const [brand, setBrand] = useState("");

  const brands = [...new Set(watches.map((watch) => watch.brandName))];
  const brandsList = ["All", ...brands];

  const renderBrand = ({ item, index }) => {
    return (
      <Button
        style={styles.button}
        textColor="orange"
        buttonColor="white"
        mode="outlined"
        onPress={() => changeBrand(item)}
      >
        {item}
      </Button>
    );
  };

  function changeBrand(brand) {
    setBrand(brand);
  }
  function showWatch(brand, watches) {
    if (brand === "All" || brand === "") {
      return watches;
    } else {
      return watches.filter((watch) => {
        return watch.brandName === brand;
      });
    }
  }

  const renderWatch = ({ item, index }) => {
    return (
      <CardComponent
        key={item.id}
        id={item.id}
        image={item.image}
        watchName={item.watchName}
        price={item.price}
        index={index}
      />
    );
  };

  return (
    <View>
      <FlatList
        data={brandsList}
        renderItem={renderBrand}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.listContainer}
      />

      <FlatList
        data={showWatch(brand, watches)}
        renderItem={renderWatch}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  listContainer: {
    width: Dimensions.get("window").width - 20,
    margin: 10,
    // borderRadius: 20,
  },
  button: {
    marginHorizontal: 3,
    borderColor: "orange",
  },
  imageContainer: {
    margin: 15,
    borderRadius: 10,
    overflow: "hidden",
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
    marginHorizontal: 10,
    marginVertical: 5,
  },
  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    color: "red",
    marginHorizontal: 10,
    marginBottom: 10,
  },
});
