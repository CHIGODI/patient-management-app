import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const refreshAccessToken = createAsyncThunk(
    "user/refreshAccessToken",
    async (refreshToken, { rejectWithValue }) => {
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/token/refresh/", { refresh: refreshToken });
            return response.data.access;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to refresh token");
        }
    }
)

const initialState = {
    user: null,
    access: null,
    refresh: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user;
            state.access = action.payload.access;
            state.refresh = action.payload.refresh;
        },
        clearUser: (state) => {
            state.user = null;
            state.access = null;
            state.refresh = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(refreshAccessToken.fulfilled, (state, action) => {
            state.access = action.payload;
        });
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;