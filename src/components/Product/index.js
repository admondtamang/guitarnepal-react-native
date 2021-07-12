import React from "react";
import styled from "styled-components";
import { WIDTH } from "../../utils/screenSize";
import { useNavigation, useTheme } from "@react-navigation/native";
import { Badge } from "react-native-paper";
import ProgressiveImage from "../../components/ProgressiveImage";
export default function Product({ item, column }) {
    const { id, name, price, regular_price, images, on_sale, slug } = item;

    const Container = styled.TouchableOpacity`
        width: ${(props) => (column ? "140px" : "180px")};
        position: relative;
        border-radius: 5px;
        margin-bottom: 15px;
    `;
    var discount;
    const navigation = useNavigation();
    const onPress = () => {
        navigation.navigate("ProductDetail", {
            slug,
        });
    };

    if (regular_price) {
        discount = ((regular_price - price) / regular_price) * 100;
        discount = discount.toFixed(0);
    }
    // image validation choosing 1st image
    const image = images.length <= 0 ? "https://facebook.github.io/react/img/logo_small.png" : images[0].src;

    return (
        <Container onPress={onPress}>
            <Picture
                source={{
                    uri: images.length > 0 ? images[0]?.src : image,
                }}
            />
            <Title numberOfLines={1}>{name}</Title>
            <Price>
                Rs. {on_sale && <SalePrice>{regular_price} </SalePrice>}
                {price}
            </Price>

            {discount != 0 && <StyledBadge>-{discount}%</StyledBadge>}
        </Container>
    );
}

const SalePrice = styled.Text`
    color: red;
    padding-right: 15px;
    text-decoration: line-through;
`;
const StyledBadge = styled(Badge)`
    background-color: lightblue;
    color: blue;
    position: absolute;
    top: 5;
    right: 5;
`;
const Picture = styled(ProgressiveImage)`
    /* background-color: grey; */
    width: 100%;
    height: 140px;
    border-radius: 5px;
`;

const Title = styled.Text`
    font-weight: 800;
    text-align: left;
`;
const Price = styled.Text`
    color: grey;
    text-align: left;
    font-size: 13px;
`;
