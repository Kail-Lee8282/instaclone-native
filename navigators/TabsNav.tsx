import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, View } from "react-native";
import TabIcon from "../components/nav/TabIcon";
import StackNavFactory from "../components/nav/StackNavFactory";
import useMe from "../hooks/useMe";
import { StackScreenProps } from "@react-navigation/stack";
import { TNav } from "./NavTypes";

const Tabs = createBottomTabNavigator<TNav>();
export default function TabsNav() {
    const { data } = useMe();

    return (
        <Tabs.Navigator screenOptions={
            {
                headerShown: false,
                tabBarStyle: { backgroundColor: "black", borderTopColor: "rgba(255,255,255,0.3)" },
                tabBarActiveTintColor: "white",
                tabBarShowLabel: false,
            }}
        >
            <Tabs.Screen
                name="TabFeed"
                options={{
                    tabBarIcon(props) {
                        return (
                            <TabIcon iconName="home"
                                color={props.color}
                                focused={props.focused} />)
                    },
                }}
            >
                {() => <StackNavFactory screenName="TabFeed" />}
            </Tabs.Screen>
            <Tabs.Screen name="TabSearch"
                options={{
                    tabBarIcon(props) {
                        return (
                            <TabIcon iconName="search"
                                color={props.color}
                                focused={props.focused} />);
                    },
                }}>
                {() => <StackNavFactory screenName="TabSearch" />}
            </Tabs.Screen>
            <Tabs.Screen name="TabCamera" component={View}
                listeners={({ navigation }) => {
                    return {
                        tabPress: (e) => {
                            e.preventDefault();
                            navigation.navigate("UploadNav");
                        }
                    }
                }}
                options={{
                    tabBarIcon(props) {
                        return (
                            <TabIcon iconName="camera"
                                color={props.color}
                                focused={props.focused} />);
                    },
                }} />
            <Tabs.Screen name="TabNotification"
                options={{
                    tabBarIcon(props) {
                        return (
                            <TabIcon iconName="heart"
                                color={props.color}
                                focused={props.focused} />);
                    },
                }}>
                {() => <StackNavFactory screenName="TabNotification" />}
            </Tabs.Screen>
            <Tabs.Screen name="TabMe"
                options={{
                    tabBarIcon(props) {
                        if (data?.me?.avatar) {
                            return (
                                <Image
                                    source={{ uri: data.me.avatar }}
                                    style={{
                                        width: 30, height: 30, borderRadius: 15,
                                        ...(props.focused && { borderColor: "white", borderWidth: 1 })
                                    }}
                                />)
                        } else {
                            return (
                                <TabIcon iconName="person"
                                    color={props.color}
                                    focused={props.focused} />);
                        }
                    },
                }}>
                {() => <StackNavFactory screenName="TabMe" />}
            </Tabs.Screen>

        </Tabs.Navigator>
    )
}
