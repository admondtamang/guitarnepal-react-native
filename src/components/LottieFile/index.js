import AnimatedLottieView from "lottie-react-native";
import styled from "styled-components";
import React from "react";
import { View } from "react-native";

export default function LottieFile({ animationData, width, height, message }) {
    return (
        <Container>
            <View style={{ height: 200 }}>
                <AnimatedLottieView
                    source={animationData ? animationData : require("../../../assets/lottie/4888-dog-icon.json")}
                    autoPlay
                    loop
                />
            </View>
            {message && <Message>{message}</Message>}
        </Container>
    );
}
const Message = styled.Text`
    text-align: center;
    font-weight: bold;
`;

const Container = styled.View`
    display: flex;
    flex-direction: column;
    height: 220;
`;
