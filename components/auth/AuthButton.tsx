import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import { colors } from "../../colors";

const CreateAccount = styled.TouchableOpacity<{ disabled: boolean }>`
background-color: ${colors.instaBlue};
padding:15px 10px;
border-radius: 5px;
width: 100%;
opacity:${props => props.disabled ? "0.5" : "1"};
`;

const CreateAccountText = styled.Text`
color:white;
text-align: center;
`;

type AuthButtonProps ={
    onPress?:()=>void;
    disabled?:boolean;
    text?:string;
    loading?:boolean;
}

export default function AuthButton(props:AuthButtonProps) {
    return (
        <CreateAccount disabled={props.disabled} onPress={props.onPress}>
            {
                props.loading?<ActivityIndicator color="white"/>:<CreateAccountText>{props.text}</CreateAccountText>
            }
        </CreateAccount>
    )
}