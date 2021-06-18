import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import LottieFile from "../../components/LottieFile";
import CartItem from "./CartItem";
import animated from "../../../assets/lottie/42176-empty-cart.json";
import { FlatList } from "react-native-gesture-handler";
import { Button, Title } from "react-native-paper";

export default function Cart({ navigation }) {
    const [count, setCount] = React.useState(0);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <Button onPress={() => setCount((c) => c + 1)} title="Update count" />,
        });
    }, [navigation]);

    const cartItems = useSelector((state) => state.cart.cartItems);

    const renderItem = ({ item }) => <CartItem item={item} />;

    return (
        <SafeAreaView style={{ padding: 10 }}>
            {cartItems.length === 0 ? (
                <LottieFile animationData={animated} loop={false} />
            ) : (
                <>
                    <FlatList
                        ListHeaderComponent={<Title style={{ fontWeight: "bold" }}>Shopping Bag</Title>}
                        showsVerticalScrollIndicator={false}
                        data={cartItems}
                        numColumns={1}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderItem}
                    />
                    <Button style={{ marginTop: 20 }} mode="contained" onPress={() => navigation.navigate("Checkout")}>
                        Proceed To Checkout
                    </Button>
                </>
            )}
        </SafeAreaView>
    );
}
