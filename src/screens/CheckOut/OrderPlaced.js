import React from "react";
import LottieFile from "../../components/LottieFile";
import data from "../../../assets/lottie/order-placed.json";
import SafeAreaContainer from "../../components/SafeAreaContainer";
import { Button } from "react-native-paper";
export default function OrderPlaced({ navigation }) {
    return (
        <SafeAreaContainer>
            <LottieFile animationData={data} message="Order has been successfully placed. We'll reach you soon." />

            <Button style={{ marginTop: 20 }} mode="contained" onPress={() => navigation.navigate("Home")}>
                Home
            </Button>
        </SafeAreaContainer>
    );
}
