import React from "react";
import { View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

export default function SkeletonArticleDetail() {
    return (
        <SkeletonPlaceholder>
            <View
                style={{
                    padding: 10,
                }}
            >
                <View style={{ height: 40, borderRadius: 4 }} />
                <View style={{ marginTop: 6, height: 200, borderRadius: 4 }} />
                <View style={{ marginTop: 6, height: 100, borderRadius: 4 }} />
                <View style={{ marginTop: 8, height: 20, borderRadius: 4 }} />
                <View style={{ marginTop: 6, height: 100, borderRadius: 4 }} />
            </View>
        </SkeletonPlaceholder>
    );
}
