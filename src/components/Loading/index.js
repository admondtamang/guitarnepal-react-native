import React from "react";

import { Container, Header, Content, Spinner } from "native-base";
import LottieFile from "../LottieFile";
import LoadingLottie from "../../../assets/lottie/loading.json";
export default function Loading() {
    return (
        <Container>
            <LottieFile animationData={LoadingLottie} message="Loading" />
        </Container>
    );
}
