import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

export default function StyledInput({ label, icon, formikProps, formikKey, ...rest }) {
    return (
        <View style={[styles.section]}>
            {/* <Text style={{ marginBottom: 3 }}>{label}</Text> */}
            <TextInput
                style={[styles.inputStyle]}
                onChangeText={formikProps.handleChange(formikKey)}
                onBlur={formikProps.handleBlur(formikKey)}
                {...rest}
            />
            {formikProps.touched[formikKey] && formikProps.errors[formikKey] && (
                <Text style={styles.error}>{formikProps.touched[formikKey] && formikProps.errors[formikKey]}</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    section: { marginVertical: 5 },
    inputStyle: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "black",
        padding: 10,
        marginBottom: 3,
    },
    error: { color: "red" },
});
