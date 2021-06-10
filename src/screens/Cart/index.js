import React from "react";
import { View, Text } from "react-native";
import { List, Title } from "react-native-paper";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
export default function Cart() {
    const cartItems = useSelector((state) => state.cart.cartItems);
    return (
        <View style={{ padding: 10 }}>
            <Title>Your Products</Title>
            {cartItems.map((item) => (
                <CartItem item={item} />
            ))}
        </View>
    );
}
