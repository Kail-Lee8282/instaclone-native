import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { TouchableOpacity } from "react-native";
import { RootStack } from "../navigators/LoggedOutNav";
import styled from "styled-components/native";
import { colors } from "../colors";
import AuthLayout from "../components/auth/AuthLayout";
import AuthButton from "../components/auth/AuthButton";


const CreateAccountText = styled.Text`
    color:white;
    text-align: center;
`;

const LoginLink = styled.Text`
  color:${colors.instaBlue};
  font-weight: 600;
  margin-top:30px;
`;

type Props = StackScreenProps<RootStack, "Welcome">;
export default function Welcome({ navigation }: Props) {
    
    const goToCreateAccount = () => navigation.navigate("CreateAccount");
    const goToLogIn = () => navigation.navigate("Login");
    return (
        <AuthLayout>
            <AuthButton disabled={false} onPress={goToCreateAccount} text="Create New Account"/>

            <TouchableOpacity onPress={goToLogIn}>
                <LoginLink>Log in</LoginLink>
            </TouchableOpacity>
        </AuthLayout>
    )
}