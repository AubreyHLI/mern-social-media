import React, { useEffect } from 'react';
import SignupForm from '../components/UserAuth/SignupForm';
import UserAuthHeader from '../components/UserAuth/UserAuthHeader';

const Signup = () => {

    useEffect(() => {
        window.scrollTo(0,0);
    }, [])

    return (
        <div className='normalFlex flex-col w-full h-full min-w-[350px] bg-[white] overflow-scroll'>
            {/* Logo header */}
            <UserAuthHeader />
            {/* Signup Form */}
            <SignupForm />
        </div>
    )
}

export default Signup;