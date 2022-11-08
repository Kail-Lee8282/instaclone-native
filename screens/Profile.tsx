import { View, Text } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { useEffect } from "react";
import { TNav } from "../navigators/NavTypes";


type Props = StackScreenProps<TNav, "Profile">;
export default function Profile({ route, navigation }: Props) {

    useEffect(() => {
        if (route.params.userName) {
            navigation.setOptions({
                title: route.params.userName
            });
        }
    },[]);

    return (
        <View style={{
            backgroundColor: "black", flex: 1,
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Text style={{ color: "white" }}>{route.params.userName} Profile</Text>
        </View>
    )
}