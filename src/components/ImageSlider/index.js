import React from "react";
import { SliderBox } from "react-native-image-slider-box";

export default function ImageSlider({ images, onPress }) {
    return (
        <SliderBox
            images={images}
            sliderBoxHeight={400}
            dotColor="#FFEE58"
            inactiveDotColor="#90A4AE"
            paginationBoxVerticalPadding={20}
            // autoplay
            circleLoop
            ImageComponentStyle={{ borderRadius: 15, width: "97%", marginTop: 5 }}
            resizeMethod={"resize"}
            resizeMode={"cover"}
            onPress={onPress}
        />
    );
}
