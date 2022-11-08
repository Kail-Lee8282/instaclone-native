import { View, Text } from "react-native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { TNav } from "../navigators/NavTypes";



type Props = BottomTabNavigationProp<TNav, "Notification">;
export default function Notification() {
    return (
        <View style={{
            backgroundColor: "black", flex: 1,
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Text style={{ color: "white" }}>Notification</Text>
        </View>
    )
}