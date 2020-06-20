import { Route, Redirect } from 'react-router-dom';
import React from 'react';

const ProtectedRoute = (props) => {
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