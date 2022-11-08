import { StackScreenProps } from "@react-navigation/stack";
import React, { useRef } from "react";
import { KeyboardAvoidingView, Platform, TextInput } from "react-native";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput as CusTextInput } from "../components/auth/AuthShare";
import { RootStack } from "../navigators/LoggedOutNav";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { graphql } from "../src/gql";
import { useMutation } from "@apollo/client";

const CREATE_ACCOUNT_MUTATION = graphql(`
    mutation createAccount($firstName: String!, $userName: String!, $email: String!, $password: String!, $lastName: String) {
    createAccount(firstName: $firstName, userName: $userName, email: $email, password: $password, lastName: $lastName) {
      ok
      id
      error
    }
  }
`)

type TFormData = {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
};
type Props = StackScreenProps<RootStack, "CreateAccount">;
export default function CreateAccount(props: Props) {
    //const lastNameRef:React.MutableRefObject<TextInput|null> = useRef(null);
    const lastNameRef = useRef<TextInput>(null);
    const userNameRef = useRef<TextInput>(null);
    const emailRef = useRef<TextInput>(null);
    const passwordRef = useRef<TextInput>(null);

    const { control, handleSubmit, getValues } = useForm<TFormData>();
    const [createAccountMutation, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION,
        {
            onCompleted(data) {
                if (data.createAccount?.ok) {
                    const {userName, password} = getValues();
                    props.navigation.navigate("Login", {
                        userName,
                        password
                    });
                }
            },
        });

    const onValid: SubmitHandler<TFormData> = (data) => {
        if (!loading) {
            createAccountMutation({
                variables: {
                    ...data
                }
            })
        }
    }

    const onNext = (nextOne: React.RefObject<TextInput>) => {
        nextOne?.current?.focus();
    }

    return (
        <AuthLayout>
            <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <CusTextInput
                        placeholder="First Name"
                        placeholderTextColor={"rgba(255,255,255,0.6)"}
                        returnKeyType="next"
                        onSubmitEditing={() => onNext(lastNameRef)}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                    />
                )}
                name="firstName"
            />
            <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <CusTextInput
                        ref={lastNameRef}
                        placeholder="Last Name"
                        placeholderTextColor={"rgba(255,255,255,0.6)"}
                        returnKeyType="next"
                        onSubmitEditing={() => onNext(userNameRef)}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                    />
                )}
                name="lastName"
            />
            <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <CusTextInput
                        ref={userNameRef}
                        placeholder="User Name"
                        autoCapitalize="none"
                        placeholderTextColor={"rgba(255,255,255,0.6)"}
                        returnKeyType="next"
                        onSubmitEditing={() => onNext(emailRef)}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                    />
                )}
                name="userName"
            />
            <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <CusTextInput
                        ref={emailRef}
                        placeholder="Email"
                        placeholderTextColor={"rgba(255,255,255,0.6)"}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        returnKeyType="next"
                        onSubmitEditing={() => onNext(passwordRef)}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                    />
                )}
                name="email"
            />
            <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <CusTextInput
                        ref={passwordRef}
                        placeholder="Password"
                        placeholderTextColor={"rgba(255,255,255,0.6)"}
                        secureTextEntry
                        returnKeyType="done"
                        returnKeyLabel="Create Account"
                        lastone={true}
                        onSubmitEditing={handleSubmit(onValid)}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                    />
                )}
                name="password"
            />
            <AuthButton
                disabled={false}
                loading={loading}
                text="Create Account"
                onPress={handleSubmit(onValid)} />
        </AuthLayout>
    )
}