import { View, Text } from "react-native";
import useMe from "../hooks/useMe";
import { StackScreenProps } from "@react-navigation/stack";
import { useEffect } from "react";
import { TNav } from "../navigators/NavTypes";


type Props = StackScreenProps<TNav, "Me">;
export default function Me({navigation}:Props) {

    const {data} = useMe();

    useEffect(()=>{
        navigation.setOptions({
            headerTitle:data?.me?.userName
        })
    },[]);
    
    

    console.log(data);

    return (
        <View style={{
            backgroundColor: "black", flex: 1,
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Text style={{ color: "white" }}>{data?.me?.userName}</Text>
        </View>
    )
}