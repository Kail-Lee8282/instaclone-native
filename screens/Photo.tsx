import { View, Text, TouchableOpacity, ScrollView, RefreshControl } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { gql, useQuery } from "@apollo/client";
import { PHOTO_FRAGMENT } from "../fragment";
import { SeePhotoQuery } from "../src/gql/graphql";
import PhotoComponent, { TPhoto } from "../components/Photo"
import ScreenLayout from "../components/ScreenLayout";
import { useState } from "react";
import { TNav } from "../navigators/NavTypes";

const SEE_PHOTO = gql`
  query seePhoto($id:Int!){
    seePhoto(id:$id){
        ...PhotoFragment
      user {
        id
        userName
        avatar
      }
      caption
    }
  }
  ${PHOTO_FRAGMENT}
`

type Props = StackScreenProps<TNav, "Photo">;
export default function Photo({ route }: Props) {

    // search Photo
    const { data, loading, refetch } = useQuery<SeePhotoQuery>(SEE_PHOTO, {
        variables: {
            id: route.params.photoId
        }
    });

    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = async()=>{
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    }

    return (
        <ScreenLayout loading={loading}>
            <ScrollView
            refreshControl={
                <RefreshControl
                onRefresh={onRefresh}
                refreshing={refreshing}   
                />
            }
                style={{ backgroundColor: "black" }}
                contentContainerStyle={{
                    backgroundColor: "black", flex: 1,
                    alignItems: "center"
                }}>
                <PhotoComponent {...data?.seePhoto as TPhoto} />
            </ScrollView>
        </ScreenLayout>
    )
}