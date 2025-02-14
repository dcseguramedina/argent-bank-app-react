import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

interface ApiResponse {
    status: number;
    message: string;
    body: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
    }
}

interface UserProfile {
    firstName: string;
    lastName: string;
}

interface ProfileState {
    data: {
        body: {
            firstName: string;
            lastName: string;
        },
    }
}

const initialState: ProfileState = {
    data: {
        body: {
            firstName: '',
            lastName: ''
        },
    }
};


export const getUserProfile = createAsyncThunk<
    ApiResponse,
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
        const response = await axios.post<ApiResponse>(
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
        const response = await axios.put<ApiResponse>(
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

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        resetProfile: (state) => {
            state.data = initialState.data;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.data = action.payload;
            })

            .addCase(getUserProfile.rejected, (state, action) => {
                state.data = action.payload;
            })
       
            .addCase(editUserProfile.fulfilled, (state, action) => {
                state.data = action.payload;
            })

            .addCase(editUserProfile.rejected, (state, action) => {
                state.data = action.payload;
            })
    
    },
});

export default profileSlice.reducer;
