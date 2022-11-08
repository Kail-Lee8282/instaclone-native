import { createStackNavigator } from "@react-navigation/stack"
import { TNav } from "../../navigators/NavTypes";
import Room from "../../screens/Room";
import Rooms from "../../screens/Rooms";
import { Ionicons } from "@expo/vector-icons";

const Stack = createStackNavigator<TNav>();

export default function MessagesNav() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTintColor: "white",
                headerBackTitleVisible: false,
                headerStyle:{
                    backgroundColor:"black"
                }
            }}
        >
            <Stack.Screen name="Rooms"
                options={{
                    headerBackImage(props) {
                        return <Ionicons name="chevron-down" color={props.tintColor} size={30} />
                    },
                }}
                component={Rooms} />
            <Stack.Screen name="Room"
             options={{
                headerBackImage(props) {
                    return <Ionicons name="chevron-back" color={props.tintColor} size={30} />
                },
            }}
             component={Room} />
        </Stack.Navigator>
    )
}