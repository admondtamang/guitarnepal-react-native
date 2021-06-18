import React, { useEffect } from "react";
import { Text, View, Dimensions } from "react-native";
import Swiper from "react-native-swiper";
import styled from "styled-components/native";
import useFetch from "../../utils/hooks/useFetch";
import Image from "react-native-image-progress";
import ProgressBar from "react-native-progress";
import ImageViewer from "react-native-image-zoom-viewer";
const { width } = Dimensions.get("window");
const Container = styled.View`
    flex: 1;
    padding: 20px 0;
    border-radius: 20;
    margin-bottom: 20px;
`;

const styles = {
    slide: {
        flex: 1,
        borderRadius: 2,
        justifyContent: "center",
        backgroundColor: "transparent",
    },

    slide1: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#9DD6EB",
    },

    slide2: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#97CAE5",
    },

    slide3: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#92BBD9",
    },

    text: {
        color: "#fff",
        fontSize: 30,
        fontWeight: "bold",
    },

    image: {
        width,
        borderRadius: 10,
        flex: 1,
    },
};

export default function MyCarousel() {
    // const url = "https://www.thevisitx.com/wp-json/wp/v2/posts?per_page=4&orderby=date&order=desc&feature=true";

    // const { response, error, isLoading } = useFetch(url, {});

    // console.error("asd", response);
    const data = [
        {
            title: "Dark Collection",
            subtitle: "Lorem ipsum dolor sit amet et nuncat mergitur",
            illustration: "https://wallpapercave.com/wp/wp3145662.jpg",
        },
        {
            title: "Electric way",
            subtitle: "Lorem ipsum dolor sit amet",
            illustration: "https://themepack.me/i/c/749x467/media/g/774/guitar-theme-ha17.jpg",
        },
    ];
    // const { title, content, excerpt, jetpack_featured_media_url, date, slug } = response;

    // if (isLoading || error) {
    //     return <Text>Loading</Text>;
    // }

    return (
        <Container>
            <Swiper
                height={120}
                onMomentumScrollEnd={(e, state, context) => console.log("index:", state.index)}
                dot={
                    <View
                        style={{
                            backgroundColor: "rgba(0,0,0,.2)",
                            width: 5,
                            height: 5,
                            borderRadius: 4,
                            marginLeft: 3,
                            marginRight: 3,
                            marginTop: 3,
                            marginBottom: 3,
                        }}
                    />
                }
                activeDot={
                    <View
                        style={{
                            backgroundColor: "#000",
                            width: 8,
                            height: 8,
                            borderRadius: 4,
                            marginLeft: 3,
                            marginRight: 3,
                            marginTop: 3,
                            marginBottom: 3,
                        }}
                    />
                }
                paginationStyle={{
                    bottom: -23,
                    left: null,
                    right: 10,
                }}
                loop
            >
                {/* {isLoading ? (
                    <Text>Loading...</Text>
                ) : (
                    <>
                        {response?.map((item) => (
                            <View style={styles.slide} title={<Text numberOfLines={1}>{item.title.rendered}</Text>}>
                                <Image resizeMode="stretch" style={styles.image} source={{ uri: item.jetpack_featured_media_url }} />
                            </View>
                        ))}
                    </>
                )} */}

                {data.map((item, i) => (
                    <View key={i} style={{ borderRadius: 10 }} title={<Text numberOfLines={1}>{item.title}</Text>}>
                        <ImageViewer />
                        <Image
                            source={{ uri: item.illustration }}
                            indicator={ProgressBar}
                            indicatorProps={{
                                size: 80,
                                borderWidth: 0,
                                color: "rgba(150, 150, 150, 1)",
                                unfilledColor: "rgba(200, 200, 200, 0.2)",
                            }}
                            style={{
                                borderRadius: 10,
                                width: width,
                                height: 120,
                            }}
                        />
                    </View>
                ))}
            </Swiper>
        </Container>
    );
}
