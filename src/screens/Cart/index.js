import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import LottieFile from "../../components/LottieFile";
import CartItem from "./CartItem";
import animated from "../../../assets/lottie/42176-empty-cart.json";

export default function Cart() {
    const cartItems = useSelector((state) => state.cart.cartItems);

    if (cartItems.length === 0) {
        return (
            <SafeAreaView>
                <LottieFile animationData={animated} loop={false} />
            </SafeAreaView>
        );
    }
    return (
        <ScrollView style={{ padding: 10 }}>
            {cartItems.map((item, index) => (
                <CartItem item={item} key={index} />
            ))}
        </ScrollView>
    );
}
