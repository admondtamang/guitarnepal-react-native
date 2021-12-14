import * as React from "react";

import { NavigationContainer, DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from "@react-navigation/native";
import { DefaultTheme as PaperDefaultTheme, DarkTheme as PaperDarkTheme, Provider as PaperProvider } from "react-native-paper";
import StackNavigator from "./routes/StackNavigator";
import { StatusBar } from "expo-status-bar";

const CombinedDarkTheme = {
    ...PaperDarkTheme,
    ...NavigationDarkTheme,
    roundness: 2,

    colors: { ...PaperDarkTheme.colors, ...NavigationDarkTheme.colors, background: "#333333", text: "#ffffff" },
};

const combinedLightTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    roundness: 2,

    colors: {
        ...NavigationDefaultTheme.colors,
        ...PaperDefaultTheme.colors,
        background: "#ffffff",
        text: "#333333",
    },
};

export default function Main() {
    // const isDarkTheme = useSelector((state) => state.user.darkMode);

    const isDarkTheme = false;
    // const [isDarkTheme, setIsDarkTheme] = React.useState(false);
    // React.useEffect(() => {
    //     setIsDarkTheme(store.getState().user.darkMode);
    // }, [isDarkTheme]);
    const theme = isDarkTheme ? CombinedDarkTheme : combinedLightTheme;

    return (
        <PaperProvider theme={theme}>
            <StatusBar style={!theme.dark ? "dark" : "light"} />
            <NavigationContainer theme={theme}>
                <StackNavigator />
                {/* <TabNavigator /> */}
            </NavigationContainer>
        </PaperProvider>
    );
}
