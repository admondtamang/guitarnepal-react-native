import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, ToastAndroid } from "react-native";
import { Button, ActivityIndicator } from "react-native-paper";
import axios from "axios";
import StyledInput from "../../components/StyledInput";
import * as Yup from "yup";
import { Formik } from "formik";

const SignupScreen = ({ navigation }) => {
    const SignupSchema = Yup.object().shape({
        userName: Yup.string().required(),
        email: Yup.string().email().required(),
        password: Yup.string().required().min(2, "Seems a bit short...").max(10, "We prefer insecure system, try a shorter password."),
        phone: Yup.string().required().max(10).min(4),
        confirmPassword: Yup.string()
            .required()
            .label("Confirm password")
            .test("passwords-match", "Passwords must match !!!", function (value) {
                return this.parent.password === value;
            }),
    });

    const onSubmit = async (values, actions) => {
        try {
            const reqBody = {
                query: `
        mutation{
            createUser(userInput:{userName:"${values.userName}"email:"${values.email}" password:"${values.password}",location:"${values.location}",phone:"${values.phone}"}){
            _id
            email
            password
          }
        }
      `,
            };

            await axios.post("http://localhost:3000/graphql", reqBody);
            actions.setSubmitting(false);
            // ToastAndroid.show("A pikachu appeared nearby !", ToastAndroid.SHORT);
            navigation.navigate("Login");
        } catch (error) {
            actions.setFieldError("general", error.message);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={{
                    justifyContent: "center",
                    paddingHorizontal: 38,
                    backgroundColor: "white",
                    paddingVertical: 100,
                }}
            >
                <Text style={styles.title}>SignUp</Text>
                <Text style={styles.text}>Enter valid Email and Password</Text>
                <Formik
                    initialValues={{ email: "", password: "", phone: "", location: "" }}
                    validationSchema={SignupSchema}
                    onSubmit={onSubmit}
                >
                    {(formikProps) => (
                        <>
                            <StyledInput label="User Name" formikProps={formikProps} formikKey="userName" placeholder="User Name" />
                            <StyledInput label="Email" formikProps={formikProps} formikKey="email" placeholder="Email" />

                            <StyledInput label="Phone" formikProps={formikProps} formikKey="phone" placeholder="Phone" />
                            <StyledInput
                                label="password"
                                formikProps={formikProps}
                                formikKey="password"
                                placeholder="Password"
                                secureTextEntry
                            />
                            <StyledInput
                                label="Confirm Password"
                                formikProps={formikProps}
                                formikKey="confirmPassword"
                                placeholder="confirm password"
                                secureTextEntry
                            />

                            <View style={styles.haveAccount}>
                                <Text
                                    style={{
                                        color: "gray",
                                    }}
                                >
                                    Already have an account?{" "}
                                </Text>
                                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                                    <Text style={{ fontWeight: "bold", color: "#3465d9" }}>Login</Text>
                                </TouchableOpacity>
                            </View>

                            <Text style={{ color: "red" }}>{formikProps.errors.general}</Text>

                            <Button
                                mode="contained"
                                style={styles.section}
                                loading={formikProps.isSubmitting}
                                onPress={formikProps.handleSubmit}
                            >
                                Submit
                            </Button>
                            {/* <pre>{JSON.stringify(formikProps, null, 2)}</pre> */}
                            {/* <Text>{JSON.stringify(formikProps, null, 2)}</Text> */}
                        </>
                    )}
                </Formik>
            </ScrollView>
        </View>
    );
};

export default SignupScreen;

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
