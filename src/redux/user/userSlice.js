import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
    name: "user",
    initialState: {
        user: {},
    },
    reducers: {
        addUser: (state, action) => {
            return {
                ...state,
                user: action.payload,
            };
        },
        removeUser: (state, action) => {
            return {
                ...state,
                user: {},
            };
        },
    },
});

export const { addUser, removeUser } = user.actions;
// export const { ADD_TO_CART, REMOVE_FROM_CART } = user.actions;
export default user.reducer;
