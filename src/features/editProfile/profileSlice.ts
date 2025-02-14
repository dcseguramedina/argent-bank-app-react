import { createSlice } from "@reduxjs/toolkit";
import {editUserProfile, getUserProfile} from "../../services/profile.service.ts";

interface ProfileState {
    userProfile: {
        firstName: string;
        lastName:  string;
    };
    error: string | null;
}

const initialState: ProfileState = {
  userProfile: {
      firstName: "",
      lastName:  ""
  },
    error: null,
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        resetProfile: (state) => {
            state.userProfile = initialState.userProfile;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.userProfile = action.payload.body;
            })

            .addCase(getUserProfile.rejected, (state, action) => {
                state.userProfile = action.payload;
            })
       
            .addCase(editUserProfile.fulfilled, (state, action) => {
                state.userProfile = action.payload;
            })

            .addCase(editUserProfile.rejected, (state, action) => {
                state.userProfile = action.payload;
            })
    
    },
});

export default profileSlice.reducer;
