import {useEffect} from "react";
import {  TouchableOpacity,  FlatList, ListRenderItem } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { gql, useQuery } from "@apollo/client";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragment";
import { SeeFeedQuery, Photo as PhotoOjb } from "../src/gql/graphql"
import ScreenLayout from "../components/ScreenLayout";
import Photo from "../components/Photo";
import { useState } from "react";
import { TNav } from "../navigators/NavTypes";
import {Ionicons} from "@expo/vector-icons";

const FEED_QUERY = gql`
  query SeeFeed($offset: Int!) {
    seeFeed(offset: $offset) {
      ...PhotoFragment
      user {
        id
        userName
        avatar
      }
      caption
      commentCount
      createAt
      isMine
      comments {
        ...CommentFragment
      }
    }
  }
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;

type Props = StackScreenProps<TNav, "Feed">;
export default function Feed({ navigation }: Props) {

  const MessageButton = ()=> <TouchableOpacity style={{marginRight:25}} onPress={()=> navigation.navigate("Messages")}>
    <Ionicons name="paper-plane" color="white" size={24}/>
  </TouchableOpacity>
  useEffect(()=>{
    navigation.setOptions({
      headerRight:MessageButton
    });
  },[]);

  // infinite scrolling - set apollo client typePolicies [KeyArges, Merge]
  const [offset, setOffset] = useState(0);
  const { data, loading, refetch, fetchMore } = useQuery<SeeFeedQuery>(FEED_QUERY,
    {
      variables: {
        offset,
      }
    });

  // FlatList Item Render
  const rederPhoto: ListRenderItem<PhotoOjb> = ({ item, index }) => {
    return <Photo caption={item.caption!} commentCount={item.commentCount} file={item.file}
      id={item.id} isLiked={item.isLiked} likes={item.likes} user={
        {
          id: item.user.id,
          avatar: item.user.avatar,
          userName: item.user.userName
        }} />
  }

  // full to refresh
  const refresh = async () => {
    setRefreshing(true);

    await refetch();
    console.log("refresh");
    setRefreshing(false);
  }

  const [refreshing, setRefreshing] = useState(false);
  const photos = data?.seeFeed as [PhotoOjb];
  return (
    <ScreenLayout loading={loading}>
      <FlatList
        data={photos}
        showsVerticalScrollIndicator={false}
        keyExtractor={(photo) => photo.id.toString()}
        renderItem={rederPhoto}
        refreshing={refreshing}
        onRefresh={refresh}
        onEndReached={() => fetchMore({
          variables: {
            offset: data?.seeFeed?.length,
          }
        })}
        onEndReachedThreshold={0.1}
      />
    </ScreenLayout>
  )
}