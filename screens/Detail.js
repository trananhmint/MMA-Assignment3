import { View, StyleSheet, Image, Text, ScrollView } from 'react-native'
import { useRoute } from '@react-navigation/native';
import React from 'react'
import watches from '../assets/watches';
import { Avatar, Button, Icon, IconButton } from 'react-native-paper';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import Feedbacks from '../components/Feedback';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Detail() {

  const route = useRoute();
  const watchId = route.params.id;
  const watch = watches.find((item) => {
    return Number(item.id) === Number(watchId)
  })
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

  const addToFavoriteList = async (watch) => {
    try {
      let updatedFavorites = [...favoriteList];
      const index = updatedFavorites.findIndex((item) => item.id === watch.id);

      if (index === -1) {
        updatedFavorites.push(watch);
      } else {
        updatedFavorites = updatedFavorites.filter(
          (item) => item.id !== watch.id
        );
      }

      await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setFavoriteList(updatedFavorites);
    } catch (error) {
      console.log(error);
    }
  };

  const isFavorite = favoriteList.some((favor) => Number(favor.id) === Number(watch.id))
  function showFeedbacks(feedbacks) {
    if (feedbacks) {
      return feedbacks.map((feedback, index) => {
        return <Feedbacks key={index} author={feedback.author} comment={feedback.comment} rating={feedback.rating} date={feedback.date} />
      })
    } else {
      return <Text>No comment</Text>
    }
  }

  function averageRating(feedbacks) {
    let averageRating = 0;
    if (feedbacks) {
      let total = feedbacks.reduce((accummulator, feedback) => {
        return accummulator += feedback.rating;
      }, 0)
      averageRating = total / feedbacks.length;
    }
    return averageRating.toFixed(1);
  }

  function numberRating(feedbacks) {
    if (feedbacks) return feedbacks.length;
    else return 0;
  }



  return (
    <ScrollView >
      <View style={styles.container}>
        <Image source={{ uri: `${watch.image}` }} style={styles.image} />
        <View>
          <Text style={styles.title} >{watch.watchName}</Text>
          <Text style={styles.price}>$ {watch.price}</Text>
          <IconButton
            onPress={() => addToFavoriteList(watch)}
            size={20}
            icon={isFavorite === false ? "cards-heart-outline" : "cards-heart"}
            iconColor="red"
          ></IconButton>

        </View>
      </View>
      <View style={styles.container}>
        <Text style={styles.title} >Description</Text>
        <Text style={styles.content}>Brand: {watch.brandName}</Text>
        <Text style={styles.content}>Automatic: {watch.automatic}</Text>
        <Text style={styles.content}>{watch.watchDescription}</Text>
      </View>


      <View style={styles.container}>
        <Text style={styles.title} >Feedbacks</Text>
        <StarRatingDisplay rating={averageRating(watch.feedbacks)} />
        <Text>({numberRating(watch.feedbacks)} feedbacks)</Text>
        {showFeedbacks(watch.feedbacks)}
      </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginTop: 4,
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    marginVertical: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginHorizontal: 20,
    marginVertical: 5,
  },
  price: {
    fontSize: 24,
    fontWeight: '600',
    color: 'red',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    marginHorizontal: 20,
    marginVertical: 4,
  },
}
);