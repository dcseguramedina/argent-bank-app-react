import { createAsyncThunk } from "@reduxjs/toolkit";
import { PROFILE_ACTIONS } from '../store/constants.ts';
import { api, useToken, handleError } from '../api/config.ts';

// Interfaces
interface UserProfile {
    firstName: string;
    lastName: string;
}

interface UserProfileResponse {
    status: number;
    message: string;
    body: {
        email: string;
        firstName: string;
        lastName: string;
        createdAt: string;
        updatedAt: string;
        id: string;
    };
}

// Thunks

/* Create an asynchronous action creator (createAsyncThunk) with the following generic types:
    LoginResponse: The expected successful response type
    Login: The type of the payload (email and password)
    { rejectValue: string }: The type of the rejected value
*/

// Make a POST request to '/user/profile' -> even though it's fetching data, this POST request is API-specific
// Use token from localStorage for authentication
// Returns a full response data (UserProfileResponse type)
export const getUserProfile = createAsyncThunk<
    UserProfileResponse,
    void,
    { rejectValue: string }
>(PROFILE_ACTIONS.GET_PROFILE, async (_, { rejectWithValue }) => {
    try {
        const { getToken } = useToken();
        const response = await api.post<UserProfileResponse>(
            '/user/profile',
            {},
            { headers: { Authorization: `Bearer ${getToken()}` } }
        );
        return response.data;
    } catch (error) {
        return rejectWithValue(handleError(error));
    }
});

// Make a PUT request to '/user/profile' with firstName, lastName
// Use token from localStorage for authentication
// Returns nested body from response (UserProfileResponse type)
export const editUserProfile = createAsyncThunk<
    UserProfile,
    { firstName: string; lastName: string },
    { rejectValue: string }
>(PROFILE_ACTIONS.EDIT_PROFILE, async (userData, { rejectWithValue }) => {
    try {
        const { getToken } = useToken();
        const response = await api.put<UserProfileResponse>(
            '/user/profile',
            userData,
            { headers: { Authorization: `Bearer ${getToken()}` } }
        );
        return response.data.body;
    } catch (error) {
        return rejectWithValue(handleError(error));
    }
});
