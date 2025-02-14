import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

interface AuthState {
    isLoggedIn: boolean;
    token: string | null;
}

interface Login {
    email: string;
    password: string;
}

interface LoginResponse {
    body: {
        token: string;
    };
}

const initialState: AuthState = {
    isLoggedIn: false,
    token: null,
};

export const loginUser = createAsyncThunk<
    LoginResponse,
    Login,
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
        
        localStorage.setItem('token', response.data.body.token);

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

export const logoutUser = createAsyncThunk(
    "auth/logoutUser",
    async (_, { rejectWithValue }) => {
        try {
            if(localStorage.getItem('token')) {
                localStorage.removeItem('token')
                return null;
            }
            throw new Error('An error has occurred')
        } catch (error) {
            return rejectWithValue(error);
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
                state.token = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.token = action.payload.body.token;
            })
            .addCase(loginUser.rejected, (state)=> {
                state.isLoggedIn = false;
                state.token = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.isLoggedIn = false;
                state.token = null;
            })
            .addCase(logoutUser.rejected, (state) => {
                state.isLoggedIn = false;
                state.token = null;
            });
    },
});

export default authSlice.reducer;