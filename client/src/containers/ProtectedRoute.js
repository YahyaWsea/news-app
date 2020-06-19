import { Route, Redirect } from 'react-router-dom';
import React, { useEffect, useContext } from 'react';
// import { checkAuth } from './authHelpers';
// import { UserContext } from './authContext';


const ProtectedRoute = (props) => {
    // console.log(useContext(UserContext));
    // const { user } = useContext(UserContext);
    const token = sessionStorage.getItem("token");
    const { component: Component, ...rest } = props;

    const RenderComponent = (p) => {
        if (token) {
            return <Component {...p} />
        } else {
            return <Redirect to={{
                pathname: "/login",
                state: { from: p.location },
            }} />;
        }
    }

    return (
        <Route
            {...rest}
            component={RenderComponent}
        />
    );
}
export default ProtectedRoute