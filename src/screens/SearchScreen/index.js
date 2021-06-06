import * as React from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import { Searchbar, Title } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components";
import SkeletonArticle from "../../components/Skeleton/SkeletonArticle";
import useFetch from "../../utils/hooks/useFetch";

const SearchScreen = () => {
    const [searchQuery, setSearchQuery] = React.useState("");
    const url = "wp-json/wc/v3/products?search=" + searchQuery;

    const {
        response,
        error,
        status: { isLoading, isRejected, isResolved },
    } = useFetch(url);

    const onChangeSearch = (query) => setSearchQuery(query);

    if (isRejected) {
        console.log(error);
        return <Title>Cannot load data.</Title>;
    }

    const renderItem = ({ item }) => <Text>{item.name}</Text>;
    console.log(response);
    return (
        <SafeAreaView style={{ flex: 1, padding: 10 }}>
            <Searchbar placeholder="Type Article title, news or share" onChangeText={onChangeSearch} value={searchQuery} />

            {isLoading && (
                <>
                    <SkeletonArticle />
                    <SkeletonArticle />
                    <SkeletonArticle />
                </>
            )}
            {isResolved && (
                <FlatList
                    data={response}
                    renderItem={renderItem}
                    ListHeaderComponent={<Title>Search {searchQuery && `"${searchQuery}"`}</Title>}
                    keyExtractor={(item) => item?.id.toString()}
                    ListEmptyComponent={<Text>No Instrument Found</Text>}
                />
            )}
        </SafeAreaView>
    );
};

const Container = styled.SafeAreaView`
    flex: 1;
`;

export default SearchScreen;
