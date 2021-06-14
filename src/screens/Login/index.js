import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Formik } from "formik";
import axios from "axios";
import { Button, HelperText, ActivityIndicator } from "react-native-paper";
import * as Yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { user_login } from "../../api/user";

export default function LoginScreen({ navigation }) {
    const [borderColor, setBorderColor] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const getToken = async () => {
            try {
                const value = await AsyncStorage.getItem("token");
                if (value !== null) {
                    navigation.navigate("TabNavigator");
                    console.log("token is here", value);
                }
            } catch (e) {
                console.log(e);
            }
        };
        getToken();
    }, []);

    const onFocusInput = (value) => {
        setBorderColor(value);
    };

    const onSubmit = async (values, actions) => {
        try {
            console.log(values);

            const token = await user_login(values);
            console.log(token);

            setIsLoggedIn(!isLoggedIn);
            await AsyncStorage.setItem("token", token);
        } catch (e) {
            actions.setFieldError("general", e.message);
            console.log(e);
        } finally {
            actions.setSubmitting(false);
        }
    };

    const loginSchema = Yup.object().shape({
        username: Yup.string().required(),
        password: Yup.string().required(),
    });

    if (isLoggedIn) navigation.navigate("TabNavigator");

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <Text style={styles.text}>Login with User Name and Password</Text>
            <Formik initialValues={{ username: "john.doe", password: "hariprasad" }} validationSchema={loginSchema} onSubmit={onSubmit}>
                {(formik) => (
                    <>
                        <View style={styles.action}>
                            <View
                                style={[
                                    styles.section,
                                    {
                                        borderColor: borderColor == "email" ? "#3465d9" : "gray",
                                    },
                                ]}
                            >
                                <MaterialIcons name="person" size={20} color={borderColor == "email" ? "#3465d9" : "gray"} />
                                <TextInput
                                    placeholder="User Name"
                                    style={[
                                        styles.TextInput,
                                        {
                                            color: borderColor == "email" ? "#3465d9" : "gray",
                                        },
                                    ]}
                                    onChangeText={formik.handleChange("username")}
                                    value={formik.values.username}
                                    onBlur={formik.handleBlur("username")}
                                    onFocus={() => onFocusInput("username")}
                                    autoFocus
                                />
                            </View>
                            {formik.touched.username && formik.errors.username && (
                                <HelperText type="error">{formik.touched.username && formik.errors.username}</HelperText>
                            )}
                        </View>

                        <View style={styles.action}>
                            <View
                                style={[
                                    styles.section,
                                    {
                                        borderColor: borderColor == "password" ? "#3465d9" : "gray",
                                    },
                                ]}
                            >
                                <MaterialIcons name="lock-outline" size={20} color={borderColor == "password" ? "#3465d9" : "gray"} />
                                <TextInput
                                    placeholder="Password"
                                    value={formik.values.password}
                                    onChangeText={formik.handleChange("password")}
                                    onBlur={formik.handleBlur("password")}
                                    style={[
                                        styles.TextInput,
                                        {
                                            color: borderColor == "password" ? "#3465d9" : "gray",
                                        },
                                    ]}
                                    onFocus={() => onFocusInput("password")}
                                    secureTextEntry
                                />
                            </View>
                            {formik.touched.password && formik.errors.password && (
                                <HelperText type="error">{formik.touched.password && formik.errors.password}</HelperText>
                            )}
                        </View>

                        <Text style={styles.forgot}>Forgot Password?</Text>
                        {formik.errors.general && <Text style={{ color: "red" }}>{formik.errors.general}</Text>}

                        {formik.isSubmitting ? (
                            <ActivityIndicator />
                        ) : (
                            <Button mode="contained" onPress={formik.handleSubmit}>
                                Login
                            </Button>
                        )}
                        {/* <Button mode="outlined" onPress={fblogin}>
              Login in with Facebook
            </Button> */}
                    </>
                )}
            </Formik>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: 10,
                }}
            >
                <Text
                    style={[
                        styles.textSignUp,
                        {
                            color: "gray",
                        },
                    ]}
                >
                    Don't have an account?{" "}
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Signup")} style={{ alignSelf: "stretch", alignItems: "center" }}>
                    <Text style={{ fontWeight: "bold", color: "#3465d9" }}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 38,
        backgroundColor: "white",
        paddingVertical: 100,
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
        flexDirection: "row",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 15,
        paddingVertical: 10,
        alignItems: "center",
        marginTop: 10,
    },
    action: {},
    TextInput: {
        flex: 1,
        paddingLeft: 10,
    },
    forgot: {
        textAlign: "right",
        marginTop: 15,
        marginBottom: 10,
        color: "gray",
    },
    login: {
        width: "100%",
        height: 40,
        backgroundColor: "#3465d9",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        borderRadius: 5,
    },
    textLogin: {
        color: "white",
        fontSize: 15,
        fontWeight: "bold",
    },
    error: { color: "red" },
});
