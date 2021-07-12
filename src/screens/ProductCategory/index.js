import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { Button, Card, Title } from "react-native-paper";
import styled from "styled-components";
import Product from "../../components/Product";
import { WIDTH } from "../../utils/screenSize";
import axiosInstance from "../../utils/axios";
import SafeAreaContainer from "../../components/SafeAreaContainer";

export default function ProductCategory({ route, id }) {
    const numColumns = 2;
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [response, setResponse] = useState([]);
    const url = `wp-json/wc/v3/products?category=${id ? id : route.params.id}&page=` + page + "&orderby=popularity";
    const offset = 5;

    useEffect(() => getData(), [page]);

    const getData = () => {
        setLoading(true);
        axiosInstance(url)
            .then((res) => {
                setResponse([...response, ...res.data]);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    // Add empty colum at the end of row
    const formatData = (data, numColumns) => {
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
            <View style={{ flex: 1, flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
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
    const loadMoreData = () => {
        setPage((prev) => page + 1);
    };

    const renderFooter = () => (
        <Button style={{ marginBottom: 40 }} icon="more" mode="text" onPress={loadMoreData} loading={loading}>
            Load More
        </Button>
    );

    if (id) {
        return (
            <FlatList
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                data={formatData(response, numColumns)}
                columnWrapperStyle={{ justifyContent: "space-between" }}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                style={{ marginTop: 10 }}
                // ListHeaderComponent={<Title>Featured</Title>}
                numColumns={numColumns}
                ListEmptyComponent={showEmptyListView}
                ListFooterComponent={renderFooter}
                // onEndReached={loadMoreData}
                onEndReachedThreshold={0.1}
                // ListFooterComponent={renderFooter}

                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            />
        );
    } else
        return (
            <Container>
                <FlatList
                    data={formatData(response, numColumns)}
                    columnWrapperStyle={{ justifyContent: "space-between" }}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItem}
                    ListHeaderComponent={<Title>Featured</Title>}
                    numColumns={numColumns}
                    style={{ paddingHorizontal: 10 }}
                    ListEmptyComponent={showEmptyListView}
                    ListFooterComponent={renderFooter}
                    // onEndReached={loadMoreData}
                    onEndReachedThreshold={0.1}
                    // ListFooterComponent={renderFooter}

                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                />
            </Container>
        );
}
const Container = styled(SafeAreaContainer)`
    /* background-color: blue; */
`;
