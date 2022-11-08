import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Welcome from "../screens/Welcome";
import Login from "../screens/Login";
import CreateAccount from "../screens/CreateAccount";


export type RootStack = {
    Welcome: undefined,
    Login?: {
        userName?:string,
        password?:string,
    },
    CreateAccount: undefined,
}
const Stack = createStackNavigator<RootStack>();

export default function LoggedOutNav() {
    return (
        <Stack.Navigator  initialRouteName="Welcome"
            screenOptions={{
                presentation: "card",
                headerBackTitleVisible: false,
                headerTitle:"",
                headerTransparent:true,
                headerTintColor:"white",
            }} >
            <Stack.Screen name="Welcome" component={Welcome} 
                options={{headerShown:false}} 
                />
            <Stack.Screen name="Login" component={Login}
                options={{}}
            />
            <Stack.Screen name="CreateAccount" component={CreateAccount}
                options={{}}
            />
        </Stack.Navigator>
    )
}