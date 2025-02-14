import { createAsyncThunk } from "@reduxjs/toolkit";
import { USER_ACTIONS } from '../store/constants.ts';
import { api, useToken, handleError } from '../api/config.ts';

// Checks whether the data argument conforms to the LoginResponse type

/*The function returns true if:
    data exists (is not null or undefined)
    data.body is an object (typeof data.body === 'object')
    data.body.token is a string (typeof data.body.token === 'string)
*/
const isLoginResponse = (data: any): data is LoginResponse => {
    return data && typeof data.body === 'object' && typeof data.body.token === 'string';
};

// Interfaces
interface Login {
    email: string;
    password: string;
}

interface LoginResponse {
    body: {
        token: string;
    };
}

// Thunks

/* Create an asynchronous action creator (createAsyncThunk) with the following generic types:
    LoginResponse: The expected successful response type
    Login: The type of the payload (email and password)
    { rejectValue: string }: The type of the rejected value
*/

// Make a POST request to '/user/login' with email and password
// Returns a token (LoginResponse type)
// The login action stores the token upon successful login, while the logout action removes it
export const loginUser = createAsyncThunk<LoginResponse, Login, { rejectValue: string }>(
    USER_ACTIONS.LOGIN_USER,
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await api.post<LoginResponse>('/user/login', { email, password });
            if (isLoginResponse(response.data)) {
                const { setToken } = useToken();
                setToken(response.data.body.token);
                return response.data;
            }
            return rejectWithValue('Invalid response from server');
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

export const logoutUser = createAsyncThunk(
    USER_ACTIONS.LOGOUT_USER,
    (_, { rejectWithValue }) => {
        try {
            const { removeToken } = useToken();
            removeToken();
            return null;
        } catch (error) {
            return rejectWithValue('Failed to logout');
        }
    }
);
