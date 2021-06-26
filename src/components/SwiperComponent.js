import React, { useState } from "react";
import { TouchableOpacity, Button, Image, Modal, StyleSheet } from "react-native";

import ImageView from "react-native-image-viewing";
import Swiper from "react-native-swiper";
import { Portal } from "react-native-paper";
import { View } from "react-native-ui-lib";

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
                        <Image
                            source={{
                                uri: item.uri,
                            }}
                            style={{ height: 450, width: 400 }}
                        />
                    </TouchableOpacity>
                ))}
            </Swiper>
        </>
    );
}
