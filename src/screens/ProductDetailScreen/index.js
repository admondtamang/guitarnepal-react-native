import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
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
import ImageView from "react-native-image-view";
import { Button, Text } from "native-base";
import SwiperComponent from "../../components/SwiperComponent";
export default function ProductDetailScreen({ route }) {
    const slug = route.params.slug;
    let url = "/wp-json/wc/v3/products?slug=" + slug;
    const dispatch = useDispatch();
    const [IsOpen, setIsOpen] = useState(false);
    // const product = useSelector((state) => state.product);

    // console.log(product);
    useEffect(() => {
        dispatch(fetchProduct(slug));
    }, []);

    const { response, error, isLoading, status } = useFetchQuery("productDetail", url);

    if (error) {
        return <Text>Error , {error.message}</Text>;
    }
    if (isLoading) {
        return <Loading />;
    }
    const images2 = [
        {
            source: {
                uri: "https://cdn.pixabay.com/photo/2017/08/17/10/47/paris-2650808_960_720.jpg",
            },
            title: "Paris",
            width: 806,
            height: 720,
        },
    ];
    if (status === "success") {
        const { id, price, variations, name, on_sale, description, regular_price, images } = response[0];
        const pictures = images?.map((img) => img.src);

        function handleAddToCart() {
            dispatch(ADD_TO_CART({ product_id: id, variation_id: 0, quantity: 1, images, price, name }));
        }

        return (
            <>
                <ScrollView>
                    {pictures.length > 0 ? (
                        <PictureContainer>
                            <ImageView
                                images={images2}
                                imageIndex={0}
                                isVisible={IsOpen}
                                renderFooter={(currentImage) => (
                                    <View>
                                        <Text>My footer</Text>
                                    </View>
                                )}
                            />
                            <SwiperComponent />
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
                </ScrollView>
                <BottomContainer>
                    <Button rounded light>
                        <Text>Buy Now</Text>
                    </Button>
                    <Button rounded onPress={handleAddToCart}>
                        <Text>Add To Cart</Text>
                    </Button>
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
