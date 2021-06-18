import React from "react";
import { View, Text, ScrollView, FlatList } from "react-native";
import { Card, Title } from "react-native-paper";
import styled from "styled-components";
import MyCarousel from "../../../components/Carousel";
import Product from "../../../components/Product";
import { WIDTH } from "../../../utils/screenSize";

import useFetch from "../../../utils/hooks/useFetch";
import Loading from "../../../components/Loading";
import ImageSlider from "../../../components/ImageSlider";
import useFetchQuery from "../../../utils/hooks/useFetchQuery";
import Carousel from "../../../components/CustomCarosel/Carousel";
export const dummyData = [
    {
        title: "Anise Aroma Art Bazar",
        url: "https://i.ibb.co/hYjK44F/anise-aroma-art-bazaar-277253.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        id: 1,
    },
    {
        title: "Food inside a Bowl",
        url: "https://i.ibb.co/JtS24qP/food-inside-bowl-1854037.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        id: 2,
    },
    {
        title: "Vegatable Salad",
        url: "https://i.ibb.co/JxykVBt/flat-lay-photography-of-vegetable-salad-on-plate-1640777.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        id: 3,
    },
];

export default function TopTabBarContent() {
    const numColumns = 2;
    const url = "wp-json/wc/v3/products?featured=true";

    // const {
    //     response,
    //     error,
    //     status: { isLoading, isRejected, isResolved },
    // } = useFetch(url);

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
    const images = ["https://wallpapercave.com/wp/wp3145662.jpg", "https://themepack.me/i/c/749x467/media/g/774/guitar-theme-ha17.jpg"];

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
                        {/* <ImageSlider images={images} /> */}
                        {/* <MyCarousel /> */}
                        <Carousel data={dummyData} />

                        <Title>Featured</Title>
                    </>
                }
                ListFooterComponent={
                    <>
                        <Title>Guitar</Title>
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
                }
                numColumns={numColumns}
                ListEmptyComponent={showEmptyListView}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            />
            // </Container>
        );
}
const Container = styled(ScrollView)`
    /* background-color: blue; */
`;
