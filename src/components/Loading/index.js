import React from "react";

import LottieFile from "../LottieFile";
import LoadingLottie from "../../../assets/lottie/49031-guitar-music.json";
import { Surface } from "react-native-paper";
export default function Loading() {
    return (
        <Surface>
            <LottieFile loop={true} animationData={LoadingLottie} message="Loading" />
        </Surface>
    );
}
