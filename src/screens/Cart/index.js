import React from "react";
import { View, Text, ScrollView } from "react-native";
import { List, Title } from "react-native-paper";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";

export default function Cart() {
    const cartItems = useSelector((state) => state.cart.cartItems);
    return (
        <ScrollView style={{ padding: 10 }}>
            {cartItems.map((item, index) => (
                <CartItem item={item} key={index} />
            ))}
        </ScrollView>
    );
}
