import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {loginUser, logoutUser} from "../../services/auth.service.ts";

interface AuthState {
    isLoggedIn: boolean;
    token: string | null;
    error: string | null;
}

const initialState: AuthState = {
    isLoggedIn: false,
    token: localStorage.getItem('token'),
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoggedIn = false;
                state.token = null;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.token = action.payload.body.token;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoggedIn = false;
                state.token = null;
                state.error = action.payload || 'Login failed';
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.isLoggedIn = false;
                state.token = null;
                state.error = null;
            })
            .addMatcher(
                (action) => action.type.endsWith('/rejected'),
                (state, action: PayloadAction<string>) => {
                    state.error = action.payload;
                }
            );
    },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
