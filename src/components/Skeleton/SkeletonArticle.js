import React from "react";
import { View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

export default function SkeletonArticle() {
    return (
        <SkeletonPlaceholder>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    height: 130,
                    borderWidth: 1,
                    borderColor: "#E5E5E5",
                    padding: 10,
                    marginBottom: 10,
                }}
            >
                <View style={{ marginRight: 10, flexBasis: "70%" }}>
                    <View style={{ height: 20, borderRadius: 4 }} />
                    <View style={{ marginTop: 6, height: 70, borderRadius: 4 }} />
                    <View style={{ marginTop: 6, height: 10, width: 70, height: 10, borderRadius: 4 }} />
                </View>
                <View
                    style={{
                        // flexBasis: "30%",
                        width: 100,
                        height: 110,
                        borderRadius: 5,
                    }}
                />
            </View>
        </SkeletonPlaceholder>
    );
}
