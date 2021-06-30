import React from "react";
import { View, Text, ScrollView, FlatList, TouchableOpacity } from "react-native";
import { Title, Subheading } from "react-native-paper";
import styled from "styled-components";
import Product from "../../../components/Product";
import { WIDTH } from "../../../utils/screenSize";

import Loading from "../../../components/Skeleton/SkeletonHomeScreen";
import useFetchQuery from "../../../utils/hooks/useFetchQuery";
import Carousel from "../../../components/CustomCarosel/Carousel";

export const dummyData = [
    {
        title: "Classic Black Guitar",
        url: "https://www.wallpapertip.com/wmimgs/15-154362_black-guitar-photos-wallpapers-guitar-wallpaper-hd.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        id: 1,
    },
    {
        title: "Acoustic Guitar",
        url: "https://wallpaperaccess.com/full/3560410.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        id: 2,
    },
    {
        title: "Electric Guitar",
        url: "https://wallpaperboat.com/wp-content/uploads/2019/04/electric-guitar-001.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        id: 3,
    },
];

export default function TopTabBarContent({ navigation }) {
    const numColumns = 2;
    const url = "wp-json/wc/v3/products?featured=true";

    const { response, error, isLoading, status } = useFetchQuery("latest", url);

    if (error) {
        return <Text>Error , {error.message}</Text>;
    }

    if (isLoading) {
        return <Loading />;
    }

    const formatData = (data, numColumns) => {
        // const dataList = data.filter((data) => data.type == "product"); // filtered product data
        const dataList = data;
        const totalRows = Math.floor(dataList?.length / numColumns);
        let totalLasttRow = dataList.length - totalRows * numColumns;
        while (totalLasttRow !== 0 && totalLasttRow !== numColumns) {
            dataList.push({ name: "blank", empty: true });
            totalLasttRow++;
        }
        return dataList;
    };

    const showEmptyListView = () => {
        return (
            <View style={{ flex: 1, flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 10 }}>
                <Text style={{ color: "black" }}>{"No Data to Display"}</Text>
            </View>
        );
    };

    const renderItem = ({ item }) => {
        if (item.empty) {
            return <View style={{ backgroundColor: "transparent" }} />;
        }
        return <Product productHeight={WIDTH / numColumns} item={item} />;
    };

    function onPress(id) {
        navigation.navigate("ProductCategory", {
            id: id,
        });
    }
    if (status === "success")
        return (
            // <Container showsHorizontalScrollIndicator={false}>
            <FlatList
                nestedScrollEnabled
                data={formatData(response, numColumns)}
                columnWrapperStyle={{ justifyContent: "space-between" }}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                ListHeaderComponent={
                    <>
                        <Carousel data={dummyData} />
                        <>
                            <TopBarCategory onPress={() => onPress(76)}>
                                <Title>Guitar Collection</Title>
                                <Subheading>More</Subheading>
                            </TopBarCategory>
                            <FlatList
                                horizontal
                                data={response}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={renderItem}
                                ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                            />
                        </>
                        <Title>Featured</Title>
                    </>
                }
                ListFooterComponent={<></>}
                numColumns={numColumns}
                ListEmptyComponent={showEmptyListView}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            />
            // </Container>
        );
}

const TopBarCategory = styled(TouchableOpacity)`
    display: flex;
    flex-direction: row;
    flex: 1;
    justify-content: space-between;
`;
const Container = styled(ScrollView)`
    /* background-color: blue; */
`;
