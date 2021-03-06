import * as React from "react";
import { FlatList, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { ActivityIndicator, Searchbar, Title } from "react-native-paper";
import styled from "styled-components";
import SkeletonArticle from "../../components/Skeleton/SkeletonArticle";
import useFetch from "../../utils/hooks/useFetch";
import { useNavigation } from "@react-navigation/core";
import SafeAreaContainer from "../../components/SafeAreaContainer";
import { Button } from "react-native-elements/dist/buttons/Button";
import animationData from "../../../assets/lottie/no-picture.json";
import LottieFile from "../../components/LottieFile";
import { Image } from "react-native-elements/dist/image/Image";

const SearchScreen = () => {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = React.useState("");
    const url = "wp-json/wc/v3/products?search=" + searchQuery + "&orderby=popularity";

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
            <ListItem onPress={onPress}>
                <Left>
                    {item.images.length === 0 ? (
                        <LottieFile animationData={animationData} message="No picture found" />
                    ) : (
                        <Image
                            style={{ width: 100, height: 100 }}
                            PlaceholderContent={<ActivityIndicator />}
                            source={{ uri: item?.images[0]?.src }}
                        />
                    )}
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
        <SafeAreaContainer>
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
                <FlatList
                    data={response}
                    renderItem={renderItem}
                    ListHeaderComponent={<Title>Search {searchQuery && `"${searchQuery}"`}</Title>}
                    keyExtractor={(item) => item?.id.toString()}
                    ListEmptyComponent={<Text>No Instrument Found</Text>}
                />
            )}
        </SafeAreaContainer>
    );
};

const Container = styled.SafeAreaView`
    flex: 1;
`;
const ListItem = styled(TouchableOpacity)`
    display: flex;
    justify-content: space-between;
`;
const Body = styled(View)``;
const Left = styled(View)``;
const Right = styled(View)``;

export default SearchScreen;
