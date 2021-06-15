import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import User from "../screens/User";
import Home from "../screens/Home";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import SearchScreen from "../screens/SearchScreen";
import CategoriesList from "../screens/CategoriesList";
import Cart from "../screens/Cart";
import colors from "../utils/colors";
import { useSelector } from "react-redux";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    return (
        <Tab.Navigator
            initialRouteName="Home"
            tabBarOptions={{
                activeTintColor: colors.secondary,
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color, size }) => <AntDesign name="home" color={color} size={size} />,
                }}
            />
            <Tab.Screen
                name="Search"
                component={SearchScreen}
                options={{
                    tabBarLabel: "Search",
                    tabBarIcon: ({ color, size }) => <AntDesign name="search1" size={size} color={color} />,
                }}
            />
            <Tab.Screen
                name="Categories"
                component={CategoriesList}
                options={{
                    tabBarLabel: "Categories",
                    tabBarIcon: ({ color, size }) => <AntDesign name="isv" size={size} color={color} />,
                }}
            />
            <Tab.Screen
                name="Cart"
                component={Cart}
                options={{
                    title: "Cart",
                    tabBarBadge: cartItems.length,
                    tabBarLabel: "Cart",
                    tabBarIcon: ({ color, size }) => <AntDesign name="shoppingcart" size={size} color={color} />,
                }}
            />
        </Tab.Navigator>
    );
};

export default TabNavigator;
