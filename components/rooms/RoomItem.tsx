import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import styled from "styled-components/native";
import { colors } from "../../colors";
import useMe from "../../hooks/useMe";
import { TNav } from "../../navigators/NavTypes";
import { Room, User } from "../../src/gql/graphql";



const RoomContainer = styled.TouchableOpacity`
background-color: black;
padding:15px 10px;
flex-direction: row;
justify-content: space-between;
width: 100%;
`;

const Column = styled.View`
flex-direction: row;
align-items: center;
`
const Avatar = styled.Image`
width: 50px;
height:50px;
border-radius: 25px;
margin-right:20px;
`;

const Data = styled.View``;
const UnreadDot = styled.View`
height:10px;
width: 10px;
border-radius: 5px;
background-color: ${colors.instaBlue};
`;
const Username = styled.Text`
color:white;
font-weight: 600;
font-size: 16px;
`;
const UnreadText = styled.Text`
color:white;
margin-top: 5px;
font-weight: 500;
`;


type Props = {
    room: Room;
}

export default function RoomItem({ room }: Props) {
    const me = useMe();
    const talkingTo = room.users?.find((user) => user?.userName !== me.data?.me?.userName);
    const navigation: StackNavigationProp<TNav> = useNavigation();

    const goToRoom = () => navigation.navigate("Room", {
        id: room.id,
        talkingTo: talkingTo!
    });

    return (
        <RoomContainer onPress={goToRoom}>
            <Column>
                <Avatar source={{ uri: talkingTo?.avatar! }} />
                <Data>
                    <Username>{talkingTo?.userName}</Username>
                    <UnreadText>{room.unReadTotal} unread {room.unReadTotal === 1 ? "message" : "messages"}</UnreadText>
                </Data>
            </Column>
            <Column>
                {room.unReadTotal !== 0 && <UnreadDot />}
            </Column>
        </RoomContainer>
    )
}