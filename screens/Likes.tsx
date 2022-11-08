import { gql, useQuery } from "@apollo/client";
import { StackScreenProps } from "@react-navigation/stack";
import { useState } from "react";
import { FlatList, ListRenderItem, Text, View } from "react-native";
import ScreenLayout from "../components/ScreenLayout";
import UserRow from "../components/UserRow";
import { USER_FRAGMENT } from "../fragment";
import { TNav } from "../navigators/NavTypes";
import { graphql } from "../src/gql";
import { SeePhotoLikesQuery, User } from "../src/gql/graphql";


const LIKES_QUERY = gql`
  query seePhotoLikes($seePhotoLikesId: Int!) {
    seePhotoLikes(id: $seePhotoLikesId) {
      ...UserFragment
    }
  }  
  ${USER_FRAGMENT}
`;

type Props = StackScreenProps<TNav, "Likes">;
export default function Likes({ route, navigation }: Props) {
    const { data, loading, refetch } = useQuery<SeePhotoLikesQuery>(LIKES_QUERY, {
        variables: {
            seePhotoLikesId: route?.params?.photoId
        },
        skip: !route?.params?.photoId   // PhotoId 없으면 Query skip
    });

    const renderUser: ListRenderItem<User> = ({ item }) => (
        <UserRow 
        id={item.id}
        avatar={item.avatar} 
        userName={item.userName} 
        isFollowing={item.isFollowing}
         isMe={item.isMe} />
    )

    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = async () => {
        setRefreshing(true);

        await refetch();

        setRefreshing(false);
    }
    return (
        <ScreenLayout loading={loading}>
            <FlatList
                data={data?.seePhotoLikes as [User]}
                keyExtractor={(item) => item.id}
                renderItem={renderUser}
                style={{ width: "100%" }}
                refreshing={refreshing}
                onRefresh={onRefresh}
                ItemSeparatorComponent={()=><View style={{width:"100%", height:1, backgroundColor:"rgba(255,255,255,0.3)"}}/>}
            />
        </ScreenLayout>
    )
}