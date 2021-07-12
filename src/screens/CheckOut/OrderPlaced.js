import React from "react";
import { View, Text } from "react-native";
import LottieFile from "../../components/LottieFile";
import data from "../../../assets/lottie/order-placed.json";
import SafeAreaContainer from "../../components/SafeAreaContainer";
export default function OrderPlaced() {
    return (
        <SafeAreaContainer>
            <LottieFile animationData={data} message="Order has been successfully placed." />
        </SafeAreaContainer>
    );
}
