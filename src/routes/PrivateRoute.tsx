import React from "react";
import {Navigate, Outlet} from "react-router-dom";

interface PrivateRouteProps {
    isAuthenticated: boolean;
    redirectPath?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
                                                       isAuthenticated,
                                                       redirectPath = "/",
                                                   }) => {
    // If the user is not authenticated, use the Navigate component to redirect them to the specified redirectPath (defaulting to "/")
    if (!isAuthenticated) {
        return <Navigate to={redirectPath} replace/>;
    }
    // If the user is authenticated, render an Outlet component => placeholder for the child routes defined within this PrivateRoute
    return <Outlet/>;
};

export default PrivateRoute;
