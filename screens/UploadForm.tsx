import { gql, useMutation } from "@apollo/client";
import { StackScreenProps } from "@react-navigation/stack";
import { useEffect } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Text, TextInput, TouchableOpacity, View, ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import { colors } from "../colors";
import DismissKeyboard from "../components/DismissKeyboard";
import { FEED_FRAGMENT } from "../fragment";
import { TNav } from "../navigators/NavTypes";
import { ReactNativeFile } from "apollo-upload-client";
import { getAssetInfoAsync } from "expo-media-library";
import { Photo as ObjPhoto, UploadPhotoMutation } from "../src/gql/graphql";

const UPLOAD_PHOTO_MUTATION = gql`
    mutation uploadPhoto($file: Upload!, $caption: String) {
        uploadPhoto(file: $file, caption: $caption) {
          ...FeedFragment
        }
    }
    ${FEED_FRAGMENT}
`;

const Container = styled.View`
    flex:1;
    background-color: black;
    padding: 0px 50px;
`;

const Photo = styled.Image`
    height:400px;
`;
const CaptionContainer = styled.View`
    margin-top: 30px;
`;
const Caption = styled.TextInput`
    background-color: white;
    color:black;
    padding:10px 20px;
    border-radius: 20px;
`;

const HeaderRightText = styled.Text`
    color:white;
    font-size: 18px;
    font-weight:600;
    padding: 10px;
`;

type TForm = {
    caption: string;
}

type Props = StackScreenProps<TNav, "UploadForm">;
export default function UploadForm({ route: { params: { id, uri} }, navigation }: Props) {

    const [uploadPhotoMutation, {  loading }] = useMutation<UploadPhotoMutation>(UPLOAD_PHOTO_MUTATION,{
        update(cache,result){
            const uploadPhoto = result.data?.uploadPhoto as ObjPhoto;
            if(uploadPhoto.id){
                cache.modify({
                    id:"ROOT_QUERY",
                    fields:{
                        seeFeed(prev){
                            return [uploadPhoto, ...prev];
                        }
                    }
                })
            }

            navigation.navigate("TabsNav");
        }
    });


    /**
     *  header style
     *  */
    const HeaderRight = () => (
        <TouchableOpacity onPress={handleSubmit(onValid)}>
            <HeaderRightText>Next</HeaderRightText>
        </TouchableOpacity>
    );
    const HeaderRightLoading = () => <ActivityIndicator size="small" color={colors.instaBlue} style={{ marginRight: 10 }} />

    useEffect(() => {
        navigation.setOptions({
            headerRight: loading ? HeaderRightLoading : HeaderRight,
            ...(loading && { headerLeft: () => null }),
        })
    }, []);


    /**
     * react hook form
     */
    const { control, handleSubmit } = useForm<TForm>();
    const onValid: SubmitHandler<TForm> = async ({ caption }) => {

        const info = await getAssetInfoAsync(id);

        const file = new ReactNativeFile({
            uri: info.localUri!,
            name: `1.jpg`,
            type: "image/jpeg",
        });

        uploadPhotoMutation({
            variables: {
                caption,
                file
            }
        })
    }

    return (
        <DismissKeyboard>
            <Container>
                <Photo source={{ uri: uri }} resizeMode="contain" />
                <CaptionContainer>
                    <Controller
                        control={control}
                        name="caption"
                        rules={{}}
                        render={({ field: { value, onChange, } }) => (
                            <Caption placeholder="Write a caption"
                                placeholderTextColor="rgba(0,0,0,0.5)"
                                value={value}
                                onChangeText={onChange}
                                onSubmitEditing={handleSubmit(onValid)}
                            />
                        )}
                    />
                </CaptionContainer>
            </Container>
        </DismissKeyboard>
    )
}