import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const ShoppingCartIcon = ({ cart }) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity style={{ marginRight: 15 }} onPress={() => navigation.push("CartScreen")}>
            <View
                style={{
                    position: "absolute",
                    bottom: 10,
                    right: 20,
                    height: 15,
                    width: 15,
                    justifyContent: "center",
                    alignItems: "center",

                    borderRadius: 15,
                    backgroundColor: "rgba(95,197,123,0.8)",
                }}
            >
                <Text style={{ color: "white" }}>{cart.cartItems.length}</Text>
            </View>
            <FontAwesome name="shopping-basket" size={24} color="rgba(95,197,123,0.8)" />
        </TouchableOpacity>
    );
};

const mapStateToProps = (state) => {
    return {
        cart: state.cart,
    };
};

export default connect(mapStateToProps)(ShoppingCartIcon);
