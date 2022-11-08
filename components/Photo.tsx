import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import { useWindowDimensions, Image, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { graphql } from "../src/gql";
import { useMutation } from "@apollo/client";
import { TNav } from "../navigators/NavTypes";


type TUser = {
    id:string;
    avatar?: string | null;
    userName: string;
}
export type TPhoto = {
    id: number;
    user: TUser;
    caption: string;
    file: string;
    isLiked: boolean;
    likes: number;
    commentCount: number;
    fullView?:boolean;
}

const CommonText = styled.Text`
    color:white;
`
const Container = styled.View`
    border-radius: 3px;
`;
const Header = styled.TouchableOpacity`
    padding:20px 10px;
    flex-direction: row;
    align-items: center;
`;
const UserAvatar = styled.Image`
    width:40px;
    height:40px;
    border-radius: 20px;
    margin-right: 10px;
`;
const UserName = styled(CommonText)`
    font-weight: 600;
`;

const File = styled.Image<{ width: number, height: number }>`
    min-height: 200px;
    width: ${props => props.width - 2}px;
    height:${props => props.height}px; 
`;
const Actions = styled.View`
    flex-direction:row;
    align-items:center;
`;
const Action = styled.TouchableOpacity`
    margin-right:10px;
`;
const Caption = styled.View`
    flex-direction: row;
`;
const CaptionText = styled(CommonText)`
    margin-left: 5px;
`;
const Likes = styled(CommonText)`
    margin:7px 0px;
    font-weight:600;
`;
const ExtraContainer = styled.View`
    padding:10px;
`;


const TOGGLE_LIKE_MUTATION = graphql(`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
    }
  }
`);


export default function Photo({ id,
    user,
    caption,
    file,
    isLiked,
    likes,
    fullView,
    commentCount }: TPhoto) {

    // Navgation
    const navigation: StackNavigationProp<TNav> = useNavigation();

    // Toggle Like Mutation
    const [toggleLike] = useMutation(TOGGLE_LIKE_MUTATION, {
        variables: {
            id
        },
        update(cache, result){
            const ok = result.data?.toggleLike?.ok;
            if(ok){
                const fragmentId=`Photo:${id}`;

                cache.modify({
                    id:fragmentId,
                    fields:{
                        isLiked(prev){
                            return !prev;
                        },
                        likes(prev,{readField}){
                            if(readField("isLiked")){
                                return prev-1;
                            }else{
                                return prev+1;
                            }
                        }
                    }
                })
            }
        }
    });


    // Get Window Size
    const { width: WindowWidth, height: WindowHeight } = useWindowDimensions();
    // Setting Image Height
    const [imageheight, setImageHeight] = useState(WindowHeight - 500);


    const ResizeImage = () => {
        Image.getSize(file, (width, height) => {
            let imgH = height * (WindowWidth / width);
            if (imgH < 200) {
                imgH = 200;
            }
            setImageHeight(imgH);
        });
    }
    useEffect(() => {
        ResizeImage();
    }, []);

    const goToProfile = () =>{
        navigation.navigate("Profile",{
            userName:user.userName,
            id:user.id,
        })
    }

    return (
        <Container>
            <Header activeOpacity={1}
                onPress={goToProfile}>
                <UserAvatar resizeMode="cover"
                    source={{ uri: user.avatar }} />
                <UserName>{user.userName}</UserName>
            </Header>
            <View onLayout={ResizeImage}>
                <File source={{ uri: file }} width={WindowWidth}
                    height={imageheight}
                    resizeMode="contain"
                />
            </View>

            <ExtraContainer>
                <Actions>
                    <Action activeOpacity={1}>
                        <Ionicons name={isLiked ? "heart" : "heart-outline"} 
                        color={isLiked ? "red" : "white"} 
                        size={28} 
                        onPress={()=>{toggleLike()}}/>
                    </Action>
                    <Action activeOpacity={1} onPress={() => navigation.navigate("Comments")} >
                        <Ionicons name="chatbubble-outline" color="white" size={28} />
                    </Action>
                </Actions>
                <TouchableOpacity onPress={() => navigation.navigate("Likes",{photoId:id})}
                    activeOpacity={1}>
                    <Likes>{likes === 1 ? "1 Like" : `${likes} Likes`}</Likes>
                </TouchableOpacity>
                <Caption>
                    <UserName
                        activeOpacity={1}
                        onPress={goToProfile}
                    >{user.userName}</UserName>
                    <CaptionText>{caption}</CaptionText>
                </Caption>
            </ExtraContainer>
        </Container>);
}