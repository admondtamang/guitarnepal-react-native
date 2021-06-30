import React from "react";
import { List, Title } from "react-native-paper";
import Loading from "../../components/Loading";
import useFetch from "../../utils/hooks/useFetch";
import { useNavigation } from "@react-navigation/core";
import SafeAreaContainer from "../../components/SafeAreaContainer";

export default function CategoriesList() {
    const url = "wp-json/wc/v3/products/categories";
    const {
        response,
        error,
        status: { isLoading, isRejected, isResolved },
    } = useFetch(url);
    console.log(response);
    const navigation = useNavigation();

    function onPress(id) {
        navigation.navigate("ProductCategory", {
            id: id,
        });
    }
    return (
        <SafeAreaContainer>
            <Title style={{ fontWeight: "bold" }}>Categories List</Title>
            {isResolved &&
                response.map((res, index) => (
                    <List.Item
                        key={index}
                        onPress={() => onPress(res.id)}
                        title={res.name}
                        left={(props) => <List.Icon {...props} icon="folder" />}
                    />
                ))}

            {isLoading && <Loading />}
        </SafeAreaContainer>
    );
}
