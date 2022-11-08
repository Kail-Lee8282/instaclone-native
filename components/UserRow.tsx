import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Image } from "react-native";
import styled from "styled-components/native";
import { colors } from "../colors";
import { TNav } from "../navigators/NavTypes";


const Column = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    height:50px;
`;

const Avatar = styled.Image`
    border-radius: 25px;
    width:50px;
    height:50px;
    margin-right:10px;
`;

const UserName = styled.Text`
    color:white;
    font-weight:600;
`;

const Wrapper = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding:10px;
`;
const FollowBtn = styled.TouchableOpacity`
    background-color: ${colors.instaBlue};
    align-items: center;
    padding:10px;
    border-radius: 5px;
`;
const FollowBtnText= styled.Text`
    color:white;
    font-weight:600;
`;

type TUserRow = {
    id:string;
    avatar?: string | null;
    userName: string;
    isFollowing:boolean;
    isMe:boolean;
}

export default function UserRow({ id, avatar, userName, isFollowing, isMe }: TUserRow) {
    
    const navigation:StackNavigationProp<TNav> = useNavigation();
    
    return (
        <Wrapper>
            <Column onPress={()=>navigation.navigate("Profile", {
                id,
                userName
            })}>
                <Avatar source={{uri:avatar}} />
                <UserName>{userName}</UserName>
            </Column>
            { isMe ? null:
            (<FollowBtn activeOpacity={0.5}>
                <FollowBtnText>
                    {
                        isFollowing ? "Unfollow" : "Follow"
                    }
                </FollowBtnText>
            </FollowBtn>)
            }
        </Wrapper>
    )
}