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
import { useToast } from "native-base";
import { postPlaceOrder } from "../../api/checkout";

export default function CheckOutScreen({ navigation }) {
    const dispatch = useDispatch();

    const toast = useToast();
    const cartItems = useSelector((state) => state.cart.cartItems);

    const [checked, setChecked] = useState(false);

    const SignupSchema = Yup.object().shape({
        first_name: Yup.string().required(),
        email: Yup.string().email().required(),
        address1: Yup.string().required(),
        city: Yup.string().required(),
        phone: Yup.number().required(),
    });

    if (cartItems.length <= 0) {
        toast.show({
            title: "Something went wrong",
            status: "error",
            description: "Please add item to cart!",
        });
        navigation.navigate("Home");
    }

    const onSubmit = async (values, actions) => {
        try {
            actions.setSubmitting(false);
            const order = {
                payment_method: "bacs",
                payment_method_title: "Cash on delivery",
                billing: values,
                line_items: cartItems.map(({ product_id, quantity }) => {
                    return { product_id, quantity };
                }),
                shipping_lines: [
                    {
                        method_id: "flat_rate",
                        method_title: "Flat Rate",
                        total: "100.00",
                    },
                ],
            };

            await postPlaceOrder(order);
            dispatch(EMPTY_CART());

            // dispatch(EMPTY_CART());
            navigation.navigate("OrderPlaced");
        } catch (error) {
            console.log(error);
            actions.setFieldError("general", error.message);
        }
    };

    return (
        <SafeAreaContainer>
            <ScrollView>
                <Text>Checkout</Text>
                <Title>Total : {selectCartTotal}</Title>

                <Formik
                    initialValues={{ first_name: "Testing", city: "sakl", email: "ad@gf.com", phone: "1", address1: "a2" }}
                    validationSchema={SignupSchema}
                    onSubmit={onSubmit}
                >
                    {(formikProps) => (
                        <>
                            <StyledInput label="Full Name" formikProps={formikProps} formikKey="first_name" placeholder="Full Name" />
                            <StyledInput label="Address1" formikProps={formikProps} formikKey="address_1" placeholder="Address" />
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
