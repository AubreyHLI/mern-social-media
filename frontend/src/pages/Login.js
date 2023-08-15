import React, { useEffect } from 'react';
import LoginForm from '../components/UserAuth/LoginForm';
import UserAuthHeader from '../components/UserAuth/UserAuthHeader';

const Login = () => {

    useEffect(() => {
        window.scrollTo(0,0);
    }, [])

    return (
        <div className='normalFlex flex-col w-full h-full min-w-[350px] max-w-[500px] mx-auto bg-[white] overflow-scroll'>
            {/* Logo header */}
            <UserAuthHeader />
            {/* Login form */}
            <LoginForm />
        </div>
    )
}

export default Login;