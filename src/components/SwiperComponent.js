import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { Image } from "react-native-elements";

import ImageView from "react-native-image-viewing";
import Swiper from "react-native-swiper";

const styles = StyleSheet.create({
    wrapper: {},
    slide: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#444FFF",
    },
});

export default function SwiperComponent({ images }) {
    const [isVisible, setIsVisible] = useState(false);
    const fullImageView = <ImageView images={images} imageIndex={0} visible={isVisible} onRequestClose={() => setIsVisible(false)} />;

    return (
        <>
            {fullImageView}
            <Swiper activeDotColor="#FFF" style={styles.wrapper}>
                {images.map((item, index) => (
                    <TouchableOpacity key={index} style={styles.slide} onPress={() => setIsVisible(true)}>
                        <Image style={{ width: 400, height: 450 }} PlaceholderContent={<ActivityIndicator />} source={{ uri: item.uri }} />
                    </TouchableOpacity>
                ))}
            </Swiper>
        </>
    );
}
