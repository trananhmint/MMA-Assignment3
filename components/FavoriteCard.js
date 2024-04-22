import { View, Text, StyleSheet, Image } from 'react-native'
import { Avatar, Card, IconButton } from "react-native-paper";
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FavoriteCard(props) {
    const [favoriteList, setFavoriteList] = React.useState([]);

    const loadFavorites = async () => {
        try {
            const savedFavorites = await AsyncStorage.getItem("favorites");
            if (savedFavorites !== null) {
                const parsedFavorites = JSON.parse(savedFavorites);
                // Remove duplicates using Set
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

    const removeFromFavorites = async (id) => {
        try {
            const updatedFavorites = favoriteList.filter(
                (fav) => Number(fav.id) !== Number(id)
            );
            await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
            setFavoriteList(updatedFavorites);
        } catch (error) {
            console.error("Error removing from favorites:", error);
        }
    };
    return (
        <View style={styles.container}>
            <Image source={{ uri: `${props.images}` }} style={styles.image} />
            <View style={styles.detailsContainer}>
                <View>
                    <Text style={styles.watchName} ellipsizeMode="tail">
                        {props.watchName}
                    </Text>
                    <Text style={styles.price}>${props.price}</Text>
                </View>
            </View>
            <IconButton
                size={20}
                icon={"heart-remove-outline"}
                style={styles.iconRemove}
                iconColor="red"
                onPress={() => removeFromFavorites(props.id)}
            ></IconButton>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    image: {
        width: 80,
        height: 80,
        marginRight: 10,
    },
    detailsContainer: {
        flex: 1,
    },
    watchName: {
        fontSize: 16,
        fontWeight: "bold",
    },
    price: {
        fontSize: 14,
        color: "#FF204E",
        fontWeight: "bold",
    },
    iconRemove: {
        marginTop: 20,
        textAlign: "center",
    },
});