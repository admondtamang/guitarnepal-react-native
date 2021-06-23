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
import { useDispatch, useSelector } from "react-redux";
import { EMPTY_CART } from "../../redux/cart/cartSlice";
import axiosInstance from "../../utils/axios";
import { ORDERS } from "../../utils/constants";
import { useToast } from "native-base";

export default function CheckOutScreen({ navigation }) {
    const dispatch = useDispatch();

    const toast = useToast();
    const cart = useSelector((state) => state.cart.cartItems);

    const [checked, setChecked] = useState(false);
    const SignupSchema = Yup.object().shape({
        username: Yup.string().required(),
        email:Yup.email().required(),
        address1:Yup.string().required(),
        phone: Yup.string(),required(),
        city: Yup.string.required()
    });

    if (cart.items <= 0) {
        toast.show({
            title: "Something went wrong",
            status: "error",
            description: "Please add item to cart!",
        });
        navigation.navigate("Home");
    }
    console.log(cart);

    const onSubmit = async (values, actions) => {
        try {
            console.log(values, "==", cartItems);
            actions.setSubmitting(false);
            const order = {
                payment_method: "bacs",
                payment_method_title: "Cash on delivery",
                billing: { values },
                line_items: cartItems,
                shipping_lines: [
                    {
                        method_id: "flat_rate",
                        method_title: "Flat Rate",
                        total: "100.00",
                    },
                ],
            };
            // axiosInstance.post(ORDERS, values);
            // dispatch(EMPTY_CART());
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
                    initialValues={{ email: "ad@gf.com", phone: "1", address1: "a2" }}
                    validationSchema={SignupSchema}
                    onSubmit={onSubmit}
                >
                    {(formikProps) => (
                        <>
                            <StyledInput label="Address1" formikProps={formikProps} formikKey="address1" placeholder="Address" />
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
                            <Text>{JSON.stringify(formikProps, null, 2)}</Text>
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
