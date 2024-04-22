import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Favorite from "./screens/Favorite";
import Home from "./screens/Home";
import Detail from "./screens/Detail";
import Ionicons from "react-native-vector-icons/FontAwesome";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Favorite") {
            iconName = "heart";
          }
          return <Ionicons name={iconName} color={color} size={20} />;
        },
        tabBarActiveTintColor: "orange",
        tabBarInactiveTintColor: "black",
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Favorite" component={Favorite} />
    </Tab.Navigator>
  );
}
function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen name="HomeScreen" component={TabNavigator} />
      <Stack.Screen
        name="DetailScreen"
        component={Detail}
        options={{ title: "Watch's Details" }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// }
// );
