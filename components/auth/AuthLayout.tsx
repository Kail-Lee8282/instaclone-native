import React, { ReactNode } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from "react-native";
import styled from "styled-components/native";
import DismissKeyboard from "../DismissKeyboard";


const Container = styled.View`
    flex:1;
    align-items: center;
    justify-content: center;
    background-color: black;
    padding: 0px 40px;
`;

const Logo = styled.Image`
    max-width: 25%;
    margin-bottom:50px;
    width: 100%;
    height:100px;
`;

type AuthLayoutProps = {
    children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {    
    return (
        <DismissKeyboard>
            <Container>
                <KeyboardAvoidingView
                    style={{
                        width: "100%",
                        justifyContent:"center",
                        alignItems:"center"
                    }}
                    behavior="padding"
                    keyboardVerticalOffset={Platform.OS === "ios" ? 30 : 0}>

                    <Logo resizeMode="contain" source={require("../../assets/Instagram_Glyph_Gradient.png")} />
                    {children}
                </KeyboardAvoidingView>
            </Container>
        </DismissKeyboard>
    )
}