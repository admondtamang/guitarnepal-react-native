import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

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

export default class SwiperComponent extends React.Component {
    render() {
        return (
            <Swiper
                style={styles.wrapper}
                dotStyle={{
                    backgroundColor: "#000",
                    borderColor: "#000",
                    borderWidth: 1,
                    width: 10,
                    height: 10,
                    borderRadius: 10,
                }}
                activeDotColor="#FFF"
                activeDotStyle={{
                    borderColor: "#000",
                    borderWidth: 1,
                    width: 10,
                    height: 10,
                    borderRadius: 10,
                }}
            >
                <View style={styles.slide}>
                    <Image
                        source={{ uri: "https://i.ibb.co/JxykVBt/flat-lay-photography-of-vegetable-salad-on-plate-1640777.jpg" }}
                        style={{ height: 400, width: 400 }}
                    />
                </View>
                <View style={styles.slide}>
                    <Image
                        source={{ uri: "https://i.ibb.co/JxykVBt/flat-lay-photography-of-vegetable-salad-on-plate-1640777.jpg" }}
                        style={{ height: 400, width: 400 }}
                    />
                </View>
                <View style={styles.slide}>
                    <Image
                        source={{ uri: "https://i.ibb.co/JxykVBt/flat-lay-photography-of-vegetable-salad-on-plate-1640777.jpg" }}
                        style={{ height: 400, width: 400 }}
                    />
                </View>
            </Swiper>
        );
    }
}
