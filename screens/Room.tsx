import { useEffect, useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { View, ListRenderItem, KeyboardAvoidingView, Text } from "react-native";
import { TNav } from "../navigators/NavTypes";
import { gql, OperationVariables, SubscriptionDataOptions, useApolloClient, useMutation, useQuery, useSubscription } from "@apollo/client";
import { Message, RoomUpdatesSubscription, SeeRoomQuery, SendMessageMutation } from "../src/gql/graphql";
import ScreenLayout from "../components/ScreenLayout";
import { FlatList } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { graphql } from "../src/gql";
import useMe from "../hooks/useMe";
import { UpdateQueryFn } from "@apollo/client/core/watchQueryOptions";
import { EntityStore } from "@apollo/client/cache";


const ROOM_QUERY = gql`
    query seeRoom($id: Int!) {
        seeRoom(id: $id) {
            id
            messages {
                id
                payload
                user {
                    userName
                    avatar
                    isMe
                }
                read
            }
        }
    }
`;

const SEND_MESSAGE_MUTATION = graphql(`
  mutation sendMessage($payload: String!, $roomId: Int) {
  sendMessage(payload: $payload, roomId: $roomId) {
    ok
    id
    error
  }
}  
`);

const ROOM_UPDATES = gql`
    subscription roomUpdates($id: Int!) {
        roomUpdates(id: $id) {
            id
            payload
            user {
                userName
                avatar
                isMe
            }
            read
        }
    }
`;


const MessageContainer = styled.View<{ outGoing: boolean }>`
    flex-direction:${props => props.outGoing ? "row-reverse" : "row"};
    padding:10px 10px;
    
`;
const Author = styled.View`
    margin-right: 10px;
`;
const Avatar = styled.Image`
    width: 50px;
    height:50px;
    border-radius: 25px;
`;
const Username = styled.Text`
    color:white;
`;
const MessageText = styled.Text`
    color:white;
    background-color: rgba(255,255,255,0.5);
    padding: 5px 10px;
    overflow: hidden;
    border-radius: 10px;
    font-size:16px;
    margin-top: 2px;
    
    
`;

const TextInput = styled.TextInput`
    color:white;
    font-size:16px;
    margin-top:20px;    
    margin-bottom: 50px;
    width: 95%;
    padding : 10px 20px;
    border-radius: 25px;
    border:1px solid white;
`;

const MessageWrapper = styled.View`
    flex-shrink: 1;
    padding:0px 10px;
`;

type TForm = {
    message: string;
}
type Props = StackScreenProps<TNav, "Room">;

export default function Room({ route, navigation }: Props) {
    const me = useMe();
    const { control, handleSubmit, getValues, setValue } = useForm<TForm>();

    const { data, loading, subscribeToMore } = useQuery<SeeRoomQuery>(ROOM_QUERY, {
        variables: {
            id: route.params.id
        }
    });

    const client = useApolloClient();
    const [subscribed, setSubscribed] = useState(false)

    const updateQuery = (prev: SeeRoomQuery, options: any) => {
        const { subscriptionData: { data: { roomUpdates: message } } } = options;
        
        const newMessage = { ...message, __typename: "Message" };
        

        if (newMessage.id) {
            const isExisting = prev.seeRoom?.messages?.find(message => message?.id === newMessage.id);
            if (!isExisting) {
                const messageFragment = client.cache.writeFragment({
                    fragment: gql`
                        fragment NewMessage on Message{
                            id
                            payload
                            user {
                                userName
                                avatar
                                isMe
                            }
                            read
                        }
                    `,
                    data: newMessage
                });

                const isOk = client.cache.modify({
                    id: `Room:${route.params.id}`,
                    fields: {
                        messages(prev) {
                            const isExsting = prev.find((aMessage: any) => aMessage.__ref === messageFragment?.__ref);
                            if (isExsting) {
                                return prev;
                            }
                            return [...prev, messageFragment];
                        }
                    }
                });

                console.log(prev);
                return {
                    ...prev,
                    seeRoom: {
                        ...prev.seeRoom,
                        messages: [...prev.seeRoom?.messages!, newMessage]
                    }
                } as SeeRoomQuery;
            } else {
                return prev;
            }
        } else {
            return prev;
        }

    }

    useEffect(() => {
        if (data?.seeRoom) {
            subscribeToMore({
                document: ROOM_UPDATES,
                variables: {
                    id: route.params.id
                },
                updateQuery
            });
            setSubscribed(true)
        }
    }, [data, subscribed]);

    const [sendMessageMutation, { loading: sendingMessage }] = useMutation(SEND_MESSAGE_MUTATION,
        {
            update(cache, result) {

                const ok = result.data?.sendMessage?.ok;

                if (ok && me) {
                    const id = result.data?.sendMessage?.id!;
                    const message = getValues("message");
                    const messageObj = {
                        id,
                        payload: message,
                        user: {
                            userName: me.data?.me?.userName,
                            avatar: me.data?.me?.avatar,
                            isMe: true,
                        },
                        read: true,
                        __typename: "Message"
                    };

                    const messageFragment = cache.writeFragment({
                        fragment: gql`
                            fragment NewMessage on Message{
                                id
                                payload
                                user {
                                    userName
                                    avatar
                                    isMe
                                }
                                read
                            }
                        `,
                        data: messageObj
                    });


                    cache.modify({
                        id: `Room:${route.params.id}`,
                        fields: {
                            messages(prev) {
                                const isExsting = prev.find((aMessage: any) => aMessage.__ref === messageFragment?.__ref);
                                if (isExsting) {
                                    return prev;
                                }
                                return [...prev, messageFragment];
                            }
                        }
                    });
                }
            }
        });

    useEffect(() => {
        navigation.setOptions({
            title: `${route.params.talkingTo.userName}`,
        });
    }, [])

    const rednerItme: ListRenderItem<Message> = ({ item: message }) => (
        <MessageContainer outGoing={message.user.isMe}>
            {!message.user.isMe &&
                <Author>
                    <Avatar source={{ uri: message.user.avatar }} />
                </Author>
            }

            <MessageWrapper>
                {!message.user.isMe &&
                    <Username>{message.user.userName}</Username>
                }

                <MessageText>{message.payload}</MessageText>
            </MessageWrapper>

        </MessageContainer>
    );

    const onValid: SubmitHandler<TForm> = ({ message }) => {
        if (!sendingMessage) {
            sendMessageMutation({
                variables: {
                    payload: message,
                    roomId: route.params.id,
                }
            });
        }
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "black" }} behavior="height" keyboardVerticalOffset={70}>
            <ScreenLayout loading={loading}>
                <FlatList
                    //inverted
                    style={{ flex: 1, paddingVertical: 0 }}
                    data={data?.seeRoom?.messages as [Message]}
                    keyExtractor={message => "" + message?.id}
                    renderItem={rednerItme}
                // ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
                />
                <View style={{ alignItems: "center" }}>
                    <Controller
                        control={control}
                        name="message"
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) =>
                            <TextInput
                                placeholderTextColor="rgba(255,255,255,0.7)"
                                placeholder="Write a message..."
                                returnKeyLabel="Send Message"
                                returnKeyType="send"
                                value={value ? value : ""}
                                onSubmitEditing={handleSubmit(onValid)}
                                onChangeText={onChange}
                            />
                        }
                    />
                </View>
            </ScreenLayout>
        </KeyboardAvoidingView>
    )
}