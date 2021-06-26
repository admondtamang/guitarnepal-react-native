import React, { useEffect, useState } from "react";
import { View, ScrollView, Animated } from "react-native";
import useFetchQuery from "../../utils/hooks/useFetchQuery";
import { Subheading, Title } from "react-native-paper";
import Loading from "../../components/Loading";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../../redux/product/productSlice";
import { WIDTH } from "../../utils/screenSize";
import HTML from "react-native-render-html";
import LottieFile from "../../components/LottieFile";
import animationData from "../../../assets/lottie/no-picture.json";
import { ADD_TO_CART } from "../../redux/cart/cartSlice";
import { Button, Text } from "native-base";
import SwiperComponent from "../../components/SwiperComponent";

export default function ProductDetailScreen({ route }) {
    const slug = route.params.slug;
    let url = "/wp-json/wc/v3/products?slug=" + slug;
    const dispatch = useDispatch();

    const scrollY = new Animated.Value(0);
    const { response, error, isLoading, status } = useFetchQuery("productDetail", url);

    if (error) {
        return <Text>Error , {error.message}</Text>;
    }
    if (status === "loading") {
        return <Loading />;
    }

    if (status === "success") {
        const { id, price, variations, name, on_sale, description, regular_price, images } = response[0];
        const pictures = images?.map((img) => {
            return { uri: img.src };
        });

        function handleAddToCart() {
            dispatch(ADD_TO_CART({ product_id: id, variation_id: 0, quantity: 1, images, price, name }));
        }

        return (
            <>
                <Animated.ScrollView
                    scrollEventThrottle={1}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
                >
                    {pictures.length > 0 ? (
                        <PictureContainer>
                            <SwiperComponent fullImageView={() => setIsVisible(true)} images={pictures} />
                        </PictureContainer>
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
                </Animated.ScrollView>
                <BottomContainer>
                    <Button onPress={handleAddToCart}>Add To Cart</Button>
                </BottomContainer>
            </>
        );
    }
}

const PictureContainer = styled.View`
    height: 400px;
`;

const BottomContainer = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background-color: grey;
`;
const SalePrice = styled.Text`
    color: red;
    padding-right: 15px;
    text-decoration: line-through;
`;
