import * as React from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import { Searchbar, Title } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components";
import SkeletonArticle from "../../components/Skeleton/SkeletonArticle";
import useFetch from "../../utils/hooks/useFetch";
import { List, ListItem, Thumbnail, Left, Body, Right, Button } from "native-base";
import { useNavigation } from "@react-navigation/core";

const SearchScreen = () => {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = React.useState("");
    const url = "wp-json/wc/v3/products?search=" + searchQuery;

    const {
        response,
        error,
        status: { isLoading, isRejected, isResolved },
    } = useFetch(url);

    const onChangeSearch = (query) => setSearchQuery(query);

    const renderItem = ({ item }) => {
        const onPress = () => {
            navigation.navigate("ProductDetail", {
                slug: item.slug,
            });
        };
        return (
            <ListItem thumbnail>
                <Left>
                    {console.log(item)}
                    <Thumbnail square source={{ uri: item.images[0]?.src }} />
                </Left>
                <Body>
                    <Text>{item.name}</Text>
                    <Text note numberOfLines={1}>
                        Rs. {item.price}
                    </Text>
                </Body>
                <Right>
                    <Button onPress={onPress} transparent>
                        <Text>View</Text>
                    </Button>
                </Right>
            </ListItem>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, padding: 10 }}>
            <Searchbar placeholder="Type Article title, news or share" onChangeText={onChangeSearch} value={searchQuery} />

            {isRejected && <Title>Cannot load data.</Title>}
            {isLoading && (
                <>
                    <SkeletonArticle />
                    <SkeletonArticle />
                    <SkeletonArticle />
                </>
            )}
            {isResolved && (
                <List>
                    <FlatList
                        data={response}
                        renderItem={renderItem}
                        ListHeaderComponent={<Title>Search {searchQuery && `"${searchQuery}"`}</Title>}
                        keyExtractor={(item) => item?.id.toString()}
                        ListEmptyComponent={<Text>No Instrument Found</Text>}
                    />
                </List>
            )}
        </SafeAreaView>
    );
};

const Container = styled.SafeAreaView`
    flex: 1;
`;

export default SearchScreen;
