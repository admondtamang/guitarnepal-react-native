import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";

export default function SignScreen({ signInWithGoogle }) {
    return (
        <View style={{ paddingTop: 50 }}>
            <Button title="Login with Google" onPress={signInWithGoogle} />
        </View>
    );
}
