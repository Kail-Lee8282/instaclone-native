import { ReactNode } from "react";
import { Keyboard, Platform, TouchableWithoutFeedback } from "react-native";

type TDismissKeyboard = {
    children: ReactNode;
};
export default function DismissKeyboard({ children }: TDismissKeyboard) {
    
    const dismissKeyboard = () => {
        Keyboard.dismiss();
    }

    return (
        <TouchableWithoutFeedback
            style={{ flex: 1 }}
            onPress={dismissKeyboard}
            disabled={Platform.OS === "web"}>

            {children}
        </TouchableWithoutFeedback>
    );
}