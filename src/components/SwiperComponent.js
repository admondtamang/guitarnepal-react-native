import React from "react";
import { Button, Image, Modal, StyleSheet, Text, View, FlatList } from "react-native";

import Swiper from "react-native-swiper";
import ReactNativeZoomableView from "@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView";
import { Portal } from "react-native-paper";

const styles = StyleSheet.create({
    wrapper: {},
    slide: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#444FFF",
    },
});

export default function SwiperComponent() {
    const [visible, setVisible] = React.useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = { backgroundColor: "white", padding: 20 };
    const images = [
        {
            title: "Anise Aroma Art Bazar",
            url: "https://i.ibb.co/hYjK44F/anise-aroma-art-bazaar-277253.jpg",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            id: 1,
        },
        {
            title: "Food inside a Bowl",
            url: "https://i.ibb.co/JtS24qP/food-inside-bowl-1854037.jpg",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            id: 2,
        },
        {
            title: "Vegatable Salad",
            url: "https://i.ibb.co/JxykVBt/flat-lay-photography-of-vegetable-salad-on-plate-1640777.jpg",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            id: 3,
        },
    ];

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
            <FlatList
                data={images}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <>
                        <View style={styles.slide}>
                            {/* <Button style={{ marginTop: 30 }} onPress={showModal}>
                                Show
                            </Button> */}
                            <Image
                                source={{
                                    uri: item.url,
                                }}
                                style={{ height: 400, width: 400 }}
                            />
                        </View>
                        <Portal>
                            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                                <ReactNativeZoomableView
                                    maxZoom={1.5}
                                    minZoom={0.5}
                                    zoomStep={0.5}
                                    initialZoom={1}
                                    bindToBorders={true}
                                    onZoomAfter={this.logOutZoomState}
                                    style={{
                                        padding: 10,
                                        backgroundColor: "red",
                                    }}
                                >
                                    <Image
                                        source={{
                                            uri: "https://i.ibb.co/JxykVBt/flat-lay-photography-of-vegetable-salad-on-plate-1640777.jpg",
                                        }}
                                        style={{ height: "100%", width: null }}
                                    />
                                </ReactNativeZoomableView>
                            </Modal>
                        </Portal>
                    </>
                )}
            />

            {/* <View style={styles.slide}>
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
            </View> */}
        </Swiper>
    );
}
