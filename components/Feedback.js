import React from "react";
import { Text, View } from "react-native";
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import { Avatar } from "react-native-paper";


export default function Feedbacks(props) {

    // const renderFeedback = ({ item, index }) => {
    //     return (
    //       <View>
    //         <View>
    //           <Avatar.Image size={24} source={require('../assets/avatar.png')} />
    //           <Text>{item.author}</Text>
    //           <Text>{item.date}</Text>
    //         </View>
    //         <Text>Rating</Text>

    //         <Text>{item.comment}</Text>
    //       </View>
    //     )
    //   }

    return (
        <View>
            <View>
                <Avatar.Image size={24} source={require('../assets/avatar.png')} />
                <Text>{props.author}</Text>
                <Text>{props.date}</Text>
            </View>
            <StarRatingDisplay rating={props.rating} />

            <Text>{props.comment}</Text>
        </View>
    )
}