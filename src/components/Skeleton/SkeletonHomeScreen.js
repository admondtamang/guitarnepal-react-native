import React from "react";
import { View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

export default function SkeletonHomeScreen() {
    return (
        <SkeletonPlaceholder>
            <View
                style={{
                    padding: 10,
                }}
            >
                <View style={{ marginTop: 6, height: 160, borderRadius: 4 }} />

                <View style={{ marginTop: 20, height: 20, borderRadius: 4 }} />
                <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                    <View style={{ marginTop: 6, height: 150, width: 170, borderRadius: 4 }} />
                    <View style={{ marginTop: 6, height: 150, width: 170, borderRadius: 4 }} />
                </View>

                <View style={{ marginTop: 20, height: 20, borderRadius: 4 }} />
                <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                    <View style={{ marginTop: 6, height: 150, width: 170, borderRadius: 4 }} />
                    <View style={{ marginTop: 6, height: 150, width: 170, borderRadius: 4 }} />
                </View>
            </View>
        </SkeletonPlaceholder>
    );
}
