import 'react-native-gesture-handler';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import SelectPhoto from '../screens/SelectPhoto';
import TaskPhoto from '../screens/TaskPhoto';
import {Ionicons} from '@expo/vector-icons'
import { TNav } from './NavTypes';


const Stack = createStackNavigator<TNav>();
const Tab = createMaterialTopTabNavigator<TNav>();
export default function UploadNav(){
    return(
        <Tab.Navigator 
        initialRouteName='Select'
        tabBarPosition='bottom' 
        screenOptions={{
            tabBarStyle:{
                backgroundColor:"black",
            },
            tabBarActiveTintColor:"white",
            tabBarIndicatorStyle:{
                backgroundColor:"white",
                top:0,
            }
        }}
            >
            <Tab.Screen name="Select">
                {
                    ()=> (
                        <Stack.Navigator
                        screenOptions={{
                            headerTintColor:"white",
                            headerBackTitleVisible:false,
                            headerBackImage(props) {
                                return <Ionicons color={props.tintColor} name="close" size={30}/>
                            },
                            headerStyle:{
                                backgroundColor:"black",
                                shadowOpacity:0.3
                            },
                        }}
                        >
                            <Stack.Screen name='SelectPhoto' component={SelectPhoto}
                            options={
                                {
                                    title:"Choose a photo",
                                    headerTintColor:"white",
                                    headerBackTitleVisible:false,
                                }
                            }
                            />
                        </Stack.Navigator>
                    )
                }
            </Tab.Screen>
            <Tab.Screen name="TaskPhoto" component={TaskPhoto}/>
        </Tab.Navigator>
    )
}