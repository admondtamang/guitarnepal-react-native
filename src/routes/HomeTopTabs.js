import * as React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import colors from "../utils/colors";
import Brand from "../screens/Home/Brands";
import Latest from "../screens/Home/Latest";
import Traditional from "../screens/Home/Traditional";
const Tab = createMaterialTopTabNavigator();

export default function MyTabs() {
    return (
        <Tab.Navigator
            tabBarOptions={{
                labelStyle: { fontSize: 12, color: "#0D0C22", textTransform: "lowercase" },
                tabStyle: { width: 110, shadowColor: "NavigationDarkTheme" },
                scrollEnabled: true,
                upperCaseLabel: false,
                labelStyle: {
                    fontWeight: "700",
                },
                indicatorStyle: {
                    borderColor: colors.primary,
                    color: colors.white,
                    backgroundColor: colors.secondary,
                    // padding: 23,
                    padding: 18,
                    width: 90,
                    marginLeft: 10,
                    marginVertical: 6,
                    borderRadius: 9,
                },
                contentContainerStyle: {
                    shadowColor: "white",
                    borderTopColor: "black",
                },
                style: {
                    shadowColor: "white",
                },
            }}
        >
            <Tab.Screen name="Latest" component={Latest} />
            <Tab.Screen name="Brand" component={Brand} />
            <Tab.Screen name="Tradition" component={Traditional} />
        </Tab.Navigator>
    );
}
