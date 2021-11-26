import React from "react";
import { View, Text, ScrollView, FlatList, TouchableOpacity } from "react-native";
import { Title, Subheading } from "react-native-paper";
import styled from "styled-components";
import Product from "../../components/Product";
import { WIDTH } from "../../utils/screenSize";

import Loading from "../../components/Skeleton/SkeletonHomeScreen";
import useFetchQuery from "../../utils/hooks/useFetchQuery";
import Carousel from "../../components/CustomCarosel/Carousel";
import { useNavigation } from "@react-navigation/native";

export default function CategoryWithProduct({ title, id }) {
    const numColumns = 2;
    const url = "wp-json/wc/v3/products?category=" + id + "&orderby=popularity ";
    const navigation = useNavigation();
    const { response, error, isLoading, status } = useFetchQuery(title, url);
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
        return <Product productHeight={WIDTH / numColumns} item={item} column />;
    };

    function onPress(id) {
        navigation.navigate("ProductCategory", {
            id: id,
        });
    }
    if (status === "success")
        return (
            <>
                <TopBarCategory onPress={() => onPress(id)}>
                    <Title>{title}</Title>
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
