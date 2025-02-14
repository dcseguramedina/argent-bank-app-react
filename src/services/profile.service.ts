import {createAsyncThunk} from "@reduxjs/toolkit";
import axios, {AxiosError} from "axios";

interface getUserProfileResponse {
    status: number;
    message: string;
    body: {
        email: string;
        firstName: string;
        lastName: string;
        createdAt: string;
        updatedAt: string;
        id: string;
    }
}

interface UserProfile {
    firstName: string;
    lastName: string;
}

export const getUserProfile = createAsyncThunk<
    getUserProfileResponse,
    void,
    {
        rejectValue: string;
    }
>("profile/getUserProfile", async (_, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        };
        const response = await axios.post<getUserProfileResponse>(
            `http://localhost:3001/api/v1/user/profile`,
            {},
            config
        );

        return response.data;
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        if (err.response && err.response.data.message) {
            return rejectWithValue(err.response.data.message);
        } else {
            return rejectWithValue(err.message || 'An error has occurred');
        }
    }
});

export const editUserProfile = createAsyncThunk<
    UserProfile,
    { firstName: string; lastName: string },
    {
        rejectValue: string;
    }
>("profile/editUserProfile", async ({ firstName, lastName }, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        };
        const response = await axios.put<getUserProfileResponse>(
            `http://localhost:3001/api/v1/user/profile`,
            { firstName, lastName },
            config
        );

        return response.data.body;
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        return rejectWithValue(err.message || 'An error has occurred');
    }
});