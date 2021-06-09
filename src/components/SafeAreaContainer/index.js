import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SafeAreaContainer({ children }) {
    return <SafeAreaView style={{ flex: 1, padding: 10 }}>{children}</SafeAreaView>;
}
