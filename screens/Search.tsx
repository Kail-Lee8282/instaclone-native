import { View, Text, TouchableOpacity, TextInput, ActivityIndicator, FlatList, ListRenderItem, Image, useWindowDimensions } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import styled from "styled-components/native";
import { useEffect } from "react";
import DismissKeyboard from "../components/DismissKeyboard";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useLazyQuery } from "@apollo/client";
import { graphql } from "../src/gql";
import { Photo } from "../src/gql/graphql";
import { TNav } from "../navigators/NavTypes";

const SEARCH_PHOTOS = graphql(`
  query searchPhotos($keyword: String!) {
    searchPhotos(keyword: $keyword) {
      id
      file
    }
  }
`);

const Input = styled.TextInput`
  background-color  : rgba(255,255,255,0.2);
  padding:7px 10px;
  border-radius: 10px;
  width: 80%;
  color:rgba(255,255,255,0.5);
`;

const SearchingContainer = styled.View`
    flex:1;
    justify-content: center;
    align-items:center;
`;

const SearchingText = styled.Text`
    color:white;
    font-weight:600;
    margin-top: 10px;
`;

type TForm = {
    keyword: string;
}
type Props = StackScreenProps<TNav, "Search">;
export default function Search({ navigation }: Props) {
    const {width} = useWindowDimensions();

    //Get Photos [useQuery는 선언시 바로 수행, useLazyQuery를 함수 호출시 실행, useMutation과 동일]
    const [searchPhotos, { data, loading, called }] = useLazyQuery(SEARCH_PHOTOS);

    // header Search form
    const { control, handleSubmit, setValue } = useForm<TForm>();

    const onValid:SubmitHandler<TForm> = ({keyword})=>{
        console.log(keyword);
        searchPhotos({
            variables: {
                keyword
            }
        });

        setValue("keyword","");
    }

    const SearchBox = () => (
        <Controller
            control={control}
            name="keyword"
            rules={{minLength:2, required:true}}
            render={({ field: { onChange, value } }) => <Input
                placeholder="Search photos"
                placeholderTextColor={"rgba(255,255,255,0.3)"}
                autoCapitalize="none"
                returnKeyLabel="Search"
                returnKeyType="search"
                autoCorrect={false}
                onChangeText={onChange}
                value={value}
                onSubmitEditing={handleSubmit(onValid)}
            />}
        />
    );

    useEffect(() => {
        navigation.setOptions({
            headerTitle: SearchBox
        });
    }, []);

    // Photo list
    const renderItem:ListRenderItem<Photo> = ({item})=>(
        <TouchableOpacity onPress={()=>navigation.navigate("Photo", {
            photoId:item.id
        })}>
            <Image source={{uri:item.file}}
            style={{width:width/3, height:width/3}}/>
        </TouchableOpacity>
    ) 

    return (
        <DismissKeyboard>
            <View style={{flex:1, backgroundColor:"black"}}>
                {loading ?<SearchingContainer>
                        <ActivityIndicator size={"large"}/>
                        <SearchingText>Searching...</SearchingText>
                    </SearchingContainer> : null
                }
                {
                    !called? <SearchingContainer>
                        <SearchingText>Search by keyword</SearchingText>
                    </SearchingContainer> : null
                }
                {
                    data?.searchPhotos !== undefined  // 데이터 검색 완료 될때까지 대기
                    ? (data?.searchPhotos?.length ===0 )? <SearchingContainer>
                        <SearchingText>Could not find anyting.</SearchingText>
                    </SearchingContainer> : 
                    <FlatList
                        numColumns={4}
                        data={data?.searchPhotos as [Photo]}
                        renderItem={renderItem}
                        keyExtractor={(item)=>item.id.toString()}
                    />
                    :null
                }
            </View>
        </DismissKeyboard>
    )
}