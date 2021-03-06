import React, { useEffect, useState } from "react";

import { createStackNavigator } from "@react-navigation/stack";

import TabNavigator from "./TabNavigator";
import OnBoardingScreen from "../screens/OnBoardingScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import SearchScreen from "../screens/SearchScreen";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import ProductCategory from "../screens/ProductCategory";
import CategoriesList from "../screens/CategoriesList";

import ShoppingCartIcon from "../components/ShoppingCartIcon";
import Cart from "../screens/Cart";
import LoginScreen from "../screens/Login";
import SignupScreen from "../screens/Signup";
import CheckOutScreen from "../screens/CheckOut";
import OrderPlaced from "../screens/CheckOut/OrderPlaced";
export default function StackNavigator() {
    const Stack = createStackNavigator();
    const [isFirstLaunch, setIsFirstLaunch] = useState(null);

    // useEffect(() => {
    //     AsyncStorage.getItem("onboardin").then((value) => {
    //         if (value === null) {
    //             AsyncStorage.setItem("onboardin", "true");
    //             setIsFirstLaunch(true);
    //         } else {
    //             setIsFirstLaunch(false);
    //         }
    //     });
    // }, []);

    // if (isFirstLaunch === null) {
    //     return null;
    // } else if (isFirstLaunch === true) {
    //     return (
    //         <Stack.Navigator initialRouteName={isFirstLaunch ? "OnBoarding" : "TabNavigator"}>
    //             <Stack.Screen name="OnBoarding" component={OnBoardingScreen} options={{ headerShown: false }} />
    //             <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }} />
    //             <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
    //             <Stack.Screen name="Search" component={SearchScreen} />
    //         </Stack.Navigator>
    //     );
    // } else
    return (
        <Stack.Navigator>
            <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Categories" component={CategoriesList} options={{ headerShown: false }} />
            <Stack.Screen name="ProductCategory" component={ProductCategory} options={{ headerShown: false }} />
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen name="Checkout" component={CheckOutScreen} options={{ headerShown: false }} />
            <Stack.Screen name="OrderPlaced" component={OrderPlaced} options={{ headerShown: false }} />
            <Stack.Screen
                name="ProductDetail"
                component={ProductDetailScreen}
                options={{
                    headerRight: () => <ShoppingCartIcon />,
                }}
            />
            <Stack.Screen name="CartScreen" component={Cart} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}
