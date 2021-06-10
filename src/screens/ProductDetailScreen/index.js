import React, { useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import useFetch from "../../utils/hooks/useFetch";
import { Button, Headline, Subheading, Title } from "react-native-paper";
import Loading from "../../components/Loading";
import ImageSlider from "../../components/ImageSlider";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../../redux/product/productSlice";
import { WIDTH } from "../../utils/screenSize";
import HTML from "react-native-render-html";
import LottieFile from "../../components/LottieFile";
import animationData from "../../../assets/lottie/no-picture.json";

export default function ProductDetailScreen({ route }) {
    const slug = route.params.slug;
    let url = "/wp-json/wc/v3/products?slug=" + slug;
    const dispatch = useDispatch();
    const product = useSelector((state) => state.product);

    // console.log(product);
    useEffect(() => {
        dispatch(fetchProduct(slug));
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
                {images.length > 0 ? (
                    <ImageSlider images={images} />
                ) : (
                    <LottieFile animationData={animationData} message="No picture found" />
                )}
                <View style={{ padding: 10 }}>
                    <Title style={{ color: "black" }}>{name}</Title>
                    <Text>
                        Rs.{on_sale && <SalePrice>{regular_price} </SalePrice>}
                        {price}
                    </Text>

                    <Subheading>Description</Subheading>
                    <HTML containerStyle={{ marginTop: 0 }} source={{ html: description }} contentWidth={WIDTH} />
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
