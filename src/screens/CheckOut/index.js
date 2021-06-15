import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, ToastAndroid } from "react-native";
import { Button, ActivityIndicator, Checkbox } from "react-native-paper";
import { Title } from "react-native-paper";
import SafeAreaContainer from "../../components/SafeAreaContainer";
import StyledInput from "../../components/StyledInput";
import * as Yup from "yup";
import { Formik } from "formik";
import styled from "styled-components";
import { selectCartTotal } from "../../redux/cart/cartSelector";

export default function CheckOutScreen() {
    const [checked, setChecked] = useState(false);
    const SignupSchema = Yup.object().shape({
        username: Yup.string().required(),
    });

    const onSubmit = async (values, actions) => {
        try {
            console.log(values);
            actions.setSubmitting(false);
            // ToastAndroid.show("A pikachu appeared nearby !", ToastAndroid.SHORT);
            navigation.navigate("Login");
        } catch (error) {
            actions.setFieldError("general", error.message);
        }
    };

    return (
        <SafeAreaContainer>
            <ScrollView>
                <Text>Checkout</Text>
                <Title>Total : {selectCartTotal}</Title>

                <Formik
                    initialValues={{ email: "ad@gf.com", password: "1", username: "a2" }}
                    validationSchema={SignupSchema}
                    onSubmit={onSubmit}
                >
                    {(formikProps) => (
                        <>
                            <StyledInput label="Address1" formikProps={formikProps} formikKey="address" placeholder="Address" />
                            <StyledInput label="City" formikProps={formikProps} formikKey="city" placeholder="City" />
                            <StyledInput label="Email" formikProps={formikProps} formikKey="email" placeholder="Email" />
                            <StyledInput label="Phone" formikProps={formikProps} formikKey="phone" placeholder="Phone" />

                            <Agreement>
                                <Checkbox
                                    status={checked ? "checked" : "unchecked"}
                                    onPress={() => {
                                        setChecked(!checked);
                                    }}
                                />
                                <Text>Accept our terms and policy.</Text>
                            </Agreement>

                            <Text style={{ color: "red" }}>{formikProps.errors.general}</Text>

                            <Button
                                mode="contained"
                                style={styles.section}
                                loading={formikProps.isSubmitting}
                                onPress={formikProps.handleSubmit}
                            >
                                Checkout
                            </Button>
                            {/* <pre>{JSON.stringify(formikProps, null, 2)}</pre> */}
                            {/* <Text>{JSON.stringify(formikProps, null, 2)}</Text> */}
                        </>
                    )}
                </Formik>
            </ScrollView>
        </SafeAreaContainer>
    );
}

const Agreement = styled.View`
    /* background:red; */
    /* text-align: left; */
    justify-content: flex-start;
    display: flex;
    color: grey;
`;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        color: "#3465d9",
        fontWeight: "bold",
        fontSize: 30,
    },
    text: {
        color: "gray",
        marginBottom: 20,
    },
    section: {
        marginTop: 10,
    },
    haveAccount: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10,
    },
});
