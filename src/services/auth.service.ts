import {createAsyncThunk} from "@reduxjs/toolkit";
import axios, {AxiosError} from "axios";

interface Login {
    email: string;
    password: string;
}

interface LoginResponse {
    body: {
        token: string;
    };
}

export const loginUser = createAsyncThunk<
    LoginResponse,
    Login,
    {
        rejectValue: string;
    }
>("auth/loginUser", async ({ email, password }, { rejectWithValue }) => {
    try {
        const response = await axios.post<LoginResponse>(
            `http://localhost:3001/api/v1/user/login`,
            { email, password },
            {
                headers: { 'Content-Type': 'application/json' },
            }
        );

        localStorage.setItem('token', response.data.body.token);
        return response.data;
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        return rejectWithValue(err.response?.data.message || err.message || 'An error has occurred');
    }
});

export const logoutUser = createAsyncThunk(
    "auth/logoutUser",
    async (_, { rejectWithValue }) => {
        try {
            localStorage.removeItem('token');
            return null;
        } catch (error) {
            return rejectWithValue('Failed to logout');
        }
    }
);