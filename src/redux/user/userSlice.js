import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { user_login } from "../../api/user";

// const initialUser = AsyncStorage.getItem("user") ? JSON.parse(AsyncStorage.getItem("user")) : null;

export const fetchUser = createAsyncThunk("user/fetchUser", async ({ username, password }, { rejectWithValue }) => {
    try {
        const req = await user_login({ username, password });
        const user = jwt_decode(req.token);
        return { ...req, user };
    } catch (err) {
        if (!err.response) {
            throw err;
        }
        return rejectWithValue(err.response.data);
    }
});

export const fetchRefreshToken = createAsyncThunk("user/fetchRefreshToken", async (_, { getState, rejectWithValue }) => {
    const url = "https://guitarnepal.com.np/wp-json/jwt-auth/v1/token";
    try {
        const req = await axios.post(url, {
            username: "guitarpasal",
            password: "@@admond##",
        });
        const user = jwt_decode(req.data.token);

        return { ...req.data, user };
    } catch (err) {
        if (!err.response) {
            throw err;
        }

        return rejectWithValue(err.response.data);
    }
});

const user = createSlice({
    name: "user",
    initialState: {
        data: null,
        user: null,
        status: null,
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
    },
    extraReducers: {
        [fetchUser.pending]: (state, action) => {
            state.status = "loading";
        },
        [fetchUser.fulfilled]: (state, { payload }) => {
            state.status = "success";
            state.data = payload;
        },
        [fetchUser.rejected]: (state, { payload }) => {
            state.status = "failed";
        },

        [fetchRefreshToken.pending]: (state, action) => {
            state.status = "loading";
        },
        [fetchRefreshToken.fulfilled]: (state, { payload }) => {
            state.status = "success";
            state.user = payload;
        },
        [fetchRefreshToken.rejected]: (state, action) => {
            state.status = "failed";
        },
    },
});

export const { login, logout } = user.actions;
export default user.reducer;
