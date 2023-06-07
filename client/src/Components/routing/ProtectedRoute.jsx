import axios from "axios";

import { AuthContext } from "../../contexts/authContext";
import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";

import Spinner from "react-bootstrap/esm/Spinner";
import NavMenu from "../Layout/NavMenu";

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { authState: { authLoading, isAuthenticated } } = useContext(AuthContext)

    if (authLoading) {
        return (
            <div className="spinner-container">
                <Spinner animation="border" variant="info" />
            </div>
        )
    }
    return (
        <Route {...rest} render={props => isAuthenticated ? (<>
            <NavMenu />
            <Component {...props} {...rest} />
        </>)
            : (<Redirect to='/login' />)
        } />
    )
}

export default ProtectedRoute