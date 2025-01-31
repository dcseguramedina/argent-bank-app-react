import React from "react";
import { Routes, Route } from "react-router";
import {useSelector} from "react-redux";
import {RootState} from "../store";
import Home from "../pages/home/Home";
import LogIn from "../pages/logIn/LogIn";
import User from "../pages/user/User";
import PrivateRoute from "../routes/PrivateRoute";

const AppRoutes: React.FC = () => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isLoggedIn);

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LogIn />} />
            <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
                <Route path="/user" element={<User />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
