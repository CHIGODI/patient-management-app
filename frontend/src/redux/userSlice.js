import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    access: null,
    refresh: null,
    isAuthenticated: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user;
            state.access = action.payload.access;
            state.refresh = action.payload.refresh;
            state.isAuthenticated = true;
        },
        clearUser: (state) => {
            state.user = null;
            state.access = null;
            state.refresh = null;
            state.isAuthenticated = false;
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;