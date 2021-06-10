import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Root from "./src";
import { LogBox } from "react-native";
import store from "./src/redux/configureStore";
import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";

// import { persistStore } from "redux-persist";
import { QueryClient, QueryClientProvider } from "react-query";

export default function App() {
    // Ignore log notification by message:
    const queryClient = new QueryClient();

    LogBox.ignoreAllLogs(true);
    // let persistor = persistStore(store);

    return (
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                {/* <PersistGate loading={null} persistor={persistor}> */}
                <SafeAreaProvider>
                    <Root />
                </SafeAreaProvider>
                {/* </PersistGate> */}
            </Provider>
        </QueryClientProvider>
    );
}
