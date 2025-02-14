import {configureStore} from "@reduxjs/toolkit";
import authReducer from "../features/logIn/authSlice.ts";
import profileReducer from "../features/editProfile/profileSlice.ts";

// Set up a Redux store using Redux Toolkit

/* configureStore is called to create the Redux store
   The reducer object combines multiple reducers into the root reducer:
    auth slice of the state will be managed by authReducer
    profile slice of the state will be managed by profileReducer */

const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
    },
});

export default store;
