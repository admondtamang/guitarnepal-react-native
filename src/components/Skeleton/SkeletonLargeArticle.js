import React from "react";
import { View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

export default function SkeletonLargeArticle() {
    return (
        <SkeletonPlaceholder>
            <View
                style={{
                    padding: 10,
                    borderWidth: 1,
                    borderColor: "#E5E5E5",
                    padding: 10,
                    marginBottom: 20,
                }}
            >
                <View style={{ height: 40, borderRadius: 4 }} />
                <View style={{ marginTop: 6, height: 100, borderRadius: 4 }} />
                <View style={{ marginTop: 6, height: 100, borderRadius: 4 }} />
                <View style={{ marginTop: 8, height: 20, borderRadius: 4 }} />
            </View>
        </SkeletonPlaceholder>
    );
}
