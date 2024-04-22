import * as React from 'react';
import { Avatar, Card } from 'react-native-paper';
import { View, Text, StyleSheet, Button, SafeAreaView, FlatList, Image, TouchableWithoutFeedback, Dimensions, Pressable } from 'react-native'
import { MotiView } from 'moti';
import { useNavigation } from '@react-navigation/native';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />



const CardComponent = (props) => {

  const navigation = useNavigation();


  const handleOnPress = (getId) => {
    navigation.navigate('DetailScreen', {
      id: getId,
    })
  }

  return (
    <Pressable android_ripple={{ color: '#f5c77e' }} style={styles.container} onPress={() => handleOnPress(props.id)}>
      <MotiView
        style={styles.listContainer}
        from={{ opacity: 0, translateY: 50 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: `${props.index}` * 100 }}
      >
        <View style={styles.imageContainer} >
          <Image source={{ uri: `${props.image}` }} style={styles.image} />
        </View>
        <Text style={styles.name} numberOfLines={2} ellipsizeMode='tail'>{props.watchName}</Text>
        <Text style={styles.price}>${props.price}</Text>
        {/* <Text>{item.rating} <Ionicons name='star' color='yellow' size={20} /></Text> */}
      </MotiView>
    </Pressable>
  )

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 20,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  listContainer: {
    width: Dimensions.get('window').width / 2 - 20,
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 20,
  },
  imageContainer: {
    margin: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    marginHorizontal: 10,
    marginVertical: 5,
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: 'red',
    marginHorizontal: 10,
    marginBottom: 10,
  },
}
);

export default CardComponent;