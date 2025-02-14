import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {editUserProfile, getUserProfile} from "../../services/profile.service.ts";

// Interfaces
interface ProfileState {
    userProfile: {
        firstName: string;
        lastName:  string;
    };
    error: string | null;
}

// Set up the initial state
const initialState: ProfileState = {
  userProfile: {
      firstName: "",
      lastName:  ""
  },
    error: null,
};

// Create a profile slice with the initial state
const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        // Defines a resetProfile reducer to reset the profile state
        resetProfile: (state) => {
            state.userProfile = initialState.userProfile;
        },
        // Defines a clearError reducer to reset the error state
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Reset state before fetch request
            .addCase(getUserProfile.pending, (state) => {
                state.error = null;
            })
            // Update profile data with API response
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.userProfile = action.payload.body;
            })
            // Reset state before fetch request
            .addCase(editUserProfile.pending, (state) => {
                state.error = null;
            })
            // Update profile with modified data
            .addCase(editUserProfile.fulfilled, (state, action) => {
                state.userProfile = action.payload;
            })
            // Generic error handling - Add a matcher for any rejected action to set the error state
            .addMatcher(
                (action) => action.type.endsWith('/rejected'),
                (state, action: PayloadAction<string>) => {
                    state.error = action.payload || 'Request failed';
                }
            );
    },
});

export const { resetProfile, clearError } = profileSlice.actions;
export default profileSlice.reducer;