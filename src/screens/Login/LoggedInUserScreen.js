import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, Image, useWindowDimensions } from "react-native";
import Constants from "expo-constants"; //So we can read app.json extra

// import firebase from "../../helpers/firebase"; //This is the initialized Firebase, you can find it in my GitHub
import { Avatar, Caption, Title, Button, Switch } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Loading from "../../components/Loading";
import { login, logout, switchDarkMode } from "../../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
import jwt_decode from "jwt-decode";

export default function LoggedInUserScreen() {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const user = useSelector((state) => state.user.data);
    const darkMode = useSelector((state) => state.user.darkMode);

    if (isLoading) {
        return <Loading />;
    }

    const { user_display_name, user_email, user_nicename } = user;
    const photoUrl =
        "https://img.freepik.com/free-photo/playful-hot-african-american-with-afro-hairstyle-pulling-hands-towards-make-selfie-winking-joyfully-smiling-broadly-making-new-profile-pic-social-network_176420-23120.jpg?size=626&ext=jpg";
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
                            {user_display_name}
                        </Title>
                        <Caption style={styles.caption}>@{user_nicename}</Caption>
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
                    <Text style={{ color: "#777777", marginLeft: 20 }}>{user_email}</Text>
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

const Container = styled.SafeAreaView`
    padding: 20px;
`;

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
