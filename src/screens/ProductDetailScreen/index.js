import React, { useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import useFetchQuery from "../../utils/hooks/useFetchQuery";
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
import { ADD_TO_CART } from "../../redux/cart/cartSlice";

export default function ProductDetailScreen({ route }) {
    const slug = route.params.slug;
    let url = "/wp-json/wc/v3/products?slug=" + slug;
    const dispatch = useDispatch();
    // const product = useSelector((state) => state.product);

    // console.log(product);
    useEffect(() => {
        dispatch(fetchProduct(slug));
    }, []);

    const { response, error, isLoading, status } = useFetchQuery(url);

    if (error) {
        return <Text>Error , {error.message}</Text>;
    }
    if (isLoading) {
        return <Loading />;
    }

    if (status === "success") {
        const { id, price, variations, name, on_sale, description, regular_price, images } = response[0];
        const pictures = images?.map((img) => img.src);

        function handleAddToCart() {
            dispatch(ADD_TO_CART({ product_id: id, variation_id: 0, quantity: 1, images, price, name }));
        }

        return (
            <ScrollView>
                {pictures.length > 0 ? (
                    <ImageSlider images={pictures} />
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

                    <BottomContainer>
                        <Button mode="contain">Buy Now</Button>
                        <Button mode="contained" onPress={handleAddToCart}>
                            Add To Cart
                        </Button>
                    </BottomContainer>
                </View>
            </ScrollView>
        );
    }
}
const BottomContainer = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;
const SalePrice = styled.Text`
    color: red;
    padding-right: 15px;
    text-decoration: line-through;
`;
