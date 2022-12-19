import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        isFetching: false,
        error: false,
        navbarText: "Sign In?"
    },
    reducers: {
        loginStart: (state) => {
            state.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.error = false;
            state.currentUser = action.payload;
            state.navbarText = `Hello ${state.currentUser.username}! Log out?`;
        },
        loginFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        loginLoggedOut: (state) => {
            state.isFetching = false;
            state.error = false;
            state.currentUser = null;
            state.navbarText = "Sign In?";
        },
    }
});

export const { loginStart, loginSuccess, loginFailure, loginLoggedOut } = userSlice.actions;
export default userSlice.reducer;
