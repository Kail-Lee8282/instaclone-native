import { useEffect, useState } from "react";
import { FlatList, Image, ListRenderItem, StatusBar, Text, useWindowDimensions, View } from "react-native";
import styled from "styled-components/native";
import {
    Asset as MediaAsset, getAssetsAsync, getPermissionsAsync,
    requestPermissionsAsync
} from 'expo-media-library';
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons"
import { colors } from "../colors";
import { StackScreenProps } from "@react-navigation/stack";
import { TNav } from "../navigators/NavTypes";

const Container = styled.View`
    flex:1;
    background-color: black;
`;

const Top = styled.View`
flex:1;
`;

const Bottom = styled.View`
flex:1;
`;

const ImageContainer = styled.TouchableOpacity`
    
`;
const IconContainer = styled.View`
    position: absolute;
    bottom:5px;
    right:5px;
`;

const HeaderRightText = styled.Text`
    color:white;
    font-size: 18px;
    font-weight:600;
    padding: 10px;
`;

type TLocalPhoto = {
    id: string;
    creationTime: number;
    filename: string;
    height: number;
    width: number;
    uri: string;
    mediaType: string;
    duration: number;
}

type ChoosePhoto ={
    id:string;
    uri:string;
}
type Props = StackScreenProps<TNav, "SelectPhoto">;
export default function SelectPhoto({ navigation }: Props) {

    const [ok, setOk] = useState(false);
    const [photos, setPhotos] = useState<MediaAsset[]>();
    const [choosePhoto, setChoosePhoto] = useState<ChoosePhoto>({id:"",uri:""});

    const HeaderRight = () => (
        <TouchableOpacity onPress={()=> {
            navigation.navigate("UploadForm",{
                id:choosePhoto.id,
                uri:choosePhoto.uri,
                });
        }

        }>
            <HeaderRightText>Next</HeaderRightText>
        </TouchableOpacity>
    );
    useEffect(() => {
        navigation.setOptions({
            headerRight: HeaderRight,
        });
    }, [choosePhoto]);

    const getPhoto = async () => {
        try{
        const { assets: photos } = await getAssetsAsync();
        setPhotos(photos);
        setChoosePhoto({id:photos[0].id, uri:photos[0].uri});
        }catch(e){
            console.log(e);
        }
    };


    // 사진 접근 요청
    const getPermission = async () => {
        try {
            // 권한 확인
            const { accessPrivileges, canAskAgain } = await getPermissionsAsync();

            if (accessPrivileges === "none" && canAskAgain) {
                // 권한 요청
                const { accessPrivileges } = await requestPermissionsAsync();
                if (accessPrivileges !== "none") {
                    setOk(true);
                    getPhoto();
                }
            } else if (accessPrivileges !== "none") {
                setOk(true);
                getPhoto();
            }
        } catch (e) {

        }
    };

    useEffect(() => {
        getPermission();
    }, []);


    const numColumns = 4;
    const { width } = useWindowDimensions();

    const selectPhoto = (photo: ChoosePhoto) => {
        try {
            setChoosePhoto(photo);
        } catch (e) {
            console.log(e);
        }
    }
    const renderItem: ListRenderItem<MediaAsset> = ({ item }) => (
        <ImageContainer
            onPress={() => selectPhoto({id:item.id,uri:item.uri})}
            activeOpacity={1}>
            <Image source={{ uri: item.uri }}
                style={{ height: width / numColumns, width: width / numColumns }} />
            <IconContainer>
                <Ionicons name="checkmark-circle" 
                size={24} 
                color={item.uri === choosePhoto.uri ? colors.instaBlue : "white"} />
            </IconContainer>
        </ImageContainer>
    )

    return (
        <Container>
            <StatusBar hidden={false} />
            <Top>
                {
                    choosePhoto.uri !== "" ? <Image source={{ uri: choosePhoto.uri }}
                        style={{ width, height: "100%" }} /> : null
                }

            </Top>
            <Bottom>
                <FlatList
                    numColumns={numColumns}
                    data={photos}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                />
            </Bottom>
        </Container>
    )
}