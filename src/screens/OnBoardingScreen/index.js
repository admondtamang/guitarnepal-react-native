import React from "react";
import { Image } from "react-native";
import Onboarding from "react-native-onboarding-swiper";

export default function OnBoardingScreen({ navigation }) {
    return (
        <Onboarding
            onDone={() => navigation.replace("TabNavigator")}
            onSkip={() => navigation.navigate("TabNavigator")}
            pages={[
                {
                    backgroundColor: "#fff",
                    image: <Image source={require("./images/circle.png")} />,
                    title: "Onboarding",
                    subtitle: "Done with React Native Onboarding Swiper",
                },
                {
                    backgroundColor: "#fe6e58",
                    image: <Image source={require("./images/square.png")} />,
                    title: "The Title",
                    subtitle: "This is the subtitle that sumplements the title.",
                },
                {
                    backgroundColor: "#999",
                    image: <Image source={require("./images/triangle.png")} />,
                    title: "Triangle",
                    subtitle: "Beautiful, isn't it?",
                },
            ]}
        />
    );
}
