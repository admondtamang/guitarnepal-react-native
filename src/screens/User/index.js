import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, Image, useWindowDimensions } from "react-native";
import Constants from "expo-constants"; //So we can read app.json extra
import * as GoogleSignIn from "expo-google-sign-in";

import * as Facebook from "expo-facebook";
import * as Google from "expo-google-app-auth";
import firebase from "firebase"; //basic firebase
// import firebase from "../../helpers/firebase"; //This is the initialized Firebase, you can find it in my GitHub
import { Avatar, Caption, Title, Button, Switch } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Loading from "../../components/Loading";
import SignScreen from "./SignScreen";
import { login, logout, switchDarkMode } from "../../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
import { contentWidth } from "../../utils/width";
const Container = styled.SafeAreaView`
    padding: 20px;
`;

export default function User() {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const user = useSelector((state) => state.user.data);
    const darkMode = useSelector((state) => state.user.darkMode);
    const contentWidth = useWindowDimensions().width;

    const facebookAppId = "899946727075631";
    const androidAppId = "150398907444-6edkhdrbnutdivi2k6k49otbsdqf7n8h.apps.googleusercontent.com";
    useEffect(() => {}, [dispatch]);

    // async function signInWithGoogle() {
    //     setIsLoading(true);
    //     try {
    //         const result = await Google.logInAsync({
    //             androidClientId: androidAppId,
    //             iosClientId: "ios" + androidAppId,
    //             behavior: "web",
    //             scopes: ["profile", "email"],
    //             permissions: ["public_profile", "email", "gender", "location"],
    //         });

    //         if (result.type === "success") {
    //             // setUser(result.user);
    //             console.log(result.user);

    //             dispatch(login(result.user));
    //             setIsLoading(false);
    //         } else {
    //             return { cancelled: true };
    //         }
    //     } catch ({ message }) {
    //         alert("login: Error:" + message);
    //     }
    //     setIsLoading(false);
    // }

    useEffect(() => {
        initAsync();
    }, []);

    const initAsync = async () => {
        await GoogleSignIn.initAsync({
            // You may ommit the clientId when the firebase `googleServicesFile` is configured
            clientId: androidAppId,
        });
        _syncUserWithStateAsync();
    };

    const _syncUserWithStateAsync = async () => {
        const user = await GoogleSignIn.signInSilentlyAsync();
        setUser(user);
    };

    const signInWithGoogle = async () => {
        try {
            await GoogleSignIn.askForPlayServicesAsync();
            const { type, user } = await GoogleSignIn.signInAsync();
            if (type === "success") {
                _syncUserWithStateAsync();
            }
        } catch ({ message }) {
            alert("login: Error:" + message);
        }
    };

    //  For future use
    async function signInWithFacebook() {
        try {
            await Facebook.initializeAsync({
                appId: facebookAppId,
            });
            const { type, token, expirationDate, permissions, declinedPermissions } = await Facebook.logInWithReadPermissionsAsync({
                permissions: ["public_profile"],
            });
            if (type === "success") {
                // Get the user's name using Facebook's Graph API
                const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
                Alert.alert("Logged in!", `Hi ${(await response.json()).name}!`);
            } else {
                // type === 'cancel'
            }
        } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
        }
    }

    if (isLoading) {
        return <Loading />;
    }

    if (!user) {
        const Row = styled.View`
            flex: 1;
            justify-content: flex-end;
        `;
        return (
            <Container>
                <SignScreen signInWithGoogle={signInWithGoogle} />

                <Row>
                    <Text>{darkMode ? "Night Mode " : "Day Mode"}</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={darkMode ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => dispatch(switchDarkMode())}
                        value={darkMode}
                    />
                </Row>
                <Title>Let's sign you in</Title>
                <Text>We'll love to share information with you. </Text>
                <Image source={require("../../assets/login.png")} style={{ margin: 20, width: "80%" }} />
                <Button icon="google" style={{ backgroundColor: "green" }} mode="contained" onPress={() => signInWithGoogle()}>
                    Google Signin
                </Button>
                {/* <Button title="Login with Google" onPress={signInWithGoogle} /> */}
            </Container>
        );
    } else {
        const { familyName, givenName, id, name, photoUrl, email, location } = user;

        return (
            <Container>
                <View style={styles.userInfoSection}>
                    <View style={{ flexDirection: "row", marginTop: 15 }}>
                        <Avatar.Image
                            source={{
                                uri: photoUrl,
                            }}
                            size={80}
                        />
                        <View style={{ marginLeft: 20 }}>
                            <Title
                                style={[
                                    styles.title,
                                    {
                                        marginTop: 15,
                                        marginBottom: 5,
                                    },
                                ]}
                            >
                                {givenName}
                            </Title>
                            <Caption style={styles.caption}>@{familyName}</Caption>
                        </View>
                    </View>
                </View>
                <View style={styles.userInfoSection}>
                    {/* <View style={styles.row}>
                    <Icon name="map-marker-radius" color="#777777" size={20} />
                    <Text style={{ color: "#777777", marginLeft: 20 }}>{location}</Text>
                </View>
                <View style={styles.row}>
                    <Icon name="phone" color="#777777" size={20} />
                    <Text style={{ color: "#777777", marginLeft: 20 }}>+977 {phone}</Text>
                </View> */}
                    <View style={styles.row}>
                        <Icon name="email" color="#777777" size={20} />
                        <Text style={{ color: "#777777", marginLeft: 20 }}>{email}</Text>
                    </View>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={darkMode ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => dispatch(switchDarkMode())}
                        value={darkMode}
                    />
                    <Button icon="power" mode="contained" onPress={() => dispatch(logout())}>
                        Logout
                    </Button>
                </View>
                {/* <Button title="Facebook" onPress={signInWithFacebook} /> */}
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: "500",
    },
    row: {
        flexDirection: "row",
        marginBottom: 10,
    },
    infoBoxWrapper: {
        borderBottomColor: "#dddddd",
        borderBottomWidth: 1,
        borderTopColor: "#dddddd",
        borderTopWidth: 1,
        flexDirection: "row",
        height: 100,
    },
    infoBox: {
        width: "50%",
        alignItems: "center",
        justifyContent: "center",
    },
    menuWrapper: {
        marginTop: 10,
    },
    menuItem: {
        flexDirection: "row",
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    menuItemText: {
        color: "#777777",
        marginLeft: 20,
        fontWeight: "600",
        fontSize: 16,
        lineHeight: 26,
    },
});
