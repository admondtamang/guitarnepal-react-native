import React from "react";
import { View, Text, ScrollView, FlatList } from "react-native";
import { Card, Title } from "react-native-paper";
import styled from "styled-components";
import Product from "../../components/Product";
import { WIDTH } from "../../utils/screenSize";

import useFetch from "../../utils/hooks/useFetch";
export default function ProductCategory() {
    const numColumns = 2;
    const url = "wp-json/wc/v3/products";

    const {
        response,
        error,
        status: { isLoading, isRejected, isResolved },
    } = useFetch(url);

    if (isRejected) {
        return <Text>Cannot load data...</Text>;
    }
    if (isLoading) {
        return <Text>Loading...</Text>;
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

    if (isResolved)
        return (
            // <Container>
            <FlatList
                data={formatData(response, numColumns)}
                columnWrapperStyle={{ justifyContent: "space-between" }}
                ListHeaderComponent={<MyCarousel />}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                ListHeaderComponent={<Title>Featured</Title>}
                numColumns={numColumns}
                style={{ padding: 10 }}
                ListEmptyComponent={showEmptyListView}
            />
            // </Container>
        );
}
const Container = styled.ScrollView`
    /* background-color: blue; */
`;
