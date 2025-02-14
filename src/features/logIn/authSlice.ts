import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {loginUser, logoutUser} from "../../services/auth.service.ts";

// Interfaces
interface AuthState {
    isLoggedIn: boolean;
    token: string | null;
    error: string | null;
}

// Set up the initial state, checking localStorage for an existing token
const initialState: AuthState = {
    isLoggedIn: false,
    token: localStorage.getItem('token'),
    error: null,
};

// Create an auth slice with the initial state
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Defines a clearError reducer to reset the error state
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Reset state before login attempt
            .addCase(loginUser.pending, (state) => {
                state.isLoggedIn = false;
                state.token = null;
                state.error = null;
            })
            // Update state on successful login
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.token = action.payload.body.token;
                state.error = null;
            })
            // Handle failed login
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoggedIn = false;
                state.token = null;
                state.error = action.payload || 'Login failed';
            })
            //  Reset state on logout
            .addCase(logoutUser.fulfilled, (state) => {
                state.isLoggedIn = false;
                state.token = null;
                state.error = null;
            })
            // Generic error handling - Add a matcher for any rejected action to set the error state
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
