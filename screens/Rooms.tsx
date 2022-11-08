import { gql, useQuery } from "@apollo/client";
import { ListRenderItem } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { colors } from "../colors";
import RoomItem from "../components/rooms/RoomItem";
import ScreenLayout from "../components/ScreenLayout";
import { ROOM_FRAGMENT } from "../fragment";
import useMe from "../hooks/useMe";
import { Room, SeeRoomsQuery } from "../src/gql/graphql";


const SEE_RROMS_QUERY = gql`
    query seeRooms {
        seeRooms {
            ...RoomParts
        }
    }
    ${ROOM_FRAGMENT}
`
export default function Rooms() {
    const { data, loading } = useQuery<SeeRoomsQuery>(SEE_RROMS_QUERY);

    const renderItem: ListRenderItem<Room> = ({ item: room }) => <RoomItem room={room} />

    return (

        <ScreenLayout loading={loading}>
            <FlatList
                style={{ width: "100%" }}
                data={data?.seeRooms as [Room]}
                keyExtractor={room => room.id.toString()}
                renderItem={renderItem}
            />
        </ScreenLayout>
    )
}