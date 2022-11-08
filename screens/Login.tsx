import { StackScreenProps } from "@react-navigation/stack";
import React, { useRef } from "react";
import { useForm ,Controller} from "react-hook-form";
import { TextInput } from "react-native";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput as CusTextInput } from "../components/auth/AuthShare";
import { RootStack } from "../navigators/LoggedOutNav";
import { useMutation } from "@apollo/client";
import { isLoggedInVar, loginUserIn } from "../apollo";
import { graphql } from "../src/gql";

const LOG_IN_MUTATION = graphql(`
    mutation login($userName: String!, $password: String!) {
        login(userName: $userName, password: $password) {
            ok
            token
            error
        }
    }
`);

type TFormData = {
    userName: string;
    password: string;
};
type Props = StackScreenProps<RootStack, "Login">

export default function Login({ route:{params} }: Props) {
    const passwordRef = useRef<TextInput>(null);
    const onNext = (nextOne: React.RefObject<TextInput>) => {
        nextOne?.current?.focus();
    }

    const [loginMutation, {loading}] = useMutation(LOG_IN_MUTATION,
        {
            onCompleted: async (data) => {
                if(data.login?.ok){
                   await loginUserIn(data?.login?.token!);
                }
            },
        }
        );
    const { register,  handleSubmit, setValue, watch, control } = useForm<TFormData>({
        defaultValues:{
            userName:params?.userName,
            password:params?.password
        }
    });
    const onSubmit = handleSubmit(data => { 
        if(!loading){
            loginMutation({
                variables:{
                    ...data
                }
            })
        }
     });

    React.useEffect(() => {
        
        register("password");
    }, [register]);


    return (
        <AuthLayout>
            <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <CusTextInput
                        placeholder="User Name"
                        autoCapitalize="none"
                        placeholderTextColor={"rgba(255,255,255,0.6)"}
                        returnKeyType="next"
                        onSubmitEditing={() => onNext(passwordRef)}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                    />
                )}
                name="userName"
            />
            {/* <CusTextInput
                placeholder="User Name"
                placeholderTextColor={"rgba(255,255,255,0.6)"}
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() => { onNext(passwordRef) }}
                onChangeText={(text: string) => setValue("userName", text)}
            /> */}
            <CusTextInput
                ref={passwordRef}
                placeholder="Password"
                placeholderTextColor={"rgba(255,255,255,0.6)"}
                secureTextEntry
                returnKeyType="done"
                returnKeyLabel="Create Account"
                lastone={true}
                onChangeText={(text: string) => setValue("password", text)}
                value={watch("password")}
                onSubmitEditing={onSubmit}
            />
            <AuthButton
             disabled={(!watch("userName") || !watch("password"))} 
             loading={loading}
             text="Log in" 
             onPress={onSubmit} />
        </AuthLayout>
    )
}