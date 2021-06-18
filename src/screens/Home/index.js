import React from "react";
import { Feather } from "@expo/vector-icons";
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from "react-native";
import { Title } from "react-native-paper";
import TopNav from "../../routes/HomeTopTabs";

import { useNavigation, useTheme } from "@react-navigation/native";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import SafeAreaContainer from "../../components/SafeAreaContainer";
export default function Home() {
    const navigation = useNavigation();
    const { colors } = useTheme();

    const handleSearch = () => {
        navigation.navigate("Search");
    };
    const handleLogin = () => {
        navigation.navigate("Login");
    };

    return (
        <SafeAreaContainer style={{ backgroundColor: colors.background }}>
            {/* header */}
            <Header>
                <TouchableOpacity onPress={handleSearch}>
                    <Feather name="search" size={24} color="black" onPress={handleSearch} />
                </TouchableOpacity>
                <Title style={{ fontWeight: "bold" }}>GuitarNepal</Title>
                <TouchableOpacity onPress={handleLogin}>
                    <AntDesign name="user" size={24} color="black" />
                </TouchableOpacity>
            </Header>

            {/* Navigation */}
            <TopNav />
        </SafeAreaContainer>
    );
}

const Header = styled.View`
    padding: 5px 10px;
    /* margin-top: 30px; */
    flex-direction: row;
    justify-content: space-between;
`;
