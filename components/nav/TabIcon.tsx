import Ionicons from '@expo/vector-icons/Ionicons';
import { OpaqueColorValue } from 'react-native';

type TTabIcon = {
    /**
        {@link https://expo.github.io/vector-icons/}
     */
    iconName: "home" | "search" | "camera" | "heart" | "person";
    focused: boolean;
    color: string | OpaqueColorValue;
}
export default function TabIcon(props: TTabIcon) {
    return (<Ionicons name={props.focused ? props.iconName : `${props.iconName}-outline`}
        color={props.color}
        size={props.focused ? 24 : 20} />);
}