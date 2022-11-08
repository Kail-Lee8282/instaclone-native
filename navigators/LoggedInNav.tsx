import 'react-native-gesture-handler';
import useMe from "../hooks/useMe";
import { createStackNavigator } from "@react-navigation/stack";
import TabsNav from "./TabsNav";
import UploadNav from "./UploadNav";
import UploadForm from '../screens/UploadForm';
import { TNav } from './NavTypes';
import {Ionicons} from '@expo/vector-icons'
import MessagesNav from '../components/nav/MessagesNav';

const Stack = createStackNavigator<TNav>();

export default function LoggedInNav() {
    const { data } = useMe();

    return (
        <Stack.Navigator
            screenOptions={
                {
                    headerShown: false,
                    presentation:"modal",
                    headerMode:"screen",
                }
            }
            initialRouteName="TabsNav">
            <Stack.Screen name="TabsNav" component={TabsNav} />
            <Stack.Screen name="UploadNav" component={UploadNav} />
            <Stack.Screen name="UploadForm" component={UploadForm} 
            options={
                {
                    headerShown:true,
                    headerTintColor:"white",
                    headerStyle:{
                        backgroundColor:"black"
                    },
                    title:"Upload",
                    headerBackTitleVisible:false,
                    headerBackImage(props) {
                        return <Ionicons color={props.tintColor} name="close" size={30}/>
                    },
                }
            }/>
            <Stack.Screen name="Messages" component={MessagesNav}/>
        </Stack.Navigator>
    )
}
