import React from "react";

import { Container, Header, Content, Spinner } from "native-base";
import LottieFile from "../LottieFile";
import LoadingLottie from "../../../assets/lottie/loading.json";
import { Surface } from "react-native-paper";
export default function Loading() {
    return (
        <Surface>
            <LottieFile loop={true} animationData={LoadingLottie} message="Loading" />
        </Surface>
    );
}
