import React, { useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import useFetch from "../../utils/hooks/useFetch";
import { Subheading, Title } from "react-native-paper";
import Loading from "../../components/Loading";
import ImageSlider from "../../components/ImageSlider";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../../redux/product/productSlice";
import { WIDTH } from "../../utils/screenSize";
import HTML from "react-native-render-html";
export default function ProductDetailScreen({ route }) {
    const slug = "brown-ukulele-21-inch";
    let url = "/wp-json/wc/v3/products?slug=" + route.params.slug;
    const dispatch = useDispatch();
    const product = useSelector((state) => state.product);

    console.log(product);
    useEffect(() => {
        dispatch(fetchProduct());
    }, []);

    const {
        response,
        error,
        status: { isLoading, isRejected, isResolved },
    } = useFetch(url);

    if (isRejected) {
        return <Text>Error , {error}</Text>;
    }
    if (isLoading) {
        return <Loading />;
    }

    if (isResolved) {
        const res = response[0];
        console.log(res);
        const { price, name, on_sale, description, regular_price } = res;
        const images = res?.images.map((img) => img.src);

        return (
            <ScrollView>
                <ImageSlider images={images} />
                <View style={{ padding: 10 }}>
                    <Title>{name}</Title>
                    <Text>
                        Rs. <SalePrice>{on_sale && regular_price} </SalePrice>
                        {price}
                    </Text>

                    <HTML source={{ html: description }} contentWidth={WIDTH} />
                </View>
            </ScrollView>
        );
    }
}

const SalePrice = styled.Text`
    color: red;
    padding-right: 15px;
    text-decoration: line-through;
`;
