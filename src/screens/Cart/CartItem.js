import React from "react";
import { StyleSheet, Image, Text } from "react-native";
import { IconButton, List } from "react-native-paper";
import InputSpinner from "react-native-input-spinner";
export default function CartItem({ item }) {
    function onDispatch() {}
    return (
        <List.Item
            title={item?.name}
            description={"Rs " + item?.price}
            left={() => <Image source={{ uri: item?.images[0]?.src }} style={styles.cartImage} />}
            right={(props) => (
                <>
                    <InputSpinner
                        max={1000}
                        min={2}
                        step={1}
                        value={item?.quantity}
                        onChange={(num) => {
                            console.log(num);
                        }}
                    />
                    <IconButton icon="delete" color="red" size={20} onPress={onDispatch} {...props} />
                </>
            )}
        />
    );
}

const styles = StyleSheet.create({
    cartImage: {
        width: 60,
        height: 60,
        marginBottom: 5,
        borderRadius: 10,
    },
});
