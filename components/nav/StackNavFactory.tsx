import { BottomTabBar } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Image, Text, View } from 'react-native';
import Feed from '../../screens/Feed';
import Likes from '../../screens/Likes';
import Me from '../../screens/Me';
import Notification from '../../screens/Notifications';
import Photo from '../../screens/Photo';
import Profile from '../../screens/Profile';
import Search from '../../screens/Search';
import Comments from '../../screens/Comments';
import { TNav } from '../../navigators/NavTypes';


type TStackNavFactory = {
    screenName: "TabFeed" | "TabSearch" | "TabNotification" | "TabMe";
}

const Stack = createStackNavigator<TNav>();
export default function StackNavFactory({ screenName }: TStackNavFactory) {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "black",
                },
                headerTintColor: "white",
                headerBackTitleVisible:false,
            }}>
            {screenName === "TabFeed" ? <Stack.Screen name={"Feed"} component={Feed} 
                options={{
                    headerTitle:()=>{
                        return <Image 
                        style={{
                            height:40,
                            width:100
                        }}
                        resizeMode='contain' source={require("../../assets/Instagram_logo_white.png")}/>
                    }
                }}
            /> : null}
            {screenName === "TabSearch" ? <Stack.Screen name={"Search"} component={Search} /> : null}
            {screenName === "TabNotification" ? <Stack.Screen name={"Notification"} component={Notification} /> : null}
            {screenName === "TabMe" ? <Stack.Screen name={"Me"} component={Me} /> : null}
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Photo" component={Photo} />
            <Stack.Screen name="Likes" component={Likes} />
            <Stack.Screen name="Comments" component={Comments} />
        </Stack.Navigator>
    )
}