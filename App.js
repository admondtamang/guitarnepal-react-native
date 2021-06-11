import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Root from "./src";
import { LogBox } from "react-native";
import store from "./src/redux/configureStore";
import { Provider } from "react-redux";

import { Root as NativeBase } from "native-base";
// import { PersistGate } from "redux-persist/integration/react";

// import { persistStore } from "redux-persist";
import { QueryClient, QueryClientProvider } from "react-query";

export default function App() {
    // Ignore log notification by message:
    const queryClient = new QueryClient();

    LogBox.ignoreAllLogs(true);
    // let persistor = persistStore(store);

    return (
        <NativeBase>
            <QueryClientProvider client={queryClient}>
                <Provider store={store}>
                    {/* <PersistGate loading={null} persistor={persistor}> */}
                    <SafeAreaProvider>
                        <Root />
                    </SafeAreaProvider>
                    {/* </PersistGate> */}
                </Provider>
            </QueryClientProvider>
        </NativeBase>
    );
}
