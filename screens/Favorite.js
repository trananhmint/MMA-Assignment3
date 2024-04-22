import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import FavoriteCard from '../components/FavoriteCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-paper';

export default function Favorite() {
  const [favoriteList, setFavoriteList] = React.useState([]);

  const loadFavorites = async () => {
    try {
      const savedFavorites = await AsyncStorage.getItem("favorites");
      if (savedFavorites !== null) {
        const parsedFavorites = JSON.parse(savedFavorites);
        const uniqueFavorites = [...new Set(parsedFavorites)];
        setFavoriteList(uniqueFavorites);
      }
    } catch (error) {
      console.error("Error loading favorites:", error);
    }
  };

  React.useEffect(() => {
    loadFavorites();
  }, []);
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
          />
        );
      })}
      <Button
        textColor="#DD5746"
        mode="elevated"
        onPress={() => AsyncStorage.clear()}
      >
        <Text>Clear All</Text>
      </Button>

    </View >
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
}
);