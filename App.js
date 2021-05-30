import React from "react";
import Root from "./src";
// import { LogBox } from "react-native";
// import store from "./src/redux/configureStore";
// import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";

// import { persistStore } from "redux-persist";

export default function App() {
    // Ignore log notification by message:

    // LogBox.ignoreAllLogs(true);
    // let persistor = persistStore(store);

    return (
        // <Provider store={store}>
        //     <PersistGate loading={null} persistor={persistor}>
        <Root />
        //     </PersistGate>
        // </Provider>
    );
}
