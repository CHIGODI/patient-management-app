import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    access: null,
    refresh: null,
    isAuthenticated: false,
    justLoggedOut: false,
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
            state.justLoggedOut = false;
        },
        clearUser: (state) => {
            state.user = null;
            state.access = null;
            state.refresh = null;
            state.isAuthenticated = false;
            state.justLoggedOut = true;
        },
        resetLogout: (state) =>{
            state.justLoggedOut =  false;
        }
    },
});

export const { setUser, clearUser, resetLogout } = userSlice.actions;
export default userSlice.reducer;