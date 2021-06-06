import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components";

export default function CategoriesContainer({ data }) {
    return (
        <Container>
            <Text>Guitars</Text>
        </Container>
    );
    const Container = styled.View`
        display: flex;
        flex-direction: column;
    `;
}
