import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { FlatList, SafeAreaView, StyleSheet, Text } from "react-native";
import { Searchbar, Title } from "react-native-paper";
import styled from "styled-components";
// import Article from "../../components/Article";
import SkeletonArticle from "../../components/Skeleton/SkeletonArticle";
import useFetch from "../../components/UseFetch";

const Container = styled.SafeAreaView`
    padding: 30px 10px;
`;

const SearchScreen = () => {
    const [searchQuery, setSearchQuery] = React.useState("");
    const url = "https://www.thevisitx.com/wp-json/wp/v2/posts?search=" + searchQuery + "&per_page=10";

    const { response, error, isLoading } = useFetch(url);

    const onChangeSearch = (query) => setSearchQuery(query);

    if (error) {
        return <Title>Cannot load data</Title>;
    }

    const renderItem = ({ item }) => <Text>hello</Text>;

    return (
        <Container>
            <StatusBar />
            <Searchbar placeholder="Type Article title, news or share" onChangeText={onChangeSearch} value={searchQuery} />

            {isLoading ? (
                <>
                    <SkeletonArticle />
                    <SkeletonArticle />
                    <SkeletonArticle />
                </>
            ) : (
                <FlatList
                    data={response}
                    renderItem={renderItem}
                    ListHeaderComponent={<Title>Search {searchQuery && `"${searchQuery}"`}</Title>}
                    keyExtractor={(item) => item?.id.toString()}
                    ListEmptyComponent={<Text>Empty</Text>}
                />
            )}
        </Container>
    );
};

export default SearchScreen;
