import React from "react";
import {Routes, Route} from "react-router";
import {useSelector} from "react-redux";
import {RootState} from "../store/types";
import Home from "../pages/homePage/Home";
import LogIn from "../features/logIn/LogIn";
import User from "../pages/userProfile/User";
import PrivateRoute from "../routes/PrivateRoute";

// Define the routing structure for the React application using React Router
const AppRoutes: React.FC = () => {
    //  Use useSelector to extract the isLoggedIn state from the Redux store's auth slice
    const isAuthenticated = useSelector((state: RootState) => state.auth.isLoggedIn);

    /* "/user" path is nested inside a PrivateRoute in order to check if the user is authenticated before allowing access
        The PrivateRoute component receives the isAuthenticated prop to determine if the user should have access or not
    */
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<LogIn/>}/>
            <Route element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
                <Route path="/user" element={<User/>}/>
            </Route>
        </Routes>
    );
};

export default AppRoutes;
