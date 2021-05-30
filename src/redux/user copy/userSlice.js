import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
    name: "user",
    initialState: {
        data: null,
        darkMode: false,
    },

    reducers: {
        login: (state, action) => {
            return {
                ...state,
                data: action.payload,
            };
        },
        logout: (state) => {
            return {
                ...state,
                data: null,
            };
        },
        switchDarkMode: (state) => {
            return {
                ...state,
                darkMode: !state.darkMode,
            };
        },
    },
});

export const { login, logout, switchDarkMode } = user.actions;
export default user.reducer;
