import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios, {AxiosError} from "axios";
import {AuthState, LoginResponse, LoginCredentials } from "../services/interfaces.service";

const initialState: AuthState = {
    isLoggedIn: false,
    user: null,
    token: null,
    error: null,
};

export const loginUser = createAsyncThunk<
    LoginResponse,
    LoginCredentials,
    {
        rejectValue: string;
    }
>("auth/loginUser", async ({ email, password }, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await axios.post<LoginResponse>(
            `http://localhost:3001/api/v1/user/login`,
            { email, password },
            config
        );
        localStorage.setItem('user', JSON.stringify(response.data.user));
        console.log(response.data.user.firstName);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message || 'An error has occurred');
        }
    }
});

export const logoutUser = createAsyncThunk(
    "auth/logoutUser",
    async (_, { rejectWithValue }) => {
        try {
            // Remove user from local storage
            localStorage.removeItem('user');
            // Make an API call to invalidate the token on the server side
            await axios.post('http://localhost:3001/api/v1/user/logout');
            return null;
        } catch (error) {
            return rejectWithValue(error.message || 'An error has occurred');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoggedIn = false;
                state.user = null;
                state.token = null;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action)=> {
                state.isLoggedIn = false;
                state.user = null;
                state.token = null;
                state.error = action.payload || 'An unknown error has occurred';
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.isLoggedIn = false;
                state.user = null;
                state.token = null;
                state.error = null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.error = action.payload || 'Logout failed';
            });
    },
});

export default authSlice.reducer;