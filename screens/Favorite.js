import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import FavoriteCard from "../components/FavoriteCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";

export default function Favorite() {
  const [favoriteList, setFavoriteList] = React.useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadFavorites = async () => {
    setIsLoading(true);
    try {
      const savedFavorites = await AsyncStorage.getItem("favorites");
      if (savedFavorites !== null) {
        const parsedFavorites = JSON.parse(savedFavorites);
        const uniqueFavorites = parsedFavorites.reduce((acc, current) => {
          const x = acc.find((item) => item.id === current.id);
          if (!x) {
            return acc.concat([current]);
          } else {
            return acc;
          }
        }, []);
        setFavoriteList(uniqueFavorites);
      } else {
        setFavoriteList([]);
      }
    } catch (error) {
      console.error("Error loading favorites:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadFavorites();
    }, [])
  );

  const clearFavourites = async () => {
    await AsyncStorage.removeItem("favorites");
    await loadFavorites();
  };
  const removeFavourites = async (favorId) => {
    const updatedFavorites = favoriteList.filter(
      (favor) => favor.id !== favorId
    );

    try {
      await AsyncStorage.clear();
      await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));

      setFavoriteList(updatedFavorites);
    } catch (error) {}
  };
  // React.useEffect(() => {
  //   loadFavorites();
  // }, []);
  return (
    <View>
      {favoriteList.map((favor) => {
        return (
          <FavoriteCard
            key={favor.id}
            id={favor.id}
            watchName={favor.watchName}
            price={favor.price}
            images={favor.image}
            handle={() => removeFavourites(favor.id)}
          />
        );
      })}
      <Button
        textColor="#DD5746"
        mode="elevated"
        onPress={() => {
          clearFavourites();
        }}
      >
        <Text>Clear All</Text>
      </Button>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
