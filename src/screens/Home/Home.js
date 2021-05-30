import React from "react";
import { Feather } from "@expo/vector-icons";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Title } from "react-native-paper";
// import MyTabs from "../../routes/HomeTopTabs";

import { useNavigation, useTheme } from "@react-navigation/native";
import styled from "styled-components/native";

const Container = styled.View`
    padding: 10px;
    margin-top: 20px;
    flex-direction: row;
    justify-content: space-between;
`;

export default function Home() {
    const navigation = useNavigation();
    const { colors } = useTheme();

    const onPress = () => {
        navigation.navigate("Search");
    };

    return (
        <ScrollView style={{ backgroundColor: colors.background }}>
            <Container>
                <Title style={{ fontWeight: "bold" }}>Hello</Title>
                <TouchableOpacity onPress={onPress}>
                    <Feather name="search" size={24} color="black" onPress={onPress} />
                </TouchableOpacity>
            </Container>
            {/* <MyTabs /> */}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    heading: {
        marginTop: 20,
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
    },
});
