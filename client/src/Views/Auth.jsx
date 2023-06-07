import RegisterForm from "../Components/auth/Register";
import LoginForm from "../Components/auth/Login";

import { AuthContext } from "../contexts/authContext";
import { useContext } from "react";
import { Redirect } from "react-router-dom";

// vòng tròn quay loading
import Spinner from "react-bootstrap/Spinner";

const Auth = ({ authRoute }) => {

    const { authState: { authLoading, isAuthenticated } } = useContext(AuthContext);
    
    let body;
    if (authLoading) {
        body =  (
            <div className="d-flex justify-content-center mt-2">
                <Spinner animation="border" variant="info" />
            </div>
        )
    } else if (isAuthenticated) {
        return <Redirect to='/home' />
    }
    else {
        body = (
            <>
                {authRoute === 'login' && <LoginForm />}
                {authRoute === 'register' && <RegisterForm />}
            </>
        )

    }

    return (
        <div className="">
            <h1 className="text-center py-2">Learnit</h1>
            <h4 className="text-center">keep track of what you are learning</h4>
            {body}
        </div>
    )

}

export default Auth;