import { useEffect, useState, useRef } from 'react';
import { Alert, Image, Text, TouchableOpacity, View, StatusBar } from "react-native";
import styled from "styled-components/native";
import { Camera, CameraType, FlashMode } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import Slider from '@react-native-community/slider';
import { StackScreenProps } from '@react-navigation/stack';
import { createAssetAsync, saveToLibraryAsync } from 'expo-media-library';
import { useIsFocused } from '@react-navigation/native';
import { TNav } from '../navigators/NavTypes';

const Conatainer = styled.View`
  flex:1;
  background-color: black;
`;

const Action = styled.View`
    position: absolute;
    background-color: rgba(0,0,0,0.3);
    bottom:0px;
    height: 120px;
    width: 100%;
    justify-content: space-around;
`;

const TakePhotoBtn = styled.View<{ width: number }>`
    width:${props => props.width}px;
    height:${props => props.width}px;
    background-color: rgba(255,255,255,0.9);
    border:2px solid rgba(0,0,0,0.5);
    border-radius: 50px;
    justify-content: center;
    align-items: center;
`;

const ReverseCamera = styled.TouchableOpacity`
    background-color: rgba(0,0,0,1);
    border-radius: 30px;
    width: 60px;
    height:60px;
    justify-content: center;
    align-items:center;
`;

const ButtonContainer = styled.View`
    justify-content: center;
    align-items:center;
    flex-direction: row;
    justify-content: space-around;
`;

const SliderContainer = styled.View`

    align-items:center;
`;

const ActionsContainer = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const CloseButton = styled.TouchableOpacity`
  position  : absolute;
  top:20px;
  left:20px;
`;

const PreviewContainer = styled.View`
    flex:1;
`;


const PhotoAction = styled.TouchableOpacity`
    background-color: white;
    padding:5px 10px;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
`;

const PhotoActionText = styled.Text`
font-weight: 600;
`;

type Props = StackScreenProps<TNav, "TaskPhoto">;

export default function TaskPhoto({ navigation }: Props) {

    const cameraRef = useRef<Camera | null>();
    const [cameraReady, setCameraReady] = useState(false);
    const [takenPhoto, setTakenPhoto] = useState("");

    const [type, setType] = useState(CameraType.front);
    const [zoom, setZoom] = useState(0);
    const [flashMode, setFlashMode] = useState(FlashMode.off);

    // 카메라 권한 요청
    const [ok, setOk] = useState(false);
    const getPermission = async () => {
        try {
            const { granted } = await Camera.requestCameraPermissionsAsync();

            setOk(granted);
        } catch (e) {
            console.log("11", e);
        }
    };

    useEffect(() => {
        getPermission();
    }, []);

    // 카메라 타입 변경(Front, back)
    const onCameraSwith = () => {
        if (type === CameraType.back) {
            setType(CameraType.front);
        } else if (type === CameraType.front) {
            setType(CameraType.back);
        }
    }

    // Zoom
    const onZoomValueChange = (e: number) => {
        setZoom(e);
    }

    // flash mode
    const onFlashChanged = () => {
        if (flashMode === FlashMode.off) {
            setFlashMode(FlashMode.on);
        } else if (flashMode === FlashMode.on) {
            setFlashMode(FlashMode.auto);
        } else if (flashMode === FlashMode.auto) {
            setFlashMode(FlashMode.off);
        }
    }

    // Save Photo
    const onCameraReady = () => setCameraReady(true);
    const takePhoto = async () => {
        if (cameraRef?.current && cameraReady) {
            const photo = await cameraRef?.current.takePictureAsync({
                quality: 1,
                exif: true,
            });
            setTakenPhoto(photo.uri);
            
        }
    }

    const isFocused = useIsFocused();
    const onDismisss = () => setTakenPhoto("");
    const goToUpload= async(save:boolean)=>{
        if(save){
            //save
            await saveToLibraryAsync(takenPhoto);
        }

        // go to upload
        navigation.navigate("UploadForm",{
            file:takenPhoto
        })
    }
    const onUpload = () =>{
        Alert.alert("Save photo?", "Save photo & upload or just upload",
        [
            {
                text:"Save & Upload",
                onPress(value?) {
                    goToUpload(true)   ;
                },
            },
            {
                text:"Just upload",
                onPress(value?) {
                    goToUpload(false)   ;
                },
            }
        ]);
    }
    return (
        <Conatainer>
            {isFocused ? <StatusBar hidden={true} />: null}
            {
                (ok && isFocused) ? (takenPhoto === "" ?
                    <Camera
                        ref={(camera) => cameraRef.current = camera}
                        type={type} style={{ flex: 1 }}
                        zoom={zoom}
                        flashMode={flashMode}
                        onCameraReady={onCameraReady}
                    >
                        <CloseButton onPress={() => navigation.navigate("Select")}>
                            <Ionicons name='close' size={30} color="white" />
                        </CloseButton>
                        <Action>
                            <SliderContainer>
                                <Slider
                                    style={{ width: 100, height: 20 }}
                                    minimumValue={0}
                                    maximumValue={1}
                                    minimumTrackTintColor="#FFFFFF"
                                    maximumTrackTintColor="#e0e0e0"
                                    onValueChange={onZoomValueChange}
                                />
                            </SliderContainer>
                            <ButtonContainer>
                                <TouchableOpacity onPress={takePhoto}>
                                    <TakePhotoBtn width={60}>
                                        <TakePhotoBtn width={50} />
                                    </TakePhotoBtn>
                                </TouchableOpacity>
                                <ActionsContainer>
                                    <TouchableOpacity onPress={onFlashChanged} style={{ marginRight: 5 }}>
                                        <Ionicons name={
                                            flashMode === FlashMode.off ? "flash-off" : (
                                                flashMode === FlashMode.on ? "flash" : (
                                                    flashMode === FlashMode.auto ? "eye" : "eye"))
                                        }
                                            color="white" size={32} />
                                    </TouchableOpacity>
                                    <ReverseCamera onPress={onCameraSwith}>
                                        <Ionicons name='camera-reverse-outline' color={"white"} size={32} />
                                    </ReverseCamera>
                                </ActionsContainer>
                            </ButtonContainer>
                        </Action>
                    </Camera> :
                    <PreviewContainer>
                        <Image source={{ uri: takenPhoto }} style={{ flex: 9 }} resizeMode="contain" />
                        <View style={{ height: 50, flexDirection: "row", justifyContent: "space-around", paddingTop: 10 }}>
                            <PhotoAction onPress={onDismisss}>
                                <PhotoActionText>Dismiss</PhotoActionText>
                            </PhotoAction>
                            <PhotoAction onPress={onUpload}>
                                <PhotoActionText>Upload</PhotoActionText>
                            </PhotoAction>
                            <PhotoAction>
                                <PhotoActionText>Save & Upload</PhotoActionText>
                            </PhotoAction>
                        </View>
                    </PreviewContainer>)
                    : null
            }

        </Conatainer>
    )
}