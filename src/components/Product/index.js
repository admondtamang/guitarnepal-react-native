import React from "react";
import styled from "styled-components";
import { WIDTH } from "../../utils/screenSize";
import { useNavigation, useTheme } from "@react-navigation/native";

export default function Product({ item }) {
    const { id, name, price, regular_price, images, on_sale, slug } = item;
    var discount;

    const navigation = useNavigation();
    const onPress = () => {
        navigation.navigate("ProductDetail", {
            slug,
        });
    };

    if (regular_price) {
        discount = ((regular_price - price) / regular_price) * 100;
        discount = discount.toFixed(2);
    }
    // image validation choosing 1st image
    const image = images.length <= 0 ? "https://facebook.github.io/react/img/logo_small.png" : images[0].src;
    return (
        <Container onPress={onPress}>
            <Picture
                source={{
                    uri: images[0].src,
                }}
                style={{ width: "100%", height: 150 }}
            />
            <Title numberOfLines={1}>{name}</Title>
            <Price>Rs. {regular_price ? regular_price : price}</Price>
        </Container>
    );
}

const Picture = styled.Image`
    background-color: red;
`;

const Container = styled.TouchableOpacity`
    width: 200;
    border-radius: 5;
`;

const Title = styled.Text`
    font-weight: 800;
    text-align: left;
`;
const Price = styled.Text`
    text-align: left;
`;
